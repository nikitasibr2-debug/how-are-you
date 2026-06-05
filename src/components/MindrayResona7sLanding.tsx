import React, { useState, useEffect } from 'react';
import { AstmedTeamBlock } from './AstmedTeamBlock';
import { 
  ArrowLeft, 
  Heart, 
  ArrowRightLeft, 
  Award, 
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
  Clock,
  Shield,
  Plus,
  Minus
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';

interface MindrayResona7sLandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export function MindrayResona7sLanding({
  product,
  articles,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}: MindrayResona7sLandingProps) {
  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // ----------------- STATE MANAGERS -----------------
  const [activeReason, setActiveReason] = useState<number>(0);
  const [showcaseTab, setShowcaseTab] = useState<'imaging' | 'vector' | 'elastography'>('imaging');
  
  // Hero Slider State for Resona 7s with swipe/touch gestures
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroSliderInteracted, setIsHeroSliderInteracted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const heroSlides = [
    {
      url: "/src/assets/images/resona_i9_console_1780456104193.png",
      title: "Эргономичный консольный дизайн Mindray Resona",
      badge: "Консоль Resona 7s",
      desc: "Электрическая регулировка высоты панели, 23.8\" HD LED дисплей и легкое позиционирование."
    },
    {
      url: "/src/assets/images/resona_i9_process_1780456118871.png",
      title: "Высокоточное сканирование в реальном времени",
      badge: "Клинический процесс",
      desc: "Поканальная пиксельная визуализация ZST+ гарантирует стабильный фокус по всей глубине."
    },
    {
      url: "/src/assets/images/hdlive_baby_render_1780455557654.png",
      title: "Интеллектуальная визуализация плода iLive",
      badge: "iLive HD Render",
      desc: "Реалистичное анатомическое затенение и виртуальный источник освещения для пренатального УЗИ."
    },
    {
      url: "/src/assets/images/resona_i9_uma_1780456133535.png",
      title: "Монокристаллические экспертные датчики",
      badge: "Датчики SC5-1U",
      desc: "Сверхвысокая контрастность и проникающая способность для точной онко- и кардиодиагностики."
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
  
  // Timer state (48 hours Countdown)
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 54 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 47, minutes: 59, seconds: 59 }; // Cycle reload
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Form states - Masking and submission
  const [userName, setUserName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bottom form states
  const [bottomName, setBottomName] = useState('');
  const [bottomPhone, setBottomPhone] = useState('');
  const [bottomError, setBottomError] = useState('');
  const [bottomSubmitted, setBottomSubmitted] = useState(false);

  // ROI Calculator states
  const [patientsPerDay, setPatientsPerDay] = useState<number>(12);
  const [pricePerScan, setPricePerScan] = useState<number>(3200);
  const equipmentCost = 3850000; // 3.85m RUB

  // Phone input masker: "+7 (XXX) XXX-XX-XX"
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    let input = e.target.value.replace(/\D/g, ''); // Extract only digits
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.substring(1);
    }
    input = input.substring(0, 10); // Limit size to 10 numerical indices

    let formatted = '+7 ';
    if (input.length > 0) {
      formatted += '(' + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formatted += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formatted += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formatted += '-' + input.substring(8, 10);
    }

    if (input.length === 0) formatted = '';
    setter(formatted);
  };

  // Submit Handler for Top / Middle Form
  const handleTopFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim().length < 2) {
      setFormError('Пожалуйста, укажите имя (минимум 2 буквы)');
      return;
    }
    const cleanPhone = formPhone.replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setFormError('Пожалуйста, введите корректный номер телефона (не менее 10 цифр)');
      return;
    }
    setFormError('');
    setIsSubmitting(true);
    logger.info(`Отправка лид-формы Resona 7s. Имя: ${userName}, Телефон: ${formPhone}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Create global success modal element
      setTimeout(() => {
        const globalModal = document.getElementById('successModal');
        if (globalModal) {
          globalModal.style.display = 'block';
        }
      }, 50);
    }, 1000);
  };

  // Submit Handler for Bottom Form
  const handleBottomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bottomName.trim().length < 2) {
      setBottomError('Пожалуйста, укажите имя (минимум 2 буквы)');
      return;
    }
    const cleanPhone = bottomPhone.replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setBottomError('Пожалуйста, введите корректный номер телефона (не менее 10 цифр)');
      return;
    }
    setBottomError('');
    setIsSubmitting(true);
    logger.info(`Отправка финальной лид-формы Resona 7s. Имя: ${bottomName}, Телефон: ${bottomPhone}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setBottomSubmitted(true);
      setTimeout(() => {
        const globalModal = document.getElementById('successModal');
        if (globalModal) {
          globalModal.style.display = 'block';
        }
      }, 50);
    }, 1000);
  };

  // Scroll to element helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculation parameters
  const monthlyRevenue = Math.round(patientsPerDay * pricePerScan * 24); // 24 working days/month
  const monthlyProfit = Math.round(monthlyRevenue * 0.85); // 85% net margin (overhead: 15% gel, cleaning, taxes)
  const ROIMonths = Number((equipmentCost / Math.max(monthlyProfit, 1)).toFixed(1));

  // ----------------- CONTENT ARRAYS -----------------
  const audiences = [
    {
      title: 'Ультразвуковые диагносты (Радиологи)',
      icon: Eye,
      text: 'Исключительная плотность точек фокусировки за счет революционной ZST+ платформы. Нет необходимости вручную настраивать фокусные зоны — идеальная детализация по всей глубине сканирования до 40 см.',
      bonus: 'Режим DPF (пиксельная фокусировка)'
    },
    {
      title: 'Врачам Акушерам-Гинекологам',
      icon: Baby,
      text: 'Инновационный пакет iLive с реалистичным объемным затенением плода, Smart Fetal для автоматического биометрического измерения и Smart Planes CNS для быстрой 3D оценки головного мозга.',
      bonus: 'Сверхточная фетометрия'
    },
    {
      title: 'Сосудистым и кардиологам',
      icon: HeartPulse,
      text: 'Уникальная векторная визуализация Vector Flow (V Flow) дает полное понимание гемодинамики и вихревых потоков, которое невозможно получить в классическом цветовом допплере.',
      bonus: 'Гемодинамический векторный анализ'
    },
    {
      title: 'Учредителям клиник & Директорам',
      icon: Building,
      text: 'Payback-период на 40% короче благодаря высочайшей пропускной способности. Солидный премиальный статус аппарата привлекает платежеспособных пациентов.',
      bonus: 'Расширенная 5-летняя гарантия'
    }
  ];

  const reasons = [
    {
      title: 'Беспрецедентная скорость зонного сканирования ZST+',
      text: 'Зонная технология Zone Sonography Technology+ осуществляет сбор сырых данных в 10 раз быстрее традиционных систем с формированием сфокусированных лучей. Когерентный синтетический фокус настраивается поканально на уровне пикселей.'
    },
    {
      title: 'Уникальный допплеровский анализ Vector Flow (V Flow)',
      text: 'Отображает точную скорость и физическое направление кровотока в виде векторов. Позволяет оценивать распределение турбулентных завихрений у стенок сонных артерий и крупных сосудов.'
    },
    {
      title: 'Экспертная компрессионная и сдвиговая эластография STE/STQ',
      text: 'Технология HiFR Sound Touch Elastography с непревзойденной частотой кадров предоставляет мгновенную количественную оценку абдоминальных и поверхностных опухолей в кПа со стабильным "Shell"-анализом.'
    },
    {
      title: 'Интеллектуальные ИИ-планы автоматизации',
      text: 'Smart Planes CNS (ИИ-анализ ЦНС плода одним нажатием снижает время исследования на 80%), Smart HRI (умный расчет индекса стеатоза печени для раннего выявления жирового гепатоза).'
    },
    {
      title: 'Эксклюзивная гарантия 5 лет от дистрибьютора АСТМЕД',
      text: 'Полное техническое и сервисное прикрытие от сертифицированного штата инженеров на территории всей Российской Федерации. Предоставляем подменный аппарат при наступлении гарантийного случая.'
    },
    {
      title: 'Программа бессрочного обновления Living Technology™',
      text: 'При покупке Resona 7s вы застрахованы от морального устаревания системы. Все выпускаемые обновления базового ПО и ИИ-алгоритмов поставляются бесплатно в течение всего жизненного цикла аппарата.'
    },
    {
      title: 'Полный комплект документов и Регистрационное Удостоверение',
      text: 'Аппарат поставляется со 100% легальным пакетом таможенной документации, Декларацией о соответствии и действующим Регистрационным Удостоверением (РУ) Минздрава РФ для прохождения любой лицензионной проверки.'
    }
  ];

  const probes = [
    {
      name: 'SC5-1U Single Crystal Convex',
      type: 'Монокристаллический конвексный',
      desc: 'Диапазон частот 1.2 – 6.0 МГц. Поддержка ультразвуковой томографии, контрастных сред UWN+ и эластографии сдвиговой волны STE.',
      app: 'Абдоминальные исследования, Акушерство, Гинекология, Глубокие сосуды'
    },
    {
      name: 'L11-3U High-density Linear',
      type: 'Линейный высокой плотности',
      desc: 'Диапазон частот 3.0 – 11.0 МГц. Великолепное разрешение мелких поверхностных структур, щитовидной железы, молочных желез.',
      app: 'Поверхностные органы, Маммология, Эндокринология, Скелетно-мышечная система'
    },
    {
      name: 'SP5-1U Single Crystal Phased',
      type: 'Монокристаллический секторный фазированный',
      desc: 'Диапазон частот 1.1 – 4.4 МГц. Высочайшее временное разрешение для взрослых кардиологических исследований.',
      app: 'Экспертная кардиология, Транскраниальные допплеровские исследования'
    },
    {
      name: 'V11-3HU Endocavity Volume',
      type: 'Микроконвексный внутриполостной объемный 3D/4D',
      desc: 'Широкое поле обзора до 160°. Высокоточное трансвагинальное и трансректальное 3D сканирование с высокой частотой кадров.',
      app: 'Раннее пренатальное УЗИ, Акушерство, Экспертная гинекология, Урология'
    }
  ];

  const packageItems = [
    { title: 'Консоль Mindray Resona 7s', desc: 'Стационарная премиальная система на поворотных колесах с тормозной системой' },
    { title: 'Монитор 23.8" LED HD', desc: 'Ультратонкий Full HD дисплей на плавающем шарнирном кронштейне dual-wing' },
    { title: 'Тач-скрин 13.3" IPS', desc: 'Вспомогательный наклонный экран управления со считыванием жестов пальцев' },
    { title: 'Комплект из 3-4 экспертных датчиков', desc: 'Конвексный, линейный и внутриполостной оригинальные датчики высокого класса' },
    { title: 'РУ Минздрава РФ', desc: 'Регистрационное удостоверение, формуляры, таможенные декларации и договор поставки' },
    { title: 'Монтаж, пусконаладка и обучение', desc: 'Инженерный выезд, юстировка калибровки на месте, мастер-класс и сертификаты для персонала' }
  ];

  return (
    <div className="bg-[#000d1f] text-slate-300 font-sans selection:bg-[#00e5c5]/20 selection:text-white" id="resona7s-landing-root">
      
      {/* breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={onBackToCatalog}
            className="flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 transition group cursor-pointer border border-slate-200 bg-white py-2 px-4 rounded-xl hover:bg-slate-50 text-xs font-bold shrink-0 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Вернуться в каталог
          </button>
          <div className="text-xs text-slate-400 font-medium font-sans flex items-center gap-1.5 flex-wrap px-1">
            <span onClick={onBackToCatalog} className="hover:text-white hover:underline transition cursor-pointer">Главная</span>
            <span className="text-slate-500">/</span>
            <span onClick={onBackToCatalog} className="hover:text-white hover:underline transition cursor-pointer">Каталог</span>
            <span className="text-slate-500">/</span>
            <span onClick={onBackToCatalog} className="hover:text-white hover:underline transition cursor-pointer">УЗИ Mindray</span>
            <span className="text-slate-500">/</span>
            <span className="font-bold text-slate-200 truncate max-w-[240px] sm:max-w-none">{product.name}</span>
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

      {/* ================= SECTION 1: HERO CONTAINER ================= */}
      <section className="relative px-4 py-8 sm:py-16 md:py-24 overflow-hidden" id="resona7s-hero">
        {/* Animated glow decorations */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#00AEEF]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#00e5c5]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Pitching details (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Эксклюзивное предложение от АСТМЕД</span>
            </div>

            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-none tracking-tight">
              Mindray <span className="bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] bg-clip-text text-transparent">Resona 7s</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-sans font-light">
              Ультразвуковая система экспертного класса на платформе <strong className="text-white">ZST+</strong>. Поканальная пиксельная визуализация без мертвых зон и экспертные ИИ-протоколы автоматизации для уверенного онкопоиска.
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
                className="relative h-[240px] sm:h-[320px] bg-[#000d1f]/90 rounded-[18px] overflow-hidden flex items-center justify-center transition-all duration-300 select-none"
                key={currentHeroSlide}
                onMouseEnter={() => setIsHeroSliderInteracted(true)}
              >
                <img 
                  src={heroSlides[currentHeroSlide].url} 
                  alt={heroSlides[currentHeroSlide].title} 
                  className="max-h-full max-w-full object-contain hover:scale-[1.03] transition-transform duration-505 p-2"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />

                {/* Glass Badge Overlay */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-[#00e5c5]/35 font-mono text-[9px] uppercase tracking-wider text-[#00e5c5] px-2.5 py-1 rounded-md font-bold">
                  {heroSlides[currentHeroSlide].badge}
                </div>

                {/* Left/Right Arrow Buttons (hidden on touch on simple devices if swiping, but highly visible for desktop hover UX) */}
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000d1f] via-[#000d1f]/75 to-transparent p-3 sm:p-4 text-left">
                  <h4 className="font-syne font-bold text-xs sm:text-sm text-white leading-tight">
                    {heroSlides[currentHeroSlide].title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1 font-sans">
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

            {/* Crucial conversion rules: 3-4 micro-benefits before CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-[#00e5c5] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium"><strong>5 лет гарантии</strong> с подменным аппаратом</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-[#00e5c5] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium"><strong>Лизинг под 0%</strong> (аванс от 10%)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-[#00e5c5] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium"><strong>Живой выезд инженера</strong> для ПНР и калибровки</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-[#00e5c5] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium">Бесплатная экспресс-доставка по РФ</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-4">
              <button
                onClick={() => scrollToId('resona7s-specs')}
                className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-[#00e5c5]/30 text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase transition-all duration-300 text-center cursor-pointer"
              >
                Технические Спецификации
              </button>
              <button
                onClick={() => scrollToId('resona7s-calc')}
                className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-[#00e5c5]/30 text-[#00e5c5] hover:bg-[#00e5c5]/5 font-semibold text-xs tracking-wider uppercase transition-all duration-300 text-center cursor-pointer"
              >
                Калькулятор Окупаемости
              </button>
            </div>
          </div>

          {/* Form and Urgency elements (Col 5) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/3 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
              
              {/* Urgency constraint - orange font 48h indicator */}
              <div className="bg-[#ff9f43]/10 border border-[#ff9f43]/20 text-[#ff9f43] p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 animate-pulse shrink-0" />
                  <span className="font-bold">СПЕЦПРЕДЛОЖЕНИЕ ДЕЙСТВИТЕЛЬНО:</span>
                </div>
                <div className="font-mono text-sm tracking-widest font-bold whitespace-nowrap bg-[#000d1f]/75 px-2.5 py-1 rounded border border-[#ff9f43]/30">
                  {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#00AEEF] font-bold text-xs uppercase tracking-wider block">Запрос коммерческого предложения</span>
                <h3 className="text-lg font-syne font-extrabold text-white">Эксклюзивная цена по РФ</h3>
                <p className="text-xs text-slate-405 text-slate-400">Заполните поля, чтобы закрепить за вашей клиникой индивидуальную скидку и бесплатный комплект датчиков.</p>
              </div>

              {/* Form implementation */}
              <form onSubmit={handleTopFormSubmit} className="space-y-4">
                {formError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 text-xs rounded-lg font-medium">
                    {formError}
                  </div>
                )}
                {isSubmitted ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 p-4 text-center rounded-2xl space-y-2">
                    <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                    <div className="font-bold text-sm">Заявка успешно принята!</div>
                    <p className="text-[11px] text-slate-350">Наш эксперт уже формирует спецификацию с учетом скидки и свяжется с вами.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Ваше имя</label>
                      <input 
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Например, доктор Александр" 
                        className="w-full bg-[#000d1f]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00e5c5] transition"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Телефон постоянной связи</label>
                      <input 
                        type="tel" 
                        value={formPhone}
                        onChange={(e) => handlePhoneChange(e, setFormPhone)}
                        placeholder="+7 (___) ___-__-__" 
                        className="w-full bg-[#000d1f]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00e5c5] transition"
                        required
                      />
                    </div>
                    
                    {/* BUTTON DESIGN: Gradient var(--accent) to var(--accent2), 700 bold */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] text-[#001a3d] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:opacity-90 transform active:scale-[0.98] transition-all cursor-pointer"
                    >
                      {isSubmitting ? 'Формирование КП...' : 'Получить экспертное КП'}
                    </button>

                    {/* FEAR REDUCTION INDICATOR */}
                    <p className="text-[10px] text-center text-slate-450 text-slate-400">
                      🔒 Без навязчивых звонков и спама • Спецификация за 10 минут
                    </p>
                  </>
                )}
              </form>

            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 2: FOR WHOM / TARGET AUDIENCE ================= */}
      <section className="py-16 sm:py-20 px-4 bg-[#001433]/40 border-t border-white/5" id="resona7s-target">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[#00AEEF] font-extrabold tracking-widest text-xs uppercase block">Целевые Клинические Группы</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-white tracking-tight leading-none">
              Разработано для эксперной практики
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Каждый доктор находит в Resona 7s решение многолетних профессиональных болей и рутинных ограничений
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((aud, idx) => {
              const AudIcon = aud.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/3 border border-white/10 rounded-[20px] p-6 flex flex-col justify-between hover:border-[#00AEEF]/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#00AEEF] to-[#00e5c5] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00AEEF]/10 flex items-center justify-center text-[#00AEEF]">
                      <AudIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-syne font-extrabold text-white leading-tight">
                      {aud.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {aud.text}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-bold text-[#00e5c5] flex lg:justify-between items-center gap-1 uppercase tracking-wider">
                    <span>Спец-модуль:</span>
                    <span className="text-white text-right font-sans lowercase first-letter:uppercase">{aud.bonus}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 3: 7 REASONS / CONCRETE BENEFITS ================= */}
      <section className="py-16 sm:py-20 px-4" id="resona7s-reasons">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-[#00e5c5] font-extrabold tracking-widest text-xs uppercase block">Качество без компромиссов</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-white">
              7 ключевых преимуществ Resona 7s
            </h2>
            <p className="text-xs sm:text-sm text-slate-404 text-slate-400">
              Покупая оригинальную систему у прямого дистрибьютора АСТМЕД, вы приобретаете уверенность в диагнозе
            </p>
          </div>

          {/* Premium Accordion Menu */}
          <div className="space-y-3.5">
            {reasons.map((reason, idx) => (
              <div 
                key={idx}
                className="bg-white/3 border border-white/10 transition-all rounded-[20px] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveReason(activeReason === idx ? -1 : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-[#00AEEF]/10 border border-[#00AEEF]/20 font-mono text-xs font-bold text-[#00AEEF] flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="font-syne font-bold text-xs sm:text-sm text-white md:tracking-tight">
                      {reason.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${activeReason === idx ? 'rotate-90 text-[#00e5c5]' : ''}`} />
                </button>

                {activeReason === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-350 leading-relaxed font-sans border-t border-white/5 bg-[#001433]/20">
                    {reason.text}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 4: WOW FEATURE OVERVIEWS ================= */}
      <section className="py-16 sm:py-20 px-4 bg-[#001433]/40 border-t border-b border-white/5" id="resona7s-wow">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[#00AEEF] font-extrabold tracking-widest text-xs uppercase block">Высокие Технологии</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-white">
              Революция диагностической точности
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Фундаментальные инновации, выводящие стандартную ультразвуковую оценку на качественно иной уровень
            </p>
          </div>

          {/* Tab Showcase Selector */}
          <div className="flex justify-center gap-1.5 sm:gap-3 flex-nowrap overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => setShowcaseTab('imaging')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase whitespace-nowrap transition cursor-pointer ${showcaseTab === 'imaging' ? 'bg-[#00e5c5] text-[#000d1f]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
            >
              🌌 Платформа ZST+
            </button>
            <button
              onClick={() => setShowcaseTab('vector')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase whitespace-nowrap transition cursor-pointer ${showcaseTab === 'vector' ? 'bg-[#00e5c5] text-[#000d1f]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
            >
              🌊 Векторный кровоток V-Flow
            </button>
            <button
              onClick={() => setShowcaseTab('elastography')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase whitespace-nowrap transition cursor-pointer ${showcaseTab === 'elastography' ? 'bg-[#00e5c5] text-[#000d1f]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
            >
              🔥 Эластография сдвиговой волны
            </button>
          </div>

          {/* Interactive display details */}
          <div className="bg-white/3 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-inner">
            {showcaseTab === 'imaging' && (
              <div className="grid lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-7 space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center font-mono font-bold text-xs">A</div>
                  <h3 className="text-lg font-syne font-extrabold text-white">Поканальная обработка данных Zone Sonography Technology+</h3>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                    Традиционные УЗИ аппараты ограничены возможностью одновременного фокусирования лучей, создавая зоны размытия вверху и внизу экрана. Платформа ZST+ собирает "живой" массив акустических данных широкими зонами и проводит попиксельный программный фокус.
                  </p>
                  <ul className="space-y-2 text-xs font-medium text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Скорость сбора данных выросла на 700%</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Автоматическое сохранение акустических кадров для повторного анализа</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Отсутствие слепых артефактных зон на глубинах более 30 см</li>
                  </ul>
                </div>
                <div className="lg:col-span-5 bg-[#000d1f]/85 p-4 rounded-2xl border border-white/5">
                  <div className="aspect-[4/3] bg-slate-950/90 rounded-lg overflow-hidden flex flex-col justify-center items-center text-center p-3">
                    <span className="text-[#00e5c5] font-mono text-[9px] uppercase tracking-widest font-bold">ПОКАЗАТЕЛЬ СРАВНЕНИЯ</span>
                    <div className="text-3xl font-extrabold text-white my-3">до 40 см</div>
                    <span className="text-xs text-slate-400">Глубина стабильного попиксельного фокуса без ручной регулировки зон</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'vector' && (
              <div className="grid lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-7 space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center font-mono font-bold text-xs">B</div>
                  <h3 className="text-lg font-syne font-extrabold text-white">Векторный анализ V Flow (Vector Flow)</h3>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                    Революционная технология качественной оценки локальной гемодинамики в крупных сосудах. Отображает реальные завихрения и ламинарные течения со скоростными характеристиками во всем сечении просвета, а не одномерную проекцию.
                  </p>
                  <ul className="space-y-2 text-xs font-medium text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Точный допплеровский расчет без зависимости от угла инсонации</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Изучение гемодинамических векторов в любой фазе сердечного цикла</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Ранний скрининг атеросклеротического риска</li>
                  </ul>
                </div>
                <div className="lg:col-span-5 bg-[#000d1f]/85 p-4 rounded-2xl border border-white/5">
                  <div className="aspect-[4/3] bg-slate-950/90 rounded-lg overflow-hidden flex flex-col justify-center items-center text-center p-3">
                    <span className="text-[#00e5c5] font-mono text-[9px] uppercase tracking-widest font-bold">УГЛОВАЯ ЧУВСТВИТЕЛЬНОСТЬ</span>
                    <div className="text-3xl font-extrabold text-white my-3">0° - 360°</div>
                    <span className="text-xs text-slate-400">Векторный анализ кровотока под любыми углами в фазе завихрения</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'elastography' && (
              <div className="grid lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-7 space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center font-mono font-bold text-xs">C</div>
                  <h3 className="text-lg font-syne font-extrabold text-white">Экспертное онкодифференцирование с HiFR STE</h3>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                    Sound Touch Elastography высокого темпа кадров обеспечивает количественный контроль жесткости образований в режиме реального времени. Система предоставляет карты надежности измерений и уникальный ИИ-расчет BI-RADS/TI-RADS.
                  </p>
                  <ul className="space-y-2 text-xs font-medium text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Оценка фиброза печени по шкале METAVIR за секунды</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Проведение точной биопсии под эластографическим контролем</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00e5c5]" /> Стабильная Shell-метка по краям узелковых скоплений</li>
                  </ul>
                </div>
                <div className="lg:col-span-5 bg-[#000d1f]/85 p-4 rounded-2xl border border-white/5">
                  <div className="aspect-[4/3] bg-slate-950/90 rounded-lg overflow-hidden flex flex-col justify-center items-center text-center p-3">
                    <span className="text-[#00e5c5] font-mono text-[9px] uppercase tracking-widest font-bold">ТОЧНОСТЬ И ОЦЕНКА</span>
                    <div className="text-3xl font-extrabold text-white my-3">99.2%</div>
                    <span className="text-xs text-slate-400">Сходимость результатов STE эластографии со стандартной инвазивной биопсией</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ================= SECTION 5: TECHNICAL SPECIFICATIONS ================= */}
      <section className="py-16 sm:py-20 px-4" id="resona7s-specs">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[#00e5c5] font-extrabold tracking-widest text-xs uppercase block">Эргономичный Дизайн и Железо</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-white">
              Технические характеристики
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Высокотехнологичный конструктив системы продуман для многочасовой эргономичной работы без усталости кистей врача
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Spec Card 1 */}
            <div className="bg-[#001433]/30 border border-white/10 rounded-[20px] p-5 space-y-3">
              <span className="text-xs font-bold text-[#00AEEF]">01 / Монитор</span>
              <h4 className="font-syne font-extrabold text-sm text-white">23.8" HD LED дисплей</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Медицинский монитор со светодиодной антибликовой подсветкой на вращающемся многофункциональном кронштейне dual-wing arm высокого диапазона настроек.
              </p>
            </div>

            {/* Spec Card 2 */}
            <div className="bg-[#001433]/30 border border-white/10 rounded-[20px] p-5 space-y-3">
              <span className="text-xs font-bold text-[#00AEEF]">02 / Интерфейс</span>
              <h4 className="font-syne font-extrabold text-sm text-white">13.3" IPS Тач-панель</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Сенсорный экран с тонкой регулировкой угла наклона и поддержкой мультисенсорных жестовых команд (зум, выбор режима, сдвиг треков одним пальцем).
              </p>
            </div>

            {/* Spec Card 3 */}
            <div className="bg-[#001433]/30 border border-white/10 rounded-[20px] p-5 space-y-3">
              <span className="text-xs font-bold text-[#00AEEF]">03 / Архитектура</span>
              <h4 className="font-syne font-extrabold text-sm text-white">4 активных порта</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Высокочувствительные разъемы с датчиками автоблокировки и подсветкой активного гнезда для сохранения контактов и быстрого перехода.
              </p>
            </div>

            {/* Spec Card 4 */}
            <div className="bg-[#001433]/30 border border-white/10 rounded-[20px] p-5 space-y-3">
              <span className="text-xs font-bold text-[#00AEEF]">04 / Маневренность</span>
              <h4 className="font-syne font-extrabold text-sm text-white">Эргопанель iConsole</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Регулируемая по высоте и углу выдвижения клавиатура с бесшумным ходом клавиш и защитой от попадания капель физиологических гелей.
              </p>
            </div>

          </div>

          {/* Expanded full specs list */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Производитель:</span>
                <span className="text-white font-semibold">Mindray Medical Solutions (КНР)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Модель:</span>
                <span className="text-white font-semibold">Resona 7s Expert</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Программная база:</span>
                <span className="text-white font-semibold">Living Technology™ (обновление бесплатно)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">УЗИ платформы:</span>
                <span className="text-white font-semibold">ZST+ (Zone Sonography Technology)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Режимы обзора:</span>
                <span className="text-white font-semibold">B, M, Color, DPI, PW, CW, STE, V-Flow, 3D/4D</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Встроенный ИИ:</span>
                <span className="text-white font-semibold">Smart CNS, Smart HRI, iPage, Smart Fetal</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Регулировка панели:</span>
                <span className="text-white font-semibold">Электрический лифт по высоте и смещению</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Регистрационный статус:</span>
                <span className="text-white font-semibold">РУ Минздрава РФ действующее</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 6: PROBES / TRANSDUCERS ================= */}
      <section className="py-16 sm:py-20 px-4 bg-[#001433]/40 border-t border-b border-white/5" id="resona7s-probes">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[#00e5c5] font-extrabold tracking-widest text-xs uppercase block">Высокотехнологичный кристалл</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-white">
              Экспертная линейка оригинальных датчиков
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Оригинальные монокристаллические датчики обеспечивают идеальный проникающий сигнал у тучных пациентов
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {probes.map((probe, idx) => (
              <div 
                key={idx}
                className="bg-white/3 border border-white/10 rounded-[20px] p-6 hover:border-[#00e5c5]/50 hover:bg-[#001433]/20 transition-all duration-300 space-y-4"
              >
                <div className="flex justify-between items-center bg-[#000d1f] p-3 rounded-xl border border-white/5">
                  <div className="font-syne font-extrabold text-sm text-white">{probe.name}</div>
                  <span className="text-[10px] bg-[#00AEEF]/20 text-[#00AEEF] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">{probe.type}</span>
                </div>
                <p className="text-xs text-slate-450 text-slate-400 font-sans leading-relaxed">
                  {probe.desc}
                </p>
                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-300 font-sans">
                  <strong className="text-[#00e5c5] uppercase tracking-wider text-[10px] block mb-1">Применение:</strong>
                  {probe.app}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 7: PACKAGE CONTENTS & DELIVERY ================= */}
      <section className="py-16 sm:py-20 px-4" id="resona7s-package">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[#00AEEF] font-extrabold tracking-widest text-xs uppercase block">Комплектация под ключ</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-white">
              Что входит в комплект поставки
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Полноценная лицензионная сборка и полное дооснащение расходниками под стандарты лицензирования Минздрава РФ
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#001433]/30 border border-white/10 rounded-[20px] p-6 space-y-3 relative group overflow-hidden"
              >
                <div className="w-8 h-8 rounded-full bg-[#00e5c5]/10 flex items-center justify-center text-[#00e5c5] font-mono text-xs font-bold">
                  {idx + 1}
                </div>
                <h4 className="font-syne font-extrabold text-xs sm:text-sm text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= ROI CALCULATOR SECTION ================= */}
      <section className="py-16 sm:py-20 px-4 bg-[#001433]/40 border-t border-b border-white/5" id="resona7s-calc">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls - Col 6 with beautiful button-steppers instead of annoying sliders */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[#00e5c5] font-extrabold tracking-widest text-[10px] uppercase block">Оценка фин-рисков и окупаемости</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-syne font-extrabold text-white tracking-tight">
                Интерактивный калькулятор окупаемости
              </h2>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Рассчитайте окупаемость, сменив число пациентов и стоимость сканирования. Нет скользящих шкал — удобная и точная оценка кликабельными шагами кнопки.
              </p>
            </div>

            {/* Stepper patient controller */}
            <div className="bg-white/3 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">Количество пациентов в день</span>
                <span className="text-[#00AEEF] font-extrabold">{patientsPerDay} человек</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPatientsPerDay(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-lg bg-[#000d1f]/60 hover:bg-[#00AEEF]/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-syne font-extrabold text-[#00e5c5] text-lg bg-[#000d1f] p-2 rounded-lg border border-white/5 select-none">
                  {patientsPerDay} пациентов
                </div>
                <button
                  type="button"
                  onClick={() => setPatientsPerDay(prev => Math.min(50, prev + 1))}
                  className="w-10 h-10 rounded-lg bg-[#000d1f]/60 hover:bg-[#00e5c5]/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stepper price controller */}
            <div className="bg-white/3 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">Средняя стоимость УЗИ сканирования</span>
                <span className="text-[#00e5c5] font-extrabold">{pricePerScan.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPricePerScan(prev => Math.max(1000, prev - 200))}
                  className="w-10 h-10 rounded-lg bg-[#000d1f]/60 hover:bg-[#00AEEF]/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-syne font-extrabold text-[#00AEEF] text-lg bg-[#000d1f] p-2 rounded-lg border border-white/5 select-none">
                  {pricePerScan.toLocaleString('ru-RU')} Рублей / сеанс
                </div>
                <button
                  type="button"
                  onClick={() => setPricePerScan(prev => Math.min(15000, prev + 200))}
                  className="w-10 h-10 rounded-lg bg-[#000d1f]/60 hover:bg-[#00e5c5]/20 border border-[#00e5c5]/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 italic">
              * Расчет произведен с учетом 24 рабочих смен в месяц и операционных накладных расходов в размере 15% (гель, амортизация датчиков, уборка).
            </div>
          </div>

          {/* Results Display - Col 6 */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-r from-slate-950 to-[#001433] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-syne font-extrabold text-sm text-white uppercase tracking-wider border-b border-white/5 pb-3">Результат Расчетов</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Прогнозируемый оборот</span>
                  <div className="text-base sm:text-lg font-extrabold text-white">{monthlyRevenue.toLocaleString('ru-RU')} ₽ <span className="text-xs text-slate-400">/мес</span></div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Чистая прибыль клиники</span>
                  <div className="text-base sm:text-lg font-extrabold text-[#00e5c5]">{monthlyProfit.toLocaleString('ru-RU')} ₽ <span className="text-xs text-slate-400">/мес</span></div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-medium">Стоимость окупаемого оборудования:</span>
                  <span className="text-xs font-bold text-white">3 850 000 ₽</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2">
                  <span className="text-xs text-slate-300 font-medium">Период полной самоокупаемости:</span>
                  <span className="text-xs font-bold text-[#00AEEF]">~ {ROIMonths} мес.</span>
                </div>
              </div>

              <div className="text-center">
                {ROIMonths < 6 ? (
                  <div className="text-xs font-bold text-[#00e5c5] bg-[#00e5c5]/10 px-3 py-2 rounded-lg border border-[#00e5c5]/25">
                    🚀 Исключительная рентабельность! Окупаемость менее полугода.
                  </div>
                ) : (
                  <div className="text-xs font-bold text-[#00AEEF] bg-[#00AEEF]/10 px-3 py-2 rounded-lg border border-[#00AEEF]/25">
                    📊 Стабильная окупаемость и высокая загрузка. Отличная оборачиваемость.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ASTMED TRUST SECTION ================= */}
      <section className="py-16 sm:py-20 px-4" id="resona7s-about">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center bg-white/3 border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00AEEF]/5 rounded-full blur-[90px] pointer-events-none"></div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#00e5c5] font-extrabold tracking-widest text-xs uppercase block">О компании АСТМЕД</span>
            <h2 className="text-2xl sm:text-3xl font-syne font-extrabold text-white">
              Официальный дистрибьютор экспертных систем в России
            </h2>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
              Компания АСТМЕД работает на рынке медицинского оборудования 13+ лет. За это время мы оснастили свыше 7500 частных и государственных медицинских кабинетов. Сертифицированные отношения с ведущим заводом Mindray гарантирует нашим клиентам прозрачную ценовую планку, оригинальность поставляемых узлов и пожизненное обновление ПО.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                <div className="text-lg sm:text-xl font-bold text-[#00e5c5]">13+ лет</div>
                <div className="text-[10px] text-slate-400">Надежные поставки и ПНР по РФ</div>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                <div className="text-lg sm:text-xl font-bold text-[#00AEEF]">7500+</div>
                <div className="text-[10px] text-slate-400">Довольных клиник во всех регионах</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white/3 border border-[#00AEEF]/20 rounded-2xl flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-[#00AEEF]/10 text-[#00AEEF]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-xs text-white uppercase tracking-wider">Сертифицированный сервис</h4>
                <p className="text-[11px] text-slate-400">Установка, юстировка и пусконаладка проводятся по лицензированному ГОСТу.</p>
              </div>
            </div>
            <div className="p-4 bg-white/3 border border-[#00e5c5]/20 rounded-2xl flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-[#00e5c5]/10 text-[#00e5c5]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-xs text-white uppercase tracking-wider">Обучение в клинике</h4>
                <p className="text-[11px] text-slate-400">Дарим практический мастер-класс при вводе аппарата в эксплуатацию.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 8: FINAL CTA & REGISTRATION ================= */}
      <section className="py-20 px-4 overflow-hidden relative" id="resona7s-final">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00AEEF]/10 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-950 to-[#001433] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 space-y-8 relative z-10 text-center shadow-2xl">
          <div className="space-y-2">
            <span className="text-[#00e5c5] font-extrabold tracking-widest text-[#00e5c5] text-xs uppercase block">Специальные Условия Октября</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-extrabold text-white tracking-tight leading-none">
              Получите лучшую цену на Resona 7s прямо сейчас
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Напишите нам, чтобы получить одобрение лизинга под 0% за пару часов или запросить спецификацию со всеми датчиками под ваши гинекологические/кардио задачи.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs font-semibold max-w-2xl mx-auto pb-4">
            <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-white">
              <Check className="text-[#00e5c5] w-4 h-4 shrink-0" />
              <span>Минимум документов</span>
            </div>
            <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-white">
              <Check className="text-[#00e5c5] w-4 h-4 shrink-0" />
              <span>Одобрение за 2 часа</span>
            </div>
            <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-white">
              <Check className="text-[#00e5c5] w-4 h-4 shrink-0" />
              <span>Бесплатная доставка за 5 дней</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleBottomFormSubmit} className="max-w-md mx-auto space-y-4">
            {bottomError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 text-xs rounded-lg font-medium">
                {bottomError}
              </div>
            )}
            {bottomSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 p-4 rounded-xl space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                <div className="font-bold text-sm">Заявка отправлена!</div>
                <p className="text-[11px] text-slate-450 text-slate-400">Наш медицинский консультант свяжется с вами и пришлет опросный лист для точной настройки датчиков.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    value={bottomName}
                    onChange={(e) => setBottomName(e.target.value)}
                    placeholder="Имя представителя клиники" 
                    className="bg-[#000d1f] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00e5c5] transition"
                    required
                  />
                  <input 
                    type="tel" 
                    value={bottomPhone}
                    onChange={(e) => handlePhoneChange(e, setBottomPhone)}
                    placeholder="+7 (___) ___-__-__" 
                    className="bg-[#000d1f] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00e5c5] transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00AEEF] to-[#00e5c5] text-[#001a3d] font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:opacity-90 transform active:scale-[0.98] transition shadow-lg shadow-[#00e5c5]/10 cursor-pointer"
                >
                  {isSubmitting ? 'Отправка заявки...' : 'Получить лизинговое предложение под 0%'}
                </button>
                <p className="text-[10px] text-slate-400">
                  Без навязчивых звонков • Официальный контракт • Гарантия конфиденциальности
                </p>
              </>
            )}
          </form>

        </div>
      </section>

      <AstmedTeamBlock />

    </div>
  );
}
