import React, { useState } from 'react';
import { Send, CheckCircle2, DollarSign, TrendingUp, ShieldCheck, Sparkles, Building, Phone, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FranchiseSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    model: 'cart',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const franchiseModels = {
    cart: {
      name: 'Street BBQ Cart / Kiosk',
      investment: '₹3.5 - 5 Lakhs',
      space: '80 - 150 sq.ft',
      breakeven: '3 - 5 Months',
      margin: '45 - 55%',
    },
    express: {
      name: 'Highway Hub / Express Outlet',
      investment: '₹7 - 10 Lakhs',
      space: '250 - 500 sq.ft',
      breakeven: '5 - 8 Months',
      margin: '40 - 50%',
    },
    dinein: {
      name: 'Full Dine-In Smokehouse',
      investment: '₹12 - 18 Lakhs',
      space: '600+ sq.ft',
      breakeven: '7 - 10 Months',
      margin: '40 - 48%',
    },
  };

  const selectedModelData = franchiseModels[formData.model];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4b1f', '#ffd32a', '#10b981'],
      });
    }, 800);
  };

  return (
    <section id="franchise" className="relative py-14 sm:py-20 lg:py-32 bg-[#0b0b10] border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[11px] sm:text-xs font-bold text-orange-400 tracking-wider uppercase">
            <span>🤝 Business Expansion Opportunity</span>
          </div>

          <h2 className="font-impact text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase">
            Partner with <span className="gradient-fire-text">Kumari Smoke House</span>
          </h2>
          
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed max-w-xl mx-auto">
            Want to bring the viral BBQ brand to your town? We are expanding rapidly across Tamil Nadu. Join our successful, low-investment, high-return franchise model.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Franchise Highlights */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="glass-panel p-5 sm:p-8 rounded-3xl space-y-5 sm:space-y-6 border border-white/10">
              <h3 className="text-xl sm:text-2xl font-impact text-white tracking-wide">
                Why Franchise With Us?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <h4 className="font-bold text-white text-xs sm:text-sm">High Profit Margins</h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400">Up to 50% gross profit with our bulk spice & recipe supply.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <h4 className="font-bold text-white text-xs sm:text-sm">Viral Brand Equity</h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400">High social media recall & instant local excitement on opening.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <h4 className="font-bold text-white text-xs sm:text-sm">Full Pitmaster Training</h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400">Complete staff training on coal firing & marination standards.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <h4 className="font-bold text-white text-xs sm:text-sm">Setup Assistance</h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400">End-to-end guidance for cart fabrication or highway hub layout.</p>
                </div>
              </div>

              {/* Interactive Model Quick Preview */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1d1413] to-[#121218] border border-orange-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                  <span>Selected Model:</span>
                  <span className="text-orange-400">{selectedModelData.name}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[9px] sm:text-[10px] text-zinc-400 block">Est. Setup</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{selectedModelData.investment}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[9px] sm:text-[10px] text-zinc-400 block">Space Req.</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{selectedModelData.space}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[9px] sm:text-[10px] text-zinc-400 block">Breakeven</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">{selectedModelData.breakeven}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[9px] sm:text-[10px] text-zinc-400 block">Gross Margin</span>
                    <span className="text-xs sm:text-sm font-bold text-yellow-400">{selectedModelData.margin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-6">
            <div className="glass-panel-glow p-5 sm:p-8 rounded-3xl border border-orange-500/30 shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  <h3 className="font-impact text-2xl sm:text-3xl text-white tracking-wide">
                    Application Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-orange-400">{formData.name}</strong>! Our expansion team will review your details for <strong className="text-white">{formData.location}</strong> and call you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', location: '', model: 'cart', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <h3 className="font-impact text-xl sm:text-3xl text-white tracking-wide mb-1">
                      Franchise Inquiry Form
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-400">
                      Fill out the details below to receive our Franchise Pitch Deck & Financial Model.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-300">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. anand@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-300">Desired City / Town *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tirunelveli, Madurai"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-300">Format Preference</label>
                      <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                      >
                        <option value="cart" className="bg-[#121218] text-white">Street Cart / Kiosk</option>
                        <option value="express" className="bg-[#121218] text-white">Highway Hub / Express</option>
                        <option value="dinein" className="bg-[#121218] text-white">Dine-In Smokehouse</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300">Message / Background</label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your background or space..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 rounded-2xl font-bold text-xs sm:text-base bg-gradient-to-r from-orange-500 via-red-600 to-amber-500 hover:from-orange-400 hover:via-red-500 hover:to-amber-400 text-white shadow-[0_0_30px_rgba(255,80,0,0.5)] transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Franchise Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
