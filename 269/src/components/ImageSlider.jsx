import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ImageSlider({ images, item }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { sliderMode, setSelectedItem } = useData();

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-slate-100 rounded-2xl flex items-center justify-center text-xs text-slate-400">
        Rasm yo'q
      </div>
    );
  }

  // Admin paneldagi rejimga qarab avtomatik o'tish
  useEffect(() => {
    if (sliderMode === 'auto' && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [sliderMode, images.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (item && setSelectedItem) {
      setSelectedItem(item);
    }
  };

  return (
    <div 
      onClick={handleImageClick}
      className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden group bg-slate-900 cursor-pointer break-words"
    >
      {/* Joriy rasm */}
      <img 
        src={images[currentIndex]} 
        alt="Slide" 
        className="w-full h-full object-contain sm:object-cover transition-all duration-500"
      />

      {/* Agar rasmlar 1 tadan ko'p bo'lsa */}
      {images.length > 1 && (
        <>
          <button 
            type="button"
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-80 sm:opacity-0 group-hover:opacity-100 transition shadow-md z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            type="button"
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-80 sm:opacity-0 group-hover:opacity-100 transition shadow-md z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Nuqtachalar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm z-10">
            {images.map((_, idx) => (
              <button
                type="button"
                key={idx} 
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1.5 rounded-full transition-all ${currentIndex === idx ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}