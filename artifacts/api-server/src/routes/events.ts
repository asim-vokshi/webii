import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dataDir = path.join(process.cwd(), "data");
const eventsFile = path.join(dataDir, "events.json");

const VALID_TYPES = ["akademike", "kulturore", "nderkombetare", "shkollore"] as const;
const VALID_PERIODS = ["Periudha e Parë", "Periudha e Dytë", "Periudha e Tretë"];

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function readEvents(): any[] {
  ensureDataDir();
  if (!fs.existsSync(eventsFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(eventsFile, "utf-8"));
  } catch {
    return [];
  }
}

function writeEvents(data: any[]) {
  ensureDataDir();
  fs.writeFileSync(eventsFile, JSON.stringify(data, null, 2));
}

function sanitizeString(val: unknown, maxLen: number): string {
  if (typeof val !== "string") return "";
  return val.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

function validateEventBody(body: any): { ok: boolean; error?: string; data?: any } {
  const title = sanitizeString(body.title, 200);
  const desc = sanitizeString(body.desc, 1000);
  const date = sanitizeString(body.date, 20);
  const month = sanitizeString(body.month, 20);
  const time = sanitizeString(body.time ?? "", 50);
  const location = sanitizeString(body.location ?? "", 200);
  const type = VALID_TYPES.includes(body.type) ? body.type : "shkollore";
  const period = VALID_PERIODS.includes(body.period) ? body.period : "Periudha e Parë";
  const highlight = Boolean(body.highlight);

  if (!title) return { ok: false, error: "Titulli është i detyrueshëm." };
  if (!desc) return { ok: false, error: "Përshkrimi është i detyrueshëm." };

  return { ok: true, data: { title, desc, date, month, time: time || undefined, location: location || undefined, type, period, highlight } };
}

router.get("/events", (_req, res) => {
  res.json(readEvents());
});

router.post("/events", (req, res) => {
  const v = validateEventBody(req.body);
  if (!v.ok) { res.status(400).json({ error: v.error }); return; }

  const items = readEvents();
  const newItem = { ...v.data, id: Date.now() };
  items.push(newItem);
  writeEvents(items);
  res.status(201).json(newItem);
});

router.put("/events/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: "ID e pavlefshme." }); return; }

  const v = validateEventBody(req.body);
  if (!v.ok) { res.status(400).json({ error: v.error }); return; }

  const items = readEvents();
  const idx = items.findIndex((i: any) => i.id === id);
  if (idx === -1) { res.status(404).json({ error: "Aktiviteti nuk u gjet." }); return; }

  items[idx] = { ...items[idx], ...v.data, id };
  writeEvents(items);
  res.json(items[idx]);
});

router.delete("/events/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: "ID e pavlefshme." }); return; }

  let items = readEvents();
  const before = items.length;
  items = items.filter((i: any) => i.id !== id);
  if (items.length === before) { res.status(404).json({ error: "Aktiviteti nuk u gjet." }); return; }

  writeEvents(items);
  res.json({ ok: true });
});

export default router;
