import { useSeo } from "@/hooks/useSeo";
import { Mail, Clock, ArrowRight, GraduationCap, Globe, Briefcase, Star, Users } from "lucide-react";
import { Link } from "wouter";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";
import { motion } from "framer-motion";

const services = [
  { icon: GraduationCap, title: "Orientim Universitar", desc: "Udhëzime të detajuara për aplikimin në universitetet shqiptare dhe ndërkombëtare, bursa dhe procedura pranimi.", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { icon: Briefcase, title: "Këshillim Karriere", desc: "Vlerësim i aftësive dhe profilit personal të nxënësit për të zgjedhur degën e duhur të studimit bazuar në gjuhët e huaja.", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { icon: Star, title: "Aftësi Ndërpersonale", desc: "Trajnime dhe seminare mbi aftësitë komunikuese, shkrimin e CV-së dhe përgatitjen për intervistat e para.", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { icon: Globe, title: "Bursa & Shkëmbime", desc: "Informacion i vazhdueshëm mbi programet e shkëmbimeve ndërkombëtare rinore dhe bursat e studimit jashtë vendit.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
];

const universities = [
  { name: "Universiteti i Tiranës", country: "Shqipëri", flag: "🇦🇱", desc: "Universiteti kryesor publik në vend me programe të larmishme studimi." },
  { name: "Sorbonne Université", country: "Francë", flag: "🇫🇷", desc: "Universiteti prestigjioz parisian — mundësi e shkëlqyer për Seksionin Dygjuhësh." },
  { name: "Università di Bologna", country: "Itali", flag: "🇮🇹" , desc: "Universiteti më i vjetër në botë, i preferuar nga nxënësit e gjuhës italiane." },
  { name: "Ludwig-Maximilians-Universität", country: "Gjermani", flag: "🇩🇪", desc: "Një nga qendrat më të mëdha akademike europiane për gjuhë dhe shkenca." },
];

const steps = [
  { num: "01", title: "Këshillimi Fillestar", desc: "Takime individuale me stafin e këshillimit për të vlerësuar prirjet akademike." },
  { num: "02", title: "Zgjedhja e Programit", desc: "Identifikimi i universiteteve dhe i programeve më të përshtatshme." },
  { num: "03", title: "Përgatitja e Dosjes", desc: "CV, letra motivimi, rekomandime akademike dhe dokumente aplikimi." },
  { num: "04", title: "Aplikimi & Ndjekja", desc: "Dorëzimi i aplikimeve dhe ndjekja e procesit të pranimit hap pas hapi." },
];

export default function Career() {
  useSeo({
    title: "Karriera dhe Orientimi Profesional",
    description: "Këshillim karriere dhe orientim profesional për nxënësit e Shkollës Asim Vokshi — universitete, bursa, mundësi punësimi dhe rrugëtimi pas shkollës.",
    path: "/karriera",
  });
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Mundësi Studimi & Orientimi</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Këshillimi i Karrierës</h1>
            <p className="text-white/60 text-base max-w-2xl leading-relaxed">
              Ne i mbështesim nxënësit tanë në ndërtimin e të ardhmes së tyre akademike dhe profesionale përmes orientimit të personalizuar universitar.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Services Grid with Dark Glassmorphism */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#04090F]">
        <AnimateOnView>
          <div className="text-center mb-16">
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Shërbimet Tona</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">Këshillim dhe Orientimi</h2>
            <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
              Udhëheqje profesionale për të ndihmuar çdo nxënës të zbulojë potencialin e tij të plotë.
            </p>
          </div>
        </AnimateOnView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <AnimateOnView key={s.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-[#07111F]/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-crimson/20 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-white text-lg mb-3">{s.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            </AnimateOnView>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-[#07111F]/30 border-y border-white/5 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="text-center mb-16">
              <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Hapat e Procesit</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">Si Funksionon?</h2>
              <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
                Katër hapat e thjeshtë që ndjekim për të siguruar një orientim sa më të suksesshëm.
              </p>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimateOnView key={step.title} delay={i * 0.05}>
                <div className="relative space-y-4">
                  <span className="text-5xl font-serif font-bold text-crimson/20 block">{step.num}</span>
                  <h3 className="font-serif font-bold text-white text-lg">{step.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </div>

      {/* University Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#04090F]">
        <AnimateOnView>
          <div className="text-center mb-16">
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Destinacionet</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">Universitetet e Preferuara</h2>
            <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
              Disa nga universitetet ku nxënësit tanë vazhdojnë studimet e tyre të larta pas diplomimit.
            </p>
          </div>
        </AnimateOnView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.map((uni, i) => (
            <AnimateOnView key={uni.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#07111F]/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-crimson/20 transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{uni.flag}</span>
                    <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{uni.country}</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-lg mb-2">{uni.name}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{uni.desc}</p>
                </div>
              </motion.div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
