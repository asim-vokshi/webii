import { useSeo } from "@/hooks/useSeo";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";
import { Monitor, Mic, FlaskConical, Library, Dumbbell, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SCHOOL_IMAGES } from "@/lib/assets";

const facilities = [
  {
    icon: Monitor,
    title: "Laboratorë Informatikë",
    badge: "Teknologji Moderne",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    desc: "Laboratorë të pajisur me kompjuterë modernë për zhvillimin e lëndës së informatikës dhe rritjen e aftësive dixhitale të nxënësve tanë.",
    details: ["Kompjuterë modernë desktop", "Tabela interaktive inteligjente", "Projektorë cilësorë", "Lidhje e shpejtë interneti", "Sisteme operimi të përditësuara", "Mjedis i rehatshëm pune"],
    image: SCHOOL_IMAGES.class_interactive,
  },
  {
    icon: Mic,
    title: "Kabinete Gjuhësh",
    badge: "Mësimdhënie Interaktive",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    desc: "Klasa të dedikuara posaçërisht për secilën nga 7 gjuhët e huaja, të pajisura me tabela interaktive dhe projektorë për një proces mësimor sa më interaktiv.",
    details: ["Kabinete për 7 gjuhë të huaja", "Tabela interaktive", "Projektorë në çdo klasë", "Sisteme audio profesionale", "Materiale didaktike autentike", "Mjedis nxitës për komunikim"],
    image: SCHOOL_IMAGES.building_front,
  },
  {
    icon: FlaskConical,
    title: "Laborator Bio-Kimie",
    badge: "Eksperimente Shkencore",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    desc: "Laborator i rikonstruktuar me pajisje bashkëkohore dhe mjete laboratorike për kryerjen e eksperimenteve shkencore në lëndët e biologjisë dhe kimisë.",
    details: ["Pajisje moderne laboratorike", "Mjete mbrojtëse të sigurta", "Reaktivë dhe solucione të certifikuara", "Mikroskopë cilësorë", "Skelete dhe modele anatomike", "Mjedis i sigurt eksperimentimi"],
    image: SCHOOL_IMAGES.students_activity,
  },
  {
    icon: Library,
    title: "Biblioteka Shkollore",
    badge: "Kërkim & Studim",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    desc: "Një mjedis i qetë dhe i ngrohtë me një fond të pasur librash, i cili u shërben nxënësve për studim, kërkim shkencor dhe pasurim kulturor.",
    details: ["Fond i pasur librash", "Hapësirë e qetë studimi", "Libra në gjuhë të huaja", "Materiale kërkimore historike", "Kënd leximi komod", "Akses i hapur për nxënësit"],
    image: SCHOOL_IMAGES.teachers_historical,
  },
  {
    icon: Dumbbell,
    title: "Mjedise Sportive",
    badge: "Zhvillim Fizik",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    desc: "Palestër e brendshme dhe terrene sportive të jashtme të pajisura për zhvillimin e orëve të edukimit fizik dhe aktiviteteve sportive pas mësimit.",
    details: ["Palestër e brendshme", "Terrene sportive të jashtme", "Fusha basketbolli & volejbolli", "Pajisje sportive cilësore", "Dhoma zhveshjeje", "Aktivitete sportive të larmishme"],
    image: SCHOOL_IMAGES.sports,
  },
  {
    icon: Shield,
    title: "Sistemi i Sigurisë",
    badge: "Mbrojtje e Plotë",
    color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    desc: "Shërbim i dedikuar sigurie për të garantuar mbrojtjen dhe qetësinë e të gjithë nxënësve dhe stafit gjatë gjithë qëndrimit në shkollë.",
    details: ["Oficere e dedikuar sigurie", "Slementina Musabelliu", "Sisteme monitorimi", "Plan i certifikuar sigurie", "Kontroll në hyrje të shkollës", "Mjedis i sigurt dhe i qetë"],
    image: SCHOOL_IMAGES.activity_hall,
  },
];

export default function Infrastructure() {
  useSeo({
    title: "Infrastruktura Shkollore",
    description: "Zbuloni infrastrukturën moderne të Shkollës Asim Vokshi: kabinete gjuhësore, laboratorë, bibliotekë, salla multifunksionale dhe ambiente sportive.",
    path: "/infrastruktura",
  });
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${SCHOOL_IMAGES.building_front}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">EU4Schools & UNDP</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Infrastruktura</h1>
            <p className="text-white/60 text-base max-w-2xl leading-relaxed">
              Ambientet tona janë transformuar plotësisht për të ofruar standardet më të larta europiane në mësimdhënie dhe siguri.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* EU4Schools highlight with premium dark styling */}
      <div className="bg-[#07111F]/50 border-y border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-4">
            <Star className="text-amber-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-serif font-bold text-white text-lg mb-1">Rikonstruksioni EU4Schools</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Në shkurt 2024 përfundoi rikonstruksioni i plotë i godinës së Shkollës së Mesme me Orientim Gjuhësor <strong>“Asim Vokshi”</strong>, i financuar nga Bashkimi Europian (BE) dhe zbatuar nga UNDP. Sot, shkolla ofron kushte bashkëkohore me laboratorë modernë, klasa me tabela interaktive e projektorë, bibliotekë dhe mjedise sportive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Grid with Dark Glassmorphism */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#04090F]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {facilities.map((f, i) => (
            <AnimateOnView key={f.title} delay={(i % 2) * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#07111F]/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 hover:border-crimson/20 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/20 to-transparent z-10" />
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${f.color}`}>
                        <f.icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-white text-xl mb-1">{f.title}</h3>
                        <span className="px-2.5 py-0.5 bg-white/5 text-amber-400 text-[10px] uppercase tracking-widest font-bold rounded-full border border-white/10">{f.badge}</span>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">{f.desc}</p>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-white/5 pt-6">
                    {f.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
