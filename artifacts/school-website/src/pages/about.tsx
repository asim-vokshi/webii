import { useSeo } from "@/hooks/useSeo";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";
import { Target, Globe, Users, Award, BookOpen, Sparkles, Compass } from "lucide-react";
import { SCHOOL_IMAGES } from "@/lib/assets";

const timeline = [
  { year: "1965", title: "Themelimi i Shkollës", desc: "Shkolla e Mesme me Orientim Gjuhësor u hap në Tiranë më 15 shtator 1965 dhe fillimisht ofronte mësim të gjuhëve anglisht, frëngjisht, rusisht dhe latinisht." },
  { year: "1977", title: "Emërtimi 'Asim Vokshi'", desc: "Në vitin 1977, shkolla mori emrin 'Asim Vokshi'." },
  { year: "1979-1980", title: "Zgjerimi i Gjuhëve", desc: "Në vitin shkollor 1979–1980 u shtuan italishtja, gjermanishtja dhe spanjishtja, të cilat u rihapën në vitin 1990 pas një ndërprerjeje. Nga viti 1980, u zhvilluan edhe disa lëndë të përgjithshme, si historia dhe gjeografia." },
  { year: "1998", title: "Seksionet Dygjuhëshe", desc: "Në vitin 1998 u hapën seksionet dygjuhëshe italisht-shqip dhe frëngjisht-shqip." },
  { year: "2004", title: "Reforma e Tri Gjuhëve", desc: "Në vitin 2004 u ndryshua plani mësimor, duke u dhënë nxënësve mundësinë të mësonin tri gjuhë të huaja dhe duke përfshirë lëndë të reja, si informatika dhe psikologjia." },
  { year: "2009-2010", title: "Gjimnaz Gjuhësor", desc: "Shkolla u përfshi në reformën arsimore në vitin 2009 dhe në 2010 u kthye në gjimnaz me orientim gjuhësor." },
  { year: "2024", title: "Rikonstruksioni i Plotë", desc: "Në shkurt 2024 përfundoi rikonstruksioni i plotë i godinës me mbështetjen e programit EU4Schools, financuar nga BE-ja dhe zbatuar nga UNDP. Sot, shkolla është e pajisur me laboratorë modernë, klasa me tabela interaktive e projektorë, bibliotekë dhe mjedise sportive." }
];

const leadership = [
  { name: "Marsida Jarani", role: "Drejtore", desc: "Drejton me vizion dhe përkushtim gjimnazin, duke u fokusuar në arritjet e larta akademike dhe integrimin ndërkombëtar." },
  { name: "Mirela Reqica", role: "Zëvendësdrejtore", desc: "Kontribuon në mbarëvajtjen e procesit mësimor dhe menaxhimin e standardeve të larta të cilësisë akademike." },
  { name: "Rovena Jani", role: "Zëvendësdrejtore", desc: "Angazhohet në organizimin e proceseve akademike, disiplinës dhe mbështetjes së nxënësve." },
  { name: "Jorida Braushi", role: "Psikologe", desc: "Ofron shërbimin psikosocial për të garantuar një mjedis të ngrohtë, mbështetës dhe të shëndetshëm për të gjithë nxënësit." },
  { name: "Jonila Llabani", role: "Punonjëse sociale", desc: "Mbështet integrimin social të nxënësve dhe bashkëpunimin e ngushtë me familjet e tyre." }
];

const facilities = [
  { icon: "💻", title: "Laboratorë Informatikë", desc: "Mjedise të pajisura me kompjuterë modernë për zhvillimin e lëndës së informatikës." },
  { icon: "🗣️", title: "Kabinete Gjuhësh", desc: "Klasa të dedikuara për mësimin e 7 gjuhëve të huaja, të pajisura me tabela interaktive dhe projektorë." },
  { icon: "🔬", title: "Laborator Bio-Kimie", desc: "Laborator i rikonstruktuar me pajisje bashkëkohore për eksperimente shkencore cilësore." },
  { icon: "📚", title: "Biblioteka Shkollore", desc: "Një mjedis i qetë me fond të pasur librash për studim dhe kërkim shkencor." },
  { icon: "⚽", title: "Mjedise Sportive", desc: "Palestër e brendshme dhe terrene sportive të jashtme për zhvillimin e edukimit fizik." },
  { icon: "🔒", title: "Oficere Sigurie", desc: "Shërbim i dedikuar sigurie (Slementina Musabelliu) për të garantuar mbrojtjen dhe qetësinë në shkollë." }
];

