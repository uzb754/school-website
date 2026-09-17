import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ImageSlider from '../components/ImageSlider';
import { Trophy, X, Eye } from 'lucide-react';

export default function Winners() {
  const { winnersList = [] } = useData();

  // Katta oyna (Modal) uchun holatlar
  const [selectedImagesList, setSelectedImagesList] = useState([]); // Barcha rasmlar massivi
  const [activeImageIndex, setActiveImageIndex] = useState(0);     // Hozir ko'rsatilayotgan rasm indeksi

  // Rasmlarni ochish uchun yordamchi funksiya
  const openImageModal = (images, singleImage) => {
    let list = [];
    if (images && images.length > 0) {
      list = images;
    } else if (singleImage) {
      list = [singleImage];
    }
    if (list.length > 0) {
      setSelectedImagesList(list);
      setActiveImageIndex(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-[#1D1D1F] font-sans antialiased">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/70 shadow-sm text-center space-y-2">
        <span className="text-amber-500 font-medium text-xs uppercase tracking-widest bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">Faxrli yutuqlar</span>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mt-2">Maktabimiz g'oliblari</h1>
        <p className="text-xs text-slate-500 font-light">Olimpiada va tanlovlar g'olibi bo'lgan o'quvchilarimiz.</p>
      </div>

      {winnersList.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-[2.5rem] border border-slate-200/70 text-slate-400 text-xs shadow-sm">
          Hozircha yutuqlar kiritilmagan.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {winnersList.map((item) => (
            <div key={item.id || item.title} className="bg-white p-6 rounded-[2rem] border border-slate-200/70 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
              
              {/* Rasmlar qismi (ImageSlider va Modalni ochish) */}
              {(item.images?.length > 0 || item.image) && (
                <div 
                  onClick={() => openImageModal(item.images, item.image)}
                  className="cursor-pointer overflow-hidden rounded-2xl relative group/img"
                >
                  <ImageSlider images={item.images} item={item} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-amber-500" /> Rasmlarni ko'rish
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 border border-amber-100 text-amber-500 rounded-2xl shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#1D1D1F] text-sm tracking-tight leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-light">G'olib: <span className="text-amber-600 font-medium">{item.student}</span></p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* --- KATTA RASM UCHUN MODAL OYNA (1-chidan 2-chiga va hokazo o'tish imkoniyati bilan) --- */}
      {selectedImagesList.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center">
            <button 
              onClick={() => setSelectedImagesList([])}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 flex items-center justify-center max-h-[80vh] w-full">
              <img 
                src={selectedImagesList[activeImageIndex]} 
                alt="Kattalashtirilgan rasm" 
                className="max-h-[75vh] w-auto object-contain rounded-2xl"
              />
            </div>

            {/* Agar rasmlar 1 tadan ko'p bo'lsa, pastda kichik rasmlar chiqadi */}
            {selectedImagesList.length > 1 && (
              <div className="p-4 flex items-center gap-3 bg-white/5 border-t border-white/10 w-full justify-center overflow-x-auto">
                {selectedImagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}