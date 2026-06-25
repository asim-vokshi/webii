import { useSeo } from "@/hooks/useSeo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Globe, Sparkles, Compass } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";

const clubs = [
  { name: "Klubi i Debatit", members: 28, icon: "🎤" },
  { name: "Klubi Gjuhësor", members: 35, icon: "🗣️" },
  { name: "Klubi Letrar", members: 22, icon: "📖" },
  { name: "Klubi i Medias", members: 18, icon: "📷" },
  { name: "Ansamble Muzikore", members: 20, icon: "🎵" },
  { name: "Klubi Mjedisor", members: 24, icon: "🌿" },
];

const achievements = [
  { title: "Art Fest 2025 — Vendi I", desc: "Pikturë dhe arte figurative — shpërblimet kryesore.", year: "2025", color: "from-amber-500/20 to-amber-700/10", border: "border-amber-500/30", text: "text-amber-400" },
  { title: "Teatri 'Gjergji Trola' — I & II", desc: "Vendi i parë dhe i dytë në Festivalin Kombëtar të Teatrit.", year: "2025", color: "from-blue-500/20 to-blue-700/10", border: "border-blue-500/30", text: "text-blue-400" },
  { title: "'Sipërmarja Ime' — Fitues", desc: "Platforma e mësimit gjuhësor fitoi çmimin e Bashkisë Tiranë.", year: "2024", color: "from-emerald-500/20 to-emerald-700/10", border: "border-emerald-500/30", text: "text-emerald-400" },
  { title: "Top 3 Shkolla — Tiranë", desc: "97% kalueshmëri — rekordi historik i shkollës sonë.", year: "2025", color: "from-purple-500/20 to-purple-700/10", border: "border-purple-500/30", text: "text-purple-400" },
];

const projects = [
  { title: "Festivali Frankofon", desc: "Festival kulturor vjetor me partnerët frankofonë.", partner: "Ambasada Franceze", icon: "🇫🇷" },
  { title: "Java e Kulturës Italiane", desc: "Ngjarje kulturore, ushqim, muzikë dhe arte italiane.", partner: "Ambasada Italiane", icon: "🇮🇹" },
  { title: "'Pyet Gjysherit' Competition", desc: "Konkurs për ruajtjen e trashëgimisë kulturore.", partner: "IDMC / Shtëpia me Gjethë", icon: "🏆" },
  { title: "EU4Schools / RYCO", desc: "Projekte europiane për rininë e Ballkanit Perëndimor.", partner: "BE / UNDP / RYCO", icon: "🇪🇺" },
];

const embassies = [
  { name: "Ambasada Franceze", flag: "🇫🇷" },
  { name: "Ambasada Italiane", flag: "🇮🇹" },
  { name: "Ambasada Gjermane", flag: "🇩🇪" },
  { name: "Ambasada Spanjolle", flag: "🇪🇸" },
  { name: "Ambasada Turke", flag: "🇹🇷" },
  { name: "Ambasada Ruse", flag: "🇷🇺" },
];

export default function StudentLife() {
  useSeo({
    title: "Jeta Studentore",
    description: "Jeta studentore në Asim Vokshi — aktivitete kulturore, sportive dhe akademike. Arritjet e nxënësve, partneritetet ndërkombëtare dhe projektet.",
    path: "/jeta-studentore",
  });
  return (
    <PageTransition>
      {/* HERO SECTION */}
      <div className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(200,16,46,0.1) 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest mb-3 font-bold inline-block">Komuniteti Ynë</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Jeta Studentore</h1>
            <p className="text-white/50 text-base max-w-xl leading-relaxed">
              Klube aktive, projekte ndërkombëtare dhe arritje të jashtëzakonshme jashtë klasës për të formuar talente globale.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* CLUBS SECTION (Premium Glassmorphic Redesign) */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Klubet Tona</h2>
                <p className="text-white/40 text-sm">9 klube aktive me mbi 200 anëtarë të angazhuar.</p>
              </div>
              <Link href="/klube">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white transition-all cursor-pointer"
                >
                  Të gjitha klubet <ArrowRight size={14} />
                </motion.button>
              </Link>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {clubs.map((club, i) => (
              <AnimateOnView key={club.name} delay={i * 0.07}>
                <Link href="/klube">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-[#07111F]/40 backdrop-blur-md rounded-2xl p-6 text-center cursor-pointer border border-white/5 hover:border-crimson/30 hover:shadow-xl hover:shadow-crimson/5 transition-all duration-500"
                    data-testid={`card-club-preview-${i}`}
                  >
                    <div className="text-4xl mb-4 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">{club.icon}</div>
                    <h3 className="text-xs font-bold text-white leading-tight group-hover:text-amber-300 transition-colors">{club.name}</h3>
                    <p className="text-[10px] text-white/40 font-semibold uppercase tracking-wider mt-2">{club.members} anëtarë</p>
                  </motion.div>
                </Link>
              </AnimateOnView>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/klube">
              <motion.button whileHover={{ scale: 1.03 }} className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-semibold transition-all">
                Shiko të gjitha klubet
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS (Premium Dark Glass Cards) */}
      <section className="py-20 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Trophy className="text-amber-400" size={20} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white">Arritjet Tona</h2>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((a, i) => (
              <AnimateOnView key={a.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`bg-gradient-to-br ${a.color} backdrop-blur-md rounded-2xl p-6 border ${a.border} shadow-lg flex flex-col justify-between h-56 group transition-all duration-500`}
                >
                  <div>
                    <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{a.year}</span>
                    <h3 className="font-serif font-bold text-lg mt-3 mb-2 leading-snug text-white group-hover:text-amber-300 transition-colors">{a.title}</h3>
                  </div>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{a.desc}</p>
                </motion.div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURAL PROJECTS (Immersive Storytelling Cards) */}
      <section className="py-20 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Globe className="text-blue-400" size={20} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white">Projekte Kulturore</h2>
              </div>
              <Link href="/projektet">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white transition-all cursor-pointer"
                >
                  Të gjitha projektet <ArrowRight size={14} />
                </motion.button>
              </Link>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <AnimateOnView key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-[#07111F]/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 h-64 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-4xl mb-4 block filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">{p.icon}</span>
                    <h3 className="font-serif font-bold text-white text-base mb-2 group-hover:text-amber-300 transition-colors leading-snug">{p.title}</h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed line-clamp-3">{p.desc}</p>
                  </div>
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 self-start mt-4">
                    {p.partner}
                  </span>
                </motion.div>
              </AnimateOnView>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/projektet">
              <motion.button whileHover={{ scale: 1.03 }} className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-semibold transition-all">
                Shiko të gjitha projektet
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* EMBASSY PARTNERS (Glow chips) */}
      <section className="py-20 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimateOnView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-white/5 border border-white/10">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Rrjeti Ndërkombëtar</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-white mb-10">Partnerët Diplomatikë</h2>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {embassies.map((e, i) => (
                <motion.div
                  key={e.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-[#07111F]/60 backdrop-blur-md border border-white/10 hover:border-crimson/30 hover:shadow-lg hover:shadow-crimson/5 px-6 py-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-300"
                >
                  <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{e.flag}</span>
                  <span className="text-white/80 text-sm font-bold tracking-wide">{e.name}</span>
                </motion.div>
              ))}
            </div>
          </AnimateOnView>
        </div>
      </section>
    </PageTransition>
  );
}
