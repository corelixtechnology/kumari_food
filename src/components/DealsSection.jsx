import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, CheckCircle2, Clock, Flame, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEALS_AND_COMBOS } from '../data/menuData';

export default function DealsSection({ onAddDealToCart }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimDeal = (deal, e) => {
    onAddDealToCart({
      id: deal.id,
      name: deal.title,
      variantName: 'Special Combo Deal',
      price: deal.price,
      isDeal: true,
      image: deal.id === 'mega-feast-combo' 
        ? 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
        : deal.id === 'shawarma-party-b2g1'
        ? 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { x, y },
      colors: ['#ff4b1f', '#ffd32a', '#10b981'],
    });
  };

  return (
    <section id="deals" className="relative py-14 sm:py-20 lg:py-32 bg-[#0a0a0f] border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[800px] h-[300px] sm:h-[500px] bg-gradient-to-r from-red-600/15 via-orange-500/15 to-yellow-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 text-[11px] sm:text-xs font-black text-yellow-300 tracking-wider uppercase shadow-[0_0_20px_rgba(255,210,0,0.3)]">
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-bounce shrink-0" />
            <span>🤑 Killer Combos & Viral Deals</span>
          </div>

          <h2 className="font-impact text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase">
            Viral Offers That Broke <span className="gradient-gold-text">Nagercoil</span>
          </h2>
          
          <p className="text-zinc-400 text-xs sm:text-base max-w-lg mx-auto">
            Unbeatable value, maximum smoke, zero compromises. Grab them before tonight's batch runs out!
          </p>

          {/* Countdown timer pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-orange-500/30 text-xs sm:text-sm font-bold text-zinc-200 shadow-lg mt-2">
            <div className="flex items-center gap-1.5 text-orange-400">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Deal Closes In:</span>
            </div>
            <div className="flex gap-1 font-mono text-orange-400 text-xs sm:text-sm">
              <span className="bg-orange-500/20 px-1.5 py-0.5 rounded border border-orange-500/40">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              :
              <span className="bg-orange-500/20 px-1.5 py-0.5 rounded border border-orange-500/40">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              :
              <span className="bg-orange-500/20 px-1.5 py-0.5 rounded border border-orange-500/40">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {DEALS_AND_COMBOS.map((deal) => (
            <div
              key={deal.id}
              className={`relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 group ${
                deal.popular
                  ? 'bg-gradient-to-b from-[#1c1412] to-[#101017] border-2 border-orange-500 shadow-[0_0_35px_rgba(255,80,0,0.25)]'
                  : 'glass-panel border border-white/10 hover:border-orange-500/40'
              }`}
            >
              {/* Popular / Best value badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-extrabold text-[10px] sm:text-xs shadow-lg shadow-orange-500/50 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3 fill-white shrink-0" />
                <span>{deal.badge}</span>
              </div>

              {/* Deal Header */}
              <div className="space-y-3 sm:space-y-4 pt-2">
                <div className="text-[10px] sm:text-[11px] font-bold text-orange-400 tracking-wider">
                  {deal.tag}
                </div>

                <h3 className="text-xl sm:text-2xl font-impact tracking-wide text-white group-hover:text-orange-400 transition-colors">
                  {deal.title}
                </h3>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-200 flex items-center gap-2">
                  <span>✨</span>
                  <span className="truncate">{deal.highlight}</span>
                </div>

                {/* Items Included Checklist */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">What's Inside:</span>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {deal.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/10 space-y-3 sm:space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs text-zinc-400 block">Deal Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-4xl font-impact tracking-wide text-white">
                        ₹{deal.price}
                      </span>
                      {deal.originalPrice && (
                        <span className="text-xs sm:text-sm text-zinc-500 line-through">
                          ₹{deal.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl border border-emerald-500/30">
                    Live Tonight
                  </span>
                </div>

                <button
                  onClick={(e) => handleClaimDeal(deal, e)}
                  className={`w-full py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    deal.popular
                      ? 'bg-gradient-to-r from-orange-500 via-red-600 to-amber-500 hover:from-orange-400 hover:via-red-500 hover:to-amber-400 shadow-[0_0_20px_rgba(255,80,0,0.5)]'
                      : 'bg-white/10 hover:bg-orange-500 text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Claim & Add To Order</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
