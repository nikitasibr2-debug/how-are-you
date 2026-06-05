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
  Send, 
  Clock, 
  FileCheck, 
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  BookOpen,
  Info,
  Wrench,
  MapPin,
  AlertTriangle,
  FileText,
  Check,
  Users,
  Briefcase,
  ShieldAlert,
  SlidersHorizontal,
  Zap,
  Phone
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';
import { AstmedTeamBlock } from './AstmedTeamBlock';

interface EllisysPlusSLandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const EllisysPlusSLanding: React.FC<EllisysPlusSLandingProps> = ({
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

  // Local States for interactive blocks
  const [activeNeedleTab, setActiveNeedleTab] = useState<'isolated' | 'non_isolated'>('isolated');
  const [activeCase, setActiveCase] = useState<'face' | 'hands' | 'scars'>('face');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedPack, setSelectedPack] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // ROI Calculator
  const [patientsPerDay, setPatientsPerDay] = useState<number>(3);
  const [treatmentPrice, setTreatmentPrice] = useState<number>(12000);

  // Objection Handling
  const [objectionTab, setObjectionTab] = useState<'roi' | 'safety' | 'rehad' | 'options' | 'demo'>('roi');

  // Lead capture states
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [giftSelected, setGiftSelected] = useState<string>('pocket_guide');

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Calculating monthly profit and ROI
  const monthlyRevenue = useMemo(() => {
    return patientsPerDay * treatmentPrice * 24; // 24 working days
  }, [patientsPerDay, treatmentPrice]);

  const paybackPeriodMonths = useMemo(() => {
    const cost = product.price;
    const monthlyConsumables = patientsPerDay * 1200 * 24; // ~1200 rub cost of needle/tip per procedure
    const cleanMonthlyProfit = monthlyRevenue - monthlyConsumables - 50000; // 50k staff/rent share
    if (cleanMonthlyProfit <= 0) return 99;
    return Math.ceil(cost / cleanMonthlyProfit);
  }, [product.price, monthlyRevenue, patientsPerDay]);

  const faqs = [
    {
      q: 'Это больно?',
      a: 'Нет. Благодаря запатентованной вакуумной технологии Smart Vacuum, насадка мягко захватывает и фиксирует кожу перед проникновением игл. Это сводит к минимуму дискомфорт и болевые ощущения, делая процедуру максимально комфортной даже без сильной анестезии.'
    },
    {
      q: 'Можно ли делать процедуру летом?',
      a: 'Да, процедуру на Ellisys Plus S можно проводить круглогодично. Микроигольчатый RF безопасен для любого фототипа кожи, однако в первые 5–7 дней после сеанса крайне важно избегать активного солнца и регулярно наносить крем с SPF 50+.'
    },
    {
      q: 'Когда виден первый результат?',
      a: 'Первичный эффект легкого лифтинга и уплотнения кожи заметен уже в день сеанса. Основной накопительный результат формируется в течение 2–4 недель по мере активной выработки нового коллагена и эластина.'
    },
    {
      q: 'Сколько процедур требуется на курс?',
      a: 'В среднем курс включает в себя 2–4 процедуры с интервалом в 3–4 недели. Для поддержания выраженного результата рекомендуется 1 поддерживающий сеанс раз в 6 месяцев.'
    }
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormSubmitted(true);
    logger.info('Пользователь отправил заявку на Ellisys Plus S', {
      name: formName,
      phone: formPhone,
      gift: giftSelected
    });
  };

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
              <span>{compareList.includes(product.id) ? 'В Сравнении' : 'Добавить к сравнению'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. HERO COVER & INTRO */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-slate-950/0 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800/80 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider text-cyan-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>ЮЖНОКОРЕЙСКИЙ ФЛАГМАН КЛИНИК</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              Омоложение и лифтинг с <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-sky-400">Ellisys Plus S</span>
            </h1>
            
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base max-w-xl">
              Современный аппарат для микроигольчатого и неинвазивного RF-лифтинга, сочетающий в себе эффективность, безопасность и ультракороткий восстановительный период. Устраняет возрастные изменения, улучшает текстуру кожи и запускает естественные процессы синтеза коллагена и эластина.
            </p>

            {/* Core Trust Pill badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">100% РУ РФ</div>
                  <div className="text-[10px] text-slate-500">Законная работа</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">3 ЧАСА</div>
                  <div className="text-[10px] text-slate-500">Реабилитация</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center col-span-2 sm:col-span-1">
                <TrendingUp className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">Smart Vacuum</div>
                  <div className="text-[10px] text-slate-500">Защитный вакуум</div>
                </div>
              </div>
            </div>

            {/* Price block & buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <div className="space-y-1">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">ДИЛЕРСКАЯ СТОИМОСТЬ</div>
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
                  Лизинг 0%
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Core Device Photo / Render Grid */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl space-y-6 w-full max-w-sm">
              <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                В наличии на складе
              </div>
              
              {/* Device Image Box */}
              <div className="aspect-square bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&h=800&q=80" 
                  alt="Аппарат Ellisys Plus S c SMART VACUUM" 
                  className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Minimal Specs list under the photo */}
              <div className="space-y-2 text-xs border-t border-slate-800/80 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Производитель:</span>
                  <span className="text-slate-300 font-bold">EunSung Global (Корея)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Глубина игл:</span>
                  <span className="text-cyan-400 font-bold font-mono">0.5 – 3.5 мм</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Иглы в коробке:</span>
                  <span className="text-slate-300 font-bold">Изолированные и неизолированные</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SCIENTIFIC INTRODUCTION: WHAT IS RF LIFTING? */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Что такое RF-лифтинг?</h2>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              RF (радиочастотный) лифтинг — это безоперационная методика, направленная на подтяжку и омоложение кожи за счёт прогрева глубоких слоёв дермы. В ответ на прогрев активизируется выработка коллагена и эластина — белков, отвечающих за упругость кожи.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              В аппарате <strong>Ellisys Plus S</strong> радиочастотная энергия сочетается с микроиглами и вакуумом, что полностью трансформирует процедуру: воздействие становится точечным, глубина проникновения контролируется до десятых долей миллиметра, а технология <strong>Smart Vacuum</strong> минимизирует трение и дискомфорт.
            </p>

            <div className="bg-slate-900/60 border border-slate-850 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Интегрированная LED-терапия</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Во время импульса аппарат подает терапевтический красный свет, запускающий дополнительную регенерацию и значительно сокращающий гиперемию после сеанса до рекордных 2–3 часов.
                </p>
              </div>
            </div>
          </div>

          {/* Core Indications Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Показания к процедуре Ellisys Plus S</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Потеря упругости и чёткости овала лица',
                'Морщины в области глаз, лба, щёк и шеи',
                'Постакне, атрофические рубцы, шрамы',
                'Расширенные поры и неровный рельеф',
                'Гравитационный птоз (опущение тканей)',
                'Растяжки на теле (стрии)',
                'Начальные признаки алопеции',
                'Снижение тонуса интимной зоны'
              ].map((ind, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE POWER OF NEEDLES: TYPING EXPLAINER */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Какие бывают иглы в Ellisys Plus S и почему это важно
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Аппарат использует два принципиально разных типа микроигл — изолированные и неизолированные. От выбора зависит глубина, способ распределения тепла и характер воздействия на клетки дермы.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-2xl flex max-w-sm w-full">
              <button 
                onClick={() => setActiveNeedleTab('isolated')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition cursor-pointer ${activeNeedleTab === 'isolated' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Изолированные иглы
              </button>
              <button 
                onClick={() => setActiveNeedleTab('non_isolated')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition cursor-pointer ${activeNeedleTab === 'non_isolated' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Неизолированные иглы
              </button>
            </div>
          </div>

          {/* Interactive needle details split */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {activeNeedleTab === 'isolated' ? (
              <>
                <div className="space-y-6">
                  <div className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
                    ИЗОЛИРОВАННЫЕ КАРТРИДЖИ (25 ШТУК)
                  </div>
                  <h3 className="text-2xl font-black text-white">Точечный термолиз на заданной глубине</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Ствол иглы полностью изолирован силиконовым покрытием, в то время как радиочастотный импульс генерируется исключительно на кончике иглы. Это позволяет врачу производить глубокий нагрев строго в дерме или субдермальных слоях, вообще не повреждая эпидермис.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Идеально для уплотнения кожи, создания векторов натяжения и подтяжки овала лица</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Работа с подкожно-жировым слоем (уменьшение малярных мешков, второго подбородка)</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Безопасная работа с деликатной атоничной кожей век, шеи, декольте и интимной зоны</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex justify-center flex-col items-center gap-4">
                  <div className="text-slate-400 font-bold text-center text-xs">График распределения энергии на изолированных иглах</div>
                  <div className="w-full h-48 bg-slate-950 rounded-xl relative overflow-hidden border border-slate-850 flex items-center justify-center">
                    <div className="absolute top-0 h-8 w-full bg-slate-800/30 border-b border-dashed border-slate-700 flex items-center justify-center text-[10px] text-slate-500">
                      Кожный эпидермис (Без нагрева)
                    </div>
                    <div className="h-2 flex items-center gap-4 relative z-10">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-1.5 h-20 bg-slate-700 rounded-full relative">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full blur-[4px] animate-pulse" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-2 text-[10px] text-rose-400 font-mono">Выделение энергии строго на кончике</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-6">
                  <div className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
                    НЕИЗОЛИРОВАННЫЕ КАРТРИДЖИ (49 ШТУК)
                  </div>
                  <h3 className="text-2xl font-black text-white">Объемный прогрев всей толщи кожи</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Радиочастотный импульс подается по всей длине металлической иглы. Происходит комплексное, объемное воздействие на эпидермис и дерму одновременно, что провоцирует мощную регенерацию и обновление кожи по всей её толщине.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Отличные отзывы на лечение рубцов различного происхождения, растяжек (стрий) и сильного постакне</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Сужение расширенных пор, коррекция неровного рельефа, профилактика ранних морщин</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Используется для быстрой тотальной шлифовки лица за счет 49 точечных контактов</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex justify-center flex-col items-center gap-4">
                  <div className="text-slate-400 font-bold text-center text-xs">График распределения энергии на неизолированных иглах</div>
                  <div className="w-full h-48 bg-slate-950 rounded-xl relative overflow-hidden border border-slate-850 flex items-center justify-center">
                    <div className="absolute top-0 h-8 w-full bg-slate-800/30 border-b border-dashed border-slate-700 flex items-center justify-center text-[10px] text-slate-500">
                      Кожный эпидермис (Глубокий прогрев)
                    </div>
                    <div className="h-2 flex items-center gap-4 relative z-10">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-1.5 h-20 bg-rose-500/20 rounded-full relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-rose-500 via-rose-400/80 to-rose-300 rounded-full blur-[1px] animate-pulse" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-2 text-[10px] text-rose-400 font-mono">Прогрев всех слоев кожи одновременно</div>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* 5. CLINICAL CASE STUDY: YOUNG HANDS PROTOCOL & PHOTOS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Клинические протоколы: Омоложение кожи рук «Young Hands»
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Кожа рук выдает возраст раньше, чем лицо. Мы разработали ультимативный комбинированный протокол восстановления кожи кистей за 5 технологичных шагов на базе Ellisys Plus S.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Timeline of 5 Steps */}
          <div className="lg:col-span-5 space-y-4">
            {[
              { num: '01', title: 'Биоревитализация (Старт)', desc: 'Препарат BioHyalux Rejuven 25 (по 2 мл). Канюльное введение по тыльной поверхности кисти для глубинного увлажнения.' },
              { num: '02', title: 'Микроигольчатый RF Ellisys Plus S', desc: 'Через 2 недели. Режим Smart Vacuum, 25 изолированных игл, глубина 0.7-0.8 мм, запуск неоколлагенеза.' },
              { num: '03', title: 'Повторная биоревитализация', desc: 'Спустя 2 недели. Закрепление депо гиалуроновой кислоты на восстановленных участках дермы.' },
              { num: '04', title: 'Повторный RF-лифтинг', desc: 'Финальный удар по дряблости, глубокая выработка каркасного коллагена.' },
              { num: '05', title: 'Финальное увлажнение', desc: 'Стабилизация упругости кожи, бархатный рельеф, устранение сухости рук на 8-10 месяцев.' }
            ].map((step, sidx) => (
              <div key={sidx} className="bg-slate-905 border border-slate-800/60 rounded-2xl p-4 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm border border-cyan-500/20 flex-shrink-0">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Results Photos / Interactive before-after slider */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">РЕЗУЛЬТАТЫ КЛИНИЧЕСКИХ ИСПЫТАНИЙ</span>
              <div className="flex gap-2">
                {['face', 'hands', 'scars'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveCase(item as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${activeCase === item ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    {item === 'face' ? 'Овал лица' : item === 'hands' ? 'Кисти рук' : 'Рубцы'}
                  </button>
                ))}
              </div>
            </div>

            {/* Before / After visual block */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-2 relative overflow-hidden aspect-square flex items-center justify-center">
                  <div className="absolute top-4 left-4 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-slate-400">ДО ПРОЦЕДУРЫ</div>
                  <img 
                    src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Кожа до лифтинга" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <p className="text-[10px] text-slate-500 text-center">Выраженная дряблость кожи, гравитационный птоз, морщины</p>
              </div>

              <div className="space-y-2">
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-2 relative overflow-hidden aspect-square flex items-center justify-center">
                  <div className="absolute top-4 left-4 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400">ПОСЛЕ КУРСА</div>
                  <img 
                    src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Кожа после курса Ellisys Plus S" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <p className="text-[10px] text-slate-500 text-center">Плотный кожный лоскут, подтяжка овала лица, сужение пор</p>
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl text-xs text-slate-400 leading-relaxed">
              <strong>Мнение врача-дерматолога:</strong> Встроенный вакуумный контроль гарантирует, что даже на сверхчувствительной, тонкой и дряблой коже кистей рук глубина проникновения иглы составляет ровно 0.7 мм — без перегрева и риска атипичной пигментации.
            </div>
          </div>
        </div>
      </section>

      {/* 6. BUSINESS ROI CALCULATOR */}
      <section className="py-20 bg-slate-900 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
              БИЗНЕС-ОКУПАЕМОСТЬ ДЛЯ КЛИНИК
            </div>
            <h2 className="text-3xl font-black text-white leading-tight tracking-tight">
              Интерактивный расчет рентабельности кабинета
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Микроигольчатый RF-лифтинг — одна из самых дорогостоящих и маржинальных процедур в эстетической медицине. Рассчитайте прибыль в режиме онлайн.
            </p>

            {/* Slider 1: Patients */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Пациентов в день:</span>
                <span className="text-cyan-400 font-bold font-mono">{patientsPerDay} человек</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={patientsPerDay} 
                onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
            </div>

            {/* Slider 2: Price */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Средняя стоимость сеанса:</span>
                <span className="text-emerald-400 font-bold font-mono">{(treatmentPrice).toLocaleString('ru-RU')} ₽</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="30000" 
                step="500" 
                value={treatmentPrice} 
                onChange={(e) => setTreatmentPrice(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
            </div>
          </div>

          {/* Right Column Core Calculator Output Output Box */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-black text-white tracking-tight border-b border-slate-900 pb-3">ФИНАНСОВЫЕ РАСЧЕТЫ</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl space-y-1">
                <div className="text-[10px] text-slate-500 font-bold uppercase">ВЫРУЧКА ЗА МЕСЯЦ</div>
                <div className="text-2xl font-black text-white font-mono">{monthlyRevenue.toLocaleString('ru-RU')} ₽</div>
                <p className="text-[9px] text-slate-500">При загрузке 24 рабочих дня в месяц</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl space-y-1">
                <div className="text-[10px] text-slate-500 font-bold uppercase">СРОК ПОЛНОЙ ОКУПАЕМОСТИ</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {paybackPeriodMonths === 99 ? 'Расчет...' : `${paybackPeriodMonths} ${paybackPeriodMonths === 1 ? 'месяц' : paybackPeriodMonths < 5 ? 'месяца' : 'месяцев'}`}
                </div>
                <p className="text-[9px] text-slate-500">При чистой маржинальности более 75%</p>
              </div>
            </div>

            <div className="bg-cyan-950/30 border border-cyan-800/20 p-4 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                Расходные картриджи стоят недорого. Ваша чистая маржа (операционная прибыль за вычетом одноразовых игл, работы персонала и амортизации) в этой процедуре стабильно превышает <strong>80%</strong>. Это лучший драйвер роста выручки для клиники в 2026 году.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => triggerQuote(product, 'turnkey')}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider text-center cursor-pointer transition"
              >
                Получить бизнес-план
              </button>
              <button 
                onClick={() => triggerQuote(product, 'leasing')}
                className="flex-1 bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition"
              >
                Программа лизинга
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. DETAILED PACKAGES AND SPECIFICATION OPTIONS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Выбор комплектации и насадок</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Мы предлагаем 3 готовых варианта стартового набора комплектующих картриджей для быстрого и уверенного запуска процедуры с первого дня.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: 'basic',
              title: 'Базовый комплект',
              price: 'AM-B84',
              desc: 'Оптимально для небольших кабинетов со скромной начальной проходимостью.',
              bullets: [
                'Аппарат Ellisys Plus S',
                '5 штук 25-pin изолированных картриджей',
                '5 штук 49-pin неизолированных картриджей',
                'Протоколы ведения пациентов от тренера академии'
              ]
            },
            {
              id: 'standard',
              title: 'Стандарт (Хит)',
              price: 'AM-S84',
              desc: 'Бестселлер. Полный набор картриджей для работы 2–3 специалистов.',
              bullets: [
                'Аппарат Ellisys Plus S',
                '15 штук 25-pin изолированных картриджей',
                '15 штук 49-pin неизолированных картриджей',
                'Обучение 2-х врачей с постановкой руки',
                'Комплект рекламных материалов для зоны ресепшн'
              ]
            },
            {
              id: 'premium',
              title: 'Премиум запуск',
              price: 'AM-P84',
              desc: 'Для крупных сетевых клиник с высокой плотностью записей.',
              bullets: [
                'Аппарат Ellisys Plus S',
                '40 штук 25-pin изолированных картриджей',
                '40 штук 49-pin неизолированных картриджей',
                'Индивидуальный выездной тренинг главного методиста',
                'Годовой запас расходников, гарантия 36 месяцев'
              ]
            }
          ].map((pack) => (
            <div 
              key={pack.id}
              onClick={() => setSelectedPack(pack.id as any)}
              className={`bg-slate-900 border rounded-3xl p-6 space-y-5 transition-all duration-350 cursor-pointer relative flex flex-col justify-between ${selectedPack === pack.id ? 'border-cyan-500 ring-1 ring-cyan-500 shadow-xl shadow-cyan-500/5' : 'border-slate-800 hover:border-slate-705'}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-mono tracking-wider font-black px-2.5 py-1 rounded ${selectedPack === pack.id ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400'}`}>
                    {pack.price}
                  </span>
                  {pack.id === 'standard' && (
                    <span className="text-[9px] font-black tracking-wider uppercase bg-emerald-500 text-white rounded px-2 py-0.5">ПОПУЛЯРНОЕ</span>
                  )}
                </div>
                
                <h4 className="text-lg font-black text-white">{pack.title}</h4>
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
                className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors mt-6 ${selectedPack === pack.id ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-slate-950 border border-slate-800 text-white hover:bg-slate-900'}`}
              >
                Выбрать эту комплектацию
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. OBJECTIONS REFED HANDLING BENTO BLOCK */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Жесткие ответы на главные страхи клиник</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              СТАНДАРТ БЕЗОПАСНОСТИ И ПОДДЕРЖКИ АСТМЕД ДЛЯ ELLISYS PLUS S
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Nav Tabs */}
            <div className="lg:col-span-5 space-y-2">
              {[
                { id: 'roi', icon: '💎', label: 'ОКУПАЕМОСТЬ', title: '«А вдруг у нас он будет стоять без дела?»' },
                { id: 'safety', icon: '🛡️', label: 'БЕЗОПАСНОСТЬ', title: '«Переживаем за ожоги, шрамы и реабилитацию»' },
                { id: 'rehad', icon: '🚀', label: 'УДОБСТВО', title: '«Врачи боятся работать с микроигольчатыми системами»' },
                { id: 'options', icon: '📦', label: 'РАСХОДНИКИ', title: '«Боимся, что картриджи будут золотыми по цене»' },
                { id: 'demo', icon: '🎥', label: 'СТАРТ', title: '«Хотим увидеть аппарат в клинике перед покупкой»' }
              ].map((tab) => (
                <div key={tab.id} className="space-y-2 w-full">
                  <button
                    onClick={() => {
                      setObjectionTab(tab.id as any);
                      logger.info(`Клик по страху АстМед: ${tab.label}`);
                    }}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border transition duration-200 cursor-pointer flex items-center justify-between group ${objectionTab === tab.id ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-lg' : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{tab.icon}</span>
                      <div className="space-y-0.5text-left">
                        <span className="text-[10px] uppercase tracking-wider font-bold block text-cyan-400">{tab.label}</span>
                        <span className="text-xs font-bold leading-normal block">{tab.title}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${objectionTab === tab.id ? 'rotate-90 text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {objectionTab === tab.id && (
                    <div className="block lg:hidden bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 text-left text-slate-300 animate-fade-in">
                      {tab.id === 'roi' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Окупаемость
                          </span>
                          <h4 className="text-sm font-bold text-white">Высокий и регулярный спрос с первого же месяца</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Микроигольчатый RF-лифтинг не выходит из моды и держится в ТОПе запросов пациентов благодаря мгновенному эффекту. У аппарата Ellisys Plus S сверхкороткий реабилитационный период, что идеально для бизнес-леди и мужчин. АстМед передает клинике готовый пакет фото/видео до-после, шаблоны постов для социальных сетей и рекламные баннеры.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'safety' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Безопасность
                          </span>
                          <h4 className="text-sm font-bold text-white">Запатентованный вакуумный контроль</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Уникальный вакуумный захват кожи аккуратно втягивает зону воздействия, плотно прижимая ее к матричной манипуле. Иглы проникают на строго заданную глубину без зазора и скольжения, на 100% исключая повреждения эпидермиса и риск ожогов.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'rehad' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Удобство работы
                          </span>
                          <h4 className="text-sm font-bold text-white">Интуитивный протокол управления</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Система управления оборудована готовыми клиническими протоколами для любых типов кожи и зон терапии. Наш клинический эксперт бесплатно обучит ваш персонал с постановкой руки врачам на реальных моделях.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'options' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Расходные компоненты
                          </span>
                          <h4 className="text-sm font-bold text-white">Разумная себестоимость процедурного сеанса</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Мы поставляем оригинальные сертифицированные насадки (на 25 и 49 изолированных/неизолированных позолоченных игл) без грабительской посреднической наценки. Ваши траты минимальны, а маржинальность сеанса достигает 85%.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'demo' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Старт и показ
                          </span>
                          <h4 className="text-sm font-bold text-white">Бесплатный тест-драйв в Москве и Санкт-Петербурге</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Мы уверены в качестве Ellisys Plus S. Посетите наш технологичный демонстрационный шоурум: протестируйте эргономику манипулы и лично оцените качество сборки прибора перед заключением договора.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right detailed answer board */}
            <div id="objection-ellisys-container" className="hidden lg:flex lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden min-h-[440px] flex-col justify-between scroll-mt-24">
              <div className="space-y-6 text-slate-300">
                {objectionTab === 'roi' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">СТАНДАРТ БЕЗОПАСНОСТИ: РОСТ С ТЕХНОЛОГИЕЙ</span>
                      <h3 className="text-xl font-black text-white">Высокий и регулярный спрос с первого же месяца</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Микроигольчатый RF-лифтинг не выходит из моды и держится в ТОПе запросов пациентов благодаря мгновенному эффекту. У аппарата Ellisys Plus S сверхкороткий реабилитационный период, что идеально для бизнес-леди и мужчин.
                    </p>
                    <div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-slate-850">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Маркетинговая интеграция АстМед:</div>
                      <p className="text-[11px] text-slate-400">Мы передаем клинике готовый пакет фото/видео до-после, шаблоны постов для социальных сетей и рекламные баннеры. Наша цель — чтобы ваш аппарат был полностью окуплен в кратчайшие сроки.</p>
                    </div>
                  </div>
                )}

                {objectionTab === 'safety' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-950 px-2.5 py-1 rounded">ЗАЩИТА ПАЦИЕНТА И ВРАЧА</span>
                      <h3 className="text-xl font-black text-white">Запатентованный вакуумный контроль</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Большинство травм кожи на старых аппаратах происходили из-за того, что игла проваливалась глубже, либо входила под косым углом. Система Smart Vacuum присасывает кожу, и только после надежного, ровного контакта микроигла проникает ровно на установленную врачом глубину.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-850">
                        <span className="text-xs font-bold block text-white">Красный спектр LED</span>
                        <span className="text-[10px] text-slate-500">Ускоренная регенерация клеток кожи без струпа</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-850">
                        <span className="text-xs font-bold block text-white">Сверхтонкие иглы</span>
                        <span className="text-[10px] text-slate-500">Минимум дискомфорта на процедуре</span>
                      </div>
                    </div>
                  </div>
                )}

                {objectionTab === 'rehad' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">КЛИНИЧЕСКАЯ АКАДЕМИЯ</span>
                      <h3 className="text-xl font-black text-white">Мягкая постановка руки тренерами</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Мы детально обучаем ваш врачебный персонал. Врачи получат четкие таблицы со всеми протоколами, глубинами и уровнем мощности для различных зон лица, шеи, тела, интимной области и лечения рубцовой ткани.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-400">
                      <li className="flex gap-2"><span className="text-emerald-500">✓</span>Выдача дипломов государственного образца</li>
                      <li className="flex gap-2"><span className="text-emerald-500">✓</span>Закрытый телеграм-чат с ведущими врачами АстМед для консультаций</li>
                    </ul>
                  </div>
                )}

                {objectionTab === 'options' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">ДОСТУПНЫЕ КОМПЛЕКТУЮЩИЕ</span>
                      <h3 className="text-xl font-black text-white">Стабильные и доступные цены на картриджи</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Компания АстМед является прямым импортером EunSung Global в РФ. Это означает, что картриджи изолированных и неизолированных микроигл всегда есть на московском складе в достаточном объеме по доступной цене, без искусственных скачков.
                    </p>
                  </div>
                )}

                {objectionTab === 'demo' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-950 px-2.5 py-1 rounded">ВЫЕЗДНАЯ ПРОГРАММА DEMO DAY</span>
                      <h3 className="text-xl font-black text-white">Тест-драйв аппарата на базах АстМед</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Вы можете приехать и опробовать Ellisys Plus S в действии. Подержите в руках аппликатор, протестируйте Smart Vacuum насадку на коже, пройдите тестовую процедуру и лично оцените безвибрационный точный вход игл.
                    </p>
                    <button 
                      onClick={() => triggerQuote(product, 'consultation')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase"
                    >
                      Забронировать демо-визит
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-900/60 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Гарантия АстМед: 24 месяца</span>
                <span className="text-emerald-400">● Сервисный центр в Москве/СПб</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-white">Часто задаваемые вопросы (FAQ)</h2>
        
        <div className="space-y-3">
          {faqs.map((faq, fidx) => (
            <div key={fidx} className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setExpandedFaq(expandedFaq === fidx ? null : fidx)}
                className="w-full text-left px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-slate-850 transition"
              >
                <span className="text-xs sm:text-sm font-bold text-white">{faq.q}</span>
                {expandedFaq === fidx ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              
              {expandedFaq === fidx && (
                <div className="px-6 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-850">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CONVERSION LEAD CAPTURE BLOCK */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-cyan-700/5 rounded-3xl blur-3xl pointer-events-none" />
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Оставьте заявку на подбор индивидуальной комплектации Ellisys Plus S
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Вместе с коммерческим предложением и прайсом на комплектующие мы подарим вам закрытое методическое руководство <strong>«Руководство по прибыльному внедрению систем микроигольчатого фракционного RF-лифтинга»</strong> (книга в формате PDF, 48 страниц).
            </p>

            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl">
                📖
              </div>
              <div className="text-xs">
                <div className="text-white font-bold">PDF книга в подарок</div>
                <div className="text-slate-500">Автоматическая отправка на WhatsApp/Telegram при отправке телефона</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {formSubmitted ? (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-white">Спасибо за ваше обращение!</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Наш главный методист по эстетической косметологии свяжется с вами в течение 10 минут, ответит на любые вопросы и отправит PDF книгу с прайсом в мессенджер на указанный номер: <strong>{formPhone}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="bg-slate-950 border border-slate-850 p-6 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Как к вам обращаться?</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Александра Дмитриевна"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Ваш номер телефона (для координатора)</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+7 (999) 123-45-67"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Выберите ваш гарантированный подарок:</label>
                  <select 
                    value={giftSelected}
                    onChange={(e) => setGiftSelected(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg p-3 text-xs text-slate-300 focus:outline-none transition-colors"
                  >
                    <option value="pocket_guide">Книга «Руководство по фототерапии и RF в клинике»</option>
                    <option value="calc_sheet">Таблица-калькулятор Сроков Окупаемости RF-аппарата</option>
                    <option value="check_coupon">Сертификат на выездной Demo Day в вашу клинику</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Получить КП и подарок (PDF)</span>
                </button>

                <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных по правилам РФ ФЗ-152.
                </p>
              </form>
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

      <AstmedTeamBlock />


      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="ellisys-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
