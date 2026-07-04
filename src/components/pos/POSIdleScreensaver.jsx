'use client';

import React, { useState, useEffect } from 'react';
import { LockKey, Sparkle, X } from '@phosphor-icons/react';
import LuxuryButton from '../ui/LuxuryButton';
import { usePosContext } from '../../contexts/PosContext';

export default function POSIdleScreensaver({ 
  onWake, 
  showClock = true,
  requirePin = false
}) {
  const { employee } = usePosContext();
  const [time, setTime] = useState(new Date());
  const [imgError, setImgError] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);

  useEffect(() => {
    if (!showClock) return;
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [showClock]);

  const handlePointerDown = (e) => {
    if (isPinModalOpen) return;
    e.preventDefault();
    e.stopPropagation();
    
    if (requirePin) {
      setIsPinModalOpen(true);
      setPinInput('');
      setPinError('');
    } else {
      onWake();
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinAttempts >= 5) {
      setPinError('تم تجاوز عدد المحاولات المسموحة. يرجى الانتظار 30 ثانية.');
      return;
    }

    // Default PIN verification: check employee custom pin or default 1234 / 0000
    const validPins = [employee?.pin, '1234', '0000'].filter(Boolean);
    
    if (validPins.includes(pinInput.trim())) {
      setIsPinModalOpen(false);
      onWake();
    } else {
      setPinAttempts(prev => prev + 1);
      setPinError('رمز PIN غير صحيح. حاول مرة أخرى.');
      setPinInput('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black animate-in fade-in duration-700 cursor-pointer select-none dir-ar"
      onPointerDown={handlePointerDown}
    >
      {/* Dark Obsidian luxury background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070504] via-[#120e09] to-[#070504]" />
      
      {/* Soft Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] bg-[#c5a25d]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center pointer-events-none">
        {/* Brand Logo with Image Fallback */}
        <div className="flex flex-col items-center gap-3">
          {!imgError ? (
            <img 
              src="/brand/dahab-logo.png" 
              alt="DAHAB PERFUMES" 
              onError={() => setImgError(true)}
              className="w-48 h-auto max-h-36 object-contain drop-shadow-[0_0_20px_rgba(197,162,93,0.2)]"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-[#c5a25d]/15 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d]">
                <Sparkle size={28} weight="fill" className="animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold font-serif text-[#f3e5c8] tracking-widest uppercase">
                DAHAB PERFUMES
              </h1>
            </div>
          )}
        </div>

        {/* Clock */}
        {showClock && (
          <div className="text-4xl md:text-6xl font-mono tracking-widest text-white/90 font-light mt-4">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}

        {/* Action instruction text */}
        <div className="mt-8 text-sm text-[#c5a25d] animate-pulse tracking-widest uppercase font-bold">
          {requirePin ? 'انقر لإدخال الرمز السري والمتابعة' : 'انقر في أي مكان لمتابعة العمل'}
        </div>
      </div>

      {/* PIN Unlock Modal Overlay */}
      {isPinModalOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <form onSubmit={handlePinSubmit} className="glass-card w-full max-w-sm p-6 border border-[#c5a25d]/30 rounded-3xl bg-[#121216] text-white text-center dir-ar space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#c5a25d]/10 border border-[#c5a25d]/30 flex items-center justify-center text-[#c5a25d] mx-auto">
              <LockKey size={24} weight="duotone" />
            </div>

            <div>
              <h2 className="text-lg font-bold font-serif text-white">رمز الأمان PIN</h2>
              <p className="text-xs text-gray-400 mt-1">أدخل الرمز السري الخاص بك لإلغاء القفل</p>
            </div>

            {pinError && (
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-semibold">
                {pinError}
              </div>
            )}

            <div>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full text-center text-2xl tracking-[0.5em] font-mono bg-[#0a0a0c] border border-[#c5a25d]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a25d]"
                autoFocus
              />
            </div>

            <div className="flex gap-3 pt-2">
              <LuxuryButton
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => setIsPinModalOpen(false)}
              >
                إلغاء
              </LuxuryButton>
              <LuxuryButton
                type="submit"
                variant="primary"
                size="sm"
                fullWidth
              >
                تأكيد
              </LuxuryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
