
import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { view, setView, isMenuOpen, setIsMenuOpen, searchQuery, setSearchQuery } = useNavigation();
  const { cart } = useData();
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (view !== 'shop' && e.target.value.length > 2) {
      setView('shop');
    }
  };

  return (
    <nav className="bg-[#F8F5F1] text-[#1A1A1A] sticky top-0 z-50 border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Desktop Menu Left */}
          <div className="hidden md:flex items-center space-x-8 w-1/3">
              <button onClick={() => setView('home')} className={`text-xs font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors ${view === 'home' ? 'text-[#C5A059]' : 'text-[#1A1A1A]'}`}>
                Home
              </button>
              <button onClick={() => setView('shop')} className={`text-xs font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors ${view === 'shop' ? 'text-[#C5A059]' : 'text-[#1A1A1A]'}`}>
                Catalogue
              </button>
          </div>

          {/* Logo Center */}
          <div className="flex-shrink-0 cursor-pointer flex justify-center w-1/3" onClick={() => setView('home')}>
            <span className="text-4xl md:text-5xl font-vogue font-black tracking-tighter text-[#1A1A1A] hover:opacity-80 transition-opacity">
              VOGUE<span className="text-[#C5A059]">.</span>
            </span>
          </div>

          {/* Icons Right */}
          <div className="hidden md:flex items-center justify-end space-x-8 w-1/3">
            <div className="relative flex items-center">
              <div className={`transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-48 opacity-100 mr-3' : 'w-0 opacity-0'}`}>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full bg-transparent border-b border-[#1A1A1A] focus:border-[#C5A059] outline-none text-sm py-1 font-sans"
                />
              </div>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-[#C5A059] transition-colors">
                <Search size={20} />
              </button>
            </div>

            <button 
              onClick={() => user ? (user.role === 'admin' ? setView('admin') : setView('home')) : setView('login')} 
              className="hover:text-[#C5A059] flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {user ? user.name.split(' ')[0] : 'Login'}
            </button>

            <button 
              onClick={() => setView('cart')} 
              className="relative group"
            >
              <ShoppingBag size={20} className="group-hover:text-[#C5A059] transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C5A059] text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1A1A1A] p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#1A1A1A] absolute w-full z-50 shadow-xl">
          <div className="px-6 pt-6 pb-8 space-y-4">
            <div className="mb-6 border-b border-gray-200 pb-2">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-transparent outline-none font-sans text-lg"
              />
            </div>
            <button onClick={() => {setView('home'); setIsMenuOpen(false)}} className="block w-full text-left text-2xl font-vogue text-[#1A1A1A]">Home</button>
            <button onClick={() => {setView('shop'); setIsMenuOpen(false)}} className="block w-full text-left text-2xl font-vogue text-[#1A1A1A]">Catalogue</button>
            <button onClick={() => {setView('cart'); setIsMenuOpen(false)}} className="block w-full text-left text-2xl font-vogue text-[#1A1A1A]">Cart ({cart.length})</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
