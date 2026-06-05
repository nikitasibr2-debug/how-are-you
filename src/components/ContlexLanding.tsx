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
  FileCheck, 
  ChevronRight,
  Info,
  Check,
  Zap,
  Sliders
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';

interface ContlexLandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const ContlexLanding: React.FC<ContlexLandingProps> = ({
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
  const [activeDepth, setActiveDepth] = useState<number>(4.5);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedPack, setSelectedPack] = useState<'standard' | 'business' | 'partner'>('standard');
  const [activeObjection, setActiveObjection] = useState<'usage' | 'safety' | 'doctors' | 'consumables' | 'preview'>('usage');

  // ROI Calculator
  const [proceduresPerWeek, setProceduresPerWeek] = useState<number>(3);
  const [procedurePrice, setProcedurePrice] = useState<number>(35000);

  // Lead Capture Form States
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormSubmitted(true);
    logger.info('Пользователь отправил заявку на Contlex', {
      name: formName,
      phone: formPhone
    });
  };

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Profit Calculations
  const monthlyProfit = useMemo(() => {
    const weeklyRevenue = proceduresPerWeek * procedurePrice;
    const monthlyRevenue = weeklyRevenue * 4.3; // 4.3 weeks in a month
    const lineCostPerProcedure = 350 * 5; // ~350 lines per session * 5 RUB line cost
    const gelAndConsumables = 1000;
    const cleanProfitMargin = 0.85; // 85% high profit margin
    return Math.round((monthlyRevenue - (proceduresPerWeek * 4.3 * (lineCostPerProcedure + gelAndConsumables))) * cleanProfitMargin);
  }, [proceduresPerWeek, procedurePrice]);

  const paybackPeriodMonths = useMemo(() => {
    const deviceCost = product.price;
    if (monthlyProfit <= 0) return 99;
    return Math.max(1, Math.ceil(deviceCost / monthlyProfit));
  }, [product.price, monthlyProfit]);

  // Depths for interactive chart
  const depthsInfo = [
    { value: 1.5, name: 'Эпидермис / Субдерма', effect: 'Коррекция мелких мимических морщин, выравнивание тонуса, сужение пор и улучшение тотального светоотражения кожи.' },
    { value: 3.0, name: 'Глубокая дерма', effect: 'Запуск неоколлагенеза первого и третьего типов, уплотнение фибриллярного каркаса лица, сокращение площади кожного лоскута.' },
    { value: 4.5, name: 'Уровень SMAS (Мышечный слой)', effect: 'Ключевой слой подтяжки. Сфокусированный ультразвук точечно сокращает мышечно-апоневротическую систему, возвращая ткани на место.' },
    { value: 6.0, name: 'Глубокие структуры лица', effect: 'Уплотнение тяжелых провисающих зон щек, субментальной области и деликатная проработка связочного аппарата.' },
    { value: 13.0, name: 'Локальные жировые ловушки', effect: 'Ультразвуковой липолиз: разрушение адипоцитов, уменьшение толщины жировых пакетов на теле, галифе, фланках и животе.' }
  ];

  const faqs = [
    {
      q: 'Это больно?',
      a: 'Во время сеанса чувствуются короткие интенсивные тепловые покалывания в глубине тканей. Уровень дискомфорта умеренный и легко регулируется врачом путем уменьшения шага или энергии. Применение анестезирующего геля перед процедурой сводит неприятные ощущения к минимуму.'
    },
    {
      q: 'Сколько процедур требуется на курс?',
      a: 'Чаще всего достаточно всего одной полноценной процедуры SMAS-лифтинга для достижения стойкого результата. В редких случаях тяжелого птоза врач может назначить повторный точечный сеанс через 6 месяцев.'
    },
    {
      q: 'Когда виден окончательный результат?',
      a: 'Первые изменения заметны сразу после сеанса за счет мгновенного сокращения нагретых коллагеновых спиралей. Основной нарастающий эффект лифтинга и преображения овала контура формируется в течение 2–3 месяцев по мере созревания нового коллагена.'
    },
    {
      q: 'Есть ли период реабилитации?',
      a: 'Нет. В отличие от фракционных лазеров или пилингов, высокоинтенсивный фокусный ультразвук HIFU проходит сквозь эпидермис абсолютно беспрепятственно и работает только в целевой мишени. Легкое покраснение кожи проходит в течение 30-40 минут.'
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
              <span onClick={onBackToCatalog} className="hover:text-white hover:underline transition cursor-pointer">Косметология</span>
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

      {/* 2. HERO HEADER SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-slate-950/0 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800/80 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider text-cyan-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>БЕЗОПЕРАЦИОННЫЙ SMAS-ЛИФТИНГ (HIFU)</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              Contlex — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">SMAS-лифтинг</span> без операции
            </h1>
            
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base max-w-xl">
              Ультразвуковой HIFU-аппарат, работающий на глубоком уровне кожи, жировых пакетов и SMAS (мышечно-апоневротического слоя). Обеспечивает видимое сокращение тканей, формирование четких контуров лица и тела без хирургических разрезов и боли.
            </p>

            {/* Core Trust Pill badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">Росздравнадзор</div>
                  <div className="text-[10px] text-slate-500">100% Легально</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">1 СЕАНС</div>
                  <div className="text-[10px] text-slate-500">Стойкий эффект</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center col-span-2 sm:col-span-1">
                <TrendingUp className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">IDC Система</div>
                  <div className="text-[10px] text-slate-500">Стабильный фокус</div>
                </div>
              </div>
            </div>

            {/* Price block & buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <div className="space-y-1">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">СТОИМОСТЬ ПОД КЛЮЧ</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-cyan-400">{(product.price).toLocaleString('ru-RU')} ₽</span>
                  {product.oldPrice && (
                    <span className="text-sm font-bold text-slate-600 line-through">{(product.oldPrice).toLocaleString('ru-RU')} ₽</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-initial">
                <button 
                  onClick={() => triggerQuote(product, 'kp')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/20 text-center cursor-pointer active:scale-95"
                >
                  Получить спецификацию
                </button>
                <button 
                  onClick={() => triggerQuote(product, 'leasing')}
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition text-center cursor-pointer"
                >
                  Купить в Лизинг
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Core Device Render */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-indigo-505/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl space-y-6 w-full max-w-sm">
              <div className="absolute top-4 right-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Бестселлер АстМед
              </div>
              
              {/* Product render mockup */}
              <div className="aspect-square bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&h=800&q=80" 
                  alt="SMAS HIFU Contlex" 
                  className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Specs parameters short list */}
              <div className="space-y-2 text-xs border-t border-slate-800/80 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Сфокусированный звук:</span>
                  <span className="text-cyan-400 font-bold font-mono">HIFU Система</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Глубины картриджей:</span>
                  <span className="text-slate-300 font-bold">7 типов от 1.5 до 13 мм</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Импульсная подача:</span>
                  <span className="text-slate-300 font-bold font-mono">10 мс (сверхкороткий)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SCIENTIFIC INTRODUCTION: HIFU SYSTEM */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">HIFU-технология: точечное воздействие на глубине</h2>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Высокоинтенсивный сфокусированный ультразвук (HIFU) проникает сквозь поверхностные слои кожи абсолютно без ее повреждения, формируя локальные микрозоны тепловой коагуляции на строго заданной глубине.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Это провоцирует естественное мгновенное сокращение коллагеновых и эластиновых волокон, запуская каскад синтеза нового каркаса лица. Contlex позволяет добиваться устойчивой подтяжки овала лица и уменьшения птоза за один комфортный сеанс, исключая хирургические риски и наркоз.
            </p>

            <div className="bg-slate-900/60 border border-slate-850 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Стабильная глубина воздействия (IDC)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Система контроля фокуса (IDC) поддерживает абсолютно одинаковую плотность и глубину импульса на протяжении всех 10 000 линий картриджа, защищая лицо от ожогов и оплошностей.
                </p>
              </div>
            </div>
          </div>

          {/* Key Tasks List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Какие клинические задачи решает Contlex?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Быстрая подтяжка овала лица и брылей',
                'Коррекция гравитационного птоза лица',
                'Лифтинг нижней трети и уплотнение подбородка',
                'Работа с областью шеи и устранение колец Венеры',
                'Создание каркасной прочности дряблой кожи',
                'Быстрое моделирование контуров тела',
                'Уменьшение локальных жировых пакетов (HIFU липолиз)',
                'Нехирургическая блефаропластика лица'
              ].map((task, tidx) => (
                <div key={tidx} className="flex gap-2.5 items-start text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEVEN LEVEL SYSTEM DEPTH VISUALIZER */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Разные уровни воздействия под конкретную задачу
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Contlex снабжен 7 прецизионными картриджами для тотальной работы со всей структурой лица и тела. Нажмите на глубину, чтобы увидеть характер и результаты ультразвукового коагуляционного воздействия.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left selector */}
            <div className="lg:col-span-4 space-y-2">
              {depthsInfo.map((depth) => (
                <button
                  key={depth.value}
                  onClick={() => setActiveDepth(depth.value)}
                  className={`w-full text-left px-4 py-3 border rounded-xl flex items-center justify-between transition cursor-pointer ${activeDepth === depth.value ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold' : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-350 hover:border-slate-800'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2.5 py-0.5 bg-slate-900 rounded font-bold text-white leading-none">
                      {depth.value <= 3.0 ? `${depth.value} мм` : `${depth.value} мм`}
                    </span>
                    <span className="text-xs">{depth.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition ${activeDepth === depth.value ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>

            {/* Right Visual Cross Section Representation */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
              <h4 className="text-sm font-black text-white uppercase tracking-wider font-mono">Графический срез воздействия ультразвуковой импульсной волны</h4>
              
              <div className="w-full h-48 bg-slate-950 rounded-2xl border border-slate-850 relative overflow-hidden flex flex-col justify-between p-4">
                {/* Visual skin blocks */}
                <div className={`h-8 border-b border-dashed border-slate-800 flex items-center px-4 justify-between transition ${activeDepth === 1.5 ? 'bg-cyan-500/5' : ''}`}>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Эпидермис (0 - 1.5 мм)</span>
                  {activeDepth === 1.5 && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />}
                </div>
                
                <div className={`flex-1 border-b border-dashed border-slate-800 flex items-center px-4 justify-between transition ${activeDepth === 3.0 ? 'bg-cyan-500/5' : ''}`}>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Дермальная сетка (1.5 - 3.0 мм)</span>
                  {activeDepth === 3.0 && <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />}
                </div>

                <div className={`flex-1 border-b border-dashed border-slate-800 flex items-center px-4 justify-between transition ${activeDepth === 4.5 ? 'bg-cyan-500/5' : ''}`}>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">Мышечный слой SMAS (4.5 мм)</span>
                  {activeDepth === 4.5 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-rose-400">Точки коагуляции</span>
                      <div className="w-3.5 h-3.5 bg-rose-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                <div className={`h-12 flex items-center px-4 justify-between transition ${activeDepth >= 6.0 ? 'bg-cyan-500/5' : ''}`}>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Подкожные ткани & Гиподерма (6.0 - 13.0 мм)</span>
                  {activeDepth >= 6.0 && <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />}
                </div>
              </div>

              {/* Detail effect descriptor text block */}
              <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl text-xs space-y-1.5">
                <div className="font-bold text-cyan-400">Характер регенеративной терапии:</div>
                <p className="text-slate-300 leading-relaxed">
                  {depthsInfo.find(d => d.value === activeDepth)?.effect}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHY HOSPITALS PREFER CONTLEX SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Что отличает Contlex от других HIFU-систем</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">ТЕХНИЧЕСКОЕ И КЛИНИЧЕСКОЕ ПРЕВОСХОДСТВО</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              idx: '01', 
              title: 'Сверхкороткий импульс — 10 мс', 
              desc: 'Прецизионная подача ультразвуковой энергии исключает нежелательный перегрев прилегающих тканей, существенно снижая болезненные покалывания.' 
            },
            { 
              idx: '02', 
              title: 'Технология IDC калибровки', 
              desc: 'Автоматический контроль глубины сохраняет фокусное расстояние луча безукоризненным на протяжении всего ресурса картриджа.' 
            },
            { 
              idx: '03', 
              title: 'Высочайшая скорость линии', 
              desc: 'Генерация аккуратной линии точек происходит за рекордные 0.8 секунды, что повышает комфорт и сокращает время сеанса до получаса.' 
            },
            { 
              idx: '04', 
              title: 'Гибкое регулирование плотности', 
              desc: 'Врач тонко настраивает расстояние между фокусными точкам (1-5 мм) и длину линии под индивидуальное строение мышечного каркаса лица.' 
            }
          ].map((feat) => (
            <div key={feat.idx} className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative space-y-3">
              <span className="absolute top-4 right-4 text-3xl font-black text-cyan-505/15 font-mono">{feat.idx}</span>
              <h4 className="text-sm font-bold text-white pt-2">{feat.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BUSINESS ROI CALCULATOR FOR CLINICS */}
      <section className="py-20 bg-slate-900 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">БИЗНЕС-ОКУПАЕМОСТЬ SMAS КАБИНЕТА</span>
            <h2 className="text-3xl font-black text-white leading-tight">Рассчитайте маржинальность SMAS-лифтинга</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Благодаря высокой стоимости процедуры (одна из самых дорогих в прайсах эстетических центров), вложения в аппарат Contlex возвращаются в рекордно короткие сроки.
            </p>

            {/* Procedures slider */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Процедур в неделю:</span>
                <span className="text-cyan-400 font-bold font-mono">{proceduresPerWeek} шт.</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={proceduresPerWeek} 
                onChange={(e) => setProceduresPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
            </div>

            {/* Price slider */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Средняя стоимость сеанса в регионе:</span>
                <span className="text-emerald-400 font-bold font-mono">{(procedurePrice).toLocaleString('ru-RU')} ₽</span>
              </div>
              <input 
                type="range" 
                min="15000" 
                max="80000" 
                step="1000" 
                value={procedurePrice} 
                onChange={(e) => setProcedurePrice(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
            </div>
          </div>

          {/* ROI Calculator Outputs */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono border-b border-slate-900 pb-3">Маржинальный ROI Анализ</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-1">
                <div className="text-[9px] text-slate-500 font-bold uppercase">ЧИСТАЯ МЕСЯЧНАЯ ПРИБЫЛЬ</div>
                <div className="text-2xl font-black text-white font-mono">{monthlyProfit.toLocaleString('ru-RU')} ₽</div>
                <p className="text-[9px] text-slate-500">За вычетом картриджных импульсов</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-1">
                <div className="text-[9px] text-slate-500 font-bold uppercase">СРОК ВОЗВРАТА ИНВЕСТИЦИЙ</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {paybackPeriodMonths} {paybackPeriodMonths === 1 ? 'месяц' : paybackPeriodMonths < 5 ? 'месяца' : 'месяцев'}
                </div>
                <p className="text-[9px] text-slate-500">При маржинальности процедуры свыше 85%</p>
              </div>
            </div>

            <div className="bg-cyan-950/30 border border-cyan-800/10 p-4 rounded-xl text-xs text-slate-400 leading-relaxed flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                В отличие от других инвазивных методик, себестоимость одной SMAS линии у аппарата Contlex составляет всего около <strong>4.5 - 5 рублей</strong>. При проведении процедуры на 350-400 линий чистая операционная прибыль с сеанса составляет колоссальные <strong>90%</strong>.
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => triggerQuote(product, 'turnkey')}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Бизнес-план запуска
              </button>
              <button 
                onClick={() => triggerQuote(product, 'consultation')}
                className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition"
              >
                Запросить КП
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. DETAILED PACKAGES AND STARTERS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Стартовые комплектации аппарата Contlex</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Мы позаботились о быстрой окупаемости и спроектировали 3 сбалансированных варианта запуска кабинета SMAS терапии.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: 'standard',
              title: 'Комплектация «Оптима»',
              article: 'AM-BCON',
              desc: 'Прекрасно подходит для расширения действующей сетки эстетических услуг клиники.',
              bullets: [
                'Аппарат SMAS лифтинга Contlex',
                '3 картриджа для лица (1.5 мм, 3.0 мм, 4.5 мм) по 10 000 линий',
                'Протоколы ведения от ведущих методистов АстМед',
                '1 год полной сервисной гарантии'
              ]
            },
            {
              id: 'business',
              title: 'Комплект «Медикал Практик»',
              article: 'AM-SCON',
              desc: 'Бестселлер. Внедряет точечное моделирование тела в дополнение к лифтингу.',
              bullets: [
                'Аппарат SMAS лифтинга Contlex',
                '5 картриджей (1.5, 3.0, 4.5, 6.0, 8.0 мм)',
                'Обучение 2-х врачей с сертификацией',
                'Готовый набор контента для соцсетей вашей клиники',
                '2 года расширенной сервисной гарантии'
              ]
            },
            {
              id: 'partner',
              title: 'Все включено «Максимальный Запуск»',
              article: 'AM-PCON',
              desc: 'Ультимативный пакет для быстрого вывода клиники на плановые показатели выручки.',
              bullets: [
                'Аппарат SMAS лифтинга Contlex',
                'Полный комплект 7 картриджей от 1.5 до 13.0 мм',
                'Выездное индивидуальное обучение методистов клиники',
                'Рекламный бюджет на первичное привлечение пациентов в подарок',
                '3 года VIP-гарантии и подменный аппарат на время ТО'
              ]
            }
          ].map((pack) => (
            <div 
              key={pack.id}
              onClick={() => setSelectedPack(pack.id as any)}
              className={`bg-slate-900 border rounded-3xl p-6 space-y-5 transition duration-350 cursor-pointer relative flex flex-col justify-between ${selectedPack === pack.id ? 'border-cyan-500 ring-1 ring-cyan-500 shadow-xl' : 'border-slate-800 hover:border-slate-705'}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-mono tracking-wider font-black px-2 py-0.5 rounded ${selectedPack === pack.id ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400'}`}>
                    {pack.article}
                  </span>
                  {pack.id === 'business' && (
                    <span className="text-[9px] font-black tracking-wider uppercase bg-emerald-500 text-white rounded px-2 py-0.5">РЕКОМЕНДУЕМ</span>
                  )}
                </div>
                
                <h4 className="text-base font-black text-white">{pack.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{pack.desc}</p>
                
                <div className="space-y-2.5 border-t border-slate-850 pt-4">
                  {pack.bullets.map((b, bidx) => (
                    <div key={bidx} className="flex gap-2.5 items-start text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => triggerQuote(product, 'kp')}
                className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition mt-6 ${selectedPack === pack.id ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-slate-950 border border-slate-800 hover:bg-slate-900'}`}
              >
                Выбрать комплектацию
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. DETAILED HARD ANSWERS TO FEARS (OBJECTIONS) */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Жесткие ответы на главные страхи клиник по SMAS</h2>
            <p className="text-xs text-slate-400 font-mono">СТАНДАРТ БЕЗОПАСНОСТИ И ГАРАНТИЙ АСТМЕД ДЛЯ CONTLEX</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left fears links */}
            <div className="lg:col-span-5 space-y-2">
              {[
                { id: 'usage', icon: '💎', label: 'ПРИВЛЕЧЕНИЕ', title: '«А вдруг SMAS у нас будет стоять без дела?»' },
                { id: 'safety', icon: '🛡️', label: 'ПОВРЕЖДЕНИЯ', title: '«Переживаем за ожоги, шрамы и неровности лица»' },
                { id: 'doctors', icon: '🎓', label: 'ПЕРСОНАЛ', title: '«Врачи боятся работать на HIFU и больно колоть»' },
                { id: 'consumables', icon: '📦', label: 'СЕБЕСТОИМОСТЬ', title: '«Боимся, что картриджи будут золотыми по цене»' },
                { id: 'preview', icon: '🎥', label: 'ТЕСТ-ДРАЙВ', title: '«Хотим увидеть аппарат вживую перед покупкой»' }
              ].map((tab) => (
                <div key={tab.id} className="space-y-2 w-full">
                  <button
                    onClick={() => {
                      setActiveObjection(tab.id as any);
                      logger.info(`Переход по страху Contlex: ${tab.label}`);
                    }}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border transition duration-200 cursor-pointer flex items-center justify-between group ${activeObjection === tab.id ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-lg' : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{tab.icon}</span>
                      <div className="space-y-0.5text-left">
                        <span className="text-[9px] uppercase tracking-wider font-bold block text-cyan-400">{tab.label}</span>
                        <span className="text-xs font-bold leading-normal block">{tab.title}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition ${activeObjection === tab.id ? 'rotate-90 text-cyan-400' : 'text-slate-600'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {activeObjection === tab.id && (
                    <div className="block lg:hidden bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fade-in text-left text-slate-300">
                      {tab.id === 'usage' && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 rounded py-0.5">РЕШЕНИЕ: АСТМЕД ОКУПАЕМОСТЬ</span>
                          <h3 className="text-sm font-black text-white">SMAS-лифтинг не стоит без дела в клиниках</h3>
                          <p className="text-xs leading-relaxed text-slate-400">
                            Ультразвуковой SMAS — это базовая, самая дорогая процедура в эстетической клинике. Спрос на омоложение без уколов и операций растет на 40% ежегодно. АстМед предоставляет готовый рекламный "Маркетинг-пак" (видео, баннеры, готовые посты), чтобы вы собрали полную запись на аппарат еще до его физической отгрузки со склада.
                          </p>
                        </div>
                      )}
                      {tab.id === 'safety' && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ТОЧНОСТЬ ПРЕВЫШЕ ВСЕГО</span>
                          <h3 className="text-sm font-black text-white">Технология IDC на 100% страхует от ожогов</h3>
                          <p className="text-xs leading-relaxed text-slate-400">
                            Большинство ожогов и оплошностей на старых китайских аппаратах HIFU происходит из-за нестабильности фокусного расстояния датчиков. Консоль Contlex оборудована умным чипом IDC, который гарантирует: расстояние коагулирующей фокусной капли составляет точно 1.5, 3.0 или 4.5 мм с прецизионной погрешностью до сотых долей микрона на протяжении всего ресурса кассет. Вы полностью защищены.
                          </p>
                        </div>
                      )}
                      {tab.id === 'doctors' && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ОБУЧЕНИЕ И ПОДДЕРЖКА</span>
                          <h3 className="text-sm font-black text-white">Врачей обучает практикующий сертифицированный тренер</h3>
                          <p className="text-xs leading-relaxed text-slate-400">
                            Вы получаете полноценное выездное или онлайн обучение врачей-косметологов от нашей клинической академии бесплатно. Поставим руку специалистам, разберем анатомические опасные зоны, поделимся пошаговыми протоколами (от мелких морщин до тяжелого лимфостазного гравитационного птоза). Врачи будут работать уверенно и спокойно.
                          </p>
                        </div>
                      )}
                      {tab.id === 'consumables' && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ЧЕСТНЫЕ РАСХОДНИКИ</span>
                          <h3 className="text-sm font-black text-white">Низкая себестоимость линии — забудьте о "золотых" тратах</h3>
                          <p className="text-xs leading-relaxed text-slate-400">
                            Ресурс каждого картриджа Contlex составляет 10 000 линий коагуляции. Мы поставляем сертифицированные заводские картриджи без грабительских накруток. Себестоимость одной линии составляет рекордные 4.5 - 5 рублей. Полная процедура на лице (350 линий) обойдется вашей клинике менее чем в 1 800 рублей, тогда как рыночная цена сеанса — от 25 000 рублей!
                          </p>
                        </div>
                      )}
                      {tab.id === 'preview' && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ТЕСТ-ДРАЙВ</span>
                          <h3 className="text-sm font-black text-white">Приглашаем на бесплатный тест-драйв в Москве и СПБ</h3>
                          <p className="text-xs leading-relaxed text-slate-400">
                            Мы не продаем кота в мешке. Приезжайте в наш технологичный шоурум: поработайте на Contlex лично, оцените эргономику ультразвуковой манипулы, проверьте стабильность импульса на акриловых пластинах. Также доставляем аппарат на презентацию в вашу клинику онлайн.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right details answer box */}
            <div id="contlex-objection-view-scroll" className="hidden lg:flex lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden min-h-[380px] flex-col justify-between scroll-mt-24">
              <div className="space-y-4 text-slate-300">
                {activeObjection === 'usage' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 rounded py-0.5">РЕШЕНИЕ: АСТМЕД ОКУПАЕМОСТЬ</span>
                    <h3 className="text-lg font-black text-white">SMAS-лифтинг не стоит без дела в клиниках</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Ультразвуковой SMAS — это базовая, самая дорогая процедура в эстетической клинике. Спрос на омоложение без уколов и операций растет на 40% ежегодно. АстМед предоставляет готовый рекламный "Маркетинг-пак" (видео, баннеры, готовые посты), чтобы вы собрали полную запись на аппарат еще до его физической отгрузки со склада.
                    </p>
                  </div>
                )}

                {activeObjection === 'safety' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ТОЧНОСТЬ ПРЕВЫШЕ ВСЕГО</span>
                    <h3 className="text-lg font-black text-white">Технология IDC на 100% страхует от ожогов</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Большинство ожогов и оплошностей на старых китайских аппаратах HIFU происходит из-за нестабильности фокусного расстояния датчиков. Консоль Contlex оборудована умным чипом IDC, который гарантирует: расстояние коагулирующей фокусной капли составляет точно 1.5, 3.0 или 4.5 мм с прецизионной погрешностью до сотых долей микрона на протяжении всего ресурсаカートリッジ. Вы полностью защищены.
                    </p>
                  </div>
                )}

                {activeObjection === 'doctors' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ОБУЧЕНИЕ И ПОДДЕРЖКА</span>
                    <h3 className="text-lg font-black text-white">Врачей обучает практикующий сертифицированный тренер</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Вы получаете полноценное выездное или онлайн обучение врачей-косметологов от нашей клинической академии бесплатно. Поставим руку специалистам, разберем анатомические опасные зоны, поделимся пошаговыми протоколами (от мелких морщин до тяжелого лимфостазного гравитационного птоза). Врачи будут работать уверенно и спокойно.
                    </p>
                  </div>
                )}

                {activeObjection === 'consumables' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ЧЕСТНЫЕ РАСХОДНИКИ</span>
                    <h3 className="text-lg font-black text-white">Низкая себестоимость линии — забудьте о "золотых" тратах</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Ресурс каждого картриджа Contlex составляет 10 000 линий коагуляции. Мы поставляем сертифицированные заводские картриджи без грабительских накруток. Себестоимость одной линии составляет рекордные 4.5 - 5 рублей. Полная процедура на лице (350 линий) обойдется вашей клинике менее чем в 1 800 рублей, тогда как рыночная цена сеанса — от 25 000 рублей!
                    </p>
                  </div>
                )}

                {activeObjection === 'preview' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-955 px-2 rounded py-0.5">РЕШЕНИЕ: ТЕСТ-ДРАЙВ</span>
                    <h3 className="text-lg font-black text-white">Приглашаем на бесплатный тест-драйв в Москве и СПБ</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Мы не продаем кота в мешке. Приезжайте в наш технологичный шоурум: поработайте на Contlex лично, оцените эргономику ультразвуковой манипулы, проверьте стабильность импульса на акриловых пластинах. Также доставляем аппарат на видеопрезентацию в вашу клинику онлайн.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => triggerQuote(product, 'consultation')}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold py-3 px-6 rounded-xl text-xs uppercase"
                >
                  Отработать остальные сомнения
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. DETAILED BUSINESS FAQ SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Отвечаем на вопросы пациентов и врачей</h2>
          <p className="text-xs text-slate-400">Популярный FAQ о работе ультразвукового лифтинга Contlex</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, fidx) => (
            <div 
              key={fidx} 
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setExpandedFaq(expandedFaq === fidx ? null : fidx)}
            >
              <div className="p-5 flex justify-between items-center text-sm font-bold">
                <span className="text-slate-200">{faq.q}</span>
                <span className="text-cyan-400">{expandedFaq === fidx ? '−' : '+'}</span>
              </div>
              {expandedFaq === fidx && (
                <div className="p-5 pt-0 text-xs text-slate-400 border-t border-slate-850 bg-slate-950/20 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. LEADS GATHERING CONVERSION FOOTER */}
      <section className="bg-slate-900/60 border-t border-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Скачайте полный бизнес-план запуска SMAS-лифтинга</h2>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Оставьте контакты: мы пришлем экономическую карту маржинальности, пошаговый план набора записи пациентов и подробную спецификацию комплектаций Contlex в мессенджер.
            </p>
          </div>

          <div className="bg-slate-955 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <form onSubmit={handleLeadSubmit} className="grid sm:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Ваше имя / Клиника" 
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              />
              <input 
                type="tel" 
                placeholder="Контактный телефон" 
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider py-3 cursor-pointer"
              >
                Скачать бизнес-план
              </button>
            </form>

            {formSubmitted && (
              <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-400 font-bold">
                ✓ Спасибо! Материалы по Contlex успешно отправлены в Telegram / WhatsApp на указанный номер телефона.
              </div>
            )}
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
              Нам доверяют лучшие клиники РФ
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

      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="contlex-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
