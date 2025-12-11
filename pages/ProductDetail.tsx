
import React from 'react';
import { ChevronRight, Star, Package, ShieldCheck, Crown } from 'lucide-react';
import { Button } from '../components/ui/Elements';
import { useNavigation } from '../contexts/NavigationContext';
import { useData, formatRupee } from '../contexts/DataContext';
import Shop from './Shop';

const ProductDetail = () => {
  const { setView } = useNavigation();
  const { selectedProduct, addToCart } = useData();

  if (!selectedProduct) return <Shop />;

  return (
    <div className="bg-[#F8F5F1] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => setView('shop')} className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#1A1A1A] mb-12 transition-colors">
          <ChevronRight className="rotate-180 mr-2" size={14} /> Return to Catalogue
        </button>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
          {/* Image Container - Antique Frame */}
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            <div className="relative p-4 bg-white frame-antique">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-auto object-cover max-h-[80vh]"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
             <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-4">
               {selectedProduct.category}
             </span>
             <h1 className="text-5xl md:text-6xl font-vogue text-[#1A1A1A] mb-8 leading-[0.9]">{selectedProduct.name}</h1>
             
             <div className="flex items-baseline gap-6 mb-8 border-b border-gray-200 pb-8">
                <p className="text-3xl font-sans font-light text-[#1A1A1A]">{formatRupee(selectedProduct.price)}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={`${i < Math.floor(selectedProduct.rating) ? 'text-[#1A1A1A]' : 'text-gray-300'} fill-current`} />
                  ))}
                  <span className="ml-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{selectedProduct.rating} / 5.0</span>
                </div>
             </div>

             <div className="prose prose-sm text-gray-600 font-sans mb-12 leading-relaxed">
               <p>
                 This exquisite piece represents the pinnacle of craftsmanship. Sourced from the finest ateliers and preserved with the utmost care, it brings a touch of history and elegance to the modern collection.
               </p>
               <ul className="list-none pl-0 space-y-2 mt-4 text-xs uppercase tracking-wider text-[#1A1A1A]">
                 <li>• Authentic Period Reproduction</li>
                 <li>• Hand-finished details</li>
                 <li>• Verified Provenance</li>
               </ul>
             </div>

             <div className="space-y-4 mb-12">
                <Button 
                  className="w-full py-5"
                  onClick={() => { addToCart(selectedProduct); }}
                >
                  Add to Cart
                </Button>
                <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">Worldwide shipping available</p>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-3">
                   <ShieldCheck size={20} className="text-[#C5A059] mt-1" />
                   <div>
                     <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A] mb-1">Authentic</h4>
                     <p className="text-[10px] text-gray-500 leading-tight">Verified by our expert curators.</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <Crown size={20} className="text-[#C5A059] mt-1" />
                   <div>
                     <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A] mb-1">Premium</h4>
                     <p className="text-[10px] text-gray-500 leading-tight">Highest quality materials guaranteed.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
