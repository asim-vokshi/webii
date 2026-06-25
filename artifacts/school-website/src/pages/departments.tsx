import { useSeo } from "@/hooks/useSeo";
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Users, BookOpen, ArrowRight, Shield, Compass, Sparkles, Building2 } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";

const departments = [
  {
    id: "gjuhe",
    title: "Gjuhë & Komunikim",
    color: "from-blue-600/20 to-cyan-600/20 hover:border-blue-500/30",
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    teachers: 22,
    subjects: [
      { name: "Gjuhë Shqipe & Letërsi", hours: 5, desc: "Gramatikë, letërsi klasike dhe bashkëkohore shqipe." },
      { name: "Gjuhë e Huaj Obligative I", hours: 4, desc: "Anglisht, Frëngjisht, Italisht ose Gjermanisht." },
      { name: "Gjuhë e Huaj Obligative II", hours: 3, desc: "Spanjisht, Rusisht ose Turqisht." },
      { name: "Gjuhë e Huaj Zgjedhore", hours: 2, desc: "Gjuhë shtesë sipas zgjedhjes së nxënësit." },
    ],
    facilities: ["7 klasa gjuhësh me pajisje audio-vizuale", "Laborator gjuhësor", "Bibliotekë me 12,000+ tituj"],
    desc: "Departamenti kryesor i shkollës, i specializuar në formimin gjuhësor shumëgjuhësh dhe komunikimin ndërkombëtar.",
  },
  {
    id: "matematike",
    title: "Matematikë & TIK",
    color: "from-crimson/20 to-red-600/20 hover:border-crimson/30",
    accent: "bg-crimson/10 text-crimson border-crimson/20",
    teachers: 6,
    subjects: [
      { name: "Matematikë", hours: 4, desc: "Algjebër, gjeometri, kalkulus dhe statistikë." },
      { name: "TIK Bazë", hours: 2, desc: "Programim, rrjete dhe bazat e informatikës." },
      { name: "TIK Zgjedhore", hours: 2, desc: "Zhvillim web, inteligjencë artificiale, Python." },
    ],
    facilities: ["2 laboratorë me 34 kompjuterë", "Tabela interaktive", "Platforma online mësimdhënie"],
    desc: "Formon mendim analitik, logjik dhe kompetenca dixhitale të domosdoshme për karrierat e shekullit XXI.",
  },
  {
    id: "shkenca",
    title: "Shkenca Natyrore",
    color: "from-emerald-600/20 to-teal-600/20 hover:border-emerald-500/30",
    accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    teachers: 5,
    subjects: [
      { name: "Fizikë", hours: 3, desc: "Mekanikë, elektricitet, optikë dhe fizikë moderne." },
      { name: "Kimi", hours: 3, desc: "Kimi organike, analitike dhe eksperimente laboratorike." },
      { name: "Biologji (Kl. 10)", hours: 2, desc: "Biologji qelizore, gjenetikë dhe ekologji." },
      { name: "Fizikë Zgjedhore (Kl. 12)", hours: 2, desc: "Fizikë e avancuar për rrugët universitare shkencore." },
    ],
    facilities: ["Laborator bio-kimie i renovuar (2024)", "Pajisje moderne shkencore", "Librari shkencore dixhitale"],
    desc: "Eksperimente praktike, kërkim shkencor dhe formim i thelluar për nxënësit me prirje shkencore.",
  },
  {
    id: "shoqeria",
    title: "Shoqëria & Mjedisi",
    color: "from-purple-600/20 to-indigo-600/20 hover:border-purple-500/30",
    accent: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    teachers: 7,
    subjects: [
      { name: "Qytetari & Edukim Qytetar", hours: 2, desc: "Demokraci, të drejta dhe detyra qytetare." },
      { name: "Filozofi", hours: 2, desc: "Mendim kritik, etikë dhe histori e filozofisë." },
      { name: "Histori", hours: 3, desc: "Histori shqiptare, ballkanike dhe botërore." },
      { name: "Gjeografi", hours: 2, desc: "Gjeografi fizike, humane dhe mjedisore." },
    ],
    facilities: ["Sallë multimediatike", "Burime dixhitale të historisë", "Platforma debati akademik"],
    desc: "Zhvillon ndërgjegjjen qytetare, mendimin kritik, argumentimin logjik dhe kuptimin e botës bashkëkohore.",
  },
  {
    id: "arte",
    title: "Arte & Edukatë Fizike",
    color: "from-rose-600/20 to-pink-600/20 hover:border-rose-500/30",
    accent: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    teachers: 4,
    subjects: [
      { name: "Edukatë Fizike", hours: 3, desc: "Sport, aktivitet fizik dhe edukim shëndetësor." },
      { name: "Arte Figurative", hours: 2, desc: "Pikturë, skulpturë dhe histori e artit." },
      { name: "Muzikë", hours: 1, desc: "Teoria muzikore dhe praktikë instrumentale." },
      { name: "Teatër Zgjedhore", hours: 2, desc: "Aktrim, dramaturgjia dhe shfaqje publike." },
    ],
    facilities: ["Sallë sportive e renovuar", "Studio artesh", "Skenë teatrore"],
    desc: "Kultivohet kreativiteti, shprehja artistike, shëndeti fizik dhe fryma e bashkëpunimit.",
  },
  {
    id: "bigjuhesh",
    title: "Seksioni Dygjuhësh",
    color: "from-amber-600/20 to-orange-600/20 hover:border-amber-500/30",
    accent: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    teachers: 8,
    subjects: [
      { name: "Të gjitha lëndët në Frëngjisht", hours: 30, desc: "Kurrikul i plotë i maturës shqiptare në dy gjuhë." },
      { name: "Frëngjisht i Avancuar", hours: 6, desc: "Letërsi franceze, kulturë dhe civilizim frankofon." },
      { name: "Përgatitje DELF B2", hours: 3, desc: "Kurs i dedikuar për certifikimin ndërkombëtar DELF B2." },
    ],
    facilities: ["Klasa të specializuara dygjuhëshe", "Burime frëngjisht", "Lidhje me Ambasadën Franceze"],
    desc: "Program unik dygjuhësh shqip-frëngjisht. Certifikim DELF B2 ndërkombëtar. Rrugë e sigurt drejt universiteteve frankofone europiane.",
  },
];

