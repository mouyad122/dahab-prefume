'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function usePOSIdleTimer({ enabled = true, timeoutMinutes = 4 }) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutId = useRef(null);
  const isThrottled = useRef(false);

  // We keep track of the latest values in refs to avoid stale closures in event listeners
  const isIdleRef = useRef(isIdle);
  const enabledRef = useRef(enabled);
  const timeoutRef = useRef(timeoutMinutes);

  useEffect(() => {
    isIdleRef.current = isIdle;
    enabledRef.current = enabled;
    timeoutRef.current = timeoutMinutes;
  }, [isIdle, enabled, timeoutMinutes]);

  const setIdleState = useCallback((idle) => {
    setIsIdle(idle);
    isIdleRef.current = idle;
  }, []);

  const resetTimer = useCallback(() => {
    if (!enabledRef.current) return;
    
    // Throttle the actual reset logic to at most once per 500ms to save performance on rapid events like mousemove
    if (isThrottled.current) return;
    isThrottled.current = true;
    setTimeout(() => { isThrottled.current = false; }, 500);
    
    // If we were idle, wake up immediately
    if (isIdleRef.current) {
      setIdleState(false);
    }
    
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    
    const timeMs = (timeoutRef.current || 4) * 60 * 1000;
    timeoutId.current = setTimeout(() => {
      setIdleState(true);
    }, timeMs);
  }, [setIdleState]);

  useEffect(() => {
    if (!enabled) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      setIdleState(false);
      return;
    }

    // Initial start
    resetTimer();

    const handleActivity = () => {
      resetTimer();
    };

    // Events to track
    const events = ['mousemove', 'mousedown', 'pointerdown', 'pointermove', 'touchstart', 'touchmove', 'keydown', 'wheel', 'scroll'];

    events.forEach(evt => {
      window.addEventListener(evt, handleActivity, { passive: true });
    });

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      events.forEach(evt => {
        window.removeEventListener(evt, handleActivity);
      });
    };
  }, [enabled, resetTimer, setIdleState]);

  const forceWake = useCallback(() => {
    isThrottled.current = false;
    resetTimer();
  }, [resetTimer]);

  return { isIdle, forceWake };
}
