'use client';

import { useEffect } from 'react';

/**
 * Security Guard Component
 * - Adds a copyright warning in console
 * - Disables right-click on images and sensitive content
 * - Adds keyboard shortcut detection for DevTools attempts
 * - Clears console in production to avoid leaking debug info
 */
export default function SecurityGuard() {
  useEffect(() => {
    const isProd = process.env.NODE_ENV === 'production';

    // ── 1. Console branding + warning ─────────────────────────────────────
    console.clear();
    console.log(
      '%c⛔ تحذير | WARNING',
      'color: #c5a25d; font-size: 24px; font-weight: bold; background: #070504; padding: 8px 16px; border-radius: 4px;'
    );
    console.log(
      '%cهذه المنطقة مخصصة للمطورين فقط.\nأي محاولة لاستغلال هذا الموقع أو سرقة بياناته تُعدّ جريمة يعاقب عليها القانون.\n\nWARNING: This is a private system. Unauthorized access or data theft is a criminal offense.',
      'color: #ff4444; font-size: 13px; font-family: monospace;'
    );
    console.log(
      '%c© DAHAB PERFUMES ' + new Date().getFullYear() + ' — All Rights Reserved',
      'color: #888; font-size: 11px;'
    );

    // ── 2. Disable F12 / Ctrl+Shift+I / Ctrl+U (view source) ─────────────
    const blockDevKeys = (e) => {
      const key = e.key;
      const ctrl = e.ctrlKey || e.metaKey;

      // F12
      if (key === 'F12') { e.preventDefault(); return false; }
      // Ctrl+Shift+I (DevTools)
      if (ctrl && e.shiftKey && (key === 'I' || key === 'i')) { e.preventDefault(); return false; }
      // Ctrl+Shift+J (Console)
      if (ctrl && e.shiftKey && (key === 'J' || key === 'j')) { e.preventDefault(); return false; }
      // Ctrl+Shift+C (Inspector)
      if (ctrl && e.shiftKey && (key === 'C' || key === 'c')) { e.preventDefault(); return false; }
      // Ctrl+U (View Source)
      if (ctrl && (key === 'U' || key === 'u')) { e.preventDefault(); return false; }
      // Ctrl+S (Save page)
      if (ctrl && (key === 'S' || key === 's')) { e.preventDefault(); return false; }
    };

    document.addEventListener('keydown', blockDevKeys);

    // ── 3. Disable right-click ────────────────────────────────────────────
    const blockContextMenu = (e) => {
      // Only block on images and product content
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'img' || e.target?.closest?.('[data-protected]')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', blockContextMenu);

    // ── 4. Detect DevTools open (size change method) ──────────────────────
    // When DevTools open in undocked mode, window.outerWidth changes
    let devToolsOpen = false;
    const devToolsChecker = setInterval(() => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      if ((widthThreshold || heightThreshold) && !devToolsOpen) {
        devToolsOpen = true;
        // Just log a server-side warning — don't break the page for legitimate devs
        if (isProd) {
          console.clear();
          console.log('%c⛔ الوصول غير مصرح به | Unauthorized', 'color: red; font-size: 20px; font-weight: bold;');
        }
      } else if (!widthThreshold && !heightThreshold) {
        devToolsOpen = false;
      }
    }, 1000);

    // ── 5. Disable image drag ─────────────────────────────────────────────
    const blockImgDrag = (e) => {
      if (e.target?.tagName?.toLowerCase() === 'img') {
        e.preventDefault();
      }
    };
    document.addEventListener('dragstart', blockImgDrag);

    return () => {
      document.removeEventListener('keydown', blockDevKeys);
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('dragstart', blockImgDrag);
      clearInterval(devToolsChecker);
    };
  }, []);

  return null; // This component renders nothing
}
