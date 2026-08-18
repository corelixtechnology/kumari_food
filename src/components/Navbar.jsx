import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, Menu as MenuIcon, X, Volume2, VolumeX, Music } from 'lucide-react';
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

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleSoundClick = () => {
    const state = toggleMelodyBGM();
    setIsAudioPlaying(state);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Deals & Combos', href: '#deals' },
    { name: 'Locations', href: '#locations' },
    { name: 'Our Story', href: '#about' },
    { name: 'Franchise', href: '#franchise' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080c]/95 backdrop-blur-xl border-b border-orange-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
        
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
            <span className="font-impact text-lg sm:text-2xl tracking-wide text-white flex items-center gap-1 leading-none">
              KUMARI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">SMOKE HOUSE</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest text-zinc-400 uppercase font-medium mt-0.5 truncate">
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

        {/* Actions (Audio + Cart + Order CTA + Mobile Menu Button) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
                <Volume2 className="w-4 h-4 text-orange-400" />
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-zinc-400" />
                <VolumeX className="w-4 h-4" />
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
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-orange-400" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Full Backdrop Overlay) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[58px] z-50 lg:hidden bg-[#0a0a0f]/95 backdrop-blur-2xl border-t border-orange-500/20 px-5 py-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-orange-400 tracking-wider uppercase px-2 mb-3">
              Navigation Menu
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3.5 rounded-2xl text-base font-bold text-zinc-200 hover:text-white bg-white/[0.03] hover:bg-orange-500/20 border border-white/5 hover:border-orange-500/30 transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-orange-400 text-sm">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="#menu"
              onClick={(e) => handleNavClick(e, '#menu')}
              className="w-full py-4 rounded-2xl font-bold text-center bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 text-sm"
            >
              <span>🟢 Order Online Now (Starting ₹80)</span>
            </a>

            <button
              onClick={handleSoundClick}
              className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 font-semibold flex items-center justify-center gap-2 text-xs cursor-pointer"
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
          </div>
        </div>
      )}
    </header>
  );
}
