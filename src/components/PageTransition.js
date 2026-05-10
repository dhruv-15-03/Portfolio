import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * PageTransition — wraps the routed page and applies a fade+slide on every
 * route change. We *don't* use a heavy library (Framer Motion) for this; a
 * tiny key swap + CSS animation gives 95% of the perceived quality at 0
 * runtime cost.
 *
 * The key on the inner div is the pathname → React unmounts/remounts on
 * navigation, which re-triggers the CSS keyframe.
 */
function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [renderKey, setRenderKey] = useState(pathname);

  useEffect(() => {
    setRenderKey(pathname);
    // Scroll to top on route change *before* paint to avoid a flicker.
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div key={renderKey} className="page-transition">
      {children}
    </div>
  );
}

export default PageTransition;
