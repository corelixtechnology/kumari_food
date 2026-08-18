import React from 'react';
import { Flame, Award, Heart, Sparkles, Clock, CheckCircle2, ShieldAlert, Users } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Flame,
      title: '100% Live Hardwood Charcoal',
      desc: 'No gas grills. No shortcuts. Every piece of meat is kissed by real glowing coals to deliver that authentic deep smoke crust.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Sparkles,
      title: 'Signature Mint-Chili Blend',
      desc: 'Our founder’s secret herbal marinade—spicy, zesty, and refreshingly aromatic with cracked green chilies and hill mint.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Clock,
      title: 'Nagercoil Late-Night Culture',
      desc: 'Fueling midnight highway drives and night shifts with hot, sizzling BBQ until 2:00 AM at our famous Bypass Hub.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Heart,
      title: 'Pocket-Friendly Prices for All',
      desc: 'Starting from just ₹80. Savoring royal gourmet BBQ shouldn’t break the bank for students, youth, or families.',
      color: 'from-red-500 to-rose-500',
    },
  ];

  return (
    <section id="about" className="relative py-14 sm:py-20 lg:py-32 bg-[#09090e] border-y border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-60 sm:w-96 h-60 sm:h-96 bg-orange-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 sm:w-96 h-60 sm:h-96 bg-red-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[11px] sm:text-xs font-bold text-orange-400 tracking-wider uppercase">
            <span>🔥 Our Story & Founder's Vision</span>
          </div>
          
          <h2 className="font-impact text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide uppercase">
            From Nagercoil Streets to a <span className="gradient-fire-text">BBQ Sensation</span>
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Story Narrative Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel-glow p-6 sm:p-10 rounded-3xl space-y-5 sm:space-y-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg shadow-orange-500/30 shrink-0">
                  A
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Founded by Ajlin</h3>
                  <p className="text-xs text-orange-400 font-medium">Head Grillmaster & Visionary</p>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-zinc-300 text-xs sm:text-base leading-relaxed font-normal">
                <p>
                  Founded by <strong className="text-white font-semibold">Ajlin</strong>, <span className="text-orange-400 font-medium">Kumari Smoke House</span> started with a simple mission: to serve premium, deeply marinated, coal-grilled meat at prices everyone can love.
                </p>
                <p>
                  Thanks to our signature <span className="text-emerald-400 font-medium">mint-chili blends</span>, late-night hours, and the incredible support of our community, we have grown into <strong className="text-white font-semibold">Kanyakumari district's favorite spot</strong> for night owls, foodies, and families alike.
                </p>
                <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/10 border border-orange-500/30 font-semibold text-orange-200 text-center sm:text-left text-xs sm:text-sm">
                  "No compromises on smoke, no compromises on spice."
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10 text-center">
                <div>
                  <span className="font-impact text-xl sm:text-3xl text-white">3+</span>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400">Outlets</p>
                </div>
                <div>
                  <span className="font-impact text-xl sm:text-3xl text-orange-400">100%</span>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400">Fresh Meat</p>
                </div>
                <div>
                  <span className="font-impact text-xl sm:text-3xl text-yellow-400">₹80</span>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400">Starts At</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-orange-500/40 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 sm:mb-4 text-white shadow-lg shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1.5 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
