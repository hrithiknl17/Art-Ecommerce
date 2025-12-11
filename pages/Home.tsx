
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, SectionHeading } from '../components/ui/Elements';
import { useNavigation } from '../contexts/NavigationContext';
import { INITIAL_PRODUCTS, GENRES } from '../data/mock';
import { useData } from '../contexts/DataContext';

const Home = () => {
  const { setView, setSearchQuery } = useNavigation();
  const { setSelectedProduct } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Data
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop',
      title: 'The New Antiquity',
      subtitle: 'Where renaissance meets high fashion.'
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop',
      title: 'Silk & Stone',
      subtitle: 'Curated garments for the modern muse.'
    },
    {
      image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop',
      title: 'Gilded Frames',
      subtitle: 'Art that transcends the centuries.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleGenreClick = (genreName: string) => {
    setSearchQuery(genreName);
    setView('shop');
  };

  return (
    <>
      {/* Hero Carousel */}
      <div className="relative h-[90vh] bg-black overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center grayscale-[0.3]" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-6xl md:text-9xl font-vogue text-white mb-6 tracking-tighter drop-shadow-2xl animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-sm md:text-base text-white font-sans uppercase tracking-[0.3em] mb-12 bg-black/30 px-4 py-2 backdrop-blur-sm animate-fade-in-up delay-100">
                {slide.subtitle}
              </p>
              <Button onClick={() => setView('shop')} className="animate-fade-in-up delay-200 bg-white text-black border-none hover:bg-[#C5A059]">
                View Collection
              </Button>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-0.5 transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-white' : 'w-4 bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Categories / Genres */}
      <div className="py-24 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="The Departments" subtitle="Explore our curated sections of fine goods" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {GENRES.map((genre) => (
              <div 
                key={genre.id} 
                className="group cursor-pointer flex flex-col items-center"
                onClick={() => handleGenreClick(genre.name === 'Fine Art' ? 'Painting' : genre.name)}
              >
                <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden frame-antique bg-white p-2">
                  <img 
                    src={genre.image} 
                    alt={genre.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-vogue text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors">{genre.name}</h3>
                <span className="text-xs font-sans uppercase tracking-widest text-gray-400 mt-2 group-hover:text-black">View Archive</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Collection */}
      <div className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Recent Acquisitions" subtitle="Items of particular note and rarity" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {INITIAL_PRODUCTS.slice(0, 4).map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => { setSelectedProduct(product); setView('product'); }}
              >
                <div className="relative w-full aspect-[4/5] mb-6 p-3 bg-white frame-antique">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#999] uppercase tracking-[0.2em] mb-2">{product.category}</p>
                  <h3 className="text-xl font-vogue text-[#1A1A1A] mb-2 leading-none">{product.name}</h3>
                  <div className="w-full flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Examine</span>
                    <ArrowRight size={12} className="text-[#C5A059]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <Button onClick={() => setView('shop')} variant="outline" className="px-16">Enter Gallery</Button>
          </div>
        </div>
      </div>

      {/* Editorial Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        <div className="relative bg-[#1A1A1A] flex items-center justify-center p-16 text-white">
           <div className="max-w-md text-center z-10">
             <h2 className="text-6xl font-vogue mb-8 leading-tight">The Art of Living</h2>
             <p className="font-sans text-gray-400 leading-relaxed mb-10">
               We believe that every object in your life should be a masterpiece. From the clothes you wear to the art on your walls, curate a life of exceptional beauty.
             </p>
             <Button variant="primary" className="bg-white text-black hover:bg-[#C5A059]">Read The Journal</Button>
           </div>
        </div>
        <div className="relative h-full min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1600&q=80" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
