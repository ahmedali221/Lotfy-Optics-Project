import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';

// Last scroll position per history entry, so Back/Forward can return to it.
const positions = new Map<string, number>();
// Position a Back/Forward navigation still has to reach once async content loads.
let pendingRestore: { key: string; y: number } | null = null;

export function ScrollToTop() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const onScroll = () => positions.set(key, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [key]);

  useEffect(() => {
    const pathChanged = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (navigationType === 'POP') {
      const y = positions.get(key) ?? 0;
      pendingRestore = { key, y };
      window.scrollTo(0, y);
    } else if (pathChanged) {
      // New page: start at the top. Query-only changes (filters) keep the scroll.
      pendingRestore = null;
      window.scrollTo(0, 0);
    }
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

// Call from pages that load their content asynchronously: once `ready` is true,
// a pending Back/Forward scroll position is applied (the page was too short before).
export function useRestoreScroll(ready: boolean) {
  const { key } = useLocation();

  useEffect(() => {
    if (!ready || pendingRestore?.key !== key) return;
    const { y } = pendingRestore;
    pendingRestore = null;
    requestAnimationFrame(() => window.scrollTo(0, y));
  }, [ready, key]);
}
