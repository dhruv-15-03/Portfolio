import { useEffect, useState } from "react";

/**
 * useSiteStats — real visitor counter, not a fake.
 * ----------------------------------------------------------------------------
 * Talks to https://counterapi.dev — a free public counter service. No signup,
 * no auth, no backend of our own. The price you pay: anyone with curl can
 * increment the counter, so the number is *directional*, not audit-grade. For
 * a portfolio vanity metric that's fine — recruiters care about the order of
 * magnitude, not the exact value.
 *
 * Honesty rules baked in:
 *   1. Increment ONCE per browser session (sessionStorage guard) so a refresh
 *      doesn't inflate the count.
 *   2. If the API is down, the hook returns { ready: false } and the caller
 *      hides the UI. We never display a fake number.
 *   3. The count returned is whatever the API reports — we don't add to it.
 *
 * To wire your own counter: just change `WORKSPACE` / `KEY` below. The first
 * GET creates the counter; no setup step needed.
 */

const WORKSPACE = "dhruv-rastogi-portfolio";
const KEY = "site-views";
const SESSION_FLAG = `counted:${WORKSPACE}:${KEY}`;

export default function useSiteStats() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();

    // Decide whether THIS session has already been counted.
    let alreadyCounted = false;
    try {
      alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch {
      // SessionStorage may be blocked (Safari private mode, etc.) — fall through.
    }

    const path = alreadyCounted
      ? `https://api.counterapi.dev/v1/${WORKSPACE}/${KEY}`     // read only
      : `https://api.counterapi.dev/v1/${WORKSPACE}/${KEY}/up`; // increment + read

    fetch(path, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        // CounterAPI returns { count: N } in v1; older shape uses { value: N }.
        const n = typeof data?.count === "number" ? data.count : data?.value;
        if (typeof n === "number") {
          setCount(n);
          try { sessionStorage.setItem(SESSION_FLAG, "1"); } catch { /* ignore */ }
        } else {
          setError(true);
        }
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setError(true);
      });

    return () => ctrl.abort();
  }, []);

  return {
    count,
    ready: count !== null,
    error,
  };
}
