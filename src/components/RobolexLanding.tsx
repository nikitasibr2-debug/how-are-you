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
  MessageSquare
} from 'lucide-react';
import { Product, Article } from '../types';
import { logger } from '../lib/logger';

interface RobolexLandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const RobolexLanding: React.FC<RobolexLandingProps> = ({
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
  const [activeTech, setActiveTech] = useState<'rf' | 'laser' | 'vacuum' | 'cavitation' | 'ems'>('rf');
  const [activeProtocol, setActiveProtocol] = useState<'flex' | 'slim' | 'tync' | 'butup' | 'face'>('flex');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedPack, setSelectedPack] = useState<'standard' | 'business' | 'partner'>('standard');
  const [activeObjection, setActiveObjection] = useState<'usage' | 'safety' | 'doctors' | 'consumables' | 'preview'>('usage');

  // Lead capture states
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Room audit simulator states
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);
  const [auditHeight, setAuditHeight] = useState<string>('2.7');
  const [auditVentilation, setAuditVentilation] = useState<boolean>(true);
  const [auditWater, setAuditWater] = useState<boolean>(true);

  // Business ROI Calculator States
  const [proceduresPerWeek, setProceduresPerWeek] = useState<number>(5);
  const [procedurePrice, setProcedurePrice] = useState<number>(8000);

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Calculating monthly and annual net profits
  const calculations = useMemo(() => {
    const weeklyProcedures = proceduresPerWeek;
    const monthlyProcedures = weeklyProcedures * 4.3; // 4.3 weeks in a month
    const gelAndConsumablesCost = 350; // RUB per procedure for sanitization/gel
    const totalWeeklyRevenue = weeklyProcedures * procedurePrice;
    const totalMonthlyRevenue = totalWeeklyRevenue * 4.3;

    // Estimate clean net profit after deducting gel, power, staff commission (e.g. 25% to staff, 15% taxes/overhead)
    // Margin is ~85% excluding staff, let's calculate standard clinical profit at 75% margin
    const netProfitMargin = 0.75;
    const monthlyNetProfit = Math.round(
      (totalMonthlyRevenue - (monthlyProcedures * gelAndConsumablesCost)) * netProfitMargin
    );
    
    const appCost = product.price || 3150000;
    const paybackMonths = monthlyNetProfit > 0 ? Math.max(1, Math.ceil(appCost / monthlyNetProfit)) : 99;
    
    return {
      monthlyRevenue: Math.round(totalMonthlyRevenue),
      monthlyNetProfit,
      paybackMonths
    };
  }, [proceduresPerWeek, procedurePrice, product.price]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormSubmitted(true);
    logger.info('Пользователь отправил заявку на Robolex', {
      name: formName,
      phone: formPhone
    });
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuditSubmitted(true);
    logger.info('Выполнен расчет требований СанПиН для кабинета Robolex', {
      height: auditHeight,
      ventilation: auditVentilation,
      water: auditWater
    });
  };

  const technologies = {
    rf: {
      title: 'Мультиполярный RF-лифтинг',
      desc: 'Равномерно прогревает коллагеновые слои дермы до терапевтических 42–45°C. Стимулирует немедленное сжатие растянутых коллагеновых спиралей и инициирует длительный синтез неоколлагенеза первого типа, повышая эластичность и упругость дряблой кожи.',
      specs: 'Частота: 1 МГц, глубина проникновения: до 1.5 - 2 см, безопасный биполярный и квадрополярный охват.',
      result: 'Мгновенное уплотнение кожного лоскута, разглаживание морщин, устранение дряблости живота и брылей.'
    },
    laser: {
      title: 'Низкоинтенсивный биостимулирующий лазер',
      desc: 'Диодный лазер с длиной волны 655 нм деликатно воздействует на клеточные мембраны адипоцитов, делая их проницаемыми. Это запускает выход накопленных триглицеридов в межклеточное пространство, подготавливая жировые отложения к выведению.',
      specs: 'Длина волны: 655 нм, терапевтическая фотостимуляция клеток, активация митохондрий.',
      result: 'Ускорение распада триглицеридов, мягкий липолиз без воспаления и разрушения кровеносных сосудов.'
    },
    vacuum: {
      title: 'Импульсный вибровакуумный массаж',
      desc: 'Обеспечивает мягкий регулируемый захват кожной складки в комбинации с механическим вибромассажем. Оказывает мощный декомпрессионный эффект на зажатые капилляры и лимфатические протоки, моментально запуская естественный лимфодренаж.',
      specs: 'Разрежение вакуума: до 680 мм рт. ст., 4 регулируемых импульсных паттерна дренажа.',
      result: 'Ликвидация хронических отеков, уменьшение застоя венозной крови, быстрое разглаживание целлюлита.'
    },
    cavitation: {
      title: 'Низкочастотный кавитационный ультразвук',
      desc: 'Генерирует сфокусированную ультразвуковую волну частотой 38 КГц. Провоцирует образование микропузырьков газа внутри жировых клеток, которые лопаются, повреждая мембраны плотных адипоцитов и высвобождая эмульгированный жир.',
      specs: 'Частота: 38 КГц (идеальная для безопасного разрушения жировой ткани, не задевая мышцы и кости).',
      result: 'Стабильное локальное уменьшение объема складок на животе, бедрах и боках со стойким эффектом.'
    },
    ems: {
      title: 'Электромиостимуляция (EMS)',
      desc: 'Подает дозированные переменные микротоки для стимуляции скелетных мышц и сосудистых стенок. Моделирует естественную мышечную нагрузку, заставляя волокна циклически сокращаться, улучшая общий лимфодренаж и вывод токсинов.',
      specs: 'Частотный спектр: до 250 Гц, плавная регулировка амплитуды сокращения.',
      result: 'Укрепление ослабленного пресса, тонизация ягодиц, снятие тяжести и боли в ногах за счет активации сосудов.'
    }
  };

  const protocols = {
    flex: {
      title: 'BODY FLEX — Лифтинг и Омоложение кожи',
      desc: 'Премиум-протокол для коррекции сниженного тургора, уплотнения кожного растянутого лоскута после родов, резкого снижения веса или возрастного увядания.',
      zones: 'Руки (внутренняя плечевая зона), бедра полностью, ягодицы, живот.',
      procedures: 'Прогрев мультиполярным RF + глубокий вибровакуумный массаж.',
      price: 'Рекомендуемая цена процедуры: от 6 000 ₽',
      benefit: 'Повышение упругости кожи на 35% за 3 сеанса.'
    },
    slim: {
      title: 'BODY SLIM — Моделирование и Жиросжигание',
      desc: 'Клинически выверенный протокол направленного ультразвукового липолиза для борьбы со стойкими жировыми ловушками, устойчивыми к диетам.',
      zones: 'Живот, бока (фланки), зона галифе, внутренние поверхности бедер.',
      procedures: 'Комбинация кавитационного ультразвука US Lipo, лазерной стимуляции и пульсирующего вакуума.',
      price: 'Рекомендуемая цена процедуры: от 8 000 ₽',
      benefit: 'Уменьшение окружности талии и бедер от 2-4 см за курс.'
    },
    tync: {
      title: 'BODY TYNC — Синергетический Мега-Дренаж',
      desc: 'Сложный синхронный протокол для одновременного воздействия несколькими физическими факторами на разные зоны для борьбы со сложным целлюлитом.',
      zones: 'Комбинация: проблемный живот + руки + внутренняя сторона бедер.',
      procedures: 'Синхронизированная вакуумная декомпрессия, RF контуринг и бандажные S-PAD лазерные насадки.',
      price: 'Рекомендуемая цена процедуры: от 10 000 ₽',
      benefit: 'Глубинное разглаживание плотного фиброзного и отечного целлюлита I-III степени.'
    },
    butup: {
      title: 'BUT UP — Эффект Эстетического Шорт-Лифтинга',
      desc: 'Специальная зональная схема для формирования красивых, упругих очертаний ягодиц и подтягивания задней поверхности ног.',
      zones: 'Ягодицы, область задней поверхности бедра, зона подсегментной складки.',
      procedures: 'Глубокий RF-прогрев, вибро-баро терапия и миостимуляция EMS.',
      price: 'Рекомендуемая цена процедуры: от 8 000 ₽',
      benefit: 'Создание красивых очертаний силуэта и выталкивание "апельсиновой корки".'
    },
    face: {
      title: 'ROBOLEX FACE — Экспресс Силуэт Лица',
      desc: 'Деликатная терапия дефектов овала лица. Применяется для быстрого дренажного лифтинга кожи без гематом и без боли.',
      zones: 'Овал лица, область щек, второй подбородок, носогубные зоны, шея.',
      procedures: 'Высокочастотный RF-лифтинг + бережный баро-массаж лица.',
      price: 'Рекомендуемая цена процедуры: от 3 000 ₽ до 5 000 ₽',
      benefit: 'Устранение застоя лишней жидкости, подчеркивание скул и ровного "угла молодости".'
    }
  };

  const faqs = [
    {
      q: 'Чем Robolex отличается от обычного вакуумного массажа (типа LPG)?',
      a: 'LPG — это исключительно чисто механический роликовый массаж. В отличие от него, Robolex в рамках одной манипулы одновременно подает 5 сочетанных видов энергии: биполярный RF греет и подтягивает кожу, диодный лазер расщепляет жир, ультразвук разбивает целлюлитные бугорки, пульсирующий вакуум проводит лимфодренаж, а EMS приводит мышцы в идеальный тонус. Эффект от Robolex наступает в 3 раза быстрее.'
    },
    {
      q: 'Безопасна ли процедура кавитации на Robolex?',
      a: 'Да. В аппарате используется оптимальная физиологичная частота микро-кавитации 38 КГц. Она задевает исключительно растянутые адипоциты жировой ткани, разрушая их за счет эффекта микропузырьков, но абсолютно не затрагивает более плотные структуры — стенки сосудов, мышцы, нервные окончания и суставы.'
    },
    {
      q: 'Какая себестоимость одной процедуры для клиники?',
      a: 'Очень низкая. Для сеанса не требуются дорогостоящие одноразовые картриджи по импульсам. Основные затраты — это медиагель-проводник, бумажные простыни, дезинфекция и оплата труда врача. Себестоимость сеанса составляет всего около 350 рублей, что обеспечивает маржинальность услуги на уровне свыше 85%!'
    },
    {
      q: 'Какие есть противопоказания к процедуре?',
      a: 'Базовые для всех физиотерапевтических методик: беременность и лактация, онкологические заболевания, наличие кардиостимулятора или металлических имплантов в непосредственной зоне проработки, острые вирусные заболевания, декомпенсированный сахарный диабет.'
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
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-slate-950/0 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800/80 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider text-rose-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>СОЧЕТАННОЕ МОДЕЛИРОВАНИЕ ТЕЛА И ЛИЦА (5-в-1)</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              Robolex — умная <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">beauty-платформа</span> скульптурирования фигуры
            </h1>
            
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base max-w-xl">
              Запатентованная терапевтическая мульти-платформа, которая сочетает 5 мощных взаимодополняющих технологий: биполярный RF прогрев, липолитический лазер, вибровакуумный дренаж, низкочастотную кавитацию и тонизацию EMS. Стойкий премиум-результат и высокая маржинальность сеанса.
            </p>

            {/* Core Trust Pill badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">РУ Минздрава РФ</div>
                  <div className="text-[10px] text-slate-500">100% Легально</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center">
                <Activity className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">5 ТЕХНОЛОГИЙ</div>
                  <div className="text-[10px] text-slate-500">Сочетанный эффект</div>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex gap-2.5 items-center col-span-2 sm:col-span-1">
                <TrendingUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">БЕЗ РАСХОДНИКОВ</div>
                  <div className="text-[10px] text-slate-500">Маржа с процедуры свыше 85%</div>
                </div>
              </div>
            </div>

            {/* Price block & buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <div className="space-y-1">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">СТОИМОСТЬ ПОД КЛЮЧ</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-rose-400">{(product.price).toLocaleString('ru-RU')} ₽</span>
                  {product.oldPrice && (
                    <span className="text-sm font-bold text-slate-600 line-through">{(product.oldPrice).toLocaleString('ru-RU')} ₽</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-initial">
                <button 
                  onClick={() => triggerQuote(product, 'kp')}
                  className="bg-rose-500 hover:bg-rose-400 text-white font-black px-6 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-rose-500/20 text-center cursor-pointer active:scale-95"
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
            <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl space-y-6 w-full max-w-sm">
              <div className="absolute top-4 right-4 bg-rose-500/10 text-rose-455 border border-rose-500/20 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Бестселлер АстМед
              </div>
              
              {/* Product render mockup */}
              <div className="aspect-square bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/5 to-transparent pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&h=800&q=80" 
                  alt="Beauty platform Robolex" 
                  className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs parameters short list */}
              <div className="space-y-2 text-xs border-t border-slate-800/80 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Интеграция технологий:</span>
                  <span className="text-rose-400 font-bold font-mono">5-в-1 Мультисистема</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Базовый набор насадок:</span>
                  <span className="text-slate-300 font-bold">4 манипулы для лица и тела</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Вакуумное давление:</span>
                  <span className="text-slate-300 font-bold font-mono">До 680 мм рт. ст.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BUSINESS OBJECTIONS / PAIN POINTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">АНАЛИЗ ЭСТЕТИЧЕСКОГО БИЗНЕСА РФ 2026</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            С какими реальными проблемами сталкиваются клиники?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Конкуренция на рынке аппаратной коррекции тела стремительно растет. Как не ошибиться с выбором оборудования?
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              idx: '01',
              title: 'Грабительская стоимость расходников',
              desc: 'Дорогие картриджи и постоянная покупка одноразовых чипов на игольчатый RF или лазер съедают до 50% чистой маржи с процедуры.',
              solution: 'Решение Robolex: Кавитация, вакуум и EMS не имеют лимитов по импульсам. Износ насадок минимален, расходники копеечные.'
            },
            {
              idx: '02',
              title: 'Кабинеты тела стоят без дела вне сезона',
              desc: 'Обычный вакуумный массажер привлекает пациентов только весной перед пляжами, а зимой кабинет пустует и не окупает аренду.',
              solution: 'Решение Robolex: RF-лифтинг и EMS лица востребованы круглый год. Экспресс-омоложение лица и шеи убирает сезонные просадки.'
            },
            {
              idx: '03',
              title: 'Пациенты боятся боли и реабилитации',
              desc: 'Инвазивные лазеры или болезненные липолитические инъекции пугают пациентов. Многие бросают курсы из-за гематом и синяков.',
              solution: 'Решение Robolex: Мягкий вакуумный захват и терапевтический RF обеспечивают приятный глубокий прогрев без следов и боли.'
            },
            {
              idx: '04',
              title: 'Жесткие проверки Росздравнадзора',
              desc: 'Применение дешевых китайских аппаратов без РУ грозит клинике моментальной конфискацией оборудования и гигантскими штрафами.',
              solution: 'Решение Robolex: 100% сертифицированное в России Регистрационное Удостоверение (РУ) Минздрава в базовой поставке.'
            }
          ].map((pain, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition duration-300">
              <div className="space-y-2">
                <div className="w-9 h-9 bg-rose-500/10 text-rose-455 border border-rose-500/20 rounded-lg flex items-center justify-center font-mono font-bold text-sm">
                  {pain.idx}
                </div>
                <h3 className="text-sm font-bold text-white">{pain.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{pain.desc}</p>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/10">
                {pain.solution}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SCIENTIFIC INTRODUCTION: THE 5 TECHNOLOGIES TABS */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">СИНЕРГЕТИЧЕСКИЙ ЭФФЕКТ 5-В-1</span>
              <h2 className="text-3xl font-black text-white leading-tight">Интеллектуальное научное обоснование платформы Robolex</h2>
              
              <p className="text-sm text-slate-400 leading-relaxed">
                В основе потрясающих клинических результатов Robolex лежит принцип физического содействия. Вместо последовательного проведения нескольких процедур в разные дни, инновационная корейская манипула воздействует комплексно за один визит.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Радиоволновой RF-прогрев плавит локальный жир, который под влиянием низкоинтенсивного лазера переходит в жидкую фазу. Пневматический вакуум мгновенно выталкивает адипоциты наружу в лимфоканалы, а кавитационный ультразвук дополнительно дробит жесткие перегородки целлюлита. Электромиостимуляция задействует мышцы для полной утилизации липидов.
              </p>

              {/* Selector bullet buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4">
                {[
                  { id: 'rf', label: 'RF Лифтинг' },
                  { id: 'laser', label: 'Липо-Лазер' },
                  { id: 'vacuum', label: 'Вибровакуум' },
                  { id: 'cavitation', label: 'Кавитация' },
                  { id: 'ems', label: 'EMS тонус' }
                ].map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setActiveTech(tech.id as any)}
                    className={`px-3 py-2 text-xs border rounded-xl transition cursor-pointer font-bold ${activeTech === tech.id ? 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-md' : 'bg-slate-950/50 border-slate-850 text-slate-400 hover:text-slate-200'}`}
                  >
                    {tech.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Information Box */}
            <div className="bg-slate-950 border border-slate-850 p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-[9px] px-2.5 py-0.5 rounded font-black tracking-widest uppercase">
                АКТИВНЫЙ ФАКТОР
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-500/15 text-rose-400 rounded-2xl border border-rose-500/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">{technologies[activeTech].title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">ГЛУБИННАЯ ФИЗИКА ТЕРАПИИ</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {technologies[activeTech].desc}
                </p>

                <div className="border-t border-slate-900 pt-4 space-y-2.5 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Технические параметры:</span>
                    <span className="text-rose-400 font-bold">{technologies[activeTech].specs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Клинический результат:</span>
                    <span className="text-emerald-400 font-bold">{technologies[activeTech].result}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. USER CLINICAL PROTOCOLS / ZONAL PROGRAMS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Предустановленные терапевтические протоколы Robolex.Top
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            КОРЕЙСКИЕ РЕЖИМЫ КОРРЕКЦИИ ФИГУРЫ И ЛИФТИНГА ПО ЗОНАМ
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left selectors list */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
            {[
              { id: 'flex', price: '6 000 ₽', name: 'BODY FLEX', label: 'Тургор и тонизация мышц' },
              { id: 'slim', price: '8 000 ₽', name: 'BODY SLIM', label: 'Борьба с ловушками жира' },
              { id: 'tync', price: '10 000 ₽', name: 'BODY TYNC', label: 'Синхронная мега-коррекция' },
              { id: 'butup', price: '8 000 ₽', name: 'BUT UP', label: 'Зона «шорты» и ягодицы' },
              { id: 'face', price: '3 000 ₽', name: 'ROBOLEX FACE', label: 'Лифтинг овала лица' }
            ].map((prot) => (
              <button
                key={prot.id}
                onClick={() => setActiveProtocol(prot.id as any)}
                className={`w-full text-left p-4 rounded-xl border transition duration-300 cursor-pointer flex items-center justify-between group ${activeProtocol === prot.id ? 'bg-rose-500/10 border-rose-500/50 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-black tracking-wider px-1.5 py-0.5 rounded ${activeProtocol === prot.id ? 'bg-rose-500 text-white' : 'bg-slate-950 text-slate-500'}`}>
                      {prot.name}
                    </span>
                    <span className="text-xs font-bold">{prot.label}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">{prot.price}</span>
                  <ChevronRight className={`w-4 h-4 transition ${activeProtocol === prot.id ? 'text-rose-455 translate-x-1' : 'text-slate-600'}`} />
                </div>
              </button>
            ))}
          </div>

          {/* Right Detailed Panel */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />
            
            <div className="space-y-4 relative z-10">
              <span className="inline-block px-2.5 py-1 bg-rose-950/80 text-rose-400 border border-rose-500/10 text-[9px] font-mono font-bold uppercase rounded">
                СВЕРИТЬ КЛИНИЧЕСКИЙ ПРОТОКОЛ В КОНСОЛИ
              </span>
              
              <h3 className="text-xl font-black text-white">{protocols[activeProtocol].title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{protocols[activeProtocol].desc}</p>
              
              <div className="grid sm:grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs">
                <div className="space-y-1 bg-slate-950/40 p-3.5 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">КОНКРЕТНЫЕ ЗОНЫ ВОЗДЕЙСТВИЯ</span>
                  <p className="text-slate-300 font-bold">{protocols[activeProtocol].zones}</p>
                </div>
                <div className="space-y-1 bg-slate-950/40 p-3.5 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">ТАКТИКА И МАНИПУЛЫ СЕАНСА</span>
                  <p className="text-slate-300 font-bold">{protocols[activeProtocol].procedures}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/85 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 tracking-wider font-bold block uppercase">МАРЖИНАЛЬНОСТЬ ПРОТОКОЛА</span>
                <span className="text-sm font-mono text-emerald-400 font-bold">{protocols[activeProtocol].price} за сеанс</span>
              </div>
              <button
                onClick={() => triggerQuote(product, 'consultation')}
                className="bg-rose-500 hover:bg-rose-400 text-white font-mono font-bold py-3 px-6 rounded-xl text-xs uppercase"
              >
                Отработать клиническую схему
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BUSINESS ROI CALCULATOR FOR CLINICS */}
      <section className="py-20 bg-slate-900 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">ФИНАНСОВЫЙ КАЛЬКУЛЯТОР KOSOLEX</span>
            <h2 className="text-3xl font-black text-white leading-tight">Интерактивный расчет окупаемости кабинета Robolex</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Robolex не требует дорогостоящих выстрелов или дефицитных расходников. Изменяйте параметры ползунками ниже, чтобы оценить плановую чистую прибыль вашего медицинского центра.
            </p>

            {/* Procedures slider */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Процедур в неделю (загрузка):</span>
                <span className="text-rose-400 font-bold font-mono">{proceduresPerWeek} шт.</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="25" 
                value={proceduresPerWeek} 
                onChange={(e) => setProceduresPerWeek(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>2 (низкая)</span>
                <span>25 (высокая нагрузка)</span>
              </div>
            </div>

            {/* Price slider */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Средняя цена процедуры в прайсе:</span>
                <span className="text-emerald-400 font-bold font-mono">{(procedurePrice).toLocaleString('ru-RU')} ₽</span>
              </div>
              <input 
                type="range" 
                min="3000" 
                max="15000" 
                step="500" 
                value={procedurePrice} 
                onChange={(e) => setProcedurePrice(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>3 000 ₽</span>
                <span>15 000 ₽</span>
              </div>
            </div>
          </div>

          {/* ROI Calculator Outputs */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono border-b border-slate-905 pb-3">Маржинальный ROI Анализ</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-1">
                <div className="text-[9px] text-slate-500 font-bold uppercase">ЧИСТАЯ МЕСЯЧНАЯ ПРИБЫЛЬ</div>
                <div className="text-2xl font-black text-rose-455 font-mono">{calculations.monthlyNetProfit.toLocaleString('ru-RU')} ₽</div>
                <p className="text-[9px] text-slate-500">За вычетом копеечных гелей и амортизации</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-1">
                <div className="text-[9px] text-slate-505 font-bold uppercase">БЫСТРЫЙ СРОК КУРСОВОЙ ОКУПАЕМОСТИ</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ~{calculations.paybackMonths} {calculations.paybackMonths === 1 ? 'месяц' : calculations.paybackMonths < 5 ? 'месяца' : 'месяцев'}
                </div>
                <p className="text-[9px] text-slate-500">При маржинальности сырья свыше 85%!</p>
              </div>
            </div>

            <div className="bg-rose-950/30 border border-rose-800/15 p-4 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-3">
              <Info className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                В отличие от игольчатых или фракционных лазеров, себестоимость одного сеанса у аппарата Robolex составляет всего около <strong>350 рублей</strong>. Износ манипул минимален. Чистая маржа с сеанса составляет колоссальные <strong>80–90%</strong>.
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => triggerQuote(product, 'turnkey')}
                className="flex-1 bg-rose-505 hover:bg-rose-400 bg-rose-500 text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all"
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

      {/* 7. WHY CLINICS CHOOSE ROBOLEX DETAILS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">Важнейшие преимущества аппарата Robolex</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Создан для клиник, ценящих стабильный поток клиентов, комфорт процедур и безукоризненное качество Корейской сборки.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              idx: '●', 
              title: 'Комплексный сочетанный эффект', 
              desc: 'Одна процедура объединяет RF-лифтинг, стимулирующий диодный лазер, вибровакуумный массаж, ультразвуковую кавитацию и миостимуляцию. Это гарантирует глубокую проработку слоев кожи, фасций и лимфатических сосудов.' 
            },
            { 
              idx: '●', 
              title: 'Полная безопасность и комфорт', 
              desc: 'Процедура абсолютно не требует обезболивания, комфортна для пациента и не оставляет следов, гематом или ожогов. Идеальный выбор даже для лиц с экстремально чувствительной или дряблой кожей.' 
            },
            { 
              idx: '●', 
              title: 'Универсальность — лицо и тело', 
              desc: 'Комплектуется 4 запатентованными насадками разного размера. Можно уверенно обрабатывать огромные плоскости (ягодицы, спина, живот) или точечно корректировать деликатные участки (около Глаз, подбородок, колени).' 
            },
            { 
              idx: '●', 
              title: 'Выраженный дренажный эффект', 
              desc: 'Заставляет лимфатическую систему моментально выводить лишнюю депонированную жидкость. Избавляет пациентов от хронической пастозности конечностей и ускоряет реабилитацию после пластических операций.' 
            }
          ].map((feat, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl relative space-y-3">
              <span className="text-xl font-black text-rose-500 font-mono">{feat.idx}</span>
              <h4 className="text-sm font-bold text-white pt-1">{feat.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. DETAILED PACKAGES AND STARTERS */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Варианты стартовой комплектации Robolex</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              ПОДБЕРИТЕ ПАКЕТ ПОД БЮДЖЕТ И МАСШТАБ ВАШЕГО БИЗНЕСА
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 'standard',
                title: 'Комплектация «Оптима Старт»',
                article: 'AM-RBO-OPT',
                desc: 'Отличный выбор для салонов красоты и медицинских кабинетов эстетической коррекции.',
                bullets: [
                  'Базовая напольная консоль Robolex',
                  '3 манипулы в комплекте (Большая для тела, Средняя для рук, Малая для лица)',
                  'Базовые русифицированные протоколы ведения',
                  '1 год заводской сервисной поддержки'
                ]
              },
              {
                id: 'business',
                title: 'Комплект «Бизнес Профи»',
                article: 'AM-RBO-PRO',
                desc: 'Самый популярный сбалансированный пакет для медицинских клиник.',
                bullets: [
                  'Базовая напольная консоль Robolex',
                  'Полный комплект 4 манипул (включая US Lipo кавитацию)',
                  'Обучение 2 специалистов с выездными сертификатами',
                  'Готовый маркетинговый набор контента для социальных сетей',
                  '2 года расширенной фирменной гарантии'
                ]
              },
              {
                id: 'partner',
                title: 'Ультимативный пакет по франшизе «Максимум»',
                article: 'AM-RBO-MAX',
                desc: 'Все включено для быстрого и мощного запуска готового направления по моделированию.',
                bullets: [
                  'Базовая напольная консоль Robolex',
                  'Полный комплект манипул + S-PAD бандажные лазерные электроды',
                  'Индивидуальное обучение врачей от методиста академии АстМед',
                  'Гарантированный рекламный лид-трафик на первый месяц работы',
                  '3 года VIP-гарантии и подменный аппарат на время техобслуживания'
                ]
              }
            ].map((pack) => (
              <div 
                key={pack.id}
                onClick={() => setSelectedPack(pack.id as any)}
                className={`bg-slate-900 border rounded-3xl p-6 space-y-5 transition duration-300 cursor-pointer relative flex flex-col justify-between ${selectedPack === pack.id ? 'border-rose-500 ring-1 ring-rose-500 shadow-xl' : 'border-slate-800 hover:border-slate-705'}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] font-mono tracking-wider font-black px-2 py-0.5 rounded ${selectedPack === pack.id ? 'bg-rose-500 text-white' : 'bg-slate-950 text-slate-400'}`}>
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
                  className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition mt-6 ${selectedPack === pack.id ? 'bg-rose-500 text-white hover:bg-rose-400' : 'bg-slate-950 border border-slate-800 hover:bg-slate-900'}`}
                >
                  Выбрать комплектацию
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HARDEST CONVERSION & TRUST PANEL (OBJECTIONS + ROOM AUDIT FORM) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Жесткие гарантии и ответы на сомнения клиентов</h2>
          <p className="text-xs text-slate-400 font-mono">СТАНДАРТ ТЕХНИЧЕСКОЙ ПОДДЕРЖКИ АСТМЕД ДЛЯ ROBOLEX</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left fears links */}
          <div className="lg:col-span-5 space-y-2">
            {[
              { id: 'usage', icon: '❓', label: 'ОБРАЗОВАНИЕ', title: '«Пугает, как врачи разберутся в 5 частотных режимах»' },
              { id: 'safety', icon: '🛡️', label: 'ЗАЩИТА КОЖИ', title: '«Боимся ожогов и синяков от мощного вибровакуума»' },
              { id: 'doctors', icon: '🎓', label: 'МЕТОДИКА', title: '«Где нам брать готовые клинические протоколы?»' },
              { id: 'consumables', icon: '📦', label: 'ОКУПАЕМОСТЬ', title: '«Что реально входит в износ картриджей и насадок?»' },
              { id: 'preview', icon: '🎥', label: 'ТЕСТ-ДРАЙВ', title: '«Можно ли протестировать прибор вживую?»' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveObjection(tab.id as any);
                  logger.info(`Переход по страху Robolex: ${tab.label}`);
                }}
                className={`w-full text-left p-4 rounded-xl border transition duration-200 cursor-pointer flex items-center justify-between group ${activeObjection === tab.id ? 'bg-rose-500/10 border-rose-500/50 text-white shadow-lg' : 'bg-slate-900/40 border-slate-850/80 text-slate-450 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{tab.icon}</span>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold block text-rose-400">{tab.label}</span>
                    <span className="text-xs font-bold leading-normal block">{tab.title}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition ${activeObjection === tab.id ? 'text-rose-400 translate-x-1' : 'text-slate-650'}`} />
              </button>
            ))}
          </div>

          {/* Right details answer box with embedded room audit simulator */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              {activeObjection === 'usage' && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-950 px-2 rounded py-0.5">ОБУЧЕНИЕ СПЕЦИАЛИСТОВ</span>
                  <h3 className="text-lg font-black text-white">Вы платите за прибор, а не за обучение кадров</h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Наши сертифицированные тренеры проводят полный русифицированный курс обучения для врачей и косметологов вашей клиники. Расскажем, как плавно комбинировать RF, кавитацию, вакуум и EMS на интуитивном LCD-интерфейсе. Поставим руку, разберем типы ожирения у пациентов различных возрастов и вышлем официальные дипломы академии.
                  </p>
                </div>
              )}

              {activeObjection === 'safety' && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-950 px-2 rounded py-0.5">СТАНДАРТЫ КОМФОРТА</span>
                  <h3 className="text-lg font-black text-white">Пневматическая защита от синяков и перегрева</h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    В Robolex используется плавная регулировка импульсного вакуума со сбросом давления за миллисекунды. Это предотвращает возникновение сильных растяжений кожи и гематом. Контурные датчики температуры на каждой манипуле защищают дерму от избыточного точечного теплового ожога — сеанс воспринимается как приятный прогревающий массаж.
                  </p>
                </div>
              )}

              {activeObjection === 'doctors' && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-950 px-2 rounded py-0.5">КЛИНИЧЕСКИЕ ПРОТОКОЛЫ</span>
                  <h3 className="text-lg font-black text-white">Полноценная готовая база схем лечения</h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Вместе с аппаратом Robolex поставляется лицензионный сборник терапевтических клинических карт (Body Flex, Body Slim, Body Tync, But Up, Face). В нем пошагово расписано: сколько минут греть радиоволной каждую конкретную зону, какие выставлять насадки, параметры пульса и периодичность сеансов для лиц с разной степенью целлюлита или птоза по стадиям.
                  </p>
                </div>
              )}

              {activeObjection === 'consumables' && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-950 px-2 rounded py-0.5">ОТСУТСТВИЕ СКРЫТЫХ ЗАТРАТ</span>
                  <h3 className="text-lg font-black text-white">Никаких заблокированных чипов или выстрелов</h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    В Robolex нет лимитов прохождения насадок — вы не будете переплачивать дилерам за "картриджи на 10 тысяч выстрелов". Кавитация, вакуумный компрессор и EMS работают без искусственных программных блокировок. Единственный ваш расходный материал — обычный антицеллюлитный ультразвуковой гель-активатор и простыни.
                  </p>
                </div>
              )}

              {activeObjection === 'preview' && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-950 px-2 rounded py-0.5">БЕСПЛАТНЫЙ ТЕСТ-ДРАЙВ</span>
                  <h3 className="text-lg font-black text-white">Бесплатный тест-драйв в шоурумах</h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Хотите увидеть сочетанные технологии Robolex в действии перед покупкой? Приезжайте со своим специалистом в наш современный шоурум. Вы сможете поработать на приборе, подержать в руке легкие, эргономичные манипулы, оценить силу пневмо-вакуума и плотность прогрева RF-лучей. Мы уверены в качестве своего оборудования!
                  </p>
                </div>
              )}

              {/* Dynamic room audit simulator - checking SanPiN conformity */}
              <div className="border-t border-slate-800/85 pt-4 space-y-3">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                  Интерактивный аудит СанПиН кабинета
                </span>
                
                {!auditSubmitted ? (
                  <form onSubmit={handleAuditSubmit} className="space-y-3.5 bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-slate-450 block font-bold">Высота потолков (м):</label>
                        <select 
                          value={auditHeight} 
                          onChange={(e) => setAuditHeight(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded p-2 focus:ring-1 focus:ring-rose-500"
                        >
                          <option value="2.3">Менее 2.4 м</option>
                          <option value="2.5">2.4 — 2.6 м</option>
                          <option value="2.7">От 2.6 м и выше</option>
                        </select>
                      </div>

                      <div className="space-y-3 sm:pt-4">
                        <label className="flex items-center gap-2 text-slate-450 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={auditVentilation} 
                            onChange={(e) => setAuditVentilation(e.target.checked)}
                            className="accent-rose-500 w-4 h-4 rounded"
                          />
                          <span>Приточно-вытяжная вентиляция</span>
                        </label>
                        <label className="flex items-center gap-2 text-slate-450 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={auditWater} 
                            onChange={(e) => setAuditWater(e.target.checked)}
                            className="accent-rose-500 w-4 h-4 rounded"
                          />
                          <span>Раковина с горячей водой</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 py-2.5 rounded-lg text-xs font-bold"
                    >
                      Рассчитать соответствие кабинета
                    </button>
                  </form>
                ) : (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                      <span className="text-slate-400">Результат оценки СанПиН:</span>
                      <span className={`font-mono font-bold uppercase ${Number(auditHeight) >= 2.7 && auditVentilation && auditWater ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {Number(auditHeight) >= 2.7 && auditVentilation && auditWater ? 'Кабинет допущен' : 'Требуются доработки'}
                      </span>
                    </div>
                    <ul className="text-[11px] leading-relaxed text-slate-400 space-y-1">
                      <li className="flex gap-2 items-start">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>Площадь: Роболекс требует кабинет от 12 кв.м. (Допустимо).</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        {Number(auditHeight) >= 2.7 ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <span className="text-amber-455 font-bold flex-shrink-0 mt-0.5">⚠️</span>
                        )}
                        <span>Высота потолка: {Number(auditHeight) >= 2.7 ? 'Высота потолка соответствует нормативам (от 2.6м).' : 'Высота критически близка к пределу.'}</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        {auditVentilation ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <span className="text-amber-455 font-bold flex-shrink-0 mt-0.5">⚠️</span>
                        )}
                        <span>Вентиляция: {auditVentilation ? 'Наличие приточной вентиляции подтверждено.' : 'Для медицинских процедур обязательна автономная вытяжка.'}</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => setAuditSubmitted(false)}
                      className="text-[10px] text-rose-400 hover:text-white font-bold block"
                    >
                      Повторить расчет с другими параметрами
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => triggerQuote(product, 'consultation')}
                className="w-full bg-rose-500 hover:bg-rose-400 text-white font-mono font-bold py-3 px-6 rounded-xl text-xs uppercase"
              >
                Отработать остальные сомнения
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. DETAILED BUSINESS FAQ SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-slate-900/10 rounded-3xl border border-slate-900">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Ответы на часто задаваемые вопросы</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">ОБСЛУЖИВАНИЕ, КУРСЫ И КЛИНИЧЕСКАЯ ЭФФЕКТИВНОСТЬ</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, fidx) => (
            <div 
              key={fidx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === fidx ? null : fidx)}
                className="w-full text-left px-6 py-5 flex justify-between items-center bg-slate-900 hover:bg-slate-850 cursor-pointer"
              >
                <span className="text-sm font-bold text-white pr-4">{faq.q}</span>
                {expandedFaq === fidx ? (
                  <ChevronUp className="w-4 h-4 text-rose-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
              </button>
              
              {expandedFaq === fidx && (
                <div className="px-6 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-850 bg-slate-950/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. LEAD GENERATION CONVERSION DOCK */}
      <section className="py-12 max-w-3xl mx-auto px-4 text-center space-y-8">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-2xl" />
          
          <div className="space-y-2">
            <h3 className="text-lg font-black text-white">Желаете получить пошаговый бизнес-план запуска Robolex?</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Оставьте контакты — вышлем развернутую экономическую модель окупаемости, технологический атлас манипул и СанПиН памятку.
            </p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-650 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-650 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-400 text-white font-mono font-bold py-3.5 rounded-xl text-xs uppercase cursor-pointer transition shadow-lg shadow-rose-950/40"
              >
                Запросить КП и Презентацию
              </button>
            </form>
          ) : (
            <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl space-y-3.5">
              <div className="text-emerald-455 text-3xl font-extrabold font-mono">✓</div>
              <h4 className="text-white font-bold text-sm">Ваша заявка успешно отправлена!</h4>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                Методист АстМед свяжется с вами в течение 15 минут для уточнения деталей лизинга и отправки спецификации на Robolex.
              </p>
            </div>
          )}
        </div>

        {/* SECTION: НАША КОМАНДА "ASTMED" */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 mt-6 text-left max-w-3xl mx-auto" id="astmed-team-trust">
          <div className="grid md:grid-cols-12 gap-6 items-center text-slate-100">
            <div className="md:col-span-5 relative group overflow-hidden rounded-xl border border-slate-800">
              <img 
                src="/images/team_aesthet.jpg" 
                alt="Команда Astmed" 
                className="w-full h-auto object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-[9px] font-mono tracking-widest bg-cyan-600 px-2 py-0.5 rounded font-bold">ОФИС И КОМАНДА ASTMED</span>
              </div>
            </div>
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-800/60 px-2.5 py-1 rounded-full text-cyan-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Нам доверяют лучшие партнеры
              </div>
              <h3 className="text-lg font-black text-white tracking-tight leading-none">
                Команда экспертов «Astmed»
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Каждое поставляемое устройство — это не просто коробка, а долгосрочное партнерство. Наша сертифицированная команда <strong className="text-white">Astmed</strong> состоит из высококлассных инженеров медтехники, практикующих врачей-косметологов и сертифицированных бизнес-консультантов.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Инженеры с лицензией Росздравнадзора обеспечивают пусконаладку, обучение и молниеносное сопровождение 24/7 по всей стране.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended SEO keywords list footer for search engine trust */}
        <div className="space-y-3 text-left">
          <span className="text-[9px] font-mono text-slate-600 font-bold block uppercase tracking-widest text-center">
            Раздел рекомендован для продвижения по поисковым запросам в Яндекс / Google
          </span>
          <div className="flex flex-wrap justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
            {[
              'аппарат для удаления целлюлита',
              'лифтинг тела без операции',
              'как избавиться от жира на животе',
              'аппаратная коррекция фигуры',
              'robolex до и после',
              'rf-лифтинг тела отзывы',
              'вакуумный массаж от целлюлита',
              'лазерный липолиз без операции',
              'электромиостимуляция для похудения',
              'восстановление после родов аппаратно',
              'аппарат против отёков и застоя',
              'как убрать бока без спорта',
              'неинвазивное уменьшение объёмов',
              'аппаратное похудение для мужчин и женщин'
            ].map((query, qidx) => (
              <span key={qidx} className="bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-full">
                #{query}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="robolex-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
