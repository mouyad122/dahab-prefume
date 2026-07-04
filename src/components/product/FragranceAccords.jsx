'use client';

import React from 'react';

// Luxury color mapping for accords
const ACCORD_COLORS = {
  'فانيلا': '#F3E5AB', // creamy yellow
  'تبغ': '#5C4033', // brown
  'حلو': '#D98594', // muted pink/red
  'قرفة': '#D2691E', // cinnamon brown
  'بودري': '#F5F5DC', // beige
  'منعش': '#8FBC8F', // green
  'حمضي': '#FFD700', // yellow
  'خشبي': '#3E2723', // dark brown
  'زهري': '#FFB6C1', // rose
  'مسك': '#D3D3D3', // light gray
  'عنبر': '#FFBF00', // amber gold
  'شرقي': '#B8860B', // deep gold
  'توابل': '#B87333', // copper
  'جلدي': '#8B4513', // dark tan
  'أروماتك': '#008080', // teal/green
};

export default function FragranceAccords({ accords }) {
  if (!accords || accords.length === 0) return null;

  // Sort by strength descending or sort_order (position)
  // Assuming accords have { name_ar, strength }
  const sortedAccords = [...accords].sort((a, b) => (b.strength || 0) - (a.strength || 0));

  const getColorForAccord = (name) => {
    if (!name) return 'var(--color-gold)';
    for (const [key, color] of Object.entries(ACCORD_COLORS)) {
      if (name.includes(key)) {
        return color;
      }
    }
    return 'var(--color-gold)'; // default luxury color
  };

  return (
    <div className="fragrance-accords-container mt-6 w-full dir-ar">
      <h3 className="text-lg font-display text-[var(--color-gold-light)] mb-4 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-[var(--color-gold)]"></span>
        البصمات العطرية الرئيسية
        <span className="w-4 h-[1px] bg-[var(--color-gold)]"></span>
      </h3>
      
      <div className="flex flex-col gap-3">
        {sortedAccords.map((accord, idx) => {
          const strength = accord.strength || 50;
          const name = accord.name_ar || accord.name;
          const color = getColorForAccord(name);
          
          return (
            <div key={idx} className="w-full flex items-center gap-3">
              <span className="w-24 text-sm font-sans-ar text-[var(--color-text-secondary)] truncate text-right">
                {name}
              </span>
              <div className="flex-1 h-3 bg-[#1A1A1A] rounded-full overflow-hidden relative border border-white/5">
                <div 
                  className="h-full absolute right-0 top-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${strength}%`, 
                    backgroundColor: color,
                    opacity: 0.9 
                  }}
                />
              </div>
              <span className="w-8 text-xs font-mono text-[var(--color-text-muted)] text-left dir-ltr">
                {strength}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
