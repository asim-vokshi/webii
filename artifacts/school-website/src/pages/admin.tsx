import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Plus, Pencil, Trash2, X, Check, Newspaper, CalendarDays, Eye, EyeOff, FileText } from "lucide-react";
import { newsItems as staticNewsItems } from "@/content/site-content";

const ADMIN_PASSWORD = "AsimVokshi2026!";
const SESSION_KEY = "av_admin_auth";

type Tab = "news" | "events";

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string | null;
  publishedAt: string;
  featured?: boolean | null;
}

interface CalendarEvent {
  id: number;
  date: string;
  month: string;
  title: string;
  desc: string;
  time?: string;
  location?: string;
  type: "akademike" | "kulturore" | "nderkombetare" | "shkollore";
  highlight?: boolean;
  period: string;
}

const NEWS_CATEGORIES = ["Aktivitete", "Infrastrukturë", "Akademike", "Kulturore", "Ndërkombëtare", "Njoftim"];
const EVENT_TYPES = [
  { value: "akademike", label: "Akademike" },
  { value: "kulturore", label: "Kulturore" },
  { value: "nderkombetare", label: "Ndërkombëtare" },
  { value: "shkollore", label: "Shkollore" },
];
const PERIODS = ["Periudha e Parë", "Periudha e Dytë", "Periudha e Tretë"];

