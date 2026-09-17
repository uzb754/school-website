import { db } from '../src/firebase.js';
import { doc, setDoc } from 'firebase/firestore';

// Excel'dagi 6-B sinf jadvali ma'lumotlari (namuna)
const schedule6B = {
  days: {
    dushanba: ["O'zbek tili", "Matematika", "Tarix", "Ingliz tili", "Biologiya"],
    seshanba: ["Adabiyot", "Informatika", "Geografiya", "Tasviriiy san'at", "Jismoniy tarbiya"],
    chorshanba: ["Matematika", "O'zbek tili", "Fizika", "Tarix", "Musiqa"],
    paysonba: ["Ingliz tili", "Matematika", "O'zbek tili", "Texnologiya", "Tarbiya"],
    juma: ["Biologiya", "Geografiya", "Matematika", "Adabiyot", "Jismoniy tarbiya"],
    shanba: ["Sinf soati", "Tarix", "O'zbek tili", "Matematika"]
  }
};

async function upload() {
  try {
    await setDoc(doc(db, 'schedules', '6-B'), schedule6B);
    console.log("6-B sinf jadvali Firebase'ga saqlandi!");
  } catch (err) {
    console.error("Xatolik:", err);
  }
}

upload();