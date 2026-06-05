import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ArrowRightLeft, 
  Check, 
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Stethoscope,
  X,
  Sparkles,
  Award,
  Activity,
  Baby,
  Building,
  Users,
  FileCheck,
  Wrench,
  GraduationCap,
  Layers,
  HeartPulse,
  Info,
  CheckCircle2,
  Phone,
  User
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';
import { AstmedTeamBlock } from './AstmedTeamBlock';

interface GEVersanaBalanceR2LandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export function GEVersanaBalanceR2Landing({
  product,
  articles,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}: GEVersanaBalanceR2LandingProps) {
  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Form states and validation
  const [heroPhone, setHeroPhone] = useState('');
  const [heroName, setHeroName] = useState('');
  const [heroSending, setHeroSending] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);

  const [finalPhone, setFinalPhone] = useState('');
  const [finalName, setFinalName] = useState('');
  const [finalSending, setFinalSending] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);

  const [isHeroShaking, setIsHeroShaking] = useState(false);
  const [isFinalShaking, setIsFinalShaking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Accordion active reason
  const [activeReason, setActiveReason] = useState<number>(0);

  // Interactive sensor tabs
  const [activeSensorGroup, setActiveSensorGroup] = useState<string>('convex');

  // Showcase gallery tabs
  const [showcaseTab, setShowcaseTab] = useState<'console' | 'touch' | 'whizz'>('console');

  // Sticky header state
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  // Hero Slider State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroSliderInteracted, setIsHeroSliderInteracted] = useState(false);

  // ROI Calculator states
  const [patientCount, setPatientCount] = useState(40);
  const [scanCost, setScanCost] = useState(2500);

  const roiCalculations = useMemo(() => {
    const weeklyRevenue = patientCount * scanCost;
    const monthlyRevenue = weeklyRevenue * 4.3; // standard monthly multiplier
    const costPerScan = 120; // gel, covers, sanitizing, electricity
    const doctorShare = 0.35; // 35% standard commission for ultrasound doctor
    const overheadShare = 0.12; // 12% other clinic administrative shares
    
    // Net profit percentage margin
    const netProfitMargin = 1.0 - (doctorShare + overheadShare);
    const monthlyNetProfit = Math.round((monthlyRevenue - (patientCount * 4.3 * costPerScan)) * netProfitMargin);
    
    const initialInvestment = product.price || 1950000;
    const paybackMonths = monthlyNetProfit > 0 ? Math.max(1, Math.ceil(initialInvestment / monthlyNetProfit)) : 18;
    
    return {
      monthlyRevenue: Math.round(monthlyRevenue),
      monthlyNetProfit,
      paybackMonths
    };
  }, [patientCount, scanCost, product.price]);

  const heroSlides = [
    {
      url: "/src/assets/images/versana_balance_console_1780547755533.png",
      title: "Эргономичная стационарная консоль",
      badge: "Консоль R2",
      desc: "Создана для комфортного многосменного приема и легкого позиционирования."
    },
    {
      url: "/src/assets/images/versana_balance_touch_1780547776723.png",
      title: "Интеллектуальная сенсорная панель",
      badge: "Whizz Control",
      desc: "Мгновенные клавиши оптимизации и легкая регулировка положения."
    },
    {
      url: "/src/assets/images/ultrasound_process_1780455542303.png",
      title: "Высокоточное клиническое сканирование",
      badge: "Диагностика",
      desc: "Четкое отображение анатомических границ тканей B-Flow и SRI-HD."
    }
  ];

  // Auto-play interval for hero slider
  useEffect(() => {
    if (isHeroSliderInteracted) return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHeroSliderInteracted, heroSlides.length]);

  // General scroll tracking for header visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll
  const scrollToFinalForm = () => {
    const el = document.getElementById('r2-final-conversion-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Format phone inputs: +7 (XXX) XXX-XX-XX
  const formatPhone = (value: string) => {
    const clean = value.replace(/\D/g, '');
    let formatted = '';
    
    if (clean.length > 0) {
      formatted = '+7';
      let startsWith7or8 = clean[0] === '7' || clean[0] === '8';
      let offset = startsWith7or8 ? 1 : 0;
      let digits = clean.substring(offset);

      if (digits.length > 0) {
        formatted += ' (' + digits.substring(0, 3);
      }
      if (digits.length > 3) {
        formatted += ') ' + digits.substring(3, 6);
      }
      if (digits.length > 6) {
        formatted += '-' + digits.substring(6, 8);
      }
      if (digits.length > 8) {
        formatted += '-' + digits.substring(8, 10);
      }
    }
    return formatted;
  };

  const handlePhoneChange = (val: string, setter: (s: string) => void) => {
    if (val.length < 3) {
      setter('+7 ');
      return;
    }
    setter(formatPhone(val));
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = heroPhone.replace(/\D/g, '');
    if (digits.length < 11) {
      setIsHeroShaking(true);
      setTimeout(() => setIsHeroShaking(false), 500);
      return;
    }

    setHeroSending(true);
    setTimeout(() => {
      setHeroSending(false);
      setHeroSubmitted(true);
      logger.info(`Лид GE Versana Balance R2 (Hero): Имя: ${heroName}, Тел: ${heroPhone}`);
      setShowModal(true);
    }, 1200);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = finalPhone.replace(/\D/g, '');
    if (digits.length < 11) {
      setIsFinalShaking(true);
      setTimeout(() => setIsFinalShaking(false), 500);
      return;
    }

    setFinalSending(true);
    setTimeout(() => {
      setFinalSending(false);
      setFinalSubmitted(true);
      logger.info(`Лид GE Versana Balance R2 (Final): Имя: ${finalName}, Тел: ${finalPhone}`);
      setShowModal(true);
    }, 1200);
  };

  // 6 reasons structure (detailed facts breakdown)
  const reasons = [
    {
      pain: "«GE — это неоправданно дорого...»",
      title: "Честная цена без переплат за марку.",
      badge: "Выгодная цена & Гарантия GE",
      question: "Как войти в экосистему брендовой американской медицины?",
      body: "Versana Balance R2 спроектирован как входной билет в семейство <strong>GE HealthCare</strong>. Вы получаете оригинальное качество сборки, соответствие высочайшим критериям <strong>CE + FDA</strong> и полную сервисную поддержку на базе оригинальных комплектующих. Это долгосрочная надежность по цене базового азиатского сонографа.",
      proof: "Аппарат окупается на 30% быстрее за счет нулевых простоев оборудования и высочайшей лояльности пациентов к бренду GE в России."
    },
    {
      pain: "«Справится ли с широким потоком пациентов?»",
      title: "3 активных порта и высокая универсальность.",
      badge: "Многопрофильная база",
      question: "Как сократить время переключения между пациентами?",
      body: "<strong>3 активных порта</strong> позволяют держать готовыми к работе конвексный, линейный и внутриполостной датчики одновременно. Переключение между ними происходит одной кнопкой за <strong>0.8 секунд</strong>. Больше никаких ручных переключений кабелей, износа пинов и потери рабочего времени врача-сонографиста.",
      proof: "Пропускная способность кабинета УЗИ увеличивается в среднем на 4-5 пациентов за смену."
    },
    {
      pain: "«Сложно ли сонографисту освоиться?»",
      title: "Whizz - это автонастройка в один клик.",
      badge: "Умное управление Whizz",
      question: "Как снизить усталость глаз и исключить врачебные ошибки?",
      body: "Интеллектуальная система <strong>Whizz Dynamic Image Optimization</strong> непрерывно подстраивает яркость, контраст и усиление кадра в зависимости от типа ткани пациента. Инструмент ведет врача шаг за шагом, а встроенные интерактивные видеокурсы <strong>My Trainer</strong> обучают сложным режимам прямо на экране сонографа.",
      proof: "Начинающий ассистент выдает диагностическую картинку профессионального врача-эксперта с первого дня."
    },
    {
      pain: "«Будет ли картинка достаточно четкой?»",
      title: "B-Flow и CrossXBeam — технологии флагманов.",
      badge: "Флагманские алгоритмы",
      question: "Где предел разрешения при визуализации мелких сосудов?",
      body: "Versana Balance R2 заимствует передовые алгоритмы сонографии у старшей серии Logiq. Метод <strong>B-Flow</strong> напрямую визуализирует гемодинамику кровотока без артефактов наложения ЦДК. Технология <strong>CrossXBeam</strong> собирает многолучевое изображение, делая границы тканей невероятно четкими.",
      proof: "Адаптивная фильтрация SRI-HD устраняет спекл-шумы, оставляя только чистую анатомию органа."
    },
    {
      pain: "«Опасно ли проводить мини-пункции?»",
      title: "Безопасные инвазии с Needle Recognition.",
      badge: "Контроль иглы & Needle Rec",
      question: "Как гарантировать точность при ведении биопсийного контроля?",
      body: "Аппарат оснащен запатентованной технологией подсветки биопсийной иглы <strong>Needle Recognition</strong>. Система автоматически определяет направление ствола иглы, увеличивает ее контрастность на экране и подавляет тканевые помехи, оставляя структуры мишени полностью видимыми.",
      proof: "Ювелирный контроль биопсий и регионарных блокад без рисков повреждения крупных сосудов и нервных стволов."
    },
    {
      pain: "«Что делать в случае программного сбоя?»",
      title: "InSite удаленный сервис — инженер всегда рядом.",
      badge: "Телеметрия InSite",
      question: "Как избежать долгого ожидания мастера при техническом обслуживании?",
      body: "Благодаря технологии глубокой сервисной диагностики <strong>InSite</strong>, инженеры GE могут удаленно подключиться к сонографу (через защищенный WiFi/LAN канал). Они мгновенно диагностируют системные логи, обновляют встроенный софт и устраняют до 80% типовых программных ошибок удаленно, без визита инженера.",
      proof: "Клиника застрахована от многодневных простоев — аппарат возвращается в строй за считанные минуты."
    }
  ];

  // Specific specialties
  const specialties = [
    {
      title: "Частные клиники",
      desc: "Обеспечит максимальную пропускную способность за счет умной ИИ-автоматизации и быстрого заполнения протоколов исследований.",
      icon: Building,
      highlight: "Быстрая окупаемость"
    },
    {
      title: "Врачи ВОП",
      desc: "Широкий диагностический охват от глубоких абдоминальных слоев до кардио-скринингов на базе единой консоли.",
      icon: Users,
      highlight: "Scan Assistant"
    },
    {
      title: "Гинекологи и акушеры",
      desc: "Опциональный пакет Easy 3D/4D улучшает психоэмоциональную связь с родителем благодаря реалистичному фото плода.",
      icon: Baby,
      highlight: "Easy 3D/4D визуализация"
    },
    {
      title: "МСК специалисты",
      desc: "Высокочастотные датчики RS-Pin улавливают микроструктурные изменения связок, фасций и мышечных волокон.",
      icon: Activity,
      highlight: "Детализация SRI-HD"
    },
    {
      title: "Терапевты и педиатры",
      desc: "Деликатное, безопасное сканирование с высокой контрастностью мелких деталей у детей и пожилых людей.",
      icon: Stethoscope,
      highlight: "Whizz Dynamic"
    },
    {
      title: "Диагностические центры",
      desc: "Стабильное развертывание в многосменном потоке с мгновенной выгрузкой отчетов в DICOM и общебольничные PACS.",
      icon: FileCheck,
      highlight: "DICOM & WiFi"
    }
  ];

  // Interactive Sensors Data - GE RS-Pin Probes
  const sensors = {
    convex: [
      { name: "4C-RS", desc: "Универсальный широкополосный конвексный датчик (частоты 2.0 - 5.5 МГц). Основа диагностики органов брюшной полости, урологии, акушерства и гинекологии у взрослых." },
      { name: "8C-RS", desc: "Микроконвексный педиатрический датчик (частоты 4.0 - 10.0 МГц). Идеально подходит для нейросонографии, абдоминальных исследований у новорожденных и детей." }
    ],
    linear: [
      { name: "L6-12-RS", desc: "Высокоплотный линейный датчик (частоты 4.0 - 13.0 МГц). Предназначен для сканирования щитовидной железы, молочных желез, сонных артерий и поверхностного МСК-аппарата." },
      { name: "12L-RS", desc: "Сверхвысокочастотный широкополосный линейный датчик премиум-класса для прецизионного анализа периферических сосудов и сверхдетальных мышечных сканирований." }
    ],
    cardio: [
      { name: "3Sc-RS", desc: "Секторный фазированный датчик кардиологического профиля (частоты 1.7 - 4.0 МГц). Обеспечивает высокую частоту кадров в режимах CW/PW допплера для кардио-диагностики взрослых." },
      { name: "12S-RS", desc: "Педиатрический секторный фазированный датчик для детальной эхокардиографии младенцев и детей грудного возраста." }
    ],
    volume: [
      { name: "RAB2-6-RS", desc: "Специализированный объемный конвексный датчик 3D/4D (частоты 2.0 - 6.0 МГц). Позволяет проводить фотореалистичную объемную визуализацию плода в реальном времени под управлением ИИ." }
    ],
    vaginal: [
      { name: "E8C-RS", desc: "Популярный внутриполостной датчик (частоты 4.0 - 10.0 МГц) с эргономичным изгибом. Настоящий золотой стандарт для влагалищных и ректальных гинекологических скринингов." }
    ]
  };

  return (
    <div id="versana-balance-landing-root" className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-[#000d1f]/10 selection:text-slate-900">
      
      {/* 🧭 NAVIGATION HEADER */}
      <header id="versana-header" className="bg-white border-b border-slate-200 relative z-10 py-4 px-6 text-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <button
              id="versana-back-btn"
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
              <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">УЗИ сканеры</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-bold truncate max-w-[240px] sm:max-w-none">{product.name}</span>
            </div>
          </div>
          <div className="flex gap-2.5 items-center w-full md:w-auto justify-between sm:justify-start">
            <button
              id="versana-fav-btn"
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${isFavorite ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorite ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button
              id="versana-compare-btn"
              onClick={() => toggleCompare(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${isCompared ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{isCompared ? 'В сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 🚀 🔥 1 & 2. HERO HEADER SECTION (DARK-THEME TO PRESERVE QUALITY MEDICAL SLIDER GLOW) */}
      <section id="versana-hero" className="bg-gradient-to-br from-[#001730] to-[#00050e] text-white py-14 sm:py-20 relative overflow-hidden">
        {/* Abstract design elements matching branding guidelines */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00AEEF]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Column: 60% with Image Slider */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#0066CC]/20 text-[#00AEEF] px-4 py-1.5 rounded-full border border-[#0066CC]/35 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>Официальная комплектация GE HealthCare в РФ • CE + FDA Certified</span>
            </div>

            <h1 className="font-syne text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
              Надёжность GE.<br className="hidden sm:inline" />
              Цена, которая вас <br />
              <span className="text-[#00AEEF] underline decoration-wavy decoration-[#00AEEF]/30 underline-offset-8">
                приятно удивит.
              </span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-2xl">
              Versana Balance R2 — умный стационарный аппарат первичного звена: качество изображения GE, ИИ-автоматизация Whizz и простота работы сонографиста с первого дня.
            </p>

            {/* INTERACTIVE HERO SLIDER - FULLY PRESERVED AND INTEGRATED */}
            <div className="relative border border-[rgba(0,102,204,0.3)] bg-[#000d1f]/75 rounded-2xl overflow-hidden p-3 mt-4 z-20">
              {/* Active Slide Image */}
              <div 
                className="relative h-[240px] sm:h-[300px] bg-[#00050e]/95 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300"
                onMouseEnter={() => setIsHeroSliderInteracted(true)}
              >
                <img 
                  src={heroSlides[currentHeroSlide].url} 
                  alt={heroSlides[currentHeroSlide].title} 
                  className="max-h-full max-w-full object-contain hover:scale-[1.02] transition-transform duration-500 p-2"
                  referrerPolicy="no-referrer"
                />

                {/* Glass Badge Overlay */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md border border-[#0066CC]/45 font-mono text-[9px] uppercase tracking-wider text-[#00AEEF] px-2.5 py-1 rounded-md font-bold">
                  {heroSlides[currentHeroSlide].badge}
                </div>

                {/* Left/Right Arrow Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsHeroSliderInteracted(true);
                    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
                  }}
                  className="absolute left-2 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-[#0066CC] border border-white/15 text-white flex items-center justify-center transition-all opacity-90 hover:opacity-100 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsHeroSliderInteracted(true);
                    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
                  }}
                  className="absolute right-2 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-[#0066CC] border border-white/15 text-white flex items-center justify-center transition-all opacity-90 hover:opacity-100 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-3 sm:p-4 text-left">
                  <h4 className="font-syne font-bold text-xs sm:text-sm text-white leading-tight">
                    {heroSlides[currentHeroSlide].title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-350 mt-0.5 line-clamp-1">
                    {heroSlides[currentHeroSlide].desc}
                  </p>
                </div>
              </div>

              {/* Slider Dots & Thumbnails Navigation */}
              <div className="flex items-center justify-between gap-4 mt-3 px-1">
                <div className="flex gap-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsHeroSliderInteracted(true);
                        setCurrentHeroSlide(idx);
                      }}
                      className={`w-7 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentHeroSlide === idx ? 'bg-[#00AEEF]' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label={`Show slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Small Interactive Thumbnails */}
                <div className="flex gap-1.5">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsHeroSliderInteracted(true);
                        setCurrentHeroSlide(idx);
                      }}
                      className={`w-10 h-7 rounded border overflow-hidden bg-slate-950 transition-all cursor-pointer ${
                        currentHeroSlide === idx ? 'border-[#00AEEF] ring-1 ring-[#00AEEF]/50 scale-105' : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={slide.url} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini facts footer */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="space-y-1">
                <span className="block text-lg font-black text-[#00AEEF]">21.5" HD</span>
                <span className="text-[9px] text-slate-405 uppercase tracking-wider font-mono">Широкий монитор</span>
              </div>
              <div className="space-y-1">
                <span className="block text-lg font-black text-[#00AEEF]">3 АКТИВНЫХ</span>
                <span className="text-[9px] text-slate-405 uppercase tracking-wider font-mono">Порта датчиков</span>
              </div>
              <div className="space-y-1">
                <span className="block text-lg font-black text-[#00AEEF]">Whizz AI</span>
                <span className="text-[9px] text-slate-405 uppercase tracking-wider font-mono">Автокартинка</span>
              </div>
              <div className="space-y-1">
                <span className="block text-lg font-black text-[#00AEEF]">160+ СТРАН</span>
                <span className="text-[9px] text-slate-405 uppercase tracking-wider font-mono">Доверие к GE</span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono pt-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Регистрационное удостоверение Минздрава РФ • Полный пакет документов на русском языке</span>
            </p>
          </div>

          {/* Hero Right: Capture form inside elegant floating box */}
          <div className="lg:col-span-5 relative z-10 w-full">
            <div 
              className={`bg-white/[0.04] border border-[#0066CC]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative transition-all duration-350 ${
                isHeroShaking ? 'animate-bounce' : ''
              }`}
            >
              <div className="space-y-1">
                <h3 className="font-syne font-black text-lg text-white flex items-center gap-2">
                  <span>🎁</span> Получите предложение
                </h3>
                <p className="text-xs text-slate-350">Оставьте номер телефона — эксперт ответит за 15 минут</p>
              </div>

              {/* Conversion Values */}
              <ul className="space-y-2.5 my-5 text-[12.5px] text-slate-250">
                <li className="flex items-start gap-2.5 pb-2.5 border-b border-white/5">
                  <Check className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span>Индивидуальный подбор комплектации под вашу клинику</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2.5 border-b border-white/5">
                  <Check className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span>Подготовка спецификации с датчиками за 15 минут</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span>Брошюра-сравнение с Mindray Consona N8 (PDF)</span>
                </li>
              </ul>

              {heroSubmitted ? (
                <div className="p-6 bg-emerald-950/50 border border-emerald-800/40 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-emerald-300 text-sm">Заявка успешно принята!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Специалист уже готовит расчёт стоимости и коммерческое предложение. Ожидайте звонок в течение 15 минут.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text"
                      placeholder="Ваше имя (необязательно)"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      className="w-full bg-white/[0.07] border border-[#0066CC]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white/[0.12] transition-colors"
                    />
                  </div>

                  <div>
                    <input 
                      type="tel"
                      value={heroPhone}
                      onChange={(e) => handlePhoneChange(e.target.value, setHeroPhone)}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full bg-white/[0.09] border border-[#0066CC]/40 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#0066cc] focus:bg-white/[0.14] transition-all font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={heroSending}
                    className="w-full py-4 bg-[#00AEEF] hover:bg-[#0090c5] text-slate-950 font-sans font-black uppercase tracking-wider text-xs rounded-xl shadow-lg active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
                  >
                    {heroSending ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Оформление расчета...</span>
                      </>
                    ) : (
                      <span>Узнать цену со скидкой →</span>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-450 text-center font-mono">
                    Конфиденциально • Гарантия лучшей цены в РФ
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🏥 3. "КОМУ ПОДХОДИТ" SECTION (BRIGHT LIGHT-THEME FOR EASY READABILITY) */}
      <section id="versana-target" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">НАЗНАЧЕНИЕ КЛИНИКИ</span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-[#003366] tracking-tight">
              Кому идеально подходит сонограф Versana Balance R2?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Высокая надежность аппаратной шины и комплекс ИИ-инструментов автоматизации делают УЗИ-систему универсальной «рабочей силой» для большинства врачебных кабинетов.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {specialties.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={i}
                  className="bg-slate-50 border border-slate-250/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 hover:shadow-md transition duration-200"
                >
                  <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                    <IconComp className="w-5.5 h-5.5 text-[#004C97]" />
                  </div>
                  <div className="space-y-1.5 text-center">
                    <h4 className="font-extrabold text-xs text-slate-800 leading-tight">{item.title}</h4>
                    <span className="inline-block text-[8px] uppercase font-mono bg-[#0066cc]/10 text-blue-700 px-1.5 py-0.5 rounded font-bold font-mono">
                      {item.highlight}
                    </span>
                    <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 🛡️ 4. SIX REASONS SECTION WITH LIGHT-THEMED INTERACTIVE ACCORDION SELECTION */}
      <section id="versana-reasons" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">ОБЪЕКТИВНЫЕ ФАКТЫ</span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-[#003366] tracking-tight">
              6 причин выбрать УЗИ-аппарат Versana Balance R2
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Разбираем главные возражения клиник и докторов на языке технических доказательств, стандартов диагностики и опыта GE.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector sidebar (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              {reasons.map((item, index) => (
                <div key={index} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveReason(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                      activeReason === index 
                        ? 'bg-gradient-to-r from-[#002f5e] to-[#001730] text-white border-transparent shadow-md' 
                        : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                      activeReason === index ? 'bg-[#00AEEF] text-slate-950' : 'bg-slate-100 text-[#003366]'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <span className="block text-xs font-extrabold leading-tight">{item.pain}</span>
                      <span className={`text-[10px] font-mono block mt-0.5 ${activeReason === index ? 'text-[#00AEEF]' : 'text-slate-400'}`}>
                        {item.badge}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeReason === index ? 'rotate-90 text-[#00AEEF]' : 'text-slate-300'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {activeReason === index && (
                    <div className="block lg:hidden bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm text-slate-800 animate-fade-in text-left">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#00AEEF]/10 text-blue-750 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-black text-[#003366] uppercase tracking-widest font-mono">
                          Ответ GE Healthcare
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-[#003366] leading-snug">
                        {item.question}
                      </h3>
                      <p 
                        className="text-xs text-slate-650 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.body }}
                      />
                      <div className="bg-[#00AEEF]/5 border-l-4 border-[#00AEEF] p-4 rounded-r-xl space-y-1">
                        <div className="text-[10px] font-black text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#00AEEF]" />
                          <span>Мнение клинического аппликатора</span>
                        </div>
                        <p className="text-[11px] text-slate-600 italic leading-relaxed">
                          &ldquo;{item.proof}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right content display panel - Clean light card (7 cols) */}
            <div className="hidden lg:flex lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm min-h-[350px] flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#00AEEF]/10 text-blue-700 text-[10px] font-mono font-black px-3 py-1 rounded">
                    {reasons[activeReason].badge}
                  </span>
                  <span className="text-[10px] font-black text-[#003366] uppercase tracking-widest font-mono">
                    Ответ GE Healthcare
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#003366] leading-snug">
                  {reasons[activeReason].question}
                </h3>

                <p 
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: reasons[activeReason].body }}
                />
              </div>

              {/* Specialist view opinion block */}
              <div className="bg-[#00AEEF]/5 border-l-4 border-[#00AEEF] p-4 rounded-r-xl space-y-1">
                <div className="text-[10px] font-black text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Мнение клинического аппликатора</span>
                </div>
                <p className="text-[11px] text-slate-600 italic leading-relaxed">
                  &ldquo;{reasons[activeReason].proof}&rdquo;
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 🔮 5. WOW-POSSIBILITIES SECTION */}
      <section id="versana-wow" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">УНИКАЛЬНЫЙ СОФТ</span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-[#003366] tracking-tight">
              Три WOW-функции, которые удивляют сонографистов
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Технологические решения, избавляющие клинику от долгого ручного ввода и повышающие надежность каждого клинического отчета.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* WOW 1: Whizz Label */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition duration-250">
              <div className="bg-[#003366] text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                01
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">АВТОМАТИЗАЦИЯ С ДАТЧИКАМИ</span>
                <h3 className="font-extrabold text-base text-slate-850">Whizz Label — автоподпись органов в реальном времени</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Больше не требуется тратить время на ручной ввод текста типа «печень», «почка» или «желчный пузырь». Встроенная нейросеть Whizz автоматически распознает сканируемую анатомическую зону на экране и подписывает структуру.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Экономия времени: Снижает рутинную бумажную нагрузку на врача на 25% за сеанс.
                </p>
              </div>
            </div>

            {/* WOW 2: B-Flow */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition duration-250">
              <div className="bg-[#003366] text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                02
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">ГЕМОДИНАМИКА НАВЕДЕНИЯ</span>
                <h3 className="font-extrabold text-base text-slate-850">B-Flow сканирование — кровоток без артефактов</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Эксклюзив от GE. В отличие от стандартного цветового допплера, который может «выходить» за рамки истинных сосудистых стенок, B-Flow замеряет отражения напрямую от эритроцитов, показывая истинный диаметр сосуда.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Клинический успех: Позволяет находить пристеночные бляшки сонных артерий на сверхранних этапах.
                </p>
              </div>
            </div>

            {/* WOW 3: Needle Rec */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition duration-250">
              <div className="bg-[#003366] text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                03
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">БЕЗОПАСНАЯ ИГЛА</span>
                <h3 className="font-extrabold text-base text-slate-850">Needle Recognition — прецизионные биопсии</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Специальная фокусировка луча заставляет металлический ствол пункционной иглы резко выделяться белым цветом в режиме реального времени, исключая «слепое» введение лекарств в ткани и мышцы.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Статус: Бесценная функция для урологических центров, ортопедов и палат интенсивного контроля.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ⚡ 6. NEW INTERACTIVE SENSORS EXPLORER (LIGHT-THEME, IDENTICAL TO CONSONA'S TRANS-SYSTEM) */}
      <section id="versana-sensors" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">ВЫСОКОПЛОТНЫЕ ДАТЧИКИ</span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-[#003366] tracking-tight">
              Обширный парк датчиков GE RS-Pin
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Каждый датчик имеет оригинальные коннекторы RS без защелок. Выберите группу датчиков ниже, чтобы детально изучить их спецификацию.
            </p>
          </div>

          <div className="space-y-6">
            {/* Sensor group navigation tabs */}
            <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
              {[
                { id: 'convex', label: 'Конвексные', icon: '🌐' },
                { id: 'linear', label: 'Линейные', icon: '📏' },
                { id: 'cardio', label: 'Кардио/Секторные', icon: '💓' },
                { id: 'volume', label: 'Объемные 3D/4D', icon: '👶' },
                { id: 'vaginal', label: 'Внутриполостные', icon: '🧬' }
              ].map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveSensorGroup(group.id)}
                  className={`px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer flex items-center gap-2 border ${
                    activeSensorGroup === group.id
                      ? 'bg-[#003366] text-white border-transparent shadow-md'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <span>{group.icon}</span>
                  <span>{group.label}</span>
                </button>
              ))}
            </div>

            {/* List of active sensors */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {sensors[activeSensorGroup as keyof typeof sensors]?.map((sensor, sIdx) => (
                <div 
                  key={sIdx}
                  className="bg-white border border-slate-200 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00AEEF]/10 text-[#004C97] font-bold text-xs flex items-center justify-center font-mono shrink-0">
                    GE
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-[#003366] flex items-center gap-2">
                      <span>Датчик {sensor.name}</span>
                      <span className="bg-slate-100 text-[9px] text-slate-500 uppercase font-mono px-2 py-0.5 rounded">RS Segment</span>
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{sensor.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 🖥️ 7. INTERACTIVE DESIGN CONSOLE SHOWCASE */}
      <section className="bg-white py-16 text-slate-800 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-[2px] text-[#00AEEF] block font-mono">ЖИВОЙ РАБОЧИЙ ПРОЦЕСС</span>
            <h2 className="font-syne text-2xl sm:text-3.5xl font-black text-[#003366] leading-tight">
              Интерактивный обзор консоли и панелей управления
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Посмотрите оригинальные фотографии эргономики сонографа GE. Нажимайте на вкладки, чтобы рассмотреть конкретные ракурсы.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
            <button
              type="button"
              onClick={() => setShowcaseTab('console')}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                showcaseTab === 'console'
                  ? 'bg-[#003366] text-white border-transparent shadow shadow-blue-900/10'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span>🖥️</span> Консоль аппарата
            </button>
            <button
              type="button"
              onClick={() => setShowcaseTab('touch')}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                showcaseTab === 'touch'
                  ? 'bg-[#003366] text-white border-transparent shadow shadow-blue-900/10'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span>🎛️</span> Панель управления Whizz
            </button>
            <button
              type="button"
              onClick={() => setShowcaseTab('whizz')}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                showcaseTab === 'whizz'
                  ? 'bg-[#003366] text-white border-transparent shadow shadow-blue-900/10'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span>🤖</span> ИИ Whizz Suite
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Gallery Image Display (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6 overflow-hidden flex items-center justify-center relative min-h-[320px] sm:min-h-[460px]">
              <div className="absolute top-4 left-4 bg-white/90 border border-slate-200 text-slate-700 font-mono text-[9px] uppercase px-3 py-1 rounded-full backdrop-blur-sm z-10 font-bold">
                {showcaseTab === 'console' && 'Стабильное стационарное шасси'}
                {showcaseTab === 'touch' && 'Панель с мгновенным откликом'}
                {showcaseTab === 'whizz' && 'Whizz Suite интеллектуальная разметка'}
              </div>

              {showcaseTab === 'console' && (
                <div className="w-full flex justify-center">
                  <img 
                    src="/src/assets/images/versana_balance_console_1780547755533.png" 
                    alt="GE Healthcare Versana Balance R2 Stationary Medical Ultrasound System Console" 
                    className="max-h-[380px] sm:max-h-[440px] w-auto object-contain hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {showcaseTab === 'touch' && (
                <div className="w-full flex justify-center">
                  <img 
                    src="/src/assets/images/versana_balance_touch_1780547776723.png" 
                    alt="GE Healthcare Versana Balance R2 Touch Panel Controls and Interface CloseUp" 
                    className="max-h-[380px] sm:max-h-[440px] w-auto object-contain hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {showcaseTab === 'whizz' && (
                <div className="w-full text-center space-y-6 max-w-sm px-4">
                  <div className="w-16 h-16 bg-[#00AEEF]/10 text-[#004C97] rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                    🤖
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-syne font-bold text-lg text-slate-850">Комплексная автоматизация Whizz Suite</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      Система автооптимизации кадра в темпе реального времени. Распознает границы органов и подписывает их автоматически (например, левая доля печени, желчный пузырь), избавляя врача от мелкой рутины.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <span className="text-[#004C97] block font-bold">Whizz Label</span>
                      <span className="text-slate-400 text-[8px]">Авторазметка</span>
                    </div>
                    <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <span className="text-[#004C97] block font-bold">Whizz Flow</span>
                      <span className="text-slate-400 text-[8px]">Адаптивный доплер</span>
                    </div>
                    <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <span className="text-[#004C97] block font-bold">Scan Assist</span>
                      <span className="text-slate-400 text-[8px]">Шаблоны ведения</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Showcase Info Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00AEEF] font-mono">ОСОБЕННОСТИ КОНСТРУКЦИИ</span>
                <h3 className="font-syne font-black text-2xl text-[#003366]">
                  {showcaseTab === 'console' && 'Идеальная эргономика для врача-сонографиста'}
                  {showcaseTab === 'touch' && 'Сенсорные клавиши быстрого доступа'}
                  {showcaseTab === 'whizz' && 'Глубокий программный интеллект GE'}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {showcaseTab === 'console' && 'Разработан с заботой о практикующем докторе: жестко фиксируемый HD-монитор 21.5\", плавная механическая регулировка консоли по высоте и компактные габариты для легкой установки в кабинетах малого метража (от 10 кв. куб. метров).'}
                {showcaseTab === 'touch' && 'Мгновенная реакция сенсора облегчает переключение между режимами сканирования и типами пациентов без поиска в длинных каскадных подменю. Панель полностью герметична и легко дезинфицируется.'}
                {showcaseTab === 'whizz' && 'Аппарат автоматически стабилизирует плотность луча по всей глубине фокуса. Это гарантирует отсутствие мутных областей на углах экрана и дает безупречный контраст.’'}
              </p>

              <div className="p-4.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-[#004C97] uppercase tracking-widest block font-mono font-bold mb-1">ОТЗЫВ И ПРАКТИКА</span>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  {showcaseTab === 'console' && '«Благодаря компактному зауженному шасси, сонограф помещается в малые кабинеты УЗД и палат первичного осмотра и легко маневрирует на колесах на подшипниках»'}
                  {showcaseTab === 'touch' && '«Силиконовая мембрана клавиатурной деки гарантирует полную пылевлагозащиту от случайного забивания гелем»'}
                  {showcaseTab === 'whizz' && '«Whizz Suite повышает скорость обслуживания пациентов на 24% — врач делает меньше кликов и быстрее сохраняет замеры в базу PACS»'}
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToFinalForm}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#00AEEF] hover:bg-[#0090c5] text-slate-950 font-sans font-black uppercase tracking-wider text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Получить коммерческое предложение
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 📊 8. TECHNICAL SPECIFICATIONS TABLE & ROI CALCULATOR */}
      <section id="versana-specs" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start text-left">
          
          {/* Technical specifications table */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#00AEEF] tracking-widest font-mono">СПЕЦИФИКАЦИЯ ОБОРУДОВАНИЯ</span>
              <h3 className="text-2xl sm:text-3.5xl font-black text-[#003366] tracking-tight">
                Характеристики GE Versana Balance R2
              </h3>
              <p className="text-xs text-slate-500">
                Полные диагностические параметры стационарной установки Versana Balance R2 в базовой и расширенной версиях.
              </p>
            </div>

            <div className="bg-white border border-slate-205 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  {[
                    { label: "Монитор", val: "21.5\" HD LED, антибликовый, регулируемый" },
                    { label: "Touch-панель", val: "Сенсорная мультижестовая" },
                    { label: "Активных портов", val: "3 одновременно активных порта датчиков" },
                    { label: "Датчики", val: "Высокоплотные RS-Pin серии" },
                    { label: "Режимы визуализации", val: "B, M, Color, PDI, PW, B-Flow, 3D/4D объем" },
                    { label: "ИИ-автоматизация", val: "Whizz Dynamic, Whizz Label, Scan Assistant" },
                    { label: "Точность биопсий", val: "Needle Recognition (подсветка ствола иглы)" },
                    { label: "Накопитель данных", val: "Быстрый твердотельный SSD ~512 ГБ" },
                    { label: "Подключение", val: "DICOM 3.0, USB 3.0, LAN, WiFi адаптер" },
                    { label: "Подогрев акустического геля", val: "Интегрированный в консоль подогреватель (опция)" },
                    { label: "Сервисная поддержка", val: "InSite™ удаленное подключение инженера" },
                    { label: "Обучение сонографиста", val: "Интерактивный курс My Trainer" },
                    { label: "Лицензии & Стандарты", val: "CE, FDA, Регистрационное удостоверение Минздрава РФ" }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-bold text-[#003366] w-5/12 border-b border-slate-150/60 font-mono text-[10px] uppercase tracking-wide">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-slate-650 border-b border-slate-150/60 font-sans text-xs">
                        {row.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="inline-block bg-[#0066cc]/10 text-[#003366] text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                ФИНАНСОВАЯ ОКУПАЕМОСТЬ Versana Balance R2
              </div>
              <h3 className="text-xl font-black text-[#003366] tracking-tight text-left">Экономический калькулятор клиники</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed text-left">
                Благодаря высокой автоматизации ИИ-аппарата Versana Balance R2, Вы сможете принимать больше пациентов и сократить время обследований. Рассчитайте окупаемость Вашего приобретения в реальном времени.
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Обследований в неделю:</span>
                  <span className="text-[#0066cc] font-mono font-bold">{patientCount} исследований</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  step="5"
                  value={patientCount}
                  onChange={(e) => setPatientCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[#0066cc]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Средний чек обследования УЗИ:</span>
                  <span className="text-[#0066cc] font-mono font-bold">{scanCost.toLocaleString()} ₽</span>
                </div>
                <input 
                  type="range" 
                  min="1500" 
                  max="6000" 
                  step="100"
                  value={scanCost}
                  onChange={(e) => setScanCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[#0066cc]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono block">Оборот в месяц</span>
                <span className="text-xs font-black text-slate-800">{roiCalculations.monthlyRevenue.toLocaleString()} ₽</span>
              </div>
              <div className="space-y-1 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[9px] text-emerald-600 uppercase tracking-widest font-mono block font-bold">Чистый доход</span>
                <span className="text-xs font-black text-emerald-750">{roiCalculations.monthlyNetProfit.toLocaleString()} ₽</span>
              </div>
              <div className="space-y-1 bg-[#0066cc]/5 p-2.5 rounded-xl border border-[#0066cc]/10">
                <span className="text-[9px] text-[#0066cc] uppercase tracking-widest font-mono block font-bold">Окупаемость</span>
                <span className="text-xs font-black text-[#003366]">{roiCalculations.paybackMonths} мес.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => triggerQuote(product, 'leasing')}
              className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition text-center cursor-pointer font-sans"
            >
              Рассчитать покупку в лизинг (аванс от 10%)
            </button>
          </div>

        </div>
      </section>

      {/* 📦 9. SYSTEM PACKAGING & KIT ITEMS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">КОМПЛЕКТАЦИЯ САКЦИЙ</span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-[#003366] tracking-tight">
              Что вы получаете при поставке аппарата
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Аппарат Versana Balance R2", desc: "Стационарная консоль с датчиками по вашей спецификации", icon: "🖥️" },
              { title: "Официальная гарантия", desc: "Производственная гарантия с поддержкой сертифицированных инженеров", icon: "🛡️" },
              { title: "Удаленный телесервис InSite", desc: "GE диагностирует и калибрует систему удаленно без простоев клиники", icon: "📡" },
              { title: "Встроенный видеокласс My Trainer", desc: "Учебные материалы по всем режимам сканирования прямо на экране", icon: "🎓" },
              { title: "e-Delivery обновления", desc: "Загрузка обновлений сонографа и ИИ-алгоритмов онлайн", icon: "🔄" },
              { title: "Полный комплект документов", desc: "Регистрационное удостоверение, инструкция на русском, поверка", icon: "📋" }
            ].map((kit, i) => (
              <div 
                key={i}
                className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-start gap-4 hover:shadow-md transition duration-200"
              >
                <span className="text-3xl shrink-0 p-1.5 rounded-lg bg-white border border-slate-200 select-none">
                  {kit.icon}
                </span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-800 leading-tight">{kit.title}</h4>
                  <p className="text-xs text-slate-500 leading-normal">{kit.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────
          СЕКЦИЯ 10: ФИНАЛЬНЫЙ СТА ДАТЧИКИ И ПОЛУЧЕНИЕ РАСЧЕТА
          ────────────────────────────────────────── */}
      <section id="r2-final-conversion-form" className="bg-gradient-to-br from-[#003366] to-[#011b3a] py-16 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(ellipse,rgba(0,174,239,0.1)_0%,transparent_70%)] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 space-y-8 text-center">
          
          <div className="space-y-3">
            <h2 className="font-syne text-3xl sm:text-4.5xl font-black text-white tracking-tight leading-tight">
              Готовы сделать выбор в пользу <br />
              <span className="text-[#00AEEF]">американской надежности GE?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Оставьте номер телефона — эксперт рассчитает стоимость комплектации с датчиками за 15 минут.
            </p>
          </div>

          <div 
            className={`bg-white/[0.04] border border-[#0066CC]/35 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative transition-all duration-300 ${
              isFinalShaking ? 'shake-form-animation' : ''
            }`}
          >
            {/* Value checklist inside CTA */}
            <div className="text-left space-y-2 mb-6">
              <span className="text-[#00AEEF] font-bold text-[11px] uppercase tracking-wider block font-mono">
                🎁 ПОДТВЕРЖДЕННЫЕ ПОЛУЧАТЕЛИ:
              </span>
              <div className="grid gap-1.5 text-[11px] sm:text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                  <span>Прозрачный подбор комплектации под профиль клиники</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                  <span>Расчёт и бронь скидки до конца недели</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                  <span>Таблица сравнения с Mindray Consona N8</span>
                </div>
              </div>
            </div>

            {finalSubmitted ? (
              <div className="p-6 bg-emerald-950/50 border border-emerald-800/40 rounded-2xl text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-300 text-sm">Ваша заявка принята!</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Наш сонографист-апликатор формирует коммерческое предложение. Перезвоним в течение 15 минут.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text"
                    placeholder="Ваше имя (необязательно)"
                    value={finalName}
                    onChange={(e) => setFinalName(e.target.value)}
                    className="w-full bg-white/[0.07] border border-[#0066CC]/25 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0066cc] focus:bg-white/[0.1] transition-all font-sans"
                  />
                </div>

                <div>
                  <input 
                    type="tel"
                    value={finalPhone}
                    onChange={(e) => handlePhoneChange(e.target.value, setFinalPhone)}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className="w-full bg-white/[0.07] border border-[#0066CC]/30 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#0066cc] focus:bg-white/[0.1] transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={finalSending}
                  className="w-full py-4 bg-[#00AEEF] hover:bg-[#0090c5] text-slate-950 font-sans font-black uppercase tracking-wider text-xs rounded-xl shadow-lg hover:shadow-blue-500/10 active:scale-95 transition-all block text-center cursor-pointer"
                >
                  {finalSending ? (
                    <span>Оформление заявки...</span>
                  ) : (
                    <span>Получить расчет и коммерческое предложение →</span>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center font-mono">
                  Перезвоним за 15 минут в рабочее время. Без спама.
                </p>
              </form>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>CE + FDA</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>GE Healthcare официально</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>160+ стран РФ</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: НАША КОМАНДА "ASTMED" */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 mt-12 max-w-7xl mx-auto" id="astmed-team-trust">
        <div className="grid lg:grid-cols-12 gap-8 items-center text-slate-100 text-left font-sans">
          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-slate-800">
            <img 
              src="/images/team_aesthet.jpg" 
              alt="Команда Astmed" 
              className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-mono tracking-widest bg-cyan-600 px-2.5 py-1 rounded font-bold font-mono">ОФИС И КОМАНДА ASTMED</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-cyan-950/40 border border-cyan-800/60 px-3 py-1.5 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Нам доверяют ведущие клиники
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-none font-syne">
              Команда экспертов «Astmed» — Ваша опора на каждом этапе
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Каждое поставляемое устройство — это не просто коробка, а долгосрочное партнерство. Наша сертифицированная команда <strong className="text-white">Astmed</strong> состоит из высококлассных инженеров медтехники, практикующих врачей-сонографистов и сертифицированных бизнес-консультантов.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Мы лично доставляем оборудование по всей России, проводим пусконаладочные работы, занимаемся обучением вашего персонала с выдачей дипломов и обеспечиваем молниеносное сервисное сопровождение 24/7. Покупая у нас, вы защищаете клинику от простоев и получаете поток довольных пациентов с первого дня!
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 font-sans">
              <div className="border border-slate-800 bg-slate-950/50 p-3 rounded-xl">
                <span className="text-sm font-black text-cyan-400 block font-mono">100% Честность</span>
                <span className="text-[10px] text-slate-500 font-sans">Живой показ и тест-драйв оборудования</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/50 p-3 rounded-xl">
                <span className="text-sm font-black text-cyan-400 block font-mono">Официальный СЦ</span>
                <span className="text-[10px] text-slate-500 font-sans">Инженеры с лицензией Росздравнадзора</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <AstmedTeamBlock />

      <footer className="bg-[#000509] py-10 sm:py-16 text-center border-t border-slate-900 px-6">
        <div className="max-w-4xl mx-auto space-y-4 text-[11px] text-slate-500 leading-relaxed font-sans">
          <p className="uppercase tracking-widest text-[#00AEEF] font-bold text-[10px] font-mono">
            ИНФОРМАЦИОННОЕ УВЕДОМЛЕНИЕ О МЕДИЦИНСКОМ ОБОРУДОВАНИИ
          </p>
          <p>
            GE Healthcare Versana Balance R2 — диагностическая ультразвуковая система. Медицинское изделие. Имеются противопоказания. Требуется ознакомление с инструкцией по применению и консультация со специалистом. Реализация и установка осуществляются при наличии соответствующих лицензий. Технические характеристики соответствуют оригинальному техпаспорту GE HealthCare. 
          </p>
          <p className="text-[10px] text-slate-600">
            © 2026 GE-Healthcare Versana. Все товарные знаки принадлежат соответствующим владельцам. Документы на всей территории РФ.
          </p>
        </div>
      </footer>

      {/* MODAL OK OVERLAY */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-300"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-[#001433] border border-[#0066CC]/40 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center relative shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 p-1.5 rounded-lg hover:border-slate-700 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-6xl block select-none">🎉</span>
            <div className="space-y-2">
              <h3 className="font-syne font-black text-2xl text-white">Заявка принята!</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Наш эксперт уже формирует спецификацию с датчиками под профиль клиники. Мы свяжемся с вами в течение 10-15 минут.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 bg-[#00AEEF] text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#0090c5] transition"
            >
              Отлично, жду звонка
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
