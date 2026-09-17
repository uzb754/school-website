// src/components/HomeSections.jsx
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, Calendar, MapPin, Trophy, Newspaper, X } from 'lucide-react';

export default function HomeSections() {
  const { newsList, winnersList, eventsList } = useData();
  const [modalData, setModalData] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      
      {/* 1. YANGILIKLAR BO'LIMI (Yonma-yon grid) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-2xl">
            <Newspaper className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Yangiliklar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                {item.images && item.images.length > 0 && (
                  <div className="overflow-hidden rounded-2xl h-48 bg-slate-100">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                )}
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit inline-block">
                  {item.date || 'Bugun'}
                </span>
                <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{item.title}</h3>
                {/* Qisqa matn */}
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>

              {/* Yana o'qish belgisi */}
              <button 
                onClick={() => setModalData({ ...item, type: 'Yangilik' })}
                className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 pt-3 border-t border-slate-100 group-hover:translate-x-1 transition-all"
              >
                Yana o'qish <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 2. YUTUQLAR BO'LIMI (Yonma-yon grid) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Yutuqlarimiz</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winnersList.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                {item.images && item.images.length > 0 && (
                  <div className="overflow-hidden rounded-2xl h-48 bg-slate-100">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                )}
                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit inline-block">
                  🏆 G'olib: {item.student || 'O\'quvchimiz'}
                </span>
                <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{item.title}</h3>
              </div>

              <button 
                onClick={() => setModalData({ ...item, type: 'Yutuq' })}
                className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 pt-3 border-t border-slate-100 group-hover:translate-x-1 transition-all"
              >
                Batafsil ko'rish <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TADBIRLAR BO'LIMI (Yonma-yon grid) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Kutilayotgan Tadbirlar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsList.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                {item.images && item.images.length > 0 && (
                  <div className="overflow-hidden rounded-2xl h-48 bg-slate-100">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.date || 'Yaqinda'}
                  </span>
                  {item.location && (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{item.title}</h3>
              </div>

              <button 
                onClick={() => setModalData({ ...item, type: 'Tadbir' })}
                className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 pt-3 border-t border-slate-100 group-hover:translate-x-1 transition-all"
              >
                Yana o'qish <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* YANA O'QISH MODAL OYNA (To'liq ma'lumot shu yerda ochiladi) */}
      {modalData && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setModalData(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{modalData.type}</span>
            <h2 className="text-xl font-bold text-slate-900">{modalData.title}</h2>
            
            {modalData.images && modalData.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {modalData.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="w-32 h-32 object-cover rounded-2xl border" />
                ))}
              </div>
            )}
            <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{modalData.desc || modalData.student || 'Batafsil ma\'lumotlar.'}</p>
          </div>
        </div>
      )}

    </div>
  );
}