'use client';

import React, { useState } from 'react';
import { MagicWand, Image as ImageIcon, Sparkle, Upload, CheckCircle, Clock } from '@phosphor-icons/react';
import Button from '../../../components/ui/Button';

export default function AIStudio() {
  const [generations, setGenerations] = useState([
    { id: 1, prompt: 'Luxury perfume bottle on gold silk', status: 'pending', url: '/images/background.jpg', type: 'hero' }
  ]);

  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt) return;
    setGenerations(prev => [{
      id: Date.now(),
      prompt,
      status: 'generating',
      url: null,
      type: 'product'
    }, ...prev]);
    
    // Simulate generation
    setTimeout(() => {
      setGenerations(prev => prev.map(g => g.prompt === prompt ? { ...g, status: 'pending', url: '/hero-bottle.png' } : g));
      setPrompt('');
    }, 2000);
  };

  const handleApprove = (id) => {
    setGenerations(prev => prev.map(g => g.id === id ? { ...g, status: 'published' } : g));
    // In a real app, this would hit an API to publish to the DB and CMS
    alert('Media approved and published to Storefront.');
  };

  const handleDiscard = (id) => {
    setGenerations(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 h-full max-w-5xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
          ستوديو الذكاء الاصطناعي (AI Studio)
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          قم بتوليد ومراجعة صور المنتجات والخلفيات بلمسة الذكاء الاصطناعي. لا يتم نشر أي صورة تلقائياً بدون موافقتك.
        </p>
      </div>

      {/* Generator Form */}
      <div className="glass-card border border-[var(--color-border-strong)] rounded-xl p-6">
        <h2 className="text-lg font-bold text-[var(--color-gold-light)] mb-4 flex items-center gap-2">
          <MagicWand size={20} /> إنشاء صورة جديدة
        </h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            className="form-input flex-1" 
            placeholder="مثال: زجاجة عطر فاخرة على خلفية رخامية سوداء مع إضاءة ذهبية..." 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button variant="primary" onClick={handleGenerate}>
            <Sparkle size={18} className="mr-2" /> توليد
          </Button>
        </div>
      </div>

      {/* Review Queue */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[var(--color-gold)]" /> قيد المراجعة (Preview & Approve)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generations.length === 0 && (
            <div className="col-span-full p-8 text-center text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]">
              لا توجد صور قيد المراجعة حالياً.
            </div>
          )}
          
          {generations.map(gen => (
            <div key={gen.id} className="glass-card border border-[var(--color-border)] rounded-xl overflow-hidden flex flex-col">
              <div className="aspect-square bg-[#070504] relative flex items-center justify-center">
                {gen.status === 'generating' ? (
                  <div className="flex flex-col items-center gap-3 text-[var(--color-gold)] animate-pulse">
                    <Sparkle size={32} weight="fill" />
                    <span className="text-sm">جاري التوليد...</span>
                  </div>
                ) : (
                  <img src={gen.url} alt={gen.prompt} className="w-full h-full object-cover" />
                )}
                
                {gen.status === 'published' && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1 shadow-md">
                    <CheckCircle size={14} weight="bold" /> منشور
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col gap-4 flex-1">
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2" title={gen.prompt}>
                  {gen.prompt}
                </p>
                
                <div className="mt-auto flex gap-2">
                  {gen.status === 'pending' && (
                    <>
                      <Button variant="ghost" onClick={() => handleDiscard(gen.id)} className="flex-1 !text-red-400 hover:!bg-red-500/10 !py-2 text-xs">
                        حذف
                      </Button>
                      <Button variant="primary" onClick={() => handleApprove(gen.id)} className="flex-1 !py-2 text-xs border border-[var(--color-gold)]">
                        موافقة ونشر
                      </Button>
                    </>
                  )}
                  {gen.status === 'published' && (
                    <Button variant="secondary" disabled className="w-full !py-2 text-xs opacity-50">
                      تم النشر بنجاح
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
