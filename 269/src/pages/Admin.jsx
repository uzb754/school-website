// src/pages/Admin.jsx
import React, { useState } from 'react';
import { 
  Newspaper, Trophy, Calendar, LogOut, 
  ShieldCheck, Trash2, Edit3, X, HelpCircle, Plus, Send, Image as ImageIcon, Sparkles, 
  Sliders, RefreshCw, Hand
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('news'); 

  const SECRET_PASSWORD = 'Jaloliddin269';

  const { 
    newsList, setNewsList, 
    winnersList, setWinnersList, 
    eventsList, setEventsList,
    faqs, addFaq, deleteFaq,
    sliderMode, setSliderMode
  } = useData();

  const [newNews, setNewNews] = useState({ title: '', desc: '', images: [] });
  const [editingNews, setEditingNews] = useState(null);

  const [newWinner, setNewWinner] = useState({ title: '', student: '', images: [] });
  const [editingWinner, setEditingWinner] = useState(null);

  const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', images: [] });
  const [editingEvent, setEditingEvent] = useState(null);

  const [newFaq, setNewFaq] = useState({ q: '', a: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError("Parol noto'g'ri!");
    }
  };

  const handleImageUpload = (e, currentImages, setImagesCallback) => {
    const files = Array.from(e.target.files);
    if ((currentImages?.length || 0) + files.length > 5) {
      alert("Ko'pi bilan 5 ta rasm yuklay olasiz!");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesCallback((prev) => [...(prev || []), reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index, currentImages, setImagesCallback) => {
    const updated = currentImages.filter((_, i) => i !== index);
    setImagesCallback(updated);
  };

  // Yangiliklar
  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newNews.title) return;
    const item = { ...newNews, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    setNewsList([item, ...newsList]);
    setNewNews({ title: '', desc: '', images: [] });
  };

  const handleUpdateNews = (e) => {
    e.preventDefault();
    setNewsList(newsList.map(item => item.id === editingNews.id ? editingNews : item));
    setEditingNews(null);
  };

  // Yutuqlar
  const handleAddWinner = (e) => {
    e.preventDefault();
    if (!newWinner.title) return;
    const item = { ...newWinner, id: Date.now() };
    setWinnersList([item, ...winnersList]);
    setNewWinner({ title: '', student: '', images: [] });
  };

  const handleUpdateWinner = (e) => {
    e.preventDefault();
    setWinnersList(winnersList.map(item => item.id === editingWinner.id ? editingWinner : item));
    setEditingWinner(null);
  };

  // Tadbirlar
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    const item = { ...newEvent, id: Date.now() };
    setEventsList([item, ...eventsList]);
    setNewEvent({ title: '', date: '', location: '', images: [] });
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    setEventsList(eventsList.map(item => item.id === editingEvent.id ? editingEvent : item));
    setEditingEvent(null);
  };

  // FAQ
  const handleAddFaq = (e) => {
    e.preventDefault();
    if (newFaq.q && newFaq.a) {
      addFaq(newFaq);
      setNewFaq({ q: '', a: '' });
    }
  };

  // LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/60 p-8 rounded-3xl shadow-xl max-w-md w-full space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Panel</h1>
            <p className="text-xs text-slate-500 mt-1">Davom etish uchun parolni kiriting</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl bg-white text-slate-800 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
              required
            />
            {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}
            <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-blue-500/20">
              Kirish
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'news', label: 'Yangiliklar', icon: Newspaper, count: newsList.length },
    { id: 'winners', label: 'Yutuqlar', icon: Trophy, count: winnersList.length },
    { id: 'events', label: 'Tadbirlar', icon: Calendar, count: eventsList.length },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, count: faqs.length },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-slate-800 p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Apple Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Boshqaruv Paneli</h1>
              <p className="text-xs text-slate-500">Firebase Cloud Sync Active 🚀</p>
            </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-semibold text-xs rounded-2xl transition">
            <LogOut className="w-4 h-4" /> Chiqish
          </button>
        </header>

        {/* SLAYDER REJIMI SOZLAMASI */}
        <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl border border-white/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-2xl">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Rasmlarni Almashtirish Rejimi</h3>
              <p className="text-xs text-slate-500">Saytdagi barcha kartochka rasmlari qanday almashishini belgilang</p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSliderMode('auto')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderMode === 'auto' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Avto (Avtomatik)
            </button>
            <button
              type="button"
              onClick={() => setSliderMode('manual')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderMode === 'manual' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Hand className="w-3.5 h-3.5" /> Qo'lda (Strelkalar)
            </button>
          </div>
        </div>

        {/* Apple Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Nav */}
          <nav className="lg:col-span-1 bg-white/70 backdrop-blur-xl p-3 rounded-3xl border border-white/80 space-y-2 shadow-sm h-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-semibold text-xs transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-6">

            {/* TAB: YANGILIKLAR */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
                  <h2 className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                    {editingNews ? "Yangilikni Tahrirlash" : "Yangi Yangilik Qo'shish"}
                  </h2>
                  <form onSubmit={editingNews ? handleUpdateNews : handleAddNews} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Sarlavha..."
                      value={editingNews ? editingNews.title : newNews.title}
                      onChange={(e) => editingNews ? setEditingNews({ ...editingNews, title: e.target.value }) : setNewNews({ ...newNews, title: e.target.value })}
                      className="w-full p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                      required
                    />
                    <textarea
                      placeholder="Tavsifi (Qisqa va ravshan)..."
                      value={editingNews ? editingNews.desc : newNews.desc}
                      onChange={(e) => editingNews ? setEditingNews({ ...editingNews, desc: e.target.value }) : setNewNews({ ...newNews, desc: e.target.value })}
                      className="w-full p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition h-24 resize-none"
                    />

                    {/* Image Upload Box */}
                    <div className="border border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50/50 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                        <ImageIcon className="w-4 h-4 text-blue-600" /> Rasmlar yuklash (Max 5 ta)
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(
                          e, 
                          editingNews ? editingNews.images : newNews.images, 
                          (imgs) => editingNews ? setEditingNews({ ...editingNews, images: typeof imgs === 'function' ? imgs(editingNews.images) : imgs }) : setNewNews({ ...newNews, images: typeof imgs === 'function' ? imgs(newNews.images) : imgs })
                        )}
                        className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition"
                      />
                      
                      <div className="flex flex-wrap gap-3 pt-2">
                        {(editingNews ? editingNews.images : newNews.images)?.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img src={img} alt="" className="w-16 h-16 object-cover rounded-2xl border border-slate-200 shadow-sm" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(
                                idx, 
                                editingNews ? editingNews.images : newNews.images,
                                (imgs) => editingNews ? setEditingNews({ ...editingNews, images: imgs }) : setNewNews({ ...newNews, images: imgs })
                              )}
                              className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-blue-500/20">
                        {editingNews ? 'Saqlash' : "Chop etish"}
                      </button>
                      {editingNews && <button type="button" onClick={() => setEditingNews(null)} className="px-4 py-3 bg-slate-100 text-slate-600 text-xs font-semibold rounded-2xl">Bekor qilish</button>}
                    </div>
                  </form>
                </div>

                {/* News List */}
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mavjud yangiliklar</h2>
                  <div className="space-y-3">
                    {newsList.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800">{item.title}</p>
                          <p className="text-slate-500 line-clamp-1">{item.desc}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingNews(item)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => setNewsList(newsList.filter(n => n.id !== item.id))} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: YUTUQLAR */}
            {activeTab === 'winners' && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
                  <h2 className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                    {editingWinner ? "Yutuqni Tahrirlash" : "Yangi Yutuq Qo'shish"}
                  </h2>
                  <form onSubmit={editingWinner ? handleUpdateWinner : handleAddWinner} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Yutuq nomi..."
                        value={editingWinner ? editingWinner.title : newWinner.title}
                        onChange={(e) => editingWinner ? setEditingWinner({ ...editingWinner, title: e.target.value }) : setNewWinner({ ...newWinner, title: e.target.value })}
                        className="p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="G'olib O'quvchi / Jamoa..."
                        value={editingWinner ? editingWinner.student : newWinner.student}
                        onChange={(e) => editingWinner ? setEditingWinner({ ...editingWinner, student: e.target.value }) : setNewWinner({ ...newWinner, student: e.target.value })}
                        className="p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="border border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50/50 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                        <ImageIcon className="w-4 h-4 text-blue-600" /> Rasmlar (Max 5 ta)
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(
                          e, 
                          editingWinner ? editingWinner.images : newWinner.images, 
                          (imgs) => editingWinner ? setEditingWinner({ ...editingWinner, images: typeof imgs === 'function' ? imgs(editingWinner.images) : imgs }) : setNewWinner({ ...newWinner, images: typeof imgs === 'function' ? imgs(newWinner.images) : imgs })
                        )}
                        className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                      />
                      <div className="flex flex-wrap gap-3 pt-2">
                        {(editingWinner ? editingWinner.images : newWinner.images)?.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img src={img} alt="" className="w-16 h-16 object-cover rounded-2xl border border-slate-200 shadow-sm" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(
                                idx, 
                                editingWinner ? editingWinner.images : newWinner.images,
                                (imgs) => editingWinner ? setEditingWinner({ ...editingWinner, images: imgs }) : setNewWinner({ ...newWinner, images: imgs })
                              )}
                              className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-1 shadow-md"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-blue-500/20">
                        {editingWinner ? 'Saqlash' : "Yutuqni Saqlash"}
                      </button>
                      {editingWinner && <button type="button" onClick={() => setEditingWinner(null)} className="px-4 py-3 bg-slate-100 text-slate-600 text-xs font-semibold rounded-2xl">Bekor qilish</button>}
                    </div>
                  </form>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mavjud Yutuqlar</h2>
                  <div className="space-y-3">
                    {winnersList.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{item.title}</p>
                          <p className="text-slate-500">G'olib: {item.student}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingWinner(item)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => setWinnersList(winnersList.filter(w => w.id !== item.id))} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TADBIRLAR */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
                  <h2 className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                    {editingEvent ? "Tadbirni Tahrirlash" : "Yangi Tadbir Qo'shish"}
                  </h2>
                  <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Tadbir nomi..."
                        value={editingEvent ? editingEvent.title : newEvent.title}
                        onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, title: e.target.value }) : setNewEvent({ ...newEvent, title: e.target.value })}
                        className="p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500"
                        required
                      />
                      <input
                        type="date"
                        value={editingEvent ? editingEvent.date : newEvent.date}
                        onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, date: e.target.value }) : setNewEvent({ ...newEvent, date: e.target.value })}
                        className="p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Joylashuv..."
                        value={editingEvent ? editingEvent.location : newEvent.location}
                        onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, location: e.target.value }) : setNewEvent({ ...newEvent, location: e.target.value })}
                        className="p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="border border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50/50 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                        <ImageIcon className="w-4 h-4 text-blue-600" /> Rasmlar (Max 5 ta)
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(
                          e, 
                          editingEvent ? editingEvent.images : newEvent.images, 
                          (imgs) => editingEvent ? setEditingEvent({ ...editingEvent, images: typeof imgs === 'function' ? imgs(editingEvent.images) : imgs }) : setNewEvent({ ...newEvent, images: typeof imgs === 'function' ? imgs(newEvent.images) : imgs })
                        )}
                        className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                      />
                      <div className="flex flex-wrap gap-3 pt-2">
                        {(editingEvent ? editingEvent.images : newEvent.images)?.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img src={img} alt="" className="w-16 h-16 object-cover rounded-2xl border border-slate-200 shadow-sm" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(
                                idx, 
                                editingEvent ? editingEvent.images : newEvent.images,
                                (imgs) => editingEvent ? setEditingEvent({ ...editingEvent, images: imgs }) : setNewEvent({ ...newEvent, images: imgs })
                              )}
                              className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-1 shadow-md"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-blue-500/20">
                        {editingEvent ? 'Saqlash' : "Tadbirni Saqlash"}
                      </button>
                      {editingEvent && <button type="button" onClick={() => setEditingEvent(null)} className="px-4 py-3 bg-slate-100 text-slate-600 text-xs font-semibold rounded-2xl">Bekor qilish</button>}
                    </div>
                  </form>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mavjud Tadbirlar</h2>
                  <div className="space-y-3">
                    {eventsList.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{item.title}</p>
                          <p className="text-slate-500">Joy: {item.location || '-'}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingEvent(item)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => setEventsList(eventsList.filter(ev => ev.id !== item.id))} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAQ */}
            {activeTab === 'faq' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4 h-fit">
                  <h2 className="text-xs font-bold text-blue-600 tracking-wider uppercase flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Savol Qo'shish
                  </h2>
                  <form onSubmit={handleAddFaq} className="space-y-4">
                    <input
                      type="text"
                      value={newFaq.q}
                      onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })}
                      placeholder="Savol..."
                      className="w-full p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500"
                      required
                    />
                    <textarea
                      value={newFaq.a}
                      onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })}
                      placeholder="Javob..."
                      className="w-full p-3.5 border border-slate-200 rounded-2xl bg-white text-xs text-slate-800 outline-none focus:border-blue-500 h-24 resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Qo'shish
                    </button>
                  </form>
                </div>

                <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mavjud Savollar ({faqs.length})</h2>
                  <div className="space-y-3">
                    {faqs.map((item) => (
                      <div key={item.id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-xs flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800">❓ {item.q}</p>
                          <p className="text-slate-500 pl-4 border-l-2 border-blue-500">💬 {item.a}</p>
                        </div>
                        <button
                          onClick={() => deleteFaq(item.id)}
                          className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}