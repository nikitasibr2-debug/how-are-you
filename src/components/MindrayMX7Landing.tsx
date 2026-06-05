import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ArrowRightLeft, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Info,
  Check,
  Zap,
  Sliders,
  User,
  Phone,
  ArrowRight,
  FileCheck,
  MessageSquare,
  HelpCircle,
  HeartPulse,
  Baby,
  Building,
  Wrench,
  TrendingUp,
  GraduationCap,
  Eye,
  Layers,
  Activity,
  Sparkle,
  Volume2,
  Battery,
  ShieldAlert,
  FolderSync,
  Compass,
  ZapOff,
  Stethoscope
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';
import { AstmedTeamBlock } from './AstmedTeamBlock';

interface MindrayMX7LandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export function MindrayMX7Landing({
  product,
  articles,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}: MindrayMX7LandingProps) {
  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Active tab state for interactive showcase
  const [showcaseTab, setShowcaseTab] = useState<'laptop' | 'process' | 'cardio'>('laptop');
  
  // Interactive 7 Reasons Accordion
  const [activeReason, setActiveReason] = useState<number>(0);

  // Form states
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sendingMsg, setSendingMsg] = useState(false);

  // Main locations we work
  const locations = [
    {
      title: "Между отделениями",
      desc: "Широкоугольный экран и весовые показатели делают частые транспортировки беспрепятственными.",
      icon: Compass
    },
    {
      title: "Скорая / выезд",
      desc: "Сертифицирован для мобильных амбулаторий и экстремальных выездов. Готовность за секунды.",
      icon: Activity
    },
    {
      title: "Процедурный кабинет",
      desc: "Быстрые инвазивные вмешательства с непревзойденной визуализацией иглы iNeedle.",
      icon: Stethoscope
    },
    {
      title: "Операционная (стерильно)",
      desc: "Управляйте прибором не прикасаясь к клавиатуре через ИИ-распознавание голоса iVocal.",
      icon: Volume2
    },
    {
      title: "Нагрузочное тестирование",
      desc: "Полная поддержка Stress Echo и прецизионного отслеживания границ миокарда на ходу.",
      icon: TrendingUp
    },
    {
      title: "У постели пациента (ICU)",
      desc: "Малогабаритный ноутбучный формат позволяет разместить прибор на микро-столиках в палатах реанимации.",
      icon: Building
    }
  ];

  // 7 Reasons to choose MX7
  const reasons = [
    {
      pain: "«Портативный — значит хуже стационарного по качеству?»",
      objection: "ZST+ Виртуальный бимформер экспертного класса",
      solution: "Больше никаких компромиссов между размером и мощностью. Напольное ядро ZST+ обрабатывает отраженный сигнал в 10 раз быстрее традиционных приборов. HD Scope выделяет тонкие границы тканей, Echo Boost раскрывает миокард, а HR Flow строит сосудистые петли. Вы получаете четкость стационарной консоли весом всего в 3.5 кг.",
      icon: Sparkles
    },
    {
      pain: "«3.5 кг это много таскать целый день?»",
      objection: "Эргономика сверхлегкого магниевого сплава",
      solution: "Корпус толщиной всего 44 мм помещается в любой рюкзак со сканерами. Магниевый сплав шасси используется в авиации — он защищает плату от падений и дает максимальную терморегуляцию без весового шума. В комплекте идет опция Dual Probe Extender: подключение 2 датчиков без громоздкой тележки.",
      icon: Sliders
    },
    {
      pain: "«8 часов работы — это реально или просто маркетинг?»",
      objection: "U-Bank: Энергетическая независимость на всю смену",
      solution: "Уникальный внешний док U-Bank позволяет объединить 2 или 4 аккумулятора одновременно. Аппарат рассчитывает потребляемую мощность и выдает чистые 8 часов активной сонографии. Световая индикация уровня заряда расположена снаружи и видна даже когда крышка ноутбука закрыта.",
      icon: Battery
    },
    {
      pain: "«В операционной нельзя трогать аппарат руками — как быть?»",
      objection: "iVocal: Полное бесконтактное управление голосом с ИИ",
      solution: "Проговаривайте команды: «заморозить», «усилить», «переключить режим допплера». ИИ мгновенно обрабатывает русскую речь в перчатках или на расстоянии до 3 метров от врача. Для максимальной стерильности на датчике L12-3RCs выведены 3 физические программируемые кнопки.",
      icon: Volume2
    },
    {
      pain: "«Для кардиологии хватит возможностей?»",
      objection: "Профессиональный кардиопакет в портативном исполнении",
      solution: "MX7 открывает доступ к Stress Echo, тканевому допплеру TDI, автоматическому подсчету фракции выброса AutoEF и модулю синхронизации с ЭКГ. Полноценная оценка ЛЖ в полевых условиях у постели сложнейшего пациента с аритмией или ОИМ.",
      icon: HeartPulse
    },
    {
      pain: "«Как передавать данные в ЭМК и PACS-архив?»",
      objection: "eGateway: бесшовная интеграция в единый контур клиники",
      solution: "Аппарат поддерживает DICOM-протокол, гигабитный Ethernet порт и внутренний беспроводной модуль Wi-Fi. Лицензия eGateway мгновенно оцифровывает карточку обследования, пересылая PDF и исходную видеопетлю в клинику ещё до того, как пациент выйдет из кабинета.",
      icon: FolderSync
    },
    {
      pain: "«Не сломается ли он при постоянных перевозках и вызовах?»",
      objection: "Надежность авиационного сплава и 5 лет честной гарантии",
      solution: "Закаленное магниевое шасси защищает аппарат от случайных толчков о дверной проем. Официальная гарантия 5 лет покрывает ремонт как самого ноутбучного модуля, так и подключенных датчиков. Сервисные центры Mindray по всем регионам осуществляют экстренную техническую поддержку.",
      icon: ShieldCheck
    }
  ];

  // WOW features definition
  const wowFeatures = [
    {
      title: "iVocal Голосовое управление",
      text: "Скажите «заморозить» — аппарат заморозит диагностику. Больше не нужно нарушать стерильность или тянуться к клавишам через пациента. Идеально для одиночного врача-анестезиолога в перчатках.",
      spec: "Поддерживает естественные голосовые макросы и шумоподавление."
    },
    {
      title: "Dual Probe Extender",
      text: "Подключайте и активируйте два датчика одновременно без использования тяжелых мобильных тележек. Переключайтесь между линейным датчиком сосудов и кардиодатчиком за доли секунды одной физической кнопкой.",
      spec: "Портативность и экономия времени врача."
    },
    {
      title: "U-Bank 8 часов автономии",
      text: "Единственный ноутбучный сканер этого престижного сегмента, способный работать без провода всю смену. Батарейная кассета U-Bank обеспечивает бесперебойное питание в реанимации без розеток.",
      spec: "Возможность каскадного заряда до 4-х аккумуляторов."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 7) {
      alert('Пожалуйста, введите корректный номер телефона.');
      return;
    }
    setSendingMsg(true);
    setTimeout(() => {
      setSendingMsg(false);
      setSubmitted(true);
      logger.info(`Лид-форма Mindray MX7: новая заявка от ${phone}`);
    }, 1200);
  };

  return (
    <div className="space-y-16 animate-fade-in" id="mindray-mx7-landing-root">
      
      {/* breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={onBackToCatalog}
            className="flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 transition group cursor-pointer border border-slate-200 bg-white py-2 px-4 rounded-xl hover:bg-slate-50 text-xs font-bold shrink-0 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Вернуться в каталог
          </button>
          <div className="text-xs text-slate-400 font-medium font-sans flex items-center gap-1.5 flex-wrap px-1">
            <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">Главная</span>
            <span className="text-slate-300">/</span>
            <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">Каталог</span>
            <span className="text-slate-300">/</span>
            <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">УЗИ Mindray</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-700 truncate max-w-[240px] sm:max-w-none">{product.name}</span>
          </div>
        </div>
        <div className="flex gap-2.5 w-full md:w-auto justify-between sm:justify-start">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${isFavorite ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFavorite ? 'В избранном' : 'В избранное'}</span>
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${isCompared ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{isCompared ? 'В сравнении' : 'Добавить к сравнению'}</span>
          </button>
        </div>
      </div>

      {/* 1. 🔥 HERO CONTAINER / HIGH-CONVERTING HERO HEADER */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl max-w-6xl mx-auto">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#003366]/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Title Description Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-mono bg-[#003366] text-blue-200 border border-blue-700 tracking-widest px-3 py-1 rounded-md font-black">
                MINDRAY • КИТАЙ
              </span>
              <span className="text-[10px] uppercase font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 tracking-widest px-3 py-1 rounded-md font-black">
                МЕЖДУНАРОДНЫЙ ФЛАГМАН
              </span>
              <span className="text-[10px] uppercase font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 tracking-widest px-3 py-1 rounded-md font-black">
                CE + FDA CERTIFIED
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-tight text-white">
                Стационарные технологии. <span className="text-cyan-400">Вес ноутбука.</span> <br />
                <span className="text-slate-300 font-bold">8 часов без розетки — в любой точке клиники.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                Mindray MX7 — портативная ультразвуковая система премиум-класса на революционной платформе ZST+ весом всего 3.5 кг с полноценным ИИ-управлением iVocal без рук и официальной 5-летней гарантией.
              </p>
            </div>

            {/* HIGH-CONVERTING MINI-FORM */}
            <div className="bg-slate-900/95 border border-slate-800/80 rounded-2xl p-5 space-y-4 max-w-xl shadow-lg relative z-20">
              <div className="space-y-2">
                <span className="text-cyan-400 font-bold text-xs flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="animate-pulse">🎁</span> Оставьте номер и получите за 15 минут:
                </span>
                <div className="grid gap-1.5 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Расчёт стоимости под вашу комплектацию</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Сравнение с GE Venue и Sonosite Edge в PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Подбор датчиков под вашу специализацию</span>
                  </div>
                </div>
              </div>

              {submitted ? (
                <div className="bg-emerald-950/60 border border-emerald-800/50 rounded-xl p-4 text-center space-y-1">
                  <p className="text-emerald-400 font-black text-xs uppercase tracking-wider">Заявка принята!</p>
                  <p className="text-[11px] text-slate-300">Наш эксперт готовит честное сравнение комплектаций и вышлет расчет стоимости за 15 минут.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="flex flex-col gap-2.5">
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ваш номер телефона"
                      required
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all w-full font-mono"
                    />
                    <button
                      type="submit"
                      disabled={sendingMsg}
                      className="w-full px-5 py-3.5 bg-[#00AEEF] hover:bg-cyan-400 active:bg-cyan-500 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl transition duration-150 shadow-md"
                    >
                      {sendingMsg ? 'Отправка...' : 'ПОЛУЧИТЬ ПОДБОР КОМПЛЕКТАЦИИ И РАСЧЁТ'}
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-amber-400 font-bold shrink-0">
                      <span>⏰</span> Предложение действует 48 часов
                    </span>
                    <span className="text-slate-400 italic">
                      Перезвоним за 15 мин. Без навязчивых звонков — только конкретная польза.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom mini-grid specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-slate-900">
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ПЛАТФОРМА</span>
                <span className="text-xs font-bold text-white">ZST+ Канальная</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ВЕС КОРПУСА</span>
                <span className="text-xs font-bold text-white font-mono">3.5 кг ультралегкий</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">БЕЗКУРКОВОЕ ИИ</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">iVocal Голосовое</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ГАРАНТИЯ</span>
                <span className="text-xs font-bold text-emerald-400">5 ЛЕТ ПОЛНАЯ</span>
              </div>
            </div>
          </div>

          {/* Right Product Laptop Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="bg-gradient-to-b from-slate-900/40 to-slate-950/80 border border-slate-800 p-4 rounded-3xl relative overflow-hidden shadow-2xl w-full max-w-sm group">
              <div className="absolute top-3 right-3 bg-[#003366]/30 text-blue-400 border border-blue-800/50 font-mono text-[9px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                3.5 КГ НОУТБУК
              </div>
              <div className="aspect-[4/3] bg-slate-950 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/15 via-transparent to-transparent pointer-events-none" />
                <img 
                  src="/src/assets/images/mx7_laptop_console_1780460875656.png" 
                  alt="Mindray MX7 premium laptop-style medical ultrasound diagnostics console" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs text-slate-400 font-medium block">Mindray MX7 Premium Portable</span>
                <p className="text-[10px] text-slate-500 font-mono mt-1">Тонкость 44 мм • Прочность магниевого сплава</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Блок "Где работает MX7" (Scenarios/Applications) */}
      <section className="space-y-8 max-w-6xl mx-auto" id="mx7-work-settings">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#003366] block">КЛИНИЧЕСКИЕ СЦЕНАРИИ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Где раскрывается потенциал портативного MX7
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Оборудование разработано для безотказной работы в условиях высочайшей клинической динамики.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003366]/10 text-[#003366] rounded-xl flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DYNAMIC SHOWCASE FOR LIVING PROCEDURES */}
      <section className="space-y-8 max-w-6xl mx-auto" id="mx7-interactive-showcase">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block">МЫСЛИТЬ КАРТИНКАМИ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Живой рабочий процесс на ноутбучной системе
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Исследуйте аппаратное совершенство и клинические экраны экспертной визуализации.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-4">
          <button
            onClick={() => setShowcaseTab('laptop')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              showcaseTab === 'laptop'
                ? 'bg-[#003366] text-white shadow-lg shadow-blue-900/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            01. Дизайн металлического шасси
          </button>
          
          <button
            onClick={() => setShowcaseTab('process')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              showcaseTab === 'process'
                ? 'bg-[#003366] text-white shadow-lg shadow-blue-900/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            02. У постели пациента
          </button>

          <button
            onClick={() => setShowcaseTab('cardio')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              showcaseTab === 'cardio'
                ? 'bg-[#003366] text-white shadow-lg shadow-blue-900/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            03. Попиксельный Echo Boost
          </button>
        </div>

        {/* Dynamic Showcase Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
          {/* Left Large Image Viewer Frame */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/10] bg-slate-950 rounded-2xl border border-slate-200 overflow-hidden relative group shadow-md">
              
              {showcaseTab === 'laptop' && (
                <img
                  src="/src/assets/images/mx7_laptop_console_1780460875656.png"
                  alt="Mindray MX7 magnesium alloy sleek look screen open"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              {showcaseTab === 'process' && (
                <img
                  src="/src/assets/images/mx7_procedure_1780460891947.png"
                  alt="Emergency professional scanning patient comfortably with portable laptop system"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              {showcaseTab === 'cardio' && (
                <img
                  src="/src/assets/images/mx7_echocardiography_1780460908938.png"
                  alt="Echocardiography scanning with vivid micro-vessel flow"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-md border border-slate-700 backdrop-blur-sm">
                {showcaseTab === 'laptop' ? 'MX7 MAGNESIUM SLEEK CHASSIS' : showcaseTab === 'process' ? 'POCUS REAL-TIME DIAGNOSIS' : 'ECHO BOOST FLOW VISUALIZATION'}
              </div>
            </div>
          </div>

          {/* Right Core Info Showcase Card */}
          <div className="lg:col-span-5 space-y-6">
            {showcaseTab === 'laptop' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003366] font-mono">3.5 КГ СВЕРХНАДЕЖНОЙ БРОНИ</span>
                <h3 className="text-xl font-extrabold text-slate-900">Магниевый сплав авиационного уровня</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Вес всего 3.5 кг с учетом внутренней батареи. Корпус толщиной 44 мм имеет выдающуюся ударопрочность и легко переживает частую установку на мобильную стойку и поездки по неровным коридорам клиники.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Автояркость подстраивается под уровень кабинетного освещения</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Угол раскрытия крышки до 180 градусов без люфта</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'process' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003366] font-mono">БЕЗОШИБОЧНОСТЬ У ПОСТЕЛИ</span>
                <h3 className="text-xl font-extrabold text-slate-900">Экспресс-диагностика Point-of-Care (POCUS)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Будь то экстренный вызов, реанимационный бокс или мобильная скорая — MX7 загружает программную оболочку меньше чем за 10 секунд. Органы управления защищены от попадания жидкостей и капель, экран можно протирать стандартными сертифицированными дезинфицирующими салфетками.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>Технология iNeedle улучшает контрастность инвазивной иглы</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>Ультрабыстрый переход в режим гибернации для сбережения питания</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'cardio' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00AEEF] font-mono">УРОВЕНЬ ТЕХНОЛОГИЙ ПРЕДКОВ</span>
                <h3 className="text-xl font-extrabold text-slate-900">Интеллектуальные алгоритмы ZST+</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Полноценное поканальное накопление и обработка сырых данных. Повышает границы контрастного разрешения ткани у тяжелых пациентов, убирает спекл-шумы с помощью iClear, и позволяет проводить экспертный анализ фракции выброса AutoEF за один клик у кардиобольных.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Echo Boost оптически сглаживает полости желудочков сердца</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Чуткий допплер HR Flow воспроизводит деликатные микрососудистые сетки</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <a
                href="#mx7-lead-magnet"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#003366] hover:text-blue-800 transition"
              >
                Рассчитать стоимость с дополнительными датчиками
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. БЛОК "7 причин выбрать MX7" */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-8 max-w-6xl mx-auto relative overflow-hidden" id="mx7-seven-reasons">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003366]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase block font-black">АНАЛИЗ БОЛЕЙ</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none">
            7 веских причин внедрить Mindray MX7 в практику
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Каждый пункт закрывает сомнения перед покупкой ноутбучного сканера премиум-класса.
          </p>
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Reasons Names Nav */}
          <div className="lg:col-span-5 space-y-2">
            {reasons.map((reason, index) => {
              const ReasonIcon = reason.icon;
              return (
                <div key={index} className="space-y-2 w-full">
                  <button
                    onClick={() => setActiveReason(index)}
                    className={`w-full text-left p-4 rounded-xl transition duration-200 flex items-start gap-3 border text-xs ${
                      activeReason === index
                        ? 'bg-[#003366] border-blue-600 text-white shadow-lg'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full bg-slate-800 text-white font-mono flex items-center justify-center text-[10px] font-black">
                      {index + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <p className="font-mono text-[9px] text-[#00AEEF] uppercase tracking-wider">{reason.objection}</p>
                      <p className="font-bold">{reason.pain}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 self-center ${activeReason === index ? 'rotate-90 text-[#00AEEF]' : 'text-slate-650'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {activeReason === index && (
                    <div className="block lg:hidden bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-6 text-left animate-fade-in text-slate-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-xl flex items-center justify-center shrink-0">
                          <ReasonIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#00AEEF] uppercase tracking-wider block">ОТВЕТ ЭКСПЕРТА</span>
                          <h4 className="text-sm font-bold text-slate-300">{reason.pain}</h4>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-base font-black text-white leading-tight">
                          {reason.objection}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {reason.solution}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>Mindray MX7 • Надежность и автономность</span>
                        <a 
                          href="#mx7-lead-magnet"
                          className="text-xs text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
                        >
                          Сравнить
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Selected Reason Details Box */}
          <div className="hidden lg:block lg:col-span-7 bg-slate-950/80 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-xl flex items-center justify-center">
                {React.createElement(reasons[activeReason].icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00AEEF] uppercase tracking-wider block">ОТВЕТ ЭКСПЕРТА</span>
                <h4 className="text-sm font-bold text-slate-300">{reasons[activeReason].pain}</h4>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-black text-white leading-tight">
                {reasons[activeReason].objection}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {reasons[activeReason].solution}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Mindray MX7 • 5 лет непревзойденной надежности</span>
              <a 
                href="#mx7-lead-magnet"
                className="text-xs text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
              >
                Запросить сравнение
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WOW — 3 фишки которых нет у конкурентов */}
      <section className="space-y-8 max-w-6xl mx-auto" id="mx7-wow-features">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#003366] block">ЭКСКЛЮЗИВНЫЕ ТЕХНОЛОГИИ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            WOW-технологии, превосходящие стандарты конкурентов
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Опции, которые кардинально выделяют модель среди обычных портативных УЗИ-приборов и выводят эргономику врача на новые вершины.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {wowFeatures.map((wow, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl relative space-y-4 shadow-sm hover:shadow-md transition">
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-[#003366] text-white rounded font-bold tracking-wider">
                WOW ЭФФЕКТ
              </span>
              <h3 className="text-base font-extrabold text-slate-900">{wow.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {wow.text}
              </p>
              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                🚀 {wow.spec}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ТАБЛИЦА ХАРАКТЕРИСТИК */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 max-w-6xl mx-auto" id="mx7-specifications-table">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-slate-900">Техническая спецификация Mindray MX7</h3>
          <p className="text-xs text-slate-500">Параметры и размеры ультразвуковой платформы.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-800 font-bold bg-slate-50">
                <th className="p-3 font-mono text-[9px] uppercase tracking-wider w-1/3">Характеристика аппарата</th>
                <th className="p-3 font-mono text-[9px] uppercase tracking-wider">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Основной экран</td>
                <td className="p-3">15.6" Full HD LED (1920×1080), угол обзора ≥170°, авто-яркость, раскладывание 0-180°</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Сенсорная панель управления</td>
                <td className="p-3">12.3" HD емкостный настраиваемый тач-экран с поддержкой жестов</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Вес и толщина</td>
                <td className="p-3">3.0 кг без батареи / 3.5 кг с установленной батареей; Толщина 44 мм</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Шасси корпуса</td>
                <td className="p-3">Магниевый сверхлегкий прочный сплав</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Аккумулятор U-Bank</td>
                <td className="p-3">До 8 часов непрерывного сканирования (кассетный модуль на 2 или 4 аккумулятора)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Активные порты</td>
                <td className="p-3">1 стандартный на консоли + Dual Probe Extender (опциональный модуль расширения на 2 датчика одновременно)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Платформа обработки</td>
                <td className="p-3">Революционный зонный бимформер ZST+ и пакеты обработки HD Scope / Echo Boost</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Проводные коммуникации</td>
                <td className="p-3">USB 3.0 (×4), HDMI, Ethernet, Wi-Fi, DICOM, eGateway ЭМК интеграция</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. ОПЦИИ И КОМПЛЕКТАЦИЯ */}
      <section className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-8 max-w-6xl mx-auto space-y-6" id="mx7-configurations">
        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#003366]" />
          Доступные опциональные конфигурации для клиники
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">01 / БАЗОВАЯ КОМПЛЕКТАЦИЯ</span>
            <p className="text-xs font-bold text-slate-800">Mindray MX7 Стандартный ноутбук</p>
            <p className="text-[11px] text-slate-500">Включает сам прибор, блок питания, один выбранный датчик и встроенный аккумулятор на 2 часа работы.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">02 / КЛИНИЧЕСКАЯ ТЕЛЕЖКА MT3</span>
            <p className="text-xs font-bold text-slate-800">Полноценная рабочая станция</p>
            <p className="text-[11px] text-slate-500">Мобильная стойка MT3, обеспечивающая регулировку по высоте и защищенный отсек для гелей и кабелей.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">03 / ЭНЕРГОРЕЗЕРВ U-BANK</span>
            <p className="text-xs font-bold text-slate-850">4 Внешних Аккумулятора</p>
            <p className="text-[11px] text-slate-500">Рекордные 8 часов непрерывной автономии при длительных диагностических выездах в отдаленные районы.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">04 / ИИ-МОДУЛЬ IVOCAL</span>
            <p className="text-xs font-bold text-slate-800">Голосовой ассистент с ИИ</p>
            <p className="text-[11px] text-slate-500">Запуск бесконтактной сонографии. Комплект предназначен для стерильных операционных блоков.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">05 / ДВОЙНОЙ ДАТЧИК</span>
            <p className="text-xs font-bold text-slate-800">Dual Probe Extender</p>
            <p className="text-[11px] text-slate-500">Модуль мгновенного сопряжения двух датчиков на лету без необходимости возить прибор на колесах.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">06 / КАРДИО-СИНХРОНИЗАЦИЯ</span>
            <p className="text-xs font-bold text-slate-800">Физиологический ECG Модуль</p>
            <p className="text-[11px] text-slate-500">Синхронизация с ЭКГ и пакетом Stress Echo для оценки миокарда при нагрузочном экспресс-тестировании.</p>
          </div>
        </div>
      </section>

      {/* 8-9. 🎁 ЛИД-МАГНИТ И ЕДИНСТВЕННАЯ ФОРМА ЗАХВАТА */}
      <section className="bg-gradient-to-br from-slate-900 via-[#002244] to-[#003366] text-white p-6 sm:p-12 rounded-3xl border border-blue-800/40 relative overflow-hidden max-w-6xl mx-auto shadow-2xl" id="mx7-lead-magnet">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          {/* Left Lead Info */}
          <div className="md:col-span-7 space-y-6">
            <span className="inline-block bg-cyan-500 text-slate-950 font-mono text-[10px] uppercase font-black px-3 py-1 rounded">
              🎁 ЭКСКЛЮЗИВНЫЙ ИНСТРУМЕНТ ПОДБОРА
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
              Оставьте номер прямо сейчас и получите бесплатно:
            </h2>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <p><strong>Подбор оптимальной комплектации под ваши задачи</strong> (кардиология / POCUS / сосуды / операционная).</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <p><strong>Расчёт итоговой стоимости с нужными опциями</strong> за 15 минут.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <p><strong>Сравнение MX7 vs GE Venue vs Sonosite Edge</strong> — честная таблица по 15 медицинским параметрам.</p>
              </div>
            </div>
          </div>

          {/* Right Leads capturing form block */}
          <div className="md:col-span-5 bg-slate-950/80 border border-slate-800/70 p-6 sm:p-8 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#00AEEF] uppercase font-mono tracking-wider">
              📞 Расчет комплектации MX7
            </h3>
            
            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-800/50 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest">Успешно отправлено!</h4>
                <p className="text-[11px] text-slate-350">Наш ведущий инженер по УЗИ-системам свяжется с вами в течение 15 минут.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase font-mono block">Ваш контактный телефон</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="w-full py-4 bg-[#00AEEF] hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition duration-150"
                >
                  {sendingMsg ? 'ОТПРАВЛЯЕМ...' : 'Получить подбор комплектации и расчёт →'}
                </button>

                <div className="flex items-center justify-between gap-1 text-[9px] text-slate-400 pt-1 border-t border-slate-900">
                  <span className="font-mono text-amber-500 font-bold">⏰ Действует 48 часов</span>
                  <span>Перезвоним за 15 минут. Без спама.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 10. SOCIAL PROOF & REGISTRATION LICENSE DISCLAIMER */}
      <AstmedTeamBlock />

      <footer className="text-center space-y-3 pt-6 border-t border-slate-100 max-w-6xl mx-auto" id="mx7-landing-license_disclaimer">
        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-slate-400">
          <span>СЕ • FDA • Сертифицировано</span>
          <span>•</span>
          <span>Топ-3 мировых производителей медоборудования</span>
          <span>•</span>
          <span>Русский интерфейс</span>
          <span>•</span>
          <span>Гарантия 5 лет</span>
        </div>
        <p className="text-[9px] text-slate-400 max-w-4xl mx-auto leading-relaxed uppercase tracking-wider">
          Предупреждение: Имеются противопоказания. Перед использованием необходимо ознакомиться с руководством по эксплуатации и проконсультироваться со специалистом. Оборудование зарегистрировано в установленном порядке Минздравом РФ и имеет официальные Регистрационные Удостоверения (РУ).
        </p>
      </footer>

    </div>
  );
}
