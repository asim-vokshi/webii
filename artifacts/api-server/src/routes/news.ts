import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dataDir = path.join(process.cwd(), "data");
const newsFile = path.join(dataDir, "news.json");

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function readNews(): any[] {
  ensureDataDir();
  if (!fs.existsSync(newsFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(newsFile, "utf-8"));
  } catch {
    return [];
  }
}

function writeNews(data: any[]) {
  ensureDataDir();
  fs.writeFileSync(newsFile, JSON.stringify(data, null, 2));
}

function sanitizeString(val: unknown, maxLen: number): string {
  if (typeof val !== "string") return "";
  return val.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

function validateNewsBody(body: any): { ok: boolean; error?: string; data?: any } {
  const title = sanitizeString(body.title, 200);
  const slug = sanitizeString(body.slug, 200).replace(/[^a-z0-9-]/gi, "-");
  const excerpt = sanitizeString(body.excerpt, 500);
  const content = sanitizeString(body.content, 20000);
  const category = sanitizeString(body.category, 60);
  const imageUrl = sanitizeString(body.imageUrl ?? "", 500);
  const featured = Boolean(body.featured);

  if (!title) return { ok: false, error: "Titulli është i detyrueshëm." };
  if (!content) return { ok: false, error: "Përmbajtja është e detyrueshme." };

  return { ok: true, data: { title, slug, excerpt, content, category, imageUrl: imageUrl || null, featured } };
}

router.get("/news", (_req, res) => {
  res.json(readNews());
});

router.post("/news", (req, res) => {
  const v = validateNewsBody(req.body);
  if (!v.ok) { res.status(400).json({ error: v.error }); return; }

  const items = readNews();
  const newItem = { ...v.data, id: Date.now(), publishedAt: new Date().toISOString() };
  items.unshift(newItem);
  writeNews(items);
  res.status(201).json(newItem);
});

router.put("/news/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: "ID e pavlefshme." }); return; }

  const v = validateNewsBody(req.body);
  if (!v.ok) { res.status(400).json({ error: v.error }); return; }

  const items = readNews();
  const idx = items.findIndex((i: any) => i.id === id);
  if (idx === -1) { res.status(404).json({ error: "Lajmi nuk u gjet." }); return; }

  items[idx] = { ...items[idx], ...v.data, id };
  writeNews(items);
  res.json(items[idx]);
});

router.delete("/news/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: "ID e pavlefshme." }); return; }

  let items = readNews();
  const before = items.length;
  items = items.filter((i: any) => i.id !== id);
  if (items.length === before) { res.status(404).json({ error: "Lajmi nuk u gjet." }); return; }

  writeNews(items);
  res.json({ ok: true });
});

export default router;
