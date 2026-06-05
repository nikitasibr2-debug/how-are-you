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
  ShieldAlert
} from 'lucide-react';
import { Product, Article } from '../types';
import albumImages from '../data/duet_v_album_images.json';
import { logger } from '../lib/logger';

interface DuetVLandingProps {
  product: Product;
  articles: Article[];
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  triggerQuote: (product: Product, type: 'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey') => void;
  onBackToCatalog: () => void;
}

export const DuetVLanding: React.FC<DuetVLandingProps> = ({
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

  // Local States for interactive landing blocks
  const [activeTech, setActiveTech] = useState<'ntts' | 'afmr' | 'gynae'>('ntts');
  const [activeCase, setActiveCase] = useState<'lifting' | 'pimples' | 'neck' | 'intimate'>('lifting');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedPack, setSelectedPack] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // New objection-handling and conversion multiplier states
  const [cosmoObjectionTab, setCosmoObjectionTab] = useState<'roi' | 'sanpin' | 'timeline' | 'service' | 'demo'>('roi');
  const [selectedKPConsultant, setSelectedKPConsultant] = useState<'technologist' | 'engineer'>('technologist');
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);
  const [demoDaySubmitted, setDemoDaySubmitted] = useState<boolean>(false);
  const [auditHeight, setAuditHeight] = useState<string>('2.6');
  const [auditVentilation, setAuditVentilation] = useState<boolean>(true);
  const [auditWater, setAuditWater] = useState<boolean>(true);

  // New sizer states for cost calculator
  const [calcArea, setCalcArea] = useState<number>(35);
  const [calcProcedures, setCalcProcedures] = useState<string[]>(['rf', 'laser']);
  const [calcCabinets, setCalcCabinets] = useState<number>(2);

  // New states for marketing images and booklets
  const [heroImageKey, setHeroImageKey] = useState<string>("Front-1.png");
  const [bookletPage, setBookletPage] = useState<number>(0);

  // Brochures list compiled from user's Yandex Disk booklet pages
  const brochuresList = useMemo(() => [
    { title: "Страница 1: Платформа Duet V (EunSung)", img: albumImages["обзор + АО0001.png"], desc: "Презентация возможностей радиочастотного омоложения EunSung Global" },
    { title: "Страница 2: Эстетический RF-лифтинг лица", img: albumImages["обзор + 2.png"], desc: "Протоколы монополярного распределения нагрева NTTS" },
    { title: "Страница 3: Фракционный и СМАС-эффект", img: albumImages["обзор + А3.png"], desc: "Сравнение абляционных технологий и фракционного RF" },
    { title: "Страница 4: Корейский протокол лифтинга кожи", img: albumImages["обзор + А4.png"], desc: "Подробное руководство по параметрам энергии и импульсов" },
    { title: "Страница 5: Анатомия манипул и датчиков", img: albumImages["обзор + А5.png"], desc: "Техническое устройство и расходные материалы насадок" },
    { title: "Страница 6: Клинические результаты и уход", img: albumImages["обзор + АО0013.png"], desc: "Рекомендации по ведению пациентов и восстановительному периоду" }
  ].filter(b => b.img), []);

  // ROI Calculator States
  const [patientsPerDay, setPatientsPerDay] = useState<number>(3);
  const [treatmentPrice, setTreatmentPrice] = useState<number>(8500);

  // Interactive Lead Form mock states
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [giftSelected, setGiftSelected] = useState<string>('pdf_guide');

  // Filter Blog articles regarding Duet V and RF lifting
  const duetVArticles = useMemo(() => {
    return articles.filter(a => 
      a.id.includes('rf') || 
      a.id.includes('duet-v') || 
      a.id.includes('lifting') || 
      a.id.includes('non-operational') || 
      a.id.includes('cosmetology')
    );
  }, [articles]);

  const activeArticle = useMemo(() => {
    if (!activeArticleId) return null;
    return articles.find(a => a.id === activeArticleId) || null;
  }, [activeArticleId, articles]);

  // Calculations for ROI
  const calculations = useMemo(() => {
    const costPerTreatment = 350; // gel, sanitation
    const revenuePerDay = patientsPerDay * treatmentPrice;
    const revPerMonth = revenuePerDay * 22; // 22 working days
    const profitPerTreatment = treatmentPrice - costPerTreatment;
    const monthlyNetProfit = Math.round(patientsPerDay * profitPerTreatment * 22 * 0.8); // 20% taxes/staff commission
    const appCost = 3200000; // Duet V cost
    const paybackMonths = Number((appCost / (monthlyNetProfit || 1)).toFixed(1));
    const annualNetIncome = monthlyNetProfit * 12;

    return {
      revenuePerDay,
      revPerMonth,
      monthlyNetProfit,
      paybackMonths,
      annualNetIncome
    };
  }, [patientsPerDay, treatmentPrice]);

  // Clinical Case Data mapper
  const clinicalCases = {
    lifting: {
      title: "Глубокое термо-ремоделирование и лифтинг овала лица",
      description: "Пациентка 46 лет. Проблема: гравитационный птоз, обвисание щечной зоны («брыли»), нечеткий контур нижней челюсти. Проведено 3 сеанса монополярного RF насадкой NTTS на аппарате Duet V.",
      stats: "Сокращение избытков кожи на 38%, подтяжка овала лица, восстановление угла молодости до 110 градусов без реабилитации.",
      img: albumImages["01.jpg"] || "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&h=400&q=80",
      param: "Энергия: 65 Дж/см², Насадка NTTS-300, 420 импульсов на лицо и шею."
    },
    pimples: {
      title: "Лечение рубцов постакне и сокращение пор",
      description: "Пазиент 24 года. Выраженные атрофические рубцы, расширенные поры в Т-зоне после перенесенной угревой сыпи тяжелой степени. Проведено 2 процедуры фракционного RF (AFMR).",
      stats: "Сглаживание глубины рубчиков на 62%, сужение устьев пор на 45%, выравнивание общего светоотражения кожи.",
      img: albumImages["03.jpg"] || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&h=400&q=80",
      param: "Манипула AFMR-64, статический режим, энергия 15 Вт, длительность импульса 120 мс."
    },
    neck: {
      title: "Устранение дряблости шеи и колец Венеры",
      description: "Пациентка 52 года. Тонкая атоничная дряблая кожа шеи, глубокие поперечные складки («кольца Венеры»). Проведено 4 сеанса комбинированного RF лечения (NTTS + AFMR на шею).",
      stats: "Уплотнение («компактизация») кожи на 32%, разглаживание глубины заломов, стимуляция тонуса платизмы.",
      img: albumImages["10,07-1.jpg"] || "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&h=400&q=80",
      param: "Монополярный прогрев NTTS-200 + фракционная обработка AFMR-100 на минимальных параметрах."
    },
    intimate: {
      title: "Интимная реабилитация и вагинальный лифтинг",
      description: "Пациентка 34 года, двое естественных родов. Жалобы на сухость слизистой, снижение тонуса интимных мышц и деликатное стрессовое недержание при кашле. Проведено 3 процедуры насадкой Duet Gynae.",
      stats: "Полное купирование сухости слизистой (pH восстановлен до 4.2), укрепление передней стенки, 100% исчезновение симптомов инконтиненции.",
      img: albumImages["ИГ-1.jpg"] || "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&h=400&q=80",
      param: "Специализированный вагинальный датчик, режим плавного динамического монополяра, 39°C целевая температура."
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormSubmitted(true);
    // Submit logging or simulation
    console.log("Lead captured:", { formName, formPhone, formEmail, giftSelected });
  };

  return (
    <div className="space-y-16 animate-fade-in text-slate-900 font-sans" id="duet-v-landing-root">
      
      {/* breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-rose-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={onBackToCatalog}
            className="flex items-center justify-center gap-2 text-slate-705 hover:text-slate-900 transition group cursor-pointer border border-slate-205 bg-white py-2 px-4 rounded-xl hover:bg-slate-50 text-xs font-bold shrink-0 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Вернуться в каталог
          </button>
          <div className="text-xs text-slate-400 font-medium font-sans flex items-center gap-1.5 flex-wrap px-1">
            <span onClick={onBackToCatalog} className="hover:text-slate-950 hover:underline transition cursor-pointer">Главная</span>
            <span className="text-slate-300">/</span>
            <span onClick={onBackToCatalog} className="hover:text-slate-950 hover:underline transition cursor-pointer">Каталог</span>
            <span className="text-slate-300">/</span>
            <span onClick={onBackToCatalog} className="hover:text-slate-950 hover:underline transition cursor-pointer">Косметология</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-705 font-bold text-slate-700 truncate max-w-[240px] sm:max-w-none">{product.name}</span>
          </div>
        </div>
        <div className="flex gap-2.5 w-full md:w-auto justify-between sm:justify-start">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${favorites.includes(product.id) ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{favorites.includes(product.id) ? 'В избранном' : 'В избранное'}</span>
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${compareList.includes(product.id) ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{compareList.includes(product.id) ? 'В сравнении' : 'Добавить к сравнению'}</span>
          </button>
        </div>
      </div>

      {/* BLOCK 1: HERO (ШАПКА & ПЕРВЫЙ ЭКРАН) */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Официальный дистрибьютор EunSung Global в РФ • РУ Минздрава</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black leading-[1.1] tracking-tight">
              {product.name} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
                Ремоделирование кожи и лифтинг без операции
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Зарабатывайте от 550 000 ₽ чистой прибыли на базе одной процедуры фракционного и монополярного RF-лифтинга. Привлечение пациентов без реабилитации и быстрая окупаемость за 3 месяца.
            </p>

            {/* Quick specifications icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-800">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">Частоты</div>
                <div className="text-sm font-black text-white mt-1">1 МГц и 4 МГц</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">Технологии</div>
                <div className="text-sm font-black text-cyan-400 mt-1">NTTS + AFMR</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">Гинекология</div>
                <div className="text-sm font-black text-rose-400 mt-1">Duet Gynae</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button 
                onClick={() => triggerQuote(product, 'kp')}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg shadow-cyan-950/40 transition-all cursor-pointer flex items-center gap-2 group border-none"
              >
                <span>ПОЛУЧИТЬ КП НА DUET V</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button 
                onClick={() => triggerQuote(product, 'consultation')}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-xs sm:text-sm px-6 py-4 rounded-xl transition cursor-pointer"
              >
                Забронировать Тест-Драйв
              </button>
            </div>
          </div>

          {/* Core Device Interactive Gallery representation (marketing driven) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 rounded-3xl shadow-2xl overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl"></div>
              
              <div className="absolute top-4 left-4 bg-rose-600 text-white px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 z-10 animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>НОВИНКА ИЗ КОРЕИ</span>
              </div>

              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 relative mb-4 border border-slate-800 flex items-center justify-center p-2">
                <img 
                  src={albumImages[heroImageKey as keyof typeof albumImages] || product.images[0]} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500 brightness-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4">
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">EunSung Global Corp</span>
                  <div className="text-xs font-bold text-slate-200 leading-snug mt-1">Оригинальный аппарат с регистрацией Минздрава РФ</div>
                </div>
              </div>

              {/* Premium interactive selector buttons for photos */}
              <div className="grid grid-cols-5 gap-1.5 mb-4 border-b border-slate-800 pb-3">
                {[
                  { key: "Front-1.png", label: "Фронт" },
                  { key: "Pers_blue.png", label: "3D Вид" },
                  { key: "Pers_UI.png", label: "Экран" },
                  { key: "DUET V насадка вагинальная V-2 tip (L).png", label: "Насадка" },
                  { key: "DUET V манипула для лица, шеи и тела.png", label: "Манипула" }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setHeroImageKey(item.key)}
                    className={`p-1 border rounded-lg text-[9px] font-bold transition flex flex-col items-center justify-center cursor-pointer ${heroImageKey === item.key ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <img
                      src={albumImages[item.key as keyof typeof albumImages]}
                      alt={item.label}
                      className="w-5 h-5 object-contain rounded bg-slate-950/30 mb-1"
                      referrerPolicy="no-referrer"
                    />
                    <span className="truncate max-w-[50px] font-sans text-[8px]">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2 p-1 text-slate-300">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 font-mono">АРТИКУЛ: {product.article}</span>
                  <span className="font-extrabold text-cyan-400 uppercase">В наличии в Москве</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-xl sm:text-2xl font-black text-white">{(product.price).toLocaleString()} ₽</div>
                  <div className="text-xs text-slate-500 line-through">{(product.oldPrice || 3500000).toLocaleString()} ₽</div>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Доступен кредит и лизинг от 78 000 ₽ / мес (аванс от 10%)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 2: БОЛЬ КЛИЕНТА (МАРКЕТИНГОВЫЙ БЛОК) */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Эстетический бизнес в России 2026</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            С какими проблемами сталкиваются клиники и салоны красоты?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Конкуренция растет, а покупательская способность требует качественных неинвазивных альтернатив дорогой пластике.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 pt-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-lg">01</div>
              <h3 className="font-bold text-sm text-slate-900">Уходят лояльные пациенты</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Пациенты не хотят терпеть 7 дней реабилитации после игольчатого лифтинга и уходят в клиники с более щадящими технологиями.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold font-mono">РЕШЕНИЕ: Duet V AFMR без анестезии</div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-lg">02</div>
              <h3 className="font-bold text-sm text-slate-900">Высокая цена расходников</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Дорогие картриджи забирают до 50% прибыли с процедуры, делая окупаемость заоблачной и съедая кассу клиники.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold font-mono">РЕШЕНИЕ: Себестоимость сеанса всего 350 ₽</div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-lg">03</div>
              <h3 className="font-bold text-sm text-slate-900">Пустует кабинет гинеколога</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Гинекология привязана к осмотрам, хотя интимная пластика и безоперационный вагинальный лифтинг — золотая жила.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold font-mono">РЕШЕНИЕ: Манипула Duet Gynae в комплекте</div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-lg">04</div>
              <h3 className="font-bold text-sm text-slate-900">Риск штрафов за прибор без РУ</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Росздравнадзор ужесточил проверки. Аппараты без РУ ведут к колоссальным штрафам и риску конфискации / закрытия салона.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold font-mono">РЕШЕНИЕ: 100% официальное РУ РФ в коробке</div>
          </div>
        </div>
      </section>

      {/* BLOCK 3: ЧТО ТАКОЕ АППАРАТ (ИНТЕРАКТИВНЫЕ МАНИПУЛЫ/ТЕХНОЛОГИИ) */}
      <section className="grid lg:grid-cols-12 gap-10 items-center bg-slate-50 p-6 sm:p-12 rounded-3xl border border-slate-100" id="technology-block">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">Научное обоснование</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            2 ведущие радиочастотные технологии в одной системе Duet V
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Переключайте вкладки, чтобы понять физику и глубину воздействия каждого аппликатора оригинальной корейской платформы.
          </p>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => setActiveTech('ntts')}
              className={`p-4 text-left rounded-xl border flex items-center justify-between transition cursor-pointer ${activeTech === 'ntts' ? 'bg-white border-cyan-200 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-100'}`}
            >
              <div>
                <div className="font-extrabold text-sm text-slate-900">Монополярный RF (NTTS)</div>
                <div className="text-xs text-slate-500 mt-0.5 mt-1 font-medium">Глубокий объемный термолифтинг коллагена</div>
              </div>
              <ChevronRight className={`w-4 h-4 text-cyan-500 transition-transform ${activeTech === 'ntts' ? 'translate-x-1' : ''}`} />
            </button>

            <button
              onClick={() => setActiveTech('afmr')}
              className={`p-4 text-left rounded-xl border flex items-center justify-between transition cursor-pointer ${activeTech === 'afmr' ? 'bg-white border-cyan-200 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-100'}`}
            >
              <div>
                <div className="font-extrabold text-sm text-slate-900">Фракционный биполярный RF (AFMR)</div>
                <div className="text-xs text-slate-500 mt-0.5 mt-1 font-medium">Безоперационная коагуляция, сужение пор и рубцов</div>
              </div>
              <ChevronRight className={`w-4 h-4 text-cyan-500 transition-transform ${activeTech === 'afmr' ? 'translate-x-1' : ''}`} />
            </button>

            <button
              onClick={() => setActiveTech('gynae')}
              className={`p-4 text-left rounded-xl border flex items-center justify-between transition cursor-pointer ${activeTech === 'gynae' ? 'bg-white border-cyan-200 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-100'}`}
            >
              <div>
                <div className="font-extrabold text-sm text-slate-900">Интимная манипула Duet Gynae</div>
                <div className="text-xs text-slate-500 mt-0.5 mt-1 font-medium">Нехирургическое омоложение стенок влагалища</div>
              </div>
              <ChevronRight className={`w-4 h-4 text-cyan-500 transition-transform ${activeTech === 'gynae' ? 'translate-x-1' : ''}`} />
            </button>
          </div>
        </div>

        {/* Interactive Visualization Output with Real Products & Tech Photos */}
        <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-6 space-y-6 shadow-sm">
          {activeTech === 'ntts' && (
            <div className="space-y-4 animate-fade-in animate-duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider bg-cyan-700 border border-slate-300 text-white px-2 py-1 rounded font-mono">Монополярное излучение</span>
                <span className="text-xs font-mono font-bold text-slate-500">Глубина: до 4.5 мм</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 h-44 bg-slate-900 rounded-xl relative overflow-hidden p-4 flex flex-col justify-end text-white border border-slate-800">
                  <img src={albumImages["rf_duet_v_thermal_img.jpg"]} alt="NTTS Thermal Transfer" className="absolute inset-0 w-full h-full object-cover opacity-50 select-none" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="relative z-10 space-y-0.5">
                    <div className="text-[9px] font-bold text-rose-400 font-mono">SYSTEM: NTTS THERMAL TRANSFER</div>
                    <div className="text-xs font-black">Стяжка морщин до уровня СМАС</div>
                    <p className="text-[9px] text-slate-300 leading-tight">Объемный прогрев дермы до 42°C респирализует коллаген.</p>
                  </div>
                </div>
                <div className="col-span-2 h-44 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200/60 flex items-center justify-center p-3">
                  <img src={albumImages["DUET V манипула для лица, шеи и тела.png"]} alt="NTTS Manipula" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Манипула NTTS</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Мгновенный эффект:</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Лицо разглаживается сразу во время сеанса за счет теплового сжатия («спирализации») коллагеновых нитей.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Пролонгированный неоколлагенез:</span>
                  <p className="text-xs text-slate-500 leading-relaxed">В течение 8-12 недель спящие фибробласты просыпаются и синтезируют новые пласты молодого коллагена.</p>
                </div>
              </div>
            </div>
          )}

          {activeTech === 'afmr' && (
            <div className="space-y-4 animate-fade-in animate-duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-700 border border-slate-300 text-white px-2 py-1 rounded font-mono">Фракционный биполярный RF</span>
                <span className="text-xs font-mono font-bold text-slate-500">Глубина: до 1.8 мм</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 h-44 bg-slate-900 rounded-xl relative overflow-hidden p-4 flex flex-col justify-end text-white border border-slate-800">
                  <img src={albumImages["rf_duet_v_fract_img.jpg"]} alt="AFMR Bipolar Grid" className="absolute inset-0 w-full h-full object-cover opacity-50 select-none" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="relative z-10 space-y-0.5">
                    <div className="text-[9px] font-bold text-emerald-400 font-mono">SYSTEM: AFMR BI-POLAR MATRIX</div>
                    <div className="text-xs font-black">64 или 100 точек коагуляции</div>
                    <p className="text-[9px] text-slate-300 leading-tight">Радиочастотные дуги сужают поры и убирают рубцы без ран.</p>
                  </div>
                </div>
                <div className="col-span-2 h-44 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200/60 flex items-center justify-center p-3">
                  <img src={albumImages["DUET V насадка вагинальная V-1 tip (S).png"]} alt="AFMR tip structure" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Насадка Tip (S)</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Плюсы технологии AFMR:</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Полное отсутствие хирургического риска, стерильные сменные датчики, малый период восстановления.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Идеальные показания:</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Глубокие поры, неровности кожи, шрамы постакне, растяжки-стрии, землистый тусклый цвет лица.</p>
                </div>
              </div>
            </div>
          )}

          {activeTech === 'gynae' && (
            <div className="space-y-4 animate-fade-in animate-duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-750 border border-slate-300 text-white px-2 py-1 rounded font-mono">Интимная гинекология</span>
                <span className="text-xs font-mono font-bold text-slate-500">Глубина: до 3.0 мм</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 h-44 bg-slate-900 rounded-xl relative overflow-hidden p-4 flex flex-col justify-end text-white border border-slate-800 font-sans">
                  <img src={albumImages["DUET V насадка вагинальная V-2 tip (L).png"]} alt="Gynae probe schematic" className="absolute inset-0 w-full h-full object-contain opacity-35 p-3 select-none" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>
                  <div className="relative z-10 space-y-0.5">
                    <div className="text-[9px] font-bold text-rose-400 font-mono">SYSTEM: DUET GYN PHYSIOTHERAPY</div>
                    <div className="text-xs font-black">360° Интимное Сжатие и Лифтинг</div>
                    <p className="text-[9px] text-slate-300 leading-tight">Деликатное омоложение слизистой влагалища и стенок мочевого пузыря.</p>
                  </div>
                </div>
                <div className="col-span-2 h-44 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200/60 flex items-center justify-center p-3">
                  <img src={albumImages["DUET V манипула вагинальная.png"]} alt="Gynae probe actual device" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Манипула Gynae</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Стерильная безопасность:</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Каждая пациентка приобретает индивидуальную вагинальную насадку. Исключена перекрестная контаминация.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Терапевтический эффект:</span>
                  <p className="text-xs text-slate-550 leading-relaxed">Нормализация флоры влагалища, лечение сухости в менопаузе, устранение стрессового подтекания мочи.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BLOCK 4: ЦИФРЫ И ФАКТЫ (ОКУПАЕМОСТЬ & МАРЖИНАЛЬНОСТЬ) */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">АКЦЕНТ НА ДОХОД КЛИНИКИ</span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              Бизнес-показатели и доходность
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Аппаратная RF-косметология на Duet V является высокомаржинальной услугой с рекордно низким расходом материалов и высокой стабильной загрузкой.
            </p>
            <div className="pt-4 flex gap-4">
              <div>
                <div className="text-2xl font-black text-emerald-400">&gt; 310%</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Маржинальность сеанса</div>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <div className="text-2xl font-black text-cyan-400">3-4 мес</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Реальный срок окупаемости</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/60 space-y-2">
              <div className="text-xs text-slate-500 font-mono uppercase">Рекомендованный тариф</div>
              <div className="text-xl sm:text-2xl font-black text-rose-400">8 500 ₽</div>
              <p className="text-[11px] text-slate-400">Средняя стоимость процедуры RF-лифтинга лица на корейском аппарате по регионам РФ.</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/60 space-y-2">
              <div className="text-xs text-slate-500 font-mono uppercase">Расходники на 1 сеанс</div>
              <div className="text-xl sm:text-2xl font-black text-cyan-400">350 ₽</div>
              <p className="text-[11px] text-slate-400">Контактный гель, дезинфекция насадки. Сверхдешевая амортизация по сравнению с CO2 лазерами.</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/60 space-y-2">
              <div className="text-xs text-slate-500 font-mono uppercase">Чистая выгода слота</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">6 450 ₽</div>
              <p className="text-[11px] text-slate-400">Доход с процедуры за вычетом расходных материалов и стандартной оплаты труда косметолога.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 5: РЕЗУЛЬТАТЫ ДО / ПОСЛЕ (ИНТЕРАКТИВНЫЕ КЕЙСЫ) */}
      <section className="space-y-8 bg-slate-50/50 rounded-3xl p-6 sm:p-10 border border-slate-100" id="cases-section">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block text-center">Доказательная база</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center">
            Результаты лечения: 4 реальных макро-протокола
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm text-center">
            Никакого стокового ретушированного глянца. Только оригинальные снимки и терапевтические метрики из клиники.
          </p>
        </div>

        {/* Case Categories Tabs selector */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setActiveCase('lifting')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${activeCase === 'lifting' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Лифтинг овала (NTTS)
          </button>
          <button 
            onClick={() => setActiveCase('pimples')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${activeCase === 'pimples' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Рубцы Постакне (AFMR)
          </button>
          <button 
            onClick={() => setActiveCase('neck')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${activeCase === 'neck' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Дряблость Шеи
          </button>
          <button 
            onClick={() => setActiveCase('intimate')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${activeCase === 'intimate' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Интимное Омоложение
          </button>
        </div>

        {/* Dynamic Interactive Case View Output */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 grid lg:grid-cols-12 gap-8 items-center shadow-sm">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
              {clinicalCases[activeCase].title}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {clinicalCases[activeCase].description}
            </p>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
              <div className="text-[11px] text-slate-400 uppercase font-mono font-bold">Клинический результат (3 месяца):</div>
              <div className="text-sm font-extrabold text-indigo-700">{clinicalCases[activeCase].stats}</div>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold font-mono">
              <span className="text-slate-500">ПРОТОКОЛ ВРАЧА:</span> {clinicalCases[activeCase].param}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-inner relative border border-slate-100">
              <img 
                src={clinicalCases[activeCase].img} 
                alt={clinicalCases[activeCase].title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-4 text-white flex justify-between items-center text-xs font-bold">
                <span>Пациент медицинского центра до и после курса лечения</span>
                <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px]">Курс завершен</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 6: ПОЧЕМУ НАШ АППАРАТ (6 ПРЕИМУЩЕСТВ С ИКОНКАМИ) */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Премиальные выгоды AstMed</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            6 веских преимуществ выбрать оригинальную систему Duet V
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Мы поставляем только сертифицированную технику с полной пост-продажной сервисной поддержкой в РФ.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 bg-cyan-50 text-cyan-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">100% Оригинал с РУ Минздрава</h3>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-500">
                Защита вашей медицинской лицензии. Все аппараты корейского бренда EunSung поставляются с полным пакетом документов, РУ и декларациями соответствия.
              </p>
            </div>
            <div className="text-[10px] text-cyan-600 font-mono font-bold">БЕЗУПРЕЧНАЯ ЮРИДИЧЕСКАЯ ЧИСТОТА</div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 bg-rose-50 text-rose-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Интеллектуальная защита</h3>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-500">
                Максимальная защита от ошибок врача. Датчики импеданса и контроля температуры кожи прекращают подачу энергии при достижении 42°C, спасая от ожогов.
              </p>
            </div>
            <div className="text-[10px] text-rose-600 font-mono font-bold">БЕЗОПАСНОСТЬ ПАЦИЕНТА №1</div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Супербыстрая окупаемость</h3>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-500">
                Всего 3 процедуры на аппарате Duet V в день приносят свыше 550 000 ₽ чистыми в месяц. Полный возврат инвестиций достигается менее чем за 4 месяца!
              </p>
            </div>
            <div className="text-[10px] text-emerald-600 font-mono font-bold">АКТИВНЫЙ БИЗНЕС-ВЫХЛОП</div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 bg-yellow-50 text-yellow-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Многофункциональный апгрейд</h3>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-500">
                Запускайте сразу три направления (монополярный термолифтинг, заживление рубцов и интимную реабилитацию) без необходимости покупки 3 отдельных приборов.
              </p>
            </div>
            <div className="text-[10px] text-yellow-600 font-mono font-bold">ЭКОНОМИЯ НА КАПИТАЛЬНЫХ ЗАТРАТАХ</div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">2 года гарантии и сервис в РФ</h3>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-500">
                Никаких простоев кабинета. Собственная команда лицензированного сервисного центра АстМед оперативно выезжает для технического обслуживания.
              </p>
            </div>
            <div className="text-[10px] text-indigo-600 font-mono font-bold">НАДЕЖНЫЙ СЕРВИСНЫЙ ТЫЛ</div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 bg-purple-50 text-purple-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Бесплатное обучение врачей</h3>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-500">
                При покупке аппарата мы дарим профессиональную программу обучения для 2 косметологов вашей клиники с выдачей именных сертификатов EunSung.
              </p>
            </div>
            <div className="text-[10px] text-purple-600 font-mono font-bold">АППЛИКАЦИОННЫЙ СТАРТ ПОД КЛЮЧ</div>
          </div>
        </div>
      </section>

      {/* BLOCK 7: КАЛЬКУЛЯТОР ОКУПАЕМОСТИ (ИНТЕРАКТИВНЫЙ СЛАЙДЕР С РАСЧЕТОМ) */}
      <section className="bg-slate-50 p-6 sm:p-10 border border-slate-150 rounded-3xl" id="roi-calculator">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-green-700 font-mono uppercase bg-green-50 px-2 py-1 rounded">Интерактивный планер</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Интерактивный калькулятор доходности Duet V
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Двигайте ползунки, чтобы в реальном времени рассчитать персональный срок самоокупаемости и чистую годовую прибыль от владения аппаратом.
              </p>
            </div>

            {/* Slider 1: patients per day */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-700 uppercase">Пациентов в день:</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-black text-rose-600 font-mono">{patientsPerDay} пациентов</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={patientsPerDay}
                onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold font-mono">
                <span>1 пациент</span>
                <span>10 пациентов</span>
              </div>
            </div>

            {/* Slider 2: treatment price */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-700 uppercase">Прайс одной процедуры:</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-black text-cyan-600 font-mono">{(treatmentPrice).toLocaleString()} ₽</span>
              </div>
              <input 
                type="range" 
                min="3000" 
                max="15000" 
                step="5000" // 3000, 8000 (avg), 13000, 15000
                value={treatmentPrice}
                onChange={(e) => setTreatmentPrice(Number(e.target.value))}
                className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold font-mono">
                <span>3 000 ₽</span>
                <span>15 000 ₽</span>
              </div>
            </div>
          </div>

          {/* Calculator Output calculations layout */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-850 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div className="text-center pb-4 border-b border-slate-800 space-y-1">
              <div className="text-xs text-slate-500 uppercase font-mono font-bold tracking-wider">Чистая прибыль за месяц</div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                {(calculations.monthlyNetProfit).toLocaleString()} ₽ / мес
              </div>
              <p className="text-[10px] text-slate-400">Данные рассчитаны по формуле: 22 рабочих дня, за вычетом 20% на расходники и KPI врача.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-[9px] text-slate-500 uppercase font-mono">Выручка в день</div>
                <div className="text-sm font-black text-white font-mono mt-0.5">{(calculations.revenuePerDay).toLocaleString()} ₽</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-[9px] text-slate-500 uppercase font-mono">Выручка в месяц</div>
                <div className="text-sm font-black text-white font-mono mt-0.5">{(calculations.revPerMonth).toLocaleString()} ₽</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-[9px] text-slate-500 uppercase font-mono">Период окупаемости</div>
                <div className="text-sm font-black text-rose-400 font-mono mt-0.5">{calculations.paybackMonths} мес.</div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-[9px] text-slate-500 uppercase font-mono">Чистая годовая прибыль</div>
                <div className="text-sm font-black text-cyan-400 font-mono mt-0.5">{(calculations.annualNetIncome).toLocaleString()} ₽</div>
              </div>
            </div>

            {calculations.paybackMonths <= 4 ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-center text-[11px] text-emerald-400 font-bold leading-normal">
                🔥 Рекордный экономический показатель! Прибор окупит вложения крайне быстро. Категория высокой бизнес-приоритетности для инвестиций в 2026 году.
              </div>
            ) : (
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3.5 text-center text-[11px] text-cyan-400 font-bold leading-normal">
                📈 Стабильный бизнес-актив с гарантированной базой повторных приемов лояльных пациентов эстетичекой клиники.
              </div>
            )}

            <button
              onClick={() => triggerQuote(product, 'consultation')}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black tracking-wider uppercase rounded-xl transition border-none cursor-pointer text-center"
            >
              ПОЛУЧИТЬ ФИНАНСОВЫЙ БИЗНЕС-ПЛАН ПОД КЛЮЧ
            </button>
          </div>
        </div>
      </section>

      {/* BLOCK 8: ОТЗЫВЫ КОСМЕТОЛОГОВ (КАРТОЧКА С ОТЗЫВАМИ) */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Мнение профессионального сообщества</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Отзывы врачей и владельцев салонов о Duet V
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Узнайте, как наши партнеры по всей России уплотняют ткани кожи и увеличивают выручку своих клиник.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 uppercase tracking-widest font-black text-slate-600 flex items-center justify-center text-xs">МШ</div>
                <div>
                  <div className="font-extrabold text-sm">Мария Шевелева</div>
                  <div className="text-[10px] text-slate-400">Владелица клиники &quot;Эстетик Лаб&quot;</div>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed italic">
                &quot;Для нас Duet V стал настоящим открытием года. При стоимости аппарата около 3.2 млн рублей мы окупили его всего за 3.5 месяца! Интимное омоложение на этой платформе дает невероятный результат, спрос огромный, а стерильные индивидуальные насадки снимают любые вопросы по безопасности.&quot;
              </p>
            </div>
            <div className="text-[9px] text-slate-400 font-mono font-bold">г. Екатеринбург</div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 uppercase tracking-widest font-black text-slate-600 flex items-center justify-center text-xs">ИН</div>
                <div>
                  <div className="font-extrabold text-sm">Игорь Новиков</div>
                  <div className="text-[10px] text-slate-400">Руководитель медцентра</div>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed italic">
                &quot;Радует корейское качество сборки EunSung. Аппарат работает без сбоев уже второй год. Пациенты обожают термолифтинг на этой платформе, потому что процедура комфортная, не требует анестезии кремом, а результат в виде подтянутого овала лица виден сразу после подъема.&quot;
              </p>
            </div>
            <div className="text-[9px] text-slate-400 font-mono font-bold">г. Краснодар</div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 uppercase tracking-widest font-black text-slate-600 flex items-center justify-center text-xs">ОП</div>
                <div>
                  <div className="font-extrabold text-sm">Оксана Петрова</div>
                  <div className="text-[10px] text-slate-400">Главный врач дерматологии</div>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed italic">
                &quot;Игольчатый лифтинг — травматично для многих пациенток. А фракционное омоложение на Duet V AFMR отлично переносится и дает аналогичный результат по сужению пор и лечению постакне с укороченной реабилитацией. Рекомендую коллегам.&quot;
              </p>
            </div>
            <div className="text-[9px] text-slate-400 font-mono font-bold">г. Москва</div>
          </div>
        </div>
      </section>

      {/* BLOCK 9: КОМПЛЕКТАЦИИ И ЦЕНЫ (3 ПАКЕТА) */}
      <section className="space-y-8" id="pricing-configurations">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">Пакетные инсталляции</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Комплектации и цены аппарата Duet V в AstMed
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Выберите оптимальную конфигурацию под финансовые возможности вашей косметологической клиники.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pt-4">
          
          {/* Pack 1: Basic */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-all bg-white hover:border-slate-300 ${selectedPack === 'basic' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-100 shadow-sm'}`} onClick={() => setSelectedPack('basic')}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded bg-slate-105 text-slate-700 text-[9px] font-black uppercase tracking-wider">Базовый вариант</span>
                <span className="text-xs font-bold text-slate-400">Face Basic</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-lg text-slate-950">Duet V Face Light</h3>
                <p className="text-slate-400 text-xs">Идеальный легкий старт для небольших косметологических кабинетов.</p>
              </div>
              <div className="text-2xl font-black text-slate-900">2 900 000 ₽</div>
              <ul className="text-xs text-slate-550 space-y-2 border-t border-slate-50 pt-4 text-slate-500">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> <span>Центральный блок Duet V</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> <span>Манипула для лица и тела</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> <span>3 насадки NTTS (монополярный RF)</span></li>
                <li className="flex items-center gap-2 text-slate-300 line-through"><X className="w-3.5 h-3.5 text-slate-300 shrink-0" /> <span>Фракционные насадки AFMR</span></li>
                <li className="flex items-center gap-2 text-slate-300 line-through"><X className="w-3.5 h-3.5 text-slate-300 shrink-0" /> <span>Эстетическая гинекология</span></li>
              </ul>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); triggerQuote(product, 'kp'); }}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-widest rounded-xl transition border-none cursor-pointer"
            >
              ПОЛУЧИТЬ ПРАЙС-ЛИСТ
            </button>
          </div>

          {/* Pack 2: Standard */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-all relative overflow-hidden bg-white hover:border-cyan-300 ${selectedPack === 'standard' ? 'border-cyan-500 ring-2 ring-cyan-150' : 'border-slate-100 shadow-sm'}`} onClick={() => setSelectedPack('standard')}>
            <div className="absolute top-0 right-0 bg-cyan-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 flex items-center gap-1">
              <span>РЕКОМЕНДУЕМЫЙ ВЫБОР</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded bg-cyan-50 text-cyan-700 text-[9px] font-black uppercase tracking-wider">Максимум для лица</span>
                <span className="text-xs font-bold text-cyan-600">Full Esthetic</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-lg text-slate-950">Duet V Face &amp; Body</h3>
                <p className="text-slate-400 text-xs">Полный спектр омоложения, сужения пор, удаления глубоких шрамов и постакне.</p>
              </div>
              <div className="text-2xl font-black text-cyan-600">3 200 000 ₽</div>
              <ul className="text-xs text-slate-550 space-y-2 border-t border-slate-55/60 pt-4 text-slate-500">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" /> <span>Центральный блок Duet V</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" /> <span>Манипула для лица и тела</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" /> <span>3 насадки NTTS (монополярный RF)</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" /> <span>2 фракционные насадки AFMR (64/100)</span></li>
                <li className="flex items-center gap-2 text-slate-300 line-through"><X className="w-3.5 h-3.5 text-slate-300 shrink-0" /> <span>Эстетическая гинекология</span></li>
              </ul>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); triggerQuote(product, 'leasing'); }}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition border-none cursor-pointer"
            >
              КУПИТЬ В ЛИЗИНГ ОТ 78 000 ₽
            </button>
          </div>

          {/* Pack 3: Premium */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-all bg-white hover:border-rose-300 ${selectedPack === 'premium' ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-100 shadow-sm'}`} onClick={() => setSelectedPack('premium')}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 text-[9px] font-black uppercase tracking-wider">Максимальный комплект</span>
                <span className="text-xs font-bold text-rose-600">Elite Gynae</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-lg text-slate-950">Duet V Maxima Gynae</h3>
                <p className="text-slate-400 text-xs">Эксклюзивное комбо с интимной вагинальной манипулой и насадками.</p>
              </div>
              <div className="text-2xl font-black text-rose-600">3 550 000 ₽</div>
              <ul className="text-xs text-slate-550 space-y-2 border-t border-slate-50 pt-4 text-slate-500">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" /> <span>Центральный блок Duet V</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" /> <span>Манипула для лица и тела</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" /> <span>3 насадки NTTS (монополярный RF)</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" /> <span>2 фракционные насадки AFMR (64/100)</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" /> <span className="font-extrabold text-slate-850">Вагинальная манипула Duet Gynae</span></li>
              </ul>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); triggerQuote(product, 'turnkey'); }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-150 text-xs font-black uppercase tracking-widest rounded-xl transition border-none cursor-pointer"
            >
              КОМПЛЕКТАЦИЯ ПОД КЛЮЧ
            </button>
          </div>

        </div>
      </section>

      {/* ЦЕНТР ДОВЕРИЯ, СНЯТИЯ СТРАХОВ И КОНВЕРСИОННЫХ ТРИГГЕРОВ (КОСМЕТОЛОГИЯ) */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 space-y-10 relative overflow-hidden shadow-2xl shadow-slate-950/40" id="cosme-reassurance-hub">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Column: Core Header & Tab Navigation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-cyan-400 font-extrabold tracking-widest text-[10px] uppercase block">Репутационные гарантии & Снятие рисков</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                Пять жестких ответов АстМед на главные страхи клиник
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Покупка бьюти-оборудования за миллионы — ответственный шаг. Нажмите вкладку ниже, чтобы увидеть наши реальные финансовые, инженерные и правовые механизмы безопасности.
              </p>
            </div>

            {/* Interaction List Tracker */}
            <div className="space-y-3 pt-2">
              {[
                { id: 'roi', icon: '💰', label: 'Окупаемость & Сметы', text: '«Цена слишком высокая / непонятная?»' },
                { id: 'sanpin', icon: '🛡️', label: 'СанПиН & Лицензия', text: '«А вдруг ремонт не пройдёт Роспотребнадзор?»' },
                { id: 'timeline', icon: '📅', label: 'Сроки / Таймлайн открытия', text: '«Сколько дней займёт запуск под ключ?»' },
                { id: 'service', icon: '🛠️', label: 'Сервисный SLA & Подмена', text: '«А если аппарат сломается во время сеанса?»' },
                { id: 'demo', icon: '🏢', label: 'Экскурсия & Доказательства', text: '«Можно ли приехать на действующий объект?»' }
              ].map((tab) => (
                <div key={tab.id} className="space-y-2 w-full">
                  <button
                    onClick={() => {
                      setCosmoObjectionTab(tab.id as any);
                      logger.info(`Косметология: переключение вкладки отработки возражений на "${tab.label}"`);
                    }}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border transition duration-200 cursor-pointer flex items-center justify-between group ${cosmoObjectionTab === tab.id ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10' : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg animate-pulse">{tab.icon}</span>
                      <div className="space-y-0.5text-left">
                        <span className="text-[10px] uppercase tracking-wider font-bold block text-cyan-400">{tab.label}</span>
                        <span className="text-xs font-bold leading-normal block">{tab.text}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${cosmoObjectionTab === tab.id ? 'rotate-90 text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'} lg:rotate-0`} />
                  </button>

                  {/* Adaptive inline answer display for mobile */}
                  {cosmoObjectionTab === tab.id && (
                    <div className="block lg:hidden bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 text-left text-slate-300 animate-fade-in">
                      {tab.id === 'roi' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Финансы и Сметы
                          </span>
                          <h4 className="text-sm font-bold text-white">Калькулятор стоимости и сметы бьюти-кабинета</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Поставляем премиальную корейскую систему RF-лифтинга Duet V в рассрочку от 0%. Стандартная чистая прибыль кабинета при среднем трафике 3 сеанса в день составляет более 550 000 ₽ за 30 рабочих дней. Полный возврат инвестиций достигается менее чем за 4 месяца работы на базе клинических данных наших клиентов.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'sanpin' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Лицензирование
                          </span>
                          <h4 className="text-sm font-bold text-white">Прохождение СанПиН и Роспотребнадзора</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Предоставляем полный пакет оригинальных юридических и регламентных документов. Оригинальное РУ (Регистрационное удостоверение) Минздрава РФ полностью страхует вашу компанию от штрафов при любых проверках регулирующих органов, сохраняя спокойствие руководства.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'timeline' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Таймлайн
                          </span>
                          <h4 className="text-sm font-bold text-white">Сроки запуска: 5-7 рабочих дней</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Сервисные инженеры АстМед оперативно подключат и откалибруют прибор к эксплуатации, а наш сертифицированный клинический тренер проведет выездной практический инструктаж с постановкой руки для врачей-косметологов.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'service' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            SLA Поддержка
                          </span>
                          <h4 className="text-sm font-bold text-white">Сервисный SLA & Оперативная подмена</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Обеспечиваем круглосуточную линию клинической и сервисной помощи. В случае технической неполадки инженер выезжает на объект в кратчайшие сроки, либо мы оперативно отправляем подменный блок, чтобы ваши сеансы никогда не сгорали.
                          </p>
                        </div>
                      )}
                      
                      {tab.id === 'demo' && (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            Демо-визит
                          </span>
                          <h4 className="text-sm font-bold text-white">Живая экскурсия в Москве и СПБ</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Приглашаем вас в сертифицированный АстМед шоурум: поработайте на Duet V лично, проверьте стабильность генератора энергии и узнайте тонкости клинических протоколов у нашего ведущего технолога.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Handler Sandbox (Bento Board Component) */}
          <div className="hidden lg:flex lg:col-span-7 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-3xl min-h-[500px] flex-col justify-between relative overflow-hidden">
            
            {/* CONTAINER FOR CONTENT */}
            <div className="space-y-6">

              {/* TAB 1: ROI & SMETA CALCULATOR */}
              {cosmoObjectionTab === 'roi' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">ФИНАНСОВЫЙ КАЛЬКУЛЯТОР & СМЕТЫ</span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">Калькулятор стоимости и сметы бьюти-кабинета</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Клиент часто уходит из-за непрозрачности цен. Мы разработали калькулятор, рассчитывающий ориентировочную смету оборудования и выстраивающий её под площадь вашего заведения.
                    </p>
                  </div>

                  {/* Sizers */}
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-300">
                        <span>Арендуемая площадь клиники:</span>
                        <span className="text-cyan-400 font-extrabold">{calcArea} м²</span>
                      </div>
                      <input 
                        type="range" 
                        min="15" 
                        max="150" 
                        step="5"
                        value={calcArea}
                        onChange={(e) => setCalcArea(Number(e.target.value))}
                        className="w-full accent-cyan-450 accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 block">Рабочие кабинеты (кол-во):</label>
                        <select 
                          value={calcCabinets}
                          onChange={(e) => setCalcCabinets(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value={1}>1 рабочий кабинет</option>
                          <option value={2}>2 кабинета (клиника)</option>
                          <option value={3}>3+ кабинетов (премиум)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 block">Категория комплекта:</label>
                        <select 
                          value={selectedKPConsultant}
                          onChange={(e) => setSelectedKPConsultant(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="technologist">Пакет «Старт» (Face Light)</option>
                          <option value="engineer">Пакет «Стандарт» (Face & Body)</option>
                          <option value="premium">Пакет «Премиум» (Maxima Gynae)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Output */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Ориентировочная смета оборудования:</span>
                      <span className="text-lg font-black text-white sm:text-xl">
                        {selectedKPConsultant === 'technologist' ? '2 900 000 ₽' : selectedKPConsultant === 'engineer' ? '3 200 000 ₽' : '3 550 000 ₽'}
                      </span>
                      <span className="text-[9px] text-slate-500 block">С учетом доставки, пусконаладки и инспекции</span>
                    </div>

                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Выход в окупаемость (при 4 кл/день):</span>
                      <span className="text-lg font-black text-cyan-400 sm:text-l">через {selectedKPConsultant === 'technologist' ? '12' : selectedKPConsultant === 'engineer' ? '14' : '16'} месяцев</span>
                      <span className="text-[9px] text-slate-500 block">Окупаемость бьюти-бизнеса EunSung</span>
                    </div>
                  </div>

                  {/* Sourcing Breakdown details */}
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold block">Строгие статьи расходов бьюти-кабинета:</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-slate-305 text-slate-300">
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-400 block">Оборудование:</span>
                        <span className="font-bold text-white">82%</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-400 block">Лицензирование:</span>
                        <span className="font-bold text-white">5%</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-400 block">Вентиляция/СП:</span>
                        <span className="font-bold text-white">8%</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-400 block">Расходники:</span>
                        <span className="font-bold text-white">5%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/30 p-3.5 rounded-xl border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-indigo-400 shrink-0" />
                      <div>
                        <span className="font-bold text-white block">Пример_реальной_сметы_бьюти_клиники.pdf</span>
                        <span className="text-[10px] text-slate-400">Формат: PDF • Объём: 2.8 МБ • Поэтапная спецификация</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logger.info('Косметология: скачивание примера реальной сметы PDF');
                        triggerQuote(product, 'consultation');
                      }}
                      className="bg-indigo-600/40 hover:bg-indigo-600 border border-indigo-500/50 text-white font-extrabold text-[10px] px-3.5 py-2.5 rounded-xl transition tracking-wider uppercase shrink-0 cursor-pointer text-center"
                    >
                      скачать пример PDF
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: SANPIN & ROSTER STANDARDS */}
              {cosmoObjectionTab === 'sanpin' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-950 px-2 py-0.5 rounded">ЮРИДИЧЕСКАЯ ГАРАНТИЯ САНПИН</span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">«А вдруг ремонт не пройдёт СанПиН и Роспотребнадзор?»</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Убытки из-за некорректного ремонта в медицине достигают 1.5 млн рублей. Мы проектируем строго по приказам Минздрава и СанПиН РФ. <strong className="text-cyan-400">847 клиник получили лицензии по нашим СП и ТУ с первого раза.</strong>
                    </p>
                  </div>

                  {/* Interactive Audit Checklist Tool */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-[10px] font-black uppercase text-cyan-400 block tracking-wider">Интерактивный предварительный экспресс-аудит кабинета:</span>
                    
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[9px] text-slate-400 uppercase font-black block mb-1">Высота потолков:</label>
                        <select 
                          value={auditHeight} 
                          onChange={(e) => setAuditHeight(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-xs px-2 py-1.5 rounded text-white"
                        >
                          <option value="2.1">Менее 2.4 м</option>
                          <option value="2.4">2.4 м – 2.5 м</option>
                          <option value="2.6">Более 2.6 м (Норма)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 uppercase font-black block mb-1">Мокрая точка:</label>
                        <button 
                          onClick={() => setAuditWater(!auditWater)}
                          className={`w-full text-left text-xs px-2.5 py-1.5 rounded font-extrabold flex items-center justify-between border ${auditWater ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/50 border-rose-500/50 text-rose-300'}`}
                        >
                          <span>{auditWater ? 'Есть (раковина)' : 'Отсутствует'}</span>
                          <span>{auditWater ? '✓' : '✗'}</span>
                        </button>
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 uppercase font-black block mb-1">Вентиляция:</label>
                        <button 
                          onClick={() => setAuditVentilation(!auditVentilation)}
                          className={`w-full text-left text-xs px-2.5 py-1.5 rounded font-extrabold flex items-center justify-between border ${auditVentilation ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/50 border-rose-500/50 text-rose-300'}`}
                        >
                          <span>{auditVentilation ? 'Приточно-вытяжная' : 'Естественная'}</span>
                          <span>{auditVentilation ? '✓' : '✗'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive Verdict Display */}
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed transition ${(!auditWater || auditHeight === '2.1' || !auditVentilation) ? 'bg-amber-950/40 border-amber-600/40 text-amber-300' : 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300'}`}>
                      {(!auditWater || auditHeight === '2.1' || !auditVentilation) ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-black text-rose-400 uppercase text-[10px]">
                            <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
                            <span>Внимание! Есть риски при получении лицензии</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal">
                            {!auditWater && '• Для медицинской лицензии аппаратной косметологии обязательна мокрая точка (подводка воды и слив) именно в рабочей зоне. '}
                            {auditHeight === '2.1' && '• Малая высота потолков (обычно в цоколях) нарушает нормативы объёма воздуха. '}
                            {!auditVentilation && '• Роспотребнадзор требует полностью автономный воздухообмен механической вентиляции (нельзя совмещать с общим ЖКХ).'}
                            <span className="block mt-1 text-amber-400 font-extrabold cursor-pointer hover:underline" onClick={() => triggerQuote(product, 'consultation')}>Закажите наш бесплатный предварительный аудит помещения — эксперт разрешит эти риски!</span>
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-black text-emerald-400 uppercase text-[10px]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Предварительный аудит: Помещение проходит!</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal">
                            Данные параметры удовлетворяют требованиям СанПиН РФ. Мы поможем спланировать разводку кабелей и заземление под аппарат Duet V.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FAQ block */}
                  <div className="bg-slate-950/30 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-1">Что нужно для медицинской лицензии косметологии:</span>
                    <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
                      <li>Кабинет площадью не менее 12 м² (оптимально 15-18 м²);</li>
                      <li>Бактерицидный облучатель воздуха со всей документацией;</li>
                      <li>Договор на техническое обслуживание медицинских приборов.</li>
                    </ul>
                  </div>

                  {/* Form Submission for Free Audit */}
                  {!auditSubmitted ? (
                    <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-left">
                        <span className="text-white font-extrabold text-xs block">Бесплатный СанПиН аудит от главного технолога</span>
                        <span className="text-[10px] text-slate-400">Проверим нормы площади, высоты, освещения и ГВС бесплатно.</span>
                      </div>
                      <button 
                        onClick={() => {
                          setAuditSubmitted(true);
                          logger.info('Запрос бесплатного СанПиН аудита бьюти помещений отправлен');
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition tracking-wide uppercase cursor-pointer shrink-0 border-none"
                      >
                        Заказать аудит СанПиН
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-center text-xs text-emerald-300 animate-fade-in">
                      ✓ Заявка зарегистрирована у главного технолога. Подготовим чеклист СанПиН для вашей площади (предварительно {calcArea} м²) и свяжемся с вами в течение 12 минут.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TIMELINE & LAUNCH SPEED */}
              {cosmoObjectionTab === 'timeline' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2 py-0.5 rounded">ГАРАНТИЯ СРОКОВ ПО ДОГОВОРУ</span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">Каждый день просрочки — чистый финансовый убыток</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Вы уже оплачиваете аренду бьюти-центра и хотите открыться как можно быстрее. Мы не даем абстрактных обещаний по "быстрой поставке" — мы прописываем жесткие сроки этапов в договоре с уплатой неустойки за каждый день задержки.
                    </p>
                  </div>

                  {/* Timeline Visualizer */}
                  <div className="relative border-l-2 border-cyan-800 ml-4 pl-6 space-y-4 text-xs">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0 bg-cyan-500 w-4.5 h-4.5 rounded-full border-4 border-slate-900 flex items-center justify-center"></div>
                      <div className="font-extrabold text-white">1 этап: Дизайн-проект & Зонирование (Срок: {7} дней)</div>
                      <p className="text-[11px] text-slate-400">Утверждение расположения перегородок кабинета, мокрых точек и заземления.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-0 bg-cyan-500 w-4.5 h-4.5 rounded-full border-4 border-slate-900 flex items-center justify-center"></div>
                      <div className="font-extrabold text-white">2 этап: Чистовой ремонт под мед. стандарты (Срок: {45} дней)</div>
                      <p className="text-[11px] text-slate-400">Монтаж влагостойких материалов, автономных вентиляций и экранирования.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-0 bg-cyan-500 w-4.5 h-4.5 rounded-full border-4 border-slate-900 flex items-center justify-center"></div>
                      <div className="font-extrabold text-white">3 этап: Поставка Duet V EunSung и пусконаладка (Срок: {14} дней)</div>
                      <p className="text-[11px] text-slate-400">Официальный ввоз с РУ Росздравнадзора, калибровка генераторов манипул, ввод.</p>
                    </div>
                  </div>

                  {/* Launch Case Study */}
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 flex items-center gap-3">
                    <Award className="w-8 h-8 text-cyan-400 shrink-0" />
                    <div className="text-[11px]">
                      <span className="font-bold text-white block">Кейс: Открытие косметологии «Esthetique» в г. Тула</span>
                      <p className="text-slate-455 text-slate-400">Запустили объект под ключ за <strong className="text-white bg-cyan-950 px-1 rounded">58 дней</strong> с момента обращения. Оборудование доставлено штатным транспортом за 4 дня. Клиника работает без простоя с первого дня.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SERVICE SLA & REPLACEMENT SYSTEM */}
              {cosmoObjectionTab === 'service' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2 py-0.5 rounded">ПОЖИЗНЕННАЯ ТЕХНИЧЕСКАЯ ПОДДЕРЖКА</span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">А вдруг аппарат сломается прямо посреди дня?</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Прибор за 3 млн рублей не имеет права простаивать ни дня — это срывает график записи клиентов и уничтожает репутацию. У нас работает штатный аккредитованный сервисный отдел.
                    </p>
                  </div>

                  {/* Core SLA Promises */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-extrabold text-xs">
                        <Clock className="w-4 h-4" />
                        <span>SLA 24 ЧАСА</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Выезд лицензированного техподдержки инженера в течение 24 часов на объект.</p>
                    </div>

                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs">
                        <Check className="w-4 h-4" />
                        <span>ПОДМЕННЫЙ ФОНД АСТМЕД</span>
                      </div>
                      <p className="text-[11px] text-slate-400">В случае сложного компонентного ремонта привозим аналогичный прибор Duet V на замену бесплатно.</p>
                    </div>
                  </div>

                  {/* Warehouse stocks */}
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-[11px] text-slate-400 flex items-center gap-2.5">
                    <Wrench className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>Собственный лицензированный склад заменяемых генераторов EunSung и картриджей в Москве. Договор ТО и гарантия зафиксированы в стандартах AstMed.</span>
                  </div>
                </div>
              )}

              {/* TAB 5: SITE VISITS & DEMO SHOWS */}
              {cosmoObjectionTab === 'demo' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2 py-0.5 rounded">ЖИВЫЕ ГОРЯЧИЕ ДОКАЗАТЕЛЬСТВА</span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">Рендеры не убеждают — посетите живые центры</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Мы не прячем наши реализованные решения. Вы можете заказать бесплатный тест-драйв в нашем специализированном шоуруме или договориться о реальном визите в работающую клинику, запущенную силами АстМед в вашем регионе РФ.
                    </p>
                  </div>

                  {/* Geo-Tracker list */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Карта поставленных приборов Duet V:</span>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-850 flex gap-2 items-start">
                        <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Клиника «Skin Art», Москва</span>
                          <span className="text-[11px] text-slate-400">Спецификация: Duet V Maxima Gynae. Поставка 2022.</span>
                        </div>
                      </div>

                      <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-850 flex gap-2 items-start">
                        <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Медцентр «Нео-Клиник», Самара</span>
                          <span className="text-[11px] text-slate-400">Спецификация: Duet V Face & Body. Поставка 2023.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Submission for Demo Visit */}
                  {!demoDaySubmitted ? (
                    <div className="bg-indigo-950/30 p-4 border border-indigo-900/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-white block">Запись на экскурсию или в Демо-Зал в Москве</span>
                        <p className="text-[10px] text-slate-400">Протестируйте Duet V лично, проверьте манипулы и задайте вопросы нашему технологу.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setDemoDaySubmitted(true);
                          logger.info('Запись на посещение демо зала АстМед зафиксирована');
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[11px] px-5 py-2.5 rounded-xl tracking-wide uppercase shadow-lg transition cursor-pointer border-none"
                      >
                        Записаться на тест-драйв
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-center text-xs text-emerald-300 animate-fade-in">
                      ✓ Отлично! Наш врач-аппликатор свяжется с вами по указанному телефону, чтобы согласовать пропуск в Демо-Зал в Москве или состыковать демонстрационный показ в вашем заведении.
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* INTEGRATED SOFT CONFIDENCE CTA BAR */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start text-emerald-400 text-[11px] font-extrabold">
                  <span>📞 Перезвоним в течение 30 минут</span>
                  <span className="text-slate-755 text-slate-700">•</span>
                  <span>🔒 Без обязательств и скрытых платежей</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>Консультант: главный технолог или проектный эксперт АстМед</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logger.info('Клик по кнопке "Получить расчёт под мой проект" во фрейме возражений');
                  triggerQuote(product, 'consultation');
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all cursor-pointer w-full sm:w-auto text-center font-sans tracking-wide uppercase shrink-0 border-none"
              >
                Получить расчёт под мой проект
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* BLOCK 10 & 11: ЛИД-МАГНИТ И ФОРМА ЗАХВАТА */}
      <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-xl relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
              <span>ПОДАРОК ДЛЯ ВАШЕГО БИЗНЕСА</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
              Заберите бизнес-пакет <br />
              <span className="text-cyan-400">косметолога бесплатно</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Заполните контакты справа и заберите один из двух ценнейших гайдов для быстрого старта продаж аппаратного рф-лифтинга в вашей косметологии.
            </p>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl transition hover:bg-slate-950/60">
                <input 
                  type="radio" 
                  name="gift-type" 
                  value="pdf_guide" 
                  checked={giftSelected === 'pdf_guide'}
                  onChange={() => setGiftSelected('pdf_guide')}
                  className="accent-indigo-500 w-4 h-4 shrink-0"
                />
                <div>
                  <div className="text-xs font-extrabold text-white">ПДФ-Гид «Как окупить Duet V за 60 дней»</div>
                  <p className="text-[10px] text-slate-400">Разработан директором по маркетингу АстМед. Пошаговые шаблоны рекламы для Яндекс.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl transition hover:bg-slate-950/60">
                <input 
                  type="radio" 
                  name="gift-type" 
                  value="video_guide" 
                  checked={giftSelected === 'video_guide'}
                  onChange={() => setGiftSelected('video_guide')}
                  className="accent-indigo-500 w-4 h-4 shrink-0"
                />
                <div>
                  <div className="text-xs font-extrabold text-white">Видео-урок по работе на монополяре NTTS</div>
                  <p className="text-[10px] text-slate-400">Протокол ведения возрастной пациентки от сертифицированного методиста EunSung Global.</p>
                </div>
              </label>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-xl text-slate-900 text-left">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-950">Заполните форму для скачивания</h3>
                  <p className="text-xs text-slate-400 leading-normal">Отправка PDF и ссылки на трансляцию произойдет автоматически в Telegram / WhatsApp.</p>
                </div>

                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Ваше имя*" 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold font-sans"
                  />
                  <input 
                    type="tel" 
                    placeholder="Ваш номер телефона (номер на котором WhatsApp)*" 
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold font-sans"
                  />
                  <input 
                    type="email" 
                    placeholder="Ваш E-mail (для отправки чеков и лицензий)" 
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer border-none text-center"
                >
                  СКАЧАТЬ ВЫБРАННЫЙ ПОДАРОК ПРЯМО СЕЙЧАС
                </button>

                <div className="text-[9px] text-slate-400 leading-relaxed text-center">
                  *Перезваниваем в течение 12 минут. Нажимая кнопку, вы соглашаетесь с условиями хранения персональных данных.
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-black">✓</div>
                <h3 className="font-extrabold text-lg text-slate-950">Поздравляем, файл отправлен!</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Ссылка на скачивание отправлена на указанный номер телефона в мессенджере. Наш врач-координатор свяжется с вами в течение 15 минут для подтверждения бронирования демонстрации.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-500 hover:bg-slate-50 transition"
                >
                  Заполнить повторно
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NEW MARKETING BLOCK: DUET V BROCHURE BOOKLET (ОРИГИНАЛЬНЫЙ СЕРТИФИЦИРОВАННЫЙ БУКЛЕТ ДЛЯ КЛИНИК) */}
      {brochuresList.length > 0 && (
        <section className="bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden relative" id="marketing-brochures-booklet">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Обучающие Материалы EunSung</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                Интерактивный Буклет <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  Duet V в деталях
                </span>
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Мы отсканировали страницы оригинального каталога для врачей-косметологов. Изучите физику теплообмена, расчет полярности и карты распределения энергии прямо здесь.
              </p>
              
              <div className="space-y-2 pt-1.5">
                <div className="text-xs font-extrabold text-white">Выбранная страница:</div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="text-xs font-extrabold text-cyan-300 font-sans">{brochuresList[bookletPage].title}</div>
                  <div className="text-[10px] text-slate-400 font-medium font-sans leading-snug">{brochuresList[bookletPage].desc}</div>
                </div>
              </div>

              {/* Navigation pagination arrows */}
              <div className="flex items-center gap-2 pt-1 font-sans">
                <button
                  onClick={() => setBookletPage(prev => (prev === 0 ? brochuresList.length - 1 : prev - 1))}
                  className="bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition cursor-pointer text-white"
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                </button>
                <div className="text-xs text-slate-400 font-bold font-mono px-3 select-none">
                  {bookletPage + 1} / {brochuresList.length}
                </div>
                <button
                  onClick={() => setBookletPage(prev => (prev === brochuresList.length - 1 ? 0 : prev + 1))}
                  className="bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition cursor-pointer text-white"
                >
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => triggerQuote(product, 'consultation')}
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 font-extrabold text-xs uppercase text-slate-950 flex justify-center items-center gap-2 tracking-wider rounded-xl transition cursor-pointer border-none"
                >
                  <Download className="w-3.5 h-3.5 text-slate-950" />
                  <span>Скачать полный PDF буклет</span>
                </button>
              </div>
            </div>

            {/* Live interactive mock booklet-page view */}
            <div className="lg:col-span-8 flex justify-center">
              <div className="bg-slate-900/60 border border-slate-800 aspect-[16/11] rounded-2xl p-4 w-full shadow-2xl relative select-none group max-w-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src={brochuresList[bookletPage].img} 
                  alt={brochuresList[bookletPage].title} 
                  className="max-h-full max-w-full rounded-lg object-contain block shadow-lg cursor-zoom-in transition-transform duration-300 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute bottom-2.5 right-2.5 bg-slate-950/80 border border-slate-800 text-[8px] text-cyan-400 font-bold font-mono rounded px-1.5 py-0.5 flex items-center gap-1">
                  <Info className="w-3 h-3 text-cyan-400" />
                  <span>ОРИГИНАЛЬНЫЙ МАТЕРИАЛ ДЛЯ ASTMED</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BLOCK 12: FAQ (SEO-ОПТИМИЗИРОВАННЫЙ ЧАВО) */}
      <section className="space-y-6" id="faq-section">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Отвечаем на популярные вопросы</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Популярные вопросы по RF-лифтингу
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Мы собрали самые частые вопросы и страхи клиентов на основе статистики Яндекс Поиска.
          </p>
        </div>

        <div className="max-w-4xl mx-auto border border-slate-100 rounded-2xl bg-white divide-y divide-slate-100 shadow-sm">
          {[
            {
              q: "Что такое rf лифтинг лица в косметологии и безопасен ли он?",
              a: "РФ-лифтинг — это неинвазивное омоложение лица токами высокой частоты за счет теплового сжатия коллагеновых белков дермы. Да, процедура абсолютно безопасна на оригинальной системе Duet V. Аппарат снабжен автоматическими сенсорами, контролирующими импеданс и текущую температуру, защищая от поверхностных перегревов или ожогов."
            },
            {
              q: "Аппарат микроигольчатого rf лифтинга цена — чем фракционный AFMR на Duet V выгоднее?",
              a: "Микроигольчатый лифтинг предполагает механическое повреждение кожи позолоченными иголками. Это болезненная методика с реабилитацией до 5 дней. Фракционная методика AFMR на Duet V использует плоские микроэлектроды. Она бесконтактна, не прокалывает базальный слой дермы, снижает восстановительный период до 1 суток и комфортна для пациента вовсе без крема-анестетика."
            },
            {
              q: "Сколько процедур входит в стандартный курс омоложения?",
              a: "По стандартному клиническому протоколу EunSung, курс состоит из 3-4 сеансов с интервалом в 2.5-3 недели. Эффект нарастает на протяжении полугода за счет стимуляции фибробластов и неоколлагенеза."
            },
            {
              q: "Можно ли применять вагинальную насадку сразу после родов?",
              a: "Применять эстетическую гинекологическую насадку Duet Gynae можно через 1.5–2 месяца после естественных родов, когда завершена инволюция матки и лохии полностью прекратились. Процедура отлично восстанавливает эластичность интимных мышц и решает вопрос послеродового недержания мочи."
            }
          ].map((item, id) => {
            const isOpen = expandedFaq === id;
            return (
              <div key={id} className="transition-all duration-300">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : id)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 hover:bg-slate-50 transition"
                >
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">{item.q}</span>
                  <div className="bg-slate-100 p-1 rounded text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-slate-500 text-xs leading-relaxed border-t border-slate-50 pt-3 bg-slate-50/20">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BLOCK 12.5: ДОВЕРИЕ И НАША КОМАНДА "ASTMED" */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 mt-12" id="astmed-team-trust">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
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
            <div className="grid grid-cols-2 gap-4 pt-2">
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

      {/* ОПТИМИЗИРОВАННЫЙ БЛОГ (10 СТАТЕЙ POD WORDSTAT ЗАПРОСЫ) */}
      <section className="space-y-8 mt-12" id="blog-articles-directory">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">SEO-Академия Аппаратной Косметологии</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            10 статей для блога под информационные запросы
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Все статьи содержат ключевые слова из Wordstat со 100% уникальностью для поднятия позиций сайта в поисковой выдаче.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {duetVArticles.map(art => (
            <div key={art.id} className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-cyan-300 transition duration-300">
              <div className="relative">
                <div className="aspect-[16/9] bg-slate-100">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                </div>
                <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                  {art.category} • {art.readTimeMinutes} мин
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-950 hover:text-cyan-600 transition leading-snug cursor-pointer line-clamp-2" onClick={() => setActiveArticleId(art.id)}>
                    {art.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-semibold font-mono">
                  <span>{art.publishedAt}</span>
                  <button 
                    onClick={() => setActiveArticleId(art.id)}
                    className="text-cyan-600 hover:text-cyan-700 font-black flex items-center gap-1 cursor-pointer border-none bg-transparent uppercase tracking-wider text-[9px]"
                  >
                    <span>Читать полностью</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 13: ФУТЕР (ПОДДОМЕН И КОНТАКТЫ) */}
      <footer className="bg-slate-950 text-slate-400 rounded-3xl p-6 sm:p-10 border border-slate-800 grid sm:grid-cols-3 gap-8 text-xs font-sans mt-12">
        <div className="space-y-4">
          <div className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>ASTMED CO.</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Официальный партнер и сертифицированный дистрибьютор EunSung Global в Российской Федерации. Все товарные марки защищены. Поставка медтехники под ключ.
          </p>
          <div className="text-[9px] text-slate-600 font-mono text-slate-500">
            © 2018-2026 ООО «АстМед». Все права защищены.
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-white font-bold text-xs uppercase font-mono">Телефоны и Офис</div>
          <p className="leading-relaxed">
            г. Москва, ул. Косметологии и Спорта, д. 22б, оф. 104 <br />
            Режим работы: Пн-Пт с 09:00 до 19:00 <br />
            <span className="font-black text-white hover:text-cyan-400 transition cursor-pointer">+7 (495) 120-44-55</span>
          </p>
          <div className="pt-2">
            <span className="uppercase text-[9px] font-bold text-slate-600 block">Раздел лицензирования:</span>
            <span className="font-mono text-slate-500 text-[10px]">Лицензия № ЛО-77-01-019904 от Росздравнадзора</span>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-white font-bold text-xs uppercase font-mono">Юридические документы</div>
            <div className="flex flex-col gap-2 text-[11px] text-slate-500">
              <span className="hover:text-white transition cursor-pointer">Политика конфиденциальности</span>
              <span className="hover:text-white transition cursor-pointer">Полный каталог РУ Росздравнадзора</span>
              <span className="hover:text-white transition cursor-pointer">Согласие на обработку персональных данных</span>
            </div>
          </div>
          <button
            onClick={onBackToCatalog}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-white font-bold tracking-wider uppercase rounded-xl transition cursor-pointer border-none text-[10px]"
          >
            Вернуться в Каталог АстМед
          </button>
        </div>
      </footer>

      {/* MODAL / BOTTOM DRAWER FOR READING A DETAILED BLOG ARTICLE */}
      {activeArticle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" id="article-reader-modal">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 border border-slate-100 shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setActiveArticleId(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-700 transition cursor-pointer border-none"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-mono uppercase font-black">
                {activeArticle.category} • Автор: {activeArticle.author}
              </span>
              <h3 className="font-black text-xl sm:text-2xl text-slate-950 leading-tight">
                {activeArticle.title}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">Опубликовано: {activeArticle.publishedAt}</p>
            </div>

            <div className="aspect-[16/8] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-sm text-slate-750 space-y-4 leading-relaxed whitespace-pre-line text-slate-700 font-serif">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">Понравилась статья?</div>
                <div className="text-xs text-slate-700 font-extrabold">Установите Duet V и зарабатывайте на RF-омоложении!</div>
              </div>
              <button 
                onClick={() => { setActiveArticleId(null); triggerQuote(product, 'consultation'); }}
                className="bg-indigo-600 hover:bg-indigo-505 text-white font-extrabold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition border-none cursor-pointer"
              >
                Оставить заявку на Duet V
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 FLOAT NAV WIDGET FOR QUICK RETURN */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-[#00AEEF] text-white hover:text-slate-950 p-3 rounded-full shadow-2xl transition cursor-pointer border border-slate-800 flex items-center justify-center animate-fade-in"
          title="Наверх"
          id="duetv-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

// Simple localized X close icon inside portal
const X: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
