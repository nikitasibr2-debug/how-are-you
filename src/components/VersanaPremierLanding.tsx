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

interface VersanaPremierLandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const VersanaPremierLanding: React.FC<VersanaPremierLandingProps> = ({
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
  const [activeIIDemo, setActiveIIDemo] = useState<string>('whizz');

  // Lead captures states
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ROI calculation
  const [patientCount, setPatientCount] = useState(40);
  const [scanCost, setScanCost] = useState(2500);

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const roiCalculations = useMemo(() => {
    const weeklyRevenue = patientCount * scanCost;
    const monthlyRevenue = weeklyRevenue * 4.3;
    const costPerScan = 120; // consumables
    const doctorShare = 0.35; // 35% commission
    const overheadShare = 0.15; // 15% other overheads
    
    // Net profit of clinic is approximately 50%
    const netProfitMargin = 1.0 - (doctorShare + overheadShare);
    const monthlyNetProfit = Math.round((monthlyRevenue - (patientCount * 4.3 * costPerScan)) * netProfitMargin);
    
    const initialInvestment = product.price || 3200000;
    const paybackMonths = monthlyNetProfit > 0 ? Math.max(1, Math.ceil(initialInvestment / monthlyNetProfit)) : 36;
    
    return {
      monthlyRevenue: Math.round(monthlyRevenue),
      monthlyNetProfit,
      paybackMonths
    };
  }, [patientCount, scanCost, product.price]);

  const reasons = [
    {
      title: "Качество как у дорогих аппаратов?",
      badge: "VisionBoost + Конкретика",
      desc: "Архитектура VisionBoost с высокоточным адаптивным бимформингом выжимает максимум из каждого датчика. Физические волны тонко модулируются для компенсации плотности мягких тканей. Результат — непревзойденный контраст серой шкалы и четкое отображение мельчайших границ органов на любой глубине без потери фреймрейта.",
      proof: "23.8\" Premium HD LCD широкоформатный монитор выведет визуализацию на уровень, доступный ранее только в экспертных системах за 6-8 млн руб."
    },
    {
      title: "Сложно освоить врачу?",
      badge: "Scan Coach & Обучение",
      desc: "Уникальный обучающий ассистент Scan Coach со встроенными 3D-схемами укладки датчиков и референсными картинками нормы прямо на экране подскажет врачу верное сечение. Scan Coach Voice Comments озвучивает подсказки на русском языке. My Trainer и My Assistant помогут настроить аппарат за пару минут.",
      proof: "Сообщество Versana Club дает доступ к закрытым вебинарам экспертов GE и базе клинических случаев 24/7."
    },
    {
      title: "Нужно ГИН + МСК + абдомен?",
      badge: "4 Активных порта • 21 Датчик",
      desc: "Versana Premier — абсолютный чемпион универсальности. На задней панели расположены 4 полностью активных порта, которые позволяют без физического отключения переключаться кнопкой меню между конвексным, линейным, внутриполостным и фазированным датчиком за 0.8 секунд. Поддерживается один из самых широких парков в классе — 21 датчик RS-Pin.",
      proof: "Никакого амортизационного износа контактов при постоянном переключении вручную."
    },
    {
      title: "ИИ — это просто маркетинг?",
      badge: "Реальные ассистенты Whizz",
      desc: "Система Whizz — это полноценный интеллектуальный автопилот. Одно нажатие клавиши — и нейросеть анализирует гистограмму кадра, выравнивая гейн и подавляя артефакты. Whizz Color Flow автоматически подстраивает скоростную шкалу цветного доплера. Whizz Follicle мгновенно подсчитывает и измеряет все фолликулы в 3D.",
      proof: "Функция Needle Recognition делает пункции и суставные блокады безопасными, подсвечивая иглу цветом."
    },
    {
      title: "Не сломается при потоке?",
      badge: "InSite™ и 7 лет поддержки",
      desc: "Производитель гарантирует до 7 лет полной технической поддержки и обновлений ПО. Встроенная технология компьютерного сопряжения GE InSite™ позволяет сервисному инженеру удаленно подключиться к вашей консоли через защищенный интернет-канал, провести диагностику плат за 15 минут и исправить 90% программных ошибок без выезда.",
      proof: "Золотой стандарт надежности американской мединженерии GE HealthCare."
    },
    {
      title: "Не устареет через 2 года?",
      badge: "Масштабируемая ПО Платформа",
      desc: "Система Versana Premier разработана на базе открытого масштабируемого ядра. В отличие от азиатских аналогов с фиксированными микроплатами, в Versana Premier новые опции (такие как V-Live 2.0 для реалистичного 3D-УЗИ плода в реальном времени) устанавливаются путем обновления лицензионных ключей без замены железа на протяжении 10 лет.",
      proof: "Запуск последнего пакета обновлений ПО состоялся в октябре 2024 года."
    }
  ];

  const iiTools = {
    whizz: {
      name: "Whizz Авто-Оптимизация",
      whatItDoes: "Интеллектуальный динамический фильтр.",
      useCase: "Врач нажимает одну кнопку, и ИИ мгновенно пересчитывает яркость кадра, убирает акустические тени от ребер и усиливает контрастность границ тканей. Работает непрерывно в реальном времени при перемещении датчика."
    },
    color: {
      name: "Whizz Color Flow",
      whatItDoes: "Автопилот цветного картирования.",
      useCase: "Больше не нужно вручную подстраивать шкалу PRF и частоту повторения импульсов доплера при переходе с сонной артерии на мелкие почечные сосуды. ИИ мгновенно ловит скорость кровотока и рисует идеальный спектр без шумов."
    },
    follicle: {
      name: "Whizz Follicle",
      whatItDoes: "Автоматический 3D-фолликулометр.",
      useCase: "В гинекологических скринингах при ИИ-детекции яичника система самостоятельно строит трехмерную сетку, находит все зреющие фолликулы, нумерует их и выдает таблицу с точным объемом и диаметром каждого за 2 секунды."
    },
    biometry: {
      name: "SonoBiometry",
      whatItDoes: "Умный акушерский замерщик плода.",
      useCase: "ИИ распознает анатомические ориентиры плода на снимке и за милисекунды проставляет маркеры для измерения бипариетального размера (БПР), окружности головы, живота и длины бедренной кости. Ошибка измерений сведена практически к нулю."
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitted(true);
    logger.info("Отправлена заявка на консультацию по GE Versana Premier", { phone, name });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased pb-20 selection:bg-blue-600 selection:text-white">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200/80 relative z-10 py-4 px-6 text-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={onBackToCatalog}
              className="flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 transition group cursor-pointer border border-slate-200 bg-white py-2 px-4 rounded-xl hover:bg-slate-50 text-xs font-bold shrink-0 w-full sm:w-auto"
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
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${favorites.includes(product.id) ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorites.includes(product.id) ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${compareList.includes(product.id) ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{compareList.includes(product.id) ? 'В сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Core */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>FDA 510(k) cleared • Выбор клиник в 160+ странах</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-5.5xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Один аппарат — <span className="text-blue-600 font-black">8 специальностей</span>.<br />
              Без дополнительного оборудования.
            </h1>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              Топовая стационарная УЗИ-система семейства Versana от американского гиганта <strong>GE HealthCare</strong>. Инновационный бимформинг VisionBoost, непревзойденный основной экран <strong>23.8"</strong>, 4 активных порта и встроенный суперассистент <strong>Whizz</strong> делают Premier самым окупаемым клиническим решением класса.
            </p>

            {/* Price Indicator & CTA buttons */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Гарантия лучшей цены от дилера AstMed:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-blue-600">3 200 000 ₽</span>
                  <span className="text-xs text-slate-405 line-through font-mono">3 700 000 ₽</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> В наличии на складе (Москва, СПб)
                </div>
              </div>
              <div className="flex flex-col gap-2.5 sm:w-auto w-full">
                <button 
                  onClick={() => triggerQuote(product, 'kp')}
                  className="bg-[#FF6600] hover:bg-[#E05500] text-white font-black px-6 py-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition duration-200 text-center cursor-pointer active:scale-95"
                >
                  Запросить КП с датчиками →
                </button>
                <div className="text-[10px] text-slate-500 text-center">Скидки до 15% при трейд-ин</div>
              </div>
            </div>

            {/* Quick Badges inside Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Дисплей 23.8" HD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>4 Порта Датчиков</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>21 Датчик RS-Pin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>7 Лет Поддержки</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xl w-full max-w-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-md text-[10px] font-bold">
                  ★ ХИТ ПРОДАЖ 2024–2026
                </div>
                <span className="text-[10px] font-bold text-slate-400 font-mono">АРТ. {product.article}</span>
              </div>

              {/* Ultrasound System Image Placeholder rendered cleanly */}
              <div className="aspect-[4/5] bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center p-6 group">
                <img 
                  src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&h=800&q=80" 
                  alt="GE Healthcare Versana Premier" 
                  className="max-h-72 object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/30 to-transparent p-4 flex justify-between items-center">
                  <span className="text-[10px] text-white font-bold bg-blue-600 px-2 py-1 rounded">Широкопрофильный</span>
                  <span className="text-[9px] text-white font-mono bg-slate-950/80 px-2 py-1 rounded">VisionBoost™</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Основной медицинский монитор:</span>
                  <span className="text-slate-800 font-bold">23.8" HD LCD плоский</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Диагональ тач-контроллера:</span>
                  <span className="text-slate-800 font-bold">15.6" IPS сенсорная</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-slate-500">
                  <span>Режимы 3D/4D Live:</span>
                  <span className="text-emerald-600 font-bold">V-Live 2.0 (Premium)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHO IS IT FOR SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">РЕШЕНИЕ ДЛЯ ЛЮБОГО НАПРАВЛЕНИЯ</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Кому подходит GE Healthcare Versana Premier?</h2>
          <p className="text-sm text-slate-500">
            Один аппарат закрывает потребности сразу нескольких специалистов клиники, избавляя вас от необходимости покупать разрозненные узконишевые системы.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Baby className="w-6 h-6 text-blue-600" />,
              title: "Гинекологи и акушеры",
              desc: "Высокоточное 3D/4D сканирование с автоматической биометрией плода SonoBiometry и системой автоподсчета фолликулов Whizz Follicle. Мгновенная разметка и составление отчетов в реальном времени."
            },
            {
              icon: <Syringe className="w-6 h-6 text-blue-600" />,
              title: "Хирурги и интервенционисты",
              desc: "Технология Needle Recognition подсвечивает иглу ярким цветом и отслеживает траекторию прокола при малоинвазивных биопсиях, пункциях суставов и проведении тонкоигольной анестезии."
            },
            {
              icon: <Stethoscope className="w-6 h-6 text-blue-600" />,
              title: "Терапевты и ВОП",
              desc: "Быстрый абдоминальный и терапевтический осмотр в 1 клик с помощью режима автопилота Whizz. Идеальное решение для экспресс-скринингов щитовидной железы, почек, печени и паренхиматозных органов."
            },
            {
              icon: <Activity className="w-6 h-6 text-blue-600" />,
              title: "МСК-специалисты",
              desc: "Высокочастотные линейные датчики и специализированные костные предустановки позволяют превосходно визуализировать тончайшие спортивные микротравмы мышц, связки, контраст суставных сумок и нервы."
            },
            {
              icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
              title: "Кардиологи и сосудистые хирурги",
              desc: "Цветной, постоянно- и импульсно-волновой допплерограф спектрального обследования сосудов шеи, конечностей, почечных артерий. Опция B-Flow и B-Flow Color выявляет сложные турбулентные потоки без артефактов."
            },
            {
              icon: <Building className="w-6 h-6 text-blue-600" />,
              title: "Частные и небольшие медцентры",
              desc: "Один аппарат для всех специалистов снижает финансовый порог входа в лицензирование. Высокая скорость пропуска пациентов, быстрый возврат вложений за счет престижного американского бренда в прайс-листе."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 hover:border-blue-300 p-6 rounded-3xl space-y-4 hover:shadow-lg transition duration-300">
              <div className="p-3 bg-blue-50 w-fit rounded-2xl border border-blue-100">
                {item.icon}
              </div>
              <h3 className="font-black text-base text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 REASONS / CLOSING OBJECTIONS */}
      <section className="py-20 bg-slate-100 border-y border-slate-205">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">ПРИМИТЕ ВЗВЕШЕННОЕ РЕШЕНИЕ</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">6 непререкаемых причин выбрать Versana Premier</h2>
            <p className="text-sm text-slate-500">
              Каждая карточка закрывает ключевое возражение главврачей и коммерческих директоров при покупке УЗИ.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Reasons Menu Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2">
              {reasons.map((r, idx) => (
                <div key={idx} className="space-y-2 w-full">
                  <button
                    onClick={() => {
                      setActiveReason(idx);
                      logger.info(`Reason selected: ${idx}`);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition duration-300 flex items-center justify-between cursor-pointer group ${activeReason === idx ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-650 hover:border-slate-350 hover:text-slate-900'}`}
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] block opacity-70 font-bold tracking-wider font-mono">ВОЗРАЖЕНИЕ 0{idx + 1}</span>
                      <span className="text-xs font-black">{r.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition ${activeReason === idx ? 'rotate-90 text-white' : 'text-slate-400 group-hover:text-slate-700'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {activeReason === idx && (
                    <div className="block lg:hidden bg-white border border-slate-205 rounded-2xl p-6 space-y-6 shadow-md text-left animate-fade-in relative overflow-hidden">
                      <div className="absolute top-4 right-4 bg-blue-50 text-blue-700 border border-blue-100 font-mono text-[9px] px-3 py-1 rounded font-black tracking-widest uppercase">
                        {r.badge}
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center font-black text-blue-600 text-lg shrink-0">
                            0{idx + 1}
                          </div>
                          <div>
                            <h3 className="text-base font-black text-slate-900 leading-snug">
                              Ответ на: "{r.title}"
                            </h3>
                            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Официальная позиция GE HealthCare</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                          <p className="text-xs text-slate-750 font-medium leading-relaxed">
                            {r.desc}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 mt-4 flex flex-col justify-between items-start gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-500 font-mono font-bold">Доказательство на практике:</span>
                        </div>
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 font-semibold px-3 py-1 rounded-lg">
                          {r.proof}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Answer detail Card */}
            <div className="hidden lg:flex lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-50 text-blue-700 border border-blue-100 font-mono text-[9px] px-3 py-1 rounded font-black tracking-widest uppercase">
                {reasons[activeReason].badge}
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center font-black text-blue-600 text-lg">
                    0{activeReason + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Ответ на: "{reasons[activeReason].title}"
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Официальная позиция GE HealthCare</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {reasons[activeReason].desc}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-500 font-mono font-bold">Доказательство на практике:</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 font-semibold px-3 py-1 rounded-lg">
                  {reasons[activeReason].proof}
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE AI INSTRUMENTS WHIZZ DEMONSTRATION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">ЭРА ИСКУССТВЕННОГО ИНТЕЛЛЕКТА В УЗИ</span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Инструменты автопилота Whizz на практике</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whizz — это не просто красивое слово. Это патентованная нейросетевая технология GE, обученная на миллионах верифицированных медицинских изображений. Она избавляет врача от 30% рутинных щелчков клавиш каждый день. Попробуйте переключить режимы ниже:
            </p>

            {/* AI tab selector buttons */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(iiTools).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveIIDemo(key);
                    logger.info(`AI Tool demonstrated: ${key}`);
                  }}
                  className={`p-4 text-left border rounded-2xl transition cursor-pointer ${activeIIDemo === key ? 'bg-blue-50 border-blue-400 font-bold' : 'bg-white border-slate-250 text-slate-500 hover:border-slate-350'}`}
                >
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                    <Zap className={`w-3.5 h-3.5 ${activeIIDemo === key ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{value.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI demonstration graphic container */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-blue-950/20 pointer-events-none" />
            <div className="absolute top-4 right-4 bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[9px] px-2.5 py-0.5 rounded-full">
              НЕЙРОСЕТЕВАЯ ВИЗУАЛИЗАЦИЯ
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-[11px] text-sky-400">
                <Check className="w-4 h-4 text-sky-400" />
                <span>РЕЖИМ: {iiTools[activeIIDemo as keyof typeof iiTools].name}</span>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-[10px] text-slate-500 font-bold block uppercase font-mono">Что делает ИИ на системном уровне:</span>
                <p className="text-sm font-bold text-white leading-relaxed">
                  {iiTools[activeIIDemo as keyof typeof iiTools].whatItDoes}
                </p>
              </div>

              <div className="p-5 bg-blue-950/40 border border-blue-800/20 rounded-2xl space-y-2">
                <span className="text-[10px] text-blue-400 font-bold block uppercase font-mono">Клинический результат для диагноста:</span>
                <p className="text-xs text-slate-350 leading-relaxed">
                  {iiTools[activeIIDemo as keyof typeof iiTools].useCase}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Пакет автопилота: GE Whizz Suite 2024</span>
              <span className="text-teal-400 font-bold">Оптимизация за 0.15 сек</span>
            </div>
          </div>

        </div>
      </section>

      {/* ROI & REVENUE CALCULATOR */}
      <section className="py-20 bg-slate-100 border-y border-slate-205">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">ФИНАНСОВЫЙ КАЛЬКУЛЯТОР KПИ</span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Рассчитайте окупаемость и выгоду клиники</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Престижное американское медоборудование GE увеличивает лояльность пациентов и средний чек обследования. Настройте ползунки, чтобы рассчитать чистый доход вашего диагностического кабинета.
            </p>

            {/* patients per week */}
            <div className="bg-white border border-slate-205 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Пациентов на УЗИ в неделю:</span>
                <span className="text-blue-600 font-black font-mono">{patientCount} исследований</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="150" 
                step="5"
                value={patientCount}
                onChange={(e) => setPatientCount(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10 человек</span>
                <span>150 человек (высокий поток)</span>
              </div>
            </div>

            {/* Average check */}
            <div className="bg-white border border-slate-205 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-505 text-slate-500">Средний чек одного исследования:</span>
                <span className="text-emerald-700 font-bold font-mono">{scanCost.toLocaleString('ru-RU')} ₽</span>
              </div>
              <input 
                type="range" 
                min="1200" 
                max="6000" 
                step="100"
                value={scanCost}
                onChange={(e) => setScanCost(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 200 ₽</span>
                <span>6 000 ₽ (экспертное УЗИ)</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Display Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-100 pb-3">Маржинальный ROI Анализ • Versana Premier</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase">ОЖИДАЕМЫЙ ДОХОД В МЕСЯЦ</span>
                <div className="text-2xl font-black text-blue-600 font-mono">
                  {roiCalculations.monthlyRevenue.toLocaleString('ru-RU')} ₽
                </div>
                <div className="text-[9px] text-slate-400">
                  ~{(patientCount * 4.3).toFixed(0)} обследований в месяц
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase">ЧИСТАЯ МАРЖА КЛИНИКИ</span>
                <div className="text-2xl font-black text-emerald-600 font-mono">
                  {roiCalculations.monthlyNetProfit.toLocaleString('ru-RU')} ₽
                </div>
                <div className="text-[9px] text-slate-400">
                  За вычетом з/п доктора и расходников (~50%)
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl space-y-1">
              <span className="text-[10px] text-blue-450 text-blue-800 font-bold uppercase">КАЛЕНДАРНЫЙ СРОК ПОЛНОЙ ОКУПАЕМОСТИ</span>
              <div className="text-xl font-black text-blue-900 font-mono">
                ~{roiCalculations.paybackMonths} {roiCalculations.paybackMonths === 1 ? 'месяц' : roiCalculations.paybackMonths < 5 ? 'месяца' : 'месяцев'}
              </div>
              <p className="text-[10px] text-slate-500">При закупке консоли по специальной дилерской цене в 3 200 000 ₽</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => triggerQuote(product, 'consultation')}
                className="flex-1 bg-[#FF6600] hover:bg-[#E05500] text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Получить бизнес-расчет
              </button>
              <button 
                onClick={() => triggerQuote(product, 'leasing')}
                className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer text-center"
              >
                Расчет лизинга 0%
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CHARACTERISTICS COMPACT TECHNICAL TABLE */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Технические характеристики Versana Premier</h2>
          <span className="text-xs text-slate-400 font-mono uppercase">Техническая спецификация для лицензирования и госзакупок</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 text-slate-505 font-mono font-bold">
                <th className="p-4">Название параметра</th>
                <th className="p-4">Инженерное соответствие (GE HealthCare)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(product.fullSpecs).map(([key, value]) => (
                <tr key={key} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-700">{key}</td>
                  <td className="p-4 text-slate-600 font-mono">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* WHAT YOU GET - SPECIFICATION ITEMS */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Что поставляется в комплекте под ключ</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Абсолютная чистота сделки с гарантией дилера AstMed: мы берем на себя все заботы от подготовки помещения до инсталляции.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Package Items */}
            <div className="md:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Официальный состав поставки:</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-slate-600">
                {product.packageIncludes.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service support Column */}
            <div className="md:col-span-5 bg-blue-50/50 border border-blue-105 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Гарантия и обучение:</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex gap-2 items-start">
                  <div className="p-1 bg-white border border-blue-200 rounded-lg text-blue-600 font-black font-mono">24</div>
                  <div>
                    <h5 className="font-bold text-slate-800">24 месяца гарантии</h5>
                    <p className="text-[10px] text-slate-550">Официальное сервисное обслуживание авторизованными инженерами GE.</p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800">Клинический инструктаж</h5>
                    <p className="text-[10px] text-slate-550">Наш врач-аппликатор приедет в вашу клинику для подробного обучения ваших диагностов.</p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Wrench className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800">Удаленная настройка</h5>
                    <p className="text-[10px] text-slate-550">Сервисная калибровка датчиков и регулярное обновление программного обеспечения.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🔥 7. COMPACT LEAD MAGNET OFFER */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FF6600]/5 border-2 border-[#FF6600]/30 rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-lg">
          
          {/* Badge 48 Hours with Alarm styling */}
          <div className="absolute top-4 right-4 bg-[#FF6600] text-white font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
            ⏰ Спецпредложение действует 48 часов
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase text-[#FF6600] tracking-widest font-mono">ПОДАРОК ЗА РЕГИСТРАЦИЮ СЕГОДНЯ</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Оставьте номер сейчас и получите БЕСПЛАТНО:</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white border border-[#FF6600]/15 p-4 rounded-xl space-y-1">
              <div className="font-black text-slate-800">✅ Шаг 1: Конфигурация под клинику</div>
              <p className="text-[10px] text-slate-500">Подбор оптимального состава датчиков под профиль вашей лицензии.</p>
            </div>
            <div className="bg-white border border-[#FF6600]/15 p-4 rounded-xl space-y-1">
              <div className="font-black text-slate-800">✅ Шаг 2: Сравнение в PDF</div>
              <p className="text-[10px] text-slate-500">Аналитический документ-сравнение Versana vs Mindray, Samsung, Philips.</p>
            </div>
            <div className="bg-white border border-[#FF6600]/15 p-4 rounded-xl space-y-1">
              <div className="font-black text-slate-800">✅ Шаг 3: Расчет окупаемости</div>
              <p className="text-[10px] text-slate-500">Точный расчет окупаемости кабинета УЗИ от нашего специалиста за 30 сек.</p>
            </div>
          </div>

          {/* Capture phone number form */}
          <form onSubmit={handleFormSubmit} className="pt-4 border-t border-slate-205/60">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold text-center">
                ✔ Спасибо за ваше обращение! Специалист AstMed перезвонит вам с расчетом и PDF-файлом в течение 15 минут.
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
                    className="w-full bg-white border border-slate-300 rounded-xl py-3.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-[#FF6600] transition"
                  />
                </div>
                <div className="flex-1 relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6600]" />
                  <input 
                    type="tel" 
                    required
                    placeholder="Ваш номер телефона*" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-3.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-[#FF6600] transition"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#FF6600] hover:bg-[#E05500] text-white font-black px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-md"
                >
                  Получить консультацию бесплатно
                </button>
              </div>
            )}
            <div className="text-[10px] text-slate-400 mt-2.5 text-center">
              Перезвоним в течение 15 минут в рабочее время • Конфиденциальность гарантирована по ФЗ-152 РФ
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
      <footer className="border-t border-slate-200 mt-16 pt-8 max-w-5xl mx-auto px-4 text-center text-[10px] text-slate-400 space-y-2">
        <p className="uppercase tracking-widest font-bold">
          Имеются противопоказания. Перед использованием необходимо ознакомиться с инструкцией по применению и получить консультацию специалиста.
        </p>
        <p className="font-mono">
          Оборудование сертифицировано • Регистрационное Удостоверение Минздрава РФ • FDA 510(k) Cleared • CE Marked. ООО "АстМед". Все права защищены.
        </p>
      </footer>

      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="versana-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
