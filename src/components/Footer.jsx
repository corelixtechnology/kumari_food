import React from 'react';
import { Flame, MapPin, Phone, Mail, Heart, ArrowUp, Send, Share2 } from 'lucide-react';

export default function Footer({ onOpenFranchise }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#060609] border-t border-white/10 pt-16 pb-12 overflow-hidden text-zinc-400 text-sm">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-[2px] shadow-lg shadow-orange-500/30">
                <div className="w-full h-full bg-[#0d0d12] rounded-[14px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <span className="font-impact text-2xl text-white tracking-wider">
                KUMARI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">SMOKE HOUSE</span>
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The King of Coal-Grilled BBQ in Nagercoil. Founded by Ajlin. Home of the viral Mint-Chili Flakes BBQ, crispy wings, and late-night feasts till 2:00 AM.
            </p>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-orange-300 font-semibold inline-block">
              "Built on Smoke. Loved by Nagercoil."
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-orange-400 transition-colors">Fire-Grilled Menu</a></li>
              <li><a href="#deals" className="hover:text-orange-400 transition-colors">Killer Combos & Deals</a></li>
              <li><a href="#locations" className="hover:text-orange-400 transition-colors">Outlets & Timings</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors">Our Story & Founder</a></li>
              <li><a href="#franchise" className="hover:text-orange-400 transition-colors">Franchise Opportunities</a></li>
            </ul>
          </div>

          {/* Col 4: Outlets & Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Our Hubs</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="space-y-0.5">
                <span className="font-semibold text-white block">🚗 Bypass Hub (Late Night)</span>
                <span>Nagercoil-Thovalai Bypass (Till 2:00 AM)</span>
              </li>
              <li className="space-y-0.5">
                <span className="font-semibold text-white block">🏥 Asaripallam Cart</span>
                <span>Near GH 2nd Gate (Till 11:00 PM)</span>
              </li>
              <li className="space-y-0.5">
                <span className="font-semibold text-white block">🏫 Franchise Junction</span>
                <span>Concordia Bishop House Jcn (From 4:30 PM)</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Social Channels & Viral Reels */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Follow Our Viral Reels</h4>
            <p className="text-xs text-zinc-400">
              Catch daily live coal sizzles, foodie reviews, and special offers!
            </p>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-all shadow-md group"
                title="Follow on Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-all shadow-md group"
                title="Watch on YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-all shadow-md group"
                title="Like on Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="#franchise"
                className="text-xs font-bold text-orange-400 hover:underline block"
              >
                🤝 Apply for Tamil Nadu Franchise →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <div>
            © 2026 Kumari Smoke House. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Kumari Smoke House is committed to customer privacy and high culinary standards."); }} className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Fresh halal ingredients prepared daily over live coals."); }} className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#franchise" className="hover:text-orange-400 transition-colors">Franchise Application</a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-orange-500 text-zinc-400 hover:text-white border border-white/10 transition-all flex items-center gap-1.5"
            title="Scroll to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
