/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Brand } from '../types';

export const brands: Brand[] = [
  {
    id: 'mindray',
    name: 'Mindray',
    logo: '/src/assets/mindray_logo.png', // placeholder or clean text UI
    country: 'Китай',
    description: 'Один из лидирующих мировых производителей медицинского оборудования. Известен высококлассными УЗИ-аппаратами, мониторами пациента и наркозно-дыхательными установками с лучшим соотношением цены и качества.',
    categoryIds: ['uzi', 'reanimation', 'gynecology']
  },
  {
    id: 'ge_healthcare',
    name: 'GE Healthcare',
    logo: '/src/assets/ge_logo.jpg',
    country: 'США',
    description: 'Признанный мировой лидер в области высокотехнологичного лучевого диагностического оборудования (МРТ, КТ, Маммографы) и премиальных УЗИ премиум-класса серии Voluson и Logiq.',
    categoryIds: ['uzi', 'rad_diag', 'gynecology']
  },
  {
    id: 'philips',
    name: 'Philips Healthcare',
    logo: '/src/assets/philips_logo.jpg',
    country: 'Нидерланды',
    description: 'Инновационные решения для кардиологии, ультразвуковой диагностики премиум-класса (серии Affinity и Epiq) и систем мониторинга важных показателей жизнедеятельности.',
    categoryIds: ['uzi', 'reanimation', 'funct_diag']
  },
  {
    id: 'olympus',
    name: 'Olympus',
    logo: '/src/assets/olympus_logo.jpg',
    country: 'Япония',
    description: 'Признанный золотой стандарт в сфере гибкой эндоскопии. Эндоскопы серий EVIS EXERA III и EVIS EXERA II используются в лучших диагностических центрах для ФГДС, колоноскопии и бронхоскопии.',
    categoryIds: ['flex_endoscopy', 'surgery']
  },
  {
    id: 'pentax',
    name: 'Pentax Medical',
    logo: '/src/assets/pentax_logo.jpg',
    country: 'Япония',
    description: 'Крупный японский производитель эндоскопического оборудования высокого разрешения, предлагающий надежную оптику, превосходные механические свойства и эргономичные рукоятки.',
    categoryIds: ['flex_endoscopy']
  },
  {
    id: 'karl_storz',
    name: 'Karl Storz',
    logo: '/src/assets/storz_logo.jpg',
    country: 'Германия',
    description: 'Мировой флагман в сфере жесткой эндоскопии, лапароскопии и инструментария для малоинвазивной хирургии, урологии и гинекологии.',
    categoryIds: ['rigid_endoscopy', 'surgery', 'urology']
  },
  {
    id: 'samsung_medison',
    name: 'Samsung Medison',
    logo: '/src/assets/samsung_logo.png',
    country: 'Южная Корея',
    description: 'Премиальные ультразвуковые сканеры экспертного уровня, особенно востребованные в акушерстве, гинекологии за счет передовых 3D/4D технологий визуализации плода (серия WS80, H60).',
    categoryIds: ['uzi', 'gynecology']
  },
  {
    id: 'chison',
    name: 'CHISON',
    logo: '/src/assets/chison_logo.jpg',
    country: 'Китай',
    description: 'Высокоэффективные портативные УЗИ-аппараты и доступные стационарные системы для универсальных исследований.',
    categoryIds: ['uzi']
  },
  {
    id: 'alma_lasers',
    name: 'Classys',
    logo: '/src/assets/classys_logo.jpg',
    country: 'Южная Корея',
    description: 'Мировой лидер в производстве высокотехнологичных аппаратов для эстетической медицины и косметологии, создатель знаменитых технологий Ultraformer, Clatuu и Aquapure II.',
    categoryIds: ['cosmetology']
  },
  {
    id: 'eunsung',
    name: 'EunSung Global',
    logo: '/src/assets/eunsung_logo.jpg',
    country: 'Южная Корея',
    description: 'Ведущий южнокорейский производитель экспертного оборудования для эстетической медицины и косметологии. Получил мировое признание благодаря инновационным RF-платформам, лазерным системам и приборам для коррекции фигуры.',
    categoryIds: ['cosmetology']
  }
];
