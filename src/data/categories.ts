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
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1581594541451-330a9f139366?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&h=250&q=80',
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
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=400&h=250&q=80',
    productCount: 29,
    popularityOrder: 12,
    subcategories: [
      { id: 'op_tables', name: 'Операционные столы', productCount: 12 },
      { id: 'electro_surgery', name: 'Электрохирургические аппараты (ЭХВЧ)', productCount: 17 }
    ]
  }
];
