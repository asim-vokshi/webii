import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Staff from "@/pages/staff";
import Departments from "@/pages/departments";
import Infrastructure from "@/pages/infrastructure";
import Regulations from "@/pages/regulations";
import News from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import StudentLife from "@/pages/student-life";
import Clubs from "@/pages/clubs";
import Projects from "@/pages/projects";
import Career from "@/pages/career";
import Calendar from "@/pages/calendar";
import Contact from "@/pages/contact";
import Schedule from "@/pages/schedule";
import NotFound from "@/pages/not-found";
import Admin from "@/pages/admin";

// Components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ShaderBackground } from "@/components/shader-background";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Preloader } from "@/components/preloader";

function AnimatedRoutes() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/rreth-nesh" component={About} />
        <Route path="/stafi" component={Staff} />
        <Route path="/departamente" component={Departments} />
        <Route path="/infrastruktura" component={Infrastructure} />
        <Route path="/rregullore" component={Regulations} />
        <Route path="/lajme" component={News} />
        <Route path="/lajme/:id" component={NewsDetail} />
        <Route path="/jeta-studentore" component={StudentLife} />
        <Route path="/klube" component={Clubs} />
        <Route path="/projektet" component={Projects} />
        <Route path="/karriera" component={Career} />
        <Route path="/kalendar" component={Calendar} />
        <Route path="/orari" component={Schedule} />
        <Route path="/kontakt" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#04090F] text-foreground transition-colors duration-300 relative overflow-hidden">
      <ScrollToTop />
      <Preloader />
      <ShaderBackground />
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 w-full">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  if (location === "/admin") return <Admin />;
  return <MainLayout />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <SmoothScroll>
            <Router />
          </SmoothScroll>
          <Toaster position="top-right" closeButton richColors />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
