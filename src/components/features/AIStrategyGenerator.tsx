'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import { AI_STRATEGY_RESULT } from '@/lib/constants';

export default function AIStrategyGenerator() {
  const [aiQuery, setAiQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<typeof AI_STRATEGY_RESULT | null>(null);

  const handleGenerateStrategy = () => {
    if (!aiQuery.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiResult(AI_STRATEGY_RESULT);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-[#EAEAEA] shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 md:p-10 text-left relative overflow-hidden mt-24">
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Sparkles className="text-gold-accent" size={24} />
          <h2 className="text-[22px] font-black text-charcoal">Custom Digital Blueprint</h2>
        </div>

        <p className="text-muted mb-8 text-[15px] font-medium">
          Describe your vision below. Our expert strategy engine will rapidly engineer a tailored execution plan optimized exclusively for your brand's growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            disabled={isGenerating}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateStrategy()}
            placeholder="e.g., I want to launch an online luxury jewellery store..."
            className="flex-1 bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl px-5 py-4 text-[14px] focus:outline-none focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all text-charcoal placeholder:text-[#999999] font-medium disabled:opacity-60"
          />
          <button
            onClick={handleGenerateStrategy}
            disabled={isGenerating || !aiQuery.trim()}
            className="bg-[#DEC699] hover:bg-gold-accent disabled:bg-[#DEC699]/60 disabled:cursor-not-allowed transition-colors duration-300 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Sparkles size={18} strokeWidth={2.5} />
            )}
            {isGenerating ? 'Analyzing...' : 'Build Strategy'}
          </button>
        </div>


        {/* AI Result Rendering */}
        {aiResult && (
          <div className="w-full animate-slide-down text-left mt-8">
            <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-[1.5rem] p-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-gold-accent" />
                <h3 className="text-[14px] font-black text-gold-accent tracking-widest uppercase">
                  Your Custom Strategy:
                </h3>
              </div>

              <p className="text-[14px] text-muted mb-8 font-medium">
                Here is your high-precision digital roadmap from Build2Click:
              </p>

              <div className="space-y-6">
                {aiResult.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-charcoal text-[14px] mb-3">{section.title}</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-[13px] text-muted leading-relaxed pr-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-[#EAEAEA] flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[13px] text-[#999999] font-medium">
                  Want to implement this plan? Our team is ready.
                </p>
                <Link
                  href="/contact"
                  className="text-[13px] font-black text-gold-accent hover:text-charcoal transition-colors flex items-center gap-1.5 uppercase tracking-widest"
                >
                  Start The Project <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
