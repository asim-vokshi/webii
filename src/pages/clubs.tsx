import { useSeo } from "@/hooks/useSeo";
import { Users, Calendar } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";
import { motion } from "framer-motion";

const clubs = [
  {
    icon: "🎤",
    name: "Klubi i Debatit",
    color: "border-blue-500/10 bg-blue-500/5 text-blue-400",
    accent: "bg-blue-600",
    desc: "Zhvillimi i mendimit kritik, aftësive të komunikimit publik dhe retorikës përmes debateve mbi tema të ndryshme shoqërore dhe akademike.",
    achievements: ["Pjesëmarrje në konkurse rajonale", "Trajnime mbi argumentimin dhe analizën"],
    tags: ["Retorikë", "Mendim Kritik", "Komunikim"],
  },
  {
    icon: "🗣️",
    name: "Klubi i Gjuhëve të Huaja",
    color: "border-purple-500/10 bg-purple-500/5 text-purple-400",
    accent: "bg-purple-600",
    desc: "Praktikimi i 7 gjuhëve të huaja që studiohen në shkollë përmes bisedave të lira, shfaqjes së filmave dhe aktiviteteve ndërkulturore.",
    achievements: ["Aktivitete festive në ditët kombëtare", "Bashkëpunim me qendrat kulturore të huaja"],
    tags: ["Gjuhë të Huaja", "Multikulturalizëm", "Komunikim"],
  },
  {
    icon: "📖",
    name: "Klubi Letrar",
    color: "border-emerald-500/10 bg-emerald-500/5 text-emerald-400",
    accent: "bg-emerald-600",
    desc: "Leximi, analiza dhe diskutimi i veprave më të rëndësishme të letërsisë shqipe dhe botërore, si dhe nxitja e shkrimeve krijuese nga nxënësit.",
    achievements: ["Krijimi i revistës shkollore", "Konkurse letrare dhe mbrëmje poetike"],
    tags: ["Letërsi", "Kritikë Letrare", "Shkrim Krijues"],
  },
  {
    icon: "📷",
    name: "Klubi i Medias & Gazetarisë",
    color: "border-orange-500/10 bg-orange-500/5 text-orange-400",
    accent: "bg-orange-600",
    desc: "Dokumentimi i aktiviteteve të shkollës përmes fotografisë, videove dhe përgatitjes së artikujve për gazetën dhe rrjetet tona sociale.",
    achievements: ["Menaxhimi i gazetës së shkollës", "Përgatitja e materialeve vizuale festive"],
    tags: ["Fotografi", "Video", "Gazetari"],
  },
  {
    icon: "🎵",
    name: "Klubi i Arteve & Muzikës",
    color: "border-rose-500/10 bg-rose-500/5 text-rose-400",
    accent: "bg-rose-600",
    desc: "Eksplorimi i talenteve të nxënësve në pikturë, muzikë dhe arte skenike, duke organizuar ekspozita dhe koncerte festive për shkollën.",
    achievements: ["Koncerte festive për festat e fundvitit", "Ekspozita me punime artistike të nxënësve"],
    tags: ["Muzikë", "Pikturë", "Teatër", "Arte Figurative"],
  },
  {
    icon: "🌿",
    name: "Klubi Mjedisor & Social",
    color: "border-teal-500/10 bg-teal-500/5 text-teal-400",
    accent: "bg-teal-600",
    desc: "Promovimi i ndërgjegjësimit mjedisor dhe ndërmarrja e iniciativave sociale e bamirësie në mbështetje të komunitetit tonë.",
    achievements: ["Fushata të mbjelljes së pemëve", "Aktivitete të ndërgjegjësimit ekologjik"],
    tags: ["Mjedis", "Ekologji", "Solidaritet Social"],
  },
];

export default function Clubs() {
  useSeo({
    title: "Klube dhe Aktivitete Jashtëkurrikulare",
    description: "Klube studentore dhe aktivitete jashtëkurrikulare në Shkollën Asim Vokshi — klub letërsie, debati, muzike, arte dhe shumë të tjera.",
    path: "/klube",
  });
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Jashtëshkollore</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Klubet tona</h1>
            <p className="text-white/60 text-base max-w-2xl leading-relaxed">
              Klubet tona ofrojnë hapësirën e duhur për çdo nxënës që të zhvillojë talentet, pasionet dhe aftësitë e tij sociale jashtë orëve të mësimit.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Clubs Grid with Dark Glassmorphism */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#04090F]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, i) => (
            <AnimateOnView key={club.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-[#07111F]/40 backdrop-blur-md rounded-3xl p-8 border ${club.color} flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300`}
                data-testid={`card-club-${i}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl">{club.icon}</span>
                    <div className="flex gap-1.5">
                      {club.tags.slice(0, 2).map((t) => (
                        <span key={t} className="px-2.5 py-0.5 bg-white/5 text-white/40 text-[9px] uppercase tracking-wider font-bold rounded-md border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="font-serif font-bold text-white text-xl mb-3">{club.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{club.desc}</p>
                </div>

                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div>
                    <h4 className="text-white/30 text-[9px] uppercase tracking-[0.15em] font-bold mb-2">Aktivitete Kryesore</h4>
                    <ul className="space-y-1.5">
                      {club.achievements.map((ach) => (
                        <li key={ach} className="flex items-center gap-2 text-xs text-white/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