const partners = ["Ambasada Franceze", "Ambasada Italiane", "Ambasada Gjermane", "Ambasada Spanjolle", "Ambasada Turke", "Bashkimi Europian (BE)", "UNDP / EU4Schools"];

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="relative py-32 bg-[#04090F] overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnView>
          <div className="text-center mb-24">
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Rrugëtimi Ynë</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">Historia Jonë</h2>
          </div>
        </AnimateOnView>
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full bg-gradient-to-b from-crimson to-amber-500 origin-top"
              style={{ scaleY, height: "100%" }}
            />
          </div>
          <div className="space-y-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-48px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Desktop card */}
                  <div className={`hidden lg:block lg:w-5/12 ${isLeft ? "lg:pr-12 text-right" : "lg:pl-12 text-left"}`}>
                    <div className="bg-[#07111F]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-crimson/20 transition-all duration-300 group">
                      <span className="text-amber-400 text-sm font-bold tracking-widest">{item.year}</span>
                      <h3 className="font-serif font-bold text-white text-lg mt-1 mb-2 group-hover:text-amber-300 transition-colors">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="hidden lg:flex lg:w-2/12 justify-center">
                    <div className="w-4 h-4 rounded-full bg-crimson border-4 border-[#04090F] shadow-lg shadow-crimson/50 mt-5 relative z-10" />
                  </div>
                  <div className={`hidden lg:block lg:w-5/12`} />

                  {/* Mobile layout */}
                  <div className="lg:hidden flex gap-4 pl-14 w-full">
                    <div className="absolute left-4 top-4 w-4 h-4 rounded-full bg-crimson border-4 border-[#04090F] shadow-lg shadow-crimson/50 relative z-10" />
                    <div className="bg-[#07111F]/50 backdrop-blur-md rounded-2xl p-5 border border-white/5 flex-1">
                      <span className="text-amber-400 text-sm font-bold tracking-widest">{item.year}</span>
                      <h3 className="font-serif font-bold text-white text-base mt-1 mb-1.5">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  useSeo({
    title: "Rreth Nesh — Historia dhe Misioni",
    description: "Mësoni historinë, misionin dhe vlerat e Shkollës Asim Vokshi. Themeluar në 1965, ofrojmë arsim cilësor gjuhësor me mësues të kualifikuar.",
    path: "/rreth-nesh",
  });
  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative bg-[#04090F] pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${SCHOOL_IMAGES.building_front}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Themeluar më 15 shtator 1965</span>
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-6 leading-tight">Rreth Nesh</h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
              Shkolla e Mesme me Orientim Gjuhësor “Asim Vokshi” në Tiranë është një institucion arsimor me histori të pasur dhe reputacion të shkëlqyer, i dedikuar formimit akademik dhe kulturor të shumë brezave.
            </p>
          </AnimateOnView>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {[
              { label: "Viti i Themelimit", value: "1965" },
              { label: "Rikonstruksioni", value: "2024" },
              { label: "Gjuhë të Huaja", value: "7" },
              { label: "Seksione Dygjuhëshe", value: "2" },
            ].map((s, i) => (
              <AnimateOnView key={s.label} delay={i * 0.08}>
                <div className="bg-[#07111F]/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/5 hover:border-crimson/20 transition-colors duration-300">
                  <div className="text-3xl lg:text-4xl font-serif font-bold text-white mb-1">{s.value}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">{s.label}</div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </div>

      {/* Kush ishte Asim Vokshi */}
      <section className="py-24 bg-[#04090F] relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnView>
              <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <img src={SCHOOL_IMAGES.teachers_historical} alt="Asim Vokshi Historik" className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-transparent to-transparent" />
              </div>
            </AnimateOnView>
            <AnimateOnView delay={0.1}>
              <div>
                <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Figura Historike</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">Kush ishte ASIM VOKSHI?</h2>
                <div className="text-white/60 text-sm sm:text-base space-y-4 leading-relaxed">
                  <p>
                    Asim Vokshi lindi në Gjakovë, Kosovë, në një familje me tradita patriotike. Arsimin fillor e nisi në qytetin e lindjes gjatë viteve 1916-1918 dhe e përfundoi në Kolgecaj. Shkollën e mesme e kreu në Shkodër.
                  </p>
                  <p>
                    Më pas, ndoqi Akademinë Ushtarake në Itali, nga u kthye në vitin 1932 me gradën nëntoger. Ai mori pjesë dhe në luftën e Spanjës. Vdiq në Spanjë, më 4 tetor 1937.
                  </p>
                </div>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 bg-[#04090F] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="text-center mb-20">
              <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Shtyllat Tona</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Misioni Ynë</h2>
              <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">Tre shtylla kryesore që drejtojnë çdo aspekt të rrugëtimit tonë arsimor.</p>
            </div>
          </AnimateOnView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Orientim Gjuhësor", desc: "Formojmë nxënës me kompetenca të larta gjuhësore në anglisht, frëngjisht, gjermanisht, italisht, spanjollisht, turqisht dhe rusisht.", color: "text-amber-400" },
              { icon: Target, title: "Integrim Ndërkombëtar", desc: "Seksione dygjuhëshe dhe bashkëpunim me partnerë diplomatikë për t'u dhënë nxënësve dritare drejt botës.", color: "text-crimson" },
              { icon: Users, title: "Formim Akademik", desc: "Metoda bashkëkohore mësimore dhe mjedise moderne për një përgatitje të shkëlqyer në të gjitha lëndët.", color: "text-blue-400" },
            ].map((pillar, i) => (
              <AnimateOnView key={pillar.title} delay={i * 0.1}>
                <div className="bg-[#07111F]/40 backdrop-blur-md text-center p-8 rounded-2xl border border-white/5 hover:border-crimson/20 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${pillar.color}`}>
                    <pillar.icon size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-white text-xl mb-3">{pillar.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* Leadership */}
      <section className="py-32 bg-[#04090F] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="text-center mb-20">
              <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Lidershipi Akademik</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">Drejtuesit & Shërbimi Psikosocial</h2>
            </div>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person, i) => (
              <AnimateOnView key={person.name} delay={(i % 3) * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-[#07111F]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-crimson/20 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crimson to-amber-500 flex items-center justify-center mb-5 shadow-lg shadow-crimson/20">
                      <span className="text-white font-serif font-bold text-lg">{person.name[0]}</span>
                    </div>
                    <h3 className="font-serif font-bold text-white text-lg">{person.name}</h3>
                    <p className="text-amber-400 text-xs uppercase tracking-widest font-bold mt-1 mb-3">{person.role}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{person.desc}</p>
                  </div>
                </motion.div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-32 bg-[#04090F] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="text-center mb-20">
              <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Mjediset Bashkëkohore</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">Ambientet Shkollore</h2>
            </div>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <AnimateOnView key={f.title} delay={(i % 3) * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-[#07111F]/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-crimson/20 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300"
                >
                  <span className="text-4xl mb-5 block">{f.icon}</span>
                  <h3 className="font-serif font-bold text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-[#04090F] relative overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimateOnView>
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-10">Partnerët Strategjikë</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="px-6 py-3 bg-[#07111F]/80 backdrop-blur-md rounded-xl border border-white/5 text-white/70 text-sm font-semibold shadow-lg hover:border-crimson/30 hover:text-white transition-colors cursor-pointer"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </AnimateOnView>
        </div>
      </section>
    </PageTransition>
  );
}
