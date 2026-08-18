import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, MapPin, Sparkles, Flame } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/menuData';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [selectedBranch, setSelectedBranch] = useState(LOCATIONS_DATA[0].name);
  const [orderType, setOrderType] = useState('takeaway'); // 'takeaway' | 'dinein' | 'delivery'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [spicePreference, setSpicePreference] = useState('Signature Kumari Mint-Chili (Medium-Hot)');
  const [specialNotes, setSpecialNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const packagingFee = subtotal > 0 ? (orderType === 'delivery' ? 30 : 15) : 0;
  const total = subtotal + packagingFee;

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `🔥 *NEW ORDER - KUMARI SMOKE HOUSE NAGERCOIL* 🔥\n\n`;
    message += `👤 *Customer Name:* ${customerName || 'Direct Guest'}\n`;
    message += `📞 *Phone:* ${customerPhone || 'Not specified'}\n`;
    message += `📍 *Branch:* ${selectedBranch}\n`;
    message += `🛵 *Order Mode:* ${orderType.toUpperCase()}\n`;
    if (orderType === 'delivery' && customerAddress) {
      message += `🏠 *Delivery Address:* ${customerAddress}\n`;
    }
    message += `🌶️ *Spice Preference:* ${spicePreference}\n\n`;
    message += `📦 *ORDER ITEMS:*\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.variantName || 'Standard'}) x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `\n────────────────────\n`;
    message += `💵 *Subtotal:* ₹${subtotal}\n`;
    message += `📦 *Packaging/Handling:* ₹${packagingFee}\n`;
    message += `🔥 *TOTAL PAYABLE:* ₹${total}\n`;
    message += `────────────────────\n`;
    if (specialNotes) {
      message += `📝 *Notes:* ${specialNotes}\n\n`;
    }
    message += `*Built on Smoke. Loved by Nagercoil.*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919488012345?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-full sm:max-w-md bg-[#0e0e15] border-l border-orange-500/20 shadow-2xl h-full flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#12121c]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="font-impact text-xl sm:text-2xl text-white tracking-wide">Your BBQ Bag</h2>
              <p className="text-[11px] sm:text-xs text-zinc-400">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items selected</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          
          {/* Empty State */}
          {cartItems.length === 0 ? (
            <div className="py-12 sm:py-16 text-center space-y-3.5">
              <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="font-impact text-lg sm:text-xl text-white">Your bag is hungry</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Explore our fire-grilled specialties or grab a viral combo deal starting at ₹80!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 font-bold text-xs text-white cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  <span>Selected Items</span>
                  <button onClick={onClearCart} className="text-red-400 hover:underline text-[11px]">
                    Clear All
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">{item.name}</h4>
                      <p className="text-[11px] text-orange-400 truncate">{item.variantName}</p>
                      <span className="text-xs font-semibold text-zinc-300">₹{item.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-black/60 px-1.5 py-0.5 rounded-xl border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-zinc-400 hover:text-white p-1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[14px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-zinc-400 hover:text-white p-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-impact text-white min-w-[42px] text-right">
                        ₹{item.price * item.quantity}
                      </span>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="space-y-3.5 pt-3 border-t border-white/10">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300">Order Mode</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['takeaway', 'dinein', 'delivery'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setOrderType(mode)}
                        className={`py-2 rounded-xl text-[11px] font-bold capitalize border transition-all ${
                          orderType === mode
                            ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}
                      >
                        {mode === 'takeaway' ? '🥡 Takeaway' : mode === 'dinein' ? '🍽️ Dine-In' : '🛵 Delivery'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300">Select Outlet</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    {LOCATIONS_DATA.map((b) => (
                      <option key={b.id} value={b.name} className="bg-[#121218] text-white">
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300">Preferred Spice</label>
                  <select
                    value={spicePreference}
                    onChange={(e) => setSpicePreference(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Signature Kumari Mint-Chili (Medium-Hot)">🌶️ Signature Kumari Mint-Chili</option>
                    <option value="Extra Spicy Ghost Charred">🔥 Extra Spicy Ghost Charred</option>
                    <option value="Mild & Savory (Less Spicy)">🍃 Mild & Savory (Less Spicy)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                {orderType === 'delivery' && (
                  <input
                    type="text"
                    placeholder="Delivery Address & Landmark"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                )}
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-white/10 bg-[#12121c] space-y-3 sm:space-y-4">
            <div className="space-y-1 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Packaging & Handling</span>
                <span className="font-semibold text-white">₹{packagingFee}</span>
              </div>
              <div className="flex justify-between text-base font-impact text-white pt-1.5 border-t border-white/10">
                <span>Total Payable</span>
                <span className="text-xl text-orange-400 font-bold">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 sm:py-4 rounded-2xl font-bold text-xs sm:text-base bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
              <span>Send Order to WhatsApp Counter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
