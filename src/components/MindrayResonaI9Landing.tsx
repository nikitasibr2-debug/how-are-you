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
  Sparkle
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';

interface MindrayResonaI9LandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export function MindrayResonaI9Landing({
  product,
  articles,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}: MindrayResonaI9LandingProps) {
  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Active tab state for interactive showcase
  const [showcaseTab, setShowcaseTab] = useState<'console' | 'process' | 'uma'>('console');
  
  // Interactive 7 Reasons Accordion
  const [activeReason, setActiveReason] = useState<number>(0);

  // Form states
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sendingMsg, setSendingMsg] = useState(false);

  // Hero Mini-Form states
  const [heroPhone, setHeroPhone] = useState('');
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroSending, setHeroSending] = useState(false);

  // Target audiences
  const audienceList = [
    {
      title: "Маммологи",
      desc: "Полный экспертный скрининг с автоматическим BI-RADS анализом Smart Breast.",
      icon: Eye,
      highlight: "Smart Breast ИИ"
    },
    {
      title: "Эндокринологи",
      desc: "Оценка узлов щитовидной железы по TI-RADS на основе многоплоскостного ИИ-анализа.",
      icon: Layers,
      highlight: "Smart Thyroid ИИ"
    },
    {
      title: "Гепатологи & Гастроэнтерологи",
      desc: "Точное распознавание органов и мгновенное вычисление индекса стеатоза.",
      icon: Activity,
      highlight: "Smart HRI детекция"
    },
    {
      title: "Сосудистые хирурги",
      desc: "Визуализация микрососудистого кровотока UMA и прецизионный анализ жесткости стенок R-VQS.",
      icon: HeartPulse,
      highlight: "0.1мм UMA разрешение"
    },
    {
      title: "Кардиологи",
      desc: "Углонезависимое отслеживание движения миокарда по Speckle Tracking (TT QA).",
      icon: Sparkle,
      highlight: "TT QA Speckle Tracking"
    },
    {
      title: "Многопрофильные центры",
      desc: "Обслуживание максимального потока пациентов без перебоев с гарантией 5 лет.",
      icon: Building,
      highlight: "Экстремальный TCO"
    }
  ];

  // 7 Reasons to choose Resona i9
  const reasons = [
    {
      pain: "«К концу дня болит спина и устают руки — это нормально?»",
      objection: "Эргономика, спроектированная медиками для медиков",
      solution: "Разработан совместно со практикующими сонографистами. Полностью плавающая консоль iConsole регулируется по высоте, вылету и углу сдвига в любом из 3 направлений. Приподнятые (elevated) порты датчиков исключают необходимость наклоняться для их смены. Результат: полное отсутствие физического утомления и боли в суставах даже при суточном приеме пациентов.",
      icon: Sliders
    },
    {
      pain: "«E-Ink клавиши на панели — это вообще зачем?»",
      objection: "Революция кастомизации под ваш личный workflow",
      solution: "Цифровые кнопки с электронной бумагой E-Ink адаптируют свои надписи и функции под выбранное исследование на лету. Карта раскладки меняется автоматически под абдоминальные замеры, кардиологию или маммологию. Надпись никогда не сотрется и не поблекнет — она остается видна даже при полном выключении питания системы.",
      icon: Zap
    },
    {
      pain: "«А вдруг нет розетки или нужно экстренно перейти в другой кабинет?»",
      objection: "Свобода передвижения и непревзойденная мобильность",
      solution: "Resona i9 складывается в транспортировочное положение высотой менее 1 метра за считанные секунды. Он легко проедет в самый узкий дверной проем и поместится в любой лифт. Встроенная АКб высокой емкости гарантирует до 4 часов полноценного сканирования без розеток, а инновационный сенсор ручки отображает уровень заряда, как только вы беретесь за нее.",
      icon: ShieldCheck
    },
    {
      pain: "«Насколько точна диагностика в маммологии?»",
      objection: "Smart Breast: автоматизация экспертного класса в один клик",
      solution: "Встроенный ассистент Smart Breast мгновенно проводит автоматическую детекцию, точные замеры, аннотирование и классификацию по шкале BI-RADS. Система формирует структурированный отчет за секунды. Это не упрощенный калькулятор, а полноценная многоплоскостная оценка нескольких очагов одновременно, убирающая фактор человеческой ошибки.",
      icon: Sparkles
    },
    {
      pain: "«Щитовидную железу исследуем очень часто. Справится?»",
      objection: "Smart Thyroid TI-RADS + Высокочастотная эластография",
      solution: "Пакет Smart Thyroid автоматически анализирует узловые образования щитовидной железы, выполняет разметку, измерения и определяет класс опасности по TI-RADS. Технология HiFR STE (высокочастотная эластография сдвиговой волны) гарантирует получение стабильных сдвиговых волн для сверхчувствительной оценки жесткости подозрительных новообразований в реальном времени.",
      icon: Award
    },
    {
      pain: "«Что превосходит у Resona i9 в сосудистой диагностике?»",
      objection: "UMA допплер — визуализация кровотока тоньше человеческого волоса",
      solution: "Революционный алгоритм UMA (Ultra-Micro Angiography) безупречно отфильтровывает помехи движения тканей, выделяя медленную гемодинамику тончайших сосудов диаметром менее 0.1 мм. Это критично важно для онкодиагностики, выявления зон ранних метастазов и микрососудистой перфузии. Дополнительно встроен пакет R-VQS для вычисления коэффициента жесткости сосудистой стенки.",
      icon: HeartPulse
    },
    {
      pain: "«Не устареет ли аппарат через 3 года, не выброшу ли деньги?»",
      objection: "Living Technology™ + Бескомпромиссная 5-летняя гарантия",
      solution: "Концепция Living Technology™ гарантирует получение регулярных бесплатных программных обновлений в процессе эксплуатации — ваш аппарат всегда остается на острие науки. Лучшая в индустрии 5-летняя гарантия покрывает как саму консоль, так и все датчики с выездом сервисного инженера на место эксплуатации. Вы получаете минимальную стоимость владения (TCO).",
      icon: CheckCircle2
    }
  ];

  // WOW features definition
  const wowFeatures = [
    {
      badge: "АВТОНОМИЯ И УПРАВЛЕНИЕ",
      title: "Адаптивная iConsole с дисплеями E-Ink",
      text: "Первая консоль, подстраивающаяся под исследование прямо на ходу. Настраивайте любые кнопки под себя. Механические элементы сопряжены с долговечными виртуальными раскладками.",
      spec: "Оснащена 15.6\" жестовым суб-монитором управления."
    },
    {
      badge: "СВЕРХЧУВСТВИТЕЛЬНЫЙ ДОППЛЕР",
      title: "Ultra-Micro Angiography (UMA)",
      text: "Технология глубокой селекции спектра. Визуализирует глубокие сосуды диаметром до 0.1 мм, которые остаются слепыми зонами для традиционного триплексного картирования.",
      spec: "Гемодинамика мельчайших ветвей в один клик."
    },
    {
      badge: "ЖИЗНЕННЫЙ ЦИКЛ",
      title: "Living Technology™ обновления на весь срок",
      text: "Забудьте о необходимости платить за новые версии ПО. Каждые несколько месяцев вы получаете улучшенные алгоритмы шумоподавления и точности ИИ абсолютно бесплатно.",
      spec: "Официальный контракт поддержки с Mindray."
    }
  ];

  const handlePhoneFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 7) {
      alert('Пожалуйста, введите корректный номер телефона.');
      return;
    }
    setSendingMsg(true);
    setTimeout(() => {
      setSendingMsg(false);
      setSubmitted(true);
      logger.info(`Лид-магнит: новая заявка на Mindray Resona i9 от ${phone}`);
    }, 1200);
  };

  const handleHeroFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPhone.length < 7) {
      alert('Пожалуйста, введите корректный номер телефона.');
      return;
    }
    setHeroSending(true);
    setTimeout(() => {
      setHeroSending(false);
      setHeroSubmitted(true);
      logger.info(`Лид-магнит Hero: новая заявка на Mindray Resona i9 от ${heroPhone}`);
    }, 1200);
  };

  const handleFastOrder = (type: string) => {
    logger.info(`Клик по кнопке заказа (${type}) для Mindray Resona i9`);
    triggerQuote(product, 'kp');
  };

  return (
    <div className="space-y-16 animate-fade-in" id="mindray-resona-i9-landing-root">
      
      {/* 0. NAVIGATION & BACK HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-5xl mx-auto">
        <button 
          onClick={onBackToCatalog}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад в каталог УЗИ
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => toggleFavorite(product.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite 
                ? 'bg-red-50 text-red-600 border-red-200' 
                : 'bg-white text-slate-400 hover:text-slate-600 border-slate-200'
            }`}
            title="Добавить в избранное"
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
          <button 
            onClick={() => toggleCompare(product.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isCompared 
                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                : 'bg-white text-slate-400 hover:text-slate-600 border-slate-200'
            }`}
            title="Добавить в сравнение"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleFastOrder('quick-calc')}
            className="px-5 py-2.5 bg-[#003366] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition"
          >
            Запросить цену
          </button>
        </div>
      </div>

      {/* 1. 🔥 HERO CONTAINER / HEADER HOOK */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl max-w-6xl mx-auto">
        {/* Ambient glow matching Mindray corporate deep blue and cyan accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#003366]/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Title Description Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-mono bg-[#003366] text-blue-200 border border-blue-700 tracking-widest px-3 py-1 rounded-md font-black">
                MINDRAY • КИТАЙ
              </span>
              <span className="text-[10px] uppercase font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 tracking-widest px-3 py-1 rounded-md font-black animate-pulse">
                МЕЖДУНАРОДНЫЙ ФЛАГМАН
              </span>
              <span className="text-[10px] uppercase font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 tracking-widest px-3 py-1 rounded-md font-black">
                CE + FDA CERTIFIED
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-tight text-white">
                Первый аппарат, которому <span className="text-cyan-400">удобно работать</span> целый день. <br />
                <span className="text-slate-300">И который думает вместе с вами.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                Mindray Resona i9 — единственный аппарат в классе с 5-летней полной гарантией, ИИ-анализом BI-RADS / TI-RADS и аккумулятором на 4 часа. Разработан, чтобы ваша клиника работала быстрее и точнее — с первого дня.
              </p>
            </div>

            {/* High-Converting Mini-Form embedded within Hero */}
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
                    <span>Сравнение с GE Logiq и Philips Epiq в PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Подбор датчиков под вашу специализацию</span>
                  </div>
                </div>
              </div>

              {heroSubmitted ? (
                <div className="bg-emerald-950/60 border border-emerald-800/50 rounded-xl p-4 text-center space-y-1">
                  <p className="text-emerald-400 font-black text-xs uppercase tracking-wider">Заявка принята!</p>
                  <p className="text-[11px] text-slate-300">Наш эксперт уже готовит подробный расчет и подборку в PDF.</p>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit} className="space-y-3">
                  <div className="flex flex-col gap-2.5">
                    <input 
                      type="tel"
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      placeholder="Ваш номер телефона"
                      required
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all w-full font-mono"
                    />
                    <button
                      type="submit"
                      disabled={heroSending}
                      className="w-full px-5 py-3.5 bg-[#00AEEF] hover:bg-cyan-400 active:bg-cyan-500 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl transition duration-150 shadow-md"
                    >
                      {heroSending ? 'Отправка...' : 'ПОЛУЧИТЬ РАСЧЁТ И ПОДБОР БЕСПЛАТНО'}
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[10px] text-slate-400">
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-slate-900">
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ПЛАТФОРМА</span>
                <span className="text-xs font-bold text-white">ZST+ Канальная</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">КЛАВИАТУРА</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">E-Ink Адаптивная</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ИИ-АНАЛИЗ</span>
                <span className="text-xs font-bold text-white font-mono">BI-RADS / TI-RADS</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block font-mono">ГАРАНТИЯ</span>
                <span className="text-xs font-bold text-emerald-400">5 ЛЕТ ПОЛНАЯ</span>
              </div>
            </div>
          </div>

          {/* Right Product Mockup Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="bg-gradient-to-b from-slate-900/40 to-slate-950/80 border border-slate-800 p-4 rounded-3xl relative overflow-hidden shadow-2xl w-full max-w-sm group">
              <div className="absolute top-3 right-3 bg-[#003366]/30 text-blue-400 border border-blue-800/50 font-mono text-[9px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                ТОП-3 В МИРЕ
              </div>
              <div className="aspect-[4/5] bg-slate-950 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/15 via-transparent to-transparent pointer-events-none" />
                <img 
                  src="/src/assets/images/resona_i9_console_1780456104193.png" 
                  alt="Mindray Resona i9 Premium Ultra High-End Ultrasound Diagnostic System Console View" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs text-slate-400 font-medium block">Mindray Resona i9</span>
                <p className="text-[10px] text-slate-500 font-mono mt-1">Революция эргономики + канальные датчики ZST+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Для кого создан аппарат (Audience Grid) */}
      <section className="space-y-8 max-w-5xl mx-auto" id="i9-target-audience">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#003366] block">ОБЛАСТИ СПЕЦИАЛИЗАЦИИ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Клинический триумф в любой диагностической области
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Оборудование сертифицировано и создано для глубоких экспертных исследований по широкому спектру направлений.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audienceList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003366]/10 text-[#003366] rounded-xl flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <span className="text-[10px] font-mono text-[#00AEEF] px-2 py-0.5 bg-cyan-50 rounded-md border border-cyan-100">
                      {item.highlight}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DYNAMIC SHOWCASE AND CLINICAL WORKFLOW PROCESS */}
      <section className="space-y-8 max-w-5xl mx-auto" id="resona-i9-interactive-showcase">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block">ФОТОГРАФИИ АППАРАТА И РАБОЧЕГО ПРОЦЕССА</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Живой процесс диагностики на Mindray Resona i9
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Объективная медицинская реальность, демонстрирующая качество оборудования, эргономику врача и непревзойденные диагностические результаты.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-4">
          <button
            onClick={() => setShowcaseTab('console')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              showcaseTab === 'console'
                ? 'bg-[#003366] text-white shadow-lg shadow-blue-900/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            01. Внешний вид и консоль
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
            02. Реальный процесс УЗИ
          </button>

          <button
            onClick={() => setShowcaseTab('uma')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              showcaseTab === 'uma'
                ? 'bg-[#003366] text-white shadow-lg shadow-blue-900/20'
                : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            03. UMA визуализация сосудов
          </button>
        </div>

        {/* Dynamic Showcase Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
          {/* Left Large Image Viewer Frame */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-[#003366]/5 rounded-2xl blur-3xl pointer-events-none" />
            <div className="aspect-[16/10] bg-slate-950 rounded-2xl border border-slate-200 overflow-hidden relative group shadow-md">
              
              {showcaseTab === 'console' && (
                <img
                  src="/src/assets/images/resona_i9_console_1780456104193.png"
                  alt="Mindray Resona i9 modern luxury console visual"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              {showcaseTab === 'process' && (
                <img
                  src="/src/assets/images/resona_i9_process_1780456118871.png"
                  alt="Advanced clinic practitioner doing diagnostic procedure comfortably on Resona i9"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              {showcaseTab === 'uma' && (
                <img
                  src="/src/assets/images/resona_i9_uma_1780456133535.png"
                  alt="Precise clinical microvascular angiography image mapping tiny blood flows"
                  className="w-full h-full object-cover transition duration-500"
                  referrerPolicy="no-referrer"
                />
              )}

              <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-md border border-slate-700 backdrop-blur-sm">
                {showcaseTab === 'console' ? 'Console Design Studio' : showcaseTab === 'process' ? 'Live Obstetric Scan UI' : 'Ultra-Micro Angiography Scan'}
              </div>
            </div>
          </div>

          {/* Right Core Info Showcase Card */}
          <div className="lg:col-span-5 space-y-6">
            {showcaseTab === 'console' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003366] font-mono">ДИЗАЙН И ФИЗИОЛОГИЧЕСКИЙ КОМФОРТ</span>
                <h3 className="text-xl font-extrabold text-slate-900">iConsole — Ваше персональное продолжение рук</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Полноценная модульная конструкция гарантирует надежность при транспортировке. Пылевлагозащита сенсорного экрана и механических узлов защищает электронику от случайных проливов геля. Плавающая клавиатура накрывается защитным слоем, E-Ink клавиши моментально меняют цифровую подпись под Ваш пошаговый профиль исследования.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Автокорректировка высоты до миллиметра</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Световая индикация в ручке при захвате ладонью</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'process' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003366] font-mono">РЕАЛЬНЫЙ СЦЕНАРИЙ</span>
                <h3 className="text-xl font-extrabold text-slate-900">Максимальная забота о здоровье пациента и врача</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  В реальной клинической практике Resona i9 функционирует бесшумно, снижая стресс у беременных женщин и новорожденных. Пакеты Smart Breast и Smart Thyroid моментально дают подсказки классификации сложных патологий. Врачу больше не нужно тратить время на скрупулёзную ручную разметку контуров очага — ИИ сделает это точнее за четверть секунды.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>Полная поддержка пациента на многоязычном уровне</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>Автономное передвижение между палатами без отключения ОС</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'uma' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00AEEF] font-mono">АНГИОГРАФИЯ СВЕРХВЫСОКОГО РАЗРЕШЕНИЯ</span>
                <h3 className="text-xl font-extrabold text-slate-900">UMA — Разглядеть невидимое человеческому глазу</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Уникальная адаптивная сепарация шумов и сигналов от стенок сосудов UMA выводит чувствительность допплера на принципиально иной рубеж. Вы можете четко очертить сосудистую сеть опухоли диаметром меньше 0.1 мм. Это позволяет безошибочно дифференцировать онкологию, злокачественные ткани молочной железы или лимфоузлов на стадии зарождения.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Глубокая микрососудистая перфузия Glazing Flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2-е поколение нелинейного контрастного усиления UWN+ CEUS</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <a
                href="#i9-lead-magnet"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#003366] hover:text-blue-800 transition"
              >
                Запросить расчет окупаемости для клиники
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 7 ПРИЧИН ВЫБРАТЬ RESONA I9 (ОТРАБОТКА ВОЗРАЖЕНИЙ) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-8 max-w-5xl mx-auto relative overflow-hidden" id="i9-seven-reasons">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003366]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase block font-black">ЧЕСТНЫЙ ДИАЛОГ</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none">
            7 честных причин выбрать Mindray Resona i9
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Мы знаем Ваши сомнения и типичные возражения. Позвольте показать, как Resona i9 справляется с ними в повседневной практике.
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
                          <span className="text-[10px] font-mono text-[#00AEEF] uppercase tracking-wider block">ПРОБЛЕМА & РЕШЕНИЕ</span>
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
                        <span>Mindray Resona i9 • Premium</span>
                        <a 
                          href="#resona-i9-lead-magnet"
                          className="text-xs text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
                        >
                          Сравнить характеристики
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
                <span className="text-[10px] font-mono text-[#00AEEF] uppercase tracking-wider block">ПРОБЛЕМА & РЕШЕНИЕ</span>
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

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">Mindray Resona i9 • Гарантия и ИИ 5 лет</span>
              <a 
                href="#i9-lead-magnet"
                className="text-xs text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
              >
                Обсудить это решение вживую
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WOW-ВОЗМОЖНОСТИ И БЕЗОПАСНОСТЬ ИНВЕСТИЦИЙ */}
      <section className="space-y-8 max-w-5xl mx-auto" id="i9-wow-features">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#003366] block">WOW-ЭФФЕКТЫ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            Технологии, превосходящие привычные стандарты
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            То, что кардинально выделяет Resona i9 среди классических УЗИ-аппаратов и выставляет конкурентов на шаг позади.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {wowFeatures.map((wow, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl relative space-y-4 shadow-sm hover:shadow-md transition">
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-[#003366] text-white rounded font-bold tracking-wider">
                {wow.badge}
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

      {/* 6. COMPACT TECHNICAL CHASSIS TABLE */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 max-w-5xl mx-auto" id="i9-specifications">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-slate-900">Компактная спецификация Mindray Resona i9</h3>
          <p className="text-xs text-slate-500">Технические и физические параметры ультразвуковой платформы.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-800 font-bold bg-slate-50">
                <th className="p-3 font-mono text-[9px] uppercase tracking-wider w-1/3">Параметр устройства</th>
                <th className="p-3 font-mono text-[9px] uppercase tracking-wider">Официальное значение</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Основной монитор</td>
                <td className="p-3">23.8" LED HD, безрамочный, с антибликовым покрытием</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Сенсорная панель управления</td>
                <td className="p-3">15.6" HD тач-дисплей с распознаванием медицинских жестов в перчатках</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">iConsole E-Ink Клавиши</td>
                <td className="p-3">Цифровые настраиваемые кнопки (информация не пропадает при отключении энергии)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Время сканирования от АКБ</td>
                <td className="p-3">Базовая батарея: 2 часа, Расширенная модификация: до 4 часов непрерывной автономии</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Конструкция рамы</td>
                <td className="p-3">Складная телескопическая система (высота в сборе до 100 см)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Платформа обработки</td>
                <td className="p-3">Канальная архитектура ZST+ (Zone Sonography Technology+ попиксельного фокуса)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Уровень шума при работе</td>
                <td className="p-3">Сверхнизкий уровень шума (Super Silent Cabinet Design)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800 bg-slate-50/30">Порты датчиков</td>
                <td className="p-3">Приподнятые и защищенные от утягивания кабеля (elevated ports)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. ЧТО ВХОДИТ В КОМПЛЕКТ ПОСТАВКИ */}
      <section className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto space-y-6" id="i9-whats-included">
        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Что входит в гарантированную поставку
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">01 / КОНСОЛЬ</span>
            <p className="text-xs font-bold text-slate-800">Полноценная напольная консоль Mindray Resona i9</p>
            <p className="text-[11px] text-slate-500">Включая iConsole с E-Ink кнопками и встроенным шасси с плавающей регулировкой.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">02 / ДАТЧИКИ НА ВЫБОР</span>
            <p className="text-xs font-bold text-slate-800">Набор высокоплотных датчиков</p>
            <p className="text-[11px] text-slate-500">Подбор оптимальных датчиков (конвексный, линейный, внутриполостной, секторный) под спектр Вашей клиники.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">03 / ГАРАНТИЯ</span>
            <p className="text-xs font-bold text-slate-850">5 ЛЕТ полной заводской гарантии</p>
            <p className="text-[11px] text-slate-500">Включает замену комплектующих, датчики, выезд авторизованного инженера.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">04 / ОБУЧЕНИЕ</span>
            <p className="text-xs font-bold text-slate-800">Обучение персонала и ввод в работу</p>
            <p className="text-[11px] text-slate-500">Практический инструктаж для Ваших врачей-сонографистов силами сертифицированного аппликатора.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">05 / ПОДДЕРЖКА ПО</span>
            <p className="text-xs font-bold text-slate-800">Living Technology™ Обновления</p>
            <p className="text-[11px] text-slate-500">Бессрочное программное сопровождение и установка свежих алгоритмов на протяжении эксплуатации.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">06 / ДОКУМЕНТАЦИЯ</span>
            <p className="text-xs font-bold text-slate-800">РУ Минздрава РФ</p>
            <p className="text-[11px] text-slate-500">Полный пакет разрешительных документов и медицинское регистрационное удостоверение (РУ).</p>
          </div>
        </div>
      </section>

      {/* 8. 🎁 ЛИД-МАГНИТ И ФОРМА ЗАХВАТА */}
      <section className="bg-gradient-to-br from-slate-900 via-[#002244] to-[#003366] text-white p-6 sm:p-12 rounded-3xl border border-blue-800/40 relative overflow-hidden max-w-5xl mx-auto shadow-2xl" id="i9-lead-magnet">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          {/* Left Lead Info */}
          <div className="md:col-span-7 space-y-6">
            <span className="inline-block bg-cyan-500 text-slate-950 font-mono text-[10px] uppercase font-black px-3 py-1 rounded">
              🎁 ЭКСКЛЮЗИВНЫЙ ИНСТРУМЕНТ ПРОДАЖ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
              Оставьте номер прямо сейчас и получите бесплатно:
            </h2>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <p><strong>Подбор оптимального набора датчиков</strong> конкретно под Вашу врачебную специализацию.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <p><strong>Живую демонстрацию Smart Breast + Smart Thyroid</strong> на реальных клинических случаях.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <p><strong>Честное сравнение по 20 параметрам:</strong> Mindray Resona i9 vs GE Logiq Fortis vs Philips Epiq.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <p><strong>Персональный расчет окупаемости</strong> под ежедневную пропускную способность кабинета.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950/50 rounded-xl border border-blue-900/40 inline-flex items-center gap-2 text-xs text-rose-300 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
              <span>⏰ Предложение и лимитированная квота действуют в течение 48 часов</span>
            </div>
          </div>

          {/* Right Fast Lead Capture Form */}
          <div className="md:col-span-5 bg-white text-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xl">
            <h4 className="text-base font-extrabold text-slate-900 mb-4">Забронировать демонстрацию и квоту</h4>
            
            {!submitted ? (
              <form onSubmit={handlePhoneFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Ваш телефон для связи:</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-xs text-slate-400 font-bold font-mono">+7</span>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=" (999) 000-00-00"
                      className="w-full bg-slate-50 border border-slate-200 outline-none p-3 pl-8 text-xs font-bold rounded-xl focus:border-[#003366] transition"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="w-full py-4 bg-[#00AEEF] hover:bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-cyan-100 text-center flex items-center justify-center gap-2"
                >
                  {sendingMsg ? (
                    <span>Отправка данных...</span>
                  ) : (
                    <>
                      <span>Получить демонстрацию и подбор</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 text-center font-mono">
                  ⚡️ Перезвоним в течение 15 минут. Без навязчивых звонков — только конкретная польза.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-extrabold text-slate-900">Заявка успешно принята!</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">Наш ведущий сонографист-консультант уже формирует персональную таблицу сравнения и расчет подбора датчиков. Ожидайте звонка.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. LEGAL MEDICAL CERTIFICATION DISCLAIMER */}
      <footer className="max-w-5xl mx-auto pt-6 border-t border-slate-200 text-center space-y-4 pb-12">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed max-w-2xl mx-auto font-mono">
          ПРЕДУПРЕЖДЕНИЕ: ДАННАЯ ИНФОРМАЦИЯ ПРЕДНАЗНАЧЕНА ИСКЛЮЧИТЕЛЬНО ДЛЯ МЕДИЦИНСКИХ СПЕЦИАЛИСТОВ И ОРГАНИЗАЦИЙ ЗДРАВООХРАНЕНИЯ. ОБОРУДОВАНИЕ ИМЕЕТ РЕГИСТРАЦИОННОЕ УДОСТОВЕРЕНИЕ МИНЗДРАВА РФ И СЕРТИФИЦИРОВАНО В СООТВЕТСТВИИ С ЗАКОНОДАТЕЛЬСТВОМ.
        </p>
        <p className="text-xs text-slate-400">
          © 2026 AstMed • Официальные прямые поставки Mindray Resona i9 РФ. Все права защищены.
        </p>
      </footer>

    </div>
  );
}
