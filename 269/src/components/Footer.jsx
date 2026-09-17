import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                269
              </div>
              <span className="font-bold text-lg text-gray-900">269-Maktab</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Maktabimiz uzoq yillik boy tarixga va an'analarga ega ta'lim dargohidir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Tezkor Havolalar</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/news" className="hover:text-blue-600">Yangiliklar</Link></li>
              <li><Link to="/winners" className="hover:text-blue-600">Yutuqlarimiz</Link></li>
              <li><Link to="/about" className="hover:text-blue-600">Biz Haqimizda</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Bog'lanish</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Toshkent shahri, Sergeli tumani, 269-maktab</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>+99871 200-02-69</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>info@school269.uz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2026 269-Maktab. Barcha huquqlar himoyalangan.</p>
          <p>Created by <span className="text-gray-600 font-medium">Dilshod Sayfiddinov</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;