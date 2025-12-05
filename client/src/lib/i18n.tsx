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
    "details.about": "About the University",
    "details.facts": "Quick Facts",
    "details.location": "Location",
    "details.founded": "Founded",
    "details.tuition": "Tuition Range",
    "details.programs_count": "Programs",
    "details.tour": "Virtual Tour",
    "details.programs": "Academic Programs",
    "details.admission": "Admission & Enrollment",
    "details.partners": "International Partners",
    "details.save": "Save",
    "details.saved": "Saved",
    "details.compare": "Compare University",
    "details.remove_compare": "Remove from Compare",
    "details.official_site": "Official Website",
    "program.program": "Program",
    "program.faculty": "Faculty",
    "program.duration": "Duration",
    "program.language": "Language",
    "program.tuition": "Tuition/Year",
    "adm.steps": "Steps to Apply",
    "adm.deadlines": "Deadlines & Requirements",
    "adm.intl_app": "International Application",
    "adm.local": "Local Students",
    "adm.intl": "International Students",
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
    "details.about": "Университет туралы",
    "details.facts": "Қысқаша мәлімет",
    "details.location": "Орналасқан жері",
    "details.founded": "Құрылған жылы",
    "details.tuition": "Оқу ақысы",
    "details.programs_count": "Бағдарламалар саны",
    "details.tour": "Виртуалды тур",
    "details.programs": "Академиялық бағдарламалар",
    "details.admission": "Қабылдау және тіркелу",
    "details.partners": "Халықаралық серіктестер",
    "details.save": "Сақтау",
    "details.saved": "Сақталды",
    "details.compare": "Салыстыру",
    "details.remove_compare": "Салыстырудан алып тастау",
    "details.official_site": "Ресми сайт",
    "program.program": "Бағдарлама",
    "program.faculty": "Факультет",
    "program.duration": "Ұзақтығы",
    "program.language": "Тілі",
    "program.tuition": "Жылдық оқу ақысы",
    "adm.steps": "Қабылдау қадамдары",
    "adm.deadlines": "Мерзімдер мен талаптар",
    "adm.intl_app": "Халықаралық өтінім",
    "adm.local": "Жергілікті студенттер",
    "adm.intl": "Шетелдік студенттер",
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
    "details.about": "Об университете",
    "details.facts": "Краткие факты",
    "details.location": "Расположение",
    "details.founded": "Основан",
    "details.tuition": "Стоимость обучения",
    "details.programs_count": "Программы",
    "details.tour": "Виртуальный тур",
    "details.programs": "Академические программы",
    "details.admission": "Поступление и зачисление",
    "details.partners": "Международные партнеры",
    "details.save": "Сохранить",
    "details.saved": "Сохранено",
    "details.compare": "Сравнить",
    "details.remove_compare": "Убрать из сравнения",
    "details.official_site": "Официальный сайт",
    "program.program": "Программа",
    "program.faculty": "Факультет",
    "program.duration": "Длительность",
    "program.language": "Язык",
    "program.tuition": "Стоимость/год",
    "adm.steps": "Этапы поступления",
    "adm.deadlines": "Сроки и требования",
    "adm.intl_app": "Международная заявка",
    "adm.local": "Местные студенты",
    "adm.intl": "Иностранные студенты",
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
