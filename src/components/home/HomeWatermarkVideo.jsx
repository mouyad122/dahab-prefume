'use client';

import React from 'react';

export default function HomeWatermarkVideo() {
  return (
    <>
      <video
        className="home-watermark-video fixed inset-0 w-full h-[100dvh] object-cover z-0 pointer-events-none opacity-[0.12]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/watermarkvideo.mp4" type="video/mp4" />
      </video>
      <div className="home-watermark-overlay fixed inset-0 w-full h-[100dvh] z-0 pointer-events-none" />
      <style jsx>{`
        .home-watermark-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100dvh;
          object-fit: cover;
          z-index: 0;
          opacity: 0.12;
          pointer-events: none;
        }
        .home-watermark-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100dvh;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(circle at top, rgba(201, 162, 74, 0.18), transparent 35%),
                      linear-gradient(to bottom, rgba(5, 5, 5, 0.72), rgba(5, 5, 5, 0.88), rgba(5, 5, 5, 0.96));
        }
        @media (prefers-reduced-motion: reduce) {
          .home-watermark-video {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
