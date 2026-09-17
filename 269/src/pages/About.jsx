import React from 'react';
import { MapPin, Phone, Mail, Clock, Users, Award, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
      <div className="text-center">
        <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
          Markaziy Osiyodagi Eng Yaxshi Maktablardani Biri
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">BIZ HAQIMIZDA</h1>
        <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">
          269-Maktab — Kelajak yetakchilarini tayyorlaydigan maskan. Bizning maqsadimiz — sifatli ta'lim va yuksak tarbiya.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-3xl font-extrabold text-gray-900">1200+</span>
            <span className="text-xs font-semibold text-gray-400 uppercase mt-1">O'quvchilar</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <GraduationCap className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-3xl font-extrabold text-gray-900">85+</span>
            <span className="text-xs font-semibold text-gray-400 uppercase mt-1">Ustozlar</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <Award className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-3xl font-extrabold text-gray-900">45+</span>
            <span className="text-xs font-semibold text-gray-400 uppercase mt-1">Yutuqlarimiz</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">Bizning Maqsadimiz</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2 leading-tight">
            Sifatli ta'lim <br /> va yuksak tarbiya
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mt-4">
            269-maktabimiz uzoq yillik boy tarixga va an'analarga ega zamonaviy ta'lim dargohidir.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mt-3">
            Bizning jamoamiz har bir o'quvchining individual rivojlanishiga katta e'tibor qaratadi. Biz nafaqat bilim beramiz, balki mustaqil hayotga tayyor, vatanparvar va barkamol shaxslarni tarbiyalaymiz.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
            alt="Maktab muhiti"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg">
            <span className="text-2xl font-extrabold text-blue-600">35+</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Yillik Tajriba</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">ALOQA MA'LUMOTLARI</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-3" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">MANZIL</span>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              Toshkent shahri, Sergeli tumani, 269-maktab
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <Phone className="w-6 h-6 text-blue-600 mx-auto mb-3" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">TELEFON</span>
            <p className="text-xs text-gray-700 font-medium">+99871 200-02-69</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <Mail className="w-6 h-6 text-blue-600 mx-auto mb-3" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">EMAIL</span>
            <p className="text-xs text-gray-700 font-medium">info@school269.uz</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-3" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">ISH VAQTI</span>
            <p className="text-xs text-gray-700 font-medium">08:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;