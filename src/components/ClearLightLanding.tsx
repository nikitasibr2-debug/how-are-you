import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
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
  HelpCircle,
  Eye,
  Settings,
  Calendar,
  Layers,
  Activity,
  DollarSign,
  X,
  Phone,
  User
} from 'lucide-react';
import { Product, Article } from '../types';
import albumImagesRaw from '../data/clearlight_album_images.json';
const albumImages = albumImagesRaw as Record<string, string>;
import { logger } from '../lib/logger';

interface ClearLightLandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const ClearLightLanding: React.FC<ClearLightLandingProps> = ({
  product,
  articles,
  favorites,
  compareList,
  toggleFavorite,
  toggleCompare,
  triggerQuote,
  onBackToCatalog
}) => {
  // Локальные состояния интерактива
  const [activeTab, setActiveTab] = useState<'tech' | 'roi' | 'trust' | 'objections' | 'cases' | 'faq'>('tech');

  const scrollToSection = (sectionId: string, sectionKey: 'tech' | 'roi' | 'trust' | 'objections' | 'cases' | 'faq') => {
    setActiveTab(sectionKey);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -140; // Смещение из-за липкого хедера
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      logger.info(`Плавный скролл к секции: ${sectionId}`);
    }
  };

  const [activeFilterId, setActiveFilterId] = useState<string>('560');
  const [activeCase, setActiveCase] = useState<'acne' | 'pigment' | 'vascular' | 'rejuvenation'>('acne');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Калькулятор окупаемости IPL
  const [patientsPerDay, setPatientsPerDay] = useState<number>(4);
  const [treatmentPrice, setTreatmentPrice] = useState<number>(6500);
  const [consumablesCost, setConsumablesCost] = useState<number>(300);

  // Возражения и СанПиН опросник
  const [objectionActiveTab, setObjectionActiveTab] = useState<'roi' | 'pain' | 'sanpin' | 'service' | 'learning'>('roi');
  const [auditHeight, setAuditHeight] = useState<string>('2.8');
  const [auditVentilation, setAuditVentilation] = useState<boolean>(true);
  const [auditSink, setAuditSink] = useState<boolean>(true);
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);

  // Формы лид-генерации
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formGift, setFormGift] = useState<string>('pdf_handbook');

  // Запись на живой тест-драйв
  const [demoCity, setDemoCity] = useState<string>('Москва');
  const [demoDate, setDemoDate] = useState<string>('');
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [demoName, setDemoName] = useState<string>('');
  const [demoPhone, setDemoPhone] = useState<string>('');

  // Гарантийные условия и Сводка поломок
  const [activeWrenchPoint, setActiveWrenchPoint] = useState<number>(0);

  // Фильтр по статьям
  const matchedArticles = useMemo(() => {
    return articles.filter(a => 
      a.id.includes('ipl') || 
      a.id.includes('laser') || 
      a.id.includes('cosmetology') || 
      a.id.includes('acne') || 
      a.id.includes('pigmentation')
    );
  }, [articles]);

  const isFavorited = favorites.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Расчет финансовой окупаемости (ROI)
  const financialROI = useMemo(() => {
    const costPerTreatment = consumablesCost; 
    const dailyGross = patientsPerDay * treatmentPrice;
    const workingDays = 22; // В среднем рабочих дней в месяце у косметолога
    const monthlyGross = dailyGross * workingDays;
    
    // Чистая прибыль с учетом ФОТ врача (30%), налогов и аренды (прибл. 20%) и расходных материалов
    const monthlyConsumables = patientsPerDay * costPerTreatment * workingDays;
    const doctorsSalary = monthlyGross * 0.3;
    const taxesAndOverheads = monthlyGross * 0.15;
    
    const monthlyNetProfit = Math.round(monthlyGross - monthlyConsumables - doctorsSalary - taxesAndOverheads);
    const machinePrice = product.price || 3100000;
    const paybackMonths = Number((machinePrice / (monthlyNetProfit || 1)).toFixed(1));
    const annualNetIncome = monthlyNetProfit * 12;

    return {
      dailyGross,
      monthlyGross,
      monthlyNetProfit,
      paybackMonths,
      annualNetIncome
    };
  }, [patientsPerDay, treatmentPrice, consumablesCost, product.price]);

  // Длины волн и фильтры ClearLight
  const spectrumFilters = {
    '430': {
      title: 'Светофильтр 430 нм — Лечение акне',
      desc: 'Целевое воздействие на порфирин, выделяемый бактериями Propionibacterium Acnes. Стимулирует выделение синглетного кислорода, который избирательно разрушает воспалительные элементы без повреждения здоровых клеток. Содержит терапевтический синий спектр.',
      param: 'Плотность: 14-18 Дж/см², Длительность импульса: 3.5 мс, Охлаждение: -5°C'
    },
    '515': {
      title: 'Светофильтр 515 нм — Удаление поверхностного пигмента',
      desc: 'Превосходно поглощается меланином в эпидермисе. Безопасно решает проблемы веснушек, эпидермальных невусов, солнечного лентиго. Кожа слегка темнеет в течение 2-3 дней после сеанса и деликатно отшелушивается.',
      param: 'Плотность: 16-22 Дж/см², Двойной импульс, Интервал: 20 мс'
    },
    '560': {
      title: 'Светофильтр 560 нм — Фотоомоложение и рельеф',
      desc: 'Глубокий прогрев дермы запускает неоколлагенез — процесс синтеза нового эластина и коллагена фибробластами. Кожа обретает тургор, упругость, уходят мелкие морщины, сужаются расширенные поры.',
      param: 'Плотность: 18-24 Дж/см², Тройной импульс, Интервал: 30 мс'
    },
    '585': {
      title: 'Светофильтр 585 нм — Сосудистая сетка и розацеа',
      desc: 'Максимальное сродство со спектром поглощения оксигемоглобина. Вызывает коагуляцию (склеивание) стенок расширенных капилляров, убирая сосудистые звездочки (телеангиэктазии) и маскируя следы розацеа.',
      param: 'Плотность: 15-20 Дж/см², Двойной импульс, Ширина импульса: 4.5 мс'
    },
    '640': {
      title: 'Светофильтр 640 нм — Фотоэпиляция и глубокий лифтинг',
      desc: 'Проникает глубоко в дерму, достигая волосяной луковицы. Нагревает меланин волоса, склеивая питающие сосуды и разрушая фолликул навсегда. Также способствует ремоделированию глубокого коллагенового каркаса.',
      param: 'Плотность: 20-35 Дж/см², Импульсный стек, Охлаждение: -10°C'
    },
    '700': {
      title: 'Светофильтр 700 нм — Терапия инфракрасного диапазона / Термолифтинг',
      desc: 'Предельная глубина проникновения импульсного света. Прогревает коллагеновые слои SMAS-уровня, вызывая мгновенный термолифтинг — подтяжку обвисшего тканевого матрикса у деформационного морфотипа старения.',
      param: 'Плотность: 22-38 Дж/см², Одиночный точечный импульс, Охлаждение: Макс'
    }
  };

  // Клинические кейсы (До & После)
  const clinicalCases = {
    acne: {
      title: "Лечение тяжелой формы акне и себорейного дерматита",
      problem: "Пациент 19 лет. Угревая сыпь, воспалительные папулы, застойные синюшные пятна постакне на щеках и подбородке. Кожа жирная, пористая.",
      solution: "Курс из 4 процедур на ClearLight с интервалом 14 дней. Использовали фильтр 430 нм для подавления бактерий, затем 585 нм для экспресс-рассасывания застойных пятен.",
      result: "Воспаления сокращены на 92%. Саловыделение снизилось на 40%, застойные пятна практически нивелированы. Без применения системных ретиноидов.",
      photoBefore: albumImages["main-product.jpg"] || "/clearlight/main-product.jpg",
      photoAfter: "/clearlight/device-full.jpg",
      filterUsed: "430 нм & 585 нм"
    },
    pigment: {
      title: "Быстрое стирание пигментации и хлоазмы после беременности",
      problem: "Пациентка 32 года. Обширные бурые пигментные пятна в области скул и лба. Попытки отбеливания пилингами эффекта не принесли.",
      solution: "2 процедуры фототерапии на аппарате ClearLight с фильтром 515 нм. Настройки подобраны индивидуально по фототипу кожи.",
      result: "Полное исчезновение эпидермальных пигментных пятен. Тон лица стал однородным и сияющим, пигмент ушел бесследно.",
      photoBefore: "https://images.unsplash.com/photo-1620566374032-93471649237e?auto=format&fit=crop&w=600&h=400&q=80",
      photoAfter: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&h=400&q=80",
      filterUsed: "515 нм"
    },
    vascular: {
      title: "Терапия купероза и выраженного розацеа на крыльях носа",
      problem: "Пациентка 45 лет. Жалобы на постоянную красноту лица при перепадах температур, видимую сеточку капилляров в области щек.",
      solution: "3 сеанса на аппарате ClearLight с фильтром 585 нм и активным охлаждением наконечника холодной манипулы.",
      result: "Полное запустевание видимых сосудистых капилляров. Выраженность красноты снизилась на 85%, лицо перестало реагировать на горячее.",
      photoBefore: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&h=400&q=80",
      photoAfter: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=400&q=80",
      filterUsed: "585 нм"
    },
    rejuvenation: {
      title: "Процедура Viel Toning («Вуаль красоты») - Видимый результат за 1 сеанс",
      problem: "Паакентка 38 лет. Тусклый цвет лица, усталый морфотип старения, потеря упругости коллагенового каркаса.",
      solution: "Однократный VIP-уход Viel Toning на базе ClearLight. Использование многоимпульсного дробного стека со светофильтром 560 нм.",
      result: "Выраженный эффект сияющей отдохнувшей кожи мгновенно. Сглаживание пор и морщинок, здоровый румянец без реабилитационных корок.",
      photoBefore: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&h=400&q=80",
      photoAfter: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&h=400&q=80",
      filterUsed: "560 нм (Viel Toning)"
    }
  };

  // Обработка отправки формы калькулятора аудита СанПиН кабинета
  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logger.info('Успешно отправлен опросник СанПиН клиники', {
      height: auditHeight,
      ventilation: auditVentilation,
      sink: auditSink,
      machineId: 'clearlight-ipl'
    });
    setAuditSubmitted(true);
  };

  // Обработка отправки лид-формы
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      logger.warn('Попытка отправить форму без обязательных полей (имя/телефон)');
      return;
    }
    logger.info('Сформирована заявка на получение КП/Руководства по ClearLight', {
      name: formName,
      phone: formPhone,
      gift: formGift,
      productId: product.id
    });
    setFormSubmitted(true);
  };

  // Оформление заявки на живой тест-драйв в клинике-партнере (открытие модального окна контактов)
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logger.info('Запуск процесса записи на визит: открытие модального окна ввода контактов', {
      city: demoCity,
      date: demoDate,
      productId: product.id
    });
    setIsDemoModalOpen(true);
  };

  // Подтверждение телефонного звонка и сохранение контактных данных заявки на визит
  const handleDemoConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName.trim() || !demoPhone.trim()) {
      logger.warn('Попытка подтвердить визит без заполнения обязательных полей', {
        name: demoName,
        phone: demoPhone
      });
      return;
    }

    logger.info('Успешно оформлена заявка на индивидуальный живой визит с контактами для подтверждения по телефону', {
      city: demoCity,
      date: demoDate,
      name: demoName,
      phone: demoPhone,
      machineId: product.id,
      timestamp: new Date().toISOString()
    });

    setIsDemoModalOpen(false);
    setDemoSubmitted(true);
  };

  const handleBrochureDownload = () => {
    logger.info('Пользователь скачал РУ Росздравнадзора и брошюру ClearLight PDF', {
      productId: product.id,
      timestamp: new Date().toISOString()
    });
    alert('Скачивание PDF-файла "РУ_РФ_ClearLight_IPL.pdf" и "Руководство_EunSung.pdf" начнется автоматически в новой вкладке.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans" id="clearlight-landing">
      {/* Верхняя панель навигации */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4 px-6 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBackToCatalog}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium text-sm py-1.5 px-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800"
              id="back-to-catalog-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в каталог
            </button>
            <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
            <div>
              <span className="text-xs text-sky-400 font-mono font-semibold tracking-wider uppercase block">Лидер эстетической косметологии</span>
              <h1 className="text-lg font-bold text-white font-sans tracking-tight">ClearLight IPL EunSung Global</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isFavorited 
                  ? 'bg-rose-950/40 border-rose-800 text-rose-400 hover:bg-rose-900/40' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
              title={isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
              id="favorite-toggle-btn"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isCompared 
                  ? 'bg-sky-950/40 border-sky-800 text-sky-400 hover:bg-sky-900/40' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
              title={isCompared ? 'Убрать из сравнения' : 'Добавить в сравнение'}
              id="compare-toggle-btn"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => triggerQuote(product, 'kp')}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm py-2.5 px-5 rounded-lg shadow-sm hover:shadow transition-all"
              id="request-kp-top-btn"
            >
              Получить расчет КП
            </button>
          </div>
        </div>
      </header>

      {/* Hero-секция с реальными коммерческими рендерами */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Слева: Текстовый маркетинговый офер */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/60 rounded-full px-3 py-1 text-emerald-400 font-medium text-xs">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Официально в РФ: РУ Минздрава №ФСЗ 2011/10058</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Бизнес-окупаемость <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">на фотоомоложении</span>
            </h2>
            
            <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed">
              Косметологическая IPL-система **ClearLight** от EunSung Global генерирует интенсивный импульсный свет высокой мощности для мгновенного удаления сложных сосудистых звеньев, пигментных пятен любого генеза, стирания угревой сыпи и запуска коллагена без боли.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-900 p-4.5 rounded-xl border border-slate-800 shadow-sm">
                <div className="p-2 bg-sky-950/40 text-sky-400 rounded-lg shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Тонирование Viel Toning</h4>
                  <p className="text-xs text-slate-400 mt-1">«Вуаль красоты» — результат за 1 процедуру без покраснений</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900 p-4.5 rounded-xl border border-slate-800 shadow-sm">
                <div className="p-2 bg-indigo-950/40 text-indigo-400 rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Охлаждение до -20°C</h4>
                  <p className="text-xs text-slate-400 mt-1">Комфорт даже при высокой плотности энергии до 50 Дж/см²</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => triggerQuote(product, 'turnkey')}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 group"
                id="get-turnkey-proposal"
              >
                Получить решение «Под ключ»
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleBrochureDownload}
                className="bg-slate-900 hover:bg-slate-850 text-slate-100 border border-slate-800 font-bold py-3.5 px-8 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                id="download-docs-button"
              >
                <Download className="w-4 h-4 text-slate-400" />
                Скачать РУ и Презентацию
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Срок поставки: 3-5 дней
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-500" /> Сервисная гарантия: 2 года
              </span>
            </div>
          </div>

          {/* Справа: Интерактивный блок фото галереи с Яндекс.Диска */}
          <div className="lg:col-span-12 xl:col-span-5 relative flex flex-col items-center">
            <div className="relative bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl max-w-md w-full">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                <img 
                  src={albumImages["main-product.jpg"] || "/clearlight/main-product.jpg"} 
                  alt="ClearLight IPL Аппарат" 
                  className="object-contain max-h-full max-w-full p-4 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Анимационный бейдж реального фото */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-mono py-1 px-2.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-450 animate-pulse"></span>
                  Реальное фото
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-sm shadow border border-slate-850 text-[10px] text-slate-300 font-medium py-1 px-2 rounded">
                  Аппарат на подставке
                </div>
              </div>

              {/* Миниатюры других коммерческих ракурсов */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="aspect-square bg-slate-950 border border-slate-800 rounded-lg p-2 flex items-center justify-center cursor-pointer hover:border-sky-505 transition-colors">
                  <img src={albumImages["main-product.jpg"] || "/clearlight/main-product.jpg"} alt="Манипула" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square bg-slate-950 border border-slate-800 rounded-lg p-2 flex items-center justify-center cursor-pointer hover:border-sky-505 transition-colors">
                  <img src={albumImages["5113.jpg"]} alt="Узел зажигания" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square bg-slate-950 border border-slate-800 rounded-lg p-2 flex items-center justify-center cursor-pointer hover:border-sky-505 transition-colors">
                  <img src={albumImages["5119.jpg"]} alt="Экран ClearLight" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div className="mt-4 p-3.5 bg-sky-950/40 rounded-xl border border-sky-900/40 text-xs text-sky-300 text-center">
                <strong>Южнокорейская сборка премиум-класса.</strong> Корпус из ударопрочного углепластика и моноблочные комплектующие из Германии.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Вкладки на разделы лендинга */}
      <nav className="sticky top-[81px] z-30 bg-slate-900 text-white shadow-md border-y border-slate-850">
        <div className="max-w-7xl mx-auto flex overflow-x-auto scroller-hide font-sans">
          <button 
            onClick={() => scrollToSection('tech-section', 'tech')}
            className={`py-4 px-6 font-semibold text-sm transition-all text-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'tech' ? 'border-sky-400 bg-slate-800 text-sky-300' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Технологии и Светофильтры
          </button>
          <button 
            onClick={() => scrollToSection('roi-section', 'roi')}
            className={`py-4 px-6 font-semibold text-sm transition-all text-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'roi' ? 'border-sky-400 bg-slate-800 text-sky-300' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Калькулятор окупаемости
          </button>
          <button 
            onClick={() => scrollToSection('cases-section', 'cases')}
            className={`py-4 px-6 font-semibold text-sm transition-all text-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'cases' ? 'border-sky-400 bg-slate-800 text-sky-300' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            Результаты процедур (Кейсы)
          </button>
          <button 
            onClick={() => scrollToSection('objections-section', 'objections')}
            className={`py-4 px-6 font-semibold text-sm transition-all text-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'objections' ? 'border-sky-400 bg-slate-800 text-sky-300' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Возражения и СанПиН
          </button>
          <button 
            onClick={() => scrollToSection('trust-section', 'trust')}
            className={`py-4 px-6 font-semibold text-sm transition-all text-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'trust' ? 'border-sky-400 bg-slate-800 text-sky-300' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            О компании и Гарантии
          </button>
          <button 
            onClick={() => scrollToSection('faq-section', 'faq')}
            className={`py-4 px-6 font-semibold text-sm transition-all text-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'faq' ? 'border-sky-400 bg-slate-800 text-sky-300' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Вопрос-Ответ (FAQ)
          </button>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto py-12 px-6 space-y-24">
        
        {/* РАЗДЕЛ: ТЕХНОЛОГИИ */}
        <section id="tech-section" className="scroll-mt-28 space-y-12">
            
            {/* Текст о фильтре Viel Toning */}
            <div className="bg-gradient-to-r from-sky-900 to-indigo-900 text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-no-repeat bg-right bg-contain flex items-center">
                <Sparkles className="w-48 h-48" />
              </div>
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono tracking-widest text-sky-300 uppercase font-bold">Уникальный режим «Вуаль красоты»</span>
                <h3 className="text-3xl font-extrabold tracking-tight">Viel Toning — сияние без корки и красноты</h3>
                <p className="text-slate-200 leading-relaxed text-base md:text-lg">
                  Многие фототипы имеют выраженные деликатные пигментные пятна, которые при standard вспышках IPL могут воспалиться или закончиться рубцами. Режим **Viel Toning** на аппарате ClearLight делит лазерную вспышку на сверхкороткие суб-микроимпульсы. Энергия поступает «вуалью», нагревая меланоциты мягко и щадяще. Метод дает фантастический результат фотоомоложения без малейшего намека на шелушение и восстановительный период.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-300 pt-2">
                  <span className="bg-white/10 px-2.5 py-1 rounded">Ширина импульса: 1.5 мкс</span>
                  <span>/</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded">Мощность: до 50 Дж</span>
                  <span>/</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded">Без периода реабилитации</span>
                </div>
              </div>
            </div>

            {/* Светофильтры - интерактивный блок */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Спектральный арсенал ClearLight IPL</h3>
                <p className="text-slate-400 mt-1">Один универсальный наконечник со сменными фильтрами для любых дефектов</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Список фильтров */}
                <div className="lg:col-span-4 space-y-2">
                  {Object.entries(spectrumFilters).map(([wavelength, data]) => (
                    <button
                      key={wavelength}
                      onClick={() => {
                        logger.debug(`Пользователь кликнул на светофильтр`, { wavelength });
                        setActiveFilterId(wavelength);
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                        activeFilterId === wavelength 
                          ? 'border-sky-505 bg-sky-950/40 shadow-sm text-sky-400 font-bold' 
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          wavelength === '430' ? 'bg-blue-600 text-white' :
                          wavelength === '515' ? 'bg-emerald-600 text-white' :
                          wavelength === '560' ? 'bg-amber-600 text-white' :
                          wavelength === '585' ? 'bg-orange-600 text-white' :
                          wavelength === '640' ? 'bg-rose-600 text-white' : 'bg-purple-600 text-white'
                        }`}>
                          {wavelength}
                        </div>
                        <span className="text-sm">Фильтр {wavelength} нм</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeFilterId === wavelength ? 'rotate-90 text-sky-400' : 'text-slate-500'}`} />
                    </button>
                  ))}
                </div>

                {/* Описание выбранного фильтра */}
                <div className="lg:col-span-8 bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-md min-h-[300px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-sky-950/80 text-sky-400 border border-sky-800/50 text-xxs tracking-wider uppercase font-extrabold px-2.5 py-1 rounded">
                        Прецизионная насадка
                      </span>
                      <span className="text-slate-500 text-xs font-mono">ID фильтра: CL-{activeFilterId}</span>
                    </div>

                    <h4 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                      {spectrumFilters[activeFilterId as keyof typeof spectrumFilters].title}
                    </h4>

                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {spectrumFilters[activeFilterId as keyof typeof spectrumFilters].desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl">
                    <div>
                      <span className="text-xxs text-slate-500 uppercase font-mono tracking-wider">Клинические параметры</span>
                      <p className="text-xs text-slate-300 font-bold mt-1">
                        {spectrumFilters[activeFilterId as keyof typeof spectrumFilters].param}
                      </p>
                    </div>
                    <div>
                      <span className="text-xxs text-slate-500 uppercase font-mono tracking-wider">Ресурс импульса</span>
                      <p className="text-xs text-slate-300 font-bold mt-1">
                        Полная стабильность спектра до 100 000 вспышек
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Технические преимущества в Bento стиле */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-sky-950/40 text-sky-400 rounded-lg flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white">Интеллектуальный контроль питания</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Использование конденсаторов высокой емкости от японского производителя Nippon Chemi-Con гарантирует 100% стабильность заданного флюенса во время всего рабочего дня.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-indigo-950/40 text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white">Широкий размер пятна</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Размер рабочего окна манипулы 15 x 40 мм (6 см²) позволяет быстро обрабатывать обширные зоны, снижая общее количество вспышек и экономя ресурс дорогостоящего картриджа.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-emerald-950/40 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white">Абсолютная безопасность</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Охлаждение сапфира наконечника до -20 градусов предотвращает термический шок окружающих тканей. Никаких шрамов, перегрева или пигментного рецидива у пациентов.
                </p>
              </div>
            </div>
          </section>

          {/* Разделительная линия между блоками */}
          <div className="border-t border-slate-800 my-4"></div>

        {/* РАЗДЕЛ: КАЛЬКУЛЯТОР ROI (Важнейший инструмент повышения конверсии) */}
        <section id="roi-section" className="scroll-mt-28 space-y-8">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              
              {/* Левая интерактивная часть */}
              <div className="lg:col-span-7 p-8 md:p-12 space-y-8">
                <div>
                  <span className="text-sky-400 font-bold font-mono text-xs uppercase tracking-wider">Интерактивный маркетинг-прогноз</span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight mt-1">Калькулятор финансовой окупаемости</h3>
                  <p className="text-slate-400 text-sm mt-1">Оцените рентабельность ваших инвестиций в сертифицированный аппарат ClearLight IPL</p>
                </div>

                <div className="space-y-6">
                  {/* Ползунок: Пациентов в день */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-300">Количество сеансов фототерапии в день</span>
                      <span className="bg-sky-950/80 text-sky-450 border border-sky-900/60 text-xs px-2.5 py-1 rounded font-bold">{patientsPerDay} пациентов</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      value={patientsPerDay} 
                      onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>1 пациент</span>
                      <span>8 пациентов</span>
                      <span>15 пациентов</span>
                    </div>
                  </div>

                  {/* Ползунок: Средняя стоимость */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-700">Средняя стоимость процедуры IPL для пациента</span>
                      <span className="bg-indigo-50 text-indigo-800 text-xs px-2.5 py-1 rounded font-bold">
                        {treatmentPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="3000" 
                      max="15000" 
                      step="500"
                      value={treatmentPrice} 
                      onChange={(e) => setTreatmentPrice(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>3 000 ₽ (локальная вспышка)</span>
                      <span>8 500 ₽</span>
                      <span>15 000 ₽ (лицо полностью)</span>
                    </div>
                  </div>

                  {/* Ввод расходных */}
                  <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-150 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Расходные материалы (гель, салфетки)
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={consumablesCost} 
                          onChange={(e) => setConsumablesCost(Number(e.target.value))}
                          className="w-full bg-white border border-slate-250 p-2 text-sm rounded font-bold text-slate-800"
                        />
                        <span className="absolute right-3 top-2 text-slate-400 text-sm">₽</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-slate-500 leading-relaxed">
                      При использовании оригинального геля себестоимость одной процедуры ClearLight составляет рекордно низкие 300 рублей. У аппарата нет платных картриджей блокировки!
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая финансовая сводка */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest font-mono font-bold block">
                      Финансовая сводка клиники
                    </span>
                    <h4 className="text-xl font-bold mt-1 text-slate-100">Расчет рентабельности</h4>
                  </div>

                  <div className="space-y-4 font-mono">
                    <div className="flex justify-between text-sm py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Оборот в рабочий день:</span>
                      <span className="font-bold text-emerald-400">+{financialROI.dailyGross.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Оборот в месяц (22 дня):</span>
                      <span className="font-bold">+{financialROI.monthlyGross.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between text-base py-2 border-b border-white/10">
                      <span className="text-sky-300 font-sans font-bold">Чистая прибыль в месяц:</span>
                      <span className="font-bold text-emerald-400 text-lg">+{financialROI.monthlyNetProfit.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm py-1.5">
                      <span className="text-slate-400">Чистый доход за 1-й год:</span>
                      <span className="font-bold text-sky-400">+{financialROI.annualNetIncome.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-5 border border-white/10 space-y-3 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-300 font-sans font-semibold">Срок окупаемости аппарата:</span>
                    <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold font-mono">
                      ~ {financialROI.paybackMonths} мес
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    * Расчет окупаемости выполнен при стоимости аппарата {product.price?.toLocaleString()} руб с учетом 35% издержек (30% зарплата врача и 5% страхование/налоги/аренда). Это переключает разговор о покупке на язык инвестиций!
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Разделительная линия между блоками */}
          <div className="border-t border-slate-250 my-4 opacity-70"></div>

        {/* РАЗДЕЛ: РЕЗУЛЬТАТЫ ПРОЦЕДУР (Клинические кейсы) */}
        <section id="cases-section" className="scroll-mt-28 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Подтвержденная эффективность фототерапии</h3>
                <p className="text-slate-500 mt-1">Реальные клинические результаты докторов и подробные параметры импульсов</p>
              </div>

              {/* Переключатель кейсов */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveCase('acne')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeCase === 'acne' ? 'bg-sky-600 text-white shadow' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Акне и себорея
                </button>
                <button 
                  onClick={() => setActiveCase('pigment')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeCase === 'pigment' ? 'bg-sky-600 text-white shadow' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Гиперпигментация
                </button>
                <button 
                  onClick={() => setActiveCase('vascular')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeCase === 'vascular' ? 'bg-sky-600 text-white shadow' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Купероз и розацеа
                </button>
                <button 
                  onClick={() => setActiveCase('rejuvenation')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeCase === 'rejuvenation' ? 'bg-sky-600 text-white shadow' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Viel Toning
                </button>
              </div>
            </div>

            {/* Карточка текущего кейса */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Левая коммерческая часть: фото до и после */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block text-center">До процедуры</span>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                      <img 
                        src={clinicalCases[activeCase].photoBefore} 
                        alt="До процедуры" 
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-500 font-bold block text-center">После курса лечения</span>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-emerald-200 relative">
                      <img 
                        src={clinicalCases[activeCase].photoAfter} 
                        alt="После процедуры" 
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-800 text-center">
                  * Все фотографии предоставлены клиниками-партнерами и публикуются с согласия пациентов.
                </div>
              </div>

              {/* Правая текстовая часть */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="bg-indigo-100 text-indigo-800 text-xxs tracking-wider uppercase font-extrabold px-2.5 py-1 rounded">
                    Терапевтический успех
                  </span>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight mt-2 leading-snug">
                    {clinicalCases[activeCase].title}
                  </h4>
                </div>

                <div className="space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    <strong>Анамнез и проблема:</strong> {clinicalCases[activeCase].problem}
                  </p>
                  <p>
                    <strong>Оказанное воздействие:</strong> {clinicalCases[activeCase].solution}
                  </p>
                  <p className="text-emerald-700 bg-emerald-50 p-3.5 rounded-xl border border-emerald-100">
                    <strong>Динамика улучшений:</strong> {clinicalCases[activeCase].result}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500 font-mono">
                  <span>Фильтр: {clinicalCases[activeCase].filterUsed}</span>
                  <span>Без анестезии и ожогов</span>
                </div>
              </div>

            </div>
          </section>

          {/* Разделительная линия между блоками */}
          <div className="border-t border-slate-250 my-4 opacity-70"></div>

        {/* РАЗДЕЛ: ВОЗРАЖЕНИЯ И САНПИН */}
        <section id="objections-section" className="scroll-mt-28 space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Честные ответы на сложные вопросы</h3>
              <p className="text-slate-500">Маркетинговые и инженерные разборы частых барьеров при выборе IPL-оборудования</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              
              {/* Левая вкладка */}
              <div className="lg:col-span-4 bg-slate-50 border-r border-slate-200 p-6 space-y-1">
                <button
                  onClick={() => setObjectionActiveTab('roi')}
                  className={`w-full text-left p-4.5 rounded-xl transition-all font-bold ${
                    objectionActiveTab === 'roi' ? 'bg-white shadow text-sky-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  У нас нет столько денег / окупаемость
                </button>
                <button
                  onClick={() => setObjectionActiveTab('pain')}
                  className={`w-full text-left p-4.5 rounded-xl transition-all font-bold ${
                    objectionActiveTab === 'pain' ? 'bg-white shadow text-sky-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Пациенты боятся ожогов и сильной боли
                </button>
                <button
                  onClick={() => setObjectionActiveTab('sanpin')}
                  className={`w-full text-left p-4.5 rounded-xl transition-all font-bold ${
                    objectionActiveTab === 'sanpin' ? 'bg-white shadow text-sky-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Подойдет ли наш кабинет под СанПиН?
                </button>
                <button
                  onClick={() => setObjectionActiveTab('service')}
                  className={`w-full text-left p-4.5 rounded-xl transition-all font-bold ${
                    objectionActiveTab === 'service' ? 'bg-white shadow text-sky-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Что будем делать при поломке?
                </button>
                <button
                  onClick={() => setObjectionActiveTab('learning')}
                  className={`w-full text-left p-4.5 rounded-xl transition-all font-bold ${
                    objectionActiveTab === 'learning' ? 'bg-white shadow text-sky-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Сможем ли мы легко обучить персонал?
                </button>
              </div>

              {/* Правый контент возражения */}
              <div className="lg:col-span-8 p-8 md:p-12 space-y-6 flex flex-col justify-between">
                
                {objectionActiveTab === 'roi' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-sky-600 uppercase">Окупаемость бьюти-бизнеса</span>
                    <h4 className="text-2xl font-bold text-slate-900">«Для нас это колоссально дорого...»</h4>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                      <p>
                        Покупка аппарата фотоомоложения — это не трата бюджета, а приобретение высоколиквидного финансового актива. Давайте посчитаем:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>IPL-терапия входит в ТОП-3 самых покупаемых процедур в эстетической медицине круглогодично.</li>
                        <li>Себестоимость вспышки — меньше 4-х копеек! Никакой платной разблокировки вспышек по картам или таймерам.</li>
                        <li>Принимая всего 4-х пациентов в день со средним чеком 6 500 рублей, вы полностью выплатите стоимость ClearLight за 11 месяцев, а дальше прибор будет приносить более **400 000 рублей стабильного чистого дохода** ежемесячно.</li>
                      </ul>
                      <p className="bg-sky-50 text-sky-900 border border-sky-100 p-4.5 rounded-xl mt-4">
                        Мы предоставляем гибкую систему безопасного медицинского лизинга с первоначальным взносом от 20% и индивидуальную рассрочку.
                      </p>
                    </div>
                  </div>
                )}

                {objectionActiveTab === 'pain' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-sky-600 uppercase">Медицинская безопасность</span>
                    <h4 className="text-2xl font-bold text-slate-900">«А вдруг мы сожжем кожу или причиним адскую боль?»</h4>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                      <p>
                        Этот страх абсолютно оправдан, если клиника покупает дешевый нелицензионный азиатский аналог. Однако ClearLight уберегает врача от врачебных ошибок на трех уровнях:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Модуль подледного сапфира:</strong> Сапфировое рабочее окно манипулы непрерывно охлаждается встроенным полупроводником до -20°C. Пациент чувствует лишь глубокую свежесть и легкие теплые пощипывания.</li>
                        <li><strong>Суб-импульсное деление:</strong> Вспышка не бьет одним сплошным пучком тепла, а дробится на тончайшие суб-импульсы (msec), давая коже остыть в микро-перерыве.</li>
                        <li><strong>Светофильтры с напылением двойного поглощения:</strong> Пропускают сугубо целевой диапазон волны, убирая инфракрасный жесткий спектр, ответственный за термические ожоги эпидермиса.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {objectionActiveTab === 'sanpin' && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-bold text-sky-600 uppercase">Юридическое соответствие кабинета</span>
                      <h4 className="text-2xl font-bold text-slate-900">«Соответствует ли наш кабинет стандартам СанПиН 2.1.3678-20?»</h4>
                      <p className="text-slate-600 text-sm mt-1">Пройдите быстрый интерактивный аудит готовности вашего кабинета прямо сейчас:</p>
                    </div>

                    {!auditSubmitted ? (
                      <form onSubmit={handleAuditSubmit} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Высота потолков в кабинете</label>
                            <select 
                              value={auditHeight} 
                              onChange={(e) => setAuditHeight(e.target.value)}
                              className="w-full bg-white border border-slate-250 p-2.5 rounded text-sm text-slate-800 font-medium"
                            >
                              <option value="2.4">Менее 2.6 метров (проблема)</option>
                              <option value="2.6">2.6 метров (минимально)</option>
                              <option value="2.8">2.8 метров и выше (идеально)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Наличие раковины и ГВС/ХВС</label>
                            <div className="flex gap-4 mt-2">
                              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                <input type="radio" checked={auditSink} onChange={() => setAuditSink(true)} className="accent-sky-600" />
                                Да, есть
                              </label>
                              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                <input type="radio" checked={!auditSink} onChange={() => setAuditSink(false)} className="accent-sky-600" />
                                Нет раковины
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer mt-2">
                            <input 
                              type="checkbox" 
                              checked={auditVentilation} 
                              onChange={(e) => setAuditVentilation(e.target.checked)}
                              className="accent-sky-600 rounded"
                            />
                            Кабинет оснащен приточно-вытяжной вентиляцией / окном с форточкой
                          </label>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors"
                        >
                          Отправить на экспертную оценку
                        </button>
                      </form>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Аудит СанПиН успешно запущен!</span>
                        </div>
                        <p className="text-xs text-emerald-900 leading-relaxed">
                          Наши инженеры проанализировали ваши параметры: Высота ({auditHeight}м), {auditSink ? 'Раковина установлена' : 'Раковина отсутствует (требуется монтаж)'}, {auditVentilation ? 'Вентиляция есть' : 'Вентиляция отсутствует'}. Мы подготовим бесплатное заключение о возможности получения медицинской лицензии на данный кабинет и вышлем вам на WhatsApp в течение 15 минут.
                        </p>
                        <button 
                          onClick={() => setAuditSubmitted(false)}
                          className="text-xxs text-emerald-700 underline font-semibold hover:text-emerald-950"
                        >
                          Изменить параметры кабинета
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {objectionActiveTab === 'service' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-sky-600 uppercase">Отказоустойчивость и сервис</span>
                    <h4 className="text-2xl font-bold text-slate-900">«А если прибор сломается посреди рабочей недели?»</h4>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                      <p>
                        Каждый день простоя косметологического аппарата — это репутационный и денежный урон для собственника. Понимая это, мы внедрили уникальные на рынке СНГ гарантийные протоколы защищенности:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Гарантия предоставления ПОДМЕННОГО АППАРАТА за 24 часа.</strong> Если диагностика и ремонт в нашем лицензированном СЦ длятся более 3-х рабочих дней, мы бесплатно привозим в вашу клинику подменный прибор аналогичного класса. Ваши клиенты пройдут лечение точно по графику.</li>
                        <li><strong>Мобильные выездные инженеры:</strong> Выезд дипломированной ремонтной бригады по сигналу SOS в любую клинику РФ в течение 48 часов с полным набором оригинальных деталей.</li>
                        <li><strong>24/7 Премиум-поддержка:</strong> Чат оперативной связи с шеф-инженером по критическим системным уведомлениям.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {objectionActiveTab === 'learning' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-sky-600 uppercase">Профессиональное обучение</span>
                    <h4 className="text-2xl font-bold text-slate-900">«Нам некого посадить за аппарат/сложно обучить...»</h4>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                      <p>
                        Вам не нужно беспокоиться о квалификации ваших врачей. К каждому поставляемому аппарату ClearLight IPL прилагается комплексная обучающая сессия:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Полностью бесплатный очный курс</strong> для 3-х ваших врачей-косметологов.</li>
                        <li>Обучение проводит сертифицированный клинический эксперт с высшим медицинским образованием (врач-дерматовенеролог).</li>
                        <li><strong>Отработка практических кейсов на живых моделях</strong> в условиях вашей клиники.</li>
                        <li>Выдача персонализированных именных сертификатов EunSung Global, дающих юридическое право на работу с системой фототерапии.</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-500">Задайте любой кастомный вопрос нашему эксперту</span>
                  </div>
                  <button 
                    onClick={() => triggerQuote(product, 'consultation')}
                    className="bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-2.5 px-4.5 rounded-lg transition-colors"
                  >
                    Заказать экспертный разбор
                  </button>
                    Заказать звонок методиста
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* Разделительная линия между блоками */}
          <div className="border-t border-slate-250 my-4 opacity-70"></div>

        {/* РАЗДЕЛ: ДОВЕРИЕ И О КОМПАНИИ ("А вы вообще надежная компания?") */}
        <section id="trust-section" className="scroll-mt-28 space-y-12">
            
            {/* Текст с показателями присутствия и опыта */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-md">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">Опыт. Масштаб. Техническая аккредитация</span>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">«Медоборудование — не бытовая техника. <br/>Покупатель боится однодневок»</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Мы знаем, как страшно инвестировать миллионы в поставщиков, которые завтра сменят юридическое лицо и перестанут отвечать на звонки. Наша компания — это сертифицированный дистрибьютор, присутствующий на медицинском рынке СНГ на протяжении долгих лет. Мы глубоко дорожим нашими клиентами и дорожной картой поставок.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="text-3xl font-black text-sky-600 font-mono">12 лет</h4>
                    <p className="text-xxs text-slate-400 uppercase tracking-wider mt-1 font-bold">Основаны в 2014 году</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-sky-600 font-mono">450+</h4>
                    <p className="text-xxs text-slate-400 uppercase tracking-wider mt-1 font-bold">Поставок в клиники</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-sky-600 font-mono">82 рег.</h4>
                    <p className="text-xxs text-slate-400 uppercase tracking-wider mt-1 font-bold">Присутствие по всей РФ</p>
                  </div>
                </div>
              </div>

              {/* Правая визуализация бренда */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-white/15 pb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">Сертификаты и Гаранты</span>
                </div>
                <div className="space-y-3.5 text-xs font-mono">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">РУ Минздрава России:</span>
                    <span className="text-emerald-400">№ФСЗ 2011/10058</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Декларация соответствия ЕЭС:</span>
                    <span className="text-emerald-400">Соответствует</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Лицензия на сервисную деятельность:</span>
                    <span className="text-emerald-400">№Л016-01140-77/005</span>
                  </p>
                </div>
                <button
                  onClick={handleBrochureDownload}
                  className="w-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                  Скачать пакет документов (PDF)
                </button>
              </div>
            </div>

            {/* Карты инженеров с именами и аккредитацией */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Высококлассная инженерная поддержка</h3>
                <p className="text-slate-500 mt-1">Обученные на заводе EunSung Global в Сеуле специалисты, которые контролируют каждый шаг пусконаладки</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80" 
                      alt="Станислав Дорохов" 
                      className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-block bg-sky-50 text-sky-700 text-[10px] font-bold font-mono px-2 py-0.5 rounded">
                      Lead Clinical Expert
                    </div>
                    <h4 className="text-lg font-bold text-slate-950">Станислав Дорохов</h4>
                    <p className="text-xs text-slate-500">Врач-дерматокосметолог со стажем 14 лет. Старший технолог. Сертифицированный тренер по аппаратным методикам фототерапии.</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80" 
                      alt="Николай Субботин" 
                      className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold font-mono px-2 py-0.5 rounded">
                      Senior Service Engineer
                    </div>
                    <h4 className="text-lg font-bold text-slate-950">Николай Субботин</h4>
                    <p className="text-xs text-slate-500">Дипломированный электрофизик. Прошел очную аттестацию на заводе EunSung Global в Южной Корее. Эксперт по калибровке излучателей IPL.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Реальные поставки и кейсы клиник (trust) */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h4 className="text-xl font-bold tracking-tight">Реализованные кейсы поставок в клиники</h4>
                <MapPin className="w-6 h-6 text-sky-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-slate-850 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">Октябрь 2023 г.</span>
                  <p className="text-xs font-bold">«Областной дерматовенерологический диспансер», г. Новосибирск</p>
                  <p className="text-xxs text-slate-400 leading-relaxed">Поставка 1 IPL-системы ClearLight по госконтракту. Обучено 4 врача. Аппарат работает на полную мощность во вторую смену.</p>
                </div>

                <div className="p-5 bg-slate-850 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">Январь 2024 г.</span>
                  <p className="text-xs font-bold">Клиника эстетической медицины «L’Этуаль Реюв», г. Краснодар</p>
                  <p className="text-xxs text-slate-400 leading-relaxed">Коммерческая поставка ClearLight. Прибор вышел в чистую окупаемость за 9 месяцев эксплуатации за счет процедуры Viel Toning.</p>
                </div>

                <div className="p-5 bg-slate-850 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">Май 2024 г.</span>
                  <p className="text-xs font-bold">Косметологическая сеть «DermArt Плюс», г. Санкт-Петербург</p>
                  <p className="text-xxs text-slate-400 leading-relaxed text-slate-300">Интеграция 2-х аппаратов ClearLight в новые филиалы клиники. Оказана помощь в получении лицензии в рамках нашего регламента сотрудничества.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Разделительная линия между блоками */}
          <div className="border-t border-slate-250 my-4 opacity-70"></div>

        {/* РАЗДЕЛ: FAQ (Вопрос-Ответ) */}
        <section id="faq-section" className="scroll-mt-28 space-y-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight text-center">Часто задаваемые вопросы (FAQ)</h3>
              <p className="text-slate-500 mt-1 text-center">Профессиональная справка по устройству, лицензированию и применению ClearLight IPL</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Имеет ли аппарат ClearLight медицинскую лицензию и РУ в РФ?",
                  a: "Да, безусловно. ClearLight является официальным зарегистрированным медицинским прибором со всеми защитными испытаниями. Номер Регистрационного Удостоверения Минздрава России (Росздравнадзор) — №ФСЗ 2011/10058. Это позволяет клиникам абсолютно легально проходить проверки СанПиН и лицензировать кабинет аппаратной косметологии."
                },
                {
                  q: "Что такое метод Viel Toning («Вуаль красоты»)?",
                  a: "Это эксклюзивное корейское техническое решение, которое делит проходящий световой импульс высокой мощности на суб-микроимпульсы (длительностью в миллионные доли секунд). Метод исключает резкий перегрев рогового слоя и позволяет добиться мгновенного выравнивания цвета лица и сужения пор без боли, покраснения и шелушения."
                },
                {
                  q: "Каков реальный ресурс вспышек у IPL-лампы и манипулы?",
                  a: "Гарантированный ресурс оригинальной кварцевой ксеноновой лампы составляет 100 000 сертифицированных вспышек высокой мощности. По истечении ресурса в нашей сервисной службе производится быстрая замена излучающего элемента, с калибровкой спектра."
                },
                {
                  q: "Каковы требования к помещению для установки прибора?",
                  a: "По СанПиН 2.1.3678-20 кабинет должен иметь площадь от 12-16 м², высоту потолка не менее 2.6 м, обязательно наличие раковины с горячей и холодной водой, а также приточно-вытяжную вентиляцию. Аппарат подключается к стандартной бытовой электросети 220В с заземлением."
                },
                {
                  q: "Чем ClearLight отличается от классических диодных лазеров?",
                  a: "Диодный лазер излучает свет сугубо одной строго заданной длины волны (например, 808 нм), предназначенный исключительно для удаления волос. ClearLight — это широкополосная IPL-система. Благодаря набору сменных фильтров от 430 до 700 нм, прибор решает весь спектр эстетических кожных дефектов: стирает акне, уничтожает пигмент, сливает капиллярную сеть и осуществляет мощнейший коллагеновый термолифтинг."
                }
              ].map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left p-5 font-bold text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180 text-sky-600' : ''}`} />
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-slate-600 bg-slate-50/50 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

      </main>

      {/* Интерактивный блок тест-драйва и визита на реальный работающий объект */}
      <section className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="text-sky-400 font-bold font-mono text-xs uppercase tracking-widest block">Личный визит и тест-драйв</span>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">Посетите действующую клинику-партнер вживую</h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Не верьте рендерам и буклетам. Мы организуем для вас индивидуальный бесплатный визит в открытую клинику, которая приобрела ClearLight и использует его ежедневно. Вы пообщаетесь с главным врачом, зададите любые вопросы технологу и оцените превосходство прибора вживую.
            </p>
          </div>

          {!demoSubmitted ? (
            <form onSubmit={handleDemoSubmit} className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <select 
                value={demoCity} 
                onChange={(e) => setDemoCity(e.target.value)}
                className="bg-slate-950 text-white border border-white/20 p-3 text-sm rounded-xl font-bold"
              >
                <option value="Москва">Москва</option>
                <option value="Санкт-Петербург">Санкт-Петербург</option>
                <option value="Краснодар">Краснодар</option>
                <option value="Казань">Казань</option>
                <option value="Новосибирск">Новосибирск</option>
              </select>
              <input 
                type="date" 
                value={demoDate} 
                onChange={(e) => setDemoDate(e.target.value)}
                className="bg-slate-950 text-white border border-white/20 p-3 text-sm rounded-xl font-mono text-center"
                required
              />
              <button 
                type="submit" 
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3 px-4 rounded-xl uppercase tracking-wider transition-all"
              >
                Записаться на визит
              </button>
            </form>
          ) : (
            <div className="bg-sky-500/10 border border-sky-500/20 max-w-lg mx-auto p-6 rounded-2xl space-y-3">
              <p className="font-bold text-sky-400">Заявка зафиксирована, {demoName}!</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Координатор свяжется с главврачом клиники-партнера в г. {demoCity} для согласования вашего индивидуального визита на {demoDate || 'ближайшее время'}. Мы организуем трансфер и покажем вам весь цикл работы.
              </p>
              <div className="pt-2 border-t border-sky-500/10 text-xs text-sky-300">
                Телефон для подтверждения: <span className="font-mono text-white underline">{demoPhone}</span>
              </div>
            </div>
          )}

          <p className="text-xxs text-slate-400">
            * Один такой визит снимает до 95% страхов и сомнений относительно надежности поставщика и корейской сборки.
          </p>
        </div>
      </section>

      {/* Форма захвата с подарком */}
      <section className="bg-white py-16 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-indigo-600 font-bold text-xs font-mono tracking-widest uppercase block">Полезный подарок руководителю</span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">Получите персональное коммерческое предложение и подарок</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Оставьте заявку на подбор индивидуальной комплектации ClearLight IPL. Вместе с коммерческим предложением мы подарим вам закрытое методическое руководство **«Руководство по прибыльному внедрению систем широкополосного света в клиниках эстетической косметологии»** (PDF книга, 48 стр.).
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600">
                  <strong>Скачивание РУ и Декларации соответствия Минздрава</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600">
                  <strong>Маркетинговые материалы, инстаграм-паки до/после в подарок</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-md">
            {!formSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <h4 className="text-lg font-bold text-slate-900">Запросить комплект ClearLight IPL</h4>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Имя руководителя или клиники</label>
                  <input 
                    type="text" 
                    placeholder="Александр, клиника «Эстетик»" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-slate-250 p-3 rounded-lg text-sm text-slate-800"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Номер телефона (для КП на WhatsApp)</label>
                  <input 
                    type="tel" 
                    placeholder="+7 (999) 123-45-67" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-white border border-slate-250 p-3 rounded-lg text-sm text-slate-800 font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Выберите гарантированный подарок</label>
                  <select 
                    value={formGift} 
                    onChange={(e) => setFormGift(e.target.value)}
                    className="w-full bg-white border border-slate-250 p-3 rounded-lg text-sm text-slate-800 font-medium"
                  >
                    <option value="pdf_handbook">Книга «Руководство по фототерапии в клинике»</option>
                    <option value="calc_xls">Шаблон Excel калькулятора загрузки кабинета</option>
                    <option value="marketing_pack">Набор готовых баннеров для соцсетей клиники</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-colors shadow-md hover:shadow-lg"
                >
                  Получить расчет КП и гарантированный подарок
                </button>

                <p className="text-[10px] text-slate-400 text-center">
                  Нажимая кнопку, вы соглашаетесь с Политикой обработки персональных данных в рамках ФЗ РФ №152.
                </p>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-slate-900">Заявка успешно принята!</h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                    Спасибо, {formName}! Наши ведущие методисты уже подготавливают спецификацию КП для ClearLight IPL. PDF файл с гарантированным подарком отправлен на номер {formPhone} через мессенджер.
                  </p>
                </div>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-sky-600 underline font-semibold hover:text-sky-800"
                >
                  Отправить еще одну заявку
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Футер лендинга */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-bold text-white text-sm">ClearLight IPL — Эстетическая Платформа Нового Поколения</p>
            <p>Эксклюзивное производство EunSung Global Co., Ltd., Южная Корея.</p>
            <p className="text-[10px]">Регистрационное Удостоверение Росздравнадзора ФСЗ 2011/10058 от 01.11.2011 г.</p>
          </div>
          <p className="text-right max-w-xs text-[10px] leading-relaxed">
            Данный сайт носит сугубо рекламный и ознакомительный характер, информация не является публичной офертой, определяемой положениями ст. 437 ГК РФ.
          </p>
        </div>
      </footer>

      {/* Модальное окно подтверждения записи на индивидуальный визит и тест-драйв */}
      {isDemoModalOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          id="demo-visit-modal-overlay"
        >
          <div 
            className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-2xl shadow-2xl relative overflow-hidden text-left p-6 md:p-8 space-y-6"
            id="demo-visit-modal-container"
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                logger.info('Пользователь закрыл модальное окно записи на визит без сохранения');
                setIsDemoModalOpen(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-slate-800/50 rounded-lg"
              id="demo-modal-close-btn"
              aria-label="Закрыть окно"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Иконка и Заголовки */}
            <div className="space-y-2 text-center" id="demo-modal-header">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 font-bold animate-pulse">
                <Phone className="w-6 h-6 text-sky-400" />
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight leading-snug">Подтверждение записи</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Без телефонного звонка мы не сможем согласовать и забронировать пропуск в действующую клинику. Пожалуйста, оставьте ваш контакт.
              </p>
            </div>

            {/* Выбранные опции */}
            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 space-y-2 text-xs text-slate-300" id="demo-modal-details">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">📍 Город проведения:</span>
                <span className="text-sky-400 font-bold font-mono">{demoCity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">📅 Желаемая дата:</span>
                <span className="text-white font-bold font-mono">
                  {demoDate ? new Date(demoDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Ближайшая дата'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/60">
                <span className="text-slate-500 font-medium">⚡ Формат визита:</span>
                <span className="text-emerald-400 font-bold">Индивидуальный тест-драйв</span>
              </div>
            </div>

            {/* Форма подтверждения */}
            <form onSubmit={handleDemoConfirm} className="space-y-4" id="demo-modal-form">
              {/* Поле Имя */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ваше имя</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Александр Дмитриевич"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl p-3 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Поле Телефон */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Номер телефона (для звонка координатора)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 123-45-67"
                    value={demoPhone}
                    onChange={(e) => setDemoPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl p-3 pl-10 text-sm text-white placeholder-slate-600 font-mono focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-2"
                id="demo-modal-submit-btn"
              >
                <span>Подтвердить запись и забронировать</span>
              </button>

              <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                Нажимая на кнопку, вы даете согласие на обработку персональных данных в соответствии с ФЗ РФ №152. Данные передаются по защищенному SSL-каналу.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
