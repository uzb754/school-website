// src/pages/Faq.jsx yoki Bosh sahifadagi FAQ bo'limi
import React from 'react';
import { useData } from '../context/DataContext';

export default function FaqPage() {
  const { faqs } = useData();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Ko'p beriladigan savollar</h1>
      {faqs.map(faq => (
        <div key={faq.id} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
          <h3 className="font-bold text-slate-800 text-lg">❓ {faq.q}</h3>
          <p className="text-slate-600 text-sm pl-6 border-l-2 border-indigo-500">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}