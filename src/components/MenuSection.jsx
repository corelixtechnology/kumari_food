import React, { useState } from 'react';
import { Flame, Star, ShoppingBag, Plus, Check, Sparkles, Filter, Info, Utensils, GlassWater } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';

export default function MenuSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [addedItemIds, setAddedItemIds] = useState({});

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleSelectVariant = (itemId, variant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [itemId]: variant,
    }));
  };

  const handleAddClick = (item, e) => {
    const chosenVariant = selectedVariants[item.id] || (item.priceVariants ? item.priceVariants[0] : { size: 'Standard', price: item.price });
    
    const cartItem = {
      id: `${item.id}-${chosenVariant.size}`,
      baseId: item.id,
      name: item.name,
      variantName: chosenVariant.size,
      price: chosenVariant.price,
      image: item.image,
      spiceLevel: item.spiceLevel,
    };

    onAddToCart(cartItem);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#ff4b1f', '#ff9f1a', '#ffd32a', '#ffffff'],
      ticks: 100,
      gravity: 1.2,
    });

    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="relative py-14 sm:py-20 lg:py-32 bg-[#08080c] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-20 right-10 w-60 sm:w-96 h-60 sm:h-96 bg-orange-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-60 sm:w-96 h-60 sm:h-96 bg-red-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-red-600/20 to-orange-500/20 border border-orange-500/40 text-[11px] sm:text-xs font-extrabold text-orange-400 tracking-wider uppercase shadow-[0_0_20px_rgba(255,80,0,0.25)]">
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-flame-pulse shrink-0" />
            <span>🔥 🔥 Fire-Grilled Favorites 🔥 🔥</span>
          </div>

          <h2 className="font-impact text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase">
            Taste The <span className="gradient-fire-text">Smoke</span>
          </h2>
          
          <p className="text-zinc-400 text-xs sm:text-base max-w-lg mx-auto">
            Here are our top crowd-pleasers. Freshly marinated daily, coal-roasted to perfection.
          </p>
        </div>

        {/* Mobile Horizontal Scrollable Category Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-[0_0_20px_rgba(255,75,31,0.5)] scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 hover:border-orange-500/30'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredItems.map((item) => {
            const activeVariant = selectedVariants[item.id] || (item.priceVariants ? item.priceVariants[0] : { size: 'Standard', price: item.price });
            const isJustAdded = addedItemIds[item.id];

            return (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(255,75,31,0.2)] flex flex-col justify-between"
              >
                {/* Top Image & Badge */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-black/20 to-transparent" />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-orange-500/40 text-[10px] sm:text-[11px] font-bold text-orange-300 shadow-md">
                      {item.badge}
                    </div>
                  )}

                  {/* Rating Tag */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-bold text-yellow-400">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Highlight bar */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] sm:text-xs font-semibold text-orange-200 bg-orange-950/85 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-orange-500/30 truncate">
                    ✨ {item.highlight}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Spice Level Indicator */}
                    {item.spiceLevel > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] sm:text-[11px] text-zinc-400 font-medium">Spice:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((lvl) => (
                            <span
                              key={lvl}
                              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                                lvl <= item.spiceLevel
                                  ? lvl === 3
                                    ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                                    : 'bg-orange-500 shadow-[0_0_6px_#f97316]'
                                  : 'bg-zinc-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-orange-400 font-semibold ml-0.5">
                          {item.spiceLevel === 3 ? 'Extra Hot' : item.spiceLevel === 2 ? 'Medium' : 'Mild'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Portion/Size Selection */}
                  {item.priceVariants && (
                    <div className="space-y-1.5 pt-1.5 border-t border-white/10">
                      <span className="text-[10px] sm:text-[11px] text-zinc-400 font-medium">Choose Portion:</span>
                      <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                        {item.priceVariants.map((v) => (
                          <button
                            key={v.size}
                            type="button"
                            onClick={() => handleSelectVariant(item.id, v)}
                            className={`py-1.5 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold border transition-all text-center ${
                              activeVariant.size === v.size
                                ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-[0_0_8px_rgba(255,80,0,0.3)]'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                            }`}
                          >
                            <div className="truncate">{v.size}</div>
                            <div className="text-white font-extrabold">₹{v.price}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price and Add CTA */}
                  <div className="pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider block">Price</span>
                      <span className="text-xl sm:text-2xl font-impact tracking-wider text-white">
                        ₹{activeVariant.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddClick(item, e)}
                      className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all duration-300 transform active:scale-95 cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white shadow-[0_0_15px_rgba(255,80,0,0.4)]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 animate-bounce" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
