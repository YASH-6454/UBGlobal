'use client';
import { useEffect, useState } from 'react';
import BrandLoader from './BrandLoader';

const MIN_MS = 1200; // always show the logo long enough to be seen
const MAX_MS = 3000; // never keep visitors waiting longer than this
const KEY = 'ubg_splash_seen';

/**
 * Full-screen logo splash, shown once per browser session.
 * The overlay is part of the server-rendered HTML (no flash of the bare page);
 * a tiny inline script in layout.js adds `splash-skip` to <html> for repeat
 * visits and /admin so it never appears there.
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState('show'); // show -> hide -> gone

  useEffect(() => {
    if (document.documentElement.classList.contains('splash-skip')) {
      const t = setTimeout(() => setPhase('gone'), 0); // CSS already hides it; remove from the DOM
      return () => clearTimeout(t);
    }
    try { sessionStorage.setItem(KEY, '1'); } catch {}

    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setPhase('hide');
      setTimeout(() => setPhase('gone'), 600);
    };
    const whenReady = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      setTimeout(finish, wait);
    };

    if (document.readyState === 'complete') whenReady();
    else window.addEventListener('load', whenReady, { once: true });
    const cap = setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener('load', whenReady);
      clearTimeout(cap);
    };
  }, []);

  if (phase === 'gone') return null;
  return (
    <div id="ubg-splash" data-hide={phase === 'hide'} aria-hidden={phase === 'hide'}>
      <BrandLoader />
    </div>
  );
}
