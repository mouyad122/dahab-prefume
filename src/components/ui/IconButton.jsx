'use client';

import React from 'react';

export default function IconButton({
  icon: Icon,
  variant = 'secondary', // primary, secondary, ghost, danger
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  size = 40,
  iconSize = 20,
  title = '',
  ...props
}) {
  const baseClasses = 'inline-grid place-items-center rounded-md font-bold transition-all duration-250 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-50 disabled:pointer-events-none flex-shrink-0';
  
  const variantClasses = {
    primary: 'bg-[linear-gradient(135deg,#c5a049_0%,#ecd393_50%,#9e7929_100%)] text-[#040302] border border-[rgba(255,223,122,0.4)] shadow-md hover:bg-[position:right_center] hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white/5 text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-gold-dim)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold-light)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-gold-light)] hover:bg-white/5',
    danger: 'bg-[rgba(180,30,30,0.1)] text-[#f97171] hover:bg-[rgba(180,30,30,0.2)]',
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant] || variantClasses.secondary} ${className}`;

  return (
    <button 
      type={type} 
      className={finalClassName} 
      onClick={onClick} 
      disabled={disabled || loading}
      title={title}
      style={{ width: size, height: size }}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon size={iconSize} weight="bold" />
      ) : null}
    </button>
  );
}
