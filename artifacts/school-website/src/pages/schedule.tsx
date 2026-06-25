import { useSeo } from "@/hooks/useSeo";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, FileText } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

/**
 * ORARI I NXËNËSVE
 *
 * Shënim për mirëmbajtje:
 * Viti shkollor ka përfunduar, prandaj oraret janë lënë bosh me qëllim.
 * Kur të nisë viti i ri shkollor, shtoni këtu oraret zyrtare ose krijoni karta të reja
 * duke ruajtur të njëjtin dizajn të faqes.
 */
const STUDENT_SCHEDULES: Array<{
  className: string;
  day: string;
  time: string;
  subject: string;
  teacher?: string;
  room?: string;
}> = [];

export default function Schedule() {
  useSeo({
    title: "Orari i Mësimeve",
    description: "Orari i orëve mësimore për çdo klasë të Shkollës Asim Vokshi. Shikoni oraret javore për të gjitha klasat dhe lëndët.",
    path: "/orari",
  });
  const hasSchedules = STUDENT_SCHEDULES.length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-amber-400 tracking-wider uppercase"
            >
              <CalendarIcon size={14} />
              <span>Orari i Nxënësve</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-serif font-bold text-4xl sm:text-5xl text-white tracking-tight"
            >
              Orari i Nxënësve
            </motion.h1>

           
          </div>

          {hasSchedules ? (
            <div className="space-y-3">
              {STUDENT_SCHEDULES.map((item, index) => (
                <div
                  key={`${item.className}-${item.day}-${item.time}-${index}`}
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                        {item.className} — {item.day}
                      </p>
                      <h2 className="text-white font-bold text-lg">{item.subject}</h2>
                      {(item.teacher || item.room) && (
                        <p className="text-white/50 text-sm mt-1">
                          {[item.teacher, item.room].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 w-fit">
                      <Clock size={12} className="text-amber-400" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto">
                <FileText size={30} className="text-amber-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-white font-serif font-bold text-2xl">Orari nuk është publikuar ende</h2>
                <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  Me përfundimin e vitit shkollor, orari aktual është hequr. Informacioni i ri do të shtohet sapo të nisë viti i ardhshëm shkollor.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-white/50 bg-black/20 border border-white/5 rounded-full px-4 py-2">
                <Clock size={13} />
                <span>Përditësim i pritshëm në fillim të vitit shkollor</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
