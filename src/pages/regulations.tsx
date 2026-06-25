import { useSeo } from "@/hooks/useSeo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, UserCheck, Star, Heart, Shield, AlertTriangle } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";

const sections = [
  {
    icon: Clock,
    title: "Orari Shkollor",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    badgeColor: "bg-blue-500",
    rules: [
      "Nxënësit duhet të arrijnë në shkollë jo më vonë se ora 07:55.",
      "Mësimi fillon rregullisht në orën 08:00.",
      "Orët e mësimit zgjasin 45 minuta.",
      "Pushimet ndërmjet orëve janë 5 ose 10 minuta.",
      "Pushimi i gjatë zgjat 20 minuta për çlodhje dhe konsumim ushqimi.",
      "Largimi nga shkolla gjatë orarit mësimor lejohet vetëm me autorizim zyrtar."
    ],
  },
  {
    icon: UserCheck,
    title: "Prezenca & Mungesat",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeColor: "bg-purple-500",
    rules: [
      "Prania e nxënësit në mësim është e detyrueshme për çdo orë.",
      "Mungesat duhet të justifikohen brenda afatit me raport mjekësor ose kërkesë nga prindi.",
      "Mungesat e pajustifikuara sjellin masa disiplinore sipas rregullores së shkollës.",
      "Prindërit njoftohen rregullisht për mbarëvajtjen dhe mungesat e nxënësve."
    ],
  },
  {
    icon: Star,
    title: "Vlerësimi & Notat",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    badgeColor: "bg-amber-500",
    rules: [
      "Vlerësimi i nxënësve bëhet me nota nga 4 (mbetës) deri në 10 (shkëlqyer).",
      "Vlerësimi bëhet në mënyrë sistematike përmes kontrollit me shkrim, me gojë dhe projekteve.",
      "Nxënësit njoftohen paraprakisht për testet e periudhës.",
      "Rezultatet regjistrohen rregullisht në regjistrin elektronik."
    ],
  },
  {
    icon: Heart,
    title: "Sjellja & Etika",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeColor: "bg-rose-500",
    rules: [
      "Respekti i ndërsjellë mes nxënësve, mësuesve dhe stafit është parim themelor.",
      "Çdo formë bullizmi, dhune apo diskriminimi është rreptësisht e ndaluar.",
      "Përdorimi i telefonave celularë gjatë orës së mësimit nuk lejohet.",
      "Nxënësit duhet të paraqiten me veshje të rregullt dhe të përshtatshme për institucionin.",
      "Dëmtimi i pronës së shkollës sanksionohet dhe kërkon dëmshpërblim."
    ],
  },
  {
    icon: Shield,
    title: "Siguria në Shkollë",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeColor: "bg-emerald-500",
    rules: [
      "Hyrja në shkollë monitorohet për të garantuar sigurinë e nxënësve.",
      "Nxënësit duhet të ndjekin udhëzimet e oficerit të sigurisë dhe mësuesve kujdestarë.",
      "Rregullat e emergjencës dhe evakuimit mësohen dhe praktikohen periodikisht."
    ],
  },
  {
    icon: AlertTriangle,
    title: "Masat Disiplinore",
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    badgeColor: "bg-red-500",
    rules: [
      "Vërejtje verbale ose me shkrim nga mësuesi kujdestar.",
      "Njoftimi dhe thirrja e prindërve në shkollë për bashkëbisedim.",
      "Masa disiplinore të vendosura nga Këshilli i Disiplinës në përputhje me shkeljen.",
      "Udhëzime dhe mbështetje nga psikologu i shkollës për përmirësimin e sjelljes."
    ],
  },
];

function AccordionItem({ section }: { section: typeof sections[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden bg-[#07111F]/40 backdrop-blur-md hover:border-crimson/20 transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/5 transition-colors"
        data-testid={`accordion-${section.title}`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${section.color}`}>
          <section.icon size={18} />
        </div>
        <span className="font-serif font-bold text-white text-lg flex-1">{section.title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} className="text-white/40" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/5 pt-5">
              <ul className="space-y-4">
                {section.rules.map((rule, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white ${section.badgeColor}`}>
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Regulations() {
  useSeo({
    title: "Rregullorja e Shkollës",
    description: "Lexoni rregulloren e brendshme të Shkollës Asim Vokshi — rregullat e sjelljes, detyrimet dhe të drejtat e nxënësve dhe stafit.",
    path: "/rregullore",
  });
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Rregullat e Shkollës</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Rregullorja e Brendshme</h1>
            <p className="text-white/60 text-base max-w-2xl leading-relaxed">
              Kodi i sjelljes, oraret dhe standardet tona që garantojnë një mjedis të sigurt, të rregullt dhe të respektueshëm për të gjithë.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Regulations List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-4 bg-[#04090F]">
        {sections.map((section, i) => (
          <AnimateOnView key={section.title} delay={i * 0.07}>
            <AccordionItem section={section} />
          </AnimateOnView>
        ))}
      </div>
    </PageTransition>
  );
}
