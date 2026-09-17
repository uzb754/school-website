// src/context/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  // Qorong'u rejim uchun state (localStorage'da saqlanadi)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('269_darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('269_darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // 1. Yangiliklar
  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('269_newsList');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Yutuqlar
  const [winnersList, setWinnersList] = useState(() => {
    const saved = localStorage.getItem('269_winnersList');
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Tadbirlar
  const [eventsList, setEventsList] = useState(() => {
    const saved = localStorage.getItem('269_eventsList');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. FAQ
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('269_faqs');
    return saved ? JSON.parse(saved) : [
      { id: 1, q: "Maktabga qabul jarayoni qanday amalga oshiriladi?", a: "Qabul jarayoni my.maktab.uz portali orqali onlayn shaklda amalga oshiriladi." },
      { id: 2, q: "Darslar soat nechada boshlanadi?", a: "Birinchi smena darslari 08:00 da, ikkinchi smena darslari 13:00 da boshlanadi." }
    ];
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const [sliderMode, setSliderMode] = useState(() => {
    return localStorage.getItem('269_sliderMode') || 'auto';
  });

  useEffect(() => {
    localStorage.setItem('269_newsList', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('269_winnersList', JSON.stringify(winnersList));
  }, [winnersList]);

  useEffect(() => {
    localStorage.setItem('269_eventsList', JSON.stringify(eventsList));
  }, [eventsList]);

  useEffect(() => {
    localStorage.setItem('269_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('269_sliderMode', sliderMode);
  }, [sliderMode]);

  const addFaq = (faq) => {
    setFaqs(prev => [{ ...faq, id: Date.now() }, ...prev]);
  };

  const deleteFaq = (id) => {
    setFaqs(prev => prev.filter(item => item.id !== id));
  };

  // TELEGRAM BOT INTEGRATSIYASI
  const BOT_TOKEN = "7683966754:AAE1eIMceOA4Dax5WGyy1Gp9ghRFFOinDhY";
  const CHAT_ID = "6053383227";

  const sendToTelegram = async (feedbackData) => {
    const text = `📬 *Yangi Xabar (269-Maktab Saytidan)*\n\n` +
                 `👤 *Ism:* ${feedbackData.name}\n` +
                 `🎭 *Kimligi:* ${feedbackData.role}\n` +
                 `💬 *Xabar:* ${feedbackData.text}\n\n` +
                 `📅 *Sana:* ${new Date().toLocaleString('uz-UZ')}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error("Telegram yuborishda xatolik:", error);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{
      darkMode,
      toggleDarkMode,
      newsList,
      setNewsList,
      winnersList,
      setWinnersList,
      eventsList,
      setEventsList,
      faqs,
      addFaq,
      deleteFaq,
      selectedItem,
      setSelectedItem,
      sliderMode,
      setSliderMode,
      sendToTelegram
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);