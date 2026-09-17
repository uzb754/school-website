// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

// Context Import
import { DataProvider } from './context/DataContext';

// Pages Import
import Home from './pages/Home';
import News from './pages/News';
import Winners from './pages/Winners';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import Admin from './pages/Admin';

// Asosiy AppContent komponenti
function AppContent() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Asosiy' },
    { path: '/news', label: 'Yangiliklar' },
    { path: '/winners', label: 'Yutuqlar' },
    { path: '/events', label: 'Tadbirlar' },
    { path: '/schedule', label: 'Dars jadvali' },
  ];

  return (
    <DataProvider>
      <div className="min-h-screen bg-[#FAFAFC] text-[#1D1D1F] flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
        
        {/* Header / Navbar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 font-semibold text-base text-[#1D1D1F]">
              <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-xl font-bold shadow-sm shadow-blue-600/20">269</span>
              <span className="tracking-tight">269-MAKTAB</span>
            </Link>

            <nav className="flex gap-1 md:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-100/60'
                        : 'text-slate-600 hover:text-[#1D1D1F] hover:bg-slate-100/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/winners" element={<Winners />} />
            <Route path="/events" element={<Events />} />
            <Route path="/schedule" element={<Schedule />} />
            
            {/* Maxsus yashirin Admin Panel yo'li */}
            <Route path="/admin269" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200/60 pt-12 pb-6 mt-16 text-slate-600">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
            
            {/* 1-Ustun: Maktab haqida */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#1D1D1F] tracking-tight">269-Maktab</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
                Maktabimiz uzoq yillik boy tarixga va an'analarga ega ta'lim dargohidir.
              </p>
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 2-Ustun: Tezkor Havolalar */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1D1D1F] text-xs uppercase tracking-wider">Tezkor Havolalar</h4>
              <ul className="space-y-2 text-xs text-slate-500 font-light">
                <li><Link to="/news" className="hover:text-blue-600 transition">Yangiliklar</Link></li>
                <li><Link to="/winners" className="hover:text-blue-600 transition">Yutuqlarimiz</Link></li>
                <li><Link to="/events" className="hover:text-blue-600 transition">Tadbirlar</Link></li>
              </ul>
            </div>

            {/* 3-Ustun: Bog'lanish */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1D1D1F] text-xs uppercase tracking-wider">Bog'lanish</h4>
              <ul className="space-y-3 text-xs text-slate-500 font-light">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Toshkent shahri, Sergeli tumani, 269-maktab</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+998 99 778 88 66</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>info@269-maktab.uz</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Eng Pastki Qismi */}
          <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
            <p>© 2026 Barcha huquqlar himoyalangan.</p>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200/60">
              <span>Created by</span>
              <span className="font-semibold text-slate-700">Xojimurodov Jaloliddin</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600 stroke-white" />
            </div>
          </div>
        </footer>

      </div>
    </DataProvider>
  );
}

// Asosiy App komponenti
export default function App() {
  // GitHub Pages'da bo'lsa '/school-website', kompyuterda bo'lsa '' bo'ladi
  const basename = window.location.hostname.includes('github.io') ? '/school-website' : '';

  return (
    <BrowserRouter basename={basename}>
      <AppContent />
    </BrowserRouter>
  );
}