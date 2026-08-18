import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Volume2, 
  VolumeX, 
  Music, 
  UtensilsCrossed, 
  Sparkles, 
  MapPin, 
  Building2, 
  PhoneCall, 
  ChevronRight, 
  Home, 
  Info 
} from 'lucide-react';
import { toggleMelodyBGM, getMelodyState } from '../utils/audio';

export default function Navbar({ cartCount, onOpenCart, onOpenFranchiseModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync initial audio state
  useEffect(() => {
    setIsAudioPlaying(getMelodyState());
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleSoundClick = () => {
    const state = toggleMelodyBGM();
    setIsAudioPlaying(state);
  };

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home, badge: null },
    { name: 'Menu', href: '#menu', icon: UtensilsCrossed, badge: 'Starting ₹80' },
    { name: 'Deals & Combos', href: '#deals', icon: Flame, badge: '🔥 Viral' },
    { name: 'Locations & Timings', href: '#locations', icon: MapPin, badge: 'Till 2 AM' },
    { name: 'Our Story', href: '#about', icon: Info, badge: null },
    { name: 'Franchise Portal', href: '#franchise', icon: Building2, badge: 'High ROI' },
    { name: 'Contact & Catering', href: '#contact', icon: PhoneCall, badge: null },
  ];

  const handleNavClick = (e, href) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Give state time to reset body overflow before smooth scrolling
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 75;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08080c]/95 backdrop-blur-xl border-b border-orange-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-3 group select-none min-w-0"
          >
            <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 via-red-600 to-amber-500 p-[2px] shadow-[0_0_15px_rgba(255,80,0,0.5)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-[#0d0d12] rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                <Flame className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500 group-hover:text-amber-400 transition-colors animate-flame-pulse" />
              </div>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-impact text-base sm:text-2xl tracking-wide text-white flex items-center gap-1 leading-none">
                KUMARI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">SMOKE HOUSE</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-wider text-zinc-400 uppercase font-medium mt-0.5 truncate">
                Nagercoil Coal BBQ Sensation
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs xl:text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Top Actions: Audio Toggle + Cart Drawer Button + Order CTA + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Melody BGM Synthesizer Toggle */}
            <button
              onClick={handleSoundClick}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                isAudioPlaying
                  ? 'bg-gradient-to-r from-orange-500/30 to-amber-500/20 border-orange-500 text-orange-300 shadow-[0_0_15px_rgba(255,80,0,0.4)] animate-pulse'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
              title="Toggle Relaxing Melody BGM"
              aria-label="Toggle Melody BGM"
            >
              {isAudioPlaying ? (
                <>
                  <Music className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                  <Volume2 className="w-4 h-4 text-orange-400 shrink-0" />
                </>
              ) : (
                <>
                  <Music className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <VolumeX className="w-4 h-4 shrink-0" />
                </>
              )}
              <span className="hidden md:inline">{isAudioPlaying ? 'Melody BGM ON 🎶' : 'Melody BGM'}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white transition-colors cursor-pointer"
              title="View Order Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shadow-lg shadow-red-500/50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA: Order Online (Desktop) */}
            <a
              href="#menu"
              onClick={(e) => handleNavClick(e, '#menu')}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>🟢 Order Online</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border transition-all focus:outline-none cursor-pointer ${
                isMobileMenuOpen
                  ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_15px_rgba(255,80,0,0.5)]'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#08080c]/98 backdrop-blur-3xl flex flex-col animate-in fade-in duration-200">
          
          {/* Drawer Top Bar */}
          <div className="px-4 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-[1.5px] flex items-center justify-center shadow-[0_0_12px_rgba(255,80,0,0.5)]">
                <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
              </div>
              <span className="font-impact text-lg text-white">
                KUMARI <span className="text-orange-400">SMOKE HOUSE</span>
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Navigation List */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 overscroll-contain">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-bold text-orange-400 tracking-wider uppercase">
                Explore Smokehouse
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">Nagercoil, TN</span>
            </div>

            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-orange-500/15 border border-white/5 hover:border-orange-500/30 transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-orange-500/20 flex items-center justify-center text-orange-400 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-zinc-200 group-hover:text-white">
                      {link.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {link.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-orange-500/20 border border-orange-500/30 text-[10px] font-extrabold text-orange-300">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}

            {/* Extra Mobile Actions inside Drawer */}
            <div className="pt-4 border-t border-white/10 space-y-2.5 pb-8">
              
              {/* Primary Order Button */}
              <a
                href="#menu"
                onClick={(e) => handleNavClick(e, '#menu')}
                className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-center bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.45)] flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Order Fire-Grilled Menu (From ₹80)</span>
              </a>

              {/* BGM Toggle in Drawer */}
              <button
                onClick={handleSoundClick}
                className={`w-full py-3 px-4 rounded-2xl border transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer ${
                  isAudioPlaying
                    ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/20 border-orange-500/50 text-orange-300 shadow-[0_0_20px_rgba(255,80,0,0.3)]'
                    : 'bg-white/5 border-white/10 text-zinc-300'
                }`}
              >
                {isAudioPlaying ? (
                  <>
                    <Music className="w-4 h-4 text-yellow-300 animate-bounce" />
                    <span>Melody BGM: Playing 🎶</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-orange-400" />
                    <span>🎵 Play Smokehouse Melody BGM</span>
                  </>
                )}
              </button>

              {/* Direct Branch Call button */}
              <a
                href="tel:+919876543210"
                className="w-full py-3 px-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-zinc-300 font-semibold flex items-center justify-center gap-2 text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                <span>Call Nagercoil Bypass Branch (Till 2:00 AM)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
