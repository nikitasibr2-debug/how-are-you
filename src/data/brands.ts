/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Brand } from '../types';

// Реальные логотипы брендов через Clearbit Logo API (https://clearbit.com/logo).
// Сервис возвращает прозрачный PNG официального логотипа по корпоративному домену.
export const brands: Brand[] = [
  {
    id: 'mindray',
    name: 'Mindray',
    logo: 'https://logo.clearbit.com/mindray.com',
    country: 'Китай',
    description: 'Один из лидирующих мировых производителей медицинского оборудования. Известен высококлассными УЗИ-аппаратами, мониторами пациента и наркозно-дыхательными установками с лучшим соотношением цены и качества.',
    categoryIds: ['uzi', 'reanimation', 'gynecology']
  },
  {
    id: 'ge_healthcare',
    name: 'GE Healthcare',
    logo: 'https://logo.clearbit.com/gehealthcare.com',
    country: 'США',
    description: 'Признанный мировой лидер в области высокотехнологичного лучевого диагностического оборудования (МРТ, КТ, Маммографы) и премиальных УЗИ премиум-класса серии Voluson и Logiq.',
    categoryIds: ['uzi', 'rad_diag', 'gynecology']
  },
  {
    id: 'philips',
    name: 'Philips Healthcare',
    logo: 'https://logo.clearbit.com/philips.com',
    country: 'Нидерланды',
    description: 'Инновационные решения для кардиологии, ультразвуковой диагностики премиум-класса (серии Affinity и Epiq) и систем мониторинга важных показателей жизнедеятельности.',
    categoryIds: ['uzi', 'reanimation', 'funct_diag']
  },
  {
    id: 'olympus',
    name: 'Olympus',
    logo: 'https://logo.clearbit.com/olympus-global.com',
    country: 'Япония',
    description: 'Признанный золотой стандарт в сфере гибкой эндоскопии. Эндоскопы серий EVIS EXERA III и EVIS EXERA II используются в лучших диагностических центрах для ФГДС, колоноскопии и бронхоскопии.',
    categoryIds: ['flex_endoscopy', 'surgery']
  },
  {
    id: 'pentax',
    name: 'Pentax Medical',
    logo: 'https://logo.clearbit.com/pentaxmedical.com',
    country: 'Япония',
    description: 'Крупный японский производитель эндоскопического оборудования высокого разрешения, предлагающий надежную оптику, превосходные механические свойства и эргономичные рукоятки.',
    categoryIds: ['flex_endoscopy']
  },
  {
    id: 'karl_storz',
    name: 'Karl Storz',
    logo: 'https://logo.clearbit.com/karlstorz.com',
    country: 'Германия',
    description: 'Мировой флагман в сфере жесткой эндоскопии, лапароскопии и инструментария для малоинвазивной хирургии, урологии и гинекологии.',
    categoryIds: ['rigid_endoscopy', 'surgery', 'urology']
  },
  {
    id: 'samsung_medison',
    name: 'Samsung Medison',
    logo: 'https://logo.clearbit.com/samsunghealthcare.com',
    country: 'Южная Корея',
    description: 'Премиальные ультразвуковые сканеры экспертного уровня, особенно востребованные в акушерстве, гинекологии за счет передовых 3D/4D технологий визуализации плода (серия WS80, H60).',
    categoryIds: ['uzi', 'gynecology']
  },
  {
    id: 'chison',
    name: 'CHISON',
    logo: 'https://logo.clearbit.com/chison.com',
    country: 'Китай',
    description: 'Высокоэффективные портативные УЗИ-аппараты и доступные стационарные системы для универсальных исследований.',
    categoryIds: ['uzi']
  },
  {
    id: 'alma_lasers',
    name: 'Classys',
    logo: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'Южная Корея',
    description: 'Мировой лидер в производстве высокотехнологичных аппаратов для эстетической медицины и косметологии, создатель знаменитых технологий Ultraformer, Clatuu и Aquapure II.',
    categoryIds: ['cosmetology']
  },
  {
    id: 'eunsung',
    name: 'EunSung Global',
    logo: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'Южная Корея',
    description: 'Ведущий южнокорейский производитель экспертного оборудования для эстетической медицины и косметологии. Получил мировое признание благодаря инновационным RF-платформам, лазерным системам и приборам для коррекции фигуры.',
    categoryIds: ['cosmetology']
  }
];
