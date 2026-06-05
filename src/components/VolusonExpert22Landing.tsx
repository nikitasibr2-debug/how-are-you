import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowUp,
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
  Activity,
  User,
  Phone,
  ArrowRight,
  FileCheck,
  MessageSquare,
  HelpCircle,
  Stethoscope,
  HeartPulse,
  Syringe,
  Baby,
  Building,
  Wrench,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';
import { AstmedTeamBlock } from './AstmedTeamBlock';

interface VolusonExpert22LandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const VolusonExpert22Landing: React.FC<VolusonExpert22LandingProps> = ({
  product,
  articles,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Local state managers
  const [activeReason, setActiveReason] = useState<number>(0);
  const [activeWowTab, setActiveWowTab] = useState<string>('scannav');
  const [galleryTab, setGalleryTab] = useState<'console' | 'process' | 'render'>('console');

  // Lead capture states
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ROI calculation
  const [patientCount, setPatientCount] = useState(15);
  const [scanCost, setScanCost] = useState(4500);

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const roiCalculations = useMemo(() => {
    const weeklyRevenue = patientCount * scanCost * 5; // 5 working days
    const monthlyRevenue = weeklyRevenue * 4.3;
    const costPerScan = 150; // high-quality gel, probe disinfection
    const doctorShare = 0.35; // 35% commission
    const overheadShare = 0.15; // 15% other overheads
    
    // Net profit of clinic is approximately 50%
    const netProfitMargin = 1.0 - (doctorShare + overheadShare);
    const monthlyNetProfit = Math.round((monthlyRevenue - (patientCount * 5 * 4.3 * costPerScan)) * netProfitMargin);
    const paybackMonths = Math.max(1, Math.round(18500000 / (monthlyNetProfit || 1)));

    return {
      monthlyRevenue: Math.round(monthlyRevenue),
      monthlyNetProfit,
      paybackMonths
    };
  }, [patientCount, scanCost]);

  const reasons = [
    {
      title: "Реально ли лучше видит сложных пациентов?",
      short: "Сложные пациенты (Thin-to-Difficult)",
      q: "Реально ли лучше видит сложных пациентов?",
      answer: "Благодаря Lyric Architecture и интеллектуальной технологии Augment, аппарат обеспечивает одинаково чёткое изображение при любом высоком ИМТ у пациентки. Непревзойдённая пространственная детализация и более глубокое проникновение ультразвуковых лучей позволяют акушеру выявлять тончайшие аномалии развития даже у критически сложных пациенток.",
      fact: "Динамическая фокусировка, повышенное контрастное разрешение и подавление зернистости на программно-аппаратном уровне."
    },
    {
      title: "ИИ — это реально помогает или только маркетинг?",
      short: "ИИ в реальной практике",
      q: "ИИ — это реально помогает или только маркетинг?",
      answer: "Это доказанная клиническая эффективность. SonoLyst увеличивает скорость стандартного анатомического просмотра плода на 65%, SonoCNS сокращает время полного нейросонографического анализа на 81%, а SonoPelvicFloor экономит до 80% времени при исследовании тазового дна. ИИ автоматизирует рутину, убирая человеческий фактор.",
      fact: "Подтверждено международными клиническими испытаниями FDACleared в 2023–2024 годах."
    },
    {
      title: "Как аппарат поможет в работе с ЭКО-пациентами?",
      short: "Инструменты для ЭКО",
      q: "Как аппарат поможет в работе с ЭКО-пациентами?",
      answer: "Инструменты автоматического подсчета и измерения фолликулов SonoAVC follicle существенно оптимизируют проведение ЭКО-протоколов. Дополнительно, ИИ-модуль SonoAVCantral 2.0 за доли секунды рассчитывает реальный объём полости матки, позволяя репродуктологам и гинекологам идеально планировать перенос эмбрионов.",
      fact: "Полный цифровой IVF-паттерн и FIGO-классификация из одного источника."
    },
    {
      title: "Покажет ли аппарат плод так, чтобы пациентка заплакала от счастья?",
      short: "Эмоциональный рендеринг",
      q: "Покажет ли аппарат плод так, чтобы пациентка заплакала от счастья?",
      answer: "Эксклюзивная технология HDlive Studio+ строит фотореалистичное 3D/4D изображение плода с регулируемым источником света. Пациенты видят мимику, пальчики и структуру кожи в реальном времени с поразительной точностью. Это лучший инструмент для позиционирования клиники и формирования максимального доверия будущих родителей.",
      fact: "Режим прозрачности Radiant UltraHD позволяет буквально смотреть сквозь ткани на кости и внутренние структуры."
    },
    {
      title: "Не устареет ли аппарат через 3-5 лет?",
      short: "Защита инвестиций",
      q: "Не устареет ли аппарат через 3-5 лет?",
      answer: "Lyric Architecture — это полностью открытая и гибкая программная платформа нового поколения. Оборудование изначально рассчитано на регулярные онлайн-апгрейды ПО. Инвестиция защищена самой сильной экосистемой на рынке: GE Voluson развивает технологии женского здоровья непрерывно с 1989 года.",
      fact: "Накопительные обновления ИИ-моделей устанавливаются без переплаты за новое аппаратное железо."
    },
    {
      title: "Насколько это удобно для работы целый день?",
      short: "Эргономика для врача",
      q: "Насколько это удобно для работы целый день?",
      answer: "Высочайший комфорт врача: сверхэргономичный 23.8\" HDU-монитор с уникальным полноэкранным режимом, полностью плавающая клавиатура, персонализируемая touch-панель и регулировка по высоте. Программируемые хард-клавиши и индивидуальный цвет подсветки минимизируют лишние движения рук и шеи доктора.",
      fact: "Технология Respond — автоопределение датчиков и мгновенная кастомизация пресетов сокращают утомляемость на 40%."
    },
    {
      title: "Хватит ли возможностей для фетальной кардиологии?",
      short: "Кардиология плода",
      q: "Хватит ли возможностей для фетальной кардиологии?",
      answer: "Это абсолютный кардиологический стандарт. Сбалансированный тандем электронного матричного датчика eM6C, режимов eSTIC, STIC HD-Flow и уникального ИИ-обработчика Fetal HQ + Global Sphericity Index дает максимально точную количественную оценку функции сердца плода, выявляя самые ранние патологические изменения.",
      fact: "SonoVCAD heart автоматически строит рекомендованные стандартами плоскости сердца из одного кино-цикла."
    }
  ];

  const targetAudiences = [
    {
      title: "Акушеры высокого риска",
      desc: "Для ранней верификации сложнейших хромосомных аномалий и непрерывного ведения многоплодной или патологической беременности.",
      icon: <CheckCircle2 className="w-5 h-5 text-pink-500" />
    },
    {
      title: "Пренатальная диагностика",
      desc: "Для проведения экспертных скринингов 1-2-3 триместров с получением идеального 2D-изображения у пациенток с любым ИМТ.",
      icon: <Sparkles className="w-5 h-5 text-pink-500" />
    },
    {
      title: "Гинекология (тазовое дно & миома)",
      desc: "Для безошибочного Fibroid-картирования миомы по классификации FIGO и точной оценки урогинекологических патологий.",
      icon: <Sliders className="w-5 h-5 text-pink-500" />
    },
    {
      title: "ЭКО-центры и репродуктологи",
      desc: "Автоматический подсчет и 3D-измерение фолликулов (SonoAVC) для оптимизации протоколов стимуляции яичников.",
      icon: <Activity className="w-5 h-5 text-pink-500" />
    },
    {
      title: "Фетальные кардиологи",
      desc: "Оценка сократительной функции желудочков (Fetal HQ) и автоматическая реконструкция плоскостей выводных трактов.",
      icon: <HeartPulse className="w-5 h-5 text-pink-500" />
    }
  ];

  const specificationsTable = [
    { p: "Класс системы", v: "Ультрапремиальный экспертный (Высший флот GE Voluson)" },
    { p: "Графический процессор", v: "Lyric Architecture нового поколения" },
    { p: "Основной монитор", v: "23.8\" High Definition Ultrasound, антибликовое покрытие, full-screen" },
    { p: "Сенсорная тач-панель", v: "Интерактивная плавающая, мультитач, кастомное освещение" },
    { p: "Интеллектуальный ИИ-ассистент", v: "SonoLyst, SonoCNS, SonoPelvicFloor 3.0, SonoAVC follicle, SonoAVCantral" },
    { p: "Режимы визуализации", v: "HDlive Studio+ (прозрачный 4D-рендеринг), Radiant UltraHD, Augment, Graphicflow" },
    { p: "Кардиология плода", v: "STIC, eSTIC, eM6C матричный 4D-датчик, Fetal HQ, Global Sphericity Index" },
    { p: "Автовыявление датчиков", v: "Технология мгновенного распознавания датчиков Respond" },
    { p: "Эргономические регулировки", v: "Электрическая регулировка высоты панели, наклон, поворот клавиатуры" },
    { p: "Гинекологический пакет", v: "Fibroid Mapping (FIGO), Uterine Trace, SonoPelvicFloor 3.0" }
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    const leadData = {
      leadId: `voluson-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'Voluson-Expert-22-Exclusive-Landing',
      contact: {
        name: name || 'Региональный Врач / Клиника',
        phone: phone,
        comment: 'Запрос живой демонстрации Voluson Expert 22 и расчета ROI'
      }
    };

    logger.info('ЗАЯВКА НА VOLUSON EXPERT 22 ПОЛУЧЕНА', leadData);
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 animate-fade-in text-slate-800 font-sans" id="voluson-expert-22-landing-root">
      
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
            <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">УЗИ GE</span>
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

      {/* HERO SECTION / HEADER HOOK */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl">
        {/* Background glow matching GE classic deep blue and soft pink highlights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#004C97]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-mono bg-[#004C97] text-white tracking-widest px-3 py-1 rounded-md font-black">
                GE HEALTHCARE • США
              </span>
              <span className="text-[10px] uppercase font-mono bg-[#FFE4EE] text-[#FF2D85] tracking-widest px-3 py-1 rounded-md font-black">
                ФЛАГМАН ЖЕНСКОГО ЗДОРОВЬЯ
              </span>
              <span className="text-[10px] uppercase font-mono bg-emerald-600 text-white tracking-widest px-3 py-1 rounded-md font-black">
                КЛАСС УЛЬТРАПРЕМИУМ
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
                Аппарат, которому доверяют <br />
                <span className="text-cyan-400">сложные беременноcти.</span> <br />
                ИИ берет на себя рутину.
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Lyric Architecture нового поколения + первый в мире полностью интегрированный искусственный интеллект для решения ключевых задач пренатальной диагностики, акушерства и гинекологии.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-900">
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ТЕХНОЛОГИЯ</span>
                <span className="text-xs font-bold text-white">Lyric Architecture</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">СКРИНИНГ</span>
                <span className="text-xs font-bold text-white">SonoLyst ИИ (+65%)</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ДИАГНОСТИКА</span>
                <span className="text-xs font-bold text-cyan-300 font-mono">SonoCNS (-81%)</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ОБЪЕМЫ</span>
                <span className="text-xs font-bold text-rose-300">HDlive Studio+ 4D</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="#voluson-expert-demo-form" 
                className="px-6 py-3.5 bg-[#004C97] hover:bg-blue-700 text-white font-black rounded-xl text-xs uppercase tracking-wider text-center shadow-lg transition duration-200 cursor-pointer"
              >
                Живая демонстрация
              </a>
              <button 
                onClick={() => triggerQuote(product, 'kp')}
                className="px-6 py-3.5 border border-slate-700 hover:border-slate-500 hover:bg-slate-900 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition"
              >
                Запросить прайс-лист
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Realistic Machine Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-950/95 border border-slate-800 p-4 rounded-3xl relative overflow-hidden shadow-2xl w-full max-w-sm group">
              <div className="absolute top-3 right-3 bg-[#004C97]/20 text-[#004C97] border border-[#004C97]/30 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full">
                Top-1 в мире
              </div>
              <div className="aspect-[4/5] bg-slate-950 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
                <img 
                  src="/src/assets/images/voluson_expert_22_console_1780455527798.png" 
                  alt="GE Healthcare Voluson Expert 22 Premium Ultrasound Machine Console" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs text-slate-400 font-medium">GE Healthcare Voluson Expert 22</span>
                <p className="text-[10px] text-slate-500 font-mono">Абсолютный флагман для женского здоровья</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF: EXPERT QUOTE - PROF. RABIH CHAOUI */}
      <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFE4EE]/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 text-center md:text-left space-y-2">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto md:mx-0 overflow-hidden border-2 border-slate-300">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&h=250&q=80" 
                alt="Prof. Rabih Chaoui"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to avatar mock icon
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="w-full h-full bg-[#004C97] text-white flex items-center justify-center font-extrabold text-lg">
                RC
              </div>
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Prof. Rabih Chaoui</h4>
              <p className="text-[10px] text-slate-500">Берлин, Германия</p>
            </div>
          </div>
          <div className="md:col-span-9 space-y-3 relative">
            <span className="text-5xl text-slate-200 font-serif absolute -top-4 -left-3 select-none">“</span>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic relative z-10 pl-3">
              Шедевр инженерии с лучшим 2D-изображением для пациентов любой комплекции — от худощавых до сложных. Самый эргономичный и настраиваемый аппарат из всех что я использовал.
            </p>
            <div className="text-[11px] text-[#004C97] font-bold tracking-wider font-mono uppercase pl-3">
              Центр пренатальной диагностики, Берлин
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE MATCH: ДЛЯ КОГО СОЗДАН */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#004C97]">РЕШЕНИЕ ВЫСШИХ КЛИНИЧЕСКИХ ЗАДАЧ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Для кого спроектирован Voluson Expert 22
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Разработан совместно с ведущими акушерами-гинекологами мира для отделений акушерства высокого риска и экспертных репродуктивных клиник.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {targetAudiences.map((aud, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition">
              <div className="p-2 w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                {aud.icon}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">{aud.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{aud.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: CLINICAL GALLERY & DYNAMIC WORKFLOW PROCESS SHOWCASE */}
      <section className="space-y-8 max-w-5xl mx-auto" id="clinical-gallery-workflow">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#004C97] block">ЖИВОЙ РАБОЧИЙ ПРОЦЕСС В ДЕТАЛЯХ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Как выглядит и работает Voluson Expert 22 в практике
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Оцените детализацию консоли, комфорт врача при проведении исследований и непревзойденное качество 3D-визуализации плода.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-4">
          <button
            onClick={() => setGalleryTab('console')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              galleryTab === 'console'
                ? 'bg-[#004C97] text-white shadow-lg shadow-blue-800/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            01. Консоль аппарата
          </button>
          
          <button
            onClick={() => setGalleryTab('process')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              galleryTab === 'process'
                ? 'bg-[#004C97] text-white shadow-lg shadow-blue-800/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            02. Процесс УЗИ-диагностики
          </button>

          <button
            onClick={() => setGalleryTab('render')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              galleryTab === 'render'
                ? 'bg-[#004C97] text-white shadow-lg shadow-blue-800/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Baby className="w-4 h-4" />
            03. HDlive Studio+ Рендеринг
          </button>
        </div>

        {/* Dynamic Showcase Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
          {/* Visual Frame */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-2xl pointer-events-none" />
            <div className="aspect-[16/10] bg-slate-950 rounded-2xl border border-slate-200 overflow-hidden relative group shadow-md">
              
              {galleryTab === 'console' && (
                <img
                  src="/src/assets/images/voluson_expert_22_console_1780455527798.png"
                  alt="GE Healthcare Voluson Expert 22 premium clinical console visual"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              {galleryTab === 'process' && (
                <img
                  src="/src/assets/images/ultrasound_process_1780455542303.png"
                  alt="Doctor performing high precision obstetric ultrasound scan"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              {galleryTab === 'render' && (
                <img
                  src="/src/assets/images/hdlive_baby_render_1780455557654.png"
                  alt="Stunning real HDlive diagnostic visualization of a smiling baby face"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-md border border-slate-700 backdrop-blur-sm">
                {galleryTab === 'console' ? 'Console Display View' : galleryTab === 'process' ? 'Live Clinical Process' : 'Fetal HDlive Studio+'}
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="lg:col-span-5 space-y-6">
            {galleryTab === 'console' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#004C97] font-mono">ЭСТЕТИКА И ФУНКЦИОНАЛ КОНСОЛИ</span>
                <h3 className="text-xl font-extrabold text-slate-900">Интуитивное рабочее пространство, спроектированное для Вас</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Voluson Expert 22 оснащен непревзойденным антибликовым <strong>23.8" High Definition</strong> монитором с возможностью гибкого изменения размера изображения (включая полноэкранный режим). Сенсорная тач-панель плавно подстраивается под привычки конкретного врача, а регулируемая по высоте и углу плавающая клавиатура гарантирует максимальную защиту от болей в суставах и спине даже при суточном потоке пациентов.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Автоопределение датчиков <strong>"Respond"</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Программируемые хард-клавиши и цвет подсветки</span>
                  </div>
                </div>
              </div>
            )}

            {galleryTab === 'process' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#004C97] font-mono">ДИАГНОСТИЧЕСКИЙ ПРОЦЕСС</span>
                <h3 className="text-xl font-extrabold text-slate-900">Высочайшая точность и пошаговый контроль в реальном времени</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Процесс исследования становится более комфортным как для врача, так и для пациентки. Искусственный интеллект непрерывно ассистирует клиницисту, подсказывая эталоны стандартных допплеровских плоскостей и автоматически проводя замеры. Интеллектуальный помощник не заменяет врача, а полностью убирает утомляемость и риск мелких ошибок при высоких нагрузках.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF2D85] shrink-0" />
                    <span><strong>ScanNav AI</strong> — живые инструкции по стандартным плоскостям</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF2D85] shrink-0" />
                    <span>Клиническое превосходство у тучных пациентов и при высоком ИМТ</span>
                  </div>
                </div>
              </div>
            )}

            {galleryTab === 'render' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF2D85] font-mono">HDlive STUDIO+ РЕНДЕРИНГ</span>
                <h3 className="text-xl font-extrabold text-slate-900">Золотой стандарт пренатальной 3D/4D визуализации</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Покажите будущим родителям их малыша с фотореалистичной трехмерной четкостью, имитирующей естественное прохождение света сквозь биологические ткани. Режим прозрачности <strong>Radiant UltraHD</strong> позволяет детально видеть кости, позвоночник и сосудистое русло плода, превращая сложную диагностику в легкое и чистое понимание патологий на ранних сроках.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Полный режим прозрачности тканей и костей в один клик</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Экспорт диагностического контента для общения с семьей</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <a
                href="#voluson-expert-demo-form"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#004C97] hover:text-blue-800 transition"
              >
                Испытать эти функции на демо-аппарате
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONFLICTS: 7 REASONS / OBJECTIONS SELECTOR */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-8 max-w-5xl mx-auto relative overflow-hidden" id="seven-reasons-objections">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#004C97]/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block font-mono">БЕЗОШИБОЧНЫЙ ВЫБОР РУКОВОДИТЕЛЯ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
            7 причин выбрать Voluson Expert 22
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Разберем ключевые возражения и особенности премиальной узи-системы в сравнении с классической техникой прошлых поколений.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Menu */}
          <div className="lg:col-span-5 space-y-2">
            {reasons.map((r, idx) => (
              <div key={idx} className="space-y-2 w-full">
                <button
                  onClick={() => setActiveReason(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center ${
                    activeReason === idx 
                      ? 'bg-[#004C97]/30 border-cyan-500 font-extrabold text-white pl-4' 
                      : 'bg-[#1e293b]/70 border-slate-800 text-slate-400 hover:bg-[#1e293b] hover:text-slate-200'
                  }`}
                >
                  <span>{r.short}</span>
                  <ChevronRight className={`w-4 h-4 transition ${activeReason === idx ? 'rotate-90 text-cyan-400' : 'text-slate-600'} lg:rotate-0`} />
                </button>

                {/* Adaptive inline answer display for mobile */}
                {activeReason === idx && (
                  <div className="block lg:hidden bg-[#0b1329] border border-slate-800/80 p-5 rounded-2xl space-y-5 shadow-inner text-left animate-fade-in text-slate-200">
                    <span className="text-[10px] uppercase font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-2 py-0.5 rounded font-bold">
                      Причина #{idx + 1}
                    </span>
                    <h3 className="text-sm font-black text-white leading-snug">
                      {r.title}
                    </h3>
                    <div className="h-px bg-slate-800"></div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {r.answer}
                    </p>
                    <div className="flex items-start gap-2 bg-[#020617]/50 p-3 rounded-xl border border-slate-850">
                      <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">ПРАКТИЧЕСКИЙ ФАКТ</span>
                        <p className="text-xs text-cyan-300">{r.fact}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="hidden lg:block lg:col-span-7 bg-[#0b1329] border border-slate-800/80 p-6 rounded-2xl space-y-5 shadow-inner">
            <span className="text-[10px] uppercase font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-2 py-0.5 rounded font-bold">
              Причина #{activeReason + 1}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              {reasons[activeReason].title}
            </h3>
            <div className="h-px bg-slate-800"></div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {reasons[activeReason].answer}
            </p>
            <div className="flex items-start gap-2 bg-[#020617]/50 p-3 rounded-xl border border-slate-850">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">ПРАКТИЧЕСКИЙ ФАКТ</span>
                <p className="text-xs text-cyan-300">{reasons[activeReason].fact}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WOW FEATURES - UNIQUE TO VOLUSON EXPERT 22 */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#004C97]">ПАТЕНТЫ И ЭКСКЛЮЗИВ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            WOW-возможности — то, что недоступно больше нигде
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Технологии GE HealthCare, выходящие далеко за рамки классического одномерного сканирования.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-slate-100 bg-white p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">ScanNav (живое ИИ-наведение)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Аппарат в реальном времени подсвечивает анатомические ориентиры и с высокой точностью показывает, где находится датчик и куда именно двигаться. Это идеальный помощник для стандартизации экспертных протоколов.
            </p>
          </div>

          <div className="border border-slate-100 bg-white p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Pro-Режим HDlive Studio+</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Смотрите сквозь биологические ткани! Одним касанием тач-панели врач переключает изображение плода в режим прозрачности, визуализируя скелетные кости, сосуды и органы с жидкостью детальнее лазерных методик.
            </p>
          </div>

          <div className="border border-slate-100 bg-white p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">3D-карта Fibroid Mapping</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Автоматическое сканирование и построение наглядной 3D-карты миомы с классификацией узлов по FIGO относительно полости матки и эндометрия. Инструмент исключает рутинное долгое ручное описание.
            </p>
          </div>
        </div>
      </section>

      {/* COMPACT SPECIFICATIONS TABLE */}
      <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <h2 className="text-xl font-extrabold text-slate-900">Ключевая спецификация Voluson Expert 22</h2>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">ЭКСПЕРТНЫЙ ТЕХНИЧЕСКИЙ ПАСПОРТ</span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
          {specificationsTable.map((spec, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-200/60 text-xs text-slate-700">
              <span className="text-slate-500 pr-4">{spec.p}</span>
              <span className="font-bold text-slate-900 text-right">{spec.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ROI CALCULATOR JUST FOR VOLUSON EXPERT 22 */}
      <section className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 max-w-5xl mx-auto overflow-hidden relative" id="voluson-roi-calculator">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#004C97]/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFE4EE] px-3 py-1 bg-[#004C97]/40 rounded-full font-mono">
              БИЗНЕС-РАСЧЕТ ОКУПАЕМОСТИ И ROI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
              Рассчитайте окупаемость флагмана в Вашей клинике
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Поскольку Voluson Expert 22 — это ультрапремиальная инвестиция в репутацию и поток пациентов вашей клиники, введите ваши плановые показатели, чтобы увидеть регулярную финансовую отдачу.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Обследований в день (5 дней в неделю):</span>
                  <span className="font-bold text-white font-mono">{patientCount} пациентов</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="40" 
                  step="1"
                  value={patientCount}
                  onChange={(e) => setPatientCount(parseInt(e.target.value))}
                  className="w-full accent-[#004C97]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Средняя стоимость экспертного УЗ-сканирования:</span>
                  <span className="font-bold text-white font-mono">{scanCost.toLocaleString()} руб.</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="12000" 
                  step="500"
                  value={scanCost}
                  onChange={(e) => setScanCost(parseInt(e.target.value))}
                  className="w-full accent-[#004C97]"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl grid grid-cols-1 gap-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] text-slate-400 block font-mono">ЕЖЕМЕСЯЧНЫЙ ОБОРОТ</span>
              <span className="text-2xl font-black text-white font-mono">
                {roiCalculations.monthlyRevenue.toLocaleString()} <span className="text-xs">руб.</span>
              </span>
            </div>
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] text-cyan-400 block font-mono">ЧИСТАЯ ЕЖЕМЕСЯЧНАЯ ПРИБЫЛЬ</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">
                {roiCalculations.monthlyNetProfit.toLocaleString()} <span className="text-xs">руб.</span>
              </span>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                За вычетом 35% ФОТ врача, расходных гелей и 15% административных накладных расходов.
              </p>
            </div>
            <div>
              <span className="text-[10px] text-[#FF2D85] block font-mono">БЫСТРОТА ОКУПАЕМОСТИ ФЛАГМАНА</span>
              <span className="text-xl font-black text-white font-mono">
                ~ {roiCalculations.paybackMonths} месяцев <span className="text-xs">работы на окупаемость</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FULL VOLUSON ECOSYSTEM & DELIVERABLES */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#004C97]">ПОЛНАЯ ПОДДЕРЖКА КЛИНИК</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Сертифицированная экосистема Voluson от Astmed
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Поставляя Expert 22, мы берем на себя 100% сопутствующих обязательств, чтобы Ваша клиника работала без простоев и задержек.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3">
            <div className="p-2.5 bg-sky-50 text-[#004C97] rounded-xl w-10 h-10 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Бортовой Remote Support</h4>
            <p className="text-xxs sm:text-xs text-slate-500 leading-normal">
              Благодаря удаленной сетевой телеметрии инженеры авторизованного сервисного центра Astmed оперативно диагностируют и корректируют системные настройки БУ.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl w-10 h-10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Выездное обучение</h4>
            <p className="text-xxs sm:text-xs text-slate-500 leading-normal">
              Наш клинический аппликатор приедет прямо в Вашу клинику и проведет двухдневный обучающий курс по ИИ-модулям, 4D-визуализации и получению УЗД-дипломов.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl w-10 h-10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Заводская гарантия 24 мес.</h4>
            <p className="text-xxs sm:text-xs text-slate-500 leading-normal">
              Официальное дилерское сервисное сопровождение. Собственный склад запасных частей и подменные аппараты аналогичного класса на случай непредвиденных поломок.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl w-10 h-10 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Лицензионная поддержка</h4>
            <p className="text-xxs sm:text-xs text-slate-500 leading-normal">
              Предоставляем оригинальное Регистрационное Удостоверение Минздрава, сертификаты FDA, CE и полноценные юридические памятки для легкого прохождения проверок.
            </p>
          </div>
        </div>
      </section>

      {/* LEAD-MAGNET & CONVERSION FORM */}
      <section className="bg-slate-50 border border-indigo-100 p-6 sm:p-12 rounded-3xl grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto" id="voluson-expert-demo-form">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] uppercase font-mono bg-[#FFE4EE] text-[#FF2D85] tracking-widest px-3 py-1.5 rounded-full font-black inline-block">
            🎁 НАИБОЛЕЕ ВЫГОДНЫЙ ОФФЕР С КЛИНИЧЕСКИМ СПЕЦИАЛИСТОМ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Оставьте номер прямо сейчас и получите БЕСПЛАТНО:
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-black">✓</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                <strong>Живую демонстрацию SonoCNS + SonoPelvicFloor + HDlive Studio+</strong> (онлайн, 30 минут с клиническим специалистом GE).
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-black">✓</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                <strong>Сравнение Voluson Expert 22 vs Samsung WS85 vs Mindray DC-90</strong> в женском здоровье — честная таблица по 20 клиническим параметрам.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-black">✓</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                <strong>Индивидуальный расчет ROI:</strong> за сколько месяцев реально окупается аппарат именно при вашем входящем трафике пациентов.
              </p>
            </div>
          </div>

          <div className="bg-[#FFE4EE]/50 border border-rose-100 rounded-xl p-3 text-[11px] text-[#FF2D85] font-extrabold flex items-center gap-2">
            <span className="animate-ping w-2 h-2 rounded-full bg-rose-600"></span>
            ⏰ Демонстрации проводятся только 3 дня в неделю — количество свободных окон ограничено!
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-slate-100 p-6 sm:p-10 rounded-2xl shadow-xl text-slate-900 text-left">
          {!submitted ? (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-950">Запишитесь на демонстрацию</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Оставьте номер телефона, мы зафиксируем за Вами подарок и свяжемся для согласования времени.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Имя руководителя или врача:</label>
                  <input 
                    type="text" 
                    placeholder="Александр, клиника «Вера»" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-[#004C97] focus:bg-white transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Номер телефона (для обратной связи):*</label>
                  <input 
                    type="tel" 
                    placeholder="+7 (999) 123-45-67" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-[#004C97] focus:bg-white transition-all font-semibold font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#004C97] hover:bg-blue-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer border-none text-center shadow-md shadow-blue-800/20"
              >
                ЗАПИСАТЬСЯ НА ЖИВУЮ ДЕМОНСТРАЦИЮ
              </button>

              <div className="text-[9px] text-slate-400 leading-relaxed text-center">
                Перезвоним в течение 12-15 минут. Демонстрация абсолютно бесплатна и не несет никаких скрытых финансовых обязательств.
              </div>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-black">✓</div>
              <h3 className="font-extrabold text-lg text-slate-950">Заявка успешно принята!</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Подарки забронированы. Наш клинический специалист-координатор по УЗ-оборудованию GE Healthcare свяжется с вами в течение 15 минут, чтобы подтвердить удобное время для онлайн-демонстрации.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-500 hover:bg-slate-50 transition"
              >
                Заполнить еще раз
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER & REGISTRATION CERTIFICATE DISCLAIMER */}
      <AstmedTeamBlock />

      <footer className="bg-slate-950 text-slate-400 rounded-3xl p-6 sm:p-10 border border-slate-800 grid sm:grid-cols-3 gap-8 text-xs font-sans">
        <div className="space-y-4">
          <span className="text-white font-black tracking-widest uppercase block">GE VOLUSON EXPERT 22</span>
          <p className="text-[11px] leading-relaxed">
            Мировой лидер в акушерстве и гинекологии с 1989 года. Семейство Voluson — это синоним точности, безопасности и репутации медицинского центра.
          </p>
          <div className="text-[10px] text-slate-500">
            © 2026 Официальные поставки медтехники «Astmed»
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-white font-black tracking-widest uppercase block">СЕРТИФИКАЦИЯ И РУ</span>
          <p className="text-[11px] leading-relaxed">
            Все оборудование сертифицировано и поставляется с полным комплектом документации. Имеет Регистрационное Удостоверение Минздрава РФ и допущено к медицинской практике.
          </p>
          <p className="text-[10px] text-slate-500 uppercase font-mono">
            FDA cleared • CE marked • РУ Минздрава РФ
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-white font-black tracking-widest uppercase block">ВНИМАНИЕ ОГРАНИЧЕНИЕ</span>
          <p className="text-[11px] leading-relaxed text-slate-500 italic">
            Имеются противопоказания. Требуется консультация специалиста. Описание ИИ-инструментов носит исключительно информационно-ознакомительный характер и не заменяет экспертное решение сертифицированного практикующего врача ультразвуковой диагностики.
          </p>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON TO SCROLL TO TOP */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-[#004C97] hover:bg-blue-700 text-white rounded-full shadow-xl transition-all z-40 transform hover:scale-110 active:scale-95 border border-blue-600"
          title="Наверх"
        >
          <ArrowUp className="w-5 h-5 animate-pulse" />
        </button>
      )}

    </div>
  );
};
