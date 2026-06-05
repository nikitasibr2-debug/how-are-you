import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ArrowRightLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft,
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
  Clock,
  Shield,
  Activity,
  Award,
  Building,
  Wrench,
  GraduationCap,
  Sparkle,
  Minus,
  Plus,
  AlertTriangle,
  Briefcase,
  ShieldAlert,
  Users,
  TrendingUp,
  Download,
  MapPin
} from 'lucide-react';
import { Product } from '../types';
import { logger } from '../lib/logger';

interface MindrayHepatus5LandingProps {
  product: Product;
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export function MindrayHepatus5Landing({
  product,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}: MindrayHepatus5LandingProps) {
  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Countdown timer countdown state (48 hours)
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 54 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 47, minutes: 59, seconds: 54 }; // Reset cycle or stop
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form states
  const [phoneHero, setPhoneHero] = useState('');
  const [phoneHeroError, setPhoneHeroError] = useState(false);
  const [phoneHeroShake, setPhoneHeroShake] = useState(false);

  const [phoneCta, setPhoneCta] = useState('');
  const [nameCta, setNameCta] = useState('');
  const [phoneCtaError, setPhoneCtaError] = useState(false);
  const [phoneCtaShake, setPhoneCtaShake] = useState(false);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 🧮 Calculator reactive states (ROI & Clinical Diagnostic Staging)
  const [patientsPerDay, setPatientsPerDay] = useState(8);
  const [pricePerScan, setPricePerScan] = useState(3500);
  const [workDaysPerMonth] = useState(24);
  const [consumableCost] = useState(150); // гель, перчатки, дезинфекция

  // Clinical Diagnostic Stages States (ViTE & LiSA Scans)
  const [selectedKpa, setSelectedKpa] = useState<number>(8.4); // kPa for Fibrosis
  const [selectedCap, setSelectedCap] = useState<number>(270); // dB/m for Steatosis