function DeptCard({ dept }: { dept: typeof departments[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-[#07111F]/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full bg-gradient-to-br ${dept.color} p-6 sm:p-8 text-left transition-all duration-300 relative group`}
        data-testid={`dept-toggle-${dept.id}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${dept.accent}`}>
              {dept.teachers} mësues
            </span>
            <h3 className="font-serif font-bold text-white text-2xl group-hover:text-amber-300 transition-colors">{dept.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-3xl">{dept.desc}</p>
          </div>
          <motion.div 
            animate={{ rotate: open ? 180 : 0 }} 
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 flex-shrink-0 mt-1"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/5"
          >
            <div className="p-6 sm:p-8 space-y-8 bg-[#04090F]/40">
              {/* Subjects */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                  <BookOpen size={14} className="text-crimson" /> Lëndët Kryesore
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dept.subjects.map((s) => (
                    <div key={s.name} className="p-4 bg-white/3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-serif font-bold text-white text-sm">{s.name}</span>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">{s.hours}h / javë</span>
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Facilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                    <Building2 size={14} className="text-crimson" /> Mjediset e Dedikuara
                  </h4>
                  <ul className="space-y-2.5">
                    {dept.facilities.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-white/60 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Link to staff */}
                <div className="flex items-end sm:justify-end">
                  <Link href={`/stafi?dept=${encodeURIComponent(dept.title)}`}>
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-crimson hover:text-amber-400 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                    >
                      <Users size={14} />
                      Shiko stafin e departamentit
                      <ArrowRight size={14} />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Departments() {
  useSeo({
    title: "Departamentet Akademike",
    description: "Eksploroni 6 departamentet akademike të Shkollës Asim Vokshi: gjuhë të huaja, shkencat natyrore, matematikë, letërsi dhe më shumë.",
    path: "/departamente",
  });
  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/building_front.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,16,46,0.06) 0%, transparent 60%)" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Kurrikula Mësimore</span>
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-4">Departamentet</h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
              6 departamente akademike të strukturuara me kurrikula të specializuara, mjedise moderne dhe staf të certifikuar ndërkombëtarisht.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Accordion Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#04090F]">
        <div className="space-y-6">
          {departments.map((dept, i) => (
            <AnimateOnView key={dept.id} delay={i * 0.05}>
              <DeptCard dept={dept} />
            </AnimateOnView>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
