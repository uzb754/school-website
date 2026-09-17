import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ImageSlider from '../components/ImageSlider';

import { 
  Award, BookOpen, Calendar, GraduationCap, 
  HeartHandshake, MapPin, Newspaper, ShieldCheck, 
  Sparkles, Trophy, Users, CheckCircle2, MessageSquare, Send, HelpCircle, ChevronDown, ArrowRight, X, Eye
} from 'lucide-react';

export default function Home() {
  const { newsList = [], winnersList = [], eventsList = [], faqs = [], sendToTelegram } = useData();

  const [openFaq, setOpenFaq] = useState(null);
  const [feedback, setFeedback] = useState({ name: '', role: "O'quvchi", text: '' });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Katta oyna (Modal) uchun holatlar
  const [selectedImagesList, setSelectedImagesList] = useState([]); // Barcha rasmlar massivi
  const [activeImageIndex, setActiveImageIndex] = useState(0);     // Hozir ko'rsatilayotgan rasm indeksi
  const [selectedNews, setSelectedNews] = useState(null);

  const latestNews = newsList.slice(0, 3);
  const latestWinners = winnersList.slice(0, 3);
  const latestEvents = eventsList.slice(0, 3);

  useEffect(() => {
    let timer;
    if (feedbackSent) {
      timer = setTimeout(() => {
        setFeedbackSent(false);
        setFeedback({ name: '', role: "O'quvchi", text: '' });
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [feedbackSent]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.name.trim() || !feedback.text.trim()) return;

    setLoading(true);
    try {
      const success = await sendToTelegram(feedback);
      if (success) {
        setFeedbackSent(true);
      } else {
        alert("Xabarni yuborishda xatolik yuz berdi.");
      }
    } catch (error) {
      alert("Xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const truncateWords = (text, limit = 8) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  const administration = [
    { name: "Karimova Zuxra Abduvaliyevna", role: "Maktab Direktori", experience: "22 yil tajriba", badge: "Xalq Ta'limi A'lochisi" },
    { name: "Rustamov Jasur Anvarovich", role: "O'quv ishlari bo'yicha o'rinbosar", experience: "15 yil tajriba", badge: "Oliy toifali" },
    { name: "Soliqova Nilufar Mahmudovna", role: "Ma'naviy-ma'rifiy ishlar bo'yicha o'rinbosar", experience: "12 yil tajriba", badge: "Metodist" }
  ];

  // Rasmlarni ochish uchun yordamchi funksiya (barcha rasmlarni massiv sifatida qabul qiladi)
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
    <div className="space-y-24 pb-24 bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F5F5F7] pt-24 pb-36 px-4 border-b border-slate-200/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 bg-slate-200/60 border border-slate-300/40 px-4 py-1.5 rounded-full text-slate-700 text-xs font-medium backdrop-blur-xl shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="tracking-wide">269-sonli umumta'lim maktabi</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.08] text-[#1D1D1F]">
              Kelajak sari <br className="hidden sm:block"/>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
                zukko qadamlar.
              </span>
            </h1>
            
            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Mukammal ta'lim muhiti, ilg'or ustozlar va har bir o'quvchining shaxsiy salohiyatini ochib beruvchi maskan.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <Link to="/schedule" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-full shadow-lg shadow-blue-600/20 transition-all duration-300 transform active:scale-95 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Dars jadvali
              </Link>
              <Link to="/news" className="px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-medium text-sm rounded-full backdrop-blur-xl shadow-sm transition-all duration-300 transform active:scale-95 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-600" /> Yangiliklar
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl text-[#1D1D1F] p-8 rounded-[2.5rem] shadow-xl space-y-6 border border-slate-200/80 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md shadow-blue-600/20">
                    269
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#1D1D1F] tracking-wide">Maktab Statistikasi</h3>
                    <p className="text-xs text-slate-400 font-light">2025–2026 O'quv yili</p>
                  </div>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-slate-50 hover:bg-slate-100/80 transition p-4 rounded-2xl border border-slate-100 text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                  <p className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">1200+</p>
                  <p className="text-[11px] text-slate-500 font-medium">O'quvchilar</p>
                </div>
                <div className="bg-slate-50 hover:bg-slate-100/80 transition p-4 rounded-2xl border border-slate-100 text-center">
                  <GraduationCap className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">85+</p>
                  <p className="text-[11px] text-slate-500 font-medium">O'qituvchilar</p>
                </div>
                <div className="bg-slate-50 hover:bg-slate-100/80 transition p-4 rounded-2xl border border-slate-100 text-center">
                  <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                  <p className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">150+</p>
                  <p className="text-[11px] text-slate-500 font-medium">Yutuqlar</p>
                </div>
                <div className="bg-slate-50 hover:bg-slate-100/80 transition p-4 rounded-2xl border border-slate-100 text-center">
                  <ShieldCheck className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
                  <p className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">100%</p>
                  <p className="text-[11px] text-slate-500 font-medium">Xavfsiz Muhit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AFZALLIKLAR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2.5 mb-14">
          <span className="text-blue-600 font-medium text-xs uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Afzalliklarimiz</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">Nima uchun aynan biz?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <BookOpen className="w-5 h-5 text-blue-600" />, title: "Zamonaviy Darslar", desc: "Xonalar eng so'nggi texnika va jihozlar bilan ta'minlangan.", bg: "bg-blue-50 border-blue-100" },
            { icon: <Award className="w-5 h-5 text-emerald-600" />, title: "Yuqori Natijalar", desc: "O'quvchilarimiz turli olimpiadalarda doimiy g'olib.", bg: "bg-emerald-50 border-emerald-100" },
            { icon: <HeartHandshake className="w-5 h-5 text-amber-600" />, title: "G'amxo'r Jamoa", desc: "Har bir o'quvchiga alohida e'tibor va yondashuv.", bg: "bg-amber-50 border-amber-100" },
            { icon: <Sparkles className="w-5 h-5 text-purple-600" />, title: "Qiziqarli To'garaklar", desc: "Sport, IT va san'at bo'yicha to'garaklar faoliyat yuritadi.", bg: "bg-purple-50 border-purple-100" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-7 rounded-[2rem] border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group">
              <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-[#1D1D1F] text-base tracking-wide">{item.title}</h3>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. YANGILIKLAR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1.5">
            <span className="text-blue-600 font-medium text-xs uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Maktab hayoti</span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-2">So'nggi yangiliklar</h2>
          </div>
          <Link to="/news" className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group transition">
            Barchasi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {latestNews.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-[2rem] border border-slate-200/70 text-slate-400 text-xs shadow-sm">
            Hozircha yangiliklar kiritilmagan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((item) => (
              <div key={item.id || item.title} className="bg-white rounded-[2rem] border border-slate-200/70 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                <div className="p-3">
                  <div 
                    onClick={() => openImageModal(item.images, item.image)}
                    className="cursor-pointer overflow-hidden rounded-2xl relative"
                  >
                    <ImageSlider images={item.images} item={item} />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-blue-600" /> Rasmni kattalashtirish
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <span className="text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                      {item.date || "Sana yo'q"}
                    </span>
                    <h3 className="font-semibold text-[#1D1D1F] text-base tracking-tight line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {truncateWords(item.desc, 8)}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-0">
                  <button 
                    onClick={() => setSelectedNews(item)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium text-xs rounded-xl border border-slate-200/60 transition flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Batafsil o'qish</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. YUTUQLAR (Rasmlar ustiga bosganda modal ochilib barcha rasmlarni aylantirish qo'shildi) */}
      <section className="bg-gradient-to-b from-[#1D1D1F] to-black text-white py-20 rounded-[3rem] mx-4 sm:mx-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/10 blur-[140px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 space-y-10 relative z-10">
          <div className="flex justify-between items-end">
            <div className="space-y-1.5">
              <span className="text-amber-400 font-medium text-xs uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">G'oliblar</span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2">Faxrli yutuqlarimiz</h2>
            </div>
            <Link to="/winners" className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group transition">
              Barchasi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {latestWinners.length === 0 ? (
            <div className="bg-white/[0.03] p-12 text-center rounded-[2rem] border border-white/10 text-slate-400 text-xs">
              Hozircha yutuqlar kiritilmagan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestWinners.map((item) => (
                <div key={item.id || item.title} className="bg-white/[0.03] hover:bg-white/[0.06] transition-all p-6 rounded-[2rem] border border-white/10 space-y-4">
                  <div 
                    onClick={() => openImageModal(item.images, item.image)}
                    className="cursor-pointer overflow-hidden rounded-2xl relative group/img"
                  >
                    <ImageSlider images={item.images} item={item} />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" /> Rasmlarni ko'rish
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm tracking-tight leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 font-light">G'olib: <span className="text-amber-400 font-medium">{item.student}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. TADBIRLAR (Rasmlar ustiga bosganda modal ochilib barcha rasmlarni aylantirish qo'shildi) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1.5">
            <span className="text-blue-600 font-medium text-xs uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Taqvim</span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mt-2">Yaqindagi tadbirlar</h2>
          </div>
          <Link to="/events" className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group transition">
            Barchasi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {latestEvents.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-[2rem] border border-slate-200/70 text-slate-400 text-xs shadow-sm">
            Hozircha yaqin orada tadbirlar belgilanmagan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestEvents.map((item) => (
              <div key={item.id || item.title} className="bg-white p-7 rounded-[2rem] border border-slate-200/70 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                <div className="space-y-3">
                  {/* Tadbir rasmlari mavjud bo'lsa slider va modalni qo'shamiz */}
                  {(item.images?.length > 0 || item.image) && (
                    <div 
                      onClick={() => openImageModal(item.images, item.image)}
                      className="cursor-pointer overflow-hidden rounded-2xl relative group/img mb-3"
                    >
                      <ImageSlider images={item.images} item={item} />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-blue-600" /> Rasmlarni ko'rish
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date || 'Sana belgilanmagan'}</span>
                  </div>
                  <h3 className="font-semibold text-[#1D1D1F] text-base tracking-tight leading-snug">{item.title}</h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" /> 
                  <span className="truncate">{item.location || 'Maktab majlislar zali'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. RAHBARIYAT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2.5 mb-14">
          <span className="text-blue-600 font-medium text-xs uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Ma'muriyat</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">Maktab rahbariyati</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {administration.map((person, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200/70 shadow-sm text-center space-y-5 hover:shadow-md transition-all">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto text-2xl font-bold shadow-lg shadow-blue-600/20">
                {person.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-[#1D1D1F] text-base tracking-tight">{person.name}</h3>
                <p className="text-xs font-medium text-blue-600">{person.role}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-light">
                <span>{person.experience}</span>
                <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-slate-700 font-medium text-[11px]">{person.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="text-center space-y-2.5 mb-14">
          <span className="text-blue-600 font-medium text-xs uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">Ko'p beriladigan savollar</h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div key={faq.id || idx} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden transition">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 font-medium text-[#1D1D1F] text-sm md:text-base hover:bg-slate-50 transition"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs md:text-sm text-slate-500 font-light leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FIKR BILDIRISH */}
      <section className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-200/70 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>

          <div className="text-center space-y-2.5 relative z-10">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">Savol yoki taklifingiz bormi?</h2>
            <p className="text-xs text-slate-500 font-light max-w-sm mx-auto">
              Taklif va xabarlaringizni to'g'ridan-to'g'ri yuboring.
            </p>
          </div>

          {feedbackSent ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-2xl text-center text-xs font-medium flex items-center justify-center gap-2 relative z-10">
              <CheckCircle2 className="w-4 h-4" /> Telegram botga muvaffaqiyatli yuborildi!
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ismingiz..."
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-[#1D1D1F] placeholder-slate-400 outline-none focus:border-blue-600 transition"
                  required
                />
                <select
                  value={feedback.role}
                  onChange={(e) => setFeedback({ ...feedback, role: e.target.value })}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 outline-none focus:border-blue-600 transition"
                >
                  <option value="O'quvchi">O'quvchiman</option>
                  <option value="Ota-ona">Ota-onaman</option>
                  <option value="O'qituvchi">O'qituvchiman</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </div>
              <textarea
                placeholder="Xabaringizni yozing..."
                value={feedback.text}
                onChange={(e) => setFeedback({ ...feedback, text: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-[#1D1D1F] placeholder-slate-400 outline-none h-32 focus:border-blue-600 transition resize-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" /> {loading ? "Yuborilmoqda..." : "Xabarni yuborish"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* --- KATTA RASM UCHUN MODAL OYNA (Barcha bo'limlardagi ko'p rasmlar o'rtasida o'tish imkoniyati bilan) --- */}
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

            {/* Agar rasmlar 1 tadan ko'p bo'lsa, pastda kichik rasmlar (thumbnails) chiqadi va ular orqali o'tish mumkin */}
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
          <div className="relative max-w-2xl w-full bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                {selectedNews.date || "Sana ko'rsatilmagan"}
              </span>
              <button 
                onClick={() => setSelectedNews(null)}
                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight leading-snug">
                {selectedNews.title}
              </h2>
              
              <div className="rounded-2xl overflow-hidden border border-slate-100">
                <ImageSlider images={selectedNews.images} item={selectedNews} />
              </div>

              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed whitespace-pre-line pt-2">
                {selectedNews.desc}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-xl transition cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}