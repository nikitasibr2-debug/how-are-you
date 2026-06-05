import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowUp,
  Heart, 
  ArrowRightLeft, 
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
  Wrench,
  Award,
  Eye,
  SlidersHorizontal,
  Layers,
  HeartPulse,
  Baby,
  Building,
  CheckSquare
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';

interface MindrayConsonaN8LandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const MindrayConsonaN8Landing: React.FC<MindrayConsonaN8LandingProps> = ({
  product,
  articles,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}) => {
  // Состояние отображения кнопки наверх и назад в каталог
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 405) {
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
  const [activeSensorGroup, setActiveSensorGroup] = useState<string>('convex');

  // Lead capture states
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ROI Calculator states
  const [patientCount, setPatientCount] = useState(40);
  const [scanCost, setScanCost] = useState(2500);

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const roiCalculations = useMemo(() => {
    const weeklyRevenue = patientCount * scanCost;
    const monthlyRevenue = weeklyRevenue * 4.3; // standard monthly multiplier
    const costPerScan = 120; // gel, covers, sanitizing, electricity
    const doctorShare = 0.35; // 35% standard commission for ultrasound doctor
    const overheadShare = 0.12; // 12% other clinic administrative shares
    
    // Net profit percentage margin
    const netProfitMargin = 1.0 - (doctorShare + overheadShare);
    const monthlyNetProfit = Math.round((monthlyRevenue - (patientCount * 4.3 * costPerScan)) * netProfitMargin);
    
    const initialInvestment = product.price || 2850000;
    const paybackMonths = monthlyNetProfit > 0 ? Math.max(1, Math.ceil(initialInvestment / monthlyNetProfit)) : 18;
    
    return {
      monthlyRevenue: Math.round(monthlyRevenue),
      monthlyNetProfit,
      paybackMonths
    };
  }, [patientCount, scanCost, product.price]);

  const reasons = [
    {
      title: "ZST+ — это маркетинг или реально работает?",
      badge: "Поканальная обработка ZST+",
      question: "В чем революционное отличие ZST+ от классических УЗИ-аппаратов?",
      desc: "Обычные аппараты собирают картинку построчно через старый бимформинг. Платформа ZST+ (Zone Sonography Technology+) полностью меняет парадигму: она собирает объемные акустические зоны и обрабатывает сырые канальные данные (channel data processing). Система поддерживает до 248,832 обрабатываемых каналов одновременно. Это полностью решает извечную проблему врачей-диагностов: больше не нужно жертвовать частотой кадров ради глубины или однородностью ткани ради сверхточных контуров. Здесь все три параметра выкручены на максимум одновременно.",
      proof: "Врач получает идеальное пространственное разрешение, четкую глубину фокусировки Dynamic Pixel Focusing по всей высоте экрана и полное подавление спекл-шумов iClear+."
    },
    {
      title: "Удобно ли работать весь день?",
      badge: "Эргономика Premium",
      question: "Как избавить УЗИ-специалиста от болей в спине и глазах к концу смены?",
      desc: "Consona N8 спроектирован с заботой о практикующем докторе: 21.5\" жестко фиксируемый Full HD монитор крепится на двойном плавающем кронштейне dual-wing arm со свободным вращением. Сенсорная touch-панель управления 15.6\" наклоняется и оптимизирует переключение режимов жестами. Панель управления физически поворачивается и плавно регулируется по высоте. Аппарат работает практически бесшумно, а его панель оснащена водопылезащитной силиконовой мембраной, которую можно мыть дезрастворами без страха залить контакты.",
      proof: "Встроенный аккумулятор позволяет перемещать консоль между кабинетами без выключения аппарата (режим сна/пробуждения за 5 секунд)."
    },
    {
      title: "Достаточно ли умный для диагностики печени?",
      badge: "Smart HRI & STE эластография",
      question: "Как быстро и объективно оценить диффузные изменения органа без судейских погрешностей?",
      desc: "Для гепатологии и онкопоиска Consona N8 оснащен передовым ИИ-инструментом Smart HRI. Он автоматически находит паренхиму печени и кору почки, вычисляя индекс гепатостеатоза (степень ожирения печени) за одну секунду без сложных ручных измерений. Дополнительно встроен экспертный модуль эластографии сдвиговой волны STE/STQ и NTE (Needle Tracking Elastography), который визуализирует жесткость ткани в цветовой кодировке с выводом точных килопаскалей (кПа).",
      proof: "Количественная оценка жесткости («Shell»-анализ зоны интереса) облегчает стадирование фиброза по шкале METAVIR."
    },
    {
      title: "Справится с кардиологией?",
      badge: "Полноценный кардиопакет",
      question: "Заменит ли Consona N8 специализированный кардио-сканер в клинике?",
      desc: "Да, абсолютно. В отличие от урезанных «гинекологических» версий других брендов, на Consona N8 развернут полный кардиопакет. К аппарату подключаются высокоплотные фазированные датчики SP5-1N/P8-2, высокочувствительный транспищеводный датчик TEE (P8-2Ts) для тончайшего анализа пороков клапанов, а также карандашные датчики CW для оценки экстремально высоких скоростей кровотока. В базовый софт уже зашит тканевой допплер TDI, автоматические расчеты полостей и гемодинамики.",
      proof: "Вы сможете легко закрыть кардиологический прием любой сложности — как взрослый, так и педиатрический."
    },
    {
      title: "Хорош ли для ОБ/ГИН?",
      badge: "Полный 4D скрининг плода",
      question: "Как повысить лояльность будущих родителей за счет качества картинки?",
      desc: "Благодаря платформе ZST+, объемная визуализация 3D/4D на Consona N8 выглядит как фотореалистичная визуализация в режиме реального времени. Система ИИ Smart Scene 3D автоматически оптимизирует 3D-сцены одним касанием, убирая шумы околоплодных вод. Интеллектуальный помощник Smart Planes CNS автоматически сканирует головной мозг плода, выводит необходимые плоскости и проводит замеры веса, размера костей и биометрии SonoBiometry.",
      proof: "Инструменты Smart Fetal упрощают рутинные гинекологические замеры на 40%, исключая человеческий фактор при заполнении протоколов."
    },
    {
      title: "Не устареет через 3 года?",
      badge: "Открытая платформа обновлений",
      question: "Защищены ли инвестиции клиники от быстрого технологического старения?",
      desc: "ZST+ — это программно-ориентированная архитектура (Software-based Platform). Это значит, что новые режимы сканирования, фильтры и обновленные нейросети ИИ можно загружать простым апгрейдом софта, не меняя физическое «железо» и датчики аппарата. Mindray основан в 1991 году и имеет грандиозную сервисную сеть в России, заводские склады запчастей и мгновенный доступ к инженерам.",
      proof: "Consona N8 будет сохранять актуальность и технологическое лидерство как минимум 7-10 лет непрерывной эксплуатации."
    }
  ];

  const sensors = {
    convex: [
      { name: "C5-1", desc: "Высокоплотный монокристаллический конвексный датчик (1.0 - 5.0 МГц). Для глубоких абдоминальных исследований, акушерства, гинекологии, урологии у взрослых пациентов." },
      { name: "C11-3", desc: "Микроконвексный педиатрический датчик (3.0 - 11.0 МГц). Для неонатологии, педиатрии, абдоминальных обследований детей и транскраниальных исследований у младенцев." },
      { name: "SC5-1N", desc: "Сверхплотный конвексный датчик экспертной серии. Максимальная проникающая способность у тучных пациентов с сохранением контрастного разрешения." }
    ],
    linear: [
      { name: "L13-3N", desc: "Универсальный линейный датчик высокого разрешения (3.0 - 13.0 МГц). Идеален для исследований сосудов (дуплекс CCA), щитовидной и молочной желез, суставов." },
      { name: "L9-3", desc: "Линейный датчик глубокого сканирования (3.0 - 9.0 МГц). Применяется для периферических сосудов, глубоких вен нижних конечностей и костно-мышечной системы." },
      { name: "L16-4Hs", desc: "Высокочастотный линейный датчик типа 'хоккейная клюшка' (4.0 - 16.0 МГц). Превосходен для биопсий, блокад нервов, педиатрии и интраоперационных процедур." }
    ],
    cardio: [
      { name: "SP5-1N", desc: "Фазированный секторный монокристаллический датчик (1.0 - 5.0 МГц). Экспертная кардиология взрослых, транскраниальная допплерография (TCD)." },
      { name: "P8-2", desc: "Педиатрический фазированный датчик повышенной плотности (2.0 - 8.0 МГц). Детальная эхокардиография новорожденных и детей младшего возраста." },
      { name: "P8-2Ts (TEE)", desc: "Высокотехнологичный мультиплановый чреспищеводный датчик для углубленного интраоперационного кардиомониторинга у взрослых." }
    ],
    volume: [
      { name: "DE11-3", desc: "Высокоплотный микроконвексный внутриполостной объемный датчик 3D/4D. Предназначен для прецизионной трансвагинальной объемной реконструкции малого таза." },
      { name: "SD8-1", desc: "Специализированный объемный конвексный датчик 3D/4D для акушерских сеансов и пренатального скрининга плода в реальном времени." },
      { name: "D7-2", desc: "Широкополосный объемный абдоминальный датчик 3D/4D. Автоматическая оптимизация сечений плода и цветной допплер гемодинамики." }
    ],
    vaginal: [
      { name: "V11-3H / V11-3", desc: "Внутриполостные гинекологические датчики сверхвысокого разрешения. Позволяют проводить ранний трансвагинальный онкоскрининг шейки матки." },
      { name: "V11-3B / V11-3HB", desc: "Изогнутые внутриполостные датчики повышенного эргономического удобства с увеличенным углом обзора паренхимы до 180 градусов." }
    ],
    cw: [
      { name: "CW5s", desc: "Слепой карандашный датчик спектрального допплера 5.0 МГц. Для прецизионных замеров скоростей и градиентов давления в периферических сосудах." },
      { name: "CW2s", desc: "Карандашный датчик 2.0 МГц. Применяется для глубоко расположенных магистральных артерий и кардиоваскулярных патологий." }
    ]
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      setSubmitted(true);
      logger.info('Mindray Consona N8 Lead submit successful', { name, phone });
    }
  };

  return (
    <div id="mindray-consona-n8-root" className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-[#00AEEF]/20 selection:text-slate-900">
      
      {/* 🧭 NAVIGATION HEADER */}
      <header id="consona-header" className="bg-white border-b border-slate-200 relative z-10 py-4 px-6 text-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <button
              id="consona-back-btn"
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
              id="consona-fav-btn"
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${favorites.includes(product.id) ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorites.includes(product.id) ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button
              id="consona-compare-btn"
              onClick={() => toggleCompare(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${compareList.includes(product.id) ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{compareList.includes(product.id) ? 'В сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 🚀 🔥 1 & 2. HERO HEADER SECTION */}
      <section id="consona-hero" className="bg-gradient-to-br from-[#003366] to-[#011b3a] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Abstract design elements matching branding guidelines */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00AEEF]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Copywriting with 10 years experience hook */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] px-4 py-1.5 rounded-full border border-[#00AEEF]/30 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Технология флагманского уровня — по цене рабочего аппарата</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Разрушаем компромиссы УЗИ-визуализации: <br className="hidden sm:inline" />
              <span className="text-[#00AEEF] underline decoration-wavy decoration-[#00AEEF]/40 underline-offset-8">
                Встречайте Mindray Consona N8
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Благодаря переходу на революционную зонную платформу <strong className="text-white font-black">ZST+</strong>, умный стационарный сканер <strong className="text-white font-bold">Consona N8</strong> обеспечивает беспрецедентную точность диагностики без ущерба для скорости смены кадров. Идеальное экспертное решение для первичного звена и многопрофильных медицинских центров.
            </p>

            {/* Micro value indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-md text-xs">
              <div className="space-y-1">
                <span className="block text-xl font-black text-[#00AEEF]">CE + FDA</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Сертифицировано</span>
              </div>
              <div className="space-y-1">
                <span className="block text-xl font-black text-[#00AEEF]">248,832</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Поканальная ZST+</span>
              </div>
              <div className="space-y-1">
                <span className="block text-xl font-black text-[#00AEEF]">1991 г.</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">История Mindray</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                onClick={() => triggerQuote(product, 'price')}
                className="bg-[#00AEEF] hover:bg-[#0090c5] text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-lg shadow-[#00AEEF]/20 text-center"
              >
                Узнать цену со скидкой
              </button>
              <button 
                onClick={() => triggerQuote(product, 'kp')}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer text-center"
              >
                Получить КП на бланке
              </button>
            </div>
            
            <p className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Регистрационное удостоверение Минздрава РФ • Полный пакет документов гарантирован</span>
            </p>
          </div>

          {/* Hero Right: Clean physical mockup layout without image-blend skew */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3.2] bg-[#001f40]/85 border border-white/15 rounded-3xl p-4 overflow-hidden shadow-2xl flex flex-col justify-between">
              
              {/* Grid backdrops */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* High precision scanner visual frame */}
              <div className="w-full flex-1 relative rounded-2xl overflow-hidden flex items-center justify-center bg-slate-950/40">
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&h=450&q=80" 
                  alt="Mindray Consona N8" 
                  className="w-full h-full object-cover opacity-90 mix-blend-screen"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Advanced tech overlay labels */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ZST+ ACTIVE CHANNEL</span>
                      </div>
                      <div className="text-[8px] font-mono text-slate-450">CHANNELS: 248,832 / HIGH FOCUS</div>
                    </div>
                    <span className="text-[9px] font-mono text-[#00AEEF] bg-[#00AEEF]/10 border border-[#00AEEF]/25 px-2 py-0.5 rounded font-bold uppercase">
                      N8 SERIES
                    </span>
                  </div>

                  {/* Real-time cardiac/radial wave trace */}
                  <div className="w-full h-12 flex items-end justify-between px-1 opacity-60 relative">
                    <svg className="absolute inset-0 w-full h-full text-[#00AEEF]" viewBox="0 0 120 30" preserveAspectRatio="none">
                      <path 
                        d="M0 20 L20 20 L25 5 L30 25 L35 20 L55 20 L60 5 L65 25 L70 20 L120 20" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                      />
                    </svg>
                    <div className="text-[8px] font-mono text-[#00AEEF]/50 w-full flex justify-between absolute bottom-0 left-2 pr-4">
                      <span>ECG CH.1</span>
                      <span>HR: 72 bpm</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Responsive metadata block */}
              <div className="relative mt-3 bg-[#001f40]/90 border border-white/10 p-3.5 rounded-xl flex items-center justify-between z-20 shadow-md">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">Презентация оборудования</span>
                  <span className="text-xs font-black text-[#00AEEF]">Concrete to Resonate™</span>
                </div>
                <span className="bg-[#00AEEF]/20 text-[#00AEEF] font-mono text-[9px] px-2.5 py-1 rounded font-bold">
                  AM-MR-CSN8
                </span>
              </div>
            </div>

            {/* Float tags */}
            <div className="absolute -top-4 -left-4 bg-[#00AEEF] text-slate-950 font-black text-[10px] px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider font-mono z-30">
              🔥 Спеццена по запросу
            </div>
          </div>

        </div>
      </section>

      {/* 🏥 3. "КОМУ ПОДХОДИТ" SECTION */}
      <section id="consona-target" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">НАЗНАЧЕНИЕ КЛИНИКИ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              Кому идеально подходит УЗИ-аппарат Consona N8?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Свободный выбор 21 типа высокоплотных датчиков и сильная программная платформа ZST+ делают Consona N8 универсальной тяжелоатлетической рабочей силой для любого медицинского центра.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            
            <div className="bg-slate-50 border border-slate-250/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Activity className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Терапевты и ВОП</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Быстрый базовый скрининг ОБП и щитовидной железы с автооптимизацией iTouch.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-250/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Baby className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Гинекологи и акушеры</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Пакет экспертного 3D/4D скрининга плода, ИИ-измерения Smart CNS и Smart Fetal.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-250/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Кардиологи</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Поддержка чреспищеводного кардиодатчика TEE (P8-2Ts) и карандашных CW датчиков.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-250/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Гастроэнтерологи</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Оценка стеатоза печени с автовычислением индекса Smart HRI за секунды.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-250/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Урологи</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Инструмент Smart Bladder для автоматического бесконтактного замера объемов.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-250/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Медицинские центры</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Высочайшая надежность, отсутствие технологических ограничений и переплат.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🛡️ 4. SIX REASONS SECTION WITH INTERACTIVE CHANGER */}
      <section id="consona-reasons" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">ОБЪЕКТИВНЫЕ ФАКТЫ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              6 причин выбрать УЗИ-аппарат Consona N8
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Отвечаем на основные вопросы главных врачей на строгом языке клинических параметров, доказательств и экономии.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector */}
            <div className="lg:col-span-5 space-y-2">
              {reasons.map((item, index) => (
                <div key={index} className="space-y-2">
                  <button
                    onClick={() => setActiveReason(index)}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 cursor-pointer ${
                      activeReason === index 
                        ? 'bg-gradient-to-r from-[#003366] to-[#01254e] text-white border-transparent shadow-md' 
                        : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                      activeReason === index ? 'bg-[#00AEEF] text-slate-950' : 'bg-slate-100 text-[#003366]'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <span className="block text-xs font-extrabold leading-tight">{item.title}</span>
                      <span className={`text-[10px] font-mono block mt-0.5 ${activeReason === index ? 'text-[#00AEEF]' : 'text-slate-400'}`}>
                        {item.badge}
                      </span>
                    </div>
                    <ChevronRight className={`w-4.5 h-4.5 transition-transform ${activeReason === index ? 'rotate-90 text-[#00AEEF]' : 'text-slate-300'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {activeReason === index && (
                    <div className="block lg:hidden bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm text-slate-800 animate-fade-in text-left">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#00AEEF]/10 text-blue-750 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-black text-[#003366] uppercase tracking-widest font-mono">
                          Факты в деталях
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-[#003366] leading-snug">
                        {item.question}
                      </h3>
                      <p className="text-xs text-slate-650 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="bg-[#00AEEF]/5 border-l-4 border-[#00AEEF] p-4 rounded-r-xl space-y-1">
                        <div className="text-[10px] font-black text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#00AEEF]" />
                          <span>Мнение медицинского аппликатора</span>
                        </div>
                        <p className="text-[11px] text-slate-650 italic leading-relaxed">
                          &ldquo;{item.proof}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right content display */}
            <div className="hidden lg:flex lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm min-h-[350px] flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#00AEEF]/10 text-[#00AEEF] text-[10px] font-mono font-bold px-3 py-1 rounded">
                    {reasons[activeReason].badge}
                  </span>
                  <span className="text-[10px] font-black text-[#003366] uppercase tracking-widest font-mono">
                    Факты в деталях
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#003366] leading-snug">
                  {reasons[activeReason].question}
                </h3>

                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                  {reasons[activeReason].desc}
                </p>
              </div>

              {/* Verified Clinical Indicator */}
              <div className="bg-[#00AEEF]/5 border-l-4 border-[#00AEEF] p-4 rounded-r-xl space-y-1">
                <div className="text-[10px] font-black text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Мнение медицинского аппликатора</span>
                </div>
                <p className="text-[11px] text-slate-650 italic leading-relaxed">
                  &ldquo;{reasons[activeReason].proof}&rdquo;
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 🤩 5. WOW-POSSIBILITIES SECTION */}
      <section id="consona-wow" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">ТЕХНОЛОГИЧЕСКИЙ ПРОРЫВ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              Три WOW-возможности, которые удивляют врачей УЗД
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Инновации, которые избавляют специалистов от бесконечной ручной рутины и открывают хирургический уровень контроля прямо на стандартном приеме.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* WOW 1: Smart HRI */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
              <div className="bg-[#003366] text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                01
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">АВТОМАТИЗАЦИЯ СТЕАТОЗА</span>
                <h3 className="font-extrabold text-base text-slate-850">Smart HRI — индекс стеатоза печени в одно нажатие</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Больше никаких сравнений паренхимы «на глаз» и споров между дежурными докторами. Алгоритм Smart HRI на базе ИИ автоматически сравнивает эхогенность паренхимы печени с корой почки и выводит числовой индекс за доли секунды.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Экономит: До 10-15 минут на одного пациента при дифференциальной оценке жирового гепатоза.
                </p>
              </div>
            </div>

            {/* WOW 2: ZST+ 248,832 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
              <div className="bg-[#003366] text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                02
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">БЕСКОМПРОМИССНОЕ ЖЕЛЕЗО</span>
                <h3 className="font-extrabold text-base text-slate-850">ZST+ 248,832 каналов — изображение без потерь</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Поканальное зонное сканирование обрабатывает колоссальные объемы информации в реальном времени. Интеграция фокуса на каждом микропикселе DPF исключает появление мутных «слепых зон», типичных для устаревших систем.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Результат: Безупречный контраст тончайших структур без раздражающего 'размытия' по углам экрана.
                </p>
              </div>
            </div>

            {/* WOW 3: TEE датчик */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
              <div className="bg-[#003366] text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                03
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">ИНТРАОПЕРАЦИОННЫЙ КЛАСС</span>
                <h3 className="font-extrabold text-base text-slate-850">Чреспищеводный датчик TEE — кардиохирургический класс</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Поддержка сложнейшего датчика P8-2Ts (TEE) позволяет проводить мониторинг патологий клапанов, левого предсердия и коронарного кровоснабжения прямо во время анестезиологических палат или в операционном блоке.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Статус: Обычно доступно только в сканерах экспертного класса стоимостью от 5+ миллионов рублей.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 📊 6. SPEC TO VALUE COMPARISON AND ROI ESTIMATOR */}
      <section id="consona-roi-specs" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Technical specifications table */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#00AEEF] tracking-widest font-mono">СПЕЦИФИКАЦИЯ ОБОРУДОВАНИЯ</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#003366]">
                Характеристики Mindray Consona N8
              </h3>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.fullSpecs || {}).map(([key, value], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-bold text-[#003366] w-2/5 border-b border-slate-100">{key}</td>
                      <td className="px-4 py-3 text-slate-650 border-b border-slate-100">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive ROI investment calculator */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="inline-block bg-[#00AEEF]/10 text-[#003366] text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                ФИНАНСОВАЯ ОКУПАЕМОСТЬ Consona N8
              </div>
              <h3 className="text-xl font-black text-[#003366] tracking-tight">Экономический калькулятор клиники</h3>
              <p className="text-[11px] text-slate-400">
                Благодаря высокой автоматизации ИИ-аппарата Consona N8, Вы сможете принимать больше пациентов. Рассчитайте окупаемость Вашего приобретения в реальном времени.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Обследований в неделю:</span>
                  <span className="text-[#00AEEF] font-mono">{patientCount} исследований</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  step="5"
                  value={patientCount}
                  onChange={(e) => setPatientCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Средний чек обследования УЗИ:</span>
                  <span className="text-[#00AEEF] font-mono">{scanCost.toLocaleString()} ₽</span>
                </div>
                <input 
                  type="range" 
                  min="1500" 
                  max="6000" 
                  step="100"
                  value={scanCost}
                  onChange={(e) => setScanCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono block">Оборот в месяц</span>
                <span className="text-xs font-black text-slate-800">{roiCalculations.monthlyRevenue.toLocaleString()} ₽</span>
              </div>
              <div className="space-y-1 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[9px] text-emerald-600 uppercase tracking-widest font-mono block">Чистый доход</span>
                <span className="text-xs font-black text-emerald-750">{roiCalculations.monthlyNetProfit.toLocaleString()} ₽</span>
              </div>
              <div className="space-y-1 bg-[#00AEEF]/5 p-2.5 rounded-xl border border-[#00AEEF]/10">
                <span className="text-[9px] text-[#00AEEF] uppercase tracking-widest font-mono block">Окупаемость</span>
                <span className="text-xs font-black text-[#003366]">{roiCalculations.paybackMonths} мес.</span>
              </div>
            </div>

            <button
              onClick={() => triggerQuote(product, 'leasing')}
              className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition text-center cursor-pointer"
            >
              Рассчитать покупку в лизинг (аванс от 10%)
            </button>
          </div>

        </div>
      </section>

      {/* 🔮 7. SENSOR GUIDE GROUP */}
      <section id="consona-sensors" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-[#00AEEF] tracking-widest font-mono">ПАРК ДАТЧИКОВ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              Полная линейка прецизионных датчиков к Consona N8
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Полноценная медицинская гибкость: подберите именно те датчики, которые требуются под лицензирование Вашего профиля работы.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sensor Category Buttons Links */}
            <div className="lg:col-span-1 flex flex-col gap-1.5 border-r border-slate-100 pr-4">
              <button 
                onClick={() => setActiveSensorGroup('convex')}
                className={`w-full text-left px-4 py-3 rounded-xl border font-bold text-xs transition cursor-pointer ${activeSensorGroup === 'convex' ? 'bg-[#003366] text-white border-transparent' : 'bg-slate-50 text-slate-755 border-slate-200 hover:bg-slate-100'}`}
              >
                Конвексные датчики
              </button>
              <button 
                onClick={() => setActiveSensorGroup('linear')}
                className={`w-full text-left px-4 py-3 rounded-xl border font-bold text-xs transition cursor-pointer ${activeSensorGroup === 'linear' ? 'bg-[#003366] text-white border-transparent' : 'bg-slate-50 text-slate-755 border-slate-200 hover:bg-slate-100'}`}
              >
                Линейные датчики
              </button>
              <button 
                onClick={() => setActiveSensorGroup('cardio')}
                className={`w-full text-left px-4 py-3 rounded-xl border font-bold text-xs transition cursor-pointer ${activeSensorGroup === 'cardio' ? 'bg-[#003366] text-white border-transparent' : 'bg-slate-50 text-slate-755 border-slate-200 hover:bg-slate-100'}`}
              >
                Фазированные (Кардио)
              </button>
              <button 
                onClick={() => setActiveSensorGroup('volume')}
                className={`w-full text-left px-4 py-3 rounded-xl border font-bold text-xs transition cursor-pointer ${activeSensorGroup === 'volume' ? 'bg-[#003366] text-white border-transparent' : 'bg-slate-50 text-slate-755 border-slate-200 hover:bg-slate-100'}`}
              >
                Матричные объемные 4D
              </button>
              <button 
                onClick={() => setActiveSensorGroup('vaginal')}
                className={`w-full text-left px-4 py-3 rounded-xl border font-bold text-xs transition cursor-pointer ${activeSensorGroup === 'vaginal' ? 'bg-[#003366] text-white border-transparent' : 'bg-slate-50 text-slate-755 border-slate-200 hover:bg-slate-100'}`}
              >
                Вагинальные / Полостные
              </button>
              <button 
                onClick={() => setActiveSensorGroup('cw')}
                className={`w-full text-left px-4 py-3 rounded-xl border font-bold text-xs transition cursor-pointer ${activeSensorGroup === 'cw' ? 'bg-[#003366] text-white border-transparent' : 'bg-slate-50 text-slate-755 border-slate-200 hover:bg-slate-100'}`}
              >
                Карандашные CW
              </button>
            </div>

            {/* Selected Group Display */}
            <div className="lg:col-span-3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sensors[activeSensorGroup as keyof typeof sensors].map((sensor, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:shadow-xs hover:border-[#00AEEF]/20 transition">
                  <div className="space-y-1.5">
                    <span className="bg-[#00AEEF]/10 text-[#003366] text-[10px] font-mono font-black px-3 py-1 rounded-md">
                      ДАТЧИК {sensor.name}
                    </span>
                    <h4 className="text-xs font-black text-slate-800 pt-1.5">{sensor.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{sensor.desc}</p>
                  </div>
                  <button 
                    onClick={() => triggerQuote(product, 'consultation')}
                    className="w-full text-[10px] font-mono font-bold uppercase text-[#003366] hover:text-[#00AEEF] transition text-left pt-2 flex items-center gap-1.5 cursor-pointer bg-transparent border-t border-slate-200/40"
                  >
                    Запросить цену на датчик <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 📦 8. INCLUSIONS & GUARANTEES */}
      <section id="consona-deliverables" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">АБСОЛЮТНАЯ БЕЗОПАСНОСТЬ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              Что Вы получаете в комплекте поставки Consona N8?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Вы подписываете договор и получаете готовый медицинский инструмент под ключ с полным сопровождением.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* List of deliverables */}
            <div className="space-y-3">
              {product.packageIncludes?.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 bg-white rounded-xl border border-slate-200/80">
                  <span className="bg-[#00AEEF]/10 text-[#00AEEF] p-1.5 rounded-lg flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <p className="text-xs text-slate-650 font-sans font-semibold leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            {/* Support guarantees info banner */}
            <div className="bg-[#003366] text-white p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest font-mono">СЕРВИСНАЯ ГАРАНТИЯ ASTMED</span>
                <h4 className="text-xl font-bold">Сертифицированное обслуживание и юридическая защита</h4>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Мы являемся авторизованным партнером Mindray. Обеспечиваем бесперебойную работу Вашего медицинского кабинета УЗИ в любой точке России.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-white/10">
                <div className="flex gap-2.5 items-start">
                  <ShieldCheck className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">24 месяца гарантии</h5>
                    <p className="text-[10px] text-slate-400">Полное контрактное гарантийное сопровождение на консоль сканера и все датчики.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <FileCheck className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Официальный ввод</h5>
                    <p className="text-[10px] text-slate-400">Ввод в штатную клиническую эксплуатацию авторизованными инженерами.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <MessageSquare className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Клинический аппликатор</h5>
                    <p className="text-[10px] text-slate-400">Инструктаж и первичное обучение Ваших УЗ-специалистов базовым и ИИ-модулям.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Wrench className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Сервисный СЦ</h5>
                    <p className="text-[10px] text-slate-400">Собственный склад оригинальных ЗИП заготовок для оперативного ремонта.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🎁 9 & 10. LEAD MAGNET & CAPTURE FORM WITH BIKU-BLUE ACCENTS */}
      <section id="consona-lead-form" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#003366] text-white border-2 border-[#00AEEF]/40 rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-4 right-4 bg-[#00AEEF] text-slate-950 font-mono text-[9px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
            ⏰ Спецпредложение действует ограниченное время!
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest font-mono block">КЛИНИЧЕСКИЙ РАЗБОР И ПОДБОР</span>
            <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
              Оставьте Ваш номер телефона и получите БЕСПЛАТНО:
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#001c3c] border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="font-black text-[#00AEEF] text-xs">📈 1. Сводная таблица сравнения</div>
              <p className="text-[10px] text-slate-350 leading-relaxed">
                Честный разбор: Consona N8 vs DC-90 vs GE Versana Premier без рекламных лозунгов.
              </p>
            </div>
            <div className="bg-[#001c3c] border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="font-black text-[#00AEEF] text-xs">🛠 2. Подбор датчиков</div>
              <p className="text-[10px] text-slate-350 leading-relaxed">
                Индивидуальный подбор комплекта под Ваши лицензии без лишней переплаты за ненужный софт.
              </p>
            </div>
            <div className="bg-[#001c3c] border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="font-black text-[#00AEEF] text-xs">📺 3. Онлайн ZST+ демонстрация</div>
              <p className="text-[10px] text-slate-350 leading-relaxed">
                Экспертная демонстрация возможностей канальной обработки в прямом эфире на фантомах.
              </p>
            </div>
          </div>

          {/* Capture Form */}
          <form onSubmit={handleFormSubmit} className="pt-6 border-t border-white/10">
            {submitted ? (
              <div className="bg-[#00AEEF]/20 border border-[#00AEEF]/40 text-[#00AEEF] p-4 rounded-xl text-xs font-bold text-center">
                ✔ Ваша заявка отправлена! PDF-сравнение и подборка датчиков подготавливаются. Эксперт УЗИ оборудования перезвонит Вам в течение 15 минут.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white text-slate-900 border border-slate-300 rounded-xl py-3.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-[#00AEEF] transition"
                  />
                </div>
                <div className="flex-1 relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00AEEF]" />
                  <input 
                    type="tel" 
                    required
                    placeholder="Ваш номер телефона*" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white text-slate-900 border border-slate-300 rounded-xl py-3.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-[#00AEEF] transition"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#00AEEF] hover:bg-[#0090c5] text-slate-950 font-black px-6 py-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer text-center"
                >
                  Получить подбор и сравнение бесплатно
                </button>
              </div>
            )}
            
            <div className="text-[10px] text-slate-400 mt-3 text-center sm:text-left">
              * Перезвоним в течение 15 минут. Без навязчивых звонков — только по делу.
            </div>
          </form>

        </div>
      </section>

      {/* SECTION: НАША КОМАНДА "ASTMED" */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 mt-12 max-w-7xl mx-auto" id="astmed-team-trust">
        <div className="grid lg:grid-cols-12 gap-8 items-center text-slate-100 text-left">
          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-slate-800">
            <img 
              src="/images/team_aesthet.jpg" 
              alt="Команда Astmed" 
              className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-mono tracking-widest bg-cyan-600 px-2.5 py-1 rounded font-bold">ОФИС И КОМАНДА ASTMED</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-cyan-950/40 border border-cyan-800/60 px-3 py-1.5 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Нам доверяют ведущие клиники
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-none">
              Команда экспертов «Astmed» — Ваша опора на каждом этапе
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Каждое поставляемое устройство — это не просто коробка, а долгосрочное партнерство. Наша сертифицированная команда <strong className="text-white">Astmed</strong> состоит из высококлассных инженеров медтехники, практикующих врачей-косметологов и сертифицированных бизнес-консультантов.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Мы лично доставляем оборудование по всей России, проводим пусконаладочные работы, занимаемся обучением вашего персонала с выдачей дипломов и обеспечиваем молниеносное сервисное сопровождение 24/7. Покупая у нас, вы защищаете клинику от простоев и получаете поток довольных пациентов с первого дня!
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 font-sans">
              <div className="border border-slate-800 bg-slate-950/50 p-3 rounded-xl">
                <span className="text-sm font-black text-cyan-400 block font-mono">100% Честность</span>
                <span className="text-[10px] text-slate-500">Живой показ и тест-драйв оборудования</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/50 p-3 rounded-xl">
                <span className="text-sm font-black text-cyan-400 block font-mono">Официальный СЦ</span>
                <span className="text-[10px] text-slate-500">Инженеры с лицензией Росздравнадзора</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧾 11. LEGAL STATE MEDICAL DISCLAIMER */}
      <footer id="consona-disclaimer" className="bg-slate-900 text-slate-500 py-12 text-center text-[10px] border-t border-slate-800 space-y-2">
        <p className="max-w-3xl mx-auto px-4 uppercase tracking-widest leading-loose">
          Имеются противопоказания. Проконсультируйтесь со специалистом. <br />
          Данное медицинское оборудование имеет действующее Регистрационное Удостоверение (РУ) Минздрава Российской Федерации. Поставка осуществляется в строгом соответствии с действующим законодательством РФ.
        </p>
        <p className="text-slate-600 font-mono">
          &copy; {new Date().getFullYear()} AstMed LLC. Все права защищены.
        </p>
      </footer>

      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="consona-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
