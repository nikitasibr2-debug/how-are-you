/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Brand } from '../types';

export const brands: Brand[] = [
  {
    id: 'mindray',
    name: 'Mindray',
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=120&h=60&q=80', // placeholder or clean text UI
    country: 'Китай',
    description: 'Один из лидирующих мировых производителей медицинского оборудования. Известен высококлассными УЗИ-аппаратами, мониторами пациента и наркозно-дыхательными установками с лучшим соотношением цены и качества.',
    categoryIds: ['uzi', 'reanimation', 'gynecology']
  },
  {
    id: 'ge_healthcare',
    name: 'GE Healthcare',
    logo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'США',
    description: 'Признанный мировой лидер в области высокотехнологичного лучевого диагностического оборудования (МРТ, КТ, Маммографы) и премиальных УЗИ премиум-класса серии Voluson и Logiq.',
    categoryIds: ['uzi', 'rad_diag', 'gynecology']
  },
  {
    id: 'philips',
    name: 'Philips Healthcare',
    logo: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'Нидерланды',
    description: 'Инновационные решения для кардиологии, ультразвуковой диагностики премиум-класса (серии Affinity и Epiq) и систем мониторинга важных показателей жизнедеятельности.',
    categoryIds: ['uzi', 'reanimation', 'funct_diag']
  },
  {
    id: 'olympus',
    name: 'Olympus',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'Япония',
    description: 'Признанный золотой стандарт в сфере гибкой эндоскопии. Эндоскопы серий EVIS EXERA III и EVIS EXERA II используются в лучших диагностических центрах для ФГДС, колоноскопии и бронхоскопии.',
    categoryIds: ['flex_endoscopy', 'surgery']
  },
  {
    id: 'pentax',
    name: 'Pentax Medical',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'Япония',
    description: 'Крупный японский производитель эндоскопического оборудования высокого разрешения, предлагающий надежную оптику, превосходные механические свойства и эргономичные рукоятки.',
    categoryIds: ['flex_endoscopy']
  },
  {
    id: 'karl_storz',
    name: 'Karl Storz',
    logo: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'Германия',
    description: 'Мировой флагман в сфере жесткой эндоскопии, лапароскопии и инструментария для малоинвазивной хирургии, урологии и гинекологии.',
    categoryIds: ['rigid_endoscopy', 'surgery', 'urology']
  },
  {
    id: 'samsung_medison',
    name: 'Samsung Medison',
    logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=120&h=60&q=80',
    country: 'Южная Корея',
    description: 'Премиальные ультразвуковые сканеры экспертного уровня, особенно востребованные в акушерстве, гинекологии за счет передовых 3D/4D технологий визуализации плода (серия WS80, H60).',
    categoryIds: ['uzi', 'gynecology']
  },
  {
    id: 'chison',
    name: 'CHISON',
    logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=120&h=60&q=80',
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
