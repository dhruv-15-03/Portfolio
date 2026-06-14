import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import Resume from "./components/Resume/ResumeNew";
import Certifications from "./components/Certifications/Certifications";
import BootUsageCase from "./components/Work/BootUsageCase";
import AICourtCase from "./components/Work/AICourtCase";
import AlgoVisualizerCase from "./components/Work/AlgoVisualizerCase";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import PageTransition from "./components/PageTransition";
import CommandPalette from "./components/CommandPalette";
import { IconContext } from "react-icons";
import { Analytics } from "@vercel/analytics/react";
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

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

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
            All three degrade gracefully on touch / reduced-motion / <1280px. */}
        <Cursor />
        <ScrollProgress />
        <CommandPalette />
        <Analytics />
        <div className="global-spotlight" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        <div className="brand-corner" aria-hidden="true" />

        <Navbar />
        <ScrollToTop />
        <main id="main-content">
        <PageTransition>
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
