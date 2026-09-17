import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ImageSlider from '../components/ImageSlider';
import { Newspaper, Calendar, Search, ArrowRight, X, Eye } from 'lucide-react';

export default function News() {
  const { newsList = [] } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);

  // Katta oyna (Modal) uchun holatlar (1-chidan 2-chiga o'tish uchun)
  const [selectedImagesList, setSelectedImagesList] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const filteredNews = newsList.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Rasmlarni ochish uchun yordamchi funksiya
  const openImageModal = (images, singleImage, e) => {
    if (e) e.stopPropagation(); // Karta bosilganda modal ochilib ketishining oldini oladi
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
      
      {/* Sarlavha va qidiruv */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200/70 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-blue-600 font-medium text-xs uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Yangiliklar</span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mt-2">Maktab hayotidagi so'nggi voqealar</h1>
        </div>

        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Yangiliklarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-[#1D1D1F] placeholder-slate-400 outline-none focus:border-blue-600 transition"
          />
        </div>
      </div>

      {/* Yangiliklar gridi */}
      {filteredNews.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-[2.5rem] border border-slate-200/70 text-slate-400 text-xs shadow-sm space-y-3">
          <Newspaper className="w-10 h-10 mx-auto text-slate-300" />
          <p>Hech qanday yangilik topilmadi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div 
              key={item.id || item.title} 
              onClick={() => setSelectedNews(item)}
              className="bg-white rounded-[2rem] border border-slate-200/70 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* ImageSlider orqali kartaning o'zida ham rasmlarni almashtirish imkoniyati */}
                {(item.images?.length > 0 || item.image) && (
                  <div 
                    onClick={(e) => openImageModal(item.images, item.image, e)}
                    className="overflow-hidden relative group/img"
                  >
                    <ImageSlider images={item.images} item={item} />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-blue-600" /> Rasmlarni ko'rish
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date || "Sana yo'q"}</span>
                  </div>
                  <h3 className="font-semibold text-[#1D1D1F] text-base tracking-tight line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-normal line-clamp-3 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="text-xs font-medium text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Batafsil o'qish <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- KATTA RASM UCHUN MODAL OYNA (1-chidan 2-chiga o'tish imkoniyati bilan) --- */}
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

            {selectedImagesList.length > 1 && (
              <div className="p-4 flex items-center gap-3 bg-white/5 border-t border-white/10 w-full justify-center overflow-x-auto">
                {selectedImagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${activeImageIndex === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- YANGILIKNING BATAFSIL OYNASI (MODAL) --- */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 relative space-y-6">
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block">
                {selectedNews.date || "Sana yo'q"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">{selectedNews.title}</h2>
            </div>

            {/* Modal ichidagi to'liq o'qish oynasida ham ImageSlider qo'shildi */}
            {(selectedNews.images?.length > 0 || selectedNews.image) && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <ImageSlider images={selectedNews.images} item={selectedNews} />
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed whitespace-pre-wrap">
              {selectedNews.desc}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}