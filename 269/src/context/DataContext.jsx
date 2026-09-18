// src/context/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

// Firebase Sozlamalari
const firebaseConfig = {
  apiKey: "AIzaSyBERIFLd9yMyJHU3mDl5UGC2hr5hMjDXig",
  authDomain: "maktab-269.firebaseapp.com",
  databaseURL: "https://maktab-269-default-rtdb.firebaseio.com",
  projectId: "maktab-269",
  storageBucket: "maktab-269.firebasestorage.app",
  messagingSenderId: "246317372987",
  appId: "1:246317372987:web:993d778f63f9696ee66e1e",
  measurementId: "G-FLK01YK4LF"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const DataContext = createContext();

export function DataProvider({ children }) {
  // Qorong'u rejim (LocalStorage da qolaverishi mumkin)
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

  // States for Firebase Data
  const [newsList, setNewsListState] = useState([]);
  const [winnersList, setWinnersListState] = useState([]);
  const [eventsList, setEventsListState] = useState([]);
  const [faqs, setFaqsState] = useState([]);
  const [sliderMode, setSliderModeState] = useState('auto');
  const [selectedItem, setSelectedItem] = useState(null);

  // Firebase'dan ma'lumotlarni real vaqt rejimida o'qib turish (Realtime sync)
  useEffect(() => {
    // News
    const newsRef = ref(db, 'newsList');
    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      setNewsListState(data ? Object.values(data) : []);
    });

    // Winners
    const winnersRef = ref(db, 'winnersList');
    onValue(winnersRef, (snapshot) => {
      const data = snapshot.val();
      setWinnersListState(data ? Object.values(data) : []);
    });

    // Events
    const eventsRef = ref(db, 'eventsList');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      setEventsListState(data ? Object.values(data) : []);
    });

    // FAQs
    const faqsRef = ref(db, 'faqs');
    onValue(faqsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFaqsState(Object.values(data));
      } else {
        // Agar baza bo'sh bo'lsa boshlang'ich ma'lumot yozish
        const initialFaqs = [
          { id: 1, q: "Maktabga qabul jarayoni qanday amalga oshiriladi?", a: "Qabul jarayoni my.maktab.uz portali orqali onlayn shaklda amalga oshiriladi." },
          { id: 2, q: "Darslar soat nechada boshlanadi?", a: "Birinchi smena darslari 08:00 da, ikkinchi smena darslari 13:00 da boshlanadi." }
        ];
        initialFaqs.forEach(faq => {
          set(ref(db, `faqs/${faq.id}`), faq);
        });
      }
    });

    // Slider Mode
    const sliderRef = ref(db, 'sliderMode');
    onValue(sliderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setSliderModeState(data);
    });
  }, []);

  // Ma'lumotlarni Firebase'ga yozish/yangilash funksiyalari
  const setNewsList = async (newList) => {
    // Agar massiv bo'lsa yoki funksiya kelsa
    const list = typeof newList === 'function' ? newList(newsList) : newList;
    await set(ref(db, 'newsList'), list);
  };

  const setWinnersList = async (newList) => {
    const list = typeof newList === 'function' ? newList(winnersList) : newList;
    await set(ref(db, 'winnersList'), list);
  };

  const setEventsList = async (newList) => {
    const list = typeof newList === 'function' ? newList(eventsList) : newList;
    await set(ref(db, 'eventsList'), list);
  };

  const addFaq = async (faq) => {
    const id = Date.now();
    const newFaqItem = { ...faq, id };
    await set(ref(db, `faqs/${id}`), newFaqItem);
  };

  const deleteFaq = async (id) => {
    await remove(ref(db, `faqs/${id}`));
  };

  const setSliderMode = async (mode) => {
    await set(ref(db, 'sliderMode'), mode);
    setSliderModeState(mode);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: 'Markdown' }),
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