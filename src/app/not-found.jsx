import React from 'react';

/**
 * Custom bilingual 404 Not Found Page for DAHAB PERFUMES.
 * Rendered when a page route or slug does not match any official path.
 */
export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] text-center px-6 gap-5">
      <span className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold text-amber-500 border border-amber-500/20 bg-amber-500/5">
        404
      </span>
      
      <div className="flex flex-col gap-2 max-w-md">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider">
          عذراً، الصفحة غير متوفرة
        </h1>
        <h2 className="font-display text-sm md:text-base text-[var(--color-gold)] font-medium uppercase tracking-widest leading-none">
          Page Not Found
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-light mt-3 leading-relaxed">
          الصفحة التي تحاول الوصول إليها قد تكون حُذفت، تغيّر عنوانها، أو أنها غير متوفرة حالياً.
        </p>
        <p className="text-[10px] text-[var(--color-text-muted)] font-light leading-relaxed">
          The requested fragrance catalog page could not be located. It may have been relocated or is temporarily offline.
        </p>
      </div>

      <a 
        href="/" 
        className="btn-primary py-3.5 px-8 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2 shadow-lg"
      >
        الرئيسية / Go Home
      </a>
    </div>
  );
}
