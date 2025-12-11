
import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, Search } from 'lucide-react';
import { Button, SectionHeading } from '../components/ui/Elements';
import { useNavigation } from '../contexts/NavigationContext';
import { useData, formatRupee } from '../contexts/DataContext';

const Shop = () => {
  const { setView, searchQuery, setSearchQuery } = useNavigation();
  const { products, setSelectedProduct, addToCart } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceLimit, setPriceLimit] = useState(500000);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category Filter
      const catMatch = activeCategory === 'All' || p.category === activeCategory;
      // Search Filter (Name or Category)
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      // Price Filter
      const priceMatch = p.price <= priceLimit;

      return catMatch && priceMatch && searchMatch;
    });
  }, [activeCategory, priceLimit, products, searchQuery]);

  const categories = ['All', 'Clothing', 'Painting', 'Accessories', 'Decor'];

  return (
    <div className="bg-[#F8F5F1] min-h-screen pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="The Collection" 
          subtitle="An assembly of fine goods for the discerning" 
        />

        {/* Search & Filter Bar */}
        <div className="mb-16 sticky top-24 z-30 bg-[#F8F5F1]/95 backdrop-blur-sm py-4 border-y border-[#1A1A1A]/10">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             {/* Categories */}
             <div className="flex flex-wrap justify-center gap-8">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'text-[#1A1A1A] scale-110' : 'text-gray-400 hover:text-[#1A1A1A]'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             
             {/* Price Slider */}
             <div className="flex items-center gap-4">
               <span className="text-[10px] uppercase tracking-wider text-gray-500">Max Price</span>
               <input 
                  type="range" 
                  min="0" 
                  max="500000" 
                  step="5000"
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(Number(e.target.value))}
                  className="w-32 accent-[#1A1A1A] h-0.5 bg-gray-300 appearance-none cursor-pointer" 
               />
               <span className="text-xs font-bold w-20 text-right font-sans">{formatRupee(priceLimit)}</span>
             </div>
           </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
          {filteredProducts.length > 0 ? filteredProducts.map((product) => (
            <div key={product.id} className="group relative flex flex-col items-center">
              
              {/* Framed Image */}
              <div className="relative w-full aspect-[4/5] mb-8 p-3 bg-white frame-antique cursor-pointer" onClick={() => { setSelectedProduct(product); setView('product'); }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center filter grayscale-[0.1] group-hover:grayscale-0 transition duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center bg-gradient-to-t from-black/60 to-transparent">
                  <Button 
                    variant="primary" 
                    className="py-2 px-6 text-xs"
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  >
                    Acquire
                  </Button>
                </div>
              </div>

              <div className="text-center cursor-pointer" onClick={() => { setSelectedProduct(product); setView('product'); }}>
                <p className="text-[10px] font-bold text-[#999] uppercase tracking-[0.2em] mb-2">{product.category}</p>
                <h3 className="text-2xl font-vogue text-[#1A1A1A] mb-2 leading-none group-hover:text-[#C5A059] transition-colors">{product.name}</h3>
                <p className="text-sm font-sans font-bold text-[#1A1A1A] mt-2">{formatRupee(product.price)}</p>
              </div>

            </div>
          )) : (
            <div className="col-span-full py-32 text-center">
              <p className="text-gray-400 text-xl font-vogue italic mb-4">No items matching your query.</p>
              <Button variant="ghost" onClick={() => { setActiveCategory('All'); setPriceLimit(500000); setSearchQuery(''); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