const emptyNews = (): Partial<NewsItem> => ({
  title: "", slug: "", excerpt: "", content: "", category: "Aktivitete", imageUrl: "", featured: false,
});
const emptyEvent = (): Partial<CalendarEvent> => ({
  date: "", month: "", title: "", desc: "", time: "", location: "",
  type: "shkollore", highlight: false, period: "Periudha e Parë",
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Input({ label, value, onChange, textarea, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; type?: string; placeholder?: string;
}) {
  const cls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-colors";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-white/50">{label}</label>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4} className={cls} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-white/50">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-[#07111F] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-colors">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-colors relative ${checked ? "bg-amber-400" : "bg-white/10"}`}
      >
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
      </div>
      <span className="text-sm text-white/70">{label}</span>
    </label>
  );
}

// ─── News Section ────────────────────────────────────────────────────────────

function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<Partial<NewsItem> | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchNews(); }, []);

  async function fetchNews() {
    setLoading(true);
    try {
      const r = await fetch("/api/news");
      setItems(await r.json());
    } catch { setItems([]); }
    setLoading(false);
  }

  function startAdd() {
    setEditing(emptyNews());
    setEditingId(null);
  }

  function startEdit(item: NewsItem) {
    setEditing({ ...item });
    setEditingId(item.id);
  }

  function cancelEdit() {
    setEditing(null);
    setEditingId(null);
  }

  async function save() {
    if (!editing) return;
    if (!editing.title?.trim() || !editing.content?.trim()) {
      setMsg("Titulli dhe përmbajtja janë të detyrueshme.");
      return;
    }
    setSaving(true);
    setMsg("");
    const payload = {
      ...editing,
      slug: editing.slug || slugify(editing.title || ""),
    };
    try {
      if (editingId !== null) {
        const r = await fetch(`/api/news/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const updated = await r.json();
        setItems(prev => prev.map(i => i.id === editingId ? updated : i));
      } else {
        const r = await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const created = await r.json();
        setItems(prev => [created, ...prev]);
      }
      cancelEdit();
    } catch { setMsg("Gabim gjatë ruajtjes."); }
    setSaving(false);
  }

  async function del(id: number) {
    if (!confirm("Jeni i sigurt që doni të fshini këtë lajm?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const f = editing ?? {};
  const set = (k: keyof NewsItem) => (v: any) => setEditing(prev => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-serif font-bold text-white">Lajme & Njoftime</h2>
        {!editing && (
          <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold rounded-xl transition-colors">
            <Plus size={15} /> Shto Lajm
          </button>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-[#07111F]/80 border border-amber-400/20 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-2">
              {editingId ? "Ndrysho Lajmin" : "Shto Lajm të Ri"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Titulli *" value={f.title ?? ""} onChange={set("title")} placeholder="Titulli i lajmit..." />
              <Input label="Slug (URL)" value={f.slug ?? ""} onChange={set("slug")} placeholder="auto-gjenerohet nga titulli" />
            </div>
            <Input label="Përmbledhja *" value={f.excerpt ?? ""} onChange={set("excerpt")} textarea placeholder="Përmbledhje e shkurtër..." />
            <Input label="Përmbajtja e plotë *" value={f.content ?? ""} onChange={set("content")} textarea placeholder="Teksti i plotë i lajmit..." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Kategoria" value={f.category ?? "Aktivitete"} onChange={set("category")}
                options={NEWS_CATEGORIES.map(c => ({ value: c, label: c }))} />
              <Input label="URL e Fotografisë" value={f.imageUrl ?? ""} onChange={set("imageUrl")}
                placeholder="/images/building_front.jpeg" />
            </div>
            <Toggle label="Lajm i Spikatur (Featured)" checked={!!f.featured} onChange={set("featured")} />
            {msg && <p className="text-red-400 text-sm">{msg}</p>}
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black text-sm font-bold rounded-xl transition-colors">
                <Check size={15} /> {saving ? "Duke ruajtur..." : "Ruaj"}
              </button>
              <button onClick={cancelEdit} className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-colors border border-white/10">
                <X size={15} /> Anulo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-6">
          {/* API-managed (dynamic) news */}
          {items.length === 0 ? (
            <div className="text-center py-6 text-white/30 text-sm border border-dashed border-white/10 rounded-xl">
              Nuk ka lajme të shtuara nga paneli. Shtoni lajmin e parë!
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <motion.div key={item.id} layout
                  className="flex items-center gap-4 bg-[#07111F]/60 border border-white/5 rounded-xl px-4 py-3 hover:border-white/10 transition-colors">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-lg flex-shrink-0 opacity-80" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/50 uppercase tracking-wider font-bold">{item.category}</span>
                      {item.featured && <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">★ Spikatur</span>}
                    </div>
                    <p className="text-white text-sm font-semibold truncate">{item.title}</p>
                    <p className="text-white/30 text-xs">{new Date(item.publishedAt).toLocaleDateString("sq-AL")}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(item)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-amber-400/10 hover:text-amber-400 text-white/50 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => del(item.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-white/50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Static (built-in) news — editable via override */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FileText size={13} className="text-white/30" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Lajme Statike (klikoni Ndrysho për të modifikuar)</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            {staticNewsItems.map(staticItem => {
              const override = items.find(i => i.slug === staticItem.slug);
              const isOverridden = !!override;
              return (
                <div key={staticItem.id}
                  className={`flex items-center gap-4 border rounded-xl px-4 py-3 transition-colors ${isOverridden ? "bg-amber-400/5 border-amber-400/15" : "bg-white/[0.02] border-white/5"}`}>
                  {(override?.imageUrl ?? staticItem.imageUrl) && (
                    <img src={(override?.imageUrl ?? staticItem.imageUrl)!} alt=""
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0 opacity-80" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 uppercase tracking-wider font-bold">
                        {override?.category ?? staticItem.category}
                      </span>
                      {isOverridden && (
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">● E modifikuar</span>
                      )}
                    </div>
                    <p className="text-white/80 text-sm font-semibold truncate">{override?.title ?? staticItem.title}</p>
                    <p className="text-white/25 text-xs">{new Date(override?.publishedAt ?? staticItem.publishedAt).toLocaleDateString("sq-AL")}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (override) {
                        startEdit(override);
                      } else {
                        setEditing({ ...staticItem, imageUrl: staticItem.imageUrl ?? "" });
                        setEditingId(null);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-amber-400/10 hover:text-amber-400 text-white/40 text-xs font-bold transition-colors flex-shrink-0">
                    <Pencil size={12} /> Ndrysho
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Events Section ──────────────────────────────────────────────────────────

function EventsSection() {
  const [items, setItems] = useState<CalendarEvent[]>([]);
  const [editing, setEditing] = useState<Partial<CalendarEvent> | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const r = await fetch("/api/events");
      setItems(await r.json());
    } catch { setItems([]); }
    setLoading(false);
  }

  function startAdd() { setEditing(emptyEvent()); setEditingId(null); }
  function startEdit(item: CalendarEvent) { setEditing({ ...item }); setEditingId(item.id); }
  function cancelEdit() { setEditing(null); setEditingId(null); }

  async function save() {
    if (!editing) return;
    if (!editing.title?.trim() || !editing.desc?.trim()) {
      setMsg("Titulli dhe përshkrimi janë të detyrueshëm.");
      return;
    }
    setSaving(true);
    setMsg("");
    try {
      if (editingId !== null) {
        const r = await fetch(`/api/events/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
        const updated = await r.json();
        setItems(prev => prev.map(i => i.id === editingId ? updated : i));
      } else {
        const r = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
        const created = await r.json();
        setItems(prev => [...prev, created]);
      }
      cancelEdit();
    } catch { setMsg("Gabim gjatë ruajtjes."); }
    setSaving(false);
  }

  async function del(id: number) {
    if (!confirm("Jeni i sigurt që doni të fshini këtë aktivitet?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const f = editing ?? {};
  const set = (k: keyof CalendarEvent) => (v: any) => setEditing(prev => ({ ...prev, [k]: v }));

  const typeColors: Record<string, string> = {
    akademike: "text-blue-400", kulturore: "text-red-400",
    nderkombetare: "text-purple-400", shkollore: "text-emerald-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-serif font-bold text-white">Aktivitete Kalendari</h2>
        {!editing && (
          <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold rounded-xl transition-colors">
            <Plus size={15} /> Shto Aktivitet
          </button>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-[#07111F]/80 border border-amber-400/20 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-2">
              {editingId ? "Ndrysho Aktivitetin" : "Shto Aktivitet të Ri"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Titulli *" value={f.title ?? ""} onChange={set("title")} placeholder="Emri i aktivitetit..." />
              <Select label="Periudha" value={f.period ?? "Periudha e Parë"} onChange={set("period")}
                options={PERIODS.map(p => ({ value: p, label: p }))} />
            </div>
            <Input label="Përshkrimi *" value={f.desc ?? ""} onChange={set("desc")} textarea placeholder="Përshkruani aktivitetin..." />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input label="Data (p.sh. 15)" value={f.date ?? ""} onChange={set("date")} placeholder="15" />
              <Input label="Muaji (p.sh. Sht)" value={f.month ?? ""} onChange={set("month")} placeholder="Sht" />
              <Input label="Ora" value={f.time ?? ""} onChange={set("time")} placeholder="08:00" />
              <Input label="Vendndodhja" value={f.location ?? ""} onChange={set("location")} placeholder="Salla..." />
            </div>
            <div className="flex flex-wrap gap-6">
              <Select label="Lloji" value={f.type ?? "shkollore"} onChange={set("type")} options={EVENT_TYPES} />
              <div className="flex items-end pb-1">
                <Toggle label="Ngjarje Kryesore" checked={!!f.highlight} onChange={set("highlight")} />
              </div>
            </div>
            {msg && <p className="text-red-400 text-sm">{msg}</p>}
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black text-sm font-bold rounded-xl transition-colors">
                <Check size={15} /> {saving ? "Duke ruajtur..." : "Ruaj"}
              </button>
              <button onClick={cancelEdit} className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl border border-white/10 transition-colors">
                <X size={15} /> Anulo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-sm">Nuk ka aktivitete të shtuara. Shtoni aktivitetin e parë!</div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <motion.div key={item.id} layout
              className="flex items-center gap-4 bg-[#07111F]/60 border border-white/5 rounded-xl px-4 py-3 hover:border-white/10 transition-colors">
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-sm font-bold text-white leading-none">{item.date}</span>
                <span className="text-[9px] uppercase tracking-wide text-amber-400 font-bold">{item.month}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${typeColors[item.type] ?? "text-white/50"}`}>
                    {EVENT_TYPES.find(t => t.value === item.type)?.label}
                  </span>
                  <span className="text-[10px] text-white/30">{item.period}</span>
                  {item.highlight && <span className="text-[10px] text-amber-400 font-bold">★</span>}
                </div>
                <p className="text-white text-sm font-semibold truncate">{item.title}</p>
                {item.location && <p className="text-white/30 text-xs">📍 {item.location}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(item)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-amber-400/10 hover:text-amber-400 text-white/50 transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => del(item.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-white/50 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Login Gate ──────────────────────────────────────────────────────────────

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onLogin();
    } else {
      setErr(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen bg-[#04090F] flex items-center justify-center px-4">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(200,16,46,0.06) 0%, transparent 70%)" }} />
      <motion.div
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-[#07111F]/90 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-crimson/10 border border-crimson/20 flex items-center justify-center mb-4">
              <Lock size={24} className="text-crimson" />
            </div>
            <h1 className="text-xl font-serif font-bold text-white">Panel Administrativ</h1>
            <p className="text-white/40 text-sm mt-1">Shkolla "Asim Vokshi"</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pw}
                onChange={e => { setPw(e.target.value); setErr(false); }}
                onKeyDown={e => e.key === "Enter" && attempt()}
                placeholder="Fjalëkalimi..."
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white pr-12 text-sm placeholder-white/30 focus:outline-none focus:ring-1 transition-colors ${err ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30" : "border-white/10 focus:border-amber-400/50 focus:ring-amber-400/30"}`}
              />
              <button onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {err && <p className="text-red-400 text-xs font-semibold">Fjalëkalim i gabuar. Provoni përsëri.</p>}
            <button onClick={attempt}
              className="w-full py-3 bg-crimson hover:bg-crimson/80 text-white font-bold rounded-xl text-sm transition-colors">
              Hyr
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [tab, setTab] = useState<Tab>("news");

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#04090F]">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 60%)" }} />

      {/* Header */}
      <div className="relative border-b border-white/5 bg-[#04090F]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Shkolla Asim Vokshi</p>
            <h1 className="text-base font-serif font-bold text-white leading-tight">Panel Administrativ</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-bold transition-colors border border-white/5">
            <LogOut size={13} /> Dil
          </button>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5 w-fit">
          <button
            onClick={() => setTab("news")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "news" ? "bg-crimson text-white shadow-lg shadow-crimson/20" : "text-white/50 hover:text-white"}`}
          >
            <Newspaper size={15} /> Lajme
          </button>
          <button
            onClick={() => setTab("events")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "events" ? "bg-crimson text-white shadow-lg shadow-crimson/20" : "text-white/50 hover:text-white"}`}
          >
            <CalendarDays size={15} /> Aktivitete
          </button>
        </div>

        {/* Info box */}
        <div className="bg-amber-400/5 border border-amber-400/15 rounded-2xl px-5 py-3 text-amber-400/70 text-xs leading-relaxed flex items-start gap-3">
          <span className="text-amber-400 mt-0.5">ℹ</span>
          <span>
            {tab === "news"
              ? "Lajmet e shtuara këtu do të shfaqen menjëherë në faqen publike të lajmeve, bashkë me lajmet statike."
              : "Aktivitetet e shtuara këtu do të shfaqen si periudhë e re në faqen e kalendarit shkollor."}
          </span>
        </div>

        {/* Content */}
        <div className="bg-[#07111F]/40 border border-white/5 rounded-3xl p-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {tab === "news" ? <NewsSection /> : <EventsSection />}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-white/15 text-xs pb-8">
          Faqe e fshehur administrative — mos e ndani URL-në me të tjerët
        </p>
      </div>
    </div>
  );
}