  // 🎛️ Reassurance / Objection Handling states (Hepatus 5 matching Duet V style)
  const [hepatusObjectionTab, setHepatusObjectionTab] = useState<'roi' | 'sanpin' | 'staff' | 'service' | 'flow'>('roi');
  const [auditArea, setAuditArea] = useState<number>(14);
  const [auditHeight, setAuditHeight] = useState<number>(2.7);
  const [auditVentilation, setAuditVentilation] = useState<boolean>(true);
  const [auditWater, setAuditWater] = useState<boolean>(true);
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);
  const [plannerSelectedItems, setPlannerSelectedItems] = useState<string[]>(['console', 'trolley', 'vite_lisa', 'training']);
  const [demoDaySubmitted, setDemoDaySubmitted] = useState<boolean>(false);
  const [flowChannelSelected, setFlowChannelSelected] = useState<string>('gastro');
  const [auditPhone, setAuditPhone] = useState('');
  const [auditName, setAuditName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoName, setDemoName] = useState('');

  // ROI computations
  const monthlyScans = patientsPerDay * workDaysPerMonth;
  const monthlyRevenue = monthlyScans * pricePerScan;
  const monthlyExpenses = monthlyScans * consumableCost + (monthlyRevenue * 0.15); // 15% overhead & doctor salary share
  const monthlyProfit = Math.round(monthlyRevenue - monthlyExpenses);
  const deviceCostEstimate = 2350000; // Average expert tablet system cost
  const paybackMonths = Math.max(1, Math.ceil(deviceCostEstimate / Math.max(1, monthlyProfit)));

  // Phone masking helper: format +7 (XXX) XXX-XX-XX
  const formatPhoneNumber = (value: string) => {
    // strip non-digits except maybe the leading '+'
    const clean = value.replace(/\D/g, '');
    let formatted = '';
    
    if (clean.length === 0) {
      return '';
    }
    
    // Always start with +7
    formatted = '+7 ';
    
    // extract parts
    const part1 = clean.substring(1, 4); // Area code
    const part2 = clean.substring(4, 7); // First 3 digits
    const part3 = clean.substring(7, 9); // Next 2 digits
    const part4 = clean.substring(9, 11); // Last 2 digits

    if (clean.length > 1) {
      formatted += `(${part1}`;
    }
    if (clean.length > 4) {
      formatted += `) ${part2}`;
    }
    if (clean.length > 7) {
      formatted += `-${part3}`;
    }
    if (clean.length > 9) {
      formatted += `-${part4}`;
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const rawVal = e.target.value;
    // Strip everything but numbers
    const cleanNumbers = rawVal.replace(/\D/g, '');
    
    // Limit to 11 digits (7 + 10 digits mobile)
    if (cleanNumbers.length <= 11) {
      const formatted = formatPhoneNumber(cleanNumbers);
      setter(formatted);
    }
  };

  // Submission validation
  const onSubmitForm = (e: React.FormEvent, phoneVal: string, setErr: (b: boolean) => void, setShake: (b: boolean) => void) => {
    e.preventDefault();
    // Validate: must be fully filled '+7 (XXX) XXX-XX-XX' which is 18 chars
    if (phoneVal.length < 18) {
      setErr(true);
      setShake(true);
      logger.warn('Попытка отправки неполного номера телефона на лендинге Hepatus 5');
      setTimeout(() => {
        setShake(false);
      }, 500);
      setTimeout(() => {
        setErr(false);
      }, 2500);
    } else {
      setErr(false);
      setShowSuccessModal(true);
      logger.info(`Успешно отправлена заявка на демонстрацию Hepatus 5. Телефон: ${phoneVal}`);
    }
  };

  const scrollCta = () => {
    const el = document.getElementById('cta-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (auditPhone.length < 18) {
      logger.warn('Попытка отправки неполного номера телефона в аудите СанПиН');
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }
    setAuditSubmitted(true);
    logger.info(`Гепатология: отправлена заявка по СанПиН: ${auditName}, Тел: ${auditPhone}`);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoPhone.length < 18) {
      logger.warn('Попытка отправки неполного номера телефона в броне обучения');
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }
    setDemoDaySubmitted(true);
    logger.info(`Гепатология: отправлена заявка на демо-день: ${demoName}, Тел: ${demoPhone}`);
  };

  // Technical features objections list
  const reasonsList = [
    {
      objection: "Чем Hepatus 5 лучше обычного FibroScan?",
      title: "ViTE + 2D УЗИ одновременно — FibroScan так не умеет.",
      desc: "FibroScan измеряет вслепую. Hepatus 5 совмещает ViTE эластографию с реальным B-Mode изображением: видите где именно проводится измерение, обходите сосуды и очаги. Q-Scan ИИ автоматически захватывает несколько валидных измерений за один проход — меньше ошибок оператора."
    },
    {
      objection: "Насколько точна оценка стеатоза?",
      title: "LiSA — числовой CAP для жира. Не глазомер.",
      desc: "LiSA (Liver Steatosis Analysis) — количественная оценка затухания УЗ-волны в ткани печени. Результат в числах: степень стеатоза S0-S3. Рекомендован международными гайдлайнами EASL, AASLD. Воспроизводимо, сравнимо в динамике — идеально для мониторинга лечения."
    },
    {
      objection: "А если пациент с ожирением или асцитом?",
      title: "Один датчик для всех типов пациентов.",
      desc: "ViTE датчик адаптирован для пациентов с высоким ИМТ и сложной анатомией. Индикатор качества в реальном времени: контроль давления датчика и стабильности дыхания пациента — система сама подсказывает как правильно измерить."
    },
    {
      objection: "Это планшет — достаточно ли удобно для клиники?",
      title: "Полный touchscreen. Штрихкод. 2 часа батарея.",
      desc: "Планшетный формат = лёгкий, мобильный, дезинфицируется за секунды. Встроенный сканер штрихкода — сканируй карту пациента, данные заполняются автоматически. Аккумулятор 2 часа — палата, кабинет, выезд. Убирающийся кабель — никаких спотыкалок."
    },
    {
      objection: "Окупится ли аппарат при нашем потоке?",
      title: "1 скрининг = 5 минут. Считайте сами.",
      desc: "При стоимости процедуры ViTE 2 000–4 000 ₽ и потоке 10 пациентов в день: 20 000–40 000 ₽ в день только на эластографии. Плюс пациенты, которые раньше уходили к конкуренту за FibroScan — теперь остаются у вас."
    },
    {
      objection: "Не устареет? Что с гарантией?",
      title: "3 года гарантии + Living Technology™.",
      desc: "3-летняя гарантия на систему, части и стандартные датчики. Living Technology™ — программные обновления весь срок службы. Q-Scan ИИ уже добавлен как обновление существующим пользователям. Mindray работает с 1991 года, 190+ стран, CE + FDA."
    }
  ];

  // Steps
  const stepsList = [
    {
      num: "🪪",
      title: "Сканируй штрихкод",
      desc: "Приложи сканер к карте пациента — данные заполняются автоматически. Без ручного ввода."
    },
    {
      num: "🔍",
      title: "Визуализация B-Mode",
      desc: "Видишь печень в реальном времени. Выбираешь зону для измерения, обходишь сосуды и очаги."
    },
    {
      num: "📊",
      title: "ViTE + LiSA измерение",
      desc: "Q-Scan ИИ автоматически захватывает 10 валидных измерений. Индикатор качества контролирует процесс."
    },
    {
      num: "📋",
      title: "Числовой отчёт",
      desc: "kPa (жёсткость) + CAP (стеатоз) + стадия фиброза F0-F4. Готово. Следующий пациент."
    }
  ];

  // Specs
  const specsList = [
    { key: "Тип устройства", val: "Планшетный (tablet-based) УЗИ-аппарат" },
    { key: "Специализация", val: "Гепатология: фиброз + стеатоз" },
    { key: "Технология эластографии", val: "ViTE (Visualized Transient Elastography)" },
    { key: "Технология стеатоза", val: "LiSA (Liver Steatosis Analysis)" },
    { key: "ИИ захват", val: "Q-Scan Intelligent Acquisition" },
    { key: "Индикатор качества", val: "Интегрированный датчик давления" }
  ];

    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroSliderInteracted, setIsHeroSliderInteracted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const heroSlides = [
    {
      url: "/src/assets/images/mx7_laptop_console_1780460875656.png",
      title: "Эргономичная портативная консоль Hepatus 5",
      badge: "Консоль Hepatus 5",
      desc: "Ультрамобильный планшетный формат с полной сенсорной влагозащитной IPS панелью."
    },
    {
      url: "/src/assets/images/resona_i9_process_1780456118871.png",
      title: "Визуализированная эластография реального времени ViTE",
      badge: "Технология ViTE",
      desc: "Скрининг фиброза печени в kPa под живым контролем серой шкалы (B-Mode) с обходом сосудов."
    },
    {
      url: "/src/assets/images/ultrasound_process_1780455542303.png",
      title: "Умный помощник Q-Scan ИИ для автоматического захвата",
      badge: "Q-Scan Алгоритмы",
      desc: "Интеллектуальный контроль качества давления датчика и стабильности дыхания пациента."
    },
    {
      url: "/src/assets/images/mx7_procedure_1780460891947.png",
      title: "Мобильная стойка-тележка с убирающимся кабелем",
      badge: "Эргономика",
      desc: "Встроенный бесконтактный штрихкод-ридер, корзины, держатели геля и 2 часа работы от батареи."
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeThreshold = Math.abs(distance) > 50;
    if (isSwipeThreshold) {
      setIsHeroSliderInteracted(true);
      if (distance > 0) {
        // Swiped left -> next slide
        setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
      } else {
        // Swiped right -> previous slide
        setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="min-h-screen bg-[#000d1f] text-white font-sans antialiased selection:bg-[#00AEEF]/30 selection:text-white pb-12" id="hepatus5-landing-root">
      
      {/* 🧭 NAVIGATION HEADER */}
      <header className="bg-white border-b border-slate-200 relative z-50 py-4 px-6 text-slate-900 font-sans shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={onBackToCatalog}
              className="flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 transition group cursor-pointer border border-slate-200 bg-white py-2 px-4 rounded-xl hover:bg-slate-50 text-xs font-bold shrink-0 w-full sm:w-auto shadow-sm animate-fade-in"
              id="back-to-catalog-btn"
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
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${favorites.includes(product.id) ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorites.includes(product.id) ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${compareList.includes(product.id) ? 'bg-cyan-50 border-cyan-200 text-cyan-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{compareList.includes(product.id) ? 'В сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ----------------- СЕКЦИЯ 1: HERO ----------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 sm:py-20 lg:py-28 bg-gradient-to-br from-[#000509] via-[#000d1f] to-[#001433]">
        {/* Glow Spheres */}
        <div className="absolute top-12 right-12 w-96 h-96 bg-[#00AEEF]/9 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-12 left-12 w-80 h-80 bg-[#f59e0b]/6 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: 58% */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Badges list */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00AEEF]/12 border border-[#00AEEF]/40 text-xs text-[#00AEEF] font-medium leading-none">
                  <span className="w-2 h-2 rounded-full bg-[#00e5c5] animate-ping"></span>
                  Mindray • Гепатология
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00AEEF]/12 border border-[#00AEEF]/40 text-xs text-[#00AEEF] font-medium leading-none">
                  Только для печени
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00AEEF]/12 border border-[#00AEEF]/40 text-xs text-[#00AEEF] font-medium leading-none">
                  CE + FDA Certified
                </span>
              </div>

              {/* H1 Title */}
              <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                Фиброз и стеатоз печени — диагноз за <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">5 минут.</span> Без биопсии.
              </h1>

              {/* Subtitle description */}
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-light max-w-2xl leading-relaxed">
                <strong>Mindray Hepatus 5</strong> — первый специализированный планшетный аппарат для гепатологии: 
                визуализированная эластография <strong>ViTE</strong> + количественная оценка стеатоза (жира) <strong>LiSA</strong> + интеллектуальный помощник <strong>Q-Scan ИИ</strong>. 
                Абсолютно неинвазивный количественный результат. Одобрено ВОЗ и EASL.
              </p>

              {/* INTERACTIVE PHOTO SLIDER WITH TOUCH SWIPE GESTURES */}
              <div 
                className="relative border border-[#00AEEF]/20 bg-[#001433]/50 rounded-[24px] overflow-hidden p-3 mt-2 z-20"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Active Slide Image */}
                <div 
                  className="relative h-[240px] sm:h-[320px] bg-[#000d1f]/90 rounded-[18px] overflow-hidden flex items-center justify-center transition-all duration-350 select-none cursor-pointer"
                  key={currentHeroSlide}
                  onMouseEnter={() => setIsHeroSliderInteracted(true)}
                >
                  <img 
                    src={heroSlides[currentHeroSlide].url} 
                    alt={heroSlides[currentHeroSlide].title} 
                    className="max-h-full max-w-full object-contain hover:scale-[1.03] transition-transform duration-500 p-2"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />

                  {/* Glass Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-[#00e5c5]/35 font-mono text-[9px] uppercase tracking-wider text-[#00e5c5] px-2.5 py-1 rounded-md font-bold">
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
                    className="absolute left-2 w-8 h-8 rounded-full bg-slate-950/85 hover:bg-[#00e5c5] hover:text-[#000d1f] border border-white/10 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    aria-label="Предыдущий слайд"
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
                    className="absolute right-2 w-8 h-8 rounded-full bg-[#000d1f]/85 hover:bg-[#00e5c5] hover:text-[#000d1f] border border-white/10 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    aria-label="Следующий слайд"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000d1f] via-[#000d1f]/75 to-transparent p-3 sm:p-4 text-left font-sans">
                    <h4 className="font-syne font-bold text-xs sm:text-sm text-white leading-tight">
                      {heroSlides[currentHeroSlide].title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {heroSlides[currentHeroSlide].desc}
                    </p>
                  </div>
                </div>

                {/* Slider Dots & Thumbnails Navigation */}
                <div className="flex items-center justify-between gap-4 mt-3 px-1 font-sans">
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
                          currentHeroSlide === idx ? 'bg-[#00e5c5]' : 'bg-white/10 hover:bg-white/20'
                        }`}
                        aria-label={`Слайд ${idx + 1}`}
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
                          currentHeroSlide === idx ? 'border-[#00e5c5] ring-1 ring-[#00e5c5]/55 scale-105' : 'border-white/10 hover:border-white/20 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={slide.url} 
                          alt="Миниатюра" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Metrics (4 columns) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-800/60 max-w-3xl">
                <div>
                  <div className="font-syne font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">5 мин</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8899b0] mt-1 font-mono">Скрининг органа</div>
                </div>
                <div>
                  <div className="font-syne font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">0 %</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8899b0] mt-1 font-mono">Биопсий узи</div>
                </div>
                <div>
                  <div className="font-syne font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">3 года</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8899b0] mt-1 font-mono">Гарантийный срок</div>
                </div>
                <div>
                  <div className="font-syne font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent font-mono">190+</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8899b0] mt-1 font-mono">Стран присутствия</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 42% (FORM) */}
            <div className="lg:col-span-5">
              <div className="relative bg-white/[0.03] border border-[#00AEEF]/28 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                
                {/* Form Title & subtitle */}
                <div className="space-y-1 mb-6">
                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">🎁 Получите бесплатно</h3>
                  <p className="text-slate-300 text-xs sm:text-sm">Оставьте номер телефона — перезвоним за 15 минут</p>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3.5 mb-6 text-xs sm:text-sm text-slate-300 border-b border-white/5 pb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5c5] shrink-0 mt-0.5" />
                    <span>Демонстрация ViTE + LiSA на реальных клинических данных</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5c5] shrink-0 mt-0.5" />
                    <span>Сравнение Hepatus 5 vs FibroScan — честная таблица отличий</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5c5] shrink-0 mt-0.5" />
                    <span>Расчёт окупаемости: сколько скринингов окупает аппарат именно у вас</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5c5] shrink-0 mt-0.5" />
                    <span>Прямая консультация сертифицированного специалиста Mindray</span>
                  </li>
                </ul>

                {/* Form Container */}
                <form onSubmit={(e) => onSubmitForm(e, phoneHero, setPhoneHeroError, setPhoneHeroShake)} className="space-y-4">
                  <div className={`space-y-1.5 transition-all ${phoneHeroShake ? 'animate-shake' : ''}`}>
                    <label htmlFor="phone-hero" className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">Введите ваш номер телефона:</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+7</span>
                      <input 
                        type="tel"
                        id="phone-hero"
                        required
                        value={phoneHero}
                        onChange={(e) => handlePhoneChange(e, setPhoneHero)}
                        placeholder="+7 (___) ___-__-__"
                        className={`w-full bg-[#001229] border ${phoneHeroError ? 'border-rose-500 text-rose-300 placeholder-rose-400/50' : 'border-[#00AEEF]/30 hover:border-[#00e5c5]/50 focus:border-[#00e5c5]'} text-white rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold outline-none transition focus:ring-1 focus:ring-[#00e5c5]/20`}
                      />
                    </div>
                    {phoneHeroError && (
                      <p className="text-rose-500 text-[11px] font-medium">Пожалуйста, введите корректный 11-значный номер телефона</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] text-[#001a3d] hover:brightness-105 active:scale-[0.98] font-bold text-sm py-4 rounded-xl shadow-lg shadow-[#00e5c5]/20 hover:shadow-[#00e5c5]/30 transition duration-300"
                  >
                    Получить демонстрацию и расчёт →
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[11px] text-[#8899b0] text-center block">Без навязчивых звонков — только конкретная польза.</span>
                  </div>

                  {/* Urgency countdown indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-xl text-xs text-[#f59e0b] font-medium">
                    <Clock className="w-4 h-4 text-[#f59e0b]" />
                    <span>Предложение и цены актуальны: {timeLeft.hours}ч {timeLeft.minutes}м {timeLeft.seconds}с</span>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 2: ПРОБЛЕМА ----------------- */}
      <section className="py-20 bg-[#000d1f] relative border-t border-slate-900" id="hepatus-problems-objections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/10 px-3.5 py-1.5 rounded-full">
              Реальность гепатологии
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Пока пациент ждёт биопсию — <span className="bg-gradient-to-r from-[#f59e0b] to-amber-400 bg-clip-text text-transparent">болезнь прогрессирует.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="relative bg-[#001433]/45 border border-[#f59e0b]/20 rounded-3xl p-8 space-y-5 transition duration-300 hover:border-slate-800 border-l-[3px] border-l-[#f59e0b]">
              <span className="text-4xl block">⏳</span>
              <h3 className="font-syne font-bold text-lg text-[#f59e0b]">Биопсия: 2-4 недели ожидания</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Инвазивный метод диагностики печени сопряжен с болевыми ощущениями и рисками развития внутренних кровотечений. Пациент испытывает страх и откладывает обследование, в то время как патологические процессы фиброза органов активно развиваются.
              </p>
              <div className="text-center py-2 text-[#00e5c5] text-xl font-bold font-mono">↓</div>
              <div className="bg-[#00e5c5]/5 border border-[#00e5c5]/20 rounded-xl p-3.5">
                <span className="text-xs text-slate-400 block uppercase font-mono tracking-wider mb-0.5">Эффективное решение:</span>
                <p className="text-xs text-[#00e5c5] font-semibold">Hepatus 5: экспертное безболезненное обследование за 5 минут без проколов иглой.</p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="relative bg-[#001433]/45 border border-[#f59e0b]/20 rounded-3xl p-8 space-y-5 transition duration-300 hover:border-slate-800 border-l-[3px] border-l-[#f59e0b]">
              <span className="text-4xl block">📊</span>
              <h3 className="font-syne font-bold text-lg text-[#f59e0b]">Субъективная визуальная оценка</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Обычная серошкальная визуализация B-Mode сильно зависит от квалификации врача УЗД и характеристик оборудования. Стадирование степени жирового гепатита или стеатоза «на глаз» не воспроизводимо у других специалистов клиники.
              </p>
              <div className="text-center py-2 text-[#00e5c5] text-xl font-bold font-mono">↓</div>
              <div className="bg-[#00e5c5]/5 border border-[#00e5c5]/20 rounded-xl p-3.5">
                <span className="text-xs text-slate-400 block uppercase font-mono tracking-wider mb-0.5">Эффективное решение:</span>
                <p className="text-xs text-[#00e5c5] font-semibold">Hepatus 5: независимый цифровой вердикт kPa и CAP — золотой стандарт для всей команды.</p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="relative bg-[#001433]/45 border border-[#f59e0b]/20 rounded-3xl p-8 space-y-5 transition duration-300 hover:border-slate-800 border-l-[3px] border-l-[#f59e0b]">
              <span className="text-4xl block">💰</span>
              <h3 className="font-syne font-bold text-lg text-[#f59e0b]">Потеря платежеспособных пациентов</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Пациенты гастроэнтерологического профиля вынуждены проходить обследование FibroScan в сторонних клиниках конкурентов. Медицинское учреждение упускает колоссальную выгоду на повторных приемах и сопутствующих анализах крови.
              </p>
              <div className="text-center py-2 text-[#00e5c5] text-xl font-bold font-mono">↓</div>
              <div className="bg-[#00e5c5]/5 border border-[#00e5c5]/20 rounded-xl p-3.5">
                <span className="text-xs text-slate-400 block uppercase font-mono tracking-wider mb-0.5">Эффективное решение:</span>
                <p className="text-xs text-[#00e5c5] font-semibold">Hepatus 5: запустите специализированную диагностику печени на месте и умножьте выручку.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 3: ДЛЯ КОГО ----------------- */}
      <section className="py-20 bg-[#001433] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00e5c5] bg-[#00e5c5]/10 px-3.5 py-1.5 rounded-full">
              Специализации
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Кому нужен <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">Hepatus 5</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-[#00AEEF]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.03] group">
              <span className="text-3.5xl mb-3 group-hover:scale-110 transition duration-350">🫀</span>
              <span className="text-sm font-semibold text-white">Гепатологи</span>
            </div>
            
            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-[#00AEEF]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.03] group">
              <span className="text-3.5xl mb-3 group-hover:scale-110 transition duration-350">🩺</span>
              <span className="text-sm font-semibold text-white">Гастроэнтерологи</span>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-[#00AEEF]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.03] group">
              <span className="text-3.5xl mb-3 group-hover:scale-110 transition duration-350">🏥</span>
              <span className="text-sm font-semibold text-white">Инфекционисты</span>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-[#00AEEF]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.03] group">
              <span className="text-3.5xl mb-3 group-hover:scale-110 transition duration-350">💊</span>
              <span className="text-sm font-semibold text-white">Наркологи</span>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-[#00AEEF]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.03] group">
              <span className="text-3.5xl mb-3 group-hover:scale-110 transition duration-350">🔬</span>
              <span className="text-sm font-semibold text-white">Диагностические центры</span>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-[#00AEEF]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.03] group">
              <span className="text-3.5xl mb-3 group-hover:scale-110 transition duration-350">⚖️</span>
              <span className="text-sm font-semibold text-white">Ожирение / Метаболизм</span>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 4: 6 ПРИЧИН ----------------- */}
      <section className="py-20 bg-[#000d1f] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00AEEF] bg-[#00AEEF]/10 px-3.5 py-1.5 rounded-full">
              Закрываем возражения
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              6 причин выбрать <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">Hepatus 5</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasonsList.map((item, index) => (
              <div 
                key={index} 
                className="relative bg-white/[0.03] border border-[#00AEEF]/15 rounded-3xl p-6 sm:p-8 overflow-hidden group hover:border-[#00AEEF]/50 transform transition-all duration-300 hover:-translate-y-1 block"
              >
                {/* Objections gradient border active on hover */}
                <div className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-[#00AEEF] to-[#00e5c5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 block uppercase mb-4 text-[#8899b0]">
                  Возражение: «{item.objection}»
                </span>
                
                <h4 className="font-syne font-bold text-base sm:text-lg text-white leading-snug mb-3">
                  {item.title}
                </h4>
                
                <p 
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 5: КАК ЭТО РАБОТАЕТ ----------------- */}
      <section className="py-20 bg-[#001433] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00e5c5] bg-[#00e5c5]/10 px-3.5 py-1.5 rounded-full">
              Как это работает
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight animate-fade-in">
              От прихода пациента до <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">диагноза — 5 минут</span>
            </h2>
          </div>

          <div className="relative">
            {/* Pulsing dotted line on desktop */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-[1.5px] border-t-2 border-dashed border-[#00AEEF]/20 pointer-events-none z-0"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {stepsList.map((step, index) => (
                <div key={index} className="space-y-4 text-center lg:text-left bg-white/[0.015] lg:bg-transparent border border-white/5 lg:border-none p-5 lg:p-0 rounded-2xl">
                  {/* Circle number */}
                  <div className="mx-auto lg:mx-0 w-16 h-16 rounded-full bg-[#000d1f] border-2 border-[#00e5c5] flex items-center justify-center shadow-lg shadow-[#00e5c5]/10 text-2xl font-bold select-none">
                    {step.num}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[#00e5c5] uppercase tracking-wider font-bold">Шаг 0{index + 1}</span>
                    <h4 className="font-syne font-bold text-base sm:text-lg text-white">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 6: ХАРАКТЕРИСТИКИ ----------------- */}
      <section className="py-20 bg-[#000d1f] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00AEEF] bg-[#00AEEF]/10 px-3.5 py-1.5 rounded-full">
              Технические данные
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Характеристики <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">Hepatus 5</span>
            </h2>
          </div>

          <div className="bg-white/[0.03] border border-[#00AEEF]/15 rounded-3xl overflow-hidden shadow-2xl">
            <div className="divide-y divide-white/5">
              {specsList.map((spec, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 p-4 sm:p-5 hover:bg-white/[0.015] transition">
                  <div className="sm:col-span-4 text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                    {spec.key}
                  </div>
                  <div className="sm:col-span-8 text-xs sm:text-sm text-white font-medium">
                    {spec.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= ИНТЕРАКТИВНЫЙ РАЗДЕЛ: ТРЕНАЖЕР-СИМУЛЯТОР LIVERSTAGING™ & КАЛЬКУЛЯТОР ROI ================= */}
      <section className="py-20 bg-[#000814] relative border-t border-b border-white/5" id="diagnostic-simulator-roi">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000d1f]/40 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00e5c5]/10 border border-[#00e5c5]/35 text-xs text-[#00e5c5] font-semibold tracking-wide uppercase font-mono leading-none">
              <Sparkles className="w-3.5 h-3.5" />
              Преимущество в действии
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Интерактивный симулятор <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">LiverStaging™ & ROI</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Убедитесь в возможностях Mindray Hepatus 5 лично. Изучите визуализированную диагностику фиброза и стеатоза печени, а затем оцените финансовую состоятельность для вашей клиники.
            </p>
          </div>

          {/* SIMULATOR GRID */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch" id="liver-simulator-block">
            
            {/* 🩺 SIMULATOR 1: ViTE ELASTOGRAPHY (kPa) */}
            <div className="bg-white/[0.02] border border-[#00AEEF]/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#00AEEF]/35 transition duration-300 relative group">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#00AEEF] font-bold uppercase tracking-widest block">Технология ViTE</span>
                    <h3 className="font-syne font-extrabold text-lg sm:text-xl text-white">Мониторинг жесткости (Фиброз)</h3>
                  </div>
                  <span className="text-xs bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20 px-2.5 py-1 rounded-md font-mono font-bold select-none">kPa (кПа)</span>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Перетащите ползунок или нажмите на стадии ниже, чтобы мгновенно смоделировать результат ультразвуковой эластографии сдвиговой волны по шкале METAVIR.
                </p>

                {/* Slider Input */}
                <div className="space-y-2 bg-[#000d1f]/60 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Выбранное значение жесткости:</span>
                    <span className="text-white font-mono font-bold text-base sm:text-lg">{selectedKpa.toFixed(1)} кПа</span>
                  </div>
                  <input 
                    type="range" 
                    min="3.0" 
                    max="18.0" 
                    step="0.1"
                    value={selectedKpa}
                    onChange={(e) => setSelectedKpa(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 select-none">
                    <span>3.0 (F0)</span>
                    <span>7.0 (F1/F2)</span>
                    <span>9.5 (F3)</span>
                    <span>12.5+ (F4)</span>
                  </div>
                </div>

                {/* Preset Fast Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 block">Быстрые пресеты стадий:</span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { l: "F0", v: 4.2 },
                      { l: "F1", v: 6.2 },
                      { l: "F2", v: 8.3 },
                      { l: "F3", v: 11.2 },
                      { l: "F4", v: 14.8 }
                    ].map((ps) => (
                      <button
                        key={ps.l}
                        type="button"
                        onClick={() => setSelectedKpa(ps.v)}
                        className={`py-1.5 text-xs font-mono rounded-lg border transition cursor-pointer select-none text-center ${
                          (ps.l === "F0" && selectedKpa < 5.0) ||
                          (ps.l === "F1" && selectedKpa >= 5.0 && selectedKpa < 7.0) ||
                          (ps.l === "F2" && selectedKpa >= 7.0 && selectedKpa < 9.5) ||
                          (ps.l === "F3" && selectedKpa >= 9.5 && selectedKpa < 12.5) ||
                          (ps.l === "F4" && selectedKpa >= 12.5)
                            ? 'bg-[#00AEEF] text-white border-[#00AEEF]/40 shadow-md scale-105'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {ps.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Results Card */}
              <div className={`mt-6 p-4 rounded-2xl border transition duration-300 ${
                selectedKpa < 5.0 ? 'border-[#00e5c5]/20 bg-[#00e5c5]/5' :
                selectedKpa < 7.0 ? 'border-teal-500/20 bg-teal-500/5' :
                selectedKpa < 9.5 ? 'border-amber-500/20 bg-amber-500/5' :
                selectedKpa < 12.5 ? 'border-orange-500/20 bg-orange-500/5' :
                'border-rose-500/20 bg-rose-500/5'
              }`}>
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-syne font-black text-2xl bg-gradient-to-br select-none ${
                    selectedKpa < 5.0 ? 'from-[#00e5c5]/30 to-[#00e5c5]/10 text-[#00e5c5]' :
                    selectedKpa < 7.0 ? 'from-teal-500/30 to-teal-500/10 text-teal-400' :
                    selectedKpa < 9.5 ? 'from-amber-400/30 to-amber-400/10 text-amber-400' :
                    selectedKpa < 12.5 ? 'from-orange-500/30 to-orange-500/10 text-orange-500' :
                    'from-rose-500/30 to-rose-500/10 text-rose-500'
                  }`}>
                    {selectedKpa < 5.0 ? "F0" :
                     selectedKpa < 7.0 ? "F1" :
                     selectedKpa < 9.5 ? "F2" :
                     selectedKpa < 12.5 ? "F3" : "F4"}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Степень фиброза (METAVIR)</div>
                    <div className={`font-syne font-bold text-sm ${
                      selectedKpa < 5.0 ? 'text-[#00e5c5]' :
                      selectedKpa < 7.0 ? 'text-teal-400' :
                      selectedKpa < 9.5 ? 'text-amber-400' :
                      selectedKpa < 12.5 ? 'text-orange-400' : 'text-rose-400'
                    }`}>
                      {selectedKpa < 5.0 ? "Норма / Изменений нет" :
                       selectedKpa < 7.0 ? "Минимальный (портальный) фиброз" :
                       selectedKpa < 9.5 ? "Умеренный фиброз (выраженный очаг)" :
                       selectedKpa < 12.5 ? "Тяжелый фиброз (септальная форма)" : "Цирроз печени"}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans mt-3 border-t border-white/5 pt-3">
                  {selectedKpa < 5.0 ? "Здоровая ткань печени. Фиброзные изменения отсутствуют. Обычная нормальная паренхима." :
                   selectedKpa < 7.0 ? "Начальное разрастание соединительной ткани. Изменения минимальны, полностью обратимы при грамотной терапии основного фактора." :
                   selectedKpa < 9.5 ? "Прогрессирующий умеренный фиброз. Соединительная ткань формирует первые мостовидные преграды. Необходим надзор гепатолога." :
                   selectedKpa < 12.5 ? "Тяжелый предцирротический фиброз. Структурные мосты нарушают дольчатую анатомию печени. Ограниченное время для терапии!" : 
                   "Необратимая фиброзная перестройка ткани печени с ложными дольками. Высокий риск портальной гипертензии. Регулярный жесткий контроль врача."}
                </p>
              </div>
            </div>

            {/* 📈 SIMULATOR 2: LiSA QUANTITATIVE STEATOSIS (dB/m) */}
            <div className="bg-white/[0.02] border border-[#00e5c5]/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#00e5c5]/35 transition duration-300 relative group">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#00e5c5] font-bold uppercase tracking-widest block">Технология LiSA</span>
                    <h3 className="font-syne font-extrabold text-lg sm:text-xl text-white">Измерение затухания (Стеатоз)</h3>
                  </div>
                  <span className="text-xs bg-[#00e5c5]/10 text-[#00e5c5] border border-[#00e5c5]/20 px-2.5 py-1 rounded-md font-mono font-bold select-none">dB/m (дБ/м)</span>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Перетащите ползунок или нажмите на стадии ниже, чтобы смоделировать раннее накопление жира в тканях печени с цифровой LiSA-оценкой.
                </p>

                {/* Slider Input */}
                <div className="space-y-2 bg-[#000d1f]/60 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Выбранное значение затухания:</span>
                    <span className="text-white font-mono font-bold text-base sm:text-lg">{Math.round(selectedCap)} дБ/м</span>
                  </div>
                  <input 
                    type="range" 
                    min="180" 
                    max="350" 
                    step="1"
                    value={selectedCap}
                    onChange={(e) => setSelectedCap(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00e5c5]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 select-none">
                    <span>180 (S0)</span>
                    <span>240 (S1)</span>
                    <span>265 (S2)</span>
                    <span>295+ (S3)</span>
                  </div>
                </div>

                {/* Preset Fast Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 block">Быстрые пресеты стадий:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { l: "S0", v: 210 },
                      { l: "S1", v: 250 },
                      { l: "S2", v: 280 },
                      { l: "S3", v: 315 }
                    ].map((ps) => (
                      <button
                        key={ps.l}
                        type="button"
                        onClick={() => setSelectedCap(ps.v)}
                        className={`py-1.5 text-xs font-mono rounded-lg border transition cursor-pointer select-none text-center ${
                          (ps.l === "S0" && selectedCap < 240) ||
                          (ps.l === "S1" && selectedCap >= 240 && selectedCap < 265) ||
                          (ps.l === "S2" && selectedCap >= 265 && selectedCap < 295) ||
                          (ps.l === "S3" && selectedCap >= 295)
                            ? 'bg-[#00e5c5] text-slate-900 border-[#00e5c5]/40 shadow-md scale-105 font-bold'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {ps.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Results Card */}
              <div className={`mt-6 p-4 rounded-2xl border transition duration-300 ${
                selectedCap < 240 ? 'border-[#00AEEF]/20 bg-[#00AEEF]/5' :
                selectedCap < 265 ? 'border-teal-500/20 bg-teal-500/5' :
                selectedCap < 295 ? 'border-amber-500/20 bg-amber-500/5' :
                'border-rose-500/20 bg-rose-500/5'
              }`}>
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-syne font-black text-2xl bg-gradient-to-br select-none ${
                    selectedCap < 240 ? 'from-[#00AEEF]/30 to-[#00AEEF]/10 text-[#00AEEF]' :
                    selectedCap < 265 ? 'from-teal-500/30 to-teal-500/10 text-teal-400' :
                    selectedCap < 295 ? 'from-amber-400/30 to-amber-400/10 text-amber-400' :
                    'from-rose-500/30 to-rose-500/10 text-rose-500'
                  }`}>
                    {selectedCap < 240 ? "S0" :
                     selectedCap < 265 ? "S1" :
                     selectedCap < 295 ? "S2" : "S3"}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Степень стеатоза (CAP / затухание)</div>
                    <div className={`font-syne font-bold text-sm ${
                      selectedCap < 240 ? 'text-[#00AEEF]' :
                      selectedCap < 265 ? 'text-teal-400' :
                      selectedCap < 295 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {selectedCap < 240 ? "Норма / Избытка жира нет" :
                       selectedCap < 265 ? "Стеатоз S1 (Легкая степень)" :
                       selectedCap < 295 ? "Стеатоз S2 (Умеренная степень)" : "Стеатоз S3 (Тяжелая дистрофия)"}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans mt-3 border-t border-white/5 pt-3">
                  {selectedCap < 240 ? "Здоровые гепатоциты. Доля жировых включений в ткани менее 5%. Риск развития жирового гепатоза отсутствует." :
                   selectedCap < 265 ? "Накопление триглицеридов в 5–33% клеток печени (простой стеатоз). Полностью обратимое состояние при коррекции диеты." :
                   selectedCap < 295 ? "Жировые вакуоли в 33–66% печеночных клеток. Повышается риск развития стеатогепатита с воспалением соединительной ткани." : 
                   "Выраженная жировая инфильтрация свыше 66% клеток печени. Высокий риск развития фиброза и тяжелого неалкогольного поражения печени!"}
                </p>
              </div>
            </div>

          </div>

          {/* ROI SECTION ACCESSIBILITY MODULE */}
          <div className="grid lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#000d1f] to-[#001433] border border-white/10 rounded-3xl p-6 sm:p-10" id="roi-calculator-block">
            
            {/* Interactive Inputs - Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[#00e5c5] font-extrabold tracking-widest text-[10px] uppercase block font-mono">Финансовая аналитика кабинета</span>
                <h3 className="text-2xl sm:text-3xl font-syne font-extrabold text-white tracking-tight">Калькулятор окупаемости в клиниках</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  Определите личный доход отделения на эластографии. Меняйте число пациентов и клиническую стоимость сканирования с помощью удобных и точных пошаговых кнопок.
                </p>
              </div>

              {/* Input unit 1: Patients per Day */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 uppercase tracking-wider text-[10px] font-bold">Пациентов на скрининг в день</span>
                  <span className="text-[#00e5c5] font-bold">{patientsPerDay} человек</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPatientsPerDay(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-black/40 hover:bg-[#00e5c5]/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center font-syne font-extrabold text-[#00e5c5] text-lg bg-black/60 p-2 rounded-xl border border-white/5 select-none font-mono">
                    {patientsPerDay} пациентов
                  </div>
                  <button
                    type="button"
                    onClick={() => setPatientsPerDay(prev => Math.min(50, prev + 1))}
                    className="w-10 h-10 rounded-xl bg-black/40 hover:bg-[#00e5c5]/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Input unit 2: Price per Scan */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 uppercase tracking-wider text-[10px] font-bold">Средняя стоимость процедуры (ViTE + LiSA)</span>
                  <span className="text-[#00AEEF] font-bold">{pricePerScan.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPricePerScan(prev => Math.max(1000, prev - 500))}
                    className="w-10 h-10 rounded-xl bg-black/40 hover:bg-[#00AEEF]/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center font-syne font-extrabold text-[#00AEEF] text-lg bg-black/60 p-2 rounded-xl border border-white/5 select-none font-mono">
                    {pricePerScan.toLocaleString('ru-RU')} Рублей / сеанс
                  </div>
                  <button
                    type="button"
                    onClick={() => setPricePerScan(prev => Math.min(25000, prev + 500))}
                    className="w-10 h-10 rounded-xl bg-black/40 hover:bg-[#00AEEF]/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 leading-relaxed font-sans italic">
                * Расчет построен с учетом {workDaysPerMonth} рабочих дней в месяц и удержания операционных расходов в размере 15% (амортизация датчиков, гель, медицинская з/п, чистка).
              </div>
            </div>

            {/* Calculative Output Display Card - Right */}
            <div className="lg:col-span-6 bg-black/40 border border-[#00AEEF]/25 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h4 className="font-syne font-extrabold text-sm text-white uppercase tracking-wider">Результаты расчетов</h4>
                  <span className="text-[10px] text-[#00e5c5] bg-[#00e5c5]/15 px-2 py-0.5 rounded-full font-mono font-bold">Оценка прибыли</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Оборот кабинета</span>
                    <div className="text-lg sm:text-2xl font-extrabold text-white font-mono">{monthlyRevenue.toLocaleString('ru-RU')} ₽ <span className="text-xs text-slate-500 block sm:inline">/мес</span></div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Чистая прибыль</span>
                    <div className="text-lg sm:text-2xl font-extrabold text-[#00e5c5] font-mono">{monthlyProfit.toLocaleString('ru-RU')} ₽ <span className="text-xs text-[#00e5c5]/60 block sm:inline">/мес</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Пациентов за год</span>
                    <div className="text-base sm:text-xl font-bold text-slate-200 font-mono">{Math.round(monthlyScans * 12).toLocaleString('ru-RU')} чел.</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Полный возврат инвестиций</span>
                    <div className="text-base sm:text-xl font-bold text-[#00AEEF] font-mono">
                      ~ {paybackMonths} {
                        paybackMonths === 1 ? 'месяц' : 
                        (paybackMonths >= 2 && paybackMonths <= 4) ? 'месяца' : 'месяцев'
                      }
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#00AEEF]/5 rounded-xl border border-[#00AEEF]/15 text-xs text-slate-300 leading-relaxed font-sans">
                  {paybackMonths <= 3 ? (
                    <span className="text-emerald-400 font-semibold">⚡ Сверхбыстрая окупаемость! Высокий спрос на экспертную эластографию гарантирует чистую прибыль уже с первого квартала работы.</span>
                  ) : paybackMonths <= 8 ? (
                    <span className="text-slate-200 font-medium">✅ Клинически выгодная модель. Аппарат полностью окупит вложения и перейдет к генерации чистой прибыли в течение полугода средней загрузки.</span>
                  ) : (
                    <span>ℹ️ Консервативный сценарий. Отличный задел для крупной многопрофильной клиники с размеренным клиническим потоком. Рекомендуется запуск программы лизинга.</span>
                  )}
                </div>
              </div>

              {/* Dynamic CTA trigger inside Calculator */}
              <button
                type="button"
                onClick={scrollCta}
                className="w-full bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] hover:from-[#00c5ef] hover:to-[#00fbc5] text-slate-950 font-syne font-black py-4.5 px-6 rounded-2xl text-xs uppercase tracking-wider text-center cursor-pointer transition-transform duration-200 transform active:scale-98 shadow-xl shadow-[#00e5c5]/20 font-bold"
              >
                Отправить заявку на лизинг под данный расчет
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 7: КОМПЛЕКТАЦИЯ ----------------- */}
      <section className="py-20 bg-[#001433] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00e5c5] bg-[#00e5c5]/10 px-3.5 py-1.5 rounded-full">
              Что вы получаете
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight animate-fade-in">
              Полная <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">комплектация</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {packageList.map((item, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-[#00AEEF]/12 rounded-3xl p-6 flex flex-col gap-3 group hover:border-[#00e5c5]/30 transition duration-300">
                <span className="text-3xl filter saturate-100 group-hover:scale-110 transition duration-300 block w-fit">{item.icon}</span>
                <div className="space-y-1">
                  <h4 className="font-syne font-bold text-white text-base sm:text-lg">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= СЕКЦИЯ 7.5: ЦЕНТР ДОВЕРИЯ, СНЯТИЯ СТРАХОВ И КЛИНИЧЕСКИХ РЕШЕНИЙ (ГЕПАТОЛОГИЯ) ================= */}
      <section className="py-20 bg-gradient-to-b from-[#000814] to-[#011129] relative overflow-hidden text-slate-100" id="hepatus-reassurance-hub">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00AEEF]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00e5c5]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Title & Tab Selector list */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-[#00e5c5] font-extrabold tracking-widest text-[10px] uppercase block font-mono">
                  Снятие рисков & Клинический запуск
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-white leading-tight tracking-tight">
                  Пять жестких ответов экспертов на страхи клиник
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                  Внедрение высокотехнологичной эластометрии на Hepatus 5 — ответственный шаг для медицинского центра. Нажмите вкладку ниже, чтобы увидеть наши реальные правовые, кадровые и финансовые механизмы защиты.
                </p>
              </div>

              {/* Tab Selector Buttons */}
              <div className="space-y-3 pt-2">
                {[
                  { id: 'roi', icon: '💰', label: 'Окупаемость & Сметы', text: '«Инвестиции кажутся высокими / неясна смета?»' },
                  { id: 'sanpin', icon: '🛡️', label: 'СанПиН & Лицензия', text: '«А вдруг ремонт кабинета УЗИ не пройдёт проверку?»' },
                  { id: 'staff', icon: '🧑‍⚕️', label: 'Обучение & Кадры', text: '«Нет профильного врача со знанием эластографии?»' },
                  { id: 'service', icon: '🛠️', label: 'SLA Сервис & Подмена', text: '«Вдруг датчик выйдет из строя посреди записи?»' },
                  { id: 'flow', icon: '📈', label: 'Трафик & Пациенты', text: '«Как загрузить кабинет направлениями из города?»' }
                ].map((tab) => (
                  <div key={tab.id} className="space-y-2 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setHepatusObjectionTab(tab.id as any);
                        logger.info(`Гепатология: переключение вкладки отработки возражений на "${tab.label}"`);
                      }}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl border transition duration-200 cursor-pointer flex items-center justify-between group ${
                        hepatusObjectionTab === tab.id 
                          ? 'bg-[#00e5c5]/10 border-[#00e5c5]/40 text-white shadow-lg shadow-[#00e5c5]/5' 
                          : 'bg-white/[0.015] border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{tab.icon}</span>
                        <div className="space-y-0.5 text-left">
                          <span className="text-[9px] uppercase tracking-wider font-bold block text-[#00e5c5] font-mono">{tab.label}</span>
                          <span className="text-xs sm:text-sm font-bold leading-normal block text-slate-100">{tab.text}</span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${hepatusObjectionTab === tab.id ? 'rotate-90 text-[#00e5c5]' : 'text-slate-600 group-hover:text-slate-400'}`} />
                    </button>

                    {/* Adaptive response displaying only for mobile */}
                    {hepatusObjectionTab === tab.id && (
                      <div className="block lg:hidden bg-[#000d1f] border border-white/10 p-5 rounded-2xl space-y-4 text-left text-slate-350 animate-fade-in">
                        
                        {/* ROO / SMETA MOBILE */}
                        {tab.id === 'roi' && (
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-[#00e5c5] uppercase block font-bold bg-[#00e5c5]/10 w-fit px-2 py-0.5 rounded">Расчет бюджетов</span>
                            <p className="text-xs">
                              Минимальный набор включает планшетную систему и базовую тележку. Начинайте скрининг печени с окупаемостью до 4.5 месяцев при потоке всего 8 человек в день. Запросите готовый лизинговый бизнес-план у наших кураторов.
                            </p>
                          </div>
                        )}

                        {/* SANPIN MOBILE */}
                        {tab.id === 'sanpin' && (
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-[#00AEEF] uppercase block font-bold bg-[#00AEEF]/10 w-fit px-2 py-0.5 rounded">Лицензирование кабинета</span>
                            <p className="text-xs">
                              По нормам Роспотребнадзора УЗИ кабинет должен быть не менее 14 м². Если площадь меньше, мы подготовим медицинское архитектурное деление, чтобы вписать прибор. Наше юридическое РУ Минздрава РФ страхует вас от любых штрафов.
                            </p>
                          </div>
                        )}

                        {/* STAFF MOBILE */}
                        {tab.id === 'staff' && (
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-amber-400 uppercase block font-bold bg-amber-400/10 w-fit px-2 py-0.5 rounded">Повышение квалификации</span>
                            <p className="text-xs">
                              Каждый прибор поставляется с 2 бесплатными квотами на обучение врачей-УЗД. Лицензированный курс 72 часа научит ваших штатных докторов тонкостям попиксельного анализа стеатоза и фиброза за 1 неделю.
                            </p>
                          </div>
                        )}

                        {/* SERVICE MOBILE */}
                        {tab.id === 'service' && (
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-purple-400 uppercase block font-bold bg-purple-400/10 w-fit px-2 py-0.5 rounded">Служба Подмены SLA</span>
                            <p className="text-xs">
                              В случае поломки или повреждения датчика мы высылаем подменный аппарат Hepatus 5 в течение 24-48 часов за свой счет. Ваша медицинская запись не пропадет ни на день.
                            </p>
                          </div>
                        )}

                        {/* FLOW MOBILE */}
                        {tab.id === 'flow' && (
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-[#00e5c5] uppercase block font-bold bg-[#00e5c5]/10 w-fit px-2 py-0.5 rounded">Привлечение трафика</span>
                            <p className="text-xs">
                              Предоставляем готовые бланки реферальных программ для врачей вашего города (гастроэнтерологов, терапевтов, терапевтов детокс) и скрипты для администраторов по экспресс-диагностике гепатоцитов.
                            </p>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Sandbox Bento Grid Board */}
            <div className="hidden lg:flex lg:col-span-7 bg-[#000c1e] border border-white/10 p-8 rounded-3xl min-h-[560px] flex-col justify-between relative overflow-hidden">
              
              {/* TAB 1: ROI & DYNAMIC EQUIPMENT CHECKLIST PLANNER */}
              {hepatusObjectionTab === 'roi' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-[#00e5c5] uppercase bg-[#00e5c5]/10 px-2.5 py-1 rounded font-mono">
                      ФИНАНСОВЫЙ ПЛАНЕР СМЕТЫ
                    </span>
                    <h3 className="text-xl font-syne font-extrabold text-white">Интерактивный планер спецификации кабинета</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Выберите элементы комплектации кабинета эластометрии. Смета пересчитается налету, сопоставив инвестиции с вашими оборотами и потенциальной чистой прибылью.
                    </p>
                  </div>

                  {/* Checklist options */}
                  <div className="space-y-2.5">
                    {[
                      { id: 'console', icon: '💻', text: 'Консоль Mindray Hepatus 5 (РУ Минздрава)', desc: 'Основной планшетный УЗИ-блок, сенсорный Full HD IPS дисплей, пыле-влагозащита', price: 2350000, required: true },
                      { id: 'trolley', icon: '🛒', text: 'Оригинальная стойка-тележка AstMed', desc: 'Держатели геля, встроенный сканер штрихкодов, батарея на 4 часа, скрытые кабели', price: 290000 },
                      { id: 'software', icon: '📈', text: 'Лицензии количественной диагностики гепатотоксичности', desc: 'Авто-лицензия ViTE (фиброз kPa) + LiSA (количественный стеатоз и детекция затухания)', price: 190000 },
                      { id: 'probe', icon: '🔌', text: 'Широкополосный монокристаллический датчик', desc: 'Глубокий попиксельный скрининг сдвиговой волны с обратной связью по давлению', price: 680000 },
                      { id: 'training', icon: '🎓', text: 'Выездной практический курс обучения врачей', desc: '72 часа постановки руки врачей-УЗД / терапевтов с выдачей гос. дипломов', price: 140000 }
                    ].map((item) => {
                      const isChecked = plannerSelectedItems.includes(item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (item.required) return;
                            if (isChecked) {
                              setPlannerSelectedItems(prev => prev.filter(i => i !== item.id));
                            } else {
                              setPlannerSelectedItems(prev => [...prev, item.id]);
                            }
                          }}
                          className={`p-3 rounded-2xl border transition duration-200 text-left flex items-start gap-3 select-none ${
                            item.required ? 'opacity-85 cursor-not-allowed' : 'cursor-pointer'
                          } ${
                            isChecked 
                              ? 'bg-[#00e5c5]/5 border-[#00e5c5]/30 text-white' 
                              : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/[0.03] hover:border-white/10'
                          }`}
                        >
                          <div className="pt-0.5">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                              isChecked ? 'bg-[#00e5c5] border-[#00e5c5] text-slate-950' : 'border-slate-600'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[4]" />}
                            </div>
                          </div>
                          <span className="text-sm shrink-0">{item.icon}</span>
                          <div className="flex-1 space-y-0.5 leading-tight">
                            <span className={`text-xs font-bold font-syne ${isChecked ? 'text-white' : 'text-slate-300'}`}>{item.text}</span>
                            <p className="text-[10px] text-slate-400 font-sans leading-snug">{item.desc}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-mono font-bold text-slate-200">
                              {item.price === 0 ? "Свободно 🎁" : `${item.price.toLocaleString('ru-RU')} ₽`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calculations Output */}
                  <div className="bg-[#001229]/60 p-4.5 rounded-2xl border border-white/10 space-y-3.5">
                    <div className="flex flex-wrap justify-between items-center gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Ориентировочная стоимость комплекта:</span>
                        <div className="text-2xl font-black text-[#00e5c5] font-mono">
                          {plannerSelectedItems.reduce((acc, itemId) => {
                            const prices: Record<string, number> = { console: 2350000, trolley: 290000, software: 190000, probe: 680000, training: 140000 };
                            return acc + (prices[itemId] || 0);
                          }, 0).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Окупаемость при потоке {patientsPerDay} чел/день:</span>
                        <div className="text-xl font-bold text-[#00AEEF] font-mono">
                          ~ {Math.max(1, Math.ceil(
                            plannerSelectedItems.reduce((acc, itemId) => {
                              const prices: Record<string, number> = { console: 2350000, trolley: 290000, software: 190000, probe: 680000, training: 140000 };
                              return acc + (prices[itemId] || 0);
                            }, 0) / Math.max(1, monthlyProfit)
                          ))} {
                            Math.ceil(plannerSelectedItems.reduce((acc, itemId) => {
                              const prices: Record<string, number> = { console: 2350000, trolley: 290000, software: 190000, probe: 680000, training: 140000 };
                              return acc + (prices[itemId] || 0);
                            }, 0) / Math.max(1, monthlyProfit)) <= 1 ? 'месяц' : 
                            Math.ceil(plannerSelectedItems.reduce((acc, itemId) => {
                              const prices: Record<string, number> = { console: 2350000, trolley: 290000, software: 190000, probe: 680000, training: 140000 };
                              return acc + (prices[itemId] || 0);
                            }, 0) / Math.max(1, monthlyProfit)) <= 4 ? 'месяца' : 'месяцев'
                          }
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-between items-center text-[11px] text-slate-400 border-t border-white/5 pt-3">
                      <span>✓ Доступна рассрочка 0% до 18 месяцев по программе AstMed Partner.</span>
                      <button 
                        type="button" 
                        onClick={scrollCta}
                        className="bg-[#00e5c5] hover:bg-[#00fbc5] hover:scale-102 text-slate-950 px-3 py-1.5 rounded-lg font-mono font-bold text-[10px] uppercase transition cursor-pointer select-none border-none shrink-0"
                      >
                        Менеджер КП
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SANPIN & MED-ROOM STANDARDS CHECKER */}
              {hepatusObjectionTab === 'sanpin' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] font-black tracking-widest text-[#00AEEF] uppercase bg-[#00AEEF]/10 px-2.5 py-1 rounded font-mono">
                      ЛИЦЕНЗИОННЫЙ САНПИН СМУЛЯТОР
                    </span>
                    <h3 className="text-xl font-syne font-extrabold text-white">Пройдет ли ваш кабинет экспертизу СанПиН?</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Медицинские кабинеты часто получают предписания и штрафы из-за несоответствия помещений нормам СП 2.1.3678-20. Проверьте ваш кабинет интерактивно:
                    </p>
                  </div>

                  {/* Questionnaire Controls */}
                  <div className="bg-[#00132a]/60 border border-white/10 p-5 rounded-2xl space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300">Площадь кабинета экспресс-эластометрии:</span>
                        <span className="text-[#00e5c5] font-bold">{auditArea} м²</span>
                      </div>
                      <input 
                        type="range"
                        min="8"
                        max="35"
                        step="1"
                        value={auditArea}
                        onChange={(e) => setAuditArea(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00e5c5]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                        <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 block font-bold">Оснащение раковины:</span>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={auditWater}
                            onChange={(e) => setAuditWater(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-600 cursor-pointer accent-[#00AEEF]"
                          />
                          <span className="text-xs text-slate-200 font-sans">Подведена хол/гор вода</span>
                        </label>
                      </div>

                      <div className="space-y-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                        <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 block font-bold">Вентиляция клиники:</span>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={auditVentilation}
                            onChange={(e) => setAuditVentilation(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-600 cursor-pointer accent-[#00AEEF]"
                          />
                          <span className="text-xs text-slate-200 font-sans">Приточно-вытяжная</span>
                        </label>
                      </div>
                    </div>

                    {/* Live Evaluation Box */}
                    <div className="p-4 rounded-xl border border-white/5 space-y-2 text-left bg-black/40">
                      <span className="text-[9px] uppercase font-mono text-slate-400 font-bold block tracking-wider">Предварительный вердикт технолога:</span>
                      
                      <div className="space-y-2 text-xs">
                        {/* Area verdict */}
                        {auditArea < 14 ? (
                          <div className="flex gap-2 items-start text-amber-400">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="leading-snug">
                              <strong>Внимание по площади!</strong> СП 2.1.3678-20 требует площадь кабинета УЗД не менее 14 м². Но если нет зоны раздевания, при грамотном зонировании мы поможем утвердить лицензию на площадях от 12 м².
                            </p>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-start text-emerald-400">
                            <Check className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="leading-snug">
                              <strong>Площадь соответствует!</strong> Площадь {auditArea} м² полностью удовлетворяет санитарно-эпидемиологические требования.
                            </p>
                          </div>
                        )}

                        {/* Water verdict */}
                        {!auditWater && (
                          <div className="flex gap-2 items-start text-rose-400 border-t border-white/5 pt-2">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="leading-snug">
                              <strong>Мокрая точка обязательна!</strong> СанПиН требует подведения проточной воды. Наш инженер бесплатно предоставит ТЗ на вывод мокрой точки в кабинет.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submission form for SanPin advice */}
                  {!auditSubmitted ? (
                    <form onSubmit={handleAuditSubmit} className="grid sm:grid-cols-3 gap-3.5 items-end text-left bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Ваше имя:</label>
                        <input 
                          type="text"
                          required
                          value={auditName}
                          onChange={(e) => setAuditName(e.target.value)}
                          placeholder="Имя главного врача"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#00e5c5] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Телефон для связи:</label>
                        <input 
                          type="tel"
                          required
                          value={auditPhone}
                          onChange={(e) => setAuditPhone(formatPhoneNumber(e.target.value))}
                          placeholder="+7 (999) 999-99-99"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#00e5c5] focus:outline-none"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-[#00e5c5] hover:bg-[#00fbc5] hover:scale-102 transition duration-200 text-slate-950 font-syne font-black text-xs uppercase tracking-wider py-2 rounded-xl text-center cursor-pointer select-none font-bold border-none h-10"
                      >
                        Запросить ТЗ СанПиН
                      </button>
                    </form>
                  ) : (
                    <div className="p-4.5 bg-emerald-950/60 border border-emerald-800 rounded-2xl text-center text-xs sm:text-sm text-emerald-300 animate-fade-in font-medium">
                      ✓ Данные кабинета ({auditArea} м²) приняты медицинским технологом AstMed. Разрабатываем пакет регламентов и чертеж-планировку. Свяжемся с вами в течение 10-15 минут!
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: STAFF TRAINING & DEMO RE-DIPLOMA */}
              {hepatusObjectionTab === 'staff' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] font-black tracking-widest text-amber-400 uppercase bg-amber-400/10 px-2.5 py-1 rounded font-mono">
                      КЛИНИЧЕСКИЙ УЧЕБНЫЙ ЦЕНТР
                    </span>
                    <h3 className="text-xl font-syne font-extrabold text-white">Вы в медицинском центре, а врачи боятся аппарата?</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Эластометрия сдвиговой волны ViTE и количественный стеатоз — новые технологии. Обычно под наем такого специалиста тратятся месяцы. Мы обучаем ваших докторов за 7 дней с выдачей дипломов государственного образца.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2 text-left">
                      <div className="text-amber-400 text-xs font-extrabold flex items-center gap-1.5 font-mono">
                        <GraduationCap className="w-4 h-4" />
                        <span>72 ЧАСА ПРОГРАММЫ</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Лицензированная программа повышения квалификации врачей УЗ-диагностики, терапевтов, гастроэнтерологов. Одобрено Минздравом.
                      </p>
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2 text-left">
                      <div className="text-[#00e5c5] text-xs font-extrabold flex items-center gap-1.5 font-mono">
                        <Sparkles className="w-4 h-4" />
                        <span>ПОЧНАЯ ПОСТАНОВКА РУКИ</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Наш клинический тренер приезжает в ваш медцентр. Отработка IQR/диапазона жесткости на ваших врачах на живом приборе Hepatus 5.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#00AEEF]/5 border border-[#00AEEF]/15 rounded-2xl flex items-center gap-3 text-left">
                    <Award className="w-8 h-8 text-[#00AEEF] shrink-0" />
                    <div>
                      <span className="font-extrabold text-xs text-white block">Диплом ФИС ФРДО в наличии</span>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Все выпускники получают официальное удостоверение о повышении квалификации с обязательным занесением в государственный реестр ФИС ФРДО РФ.
                      </p>
                    </div>
                  </div>

                  {/* Demo day registration form */}
                  {!demoDaySubmitted ? (
                    <form onSubmit={handleDemoSubmit} className="grid sm:grid-cols-3 gap-3.5 items-end text-left bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Контактное имя:</label>
                        <input 
                          type="text"
                          required
                          value={demoName}
                          onChange={(e) => setDemoName(e.target.value)}
                          placeholder="Имя доктора / Директора"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#00e5c5] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Телефон:</label>
                        <input 
                          type="tel"
                          required
                          value={demoPhone}
                          onChange={(e) => setDemoPhone(formatPhoneNumber(e.target.value))}
                          placeholder="+7 (999) 999-99-99"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#00e5c5] focus:outline-none"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] hover:scale-102 hover:shadow-lg transition duration-200 text-slate-950 font-syne font-black text-xs uppercase tracking-wider py-2 rounded-xl text-center cursor-pointer select-none font-bold border-none h-10"
                      >
                        Забронировать демо
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 bg-[#00e5c5]/15 border border-[#00e5c5]/30 rounded-2xl text-center text-xs sm:text-sm text-[#00e5c5] animate-fade-in font-medium">
                      ✓ Вы успешно забронировали демонстрационный день и 2 квоты на бесплатное медицинское переобучение врачей. Менеджер учебного центра свяжется с вами сегодня!
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SERVICE WARRANTY & SLA LOANER */}
              {hepatusObjectionTab === 'service' && (
                <div className="space-y-5 animate-fade-in text-left">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-[#00e5c5] uppercase bg-[#00e5c5]/10 px-2.5 py-1 rounded font-mono">
                      КЛИНИЧЕСКАЯ БЕЗОПАСНОСТЬ 24/7
                    </span>
                    <h3 className="text-xl font-syne font-extrabold text-white">Убытки от простоя медицинского кабинета исключены</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Эластограф стоимостью свыше 2 млн рублей не должен простаивать ни дня — это потеря пациентов и доверия. Наш расширенный SLA контракт фиксирует жесткие технические обязательства.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl relative space-y-2">
                      <div className="text-[#00e5c5] text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>SLA 24 ЧАСА</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Реакция нашей штатной инженерной службы в течение 24 часов на любой запрос. Дистанционная калибровка, выезд на объект по всей РФ в случае аппаратной ошибки.
                      </p>
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl relative space-y-2">
                      <div className="text-[#00AEEF] text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5">
                        <Wrench className="w-4 h-4" />
                        <span>Подменный фонд Care™</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        При сложном гарантийном или постгарантийном ремонте мы привозим и подключаем аналогичную планшетную консоль Hepatus 5 на время ремонта, чтобы ваш поток пациентов прошел без пауз.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#00132a] border border-white/10 rounded-2xl flex items-center gap-3">
                    <ShieldAlert className="w-8 h-8 text-[#00AEEF] shrink-0" />
                    <div>
                      <span className="font-extrabold text-xs text-white block">Полная 3-летняя заводская гарантия</span>
                      <p className="text-[10px] text-slate-400">
                        Гарантия от АстМед распространяется на саму ультразвуковую консоль, а также на механические повреждения датчика давления. Пожизненное обновление ИИ программного обеспечения LiverStaging в подарок.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PATIENT FLOW METRICS & READY MARKETING CHANNELS */}
              {hepatusObjectionTab === 'flow' && (
                <div className="space-y-5 animate-fade-in text-left">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-[#00AEEF] uppercase bg-[#00AEEF]/10 px-2.5 py-1 rounded font-mono">
                      УДВОЕНИЕ ПОТОКА ПАЦИЕНТОВ
                    </span>
                    <h3 className="text-xl font-syne font-extrabold text-white">«Где брать пациентов на УЗ-эластометрию печени?»</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Вам не придется в одиночку рекламировать эластопланы. Мы даем готовые скрипты и клинические промо-материалы для вашего сайта, местных соцсетей и выстраивания связи с городскими врачами.
                    </p>
                  </div>

                  {/* Channel selectors */}
                  <div className="space-y-3.5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block font-bold">Выберите приоритетное направление вашей клиники:</span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'gastro', label: 'Гастроэнтерологи' },
                        { id: 'checkup', label: 'Терапия & Чек-ап' },
                        { id: 'detox', label: 'Детокс & Велнес' }
                      ].map((channel) => (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => setFlowChannelSelected(channel.id)}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border font-syne transition select-none text-center cursor-pointer ${
                            flowChannelSelected === channel.id 
                              ? 'bg-[#00AEEF]/15 border-[#00AEEF]/55 text-white' 
                              : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5'
                          }`}
                        >
                          {channel.label}
                        </button>
                      ))}
                    </div>

                    {/* Channel Description Cards */}
                    <div className="p-4 bg-[#00132a] border border-white/10 rounded-2xl transition duration-300">
                      {flowChannelSelected === 'gastro' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[#00e5c5] font-syne">Кабинет Гепатологии / Гастроэнтерологии</span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">Конверсия до 86%</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            Направление от гастроэнтеролога при подозрении на НАЖБП (Жировой гепатоз печени) является ключевым. Мы предоставляем готовые бланки реферальных карт с уральскими, региональными и федеральными кодами находок METAVIR и стеатозных затуханий, что мотивирует гастроэнтерологов направлять к вам на Mindray Hepatus 5.
                          </p>
                        </div>
                      )}

                      {flowChannelSelected === 'checkup' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[#00AEEF] font-syne">Профилактические Чек-Апы (Терапевт & Эндокринология)</span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">Увеличение чека на УЗИ на +3500 ₽</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            Каждый второй пациент с избыточным весом, диабетом 2-го типа или повышенным холестерином должен регулярно проходить скрининг печени. Мы снабдим ваших администраторов скриптами предложений эластометрии во время звонков или записи на стандартное УЗИ брюшной полости.
                          </p>
                        </div>
                      )}

                      {flowChannelSelected === 'detox' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-amber-400 font-syne">Детокс-программы и Биохакинг / Снижение веса</span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">+180% вовлеченность клиентов</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            Используйте ультрамобильный планшет Hepatus 5 как инструмент оценки До/После лечения. Наглядный попиксельный липидный гепатозный график LiSA помогает пациенту увидеть реальный уход жировых накоплений из печени в ходе вашей детокс-терапии.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-center justify-between pt-1 font-mono text-[10px] text-slate-400">
                    <span>🎁 Бонус: Маркетинговый гайд от AstMed «Как загрузить эластограф на 90% за 14 дней» входит в комплект поставки.</span>
                  </div>
                </div>
              )}

              {/* DYNAMIC METRICS FOOTER ON RIGHT BENTO GRAPHIC */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs font-mono select-none">
                <span className="text-slate-500">Система: Mindray Hepatus 5 PRO</span>
                <span className="text-[#00e5c5] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5c5] animate-ping"></span>
                  Комплексная защита ASTMED LIVING™
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 8: БЛОК ДОВЕРИЯ "О НАС" ----------------- */}
      <section className="py-20 bg-[#000d1f] relative border-t border-slate-900/40" id="astmed-team-trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center text-slate-100 text-left mb-16">
            <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
              <img 
                src="/images/team_aesthet.jpg" 
                alt="Команда Astmed" 
                className="w-full h-auto object-cover rounded-3xl transform transition-transform duration-500 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-[10px] font-mono tracking-widest bg-[#00AEEF]/90 backdrop-blur px-3 py-1.5 rounded-lg font-bold">ОФИС И КОМАНДА ASTMED</span>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#00e5c5]/10 border border-[#00e5c5]/25 px-3 py-1.5 rounded-full text-[#00e5c5] text-xs font-bold uppercase tracking-wider font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00e5c5] animate-pulse"></span>
                Нам доверяют ведущие клиники
              </div>
              
              <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Команда экспертов «Astmed» — <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">Ваша опора</span> на каждом этапе
              </h2>
              
              <p className="text-xs sm:text-base text-slate-350 leading-relaxed font-sans">
                Не просто очередной безликий интернет-магазин с кнопкой «Купить». Каждое поставляемое диагностическое устройство — это долгосрочное партнерство. Наша сертифицированная команда <strong className="text-[#00e5c5] font-semibold">Astmed</strong> состоит из высококлассных инженеров медтехники, сертифицированных клинических специалистов и персональных менеджеров.
              </p>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Мы лично доставляем оборудование по всей России, проводим пусконаладочные работы, осуществляем сертифицированное обучение вашего персонала с выдачей официальных дипломов и обеспечиваем молниеносное сервисное сопровождение 24/7. Покупая у нас, вы защищаете медицинский центр от простоев и получаете довольных пациентов с первого дня!
              </p>
            </div>
          </div>

          {/* 4 REASSURING METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5 select-none">
            <div className="text-center">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">8 лет</div>
              <div className="text-[11px] font-mono text-[#8899b0] uppercase tracking-wider mt-1.5">Прямых продаж РФ</div>
            </div>
            
            <div className="text-center">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">300+</div>
              <div className="text-[11px] font-mono text-[#8899b0] uppercase tracking-wider mt-1.5">Клиник-партнёров</div>
            </div>

            <div className="text-center">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">24 ч</div>
              <div className="text-[11px] font-mono text-[#8899b0] uppercase tracking-wider mt-1.5">Выезд нашего сервиса</div>
            </div>

            <div className="text-center">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent font-mono">100%</div>
              <div className="text-[11px] font-mono text-[#8899b0] uppercase tracking-wider mt-1.5">Белые гос. поставки</div>
            </div>
          </div>

          {/* WHY TRUST US BENTO SUBBLOCK */}
          <div className="mt-16 space-y-8">
            <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white text-center">Почему частные медцентры выбирают нас, а не маркетплейсы?</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustList.map((item, idx) => (
                <div key={idx} className="bg-white/[0.015] border border-white/5 bg-[#00e5c5]/[0.02] border-l-[3px] border-l-[#00e5c5] rounded-2xl p-5 hover:bg-white/[0.03] transition duration-200">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h5 className="font-syne font-bold text-sm sm:text-base text-white">{item.title}</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- СЕКЦИЯ 9: ФИНАЛЬНЫЙ CTA ----------------- */}
      <section className="py-20 bg-gradient-to-br from-[#000509] via-[#000d1f] to-[#001433] relative overflow-hidden" id="cta-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00AEEF]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00e5c5] bg-[#00e5c5]/10 px-3.5 py-1.5 rounded-full">
              Начните сейчас
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Готовы добавить гепатологию <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">в вашу клинику?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Оставьте номер — перезвоним за 15 минут, расскажем как Mindray Hepatus 5 окупается уже в первый месяц работы, и предоставим персональные условия рассрочки / лизинга.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-[#00e5c5]/25 rounded-3xl p-6 sm:p-10 max-w-xl mx-auto backdrop-blur-md">
            
            {/* Form Input Container */}
            <form onSubmit={(e) => onSubmitForm(e, phoneCta, setPhoneCtaError, setPhoneCtaShake)} className="space-y-4 text-left">
              
              <div className="space-y-1">
                <label htmlFor="name-cta" className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">Ваше имя (необязательно):</label>
                <input 
                  type="text"
                  id="name-cta"
                  value={nameCta}
                  onChange={(e) => setNameCta(e.target.value)}
                  placeholder="Иван Иванович"
                  className="w-full bg-[#001229] border border-[#00AEEF]/20 hover:border-[#00e5c5]/40 focus:border-[#00e5c5] text-white rounded-xl py-3.5 px-4 text-sm font-semibold outline-none transition"
                />
              </div>

              <div className={`space-y-1.5 transition-all ${phoneCtaShake ? 'animate-shake' : ''}`}>
                <label htmlFor="phone-cta" className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">Ваш телефон:</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+7</span>
                  <input 
                    type="tel"
                    id="phone-cta"
                    required
                    value={phoneCta}
                    onChange={(e) => handlePhoneChange(e, setPhoneCta)}
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full bg-[#001229] border ${phoneCtaError ? 'border-rose-500 text-rose-300 placeholder-rose-400/50' : 'border-[#00AEEF]/30 hover:border-[#00e5c5]/50 focus:border-[#00e5c5]'} text-white rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold outline-none transition focus:ring-1 focus:ring-[#00e5c5]/20`}
                  />
                </div>
                {phoneCtaError && (
                  <p className="text-rose-500 text-[11px] font-medium">Пожалуйста, введите корректный 11-значный номер телефона</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] text-[#001a3d] hover:brightness-105 active:scale-[0.98] font-bold text-sm py-4 rounded-xl shadow-lg shadow-[#00e5c5]/20 hover:shadow-[#00e5c5]/30 transition duration-300 text-center"
              >
                Получить демонстрацию и расчёт →
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-[#8899b0] text-center block">Перезвоним за 15 минут. Без обязательств.</span>
              </div>

              {/* Urgency countdown indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-xl text-xs text-[#f59e0b] font-medium">
                <Clock className="w-4 h-4 text-[#f59e0b]" />
                <span>Предложение и цены актуальны: {timeLeft.hours}ч {timeLeft.minutes}м {timeLeft.seconds}с</span>
              </div>
            </form>

          </div>

          {/* TRUST BADGES IN CTA SECTION */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs text-slate-400 select-none">
            <span className="flex items-center gap-1.5">✓ CE + FDA</span>
            <span className="flex items-center gap-1.5">✓ Официальные поставки</span>
            <span className="flex items-center gap-1.5">✓ 3 года гарантии</span>
            <span className="flex items-center gap-1.5">✓ Сервисная служба 24/7</span>
          </div>

        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-[#000509] border-t border-white/5 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-3xl mx-auto">
            Mindray Hepatus 5 — диагностическая специализированная ультразвуковая система для оценки состояния печени. 
            Медицинское изделие. Имеются противопоказания. Требуется консультация специалиста.
            Изделие зарегистрировано на территории Российской Федерации. Имеется Регистрационное удостоверение.
            Продажа осуществляется только юридическим лицам и лицензированным медицинским работникам.
          </p>
          <div className="text-[10px] text-slate-600 font-mono tracking-wider">
            © 2025-2026 ООО «АстМед». Все права защищены.
          </div>
        </div>
      </footer>

      {/* ----------------- SUCCESS DIALOG MODAL (id="successModal") ----------------- */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]" 
          id="successModal"
          onClick={() => setShowSuccessModal(false)}
        >
          <div 
            className="bg-[#001433] border border-[#00AEEF]/40 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800"
            >
              ×
            </button>
            
            <div className="mx-auto w-16 h-16 rounded-full bg-[#00e5c5]/10 border-2 border-[#00e5c5] flex items-center justify-center text-3xl">
              🎉
            </div>

            <div className="space-y-2">
              <h3 className="font-syne font-bold text-2xl text-white">Заявка принята!</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Спасибо за интерес к Mindray Hepatus 5! Наш клинический эксперт перезвонит на указанный номер в течение 15 минут для подтверждения времени консультации и расчета окупаемости.
              </p>
            </div>

            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] text-[#001a3d] font-bold py-3.5 rounded-xl text-sm transition hover:scale-[1.02]"
            >
              Отлично
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const packageList = [
  {
    icon: "💻",
    title: "Планшетная консоль Hepatus 5",
    desc: "Ультрамобильный аппарат, 15.6\" сенсорный Full HD IPS дисплей, полная пыле- и влагозащита IP44 для дезинфекции."
  },
  {
    icon: "🔌",
    title: "Датчик эластографии",
    desc: "Широкополосный монокристаллический датчик для попиксельной эластографии печени под живым контролем серой шкалы (B-Mode)."
  },
  {
    icon: "🔑",
    title: "Лицензия ViTE эластографии",
    desc: "Софт ультразвуковой количественной визуализированной транзиентной эластографии реального времени с автовыгрузкой результатов."
  },
  {
    icon: "📈",
    title: "Лицензия LiSA оценки стеатоза",
    desc: "Программное обеспечение количественной детекции затухания УЗ-волны для ранней диагностики жирового гепатоза печени."
  },
  {
    icon: "🛒",
    title: "Мобильная стойка-тележка",
    desc: "Оригинальная тележка со встроенным сканером штрихкодов, держателями геля, убирающимися кабелями и аккумулятором."
  },
  {
    icon: "📄",
    title: "Документы и РУ Минздрава",
    desc: "Полный комплект документов: Регистрационное удостоверение РФ, паспорт изделия, декларация соответствия, инструкции на русском."
  }
];

const trustList = [
  {
    icon: "🧑‍⚕️",
    title: "Клиническое обучение",
    desc: "Официальное обучение в вашей клинике с выдачей официальных дипломов государственного образца."
  },
  {
    icon: "🛠️",
    title: "Инженерный сервис 24/7",
    desc: "Личная оперативная бригада инженеров медтехники, подменный фонд аналогичных аппаратов при ремонте."
  },
  {
    icon: "🚢",
    title: "Прямые белые поставки",
    desc: "Только растаможенные приборы со всей оформленной документацией, таможенными декларациями и РУ."
  },
  {
    icon: "🛡️",
    title: "Гарантия Living Technology™",
    desc: "3 года расширенной гарантии на консоль и бесплатное обновление ИИ-алгоритмов весь срок службы."
  }
];
