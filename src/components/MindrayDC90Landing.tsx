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
  Baby,
  Building,
  Wrench,
  TrendingUp,
  Eye,
  Layers,
  Award as AwardIcon
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';
import { AstmedTeamBlock } from './AstmedTeamBlock';

interface MindrayDC90LandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const MindrayDC90Landing: React.FC<MindrayDC90LandingProps> = ({
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
  const [activeFeatureTab, setActiveFeatureTab] = useState<string>('smartface');

  // Lead capture states
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ROI calculation for high flow
  const [patientCount, setPatientCount] = useState(50);
  const [scanCost, setScanCost] = useState(3000);

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const roiCalculations = useMemo(() => {
    const weeklyRevenue = patientCount * scanCost;
    const monthlyRevenue = weeklyRevenue * 4.3;
    const costPerScan = 150; // consumables
    const doctorShare = 0.35; // 35% commission
    const overheadShare = 0.15; // 15% other overheads
    
    // Net profit percentage is 50%
    const netProfitMargin = 1.0 - (doctorShare + overheadShare);
    const monthlyNetProfit = Math.round((monthlyRevenue - (patientCount * 4.3 * costPerScan)) * netProfitMargin);
    
    const initialInvestment = product.price || 3900000;
    const paybackMonths = monthlyNetProfit > 0 ? Math.max(1, Math.ceil(initialInvestment / monthlyNetProfit)) : 24;
    
    return {
      monthlyRevenue: Math.round(monthlyRevenue),
      monthlyNetProfit,
      paybackMonths
    };
  }, [patientCount, scanCost, product.price]);

  const reasons = [
    {
      title: "«Mindray — это китайский, значит хуже?»",
      badge: "Процессор X-Engine GPU+CPU",
      question: "Как китайский бренд обходит американские и европейские системы премиум-класса?",
      desc: "Mindray сегодня — это глобальный топ-3 в мировой медтехнике с официальной сертификацией CE и FDA США, используемый в 190+ странах мира. Ядром аппарата DC-90 является революционная платформа X-Insight на базе сдвоенной архитектуры CPU+GPU процессора X-Engine. Она обрабатывает массивы акустических данных в 3-4 раза быстрее стандартных систем, обеспечивая мгновенный рендеринг сложнейших 3D/4D сцен без запаздывания кадра.",
      proof: "Скорость обработки сигналов превосходит многие аналоги элитных брендов в той же ценовой категории, делая работу врача максимально плавной."
    },
    {
      title: "«Хорошо ли видит сложных пациентов?»",
      badge: "Single Crystal + 3T + ComboWave",
      question: "Как пробить плотные ткани у тучных пациентов и сохранить детализацию?",
      desc: "Благодаря кристаллическим технологиям Triple Transducer (3T) и запатентованной ComboWave архитектуре датчиков, Mindray DC-90 предлагает выдающуюся пенетрацию (проникающую способность) без потери пространственного разрешения. Монокристаллические решетки датчиков Single Crystal минимизируют акустический шум, вытягивая глубокие сигналы у самых сложных пациентов.",
      proof: "5 одновременно подключенных активных портов гарантируют, что все нужные датчики всегда под рукой без износа разъемов при перетыкании."
    },
    {
      title: "«Нужна точная диагностика онкологии и печени?»",
      badge: "STE Эластография + UWN+ Contrast",
      question: "Как достоверно определить жесткость очага без травматичной биопсии?",
      desc: "В аппарат внедрена экспертная эластография сдвиговой волны Sound Touch Elastography (STE) с патентованным методом Ultra-Wide Beam Tracking. Это дает количественную оценку жесткости тканей с минимальным числом артефактов движений. В сочетании с контрастным УЗИ 2-го поколения UWN+ (Ultra-Wideband Non-Linear CEUS) вы сможете улавливать даже самые медленные микрососудистые потоки внутри новообразований.",
      proof: "Внедрение STE повышает выявляемость злокачественных узлов Schilddrüse и печени на ранних стадиях до 94.8%."
    },
    {
      title: "«Часто делаю ОБ — насколько умный аппарат?»",
      badge: "ИИ-ассистенты Smart Planes & Smart Face",
      question: "Как облегчить рутину при большом потоке беременных?",
      desc: "Mindray DC-90 берет рутину на себя. Система Smart Planes CNS автоматически распознает плоскости головного мозга плода и за одно касание выводит стандартные срезы с проведением биометрии. Интеллектуальный помощник Smart Face автоматически убирает из кадра любые помехи (пуповину, плацентарные структуры, ручки плода), восстанавливая чистое изображение лица младенца в 3D режиме.",
      proof: "Режим Smart Planes CNS сокращает ручные манипуляции и время скрининга плода на 35%."
    },
    {
      title: "«Провожу пункции и биопсии — безопасно?»",
      badge: "Needle Recognition в реальном времени",
      question: "Как четко контролировать кончик иглы под углом?",
      desc: "Для безопасности и точности интервенционных манипуляций в Mindray DC-90 интегрирована усовершенствованная система Needle Recognition. Она автоматически выделяет и подсвечивает иглу в реальном времени, повышая контрастность металлического стержня даже при сильном наклоне датчика относительно плоскости сканирования.",
      proof: "Абсолютная безопасность биопсий и регионарной анестезии без риска повреждения крупных сосудов и нервных стволов."
    },
    {
      title: "«А кардиология на стационаре?»",
      badge: "Полный Кардиопакет Auto EF",
      question: "Что предлагает DC-90 для углубленной кардиоваскулярной диагностики?",
      desc: "Это не просто гинекологический прибор, а мощный универсал. На борту присутствует полноценный кардиологический пакет: автоматический расчет фракции выброса левого желудочка Auto EF на базе ИИ-контурирования, тканевой допплер (TDI) с количественным анализом, а также инновационный цветной допплер Glazing Flow для тончайшего анализа гемодинамики в сосудах сердца.",
      proof: "Идеален для многопрофильных медицинских центров, где один аппарат делят гинекологи, кардиологи и сосудистые хирурги."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      setSubmitted(true);
      logger.info('Mindray DC-90 Lead submit successful', { name, phone });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-[#00AEEF]/20 selection:text-slate-900">
      
      {/* 🧭 NAVIGATION HEADER */}
      <header className="bg-white border-b border-slate-200 relative z-10 py-4 px-6 text-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={onBackToCatalog}
              className="flex items-center justify-center gap-2 text-slate-705 hover:text-slate-900 transition group cursor-pointer border border-slate-200 bg-white py-2 px-4 rounded-xl hover:bg-slate-50 text-xs font-bold shrink-0 w-full sm:w-auto"
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
              <span className="text-slate-707 font-bold text-slate-700 truncate max-w-[240px] sm:max-w-none">{product.name}</span>
            </div>
          </div>
          <div className="flex gap-2.5 items-center w-full md:w-auto justify-between sm:justify-start">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${favorites.includes(product.id) ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-rose-505 text-rose-500' : ''}`} />
              <span>{favorites.includes(product.id) ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${compareList.includes(product.id) ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{compareList.includes(product.id) ? 'В сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </header>
      {/* DE-DUPLICATED PORTION */}
      <header className="hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onBackToCatalog}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition group cursor-pointer border border-slate-200 bg-white py-1.5 px-3 rounded-xl hover:bg-slate-50 text-xs font-bold"
              id="back-to-catalog-btn"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Вернуться в каталог
            </button>
            <div className="text-xs text-slate-400 font-medium font-sans flex items-center gap-1.5 flex-wrap">
              <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">Главная</span>
              <span className="text-slate-300">/</span>
              <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">Каталог</span>
              <span className="text-slate-300">/</span>
              <span onClick={onBackToCatalog} className="hover:text-slate-900 hover:underline transition cursor-pointer">УЗИ сканеры</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-bold">{product.name}</span>
            </div>
          </div>
          <div className="flex gap-2.5 items-center">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${favorites.includes(product.id) ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorites.includes(product.id) ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${compareList.includes(product.id) ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{compareList.includes(product.id) ? 'В сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 🚀 🔥 1 & 2. HERO HEADER SECTION */}
      <section className="bg-gradient-to-br from-[#003366] to-[#001f40] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Abstract vector branding accents in background */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#00AEEF]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] px-3.5 py-1.5 rounded-full border border-[#00AEEF]/30 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Премиальный флагман линейки DC с ИИ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Видит то, что другие пропускают — <br className="hidden sm:inline" />
              <span className="text-[#00AEEF] underline decoration-wavy decoration-[#00AEEF]/40 underline-offset-8">
                и делает это в 3–4 раза быстрее!
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Флагманский стационарный УЗИ-аппарат <strong className="text-white font-bold">Mindray DC-90</strong> преодолевает барьеры сложной визуализации благодаря интеллекту платформы 
              <span className="text-[#00AEEF] font-bold"> X-Insight</span> и архитектуре <span className="text-white font-bold">X-Engine</span>, предлагая клиникам экспертное качество и производительность по честной цене.
            </p>

            {/* Social Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-md text-xs">
              <div className="space-y-1">
                <span className="block text-xl font-black text-[#00AEEF]">CE + FDA</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Сертификация</span>
              </div>
              <div className="space-y-1">
                <span className="block text-xl font-black text-[#00AEEF]">Топ-3</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Мирового рынка</span>
              </div>
              <div className="space-y-1">
                <span className="block text-xl font-black text-[#00AEEF]">190+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Стран доверия</span>
              </div>
            </div>

            {/* CTA action triggers */}
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
              <span>Регистрационное удостоверение Минздрава РФ • Полный пакет док-тов</span>
            </p>
          </div>

          {/* Hero Right Media Panel */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3.2] bg-[#001f40]/80 border border-white/15 rounded-3xl p-4 overflow-hidden shadow-2xl flex flex-col justify-between">
              
              {/* Sci-fi tech grid background for premium safety fallback */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#003366]/40 to-transparent pointer-events-none" />
              
              {/* Dynamic decorative radar scan-wave in background */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#00AEEF]/5 rounded-full pointer-events-none animate-pulse" />
              
              {/* Image with strict bounds, safety container & absolute helper */}
              <div className="w-full flex-1 relative rounded-2xl overflow-hidden flex items-center justify-center bg-slate-950/40">
                <img 
                  src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&h=450&q=80" 
                  alt="Mindray DC-90 X-Insight" 
                  className="w-full h-full object-cover opacity-80 mix-blend-screen"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Embedded High-Tech Diagnostic Panel Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">X-ENGINE ACTIVE</span>
                      </div>
                      <div className="text-[9px] font-mono text-slate-400">FPS: 145 / GAIN: 65%</div>
                    </div>
                    <span className="text-[10px] font-mono text-[#00AEEF] bg-[#00AEEF]/10 border border-[#00AEEF]/20 px-2 py-0.5 rounded uppercase font-bold">
                      STE Elastic
                    </span>
                  </div>

                  {/* Aesthetic mock graph representing tissue stiffness or cardiac wave */}
                  <div className="w-full h-16 flex items-end justify-between px-2 opacity-50 relative">
                    <svg className="absolute inset-0 w-full h-full text-[#00AEEF]" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path 
                        d="M0 15 Q 15 5, 25 15 T 50 15 T 75 10 T 100 15" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                      />
                    </svg>
                    <div className="text-[8px] font-mono text-[#00AEEF]/60 w-full flex justify-between absolute bottom-1 left-2 pr-4">
                      <span>0.0s</span>
                      <span>1.5s</span>
                      <span>3.0s</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Overlay Interactive Tag (fully flexed and safely relative at foot) */}
              <div className="relative mt-3 bg-[#001f40]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center justify-between z-20 shadow-lg">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Презентация аппарата</span>
                  <span className="text-xs font-black text-[#00AEEF]">5 Активных портов датчиков</span>
                </div>
                <span className="bg-[#00AEEF]/20 text-[#00AEEF] font-mono text-[10px] px-2.5 py-1 rounded font-bold">
                  AM-MR-DC90
                </span>
              </div>
            </div>

            {/* Float tags */}
            <div className="absolute -top-4 -left-4 bg-[#00AEEF] text-slate-950 font-black text-[10px] px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider font-mono z-30">
              🔥 Best Price-Value flag
            </div>
          </div>

        </div>
      </section>

      {/* 🏥 3. "КОМУ ПОДХОДИТ" SECTION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">КЛИНИЧЕСКИЙ ПРОФИЛЬ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              Кому идеально подходит Mindray DC-90?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Высокая производительность процессора X-Engine и сдвоенная логика делают систему незаменимой в клиниках с плотным расписанием и сложными диагностическими кейсами.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            
            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Baby className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Акушеры и гинекологи</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Автодетекция плоскостей ЦНС и чистая 3D/4D визуализация лица плода.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Гепатологи и терапевты</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Сдвиговая эластография STE и контрасты UWN+ для скрининга циррозов и рака.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Activity className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Кардиологи</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Автоматический расчет выброса Auto EF, TDI и Glazing цветной кровоток.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Sliders className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Хирурги и онкологи</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Улучшенная навигация иглы Needle Recognition при биопсиях и пункциях.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Многопрофильные МЦ</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Закрывает 100% диагностических нужд любых нанимаемых специалистов.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-between space-y-3 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#003366]/5 rounded-xl flex items-center justify-center text-[#003366]">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">Специалисты УЗИ высокой нагрузки</h4>
                <p className="text-[10px] text-slate-500 leading-normal">5 портов датчиков, мгновенный отклик клавиш и автоматическая оптимизация Whizz/iClear+.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🛡️ 4. SIX REASONS SECTION WITH INTERACTIVE CHANGER */}
      <section className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">РЕШЕНИЕ СОМНЕНИЙ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              6 веских причин выбрать Mindray DC-90
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Снимаем главные возражения клиник еще до первого звонка — на языке клинических результатов, цифр и экспертных технологий.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Reasons tabs left list */}
            <div className="lg:col-span-5 space-y-2">
              {reasons.map((item, index) => (
                <div key={index} className="space-y-2">
                  <button
                    onClick={() => setActiveReason(index)}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 cursor-pointer ${
                      activeReason === index 
                        ? 'bg-gradient-to-r from-[#003366] to-[#002850] text-white border-transparent shadow-md' 
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
                        <span className="bg-[#00AEEF]/10 text-[#00AEEF] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-black text-rose-650 uppercase tracking-widest font-mono">
                          Реальное решение
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-[#003366] leading-snug">
                        {item.question}
                      </h3>
                      <p className="text-xs text-slate-655 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                      <div className="bg-[#00AEEF]/5 border-l-4 border-[#00AEEF] p-4 rounded-r-xl space-y-1">
                        <div className="text-[10px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <AwardIcon className="w-3.5 h-3.5 text-[#00AEEF]" />
                          <span>Клиническое превосходство</span>
                        </div>
                        <p className="text-[11px] text-slate-600 italic">
                          &ldquo;{item.proof}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reasons detail view right */}
            <div className="hidden lg:flex lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm min-h-[360px] flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#00AEEF]/10 text-[#00AEEF] text-[10px] font-mono font-bold px-3 py-1 rounded">
                    {reasons[activeReason].badge}
                  </span>
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest font-mono">
                    Реальное решение
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#003366] leading-snug">
                  {reasons[activeReason].question}
                </h3>

                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans">
                  {reasons[activeReason].desc}
                </p>
              </div>

              {/* Clinical proof section */}
              <div className="bg-[#00AEEF]/5 border-l-4 border-[#00AEEF] p-4 rounded-r-xl space-y-1">
                <div className="text-[10px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AwardIcon className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Клиническое превосходство</span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  &ldquo;{reasons[activeReason].proof}&rdquo;
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 🤩 5. WOW-POSSIBILITIES SECTION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] font-mono">ТЕХНОЛОГИЧЕСКИЙ ПРОРЫВ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              Три WOW-возможности, которые выделяют DC-90 среди конкурентов
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Это не сухие строчки из техпаспорта. Это запатентованные алгоритмы, за которые пациенты доверяют вашу клинику и оставляют восторженные отзывы.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* WOW 1: Smart Face */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
              <div className="bg-[#00AEEF]/10 text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                01
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">Эпический триггер для будущих мам</span>
                <h3 className="font-extrabold text-base text-slate-850">Smart Face — Лицо младенца без помех одним касанием</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Будущие мамы приходят на УЗИ не за техническими диагнозами, а для встречи со своим малышом. Smart Face за одну секунду распознает и стирает с экрана пуповину, куски плаценты и конечности, мешающие обзору. 
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Результат: Потрясающий, кинематографичный 3D-портрет ребенка в высоком разрешении. Клинические отзывы вашего центра взлетят в разы.
                </p>
              </div>
            </div>

            {/* WOW 2: Glazing Flow */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
              <div className="bg-[#00AEEF]/10 text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                02
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">Тончайшая сосудистая архитектура</span>
                <h3 className="font-extrabold text-base text-slate-850">Glazing Flow — 3D кровоток как на хирургическом дисплее</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Больше никаких размытых смазов цветных доплеров (CFM). Glazing Flow выстраивает трехмерную визуализацию сосудистого русла в реальном времени. Врач видит даже мельчайшую капиллярную перфузию опухолей.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Результат: Безупречное выявление огибающего кровотока узлов матки, щитовидной железы и почек с 3D-пластичностью картинки.
                </p>
              </div>
            </div>

            {/* WOW 3: UWN+ CEUS */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
              <div className="bg-[#00AEEF]/10 text-[#00AEEF] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono">
                03
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00AEEF] tracking-widest uppercase font-mono block">Элитный онкопоиск экспертного типа</span>
                <h3 className="font-extrabold text-base text-slate-850">UWN+ CEUS — Контраст второго поколения</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Порождает гармоники второго поколения на сверхнизком механическом индексе. Метод позволяет более длительно отслеживать движение микропузырьков газа в печени и мочевыделительной системе.
                </p>
                <p className="text-xs font-semibold text-slate-800 italic">
                  Результат: Полноценное раннее выявление признаков и плотности гепатоцеллюлярных и ренальных опухолей без лучевой КТ-нагрузки.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 📊 6. INDIVIDUAL TECH SPEC TABLE & ROI ESTIMATOR */}
      <section className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Technical specifications table */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#00AEEF] tracking-widest font-mono">ОФИЦИАЛЬНЫЙ СПЕЦ-ПАРАМЕТР</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#003366]">
                Характеристики Mindray DC-90
              </h3>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.fullSpecs || {}).map(([key, value], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-bold text-[#003366] w-2/5 border-b border-slate-100">{key}</td>
                      <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive ROI investment calculator */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                УМНЫЕ ИНВЕСТИЦИИ КЛИНИКИ
              </div>
              <h3 className="text-xl font-black text-[#003366] tracking-tight">Калькулятор окупаемости Mindray DC-90</h3>
              <p className="text-[11px] text-slate-400">
                За счет ИИ-функций и 5 портов врач УЗИ принимает пациентов быстрее. Рассчитайте окупаемость для вашей клиники.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Пациентов в неделю:</span>
                  <span className="text-[#00AEEF] font-mono">{patientCount} человек</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="150" 
                  step="5"
                  value={patientCount}
                  onChange={(e) => setPatientCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Средняя стоимость исследования УЗИ:</span>
                  <span className="text-[#00AEEF] font-mono">{scanCost.toLocaleString()} ₽</span>
                </div>
                <input 
                  type="range" 
                  min="1500" 
                  max="7000" 
                  step="250"
                  value={scanCost}
                  onChange={(e) => setScanCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono block">Оборот в месяц</span>
                <span className="text-xs font-black text-slate-800">{roiCalculations.monthlyRevenue.toLocaleString()} ₽</span>
              </div>
              <div className="space-y-1 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[9px] text-emerald-600 uppercase tracking-widest font-mono block">Чистая прибыль</span>
                <span className="text-xs font-black text-emerald-700">{roiCalculations.monthlyNetProfit.toLocaleString()} ₽</span>
              </div>
              <div className="space-y-1 bg-[#00AEEF]/5 p-2.5 rounded-xl border border-[#00AEEF]/10">
                <span className="text-[9px] text-[#00AEEF] uppercase tracking-widest font-mono block">Срок окупаемости</span>
                <span className="text-xs font-black text-[#003366]">{roiCalculations.paybackMonths} мес.</span>
              </div>
            </div>

            <button
              onClick={() => triggerQuote(product, 'leasing')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-[#003366] font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition text-center"
            >
              Рассчитать покупку в лизинг (от 10% первоначальный взнос)
            </button>
          </div>

        </div>
      </section>

      {/* 📦 7. PACKAGE DELIVERABLES AND WARRANTY */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-[#00AEEF] tracking-widest font-mono">КОМПЛЕКТАЦИЯ И СЕРВИС</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
              Что входит в комплект поставки Mindray DC-90?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Вы получаете полностью готовое к клинической работе решение. Никаких скрытых платежей, платных активаций опций или платного обучения врачей.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left list of inclusions */}
            <div className="space-y-3">
              {product.packageIncludes?.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-105/60">
                  <span className="bg-[#00AEEF]/10 text-[#00AEEF] p-1.5 rounded-lg flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <p className="text-xs text-slate-650 font-sans font-medium">{item}</p>
                </div>
              ))}
            </div>

            {/* Right: Service commitments banner */}
            <div className="bg-[#003366] text-white p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest font-mono">ПОДДЕРЖКА ASTMED</span>
                <h4 className="text-xl font-bold">Сервисные обязательства партнера высшего уровня</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Мы являемся сертифицированным дилером Mindray, поэтому предоставляем максимально безопасные договорные финансовые и сервисные гарантии на территории РФ.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-white/10">
                <div className="flex gap-2.5 items-start">
                  <ShieldCheck className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">24 месяца гарантии</h5>
                    <p className="text-[10px] text-slate-400">Гарантия на консоль и на все поставляемые датчики по договору.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <FileCheck className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Выездной монтаж</h5>
                    <p className="text-[10px] text-slate-400">Бесплатная сборка, инсталляция, проверка датчиков на фантомах.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <MessageSquare className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Инструктаж аппликатора</h5>
                    <p className="text-[10px] text-slate-400">Обучение ваших УЗ-врачей всем ИИ-системам со сдачей теста.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Wrench className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Подменный фонд</h5>
                    <p className="text-[10px] text-slate-400">Выдаем аналогичный датчик или аппарат из подменного фонда на период ремонта.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🔮 8 & 9. LEAD MAGNET & CAPTURE FORM (BIQUOUISE ACCENTED) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#003366] text-white border-2 border-[#00AEEF]/40 rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden shadow-2xl">
          
          {/* Urgent indicator badge */}
          <div className="absolute top-4 right-4 bg-[#00AEEF] text-slate-950 font-mono text-[9px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
            ⏰ Спецпредложение действует до конца недели!
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest font-mono block">УСТАНОВКА В ДЕНЬ ЗАПРОСА</span>
            <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
              Оставьте ваш номер телефона прямо сейчас и получите бесплатно:
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#001f40] border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="font-black text-[#00AEEF] text-xs">✅ 1. Демонстрация на выезд/онлайн</div>
              <p className="text-[10px] text-slate-350 leading-relaxed">
                Покажем работу DC-90 на живом пациенте, замерим скорость ИИ-расчетов Smart Planes при вас.
              </p>
            </div>
            <div className="bg-[#001f40] border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="font-black text-[#00AEEF] text-xs">✅ 2. PDF-сравнение со всеми GE</div>
              <p className="text-[10px] text-slate-350 leading-relaxed">
                Непредвзятый, честный аналитический разбор DC-90 vs GE Logiq, Versana и Samsung по пунктам.
              </p>
            </div>
            <div className="bg-[#001f40] border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="font-black text-[#00AEEF] text-xs">✅ 3. Персональный расчет КП</div>
              <p className="text-[10px] text-slate-350 leading-relaxed">
                Расчет полной стоимости аппликации под ваш перечень клинических задач без навязанных переплат.
              </p>
            </div>
          </div>

          {/* Form action */}
          <form onSubmit={handleFormSubmit} className="pt-6 border-t border-white/10">
            {submitted ? (
              <div className="bg-[#00AEEF]/20 border border-[#00AEEF]/40 text-[#00AEEF] p-4 rounded-xl text-xs font-bold text-center">
                ✔ Спасибо за проявленный интерес! Комплексный PDF-сводный отчет и расчет цены формируются. Наш медицинский эксперт перезвонит на указанный номер в течение 15 минут.
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
                    className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl py-3.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-[#00AEEF] transition"
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
                    className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl py-3.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-[#00AEEF] transition"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#00AEEF] hover:bg-[#0092ca] text-slate-950 font-black px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-md shadow-[#00AEEF]/20 text-center"
                >
                  Получить демонстрацию и расчет
                </button>
              </div>
            )}
            <div className="text-[10px] text-slate-400 mt-3 text-center">
              *Нажимая кнопку, вы соглашаетесь на обработку персональных данных • Без обязательств • Работаем строго официально
            </div>
          </form>

        </div>
      </section>

      {/* SECTION: НАША КОМАНДА "ASTMED" */}
      <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 mt-12 max-w-5xl mx-auto" id="astmed-team-trust">
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
              <div className="border border-slate-800 bg-slate-900/50 p-3 rounded-xl">
                <span className="text-sm font-black text-cyan-400 block font-mono">100% Честность</span>
                <span className="text-[10px] text-slate-500">Живой показ и тест-драйв оборудования</span>
              </div>
              <div className="border border-slate-800 bg-slate-900/50 p-3 rounded-xl">
                <span className="text-sm font-black text-cyan-400 block font-mono">Официальный СЦ</span>
                <span className="text-[10px] text-slate-500">Инженеры с лицензией Росздравнадзора</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION FOOTER DISCLAIMER */}
      <AstmedTeamBlock />

      <footer className="border-t border-slate-200 mt-16 pt-8 max-w-5xl mx-auto px-4 pb-12 text-center text-[10px] text-slate-400 space-y-2">
        <p className="uppercase tracking-widest font-bold">
          Имеются противопоказания. Перед использованием необходимо ознакомиться с инструкцией по применению и получить консультацию специалиста.
        </p>
        <p className="font-mono">
          Оборудование сертифицировано • Регистрационное Удостоверение Минздрава РФ • CE Marked • FDA Cleared • Поставляется ООО "АстМед" официальным представителем.
        </p>
      </footer>

      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="dc90-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
