import { useSeo } from "@/hooks/useSeo";
import { useState, useEffect } from "react";
import { MapPin, Clock, Star } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";
import { AnimateOnView } from "@/components/animate-on-view";

type EventType = "akademike" | "kulturore" | "nderkombetare" | "shkollore";

interface CalendarEvent {
  id?: number;
  date: string;
  month: string;
  title: string;
  desc: string;
  time?: string;
  location?: string;
  type: EventType;
  highlight?: boolean;
  period?: string;
}

const typeConfig: Record<EventType, { color: string; label: string }> = {
  akademike: { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Akademike" },
  kulturore: { color: "bg-red-500/10 text-red-400 border-red-500/20", label: "Kulturore" },
  nderkombetare: { color: "bg-purple-500/10 text-purple-400 border-purple-500/20", label: "Ndërkombëtare" },
  shkollore: { color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Shkollore" },
};

const staticMonthGroups: { month: string; events: CalendarEvent[] }[] = [
  { month: "Periudha e Parë", events: [] },
  { month: "Periudha e Dytë", events: [] },
  { month: "Periudha e Tretë", events: [] },
];

function EventCard({ event }: { event: CalendarEvent }) {
  const config = typeConfig[event.type];
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#07111F]/40 backdrop-blur-md rounded-2xl p-6 border ${event.highlight ? "border-crimson/30 hover:border-crimson/50" : "border-white/5 hover:border-white/10"} flex flex-col sm:flex-row gap-6 items-start transition-all`}
    >
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-center">
        <span className="text-2xl font-serif font-bold text-white leading-none">{event.date}</span>
        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mt-1">{event.month}</span>
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] uppercase tracking-wider font-bold border ${config.color}`}>
            {config.label}
          </span>
          {event.highlight && (
            <span className="flex items-center gap-1 text-amber-400 text-[10px] uppercase tracking-widest font-bold">
              <Star size={10} fill="currentColor" /> Ngjarje Kryesore
            </span>
          )}
        </div>
        <h3 className="font-serif font-bold text-white text-lg leading-snug">{event.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{event.desc}</p>
        <div className="flex flex-wrap gap-4 text-xs text-white/30 pt-1">
          {event.time && (
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-amber-400" /> {event.time}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-crimson" /> {event.location}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Calendar() {
  useSeo({
    title: "Kalendari Akademik",
    description: "Kalendari i vitit akademik të Shkollës Asim Vokshi — datat e rëndësishme, aktivitetet shkollore, provimet dhe pushimet.",
    path: "/kalendar",
  });
  const [apiEvents, setApiEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then(r => r.json())
      .then(data => setApiEvents(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const PERIODS = ["Periudha e Parë", "Periudha e Dytë", "Periudha e Tretë"];

  const mergedGroups = staticMonthGroups.map(group => {
    const extra = apiEvents.filter(e => (e.period ?? "Periudha e Parë") === group.month);
    return { ...group, events: [...group.events, ...extra] };
  });

  const otherPeriods = apiEvents
    .filter(e => e.period && !PERIODS.includes(e.period))
    .reduce<{ month: string; events: CalendarEvent[] }[]>((acc, e) => {
      const existing = acc.find(g => g.month === e.period);
      if (existing) { existing.events.push(e); }
      else { acc.push({ month: e.period!, events: [e] }); }
      return acc;
    }, []);

  const allGroups = [...mergedGroups, ...otherPeriods];

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Kalendari Shkollor</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Struktura e Vitit Mësimor</h1>
            <p className="text-white/60 text-base max-w-2xl leading-relaxed">
              Planifikimi i periudhave mësimore, festave kombëtare, provimeve të certifikimit dhe aktiviteteve kryesore kulturore të shkollës.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Calendar List with Dark Glassmorphism */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#04090F]">
        <div className="space-y-16">
          {allGroups.map((group, groupIdx) => (
            <div key={group.month} className="space-y-6">
              <AnimateOnView>
                <div className="flex items-center gap-4">
                  <h2 className="font-serif font-bold text-white text-2xl tracking-wide">{group.month}</h2>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
              </AnimateOnView>
              <div className="space-y-4">
                {group.events.map((event, eventIdx) => (
                  <AnimateOnView key={event.id ?? event.title} delay={eventIdx * 0.05}>
                    <EventCard event={event} />
                  </AnimateOnView>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
