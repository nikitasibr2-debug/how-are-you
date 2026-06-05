import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowUp,
  Heart, 
  ArrowRightLeft, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  Settings,
  Database,
  Lock
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';
import { AstmedTeamBlock } from './AstmedTeamBlock';

interface LogiqFortisR4LandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const LogiqFortisR4Landing: React.FC<LogiqFortisR4LandingProps> = ({
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

  // Local active states
  const [activeTech, setActiveTech] = useState<'csound' | 'xdclear' | 'ii_assist' | 'kb_ergo' | 'sonodefense'>('csound');
  const [activeObjection, setActiveObjection] = useState<'quality' | 'learning' | 'mobility' | 'service' | 'price'>('quality');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Lead capture states
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // ROI / Efficiency Calculator States
  const [scansPerWeek, setScansPerWeek] = useState<number>(30);
  const [scanPrice, setScanPrice] = useState<number>(3500);

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Calculating monthly revenue, time saved, and clinical payback model
  const calculations = useMemo(() => {
    // Each scan gets about 10 minutes faster due to R4's -32% keyboard reduction and automated presets
    const minutesSavedPerScan = 10;
    const weeklyScans = scansPerWeek;
    const monthlyScans = weeklyScans * 4.3; // 4.3 weeks in a month
    
    const weeklyRevenue = weeklyScans * scanPrice;
    const monthlyRevenue = weeklyRevenue * 4.3;

    // Direct cost of conduction (gel, sanitization, electricity) is very low ~150 RUB
    const costPerScan = 150;
    // Doctor commission is traditionally high in diagnostics (e.g., 30-35%), plus overhead
    const netProfitMargin = 0.60; // 60% clean margin for the clinic
    
    const monthlyNetProfit = Math.round(
      (monthlyRevenue - (monthlyScans * costPerScan)) * netProfitMargin
    );

    const totalHoursSavedPerMonth = Math.round((monthlyScans * minutesSavedPerScan) / 60);
    const extraSlotsCreated = Math.round((totalHoursSavedPerMonth * 60) / 30); // 30 mins average scan duration

    const appCost = product.price || 4750000;
    const paybackMonths = monthlyNetProfit > 0 ? Math.max(1, Math.ceil(appCost / monthlyNetProfit)) : 48;

    return {
      monthlyRevenue: Math.round(monthlyRevenue),
      monthlyNetProfit,
      totalHoursSavedPerMonth,
      extraSlotsCreated,
      paybackMonths
    };
  }, [scansPerWeek, scanPrice, product.price]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormSubmitted(true);
    logger.info('Пользователь отправил заявку на GE LOGIQ Fortis R4', {
      name: formName,
      phone: formPhone
    });
  };

  const technologies = {
    csound: {
      title: 'Революционная архитектура cSound™',
      desc: 'В отличие от традиционных систем, где луч фокусируется программно на определенных глубинах, процессорная архитектура cSound осуществляет поканальную оцифровку миллионов точек данных в реальном времени. Все пиксели от ближнего до самого дальнего поля находятся в безупречном непрерывном фокусе.',
      specs: 'Аппаратное субпиксельное моделирование, мгновенная реконструкция геометрии органов, исключение падения резкости.',
      result: 'Безошибочная диагностика сложнейших глубоких образований брюшной полости даже у тучных пациентов.'
    },
    xdclear: {
      title: 'Премиум-датчики серии XDclear™',
      desc: 'Датчики следующего поколения на основе сверхвысокой плотности чистых монокристаллов с улучшенной акустической термо-компенсацией. Обеспечивают сверхширокий динамический диапазон частот и глубокое проникновение сигнала без нарастания шумов.',
      specs: 'Абдоминальные, линейные и объемные датчики, монокристаллическая решетка, высокая термостабильность.',
      result: 'Идеальный контраст тончайших структур сосудов и нервных стволов на любых глубинах сканирования.'
    },
    ii_assist: {
      title: 'Интеллектуальный ИИ-пакет поколения R4',
      desc: 'Предустановленные нейросетевые помощники Thyroid Assistant (на базе KOIOS DS), Auto Renal Measure и Auto Abdominal Suite 1.0. ИИ распознает контуры подозрительных образований щитовидной железы и почек по классификации TI-RADS, автоматически размечая и рассчитывая размеры.',
      specs: 'Нейроанализ классификаций TI-RADS/BI-RADS, автоматическая морфометрия, снижение человеческого фактора.',
      result: 'Снижение вариабельности диагнозов между разными врачами на 41% и экономия кликов на разметку.'
    },
    kb_ergo: {
      title: 'Выверенная эргономика снижения травматизма',
      desc: 'Благодаря глубокой адаптации меню и автоматическому помощнику Auto-Preset Assistant, аппарат сводит рутинное переключение настроек к минимуму. Панель управления уменьшает необходимость манипуляций с клавишами, предохраняя кисть врача от синдрома запястного канала.',
      specs: 'Сокращение ручных действий врача на 32%, уменьшение нажатий клавиш клавиатуры на 38%.',
      result: 'Комфортный многочасовой поток пациентов без болей в суставах рук у диагностов.'
    },
    sonodefense: {
      title: '6-уровневая кибербезопасность SonoDefense',
      desc: 'Медицинские данные пациентов защищены патентованной технологией SonoDefense. 6 жестких уровней шифрования дисков, защищенных сетевых портов, антивирусного барьера и персонализированных ключей доступа предотвращают кражу коммерческой и медицинской информации.',
      specs: 'Шифрование AES-256, безопасные беспроводные шлюзы (включая Vscan Air), авторизация по профилям.',
      result: 'Полная юридическая защищенность клиники при внешних проверках соответствия ФЗ РФ №152.'
    }
  };

  const objections = {
    quality: {
      title: 'Качество изображения будет на высшем уровне?',
      boldText: 'Архитектура cSound™ гарантирует, что каждый миллиметр ткани находится в абсолютном фокусе.',
      desc: 'Больше никаких размытых контуров в глубоком поле. LOGIQ Fortis R4 обрабатывает объем данных, эквивалентный трансляции трех фильмов в формате 4K каждую секунду. Контрастное УЗИ (CEUS) и XDclear™ датчики выявляют паренхиматозные новообразования диаметром менее 3 мм, которые слепы обычные аппараты.',
      proof: 'Лауреат премии iF Design Award за идеальные пропорции вывода клинических данных.'
    },
    learning: {
      title: 'Сложно ли будет врачам переучиваться?',
      boldText: 'Интеллектуальные ИИ-инструменты делают сложную автоматизацию доступной в 1 клик.',
      desc: 'Врачи легко освоят интерфейс благодаря интуитивной сенсорной тач-панели 12.1" и автоматическим сценариям Auto-Preset Assistant. Больше не нужно вручную подстраивать гейн и фокус при смене пациентов — система самостоятельно адаптирует физические волны под конституцию конкретного человека.',
      proof: 'На 32% меньше монотонной клавиатурной работы и на 38% меньше движений рук.'
    },
    mobility: {
      title: 'Аппарат привязан только к одному кабинету?',
      boldText: 'Полная портативная независимость со стационарным качеством на уровне эксперта.',
      desc: 'LOGIQ Fortis R4 оборудован интегрированной аккумуляторной батареей высокого класса. Консоль спроектирована так, чтобы быстро проезжать в стандартные дверные проемы палат интенсивной терапии или операционных. Аппарат поддерживает беспроводное сканирование при подключении датчика Vscan Air™ CL — передача изображения на экран через защищенный Wi-Fi.',
      proof: 'Функция "Hot Swap" — переезд между кабинетами без выключения ОС.'
    },
    service: {
      title: 'Что делать, если аппарат зависнет или сломается?',
      boldText: 'Удаленный доктор-инженер GE InSite™ на связи и решает 90% программных вопросов за 30 минут.',
      desc: 'Установка подключена к глобальному сервису InSite™ удаленной компьютерной поддержки. Инженеры удаленно обновляют софт, калибруют чувствительность датчиков и устраняют накопившиеся системные ошибки, не дожидаясь многодневного выезда физической бригады. При физической поломке авторизованные специалисты AstMed выезжают с оригинальными запчастями GE по сервисному договору.',
      proof: 'Круглосуточный телеметрический мониторинг здоровья компонентов через iCenter™.'
    },
    price: {
      title: 'Стоит ли переплачивать за бренд GE Healthcare?',
      boldText: 'Репутация золотого мирового стандарта окупается лояльностью пациентов и скоростью работы.',
      desc: 'Оборудование GE Healthcare (США) — безусловный лидер доверия среди врачей и пациентов. Выбрав LOGIQ Fortis R4, вы получаете престижную отметку в лицензионном портфолио клиники. Скорость обследования увеличивается, исключаются дорогостоящие ошибки диагностики, а амортизационный износ минимизируется на 10 лет вперед.',
      proof: 'GE Healthcare — выбор лучших клиник в 160 странах мира.'
    }
  };

  const faqs = [
    {
      q: 'Какие датчики поставляются в базовой комплектации?',
      a: 'В стандартное коммерческое предложение включены 3 высокоплотных датчика премиум-класса: Конвексный XDclear C1-6-D (для абдоминальных трактов и акушерства), Линейный высокоплотный датчик L3-12-D (сосуды, малые щитовидные/молочные железы) и внутриполостной гинекологический IC5-9-D. Дополнительно можно дозаказать микроконвексные, секторные фазированные и уникальный беспроводной Vscan Air™.'
    },
    {
      q: 'Имеет ли данная система Регистрационное Удостоверение Российской Федерации?',
      a: 'Да. GE Healthcare LOGIQ Fortis R4 имеет действующее Регистрационное удостоверение Минздрава РФ (РУ), на 100% допускающее его легальное использование в любых государственных, ведомственных, научных и частных клиниках.'
    },
    {
      q: 'Как работает ИИ-ассистент Thyroid Assistant на практике?',
      a: 'Врач выводит сечение щитовидной железы, нажимает одну кнопку, и нейросеть Thyroid Assistant мгновенно классифицирует образование по мировой шкале TI-RADS. Ассистент самостоятельно очерчивает контуры узлов, высчитывает их три проекции и выносит предварительное заключение. Это страхует врача от случайного пропуска злокачественных клеток.'
    },
    {
      q: 'Предоставляется ли обучение для медицинского персонала?',
      a: 'Безусловно. При закупке LOGIQ Fortis R4 компания AstMed организует бесплатный сертифицированный клинический инструктаж на рабочем месте в вашей клинике. Обучение проводит лицензированный врач-аппликатор GE Healthcare, который настроит предустановки (пресеты) под индивидуальные требования ваших диагностов.'
    }
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans antialiased pb-20">
      
      {/* 1. TOP PREMIUM HEADER */}
      <div className="bg-slate-900 border-b border-slate-800/80 relative z-10 py-4 px-6 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={onBackToCatalog}
              className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition group cursor-pointer border border-slate-800 bg-slate-900/60 py-2 px-4 rounded-xl hover:bg-slate-800 text-xs font-bold shrink-0 w-full sm:w-auto"
              id="back-to-catalog-btn"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Вернуться в каталог
            </button>
            <div className="text-xs text-slate-400 font-medium font-sans flex items-center gap-1.5 flex-wrap px-1">
              <span onClick={onBackToCatalog} className="hover:text-white hover:underline transition cursor-pointer">Главная</span>
              <span className="text-slate-600">/</span>
              <span onClick={onBackToCatalog} className="hover:text-white hover:underline transition cursor-pointer">Каталог</span>
              <span className="text-slate-600">/</span>
              <span onClick={onBackToCatalog} className="hover:text-white hover:underline transition cursor-pointer">УЗИ сканеры</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-200 font-bold truncate max-w-[240px] sm:max-w-none">{product.name}</span>
            </div>
          </div>
          <div className="flex gap-2.5 items-center w-full md:w-auto justify-between sm:justify-start">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${favorites.includes(product.id) ? 'bg-rose-950/40 border-rose-800 text-rose-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'}`}
            >
              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorites.includes(product.id) ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${compareList.includes(product.id) ? 'bg-cyan-950/40 border-cyan-800 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'}`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{compareList.includes(product.id) ? 'В сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-slate-950/0 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Core Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800/85 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider text-sky-405 uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Мировой Лидер Медтехники • GE Healthcare (США)</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              GE Healthcare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">LOGIQ Fortis R4</span>
            </h1>
            
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base max-w-xl">
              Стационарно-мобильный ультразвуковой аппарат ультра-премиального сегмента. Эксклюзивная архитектура cSound™ обеспечивает идеальную фокусировку каждого пикселя. Поколение R4 внедряет продвинутые инструменты искусственного интеллекта, которые кардинально снижают процент врачебного выгорания и клинической вариабельности.
            </p>

            {/* Social Proof Badges */}
            <div className="flex flex-wrap gap-3 py-1">
              <span className="bg-slate-900 text-slate-300 border border-slate-800 text-[11px] font-mono px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>iF Design Award Winner</span>
              </span>
              <span className="bg-slate-900 text-slate-300 border border-slate-800 text-[11px] font-mono px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Выбор 5000+ клиник в 160 странах</span>
              </span>
            </div>

            {/* Trust Pill Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">РУ Минздрава РФ</div>
                  <div className="text-[10px] text-slate-500">100% Легальность</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <Activity className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">cSound™ Мощь</div>
                  <div className="text-[10px] text-slate-500">Пиксели в фокусе</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center col-span-2 sm:col-span-1">
                <Zap className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">ИИ-АСИСТЕНТ</div>
                  <div className="text-[10px] text-slate-500">KOIOS DS TI-RADS</div>
                </div>
              </div>
            </div>

            {/* Price section */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <div className="space-y-1">
                <div className="text-slate-505 text-xs font-bold uppercase tracking-widest">СТОИМОСТЬ ПОД КЛЮЧ</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-sky-400">{(product.price).toLocaleString('ru-RU')} ₽</span>
                  {product.oldPrice && (
                    <span className="text-sm font-bold text-slate-600 line-through">{(product.oldPrice).toLocaleString('ru-RU')} ₽</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-initial">
                <button 
                  onClick={() => triggerQuote(product, 'kp')}
                  className="bg-sky-505 hover:bg-sky-400 bg-sky-500 text-slate-950 font-black px-6 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-sky-500/10 text-center cursor-pointer active:scale-95"
                >
                  Запросить спецификацию R4
                </button>
                <button 
                  onClick={() => triggerQuote(product, 'leasing')}
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition text-center cursor-pointer"
                >
                  Расчет в Лизинг
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Product View Render */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="bg-slate-900/40 border border-slate-850 p-8 rounded-3xl relative overflow-hidden shadow-2xl space-y-6 w-full max-w-sm">
              <div className="absolute top-4 right-4 bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Премиум R4 класс
              </div>
              
              {/* Product mockup render */}
              <div className="aspect-square bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&h=800&q=80" 
                  alt="GE Healthcare LOGIQ Fortis R4 Ultrasound Machine" 
                  className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs parameters short list */}
              <div className="space-y-2 text-xs border-t border-slate-805 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Диагональ тач-экрана:</span>
                  <span className="text-slate-300 font-bold font-mono">12.1" Мультисенсорный</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Архитектура луча:</span>
                  <span className="text-sky-400 font-bold">GE cSound™</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Автономность питания:</span>
                  <span className="text-emerald-400 font-bold font-mono">АКБ в комплекте</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TARGET USERS / CLINICAL PROFILE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-500 font-mono">ЦЕЛЕВЫЕ ПОКАЗАНИЯ</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Для кого подходит GE LOGIQ Fortis R4?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Универсальная глубина настроек делает этот аппарат идеальным клиническим вложением для широкого перечня медицинских учреждений.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Многопрофильные частные клиники',
              desc: 'Один аппарат полностью закрывает потребности отделений урологии, гинекологии, общей терапии и гастроэнтерологии за счет смены датчиков в одно касание.',
              accent: 'Максимальный ROI кабинета'
            },
            {
              title: 'Специализированные кардио-центры',
              desc: 'Использование тканевого допплера экспертного уровня и высокоточных фазированных датчиков позволяет вести тонкие исследования кровотока коронарных сосудов.',
              accent: 'Премиум гемодинамика'
            },
            {
              title: 'Центры женского здоровья и роддома',
              desc: 'Идеальное 3D/4D сканирование плода на ранних этапах. Качественное дуплексное картирование сосудов малого таза исключает гипоксические синдромы.',
              accent: 'Высокоточный пренатальный контроль'
            },
            {
              title: 'Кабинеты выездной и экспресс-диагностики',
              desc: 'Встроенный литий-ионный аккумулятор высокой емкости и быстрая подготовка к запуску позволяют использовать сканер в реанимации, ПИТ и операционных палатах.',
              accent: '100% Мобильность без потерь'
            }
          ].map((profile, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition duration-300">
              <div className="space-y-2">
                <div className="w-9 h-9 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl flex items-center justify-center font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-white">{profile.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{profile.desc}</p>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/15 text-center">
                {profile.accent}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLINICAL OBJECTION CLOSING (INTERACTIVE) */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-451 text-sky-400 font-mono">ЗАКРЫВАЕМ ВОПРОСЫ ДО ИХ ВОЗНИКНОВЕНИЯ</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Вся правда об УЗИ GE Healthcare LOGIQ Fortis R4</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              НАУЧНЫЕ И КОММЕРЧЕСКИЕ АРГУМЕНТЫ ДЛЯ РУКОВОДИТЕЛЕЙ КЛИНИК
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Objection selectors */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {[
                { id: 'quality', label: 'Качество изображения брюшного поля?' },
                { id: 'learning', label: 'Сложность обучения и утомляемость рук?' },
                { id: 'mobility', label: 'Можно ли возить его между палатами?' },
                { id: 'service', label: 'А если произойдет физическая поломка?' },
                { id: 'price', label: 'Какая переплата за мировой бренд GE?' }
              ].map((obj) => (
                <div key={obj.id} className="space-y-2 w-full">
                  <button
                    onClick={() => setActiveObjection(obj.id as any)}
                    className={`w-full text-left p-4 rounded-xl border transition duration-300 cursor-pointer flex items-center justify-between group ${activeObjection === obj.id ? 'bg-sky-500/15 border-sky-500/55 text-white' : 'bg-slate-900 border-slate-805 text-slate-400 hover:text-slate-200'}`}
                  >
                    <span className="text-xs font-bold">{obj.label}</span>
                    <ChevronRight className={`w-4 h-4 transition ${activeObjection === obj.id ? 'rotate-90 text-sky-400' : 'text-slate-600'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {activeObjection === obj.id && (
                    <div className="block lg:hidden bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4 text-left text-slate-350 animate-fade-in relative overflow-hidden">
                      <div className="absolute top-4 right-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[9px] px-2.5 py-0.5 rounded font-black tracking-widest uppercase">
                        ЗАКРЫТИЕ ПОЗИЦИИ
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-sky-500/15 text-sky-400 rounded-2xl border border-sky-500/20 shrink-0">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-sky-400">{objections[obj.id].title}</h4>
                            <span className="text-[10px] text-slate-500 font-mono uppercase block">РЕШЕНИЕ НА ЯЗЫКЕ ВЫГОД КЛИЕНТА</span>
                          </div>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl">
                          <p className="text-xs text-slate-200 font-bold leading-relaxed">
                            {objections[obj.id].boldText}
                          </p>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {objections[obj.id].desc}
                        </p>
                      </div>

                      <div className="border-t border-slate-900 pt-4 flex flex-col justify-between gap-1 text-[11px] font-mono">
                        <span className="text-slate-500">Доказанная эффективность:</span>
                        <span className="text-emerald-400 font-bold">{objections[obj.id].proof}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Answer Display Card */}
            <div className="hidden lg:flex lg:col-span-7 bg-slate-950 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6 flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[9px] px-2.5 py-0.5 rounded font-black tracking-widest uppercase">
                ЗАКРЫТИЕ ПОЗИЦИИ
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky-500/15 text-sky-400 rounded-2xl border border-sky-500/20">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-rose-455 text-sky-400">{objections[activeObjection].title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">РЕШЕНИЕ НА ЯЗЫКЕ ВЫГОД КЛИЕНТА</span>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl">
                  <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed">
                    {objections[activeObjection].boldText}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {objections[activeObjection].desc}
                </p>
              </div>

              <div className="border-t border-slate-900 pt-4 flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-500">Доказанная эффективность:</span>
                <span className="text-emerald-400 font-bold">{objections[activeObjection].proof}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SCIENTIFIC INTRODUCTION: THE 5 TECHNOLOGIES TABS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-444 text-sky-400 font-mono">ФИЗИКА И АППАРАТНАЯ СУЩНОСТЬ</span>
            <h2 className="text-3xl font-black text-white leading-tight">Инновационные технологии ультразвука поколения R4</h2>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Пять китов, на которых строится непревзойденная надежность диагностических результатов LOGIQ Fortis R4. Сокращение лишних клавиатурных операций освобождает эфирное время для прямого контакта с пациентом.
            </p>

            {/* Selector bullet buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              {[
                { id: 'csound', label: 'cSound™ луч' },
                { id: 'xdclear', label: 'xDclear™ датчик' },
                { id: 'ii_assist', label: 'ИИ ассистенты' },
                { id: 'kb_ergo', label: 'Клавиатурный комфорт' },
                { id: 'sonodefense', label: 'Кибербезопасность' }
              ].map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setActiveTech(tech.id as any)}
                  className={`px-3 py-2.5 text-xs border rounded-xl transition cursor-pointer font-bold ${activeTech === tech.id ? 'bg-sky-500/10 border-sky-500 text-sky-400 shadow-md' : 'bg-slate-900/50 border-slate-850 text-slate-400 hover:text-slate-200'}`}
                >
                  {tech.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Interactive Information Box */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[9px] px-2.5 py-0.5 rounded font-black tracking-widest uppercase">
              ТЕХ-СПЕКА
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/15 text-sky-400 rounded-2xl border border-sky-500/20">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white">{technologies[activeTech].title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">ГЛУБИННАЯ ФИЗИКА ТЕРАПИИ</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {technologies[activeTech].desc}
              </p>

              <div className="border-t border-slate-850 pt-4 space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex justify-between items-start gap-3">
                  <span className="text-slate-500">Техпараметры:</span>
                  <span className="text-sky-400 font-bold text-right">{technologies[activeTech].specs}</span>
                </div>
                <div className="flex justify-between items-start gap-3">
                  <span className="text-slate-500">Диагностический исход:</span>
                  <span className="text-emerald-400 font-bold text-right">{technologies[activeTech].result}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ADVANCED CLINICAL EFFICIENCY CALCULATOR */}
      <section className="py-20 bg-slate-900 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block bg-indigo-500/10 text-indigo-400 border border-indigo-505/20 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">ОКУПАЕМОСТЬ И ЭФФЕКТИВНОСТЬ КАБИНЕТА УЗИ</span>
            <h2 className="text-3xl font-black text-white leading-tight">Быстрый расчет рентабельности кабинета GE LOGIQ Fortis</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Интеллектуальные ИИ-функции и сокращенный на 32% ручной клик клавиатуры значительно ускоряют проведение исследований. С помощью интерактивных ползунков оцените финансовую емкость ультразвукового кабинета.
            </p>

            {/* Patients per week slider */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Кол-во исследований в неделю:</span>
                <span className="text-sky-400 font-bold font-mono">{scansPerWeek} человек</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="120" 
                step="5"
                value={scansPerWeek} 
                onChange={(e) => setScansPerWeek(Number(e.target.value))}
                className="w-full accent-sky-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>10 (низкая)</span>
                <span>120 (максимальная нагрузка)</span>
              </div>
            </div>

            {/* Price slider */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Средняя цена исследования (УЗИ):</span>
                <span className="text-emerald-400 font-bold font-mono">{(scanPrice).toLocaleString('ru-RU')} ₽</span>
              </div>
              <input 
                type="range" 
                min="1500" 
                max="8000" 
                step="250" 
                value={scanPrice} 
                onChange={(e) => setScanPrice(Number(e.target.value))}
                className="w-full accent-sky-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>1 500 ₽</span>
                <span>8 000 ₽</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Display Card */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono border-b border-slate-900 pb-3">Маржинальный ROI Анализ • LOGIQ Fortis</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-1">
                <div className="text-[9px] text-slate-500 font-bold uppercase">ПЛАНИРУЕМАЯ ЧИСТАЯ МЕСЯЧНАЯ ПРИБЫЛЬ</div>
                <div className="text-2xl font-black text-sky-400 font-mono">{calculations.monthlyNetProfit.toLocaleString('ru-RU')} ₽</div>
                <p className="text-[9px] text-slate-505">При чистой врачебной маржинальности узи ~60%</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-1">
                <div className="text-[9px] text-slate-500 font-bold uppercase">ВРЕМЯ, СЭКОНОМЛЕННОЕ В МЕСЯЦ ВРАЧОМ</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ~{calculations.totalHoursSavedPerMonth} часов
                </div>
                <p className="text-[9px] text-slate-500">Дополняет клинический ресурс на {calculations.extraSlotsCreated} ценных слотов!</p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-1.5">
              <div className="text-[9px] text-slate-400 font-bold uppercase">РАСЧЕТНЫЙ СРОК ПОЛНОЙ ОКУПАЕМОСТИ АППАРАТА</div>
              <div className="text-xl font-black text-indigo-400 font-mono">
                ~{calculations.paybackMonths} {calculations.paybackMonths === 1 ? 'месяц' : calculations.paybackMonths < 5 ? 'месяца' : 'месяцев'}
              </div>
              <p className="text-[9px] text-slate-500">При стоимости консоли {product.price.toLocaleString('ru-RU')} ₽</p>
            </div>

            <div className="bg-sky-95px bg-sky-950/30 border border-sky-800/15 p-4 rounded-xl text-xs text-slate-305 leading-relaxed flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                Благодаря высокой престижности бренда GE Healthcare, пациенты охотнее соглашаются на экспертные УЗИ, а средний чек исследования возрастает на <strong>25–30%</strong> выше рыночного минимума.
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => triggerQuote(product, 'turnkey')}
                className="flex-1 bg-sky-505 hover:bg-sky-400 bg-sky-500 text-slate-950 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Бизнес-план запуска в клинике
              </button>
              <button 
                onClick={() => triggerQuote(product, 'consultation')}
                className="flex-1 bg-slate-900 hover:bg-slate-855 border border-slate-800 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition"
              >
                Запросить КП
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FULL COMPACT SPECS TABLE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">Технические характеристики LOGIQ Fortis R4</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            ПОДРОБНЫЕ ПАРАМЕТРЫ ПЛАТФОРМЫ ДЛЯ ИНЖЕНЕРОВ И ГЛАВВРАЧЕЙ
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-space-905 text-slate-400 font-mono font-bold">
                <th className="p-4 sm:p-5">Клинический параметр</th>
                <th className="p-4 sm:p-5">Инженерное соответствие и функционал GE Healthcare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {Object.entries(product.fullSpecs).map(([key, value]) => (
                <tr key={key} className="hover:bg-slate-850/50 transition">
                  <td className="p-4 font-bold text-slate-300">{key}</td>
                  <td className="p-4 text-slate-450 text-slate-400 font-mono">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. WHAT'S IN THE BOX, WARRANTY & SERVICE */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-white tracking-tight">Комплектация и условия поставки под ключ</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              ГАРАНТИЯ БЕЗОПАСНОСТИ ASTMED — ОРИГИНАЛЬНОЕ ОБОРУДОВАНИЕ С ЛЕГАЛЬНЫМ СОПРОВОЖДЕНИЕМ
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            
            {/* Package Items */}
            <div className="md:col-span-7 bg-slate-950 border border-slate-850 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-sky-400" />
                <span>Фирменная спецификация R4 поставки:</span>
              </h3>
              
              <ul className="space-y-4">
                {product.packageIncludes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-405">
                    <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees and support */}
            <div className="md:col-span-5 space-y-6">
              {[
                {
                  title: 'Заводская Гарантия 24 месяца',
                  desc: 'AstMed осуществляет прямую гарантийную тех-поддержку на правах официального сервисного партнера. Все внеплановые ремонты и плановое техническое обслуживание (ПТО) производятся аттестованными специалистами.',
                  color: 'border-emerald-500/20 bg-emerald-950/20 text-emerald-400'
                },
                {
                  title: 'Полный комплект документации',
                  desc: 'В комплекте поставляется русифицированное программное обеспечение, подробное руководство оператора на русском языке от GE Healthcare, а также копия Регистрационного удостоверения Росздравнадзора со всеми синими печатями.',
                  color: 'border-sky-500/20 bg-sky-950/20 text-sky-400'
                },
                {
                  title: 'Врачебная апробация и инсталляция',
                  desc: 'Мы берем на себя доставку, сборку, запуск системного софта, настройку калибровочных плоскостей под ваших врачей и индивидуальный экспресс-курс апробационной работы.',
                  color: 'border-indigo-505 border-indigo-500/20 bg-indigo-950/20 text-indigo-400'
                }
              ].map((guard, idx) => (
                <div key={idx} className={`border p-6 rounded-3xl space-y-2 shadow-lg ${guard.color}`}>
                  <h4 className="text-sm font-bold text-white uppercase font-mono">{guard.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{guard.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 9. INTUITIVE LEAD CAPTURE SYSTEM (LEAD-MAGNET) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
          
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Left offer text */}
            <div className="md:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold font-mono text-[10px] px-2.5 py-1 rounded">
                <Sparkles className="w-3.5 h-3.5" />
                <span>СПЕЦИАЛЬНЫЙ ОФФЕР ОГРАНИЧЕН</span>
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Оставьте номер телефона прямо сейчас и получите БЕСПЛАТНО:
              </h2>
              
              <ul className="space-y-4">
                {[
                  'Персональный расчет окупаемости кабинета под ваш профиль клиники',
                  'Сравнение с конкурентами (Philips Affinity/Epiq, Siemens Juniper, Samsung) в PDF',
                  'Приоритетную консультацию аттестованного специалиста GE Healthcare'
                ].map((magnet, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs leading-relaxed text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 block mt-0.5 flex-shrink-0" />
                    <span>{magnet}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl flex items-center gap-3 text-xs text-rose-400 font-mono">
                <Clock className="w-5 h-5 animate-pulse" />
                <span>Внимание: Специальное предложение действует в течение 48 часов!</span>
              </div>
            </div>

            {/* Right lead capture form */}
            <div className="md:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-2xl space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 text-center font-mono">Быстрая заявка под ключ</h3>
              
              {!formSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 font-mono uppercase">Ваше имя:</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="Алексей Иванович" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 transition font-sans"
                      />
                      <User className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 font-mono uppercase">Ваш телефон:</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        required
                        placeholder="+7 (999) 000-00-00" 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 transition font-mono"
                      />
                      <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-sky-505 hover:bg-sky-400 bg-sky-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg shadow-sky-500/10"
                  >
                    <span>Забрать спец-пакет</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="mx-auto w-12 h-12 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white">Заявка успешно принята!</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Наш сертифицированный специалист по оборудованию GE Healthcare свяжется с вами по номеру <strong className="font-mono text-sky-400">{formPhone}</strong> в ближайшие 15 минут для расчета окупаемости и отправки PDF-сравнения. Ближайшие 48 часов за вами гарантирован специальный офер.
                    </p>
                  </div>
                </div>
              )}

              <p className="text-[9px] text-slate-600 text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с Политикой обработки персональных данных и ФЗ РФ №152.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: НАША КОМАНДА "ASTMED" */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 mt-12 max-w-7xl mx-auto" id="astmed-team-trust">
        <div className="grid lg:grid-cols-12 gap-8 items-center text-slate-100">
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
              Нам доверяют лучшие многопрофильные центры
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

      {/* 10. LEGAL DISCLAIMER */}
      <AstmedTeamBlock />

      <footer className="pt-8 border-t border-slate-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] text-slate-600 space-y-2">
        <p>Имеются противопоказания. Требуется консультация специалиста. Оборудование зарегистрировано в установленном порядке Росздравнадзором Минздрава РФ.</p>
        <p>© 2026 AstMed. Все права защищены. GE Healthcare и LOGIQ являются зарегистрированными товарными знаками General Electric Company.</p>
      </footer>

      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="logiq-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
