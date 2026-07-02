'use client';

import React from 'react';
import Link from 'next/link';

export default function Button({
  children,
  variant = 'primary', // primary, secondary, outline, ghost, danger, success, print, pos
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 cursor-pointer whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group';
  
  // Padding & Size
  const sizeClasses = 'px-6 py-3 min-h-[48px] text-[0.9rem] tracking-wide';
  
  const variantClasses = {
    primary: 'bg-[linear-gradient(135deg,#c5a049_0%,#ecd393_50%,#9e7929_100%)] bg-[length:200%_auto] text-[#040302] border border-[rgba(255,223,122,0.4)] shadow-[0_4px_20px_rgba(196,154,68,0.25)] hover:bg-[position:right_center] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(196,154,68,0.4),0_0_20px_rgba(255,223,122,0.3)] active:translate-y-0 active:scale-95',
    secondary: 'bg-white/5 backdrop-blur-md text-[var(--color-text-primary)] border border-white/10 hover:bg-white/10 hover:border-[var(--color-gold-light)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(196,154,68,0.15)] active:translate-y-0 active:scale-95',
    outline: 'bg-transparent text-[var(--color-gold-light)] border-2 border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black hover:-translate-y-1 active:translate-y-0 active:scale-95',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] border border-transparent hover:text-[var(--color-gold-light)] hover:bg-white/5 hover:backdrop-blur-sm active:scale-95',
    danger: 'bg-[rgba(180,30,30,0.12)] backdrop-blur-md text-[#f97171] border border-[rgba(180,30,30,0.3)] hover:bg-[rgba(180,30,30,0.22)] hover:border-[rgba(180,30,30,0.5)] hover:-translate-y-1 active:scale-95',
    success: 'bg-[rgba(37,211,102,0.1)] backdrop-blur-md text-[#5ddb85] border border-[rgba(37,211,102,0.25)] hover:bg-[rgba(37,211,102,0.18)] hover:border-[rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-95',
    print: 'bg-white text-black border border-gray-300 hover:bg-gray-100 print:hidden shadow-sm',
    pos: 'bg-[var(--color-bg-surface)] backdrop-blur-lg text-[var(--color-gold-light)] border border-[var(--color-border)] hover:bg-[var(--color-gold-dim)] hover:border-[var(--color-gold)] shadow-md min-h-[64px] text-base active:scale-95 hover:-translate-y-1 transition-all',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const finalClassName = `${baseClasses} ${sizeClasses} ${variantClasses[variant] || variantClasses.primary} ${widthClass} ${className}`;

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon size={18} weight="bold" />
      ) : null}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={finalClassName} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      className={finalClassName} 
      onClick={onClick} 
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
