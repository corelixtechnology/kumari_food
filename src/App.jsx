import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import DealsSection from './components/DealsSection';
import LocationsSection from './components/LocationsSection';
import FranchiseSection from './components/FranchiseSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { ShoppingBag, Flame, MessageCircle } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Cart operations
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    showToast(`Added ${item.name} to order!`);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-[#f1f2f6] flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-orange-500/50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-300">
          <Flame className="w-4 h-4 fill-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFranchiseModal={() => scrollToSection('franchise')}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero with Live Charcoal Sizzle Video */}
        <HeroSection
          onOpenMenu={(e) => {
            e.preventDefault();
            scrollToSection('menu');
          }}
          onOpenLocations={(e) => {
            e.preventDefault();
            scrollToSection('locations');
          }}
        />

        {/* 2. About Us / Founder's Story */}
        <AboutSection />

        {/* 3. Fire-Grilled Menu Highlights & Add to Cart */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* 4. Killer Combos & Viral Deals */}
        <DealsSection onAddDealToCart={handleAddToCart} />

        {/* 5. Our Locations & Live Timings Hub */}
        <LocationsSection />

        {/* 6. Franchise Inquiry Portal & ROI Estimator */}
        <FranchiseSection />
      </main>

      {/* Floating Bottom Quick Action on Mobile */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.6)] flex items-center justify-between animate-bounce"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>{totalCartCount} Items in Order</span>
            </div>
            <span className="font-extrabold">View Bag →</span>
          </button>
        </div>
      )}

      {/* Order Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer & Social Hub */}
      <Footer onOpenFranchise={() => scrollToSection('franchise')} />
    </div>
  );
}
