import React from "react";

/**
 * LazyBoundary — catches a failed lazy import (typically a stale chunk URL
 * after a redeploy) so one missing chunk cannot blank the whole app.
 * Pass `fallback={null}` for optional UI such as the command palette;
 * otherwise a short message with a reload action is shown.
 */
export default class LazyBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("Lazy-loaded UI failed to render", error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;
    return (
      <section
        role="alert"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "120px 24px 48px",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.92)",
        }}
      >
        <p style={{ margin: 0 }}>
          This page failed to load. The site may have just been updated.
        </p>
        <button
          type="button"
          className="cta cta-primary"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </section>
    );
  }
}
