// src/i18n.ts
export type Lang = 'en' | 'sn' | 'nd';

const LANG_KEY = 'lang';

export const messages: Record<Lang, Record<string, string>> = {
  en: {
    title: 'KAZANA — Journey Optimization',
    subtitle: 'Find a ride or send a package.',
    needRide: 'I need a ride',
    imDriving: "I'm driving",
    sendPackage: 'Send package',
    origin: 'Origin',
    destination: 'Destination',
    seats: 'Seats',
    language: 'Language',
    pickupStart: 'Pickup window start',
    pickupEnd: 'Pickup window end',
    noteText: 'Note: drivers confirm before you’re charged.',
    findRides: 'Find rides',
    myBookings: 'My bookings',
    myPosts: 'My posts',
    navBookSend: 'Book & Send',
    navAdmin: 'Admin',
    demoAs: 'Demo as',
  },
  sn: {
    title: 'KAZANA — Kuronga Rwendo',
    subtitle: 'Tsvaga rori kana tumira pasuru.',
    needRide: 'Ndiri kuda rori',
    imDriving: 'Ndiri kutyaira',
    sendPackage: 'Tumira pasuru',
    origin: 'Pakubva',
    destination: 'Kunosvika',
    seats: 'ZvibSeats',
    language: 'Mutauro',
    pickupStart: 'Nguva yekutora kutanga',
    pickupEnd: 'Nguva yekutora kuguma',
    noteText: 'Cherechedza: mutyairi anosimbisa asati waibhadharwa.',
    findRides: 'Tsvaga rori',
    myBookings: 'Zvandakaronga',
    myPosts: 'Zvandakaisa',
    navBookSend: 'Bhuka & Tumira',
    navAdmin: 'Admin',
    demoAs: 'Ratidza se',
  },
  nd: {
    title: 'KAZANA — Ukuhlelwa Kohambo',
    subtitle: 'Thola imoto noma thumela iphakheji.',
    needRide: 'Ngidinga imoto',
    imDriving: 'Ngiyashayela',
    sendPackage: 'Thumela iphakheji',
    origin: 'Lapho kuqalwa khona',
    destination: 'Lapho kuya khona',
    seats: 'Izihlalo',
    language: 'Ulimi',
    pickupStart: 'Isikhathi sokuqala sokuthatha',
    pickupEnd: 'Isikhathi sokugcina sokuthatha',
    noteText: 'Qaphela: umshayeli uyaqinisekisa ngaphambi kokukhokhiswa.',
    findRides: 'Thola izimoto',
    myBookings: 'Oku-bookiwe kwami',
    myPosts: 'Okuthunyelwe kwami',
    navBookSend: 'Bhuka & Thumela',
    navAdmin: 'Admin',
    demoAs: 'Khombisa njenge',
  },
};

export const getLang = (): Lang => {
  const v = (typeof localStorage !== 'undefined'
    ? localStorage.getItem(LANG_KEY)
    : null) as Lang | null;
  return v === 'sn' || v === 'nd' ? v : 'en';
};

export const setLang = (lang: Lang) => {
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  window.dispatchEvent(new CustomEvent('lang-change', { detail: lang }));
};

export const t = (key: string, lang: Lang = getLang()): string =>
  messages[lang]?.[key] ?? messages.en[key] ?? key;

/** React hook: returns [lang, setLang] and re-renders on change */
import { useEffect, useState } from 'react';
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, set] = useState<Lang>(getLang());
  useEffect(() => {
    const onChange = () => set(getLang());
    window.addEventListener('lang-change', onChange as EventListener);
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === LANG_KEY) onChange();
    });
    return () => {
      window.removeEventListener('lang-change', onChange as EventListener);
      window.removeEventListener('storage', onChange as EventListener);
    };
  }, []);
  return [lang, setLang];
}
