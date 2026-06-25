import { useSeo } from "@/hooks/useSeo";
import { CheckCircle, Clock, Trophy } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Rikonstruksioni EU4Schools",
    status: "Përfunduar",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    statusIcon: CheckCircle,
    partners: "Bashkimi Europian / UNDP / Ministria e Arsimit",
    year: "Shkurt 2024",
    color: "from-blue-600/20 to-blue-950/40",
    icon: "🇪🇺",
    desc: "Transformimi më i madh i godinës së shkollës i financuar nga Bashkimi Europian dhe i zbatuar nga UNDP. Projekti solli laboratorë modernë, kabinete të reja të gjuhëve të huaja, klasa të pajisura me tabela interaktive dhe projektorë, bibliotekë të re dhe palestra bashkëkohore.",
    highlights: ["Financuar nga Bashkimi Europian", "Zbatuar nga UNDP", "Kabinetet e reja të gjuhëve të huaja", "Laboratorë shkencorë dhe IT", "Tabela interaktive në çdo klasë", "Sisteme moderne sigurie"],
  },
  {
    title: "Projekti RYCO Western Balkans",
    status: "Aktiv",
    statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    statusIcon: Clock,
    partners: "RYCO Western Balkans",
    year: "Vazhdim",
    color: "from-purple-600/20 to-purple-950/40",
    icon: "🌍",
    desc: "Programi i bashkëpunimit rinor dhe shkëmbimeve ndërkulturore ndërmjet vendeve të Ballkanit Perëndimor. Nxënësit tanë marrin pjesë aktive në projekte rajonale, shkëmbime kulturore dhe seminare që nxisin dialogun dhe bashkëpunimin.",
    highlights: ["Shkëmbime ndërkulturore", "Seminare dhe trajnime rajonale", "Nxitja e dialogut rinor", "Bashkëpunim me shkolla të Ballkanit", "Pjesëmarrje në kampe verore", "Projekte të përbashkëta rinore"],
  },
  {
    title: "Konkurset Kombëtare IDMC",
    status: "Fitues",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    statusIcon: Trophy,
    partners: "IDMC / Instituti për Demokraci, Media dhe Kulturë",
    year: "Vjetor",
    color: "from-amber-600/20 to-amber-950/40",
    icon: "🏆",
    desc: "Pjesëmarrja aktive e nxënësve tanë në konkurset kombëtare të organizuara nga IDMC, si konkursi 'Pyet Gjyshërit', duke fituar çmime prestigjioze për dokumentimin e historisë dhe trashëgimisë kulturore përmes dëshmive gojore.",
    highlights: ["Çmime kombëtare prestigjioze", "Dokumentimi i historisë gojore", "Intervista me dëshmitarë historikë", "Ekspozita dhe prezantime publike", "Bashkëpunim me historianë", "Vlerësim për kreativitetin"],
  },
  {
    title: "Seksionet Dygjuhëshe Shqip-Frëngjisht & Shqip-Italisht",
    status: "Vazhdim",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    statusIcon: Clock,
    partners: "Ambasada Franceze / Ambasada Italiane / MAS",
    year: "Historik",
    color: "from-indigo-600/20 to-indigo-950/40",
    icon: "🇫🇷🇮🇹",
    desc: "Programet e seksioneve dygjuhëshe ku nxënësit studiojnë lëndët e kurrikulës në gjuhën frënge ose italiane. Kjo u mundëson atyre të pajisen me certifikata të njohura ndërkombëtarisht (si DELF) dhe të fitojnë të drejtën e studimit në universitetet më të mira europiane.",
    highlights: ["Mësimdhënie në dy gjuhë", "Certifikime ndërkombëtare DELF/PLIDA", "Lidhje e ngushtë me ambasada", "Pedagogë të huaj të ftuar", "Mundësi studimi jashtë vendit", "Aktivitete kulturore dygjuhëshe"],
  },
];

const statusIcon = { "Përfunduar": CheckCircle, "Aktiv": Clock, "Fitues": Trophy, "Vazhdim": Clock };

export default function Projects() {
  useSeo({
    title: "Projektet Ndërkombëtare",
    description: "Projektet ndërkombëtare të Shkollës Asim Vokshi — bashkëpunime Erasmus+, shkëmbime studentore dhe partneritete me shkolla evropiane.",
    path: "/projektet",
  });
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Partneritete Strategjike</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Projektet tona</h1>
            <p className="text-white/60 text-base max-w-2xl leading-relaxed">
              Projektet dhe bashkëpunimet tona kryesore që mbështesin zhvillimin akademik, kulturor dhe ndërkombëtar të nxënësve tanë.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Projects List with Dark Glassmorphism */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 bg-[#04090F]">
        {projects.map((proj, i) => {
          const StatusIcon = statusIcon[proj.status as keyof typeof statusIcon] || Clock;
          return (
            <AnimateOnView key={proj.title} delay={i * 0.07} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-[#07111F]/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 hover:border-crimson/20 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300 flex flex-col"
                data-testid={`card-project-${i}`}
              >
                <div className={`bg-gradient-to-br ${proj.color} p-8 border-b border-white/5`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{proj.icon}</span>
                      <div>
                        <h3 className="font-serif font-bold text-white text-2xl leading-tight mb-2">{proj.title}</h3>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{proj.partners}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${proj.statusColor}`}>
                      {proj.status}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{proj.desc}</p>
                  
                  <div className="border-t border-white/5 pt-6">
                    <h4 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Pikat Kryesore të Projektet</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {proj.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5 text-xs text-white/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimateOnView>
          );
        })}
      </div>
    </PageTransition>
  );
}
