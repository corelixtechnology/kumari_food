import React from 'react';
import { Flame, Sparkles, MapPin, ArrowRight, Star, Clock } from 'lucide-react';
import CinematicVideoHero from './CinematicVideoHero';

export default function HeroSection({ onOpenLocations, onOpenMenu }) {
  return (
    <section id="home" className="relative min-h-[90vh] pt-20 sm:pt-28 pb-12 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center">
      {/* Ambient background glow layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[350px] sm:h-[500px] bg-gradient-to-br from-orange-600/15 via-red-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-20 -left-20 sm:-left-40 w-60 sm:w-96 h-60 sm:h-96 bg-amber-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 sm:-right-40 w-60 sm:w-96 h-60 sm:h-96 bg-red-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Top Trending Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/15 to-red-500/10 border border-orange-500/30 text-[11px] sm:text-xs md:text-sm font-semibold text-orange-300 shadow-[0_0_20px_rgba(255,80,0,0.2)]">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="truncate">Nagercoil's #1 Rated Late-Night Coal BBQ</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-impact text-3xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] tracking-tight uppercase">
                The King of <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 drop-shadow-[0_4px_25px_rgba(255,75,31,0.4)]">
                  Coal-Grilled BBQ
                </span> <br />
                in Nagercoil!
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-xl text-zinc-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Authentic, smoky flavor and viral street deals. <br className="hidden sm:inline" />
              Starting from just <span className="font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/30 whitespace-nowrap">₹80</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              {/* Primary CTA: View Menu */}
              <a
                href="#menu"
                onClick={onOpenMenu}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-orange-500 via-red-600 to-amber-500 hover:from-orange-400 hover:via-red-500 hover:to-amber-400 text-white shadow-[0_0_30px_rgba(255,80,0,0.45)] hover:shadow-[0_0_45px_rgba(255,80,0,0.7)] transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>📜 View Our Menu</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA: Find Branch */}
              <a
                href="#locations"
                onClick={onOpenLocations}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-orange-500/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span>📍 Find a Branch Near You</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-3 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto lg:mx-0 border-t border-white/10">
              <div className="flex flex-col items-center lg:items-start p-1.5 sm:p-2 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-1 text-yellow-400 font-bold text-xs sm:text-base">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 shrink-0" />
                  <span>4.9 / 5</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-zinc-400">10k+ Foodies</span>
              </div>

              <div className="flex flex-col items-center lg:items-start p-1.5 sm:p-2 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-1 text-orange-400 font-bold text-xs sm:text-base">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>100% Coal</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-zinc-400">Deep Smoke</span>
              </div>

              <div className="flex flex-col items-center lg:items-start p-1.5 sm:p-2 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs sm:text-base">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Till 2:00 AM</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-zinc-400">Bypass Hub</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Definition Sizzle Video Showcase */}
          <div className="lg:col-span-6 relative mt-2 lg:mt-0">
            <CinematicVideoHero />
          </div>

        </div>
      </div>
    </section>
  );
}
