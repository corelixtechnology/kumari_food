import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Flame, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/menuData';

export default function LocationsSection() {
  const [selectedBranch, setSelectedBranch] = useState(LOCATIONS_DATA[0]);

  const isBranchCurrentlyOpen = (branch) => {
    const now = new Date();
    const currentHour = now.getHours() + (now.getMinutes() / 60);

    if (branch.closeHour > 24) {
      if (currentHour >= branch.openHour || currentHour < (branch.closeHour - 24)) {
        return true;
      }
    } else {
      if (currentHour >= branch.openHour && currentHour <= branch.closeHour) {
        return true;
      }
    }
    return false;
  };

  return (
    <section id="locations" className="relative py-14 sm:py-20 lg:py-32 bg-[#09090d] overflow-hidden">
      <div className="absolute top-10 left-1/3 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-orange-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[11px] sm:text-xs font-bold text-orange-400 tracking-wider uppercase shadow-[0_0_20px_rgba(255,80,0,0.2)]">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
            <span>📍 Our Outlets & Timings</span>
          </div>

          <h2 className="font-impact text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase">
            Visit Us <span className="gradient-fire-text">Tonight</span>
          </h2>
          
          <p className="text-zinc-400 text-xs sm:text-base max-w-lg mx-auto">
            3 convenient spots across Nagercoil. From buzzing evening stalls to 2:00 AM highway chillouts.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {LOCATIONS_DATA.map((branch) => {
            const isOpen = isBranchCurrentlyOpen(branch);
            const isSelected = selectedBranch.id === branch.id;

            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#1c1412] to-[#121219] border-2 border-orange-500 shadow-[0_0_35px_rgba(255,80,0,0.25)]'
                    : 'glass-panel border border-white/10 hover:border-orange-500/40'
                }`}
              >
                {/* Top Tag & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl border border-orange-500/20">
                    {branch.tag}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl text-[10px] sm:text-xs font-extrabold ${
                      isOpen
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-800 text-zinc-300 border border-white/10'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-ping' : 'bg-zinc-500'}`} />
                    <span>{isOpen ? 'OPEN NOW' : 'OPENS ' + branch.hours.split('–')[0].trim()}</span>
                  </span>
                </div>

                {/* Branch Name & Address */}
                <div className="space-y-3 sm:space-y-4 flex-1">
                  <h3 className="text-xl sm:text-2xl font-impact tracking-wide text-white">
                    {branch.name}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{branch.address}</p>
                    </div>

                    <div className="flex items-center gap-2 text-amber-300 font-semibold bg-amber-500/10 p-2 sm:p-2.5 rounded-xl border border-amber-500/20 text-xs sm:text-sm">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                      <span>Hours: {branch.hours}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {branch.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                    {branch.features.map((feat, i) => (
                      <span key={i} className="text-[10px] sm:text-[11px] bg-white/5 border border-white/10 text-zinc-300 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/10 grid grid-cols-2 gap-2 sm:gap-3">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/30 transition-all text-center"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>

                  <a
                    href={`tel:${branch.phone}`}
                    className="py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-xs bg-white/5 hover:bg-white/10 text-white border border-white/15 flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-400" />
                    <span>Call Counter</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Late night callout banner */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-orange-950/40 to-black border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xl text-center sm:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Bypass Highway Late Night Hub</span>
            </div>
            <h4 className="text-lg sm:text-2xl font-impact text-white">
              Midnight Drive Cravings? We Are Sizzling Till 2:00 AM!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Stop by Nagercoil-Thovalai Bypass near Carnival City for hot barbecue, fresh kuboos, and chilled mojitos.
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Nagercoil+Thovalai+Bypass+Carnival+City"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto shrink-0 px-5 sm:px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 font-bold text-xs sm:text-sm text-white shadow-lg shadow-orange-500/40 flex items-center justify-center gap-2"
          >
            <span>Navigate to Bypass</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
