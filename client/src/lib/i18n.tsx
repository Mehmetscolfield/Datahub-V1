import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'kz' | 'ru';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    "nav.universities": "Universities",
    "nav.programs": "Programs",
    "nav.about": "About",
    "nav.login": "Login",
    "hero.local.title": "For Local Students",
    "hero.local.subtitle": "UNT requirements, programs, scholarships & more.",
    "hero.local.btn": "Explore Universities",
    "hero.intl.title": "For International Students",
    "hero.intl.subtitle": "English programs, tuition, application steps.",
    "hero.intl.btn": "Start Exploring",
    "search.placeholder": "Search by name...",
    "filters.region": "Region",
    "filters.city": "City",
    "filters.tuition": "Tuition Range",
    "filters.programs": "Programs",
    "filters.reset": "Reset Filters",
    "card.details": "View Details",
    "compare.title": "Compare Universities",
    "compare.empty": "No universities selected for comparison.",
  },
  kz: {
    "nav.universities": "Университеттер",
    "nav.programs": "Бағдарламалар",
    "nav.about": "Біз туралы",
    "nav.login": "Кіру",
    "hero.local.title": "Жергілікті студенттерге",
    "hero.local.subtitle": "ҰБТ талаптары, бағдарламалар, гранттар және т.б.",
    "hero.local.btn": "Университеттерді қарау",
    "hero.intl.title": "Шетелдік студенттерге",
    "hero.intl.subtitle": "Ағылшын бағдарламалары, оқу ақысы, қабылдау кезеңдері.",
    "hero.intl.btn": "Бастау",
    "search.placeholder": "Аты бойынша іздеу...",
    "filters.region": "Аймақ",
    "filters.city": "Қала",
    "filters.tuition": "Оқу ақысы",
    "filters.programs": "Бағдарламалар",
    "filters.reset": "Фильтрді тазалау",
    "card.details": "Толығырақ",
    "compare.title": "Салыстыру",
    "compare.empty": "Салыстыру үшін университеттер таңдалмады.",
  },
  ru: {
    "nav.universities": "Университеты",
    "nav.programs": "Программы",
    "nav.about": "О нас",
    "nav.login": "Войти",
    "hero.local.title": "Для местных студентов",
    "hero.local.subtitle": "Требования ЕНТ, программы, гранты и другое.",
    "hero.local.btn": "Смотреть университеты",
    "hero.intl.title": "Для иностранных студентов",
    "hero.intl.subtitle": "Программы на английском, стоимость, этапы поступления.",
    "hero.intl.btn": "Начать",
    "search.placeholder": "Поиск по названию...",
    "filters.region": "Регион",
    "filters.city": "Город",
    "filters.tuition": "Стоимость обучения",
    "filters.programs": "Программы",
    "filters.reset": "Сбросить",
    "card.details": "Подробнее",
    "compare.title": "Сравнение",
    "compare.empty": "Нет университетов для сравнения.",
  }
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
