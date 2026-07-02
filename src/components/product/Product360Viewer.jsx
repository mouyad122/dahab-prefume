'use client';

import React, { useMemo, useRef, useState } from 'react';

export default function Product360Viewer({ images, productName, isAr, outOfStock }) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [frame, setFrame] = useState(0);
  const dragRef = useRef({ active: false, startX: 0, startFrame: 0 });

  const rotateTo = (clientX) => {
    if (!dragRef.current.active || safeImages.length <= 1) return;
    const delta = clientX - dragRef.current.startX;
    const step = Math.round(delta / 12);
    const next = dragRef.current.startFrame - step;
    setFrame(((next % safeImages.length) + safeImages.length) % safeImages.length);
  };

  const startDrag = (clientX) => {
    dragRef.current = { active: true, startX: clientX, startFrame: frame };
  };

  const stopDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <div
      className="w-full aspect-square rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--color-border-strong)] bg-gradient-to-br from-[var(--color-bg-raised)] to-[var(--color-bg-card)] mb-4 relative luxury-media group select-none cursor-grab active:cursor-grabbing touch-none"
      onMouseDown={(event) => startDrag(event.clientX)}
      onMouseMove={(event) => rotateTo(event.clientX)}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={(event) => startDrag(event.touches[0].clientX)}
      onTouchMove={(event) => rotateTo(event.touches[0].clientX)}
      onTouchEnd={stopDrag}
      role="img"
      aria-label={isAr ? `عرض 360 لمنتج ${productName}` : `360 view of ${productName}`}
    >
      <img
        src={safeImages[frame]}
        alt={productName}
        draggable={false}
        className="w-full h-full object-contain p-8 md:p-16 mix-blend-screen"
      />

      {outOfStock && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
          <span className="badge-discount text-base py-2 px-6">{isAr ? 'نفذت الكمية' : 'Out of Stock'}</span>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[var(--color-bg-overlay)] border border-[var(--color-border)] text-[0.65rem] text-[var(--color-gold)] font-bold tracking-widest uppercase flex items-center gap-2 transition-opacity">
        <span>{isAr ? 'اسحب لتدوير المنتج' : 'Drag to rotate'}</span>
        <span className="font-mono text-[var(--color-text-muted)]">{frame + 1}/{safeImages.length}</span>
      </div>
    </div>
  );
}
