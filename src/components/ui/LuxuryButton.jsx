'use client';

import React from 'react';
import Link from 'next/link';

export default function LuxuryButton({
  children,
  variant = 'primary', // primary, secondary, outline, ghost, danger, success, whatsapp, admin, pos, icon, light
  size = 'md', // sm, md, lg, xl, icon
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  iconLeft: IconLeft,
  iconRight: IconRight,
  fullWidth = false,
  'aria-label': ariaLabel,
  ...props
}) {
  // Enforce aria-label for icon buttons
  if ((variant === 'icon' || !children) && !ariaLabel) {
    console.warn('LuxuryButton: icon-only buttons require an aria-label for accessibility.');
  }

  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 cursor-pointer whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group select-none';
  
  // Sizes
  const sizeClasses = {
    sm: 'px-4 py-2 min-h-[36px] text-sm',
    md: 'px-6 py-3 min-h-[44px] text-[0.95rem]',
    lg: 'px-8 py-4 min-h-[52px] text-base font-semibold',
    xl: 'px-10 py-5 min-h-[60px] text-lg font-semibold',
    icon: 'p-2 min-h-[44px] min-w-[44px]',
  };

  // Variants
  const variantClasses = {
    primary: 'bg-[linear-gradient(135deg,#c5a049_0%,#ecd393_50%,#9e7929_100%)] bg-[length:200%_auto] text-[#040302] border border-[rgba(255,223,122,0.4)] shadow-[0_4px_20px_rgba(196,154,68,0.25)] hover:bg-[position:right_center] hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(196,154,68,0.35),0_0_15px_rgba(255,223,122,0.2)] active:translate-y-0 active:scale-[0.98]',
    secondary: 'bg-white/5 backdrop-blur-md text-[var(--color-text-primary)] border border-white/10 hover:bg-white/10 hover:border-[var(--color-gold-light)] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(196,154,68,0.15)] active:translate-y-0 active:scale-[0.98]',
    outline: 'bg-transparent text-[var(--color-gold-light)] border-2 border-[var(--color-border-strong)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-dim)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98]',
    ghost: 'bg-transparent text-[var(--color-text-primary)] border border-transparent hover:text-[var(--color-gold-light)] hover:bg-white/5 hover:backdrop-blur-sm active:scale-[0.98]',
    danger: 'bg-[rgba(220,38,38,0.1)] backdrop-blur-md text-red-400 border border-[rgba(220,38,38,0.2)] hover:bg-[rgba(220,38,38,0.2)] hover:border-[rgba(220,38,38,0.4)] hover:-translate-y-[1px] active:scale-[0.98]',
    success: 'bg-[rgba(34,197,94,0.1)] backdrop-blur-md text-green-400 border border-[rgba(34,197,94,0.2)] hover:bg-[rgba(34,197,94,0.15)] hover:border-[rgba(34,197,94,0.3)] hover:-translate-y-[1px] active:scale-[0.98]',
    whatsapp: 'bg-white/[0.03] backdrop-blur-md text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:bg-[var(--color-gold-dim)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold-light)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98]',
    admin: 'bg-[var(--color-bg-surface)] backdrop-blur-md text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-bg-raised)] hover:border-[var(--color-border-strong)] shadow-sm active:scale-[0.98]',
    pos: 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-md hover:border-[var(--color-gold)] hover:bg-[var(--color-bg-raised)] active:scale-[0.97] transition-colors duration-150', // fast transition, minimal movement
    icon: 'bg-transparent text-[var(--color-text-primary)] border border-transparent hover:bg-white/10 hover:text-[var(--color-gold-light)] rounded-full active:scale-[0.95]',
    light: 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] border border-transparent shadow-md hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] active:translate-y-0 active:scale-[0.98]',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const finalSize = variant === 'icon' ? sizeClasses.icon : (sizeClasses[size] || sizeClasses.md);
  const finalVariant = variantClasses[variant] || variantClasses.primary;

  const finalClassName = `${baseClasses} ${finalSize} ${finalVariant} ${widthClass} ${className}`.trim();

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && IconLeft && <IconLeft size={18} weight="bold" className="shrink-0" />}
      {children}
      {!loading && IconRight && <IconRight size={18} weight="bold" className="shrink-0" />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || props.target === '_blank';
    
    if (isExternal) {
      return (
        <a href={href} className={finalClassName} aria-label={ariaLabel} {...props}>
          {content}
        </a>
      );
    }
    
    return (
      <Link href={href} className={finalClassName} aria-label={ariaLabel} {...props}>
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
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  );
}
