import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import PromoStrip from './components/PromoStrip';
import MobileBottomBar from './components/MobileBottomBar';
import ExitIntentModal from './components/ExitIntentModal';
import Analytics from './components/Analytics';
import StickyScrollCTA from './components/StickyScrollCTA';
import CustomCursor from './components/CustomCursor';

// Home stays eager (LCP route); the rest is code-split for fast first paint.
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const FreeAudit = lazy(() => import('./pages/FreeAudit'));
const Process = lazy(() => import('./pages/Process'));
const TradingTools = lazy(() => import('./pages/TradingTools'));
const WhatsAppAutomation = lazy(() => import('./pages/WhatsAppAutomation'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CityLanding = lazy(() => import('./pages/CityLanding'));
const IndustryLanding = lazy(() => import('./pages/IndustryLanding'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const AuditChecklist = lazy(() => import('./pages/AuditChecklist'));

const RouteFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--line)', borderTopColor: 'var(--accent)', animation: 'spin 0.7s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/in/:city" element={<CityLanding />} />
            <Route path="/for/:industry" element={<IndustryLanding />} />
            <Route path="/free-audit" element={<FreeAudit />} />
            <Route path="/audit-checklist" element={<AuditChecklist />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/process" element={<Process />} />
            <Route path="/trading-tools" element={<TradingTools />} />
            <Route path="/whatsapp-automation" element={<WhatsAppAutomation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router basename="/urban-cairn-website">
      <ScrollToTop />
      <Analytics />
      <CustomCursor />
      <PromoStrip />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
        <StickyScrollCTA />
        <MobileBottomBar />
        <ExitIntentModal />
      </div>
    </Router>
  );
}

export default App;
