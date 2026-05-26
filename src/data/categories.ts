/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'uzi',
    name: 'Ультразвуковая диагностика',
    tagline: 'Экспертные и портативные УЗИ-аппараты ведущих мировых производителей',
    icon: 'Activity',
    // УЗИ-исследование, врач у экрана сканера
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 42,
    popularityOrder: 1,
    subcategories: [
      { id: 'uzi_stationary', name: 'Стационарные УЗИ-сканеры', productCount: 24 },
      { id: 'uzi_portable', name: 'Портативные УЗИ-аппараты', productCount: 12 },
      { id: 'uzi_veterinary', name: 'Ветеринарные УЗИ', productCount: 6 }
    ]
  },
  {
    id: 'flex_endoscopy',
    name: 'Гибкая эндоскопия',
    tagline: 'Видеогастроскопы, видеоколоноскопы и эндоскопические видеосистемы HD уровня',
    icon: 'Eye',
    // Эндоскопическая стойка / видеосистема в операционной
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 28,
    popularityOrder: 2,
    subcategories: [
      { id: 'fgds', name: 'Видеогастроскопы', productCount: 12 },
      { id: 'fks', name: 'Видеоколоноскопы', productCount: 8 },
      { id: 'endo_procs', name: 'Эндоскопические процессоры', productCount: 8 }
    ]
  },
  {
    id: 'rad_diag',
    name: 'Лучевая диагностика',
    tagline: 'МРТ, КТ сканеры, цифровые рентген-аппараты и компьютерные томографы',
    icon: 'Radio',
    // МРТ-томограф крупным планом
    image: 'https://images.unsplash.com/photo-1516069677018-378515003435?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 15,
    popularityOrder: 3,
    subcategories: [
      { id: 'mrt', name: 'Магнитно-резонансные томографы (МРТ)', productCount: 5 },
      { id: 'kt', name: 'Компьютерные томографы (КТ)', productCount: 6 },
      { id: 'xray', name: 'Рентгеновские установки', productCount: 4 }
    ]
  },
  {
    id: 'reanimation',
    name: 'Анестезиология и реанимация',
    tagline: 'Аппараты ИВЛ, наркозно-дыхательные аппараты, мониторы пациента и дефибрилляторы',
    icon: 'HeartPulse',
    // Палата интенсивной терапии с аппаратурой
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 35,
    popularityOrder: 4,
    subcategories: [
      { id: 'ivl', name: 'Аппараты ИВЛ', productCount: 15 },
      { id: 'nda', name: 'Наркозно-дыхательные аппараты', productCount: 10 },
      { id: 'patient_monitors', name: 'Мониторы пациента', productCount: 10 }
    ]
  },
  {
    id: 'gynecology',
    name: 'Акушерство и гинекология',
    tagline: 'Гинекологические кресла, фетальные мониторы, кольпоскопы',
    icon: 'Layers',
    // Беременная пациентка на УЗИ
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 19,
    popularityOrder: 5,
    subcategories: [
      { id: 'gyn_chairs', name: 'Гинекологические кресла', productCount: 8 },
      { id: 'fetal_monitors', name: 'Фетальные мониторы', productCount: 11 }
    ]
  },
  {
    id: 'rigid_endoscopy',
    name: 'Жесткая эндоскопия',
    tagline: 'Лапароскопы, артроскопы, гистероскопы и стойки в сборе',
    icon: 'Component',
    // Малоинвазивная хирургия / лапароскопия в операционной
    image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 22,
    popularityOrder: 6,
    subcategories: [
      { id: 'laparoscopy', name: 'Оборудование для лапароскопии', productCount: 14 },
      { id: 'hysteroscopy', name: 'Оборудование для гистероскопии', productCount: 8 }
    ]
  },
  {
    id: 'cosmetology',
    name: 'Косметология',
    tagline: 'Лазеры для эпиляции, аппараты для РФ-лифтинга и коррекции фигуры',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 14,
    popularityOrder: 7,
    subcategories: [
      { id: 'lasers', name: 'Косметологические лазеры', productCount: 8 },
      { id: 'rf_lifting', name: 'РФ лифтинг и SMAS лифтинг', productCount: 6 }
    ]
  },
  {
    id: 'sterilization',
    name: 'Стерилизация и дезинфекция',
    tagline: 'Медицинские автоклавы, плазменные стерилизаторы и моечно-дезинфицирующие машины',
    icon: 'Shield',
    // Автоклав / лабораторное стерильное оборудование
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 18,
    popularityOrder: 8,
    subcategories: [
      { id: 'autoclaves', name: 'Автоклавы медицинские', productCount: 12 },
      { id: 'washer_disinfector', name: 'Моечные машины', productCount: 6 }
    ]
  },
  {
    id: 'ophthalmology',
    name: 'Офтальмология',
    tagline: 'Авторефрактометры, щелевые лампы, оптические когерентные томографы',
    icon: 'EyeOff',
    // Осмотр глаза за щелевой лампой
    image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 16,
    popularityOrder: 9,
    subcategories: [
      { id: 'autorefractometers', name: 'Авторефкератометры', productCount: 8 },
      { id: 'slit_lamps', name: 'Щелевые лампы', productCount: 8 }
    ]
  },
  {
    id: 'laboratory',
    name: 'Лаборатория',
    tagline: 'Гематологические и биохимические анализаторы, медицинские центрифуги',
    icon: 'FlaskConical',
    // Микроскоп, лаборант за работой
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 25,
    popularityOrder: 10,
    subcategories: [
      { id: 'biochemical_analyzers', name: 'Биохимические анализаторы', productCount: 11 },
      { id: 'centrifuges', name: 'Лабораторные центрифуги', productCount: 14 }
    ]
  },
  {
    id: 'urology',
    name: 'Урология',
    tagline: 'Урологические комплексы, литотрипторы, уродинамические системы',
    icon: 'Briefcase',
    // Современный медицинский кабинет
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 11,
    popularityOrder: 11,
    subcategories: [
      { id: 'lithotripters', name: 'Контактные литотрипторы', productCount: 5 },
      { id: 'urodynamics', name: 'Уродинамические системы', productCount: 6 }
    ]
  },
  {
    id: 'surgery',
    name: 'Хирургия',
    tagline: 'Операционные столы, хирургические светильники, коагуляторы',
    icon: 'Bed',
    // Операционная: стол и светильник
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 29,
    popularityOrder: 12,
    subcategories: [
      { id: 'op_tables', name: 'Операционные столы', productCount: 12 },
      { id: 'electro_surgery', name: 'Электрохирургические аппараты (ЭХВЧ)', productCount: 17 }
    ]
  }
];
