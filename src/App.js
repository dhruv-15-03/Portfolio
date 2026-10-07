import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import PageTransition from "./components/PageTransition";
import LazyBoundary from "./components/LazyBoundary";
import LitePerf, { isLitePerf } from "./components/LitePerf";
import DeferredAnalytics from "./components/DeferredAnalytics";
import { IconContext } from "react-icons";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Route-level code splitting: only Home ships in the initial bundle; every
// other page is fetched on demand.
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/ResumeNew"));
const Certifications = lazy(() => import("./components/Certifications/Certifications"));
const BootUsageCase = lazy(() => import("./components/Work/BootUsageCase"));
const AICourtCase = lazy(() => import("./components/Work/AICourtCase"));
const AlgoVisualizerCase = lazy(() => import("./components/Work/AlgoVisualizerCase"));
// CommandPalette is power-user UI — mounted once the page is idle or on first hotkey.
const CommandPalette = lazy(() => import("./components/CommandPalette"));

const isVercelHost =
  typeof window !== "undefined" &&
  window.location.hostname.endsWith(".vercel.app");

const isPaletteHotkey = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") return true;
  const el = document.activeElement;
  return (
    e.key === "/" &&
    !!el &&
    !["INPUT", "TEXTAREA"].includes(el.tagName) &&
    !el.isContentEditable
  );
};

function App() {
  const [load, upadateLoad] = useState(true);
  const [paletteReady, setPaletteReady] = useState(false);
  const [paletteOpenOnMount, setPaletteOpenOnMount] = useState(false);
  const [paletteMounted, setPaletteMounted] = useState(false);
  const handlePaletteReady = useCallback(() => setPaletteMounted(true), []);
  const lite = isLitePerf();

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Until the lazy palette has attached its own hotkey listener, capture the
  // opening keystroke here (including the navbar's synthetic Ctrl+K) so the
  // first press opens it instead of only starting the chunk download.
  useEffect(() => {
    if (paletteMounted) return undefined;

    const onKey = (e) => {
      if (!isPaletteHotkey(e)) return;
      e.preventDefault();
      setPaletteOpenOnMount(true);
      setPaletteReady(true);
    };
    window.addEventListener("keydown", onKey);

    let cancelArm = () => {};
    if (!paletteReady) {
      const arm = () => setPaletteReady(true);
      if (typeof window.requestIdleCallback === "function") {
        const handle = window.requestIdleCallback(arm, { timeout: 3000 });
        cancelArm = () => window.cancelIdleCallback(handle);
      } else {
        const handle = window.setTimeout(arm, 1500);
        cancelArm = () => window.clearTimeout(handle);
      }
    }

    return () => {
      cancelArm();
      window.removeEventListener("keydown", onKey);
    };
  }, [paletteReady, paletteMounted]);

  return (
    <Router>
      {/* Decorative react-icons get aria-hidden + focusable=false globally so
          screen readers skip them (each interactive control has its own text
          or aria-label). react-icons spreads this context onto every <svg>. */}
      <IconContext.Provider
        value={{ attr: { "aria-hidden": "true", focusable: "false" } }}
      >
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        {/* Keyboard users land here first — jumps straight past the nav to the
            route content. Visually hidden until focused. */}
        <a href="#main-content" className="skip-link">Skip to content</a>
        {/* Premium polish layer — cursor + scroll progress + global spotlight.
            All three degrade gracefully on touch / reduced-motion / <1280px,
            and the decorative layers are skipped entirely in lite mode. */}
        <LitePerf />
        {!lite && <Cursor />}
        <ScrollProgress />
        {paletteReady && (
          <LazyBoundary fallback={null}>
            <Suspense fallback={null}>
              <CommandPalette
                initialOpen={paletteOpenOnMount}
                onReady={handlePaletteReady}
              />
            </Suspense>
          </LazyBoundary>
        )}
        {/* Vercel Analytics only exists on Vercel; elsewhere (Cloudflare Pages)
            its script URL falls through to the SPA and logs a MIME error. */}
        {isVercelHost && <DeferredAnalytics />}
        {!lite && <div className="global-spotlight" aria-hidden="true" />}
        {!lite && <div className="grain-overlay" aria-hidden="true" />}
        <div className="brand-corner" aria-hidden="true" />

        <Navbar />
        <ScrollToTop />
        <main id="main-content">
        <PageTransition>
          <LazyBoundary>
            <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/certifications" element={<Certifications />} />
                {/* Long-form case studies — the "engineering body of work" routes.
                    /resume kept as the canonical career URL; the nav says "Career". */}
                <Route path="/work/boot-usage" element={<BootUsageCase />} />
                <Route path="/work/ai-court" element={<AICourtCase />} />
                <Route path="/work/algovisualizer" element={<AlgoVisualizerCase />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </LazyBoundary>
        </PageTransition>
        </main>
        {/* Global CTA + Footer — always the last thing a visitor sees on any
            route, so there's always a clear next action (email / LinkedIn). */}
        <CTA />
        <Footer />
      </div>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
