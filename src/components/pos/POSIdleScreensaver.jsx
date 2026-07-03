'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * POSIdleScreensaver
 * Note: This is an in-app POS screensaver overlay designed for tablet/POS terminals.
 * It is not a real OS/device sleep mode, and it purposely avoids logging out the employee
 * or clearing active sales/cart states to prevent disrupting the checkout flow.
 */
export default function POSIdleScreensaver({ 
  onWake, 
  showClock = true,
  requirePin = false
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (!showClock) return;
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [showClock]);

  // Intercept the first touch/click to wake up, stopping it from triggering UI underneath
  const handleWake = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (requirePin) {
      // Future PIN implementation (could open a modal here, but for now just wake up)
      console.log('PIN required - placeholder');
      onWake();
    } else {
      onWake();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black animate-in fade-in duration-1000 cursor-pointer"
      onPointerDown={handleWake}
      onClick={handleWake}
      onTouchStart={handleWake}
    >
      {/* Dark Obsidian luxury background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070504] via-[#110a07] to-[#070504]"></div>
      
      {/* Subtle gold particles / glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] bg-[var(--color-gold)] opacity-5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 pointer-events-none">
        {/* Logo */}
        <div className="relative w-64 h-80 md:w-80 md:h-96">
          <Image 
            src="/images/pos-logo.jpg" 
            alt="Dahab Perfumes" 
            fill 
            className="object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_25px_rgba(214,184,120,0.15)]"
            priority
          />
        </div>

        {/* Clock */}
        {showClock && (
          <div className="text-3xl md:text-5xl font-mono tracking-widest text-[var(--color-text-secondary)] opacity-80 font-light">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}

        {/* Action text */}
        <div className="mt-12 text-sm text-[var(--color-gold)] opacity-70 animate-pulse tracking-widest uppercase font-bold">
          {requirePin ? 'انقر لإدخال الرمز السري' : 'انقر للمتابعة'}
        </div>
      </div>
    </div>
  );
}
