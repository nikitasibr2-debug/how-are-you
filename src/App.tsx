/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Heart, 
  Layers, 
  Search, 
  Settings, 
  Activity, 
  Phone, 
  Mail, 
  Check, 
  SlidersHorizontal, 
  ArrowUpDown, 
  FileText, 
  Building2, 
  GraduationCap, 
  BadgePercent, 
  HelpCircle, 
  Plus, 
  Trash2, 
  X, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ArrowRightLeft, 
  Sparkles, 
  ShieldCheck, 
  FileCheck, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  UserCheck,
  Send,
  MessageSquare,
  Bookmark,
  ArrowLeft,
  TrendingUp,
  Award,
  Shield,
  Compass,
  ShoppingCart,
  Package,
  Users
} from 'lucide-react';
import { categories } from './data/categories';
import { brands } from './data/brands';
import { products } from './data/products';
import { services } from './data/services';
import { faqs } from './data/faqs';
import { articles } from './data/articles';
import { DuetVLanding } from './components/DuetVLanding';
import { ClearLightLanding } from './components/ClearLightLanding';
import { logger, LogEntry } from './lib/logger';
import { Product, FilterState, ViewTab } from './types';
import { 
  getTelegramSettings, 
  saveTelegramSettings, 
  sendTelegramNotification, 
  testTelegramConnection, 
  isTelegramConfigured 
} from './lib/telegram';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<ViewTab>('main');
  const [heroConfigTab, setHeroConfigTab] = useState<'uzi' | 'surgery' | 'cosmetology'>('uzi');
  const [activeObjectionTab, setActiveObjectionTab] = useState<'trust' | 'price' | 'risk' | 'docs' | 'train'>('trust');
  
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 6000000 });
  const [sortOption, setSortOption] = useState<'price_asc' | 'price_desc' | 'popularity'>('popularity');

  // Favorites & Compare
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Selected Product (for Detail Modal)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [roiPrice, setRoiPrice] = useState<number>(3500);
  const [roiSessions, setRoiSessions] = useState<number>(8);

  const [objectionCalcPrice, setObjectionCalcPrice] = useState<number>(3500000);
  const [objectionCalcPeriod, setObjectionCalcPeriod] = useState<number>(18);
  const [objectionCalcUpfront, setObjectionCalcUpfront] = useState<number>(20);

  const openProductDetails = (product: Product) => {
    if (product.id === 'soprano-titanium') {
      setActiveTab('product-landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      logger.info(`Переход на специальную страницу-лендинг для косметологического аппарата: ${product.name}`);
    } else if (product.id === 'duet-v') {
      setActiveTab('duet-v-landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      logger.info(`Переход на специальную страницу-лендинг для косметологического аппарата: ${product.name}`);
    } else if (product.id === 'clearlight') {
      setActiveTab('clearlight-landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      logger.info(`Переход на специальную страницу-лендинг для косметологического аппарата: ${product.name}`);
    } else {
      setSelectedProduct(product);
      logger.info(`Открыто модальное окно деталей товара: ${product.name}`);
    }
  };

  // Lead Generation Modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteTargetProduct, setQuoteTargetProduct] = useState<Product | null>(null);
  const [quoteFormType, setQuoteFormType] = useState<'kp' | 'price' | 'consultation' | 'leasing' | 'turnkey'>('kp');
  
  // Lead Form Fields
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ search and active categories
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Telegram Bot Integration Configuration
  const [tgBotToken, setTgBotToken] = useState(() => getTelegramSettings().botToken);
  const [tgChatId, setTgChatId] = useState(() => getTelegramSettings().chatId);
  const [tgTestStatus, setTgTestStatus] = useState<string | null>(null);
  const [tgIsTesting, setTgIsTesting] = useState(false);

  // Yandex Wordstat Integration Simulator & Config
  const [rightPanelTab, setRightPanelTab] = useState<'telegram' | 'wordstat'>('telegram');
  const [wordstatQuery, setWordstatQuery] = useState('Aquapure II');
  const [wordstatRegion, setWordstatRegion] = useState('0'); // 0 - Россия, 1 - Москва, 2 - Спб
  const [wordstatIsSearching, setWordstatIsSearching] = useState(false);
  const [wordstatResult, setWordstatResult] = useState<any>(null);

  // System Diagnostics / Telemetry Toggle
  const [showLogsPanel, setShowLogsPanel] = useState(false);
  const [liveLogs, setLiveLogs] = useState<LogEntry[]>([]);

  // Initialize Logger Listeners & Initial log
  useEffect(() => {
    logger.info('Инициализация приложения АстМед - Федеральный дистрибьютор медоборудования', {
      time: new Date().toISOString(),
      platform: 'Vite React App'
    });
    
    setLiveLogs(logger.getLogs());
    const unsubscribe = logger.subscribe(() => {
      setLiveLogs(logger.getLogs());
    });
    return () => unsubscribe();
  }, []);

  // Sync range slider max based on real products
  useEffect(() => {
    const prices = products.map(p => p.price).filter(p => p > 0);
    if (prices.length > 0) {
      const maxProductPrice = Math.max(...prices);
      setPriceRange(prev => ({ ...prev, max: maxProductPrice }));
    }
  }, []);

  // Track user navigation for analytics logs
  const handleTabChange = (tab: ViewTab) => {
    setActiveTab(tab);
    logger.debug(`Пользователь перешел на вкладку: ${tab}`);
  };

  // Favorites Handler
  const toggleFavorite = (productId: string) => {
    const isFav = favorites.includes(productId);
    if (isFav) {
      setFavorites(prev => prev.filter(id => id !== productId));
      logger.info(`Товар удален из избранного: ${productId}`);
    } else {
      setFavorites(prev => [...prev, productId]);
      logger.info(`Товар добавлен в избранное: ${productId}`);
    }
  };

  // Compare Handler
  const toggleCompare = (productId: string) => {
    const isMatched = compareList.includes(productId);
    if (isMatched) {
      setCompareList(prev => prev.filter(id => id !== productId));
      logger.info(`Товар удален из сравнения: ${productId}`);
    } else {
      if (compareList.length >= 4) {
        logger.warn('Ограничение сравнения: невозможно сравнивать более 4 товаров одновременно');
        alert('Вы можете сравнивать до 4 товаров одновременно.');
        return;
      }
      setCompareList(prev => [...prev, productId]);
      logger.info(`Товар добавлен в список сравнения: ${productId}`);
    }
  };

  // Search Autocomplete filtering
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.article.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  // Main Catalog Filtering
  const filteredProducts = useMemo(() => {
    logger.debug('Запущена фильтрация каталога товаров', {
      category: selectedCategory,
      brand: selectedBrand,
      country: selectedCountry,
      availability: selectedAvailability,
      priceRange,
      sortOption
    });

    let result = [...products];

    // Text search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brandName.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.article.toLowerCase().includes(query)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(p => p.categoryId === selectedCategory || p.subCategoryId === selectedCategory);
    }

    // Brand
    if (selectedBrand) {
      result = result.filter(p => p.brandId === selectedBrand);
    }

    // Country
    if (selectedCountry) {
      result = result.filter(p => p.country === selectedCountry);
    }

    // Availability
    if (selectedAvailability) {
      result = result.filter(p => p.availability === selectedAvailability);
    }

    // Price range
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sorting
    if (sortOption === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }
    // popularity can just use default database ordering

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, selectedCountry, selectedAvailability, priceRange, sortOption]);

  // Unique countries for filters
  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(products.map(p => p.country)));
  }, []);

  // Trigger RFQ / Lead captures
  const triggerQuote = (product: Product | null, type: typeof quoteFormType) => {
    setQuoteTargetProduct(product);
    setQuoteFormType(type);
    setFormSubmitted(false);
    setIsQuoteModalOpen(true);
    logger.info(`Открыто модальное окно захвата лида`, {
      type,
      productId: product?.id || 'Общая форма'
    });
  };

  // Quote form submission simulation
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPhone || !formName) {
      logger.warn('Ошибка отправки формы: незаполнены обязательные поля Name/Phone');
      alert('Пожалуйста, введите Имя и Номер телефона.');
      return;
    }

    const leadData = {
      leadId: 'L-' + Math.floor(Math.random() * 900000 + 100000),
      timestamp: new Date().toISOString(),
      type: quoteFormType,
      product: quoteTargetProduct?.name || 'Всё оборудование',
      contact: {
        name: formName,
        phone: formPhone,
        email: formEmail,
        comment: formComment
      }
    };

    logger.info('ЗАЯВКА УСПЕШНО ЗАФИКСИРОВАНА И НАПРАВЛЕНА В CRM / TELEGRAM / EMAIL', leadData);
    sendTelegramNotification(leadData).then(success => {
      if (success) {
        logger.info(`Лид ${leadData.leadId} успешно продублирован вашему Telegram-боту!`);
      } else {
        logger.warn(`Не удалось отправить лид ${leadData.leadId} в Telegram. Проверьте настройки.`);
      }
    });
    setFormSubmitted(true);
    
    // Clear form fields
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormComment('');
      setFormSubmitted(false);
    }, 2500);
  };

  // Trigger Wordstat Analysis Simulator
  const triggerWordstatAnalysis = (keyword: string, regionCode?: string) => {
    setWordstatIsSearching(true);
    const resolvedRegion = regionCode !== undefined ? regionCode : wordstatRegion;
    logger.info(`Отправлен запрос анализа спроса к симулятору Яндекс.Вордстат [Ключ: "${keyword}", Регион: ${resolvedRegion}]`);
    
    setTimeout(() => {
      const q = keyword.trim().toLowerCase();
      let totalVolume = 14820;
      let keywordsList = [
        { phrase: `${keyword} купить`, volume: 3450, cpc: 120 },
        { phrase: `аппарат ${keyword} цена`, volume: 1890, cpc: 95 },
        { phrase: `${keyword} отзывы косметологов`, volume: 4120, cpc: 45 },
        { phrase: `${keyword} премиум купить`, volume: 1340, cpc: 150 },
        { phrase: `косметологический комбайн ${keyword}`, volume: 4020, cpc: 180 },
      ];

      if (q.includes('гидропилинг') || q.includes('пилинг') || q.includes('аквапур')) {
        totalVolume = 145200;
        keywordsList = [
          { phrase: 'процедура гидродинамического гидропилинга в клинике', volume: 42500, cpc: 85 },
          { phrase: 'купить аппарат для гидропилинга заказать', volume: 33400, cpc: 140 },
          { phrase: 'гидропилинг до и после отзывы клиентов', volume: 28900, cpc: 40 },
          { phrase: 'аппарат гидропилинга для салона красоты', volume: 17200, cpc: 155 },
          { phrase: 'корейский аппарат гидропилинга цена в рф', volume: 15200, cpc: 110 },
        ];
      } else if (q.includes('косметология') || q.includes('аппарат') || q.includes('оборудование')) {
        totalVolume = 289400;
        keywordsList = [
          { phrase: 'аппаратная косметология купить оборудование', volume: 84200, cpc: 195 },
          { phrase: 'премиальное косметологическое оборудование дилеры', volume: 52100, cpc: 250 },
          { phrase: 'профессиональные косметические аппараты купить', volume: 43900, cpc: 160 },
          { phrase: 'купить аппарат лазерного пилинга', volume: 29350, cpc: 210 },
          { phrase: 'каталог оборудования для клиники красоты', volume: 12850, cpc: 180 },
        ];
      } else if (q && q !== 'aquapure ii') {
        const seedValue = Math.min(Math.max((q.length * 185) + 350, 480), 9600);
        totalVolume = Math.round(seedValue * 3.5);
        keywordsList = [
          { phrase: `${keyword} купить оптом`, volume: Math.round(seedValue * 0.45), cpc: 145 },
          { phrase: `${keyword} официальный дистрибьютор в рф`, volume: Math.round(seedValue * 0.25), cpc: 190 },
          { phrase: `${keyword} отзывы врачей косметологов`, volume: Math.round(seedValue * 0.8), cpc: 60 },
          { phrase: `аппарат ${keyword} цена на сайте`, volume: Math.round(seedValue * 0.4), cpc: 115 },
          { phrase: `${keyword} аналоги и сравнение характеристик`, volume: Math.round(seedValue * 0.3), cpc: 80 },
        ];
      }

      // Region multiplier
      let regionLabel = 'Вся Россия';
      if (resolvedRegion === '1') {
        totalVolume = Math.round(totalVolume * 0.45);
        keywordsList = keywordsList.map(item => ({ ...item, volume: Math.round(item.volume * 0.45), cpc: Math.round(item.cpc * 1.35) }));
        regionLabel = 'Москва и область';
      } else if (resolvedRegion === '2') {
        totalVolume = Math.round(totalVolume * 0.2);
        keywordsList = keywordsList.map(item => ({ ...item, volume: Math.round(item.volume * 0.2), cpc: Math.round(item.cpc * 1.15) }));
        regionLabel = 'Санкт-Петербург и ЛО';
      }

      setWordstatResult({
        query: keyword,
        volume: totalVolume,
        region: regionLabel,
        keywords: keywordsList,
        cpcAvg: Math.round(keywordsList.reduce((acc, curr) => acc + curr.cpc, 0) / keywordsList.length),
        timestamp: new Date().toLocaleTimeString('ru-RU')
      });
      setWordstatIsSearching(false);
      logger.info(`[Яндекс.Вордстат] Успешный ответ по запросу "${keyword}". Частотность показов: ${totalVolume}/мес. Регион: ${regionLabel}`);
    }, 750);
  };

  // FAQ searching
  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchesCategory = faqCategory === 'all' || item.category === faqCategory;
      const matchesSearch = !faqSearch.trim() || 
        item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.answer.toLowerCase().includes(faqSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqCategory, faqSearch]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900" id="astmed-root">
      
      {/* ----------------- STICKY PREMIUM HEADER ----------------- */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all" id="main-header">
        
        {/* Info Top Bar */}
        <div className="bg-slate-50 text-slate-500 border-b border-slate-100 py-3 px-4 sm:px-6 lg:px-8 text-[11.5px] font-medium uppercase tracking-wider flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              <span>г. Москва, ул. Большая Полянка, 23</span>
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>13+ лет на рынке</span>
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <span>7500+ реализованных проектов</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-blue-700 font-bold">8 (800) 555-35-35</span>
            <a href="mailto:sale@medtech-pro.ru" className="hover:text-blue-700 transition-colors flex items-center gap-1.5 font-semibold text-slate-600">
              <Mail className="w-3.5 h-3.5 text-blue-700" />
              <span>sale@medtech-pro.ru</span>
            </a>
            {/* Embedded Live Logger Activator */}
            <button 
              onClick={() => {
                setShowLogsPanel(!showLogsPanel);
                logger.debug(`Тумблер панели логов переключен: ${!showLogsPanel}`);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer text-[10px] font-bold tracking-widest uppercase transition ${showLogsPanel ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <Settings className="w-3 h-3 animate-spin-slow" />
              <span>Телеметрия</span>
            </button>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Descriptor */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            <div 
              onClick={() => handleTabChange('main')} 
              className="group cursor-pointer flex items-center gap-2.5"
              id="header-logo"
            >
              <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center text-white italic font-extrabold shadow-sm group-hover:bg-blue-800 transition-colors">
                <span className="text-lg">M</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter block">
                  ASTMED <span className="text-slate-400 font-light font-sans">PRO</span>
                </span>
              </div>
            </div>

            {/* Quick Contacts mobile */}
            <div className="flex md:hidden items-center gap-2">
              <a href="tel:88005553535" className="p-2 bg-slate-100 rounded-full text-slate-700">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Smart Search Bar */}
          <div className="flex-1 max-w-lg relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по 50 000+ товарам..."
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog' && e.target.value.trim().length > 0) {
                    setActiveTab('catalog');
                  }
                }}
                className="w-full bg-slate-100 border-none text-slate-900 placeholder:text-slate-400 pl-11 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete dropdown suggestions */}
            {showSearchDropdown && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl z-50 p-2 overflow-hidden">
                <div className="text-xs font-semibold px-3 py-1.5 text-slate-400 uppercase tracking-wider">Найдено в каталоге:</div>
                {searchSuggestions.map(product => (
                  <div
                    key={product.id}
                    onMouseDown={() => {
                      openProductDetails(product);
                    }}
                    className="flex justify-between items-center px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{product.name}</div>
                      <div className="text-[10px] text-slate-400">{product.brandName} • {product.article}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-blue-700">
                        {product.price > 0 ? `${product.price.toLocaleString('ru-RU')} ₽` : 'Запрос цены'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact action & Metrics indicators */}
          <div className="flex items-center justify-between md:justify-end gap-4 lg:gap-6">
            <div className="hidden lg:block text-right">
              <a href="tel:88005553535" className="text-base font-extrabold text-slate-900 hover:text-blue-700 transition-colors block">
                8 (800) 555-35-35
              </a>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Быстрый подбор
              </span>
            </div>

            {/* Icons indicators: Favorites & Comparison */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleTabChange('comparison')}
                title="Сравнение моделей"
                className={`p-2.5 rounded-full border relative transition-all ${activeTab === 'comparison' ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}
              >
                <ArrowRightLeft className="w-4 h-4" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                    {compareList.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => handleTabChange('favorites')}
                title="Избранное"
                className={`p-2.5 rounded-full border relative transition-all ${activeTab === 'favorites' ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-700 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>

            <button 
              onClick={() => triggerQuote(null, 'kp')}
              className="bg-emerald-500 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-emerald-100 hover:bg-emerald-600 hover:shadow-lg transition-all cursor-pointer"
            >
              ПОЛУЧИТЬ КП
            </button>
          </div>

        </div>

        {/* Global Nav Bar */}
        <nav className="bg-slate-50 border-t border-slate-100" id="global-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto scrollbar-none py-1.5 gap-1 select-none font-sans">
            <button
              onClick={() => handleTabChange('main')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'main' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Главная
            </button>
            <button
              onClick={() => {
                setSelectedCategory('');
                handleTabChange('catalog');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'catalog' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Каталог оборудования
            </button>
            <button
              onClick={() => handleTabChange('services')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'services' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Комплексные Услуги под ключ
            </button>
            <button
              onClick={() => handleTabChange('about')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'about' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              О компании
            </button>
            <button
              onClick={() => handleTabChange('brands')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'brands' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Бренды
            </button>
            <button
              onClick={() => handleTabChange('blog')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'blog' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Обзоры и Блог
            </button>
            <button
              onClick={() => handleTabChange('faq')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'faq' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Часто задаваемые вопросы (30+)
            </button>
          </div>
        </nav>

      </header>

      {/* ----------------- SUB-COMPONENTS VIEWPORT ----------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-viewport">

        {/* 1. MAIN LANDING VIEW */}
        {activeTab === 'main' && (
          <div className="space-y-16 animate-fade-in" id="landing-view">
            
            {/* HER0 / OFFERS BLOCK */}
            <section className="bg-gradient-to-r from-slate-50 to-white border border-slate-100 rounded-3xl p-6 sm:p-8 lg:p-12 text-slate-900 relative overflow-hidden shadow-2xl shadow-slate-100/50">
              {/* Backglow decoratives */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                    <span>Федеральный дистрибьютор экспертного медоборудования</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                    Комплексное оснащение <br />
                    <span className="text-blue-700 bg-blue-50 px-2 rounded-lg">медицинских клиник</span>
                  </h1>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                    Прямые поставки медицинского оборудования из Южной Кореи, Германии, США и Китая. Проектирование по стандартам Лицензирования Минздрава РФ с гарантией и сервисом 24/7.
                  </p>
                  
                  {/* Quick interactive subcategories chips for lively UX */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Быстрый выбор направления:</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: '🩺 УЗИ сканеры', id: 'uzi' },
                        { name: '🔬 Эндоскопия', id: 'flex_endoscopy' },
                        { name: '🩻 МРТ / КТ', id: 'rad_diag' },
                        { name: '💨 ИВЛ и Наркоз', id: 'reanimation' },
                        { name: '💋 Косметология & РФ', id: 'cosmetology' },
                        { name: '🏥 Хирург. столы', id: 'surgery' }
                      ].map((chip) => (
                        <button
                          key={chip.id}
                          onClick={() => {
                            setSelectedCategory(chip.id);
                            handleTabChange('catalog');
                            logger.info(`Клик по быстрому тегу направления на главном экране: ${chip.name}`);
                          }}
                          className="bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 rounded-xl px-3.5 py-1.5 text-xs font-bold shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                        >
                          {chip.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confidence indicators block */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-blue-700">13+ лет</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-semibold tracking-tight">Опыта на рынке РФ</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-blue-700">7500+</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-semibold tracking-tight">Готовых проектов</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-blue-700">800+</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-semibold tracking-tight">Клинических баз</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-blue-700">90%</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-semibold tracking-tight">Рекомендаций РАН</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button 
                      onClick={() => handleTabChange('catalog')}
                      className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-slate-200 transition-all cursor-pointer flex items-center gap-2 group"
                    >
                      <span>ОТКРЫТЬ КАТАЛОГ</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <button 
                      onClick={() => triggerQuote(null, 'consultation')}
                      className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-200 transition"
                    >
                      Рассчитать Лизинг 0%
                    </button>
                  </div>
                </div>

                {/* Marketer-Designer interactive Smart Clinic Configurator widget */}
                <div className="lg:col-span-5 relative">
                  <div className="relative w-full bg-white border border-slate-150 p-5 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 text-slate-700 space-y-4">
                    
                    {/* Interactive Selector Header */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        <span className="text-[9px] font-black tracking-widest text-emerald-600 uppercase">ИНТЕРАКТИВНЫЙ КОНФИГУРАТОР</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-400">Выберите тип кабинета для мгновенного аудита оснащения:</div>
                    </div>

                    <div className="flex border-b border-slate-100 pb-2 gap-1 overflow-x-auto">
                      <button
                        onClick={() => {
                          setHeroConfigTab('uzi');
                          logger.info('Переключение конфигуратора на УЗИ кабинет');
                        }}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all whitespace-nowrap ${heroConfigTab === 'uzi' ? 'bg-blue-650 bg-blue-700 text-white shadow' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
                      >
                        🧬 Кабинет УЗИ
                      </button>
                      <button
                        onClick={() => {
                          setHeroConfigTab('surgery');
                          logger.info('Переключение конфигуратора на Операционную');
                        }}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all whitespace-nowrap ${heroConfigTab === 'surgery' ? 'bg-blue-650 bg-blue-700 text-white shadow' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
                      >
                        🏥 Хирургия
                      </button>
                      <button
                        onClick={() => {
                          setHeroConfigTab('cosmetology');
                          logger.info('Переключение конфигуратора на Косметологию');
                        }}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all whitespace-nowrap ${heroConfigTab === 'cosmetology' ? 'bg-blue-650 bg-blue-700 text-white shadow' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
                      >
                        💋 Эстетика & RF
                      </button>
                    </div>

                    {/* DYNAMIC TELEMETRY VISUAL FOR EACH TAB */}
                    {heroConfigTab === 'uzi' && (
                      <div className="space-y-3 animate-fade-in">
                        <div className="h-32 bg-slate-900 border border-slate-850 rounded-xl flex flex-col justify-between items-center p-3 relative overflow-hidden">
                          {/* Тематическое фото: УЗИ-кабинет */}
                          <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=70" alt="Кабинет УЗИ-диагностики" className="absolute inset-0 w-full h-full object-cover opacity-40" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-blue-900/70"></div>
                          {/* Grid backdrop */}
                          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-10"></div>
                          
                          
                          <div className="w-full flex justify-between items-center text-[9px] text-blue-400 font-mono z-10">
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>ULTRASOUND_ROOM_READY</span>
                            <span>FREQ: 16.5 MHz</span>
                          </div>
                          
                          {/* Dynamic SVG telemetry scanning waves */}
                          <svg className="w-full h-16 stroke-blue-400 fill-none stroke-2 z-10" viewBox="0 0 400 100">
                            <path d="M 0 50 Q 25 20 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50" className="stroke-blue-400 opacity-90 animate-pulse" />
                            <path d="M 0 50 Q 30 70 80 40 T 160 60 T 240 30 T 320 70 T 400 50" className="stroke-cyan-300 opacity-60" />
                          </svg>

                          <div className="w-full flex justify-between text-[8px] text-slate-400 font-mono z-10">
                            <span>SENSORS: 4/4 ACTIVE</span>
                            <span>RESOLUTION: ULTRA_HD (ZST+)</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>Рекомендуемый комплект:</span>
                            <span className="text-blue-700">Mindray Resona I9BT</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <div>🧾 Лицензирование Минздрава: <strong className="text-slate-800">100% готовность (РУ)</strong></div>
                            <div>🕒 Срок окупаемости: <strong className="text-emerald-700">~5 месяцев</strong></div>
                            <div>🚀 Проходимость: <strong className="text-slate-800">до 35 пац./день</strong></div>
                            <div>🔧 Гарантия бренда: <strong className="text-slate-800">2 года на месте</strong></div>
                          </div>
                          <button 
                            onClick={() => {
                              const pObj = products.find(p => p.id === 'mindray-resona-i9');
                              if (pObj) openProductDetails(pObj);
                            }}
                            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-[11px] rounded-lg border border-blue-200 transition text-center cursor-pointer"
                          >
                            ПОЛУЧИТЬ РАСЧЁТ И СПЕЦИФИКАЦИЮ
                          </button>
                        </div>
                      </div>
                    )}

                    {heroConfigTab === 'surgery' && (
                      <div className="space-y-3 animate-fade-in">
                        <div className="h-32 bg-slate-900 border border-slate-850 rounded-xl flex flex-col justify-between items-center p-3 relative overflow-hidden">
                          {/* Тематическое фото: операционная */}
                          <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=70" alt="Операционный блок" className="absolute inset-0 w-full h-full object-cover opacity-40" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-emerald-900/70"></div>
                          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-10"></div>
                          
                          
                          <div className="w-full flex justify-between items-center text-[9px] text-emerald-400 font-mono z-10">
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>OR_BLOCK_ACTIVE</span>
                            <span>N2O + O2 FLOW</span>
                          </div>
                          
                          {/* Electrocardiogram Vital Signal Wave */}
                          <svg className="w-full h-16 stroke-emerald-400 fill-none stroke-2 z-10" viewBox="0 0 400 100">
                            <path d="M 0 50 L 80 50 L 90 20 L 100 80 L 110 50 L 220 50 L 230 10 L 240 90 L 250 50 L 400 50" className="stroke-emerald-400 opacity-90" />
                          </svg>

                          <div className="w-full flex justify-between text-[8px] text-slate-400 font-mono z-10">
                            <span>SPO2: 99% • HR: 72</span>
                            <span>VENTILATOR CONTOUR: STABLE</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>Рекомендуемый комплект:</span>
                            <span className="text-emerald-700">Mindray WATO EX-65 Pro</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <div>🧾 Соответствие стандартам: <strong className="text-slate-800">Приказ 922н</strong></div>
                            <div>🕒 Срок окупаемости: <strong className="text-emerald-700">~8 месяцев</strong></div>
                            <div>🚀 Безопасность: <strong className="text-slate-800">Экспертный класс</strong></div>
                            <div>🔧 Сервисный монтаж: <strong className="text-slate-800">БЕСПЛАТНО за 1 день</strong></div>
                          </div>
                          <button 
                            onClick={() => triggerQuote(null, 'turnkey')}
                            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-black text-[11px] rounded-lg border border-emerald-200 transition text-center cursor-pointer"
                          >
                            РАССЧИТАТЬ ОПЕРАЦИОННУЮ ПОД КЛЮЧ
                          </button>
                        </div>
                      </div>
                    )}

                    {heroConfigTab === 'cosmetology' && (
                      <div className="space-y-3 animate-fade-in">
                        <div className="h-32 bg-slate-900 border border-slate-850 rounded-xl flex flex-col justify-between items-center p-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-10"></div>
                          
                          <div className="w-full flex justify-between items-center text-[9px] text-purple-400 font-mono z-10">
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>RF_ENERGY_THERMOLIFTING</span>
                            <span>DEPTH: MULTI-LAYER</span>
                          </div>
                          
                          {/* RF Thermal Sine pulses */}
                          <svg className="w-full h-16 stroke-purple-405 fill-none stroke-2 z-10" viewBox="0 0 400 100">
                            <path d="M 0 50 Q 15 10 30 50 T 60 50 T 90 50 Q 105 10 120 50 T 150 50 T 180 50 Q 195 10 210 50 T 240 50 T 270 50 Q 285 10 300 50 T 330 50 T 360 50 Q 375 10 390 50" className="stroke-purple-400 opacity-90 animate-pulse" />
                            <path d="M 0 50 Q 25 80 50 20 T 100 80 T 150 20 T 200 80 T 250 20 T 300 80 T 400 50" className="stroke-pink-400 opacity-40" />
                          </svg>

                          <div className="w-full flex justify-between text-[8px] text-slate-400 font-mono z-10">
                            <span>PULSE_WIDTH: COHERENT</span>
                            <span>APPLET SPEC: DUET V PREMIUM</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>Рекомендуемый комплект:</span>
                            <span className="text-purple-700">EunSung Duet V (РФ Лифтинг)</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <div>🧾 Сертификация РФ: <strong className="text-indigo-800">Полный пакет РУ</strong></div>
                            <div>🕒 Срок окупаемости: <strong className="text-emerald-700">~2.5 месяца!</strong></div>
                            <div>🚀 Процедура чек: <strong className="text-purple-800">от 12 000 руб.</strong></div>
                            <div>🔧 Обучение врачей: <strong className="text-slate-800">В подарок с дипломом</strong></div>
                          </div>
                          <button 
                            onClick={async () => {
                              setSelectedCategory('cosmetology');
                              handleTabChange('catalog');
                              logger.info('Переход к аппарату Duet V в каталоге');
                            }}
                            className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-750 text-purple-800 font-black text-[11px] rounded-lg border border-purple-200 transition text-center cursor-pointer"
                          >
                            СМОТРЕТЬ ПРАЙС-ЛИСТЫ DUET V
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </section>

            {/* INTUITIVE CATALOG CATEGORIES */}
            <section className="space-y-6" id="overview-categories">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Популярные категории техники</h2>
                  <p className="text-sm text-slate-500">Выберите направленность для отображения доступных приборов экспертного уровня</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedCategory('');
                    handleTabChange('catalog');
                  }}
                  className="text-sm font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 group"
                >
                  <span>Все категории каталога</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {categories.slice(0, 8).map(category => {
                  return (
                    <div 
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        handleTabChange('catalog');
                      }}
                      className="group cursor-pointer bg-white border border-slate-100 hover:border-cyan-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-slate-50 group-hover:bg-cyan-50 p-3 rounded-xl text-slate-700 group-hover:text-cyan-600 transition-colors">
                          <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-cyan-100 group-hover:text-cyan-700 transition-colors">
                          {category.productCount} поз.
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-slate-950 group-hover:text-cyan-600 transition-colors mb-1.5">
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {category.tagline}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ОСНОВНЫЕ ЭТАПЫ РАБОТ */}
            <section className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-10 space-y-12 relative overflow-hidden" id="work-stages-suite">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Прозрачный регламент от проектирования до первого пациента</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                  Основные этапы работ
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Систематизированный алгоритм запуска вашего медицинского центра или отдельного кабинета по государственным лицензионным приказам Минздрава РФ с поддержкой АстМед.
                </p>
              </div>

              {/* Grid showing stages exactly as requested in the image */}
              <div className="space-y-8 relative z-10">
                
                {/* PHASE 1: ПОДГОТОВКА */}
                <div className="grid lg:grid-cols-12 gap-6 items-stretch border-l-4 lg:border-l-0 lg:border-t-4 border-emerald-500 pl-4 lg:pl-0 lg:pt-6">
                  <div className="lg:col-span-2 flex lg:flex-col justify-center items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Этапы 1 - 3</span>
                    <span className="text-sm font-black uppercase text-emerald-700 tracking-tight">Подготовка</span>
                  </div>
                  <div className="lg:col-span-10 grid sm:grid-cols-3 gap-5 relative">
                    
                    {/* Step 1 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-emerald-55 text-emerald-700 p-2.5 rounded-xl bg-emerald-50">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">1 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Бизнес-планирование</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Составление финансовой модели, анализ конкурентной среды, определение концепции и окупаемости.</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-emerald-55 text-emerald-700 p-2.5 rounded-xl bg-emerald-50">
                          <SlidersHorizontal className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">2 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Проектирование</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Разработка инженерного и архитектурного проекта клиники с привязкой к жестким СанПиН стандартам.</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-emerald-55 text-emerald-700 p-2.5 rounded-xl bg-emerald-50">
                          <Search className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">3 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Подбор оборудования</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Составление спецификации приборов под нужный класс лицензии, расчет лизинговых контрактов.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PHASE 2: РЕАЛИЗАЦИЯ */}
                <div className="grid lg:grid-cols-12 gap-6 items-stretch border-l-4 lg:border-l-0 lg:border-t-4 border-cyan-500 pl-4 lg:pl-0 lg:pt-6">
                  <div className="lg:col-span-2 flex lg:flex-col justify-center items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Этапы 4 - 6</span>
                    <span className="text-sm font-black uppercase text-cyan-700 tracking-tight">Реализация</span>
                  </div>
                  <div className="lg:col-span-10 grid sm:grid-cols-3 gap-5">
                    
                    {/* Step 4 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-cyan-55 text-cyan-700 p-2.5 rounded-xl bg-cyan-50">
                          <Package className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">4 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Подготовка помещений</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Чистовой заземленный медицинский ремонт, монтаж экранирования и рентген-защитных дверей.</p>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-cyan-55 text-cyan-700 p-2.5 rounded-xl bg-cyan-50">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">5 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Закупка оборудования</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Официальная поставка со всеми документами, РУ Росздравнадзора РФ, декларациями соответствия.</p>
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-cyan-55 text-cyan-700 p-2.5 rounded-xl bg-cyan-50">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">6 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Ввод в эксплуатацию</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Инсталляция оборудования инженерами с лицензией, проведение пусконаладки и акта ввода.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PHASE 3: ЗАПУСК */}
                <div className="grid lg:grid-cols-12 gap-6 items-stretch border-l-4 lg:border-l-0 lg:border-t-4 border-indigo-500 pl-4 lg:pl-0 lg:pt-6">
                  <div className="lg:col-span-2 flex lg:flex-col justify-center items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Этапы 7 - 9</span>
                    <span className="text-sm font-black uppercase text-indigo-700 tracking-tight">Запуск</span>
                  </div>
                  <div className="lg:col-span-10 grid sm:grid-cols-3 gap-5">
                    
                    {/* Step 7 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-indigo-55 text-indigo-700 p-2.5 rounded-xl bg-indigo-50">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">7 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Обучение пользователей</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Инструктаж докторов сертифицированными клиническими специалистами с выдачей официального допуска.</p>
                      </div>
                    </div>

                    {/* Step 8 */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-indigo-55 text-indigo-700 p-2.5 rounded-xl bg-indigo-50">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full font-bold uppercase">8 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">Лицензирование</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Сбор и экспертиза комплекта технических паспортов медицинского оборудования для успешной проверки.</p>
                      </div>
                    </div>

                    {/* Step 9 */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-500 p-5 rounded-2xl shadow-lg hover:shadow-xl transition duration-200 flex flex-col justify-between space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] bg-emerald-600 text-white px-2.5 py-1 rounded-full font-black uppercase tracking-wider animate-pulse">9 этап</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-sm sm:text-base text-slate-950 leading-snug">Открытие клиники</h4>
                        <p className="text-xs text-slate-600 font-semibold leading-relaxed">Торжественное открытие, запуск потока пациентов на премиальном сертифицированном оборудовании.</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Connecting path schematic trace for desktop overlay */}
              <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-10">
                <svg className="w-full h-full stroke-emerald-500 stroke-[5] fill-none" viewBox="0 0 1200 800" strokeDasharray="10, 8">
                  <path d="M 180 180 L 1020 180 A 40 40 0 0 1 1060 220 L 1060 410 A 40 40 0 0 1 1020 450 L 180 450 A 40 40 0 0 0 140 490 L 140 680 A 40 40 0 0 0 180 720 L 1020 720" />
                </svg>
              </div>
            </section>

            {/* TRUST & KEY REASONS FOR MEDEQ LEVEL COOPERATION */}
            <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center" id="trust-factors-banner">
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">Наши стандарты</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-none">
                  Почему клиники выбирают АстМед
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Поставляем только оригинальное медоборудование с заводов-изготовителей. Имеем полный комплекс разрешительной документации и команду штатных квалифицированных инженеров.
                </p>
                <button 
                  onClick={() => triggerQuote(null, 'consultation')}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition"
                >
                  Заказать консультацию специалиста
                </button>
              </div>

              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 rounded-xl border border-slate-50">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-cyan-600 h-11 flex items-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Регистрационные удостоверения (РУ)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">100% приборов поставляется с действующими декларациями и РУ Росздравнадзора для безопасного лицензирования.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border border-slate-50">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-cyan-600 h-11 flex items-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Авторизованный сервис 24/7</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Собственные сервисные бригады обеспечивают плановое ТО, монтаж, и оперативный ремонт по всей стране.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border border-slate-50">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-cyan-600 h-11 flex items-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Аппликационное обучение врачей</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Обучаем ваш клинический персонал тонкостям работы с датчиками, суб-режимами верификации и архивации.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border border-slate-50">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-cyan-600 h-11 flex items-center">
                    <BadgePercent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Лизинговые спецпрограммы</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Фирменная рассрочка и лизинг с авансированием от 10% и индивидуальным графиком ежемесячных платежей.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SELECTION OF HIGHLIGHT BRAND PARTNERS */}
            <section className="space-y-6" id="brand-logos-carousel">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Официальный дистрибьютор мировых марок</h2>
                <p className="text-sm text-slate-500">Прямые контракты гарантируют подлинность и лучшую оптовую цену в РФ</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {brands.map(brand => {
                  return (
                    <div 
                      key={brand.id}
                      onClick={() => {
                        setSelectedBrand(brand.id);
                        handleTabChange('catalog');
                      }}
                      className="bg-white border border-slate-100 hover:border-cyan-300 rounded-xl p-4 flex flex-col justify-center items-center cursor-pointer hover:shadow-md transition text-center"
                    >
                      <img src={brand.logo} alt={brand.name} className="h-8 max-w-full object-contain mb-2 saturate-0 hover:saturate-100 transition-all opacity-70 hover:opacity-100" />
                      <div className="text-xs font-extrabold text-slate-800">{brand.name}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">{brand.country}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ЦЕНТР ДОВЕРИЯ И СНЯТИЯ РИСКОВ (ОТРАБОТКА ВОЗРАЖЕНИЙ) */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 space-y-10 relative overflow-hidden shadow-2xl shadow-slate-900/40" id="trust-and-objections-suite">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
              
              <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
                
                {/* Left Side: Description and Interactive Objection Tabs Selector */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <span className="text-cyan-400 font-extrabold tracking-widest text-[10px] uppercase block">Репутация & Безопасность</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                      А вы вообще надежная компания?
                    </h2>
                    <p className="text-slate-450 text-xs text-slate-400 leading-relaxed">
                      Покупка сложного оборудования экспертного класса сопряжена с рисками. Мы собрали открытые юридические, финансовые и сервисные гарантии АстМед в едином хабе прозрачности.
                    </p>
                  </div>

                  {/* Objection Selection Tabs */}
                  <div className="space-y-3 pt-2">
                    {[
                      { id: 'trust', icon: '🤝', label: 'Доверие', title: '«А вы вообще надёжная компания?»' },
                      { id: 'price', icon: '💰', label: 'Цена', title: '«Цена слишком высокая / непонятная?»' },
                      { id: 'risk', icon: '🔧', label: 'Риски', title: '«А если сломается — кто его починит?»' },
                      { id: 'docs', icon: '📋', label: 'Документы', title: '«Есть ли все регистрационные документы?»' },
                      { id: 'train', icon: '🎓', label: 'Обучение', title: '«Кто будет обучать наш медперсонал?»' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveObjectionTab(tab.id as any);
                          logger.info(`Переход по вкладке отработки возражений: ${tab.label}`);
                        }}
                        className={`w-full text-left px-4 py-3.5 rounded-2xl border transition duration-200 cursor-pointer flex items-center justify-between group ${activeObjectionTab === tab.id ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10' : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{tab.icon}</span>
                          <div className="space-y-0.5">
                            <span className="text-[10px] uppercase tracking-wider font-bold block text-cyan-400">{tab.label}</span>
                            <span className="text-xs font-bold leading-normal block">{tab.title}</span>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${activeObjectionTab === tab.id ? 'translate-x-1 text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side: Detailed Handler Board (Bento style based on active objection state) */}
                <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden min-h-[480px] flex flex-col justify-between">
                  <div className="space-y-6 text-slate-300">
                    
                    {/* TAB 1: TRUST */}
                    {activeObjectionTab === 'trust' && (
                      <div className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">СТАНДАРТ БЕЗОПАСНОСТИ: ДОВЕРИЕ</span>
                          <h3 className="text-lg sm:text-xl font-black text-white">Медоборудование — не бытовая техника</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Покупатель боится купить у компании, которая через год исчезнет. Особенно если клиника зависит от аппарата ежедневно. АстМед работает стабильно с 2012 года.
                          </p>
                        </div>

                        {/* Facts Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase font-bold">Основание</div>
                            <div className="text-base font-black text-cyan-400">2012 год</div>
                            <div className="text-[9px] text-slate-500 mt-0.5">14 лет на рынке РФ</div>
                          </div>
                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase font-bold">Поставки</div>
                            <div className="text-base font-black text-cyan-400">2300+ систем</div>
                            <div className="text-[9px] text-slate-500 mt-0.5">В клиники и госучреждения</div>
                          </div>
                          <div className="col-span-2 sm:col-span-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase font-bold">Региональный охват</div>
                            <div className="text-base font-black text-cyan-400">РФ и СНГ</div>
                            <div className="text-[9px] text-slate-500 mt-0.5">8 филиалов под ключ</div>
                          </div>
                        </div>

                        {/* Real Cases List */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Реальные кейсы поставок:</div>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-start gap-2.5 bg-slate-950/30 p-2.5 rounded-lg border border-slate-850">
                              <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-white block">Областная больница №3, Краснодар</span>
                                <span className="text-[11px] text-slate-400">Поставка 2 экспертных аппаратов УЗИ (2021) — бесперебойная работа</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5 bg-slate-950/30 p-2.5 rounded-lg border border-slate-850">
                              <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-white block">Городской кардиоцентр им. Бакулева</span>
                                <span className="text-[11px] text-slate-400">Оснащение реанимационного блока наркозными комплексами АСТМЕД</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Team Image / Text info */}
                        <div className="flex items-center gap-3 p-3 bg-slate-950/20 rounded-xl border border-slate-800">
                          <Users className="w-8 h-8 text-cyan-400 shrink-0" />
                          <div className="text-[11px]">
                            <span className="font-bold text-white block">Профессиональная команда сервисных инженеров</span>
                            <span className="text-slate-400">Егор Корнеев (Руководитель технической службы), Михаил Резников (Сертифицированный Минздравом инженер).</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: PRICE */}
                    {activeObjectionTab === 'price' && (
                      <div className="space-y-5 animate-fade-in">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">СТАНДАРТ БЕЗОПАСНОСТИ: ПОНЯТНЫЕ ЦЕНЫ</span>
                          <h3 className="text-lg sm:text-xl font-black text-white">Вилка цен от АСТМЕД без накруток</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Если цены нет — клиент уходит к конкуренту. Если цена есть, но непонятна — тоже уходит. У нас цена приводится в контексте: «от X рублей» + подробная расшифровка комплектаций.
                          </p>
                        </div>

                        {/* Inclusions block */}
                        <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
                          <div className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">Что всегда входит в цену:</div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">🚚</span>
                              <span>Застрахованная доставка до двери</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">⚙️</span>
                              <span>Монтаж и пусконаладка на месте</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">📚</span>
                              <span>Инструктаж вашего персонала</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">🛡️</span>
                              <span>Двойная гарантия от 12 до 36 мес</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Calculator */}
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-800/30 space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase text-cyan-400">
                            <span>Калькулятор лизинга / рассрочки:</span>
                            <span className="text-slate-400 uppercase">0% удорожание</span>
                          </div>

                          <div className="space-y-2">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-400">Стоимость оборудования:</span>
                                <span className="font-extrabold text-white">{(objectionCalcPrice).toLocaleString('ru-RU')} ₽</span>
                              </div>
                              <input 
                                type="range" 
                                min="500000" 
                                max="10000000" 
                                step="100000"
                                value={objectionCalcPrice}
                                onChange={(e) => setObjectionCalcPrice(Number(e.target.value))}
                                className="w-full accent-cyan-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-400">Авансовый взнос:</span>
                                  <span className="font-extrabold text-cyan-400">{objectionCalcUpfront}%</span>
                                </div>
                                <select 
                                  value={objectionCalcUpfront} 
                                  onChange={(e) => setObjectionCalcUpfront(Number(e.target.value))}
                                  className="w-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 rounded px-2 py-1.5 focus:outline-none"
                                >
                                  <option value={10}>10% аванс</option>
                                  <option value={20}>20% аванс</option>
                                  <option value={30}>30% аванс</option>
                                  <option value={50}>50% аванс</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-400">Срок:</span>
                                  <span className="font-extrabold text-cyan-400">{objectionCalcPeriod} мес.</span>
                                </div>
                                <select 
                                  value={objectionCalcPeriod} 
                                  onChange={(e) => setObjectionCalcPeriod(Number(e.target.value))}
                                  className="w-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 rounded px-2 py-1.5 focus:outline-none"
                                >
                                  <option value={6}>6 мес (рассрочка под 0%)</option>
                                  <option value={12}>12 месяцев лизинга</option>
                                  <option value={18}>18 месяцев лизинга</option>
                                  <option value={24}>24 месяца лизинга</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="bg-cyan-950/40 p-3 rounded-lg border border-cyan-900/50 flex justify-between items-center">
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-black">Ежемесячный платеж:</div>
                              <div className="text-[9px] text-slate-500">Предварительный расчет без учета спецскидок</div>
                            </div>
                            <div className="text-base sm:text-lg font-black text-cyan-400">
                              {Math.round((objectionCalcPrice * (1 - objectionCalcUpfront / 100)) / objectionCalcPeriod).toLocaleString('ru-RU')} ₽ <span className="text-xs text-slate-450 text-slate-400 font-normal">/ мес</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: RISK */}
                    {activeObjectionTab === 'risk' && (
                      <div className="space-y-5 animate-fade-in">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">СТАНДАРТ БЕЗОПАСНОСТИ: ОТРИЦАТЕЛЬНЫЙ РИСК</span>
                          <h3 className="text-lg sm:text-xl font-black text-white">«А если сломается — кто вернет его в строй?»</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Страх простоя оборудования — №1 у главврачей клиник. Аппарат за 5 млн не может простоять неделю в ожидании запчастей. Мы даем юридический SLA по ремонту.
                          </p>
                        </div>

                        {/* Service Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 space-y-1">
                            <div className="flex items-center gap-1.5 text-cyan-400 font-black text-xs uppercase">
                              <Clock className="w-4 h-4" />
                              <span>SLA 24 ЧАСА</span>
                            </div>
                            <p className="text-[10px] text-slate-400">Гарантированный выезд штатного инженера в течение суток после заявки.</p>
                          </div>

                          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-450 text-emerald-400 font-black text-xs uppercase">
                              <Package className="w-4 h-4" />
                              <span>ЗАПЧАСТИ В РФ</span>
                            </div>
                            <p className="text-[10px] text-slate-400">Все ходовые блоки питания, датчики и помпы хранятся на складе в Москве.</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Действующие авторизованные сервисные центры АСТМЕД:</span>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                            <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-850">🛠️ Москва: ул. Космонавтов, 18 • +7 (495) 120-44-32</div>
                            <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-850">🛠️ Краснодар: ул. Красная, 74 • +7 (861) 299-10-12</div>
                          </div>
                        </div>

                        <div className="bg-slate-950/30 p-3 rounded-xl border border-slate-850 text-[10px] text-slate-400 italic">
                          Вы можете заключить официальный Договор на постгарантийное обслуживание со скидкой 20% при покупке любого прибора.
                        </div>
                      </div>
                    )}

                    {/* TAB 4: DOCUMENTS */}
                    {activeObjectionTab === 'docs' && (
                      <div className="space-y-5 animate-fade-in">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">СТАНДАРТ БЕЗОПАСНОСТИ: РОСЗДРАВНАДЗОР И ЗАКОНСТУПЛЕНИЕ</span>
                          <h3 className="text-lg sm:text-xl font-black text-white">Регистрационные удостоверения (РУ) Минздрава</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Использование техники без РУ в медицине грозит уголовной ответственностью. Мы гарантируем полный легальный пакет документов под любую проверку лицензирующим ведомством.
                          </p>
                        </div>

                        {/* Documents checklist */}
                        <div className="space-y-2.5 text-xs text-slate-300">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Регистрационное удостоверение Росздравнадзора с печатью</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Декларация / Сертификат соответствия ЕАЭС стандартам</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Формуляр прибора и технический паспорт на русском языке</span>
                          </div>
                        </div>

                        {/* Corporate identifiers */}
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 font-mono text-[10px] text-slate-400">
                          <div><span className="text-cyan-400 font-bold">Организация:</span> ООО «АстМед» • Юр. адрес для договоров: 123007, г. Москва, ул. Хорошёвское шоссе, д. 32А</div>
                          <div><span className="text-cyan-450 text-cyan-400 font-bold">Реквизиты:</span> ИНН: 7714896324 • ОГРН: 1127746109985 (Стабильная деятельность с 2012 года)</div>
                        </div>
                      </div>
                    )}

                    {/* TAB 5: TRAINING */}
                    {activeObjectionTab === 'train' && (
                      <div className="space-y-5 animate-fade-in">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded">СТАНДАРТ БЕЗОПАСНОСТИ: КЛИНИЧЕСКАЯ АКАДЕМИЯ</span>
                          <h3 className="text-lg sm:text-xl font-black text-white">«Кто будет обучать наш медперсонал?»</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Новый сложный аппарат без обучения врачей — выброшенные на ветер деньги. Персонал будет опасаться незнакомой техники, что парализует окупаемость. Мы снимем этот барьер.
                          </p>
                        </div>

                        {/* Training program details */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-center space-y-1">
                            <span className="text-lg block">👨‍⚕️</span>
                            <span className="text-[10px] font-bold text-white block">Обучение в клинике</span>
                            <span className="text-[9px] text-slate-500 block">Выезжаем в любые города РФ и ЕАЭС перед пуском.</span>
                          </div>

                          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-center space-y-1">
                            <span className="text-lg block">📹</span>
                            <span className="text-[10px] font-bold text-white block">Портал "Академия"</span>
                            <span className="text-[9px] text-slate-500 block">Пожизненный доступ к видеоурокам и лекциям врачей.</span>
                          </div>
                        </div>

                        {/* Support details */}
                        <div className="p-3 bg-cyan-950/30 border border-cyan-900/50 rounded-xl flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-400 text-[10px] block">Прямая техническая линия поддержки:</span>
                            <span className="font-extrabold text-white">8 (800) 555-39-44</span>
                          </div>
                          <span className="text-[9px] bg-cyan-500 text-slate-950 px-2 py-0.5 rounded font-black uppercase">Ежедневно 8:00 - 21:00 МСК</span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* BOTTOM REASSURANCE & SOFT CTA BUTTONS ("ПОДОБРАТЬ / ВЫЯСНИТЬ" INSTEAD OF "КУПИТЬ / ЗАКАЗАТЬ") */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center gap-1.5 justify-center sm:justify-start text-emerald-450 text-emerald-400 text-[11px] font-bold">
                        <span>📞 Перезвоним в течение 30 минут</span>
                        <span className="text-slate-600">•</span>
                        <span>🔒 Без обязательств</span>
                      </div>
                      <p className="text-[10px] text-slate-450 text-slate-400">Форма подбора снижает риски: вы просто получаете экспертный расчет на email.</p>
                    </div>

                    <button
                      onClick={() => {
                        logger.info('Клик по кнопке "Подобрать оборудование под задачу"');
                        triggerQuote(null, 'consultation');
                      }}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-550/20 hover:scale-[1.02] transition duration-200 cursor-pointer block w-full sm:w-auto text-center font-sans tracking-wide uppercase"
                    >
                      Подобрать оборудование
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* ОТЗЫВЫ КЛИЕНТОВ */}
            <section className="space-y-8" id="client-reviews-section">
              <div className="space-y-2">
                <span className="text-cyan-500 font-extrabold tracking-widest text-xs uppercase block">Отзывы клиентов</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Что говорят клиники о работе с АСТМЕД
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Review Card 1 */}
                <div className="bg-white border border-slate-100 hover:border-cyan-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="space-y-4">
                    {/* Visual Quote Icon */}
                    <div className="text-cyan-400 font-serif text-5xl font-bold leading-none select-none">
                      ««
                    </div>
                    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed italic">
                      «Купили у АСТМЕД диодный лазер и SMAS-аппарат. Доставка за 4 дня, монтаж и обучение — за один выезд. Окупили лазер за 3 месяца, очередь на эпиляцию теперь на 2 недели вперед.»
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-50 space-y-2">
                    {/* Five Gold/Cyan Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-cyan-500 fill-cyan-500" />
                      ))}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 group-hover:text-cyan-600 transition-colors">Анна Лебедева</div>
                      <div className="text-[11px] text-slate-400">Главврач клиники «Эстет», Москва</div>
                    </div>
                  </div>
                </div>

                {/* Review Card 2 */}
                <div className="bg-white border border-slate-100 hover:border-cyan-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="space-y-4">
                    <div className="text-cyan-400 font-serif text-5xl font-bold leading-none select-none">
                      ««
                    </div>
                    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed italic">
                      «Брали 4 комбайна Combine 7 и 2 криолиполиза. Цены ниже, чем у конкурентов на 15-20%, и при этом дали лизинг под 0% на полгода. Техник приезжает сам, без долгих согласований.»
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-50 space-y-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-cyan-500 fill-cyan-500" />
                      ))}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 group-hover:text-cyan-600 transition-colors">Игорь Самойлов</div>
                      <div className="text-[11px] text-slate-400">Владелец сети «Космо Лайн», 4 салона в СПб</div>
                    </div>
                  </div>
                </div>

                {/* Review Card 3 */}
                <div className="bg-white border border-slate-100 hover:border-cyan-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="space-y-4">
                    <div className="text-cyan-400 font-serif text-5xl font-bold leading-none select-none">
                      ««
                    </div>
                    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed italic">
                      «Боялась брать аппарат удалённо. Менеджер созвонился, всё показал на видео, прислал реальные отзывы. УЗ-чистка и микротоки пришли за 3 дня, сервис помогал по WhatsApp с настройкой.»
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-50 space-y-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-cyan-500 fill-cyan-500" />
                      ))}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 group-hover:text-cyan-600 transition-colors">Мария Гречко</div>
                      <div className="text-[11px] text-slate-400">Косметолог, частный кабинет, Краснодар</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Verified Sources badging matching the photo exactly */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-semibold text-slate-500">
                <span>Отзывы подтверждены:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-200 transition">
                    Yandex.Maps <strong className="text-slate-900">4.9</strong>
                  </span>
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-200 transition">
                    2ГИС <strong className="text-slate-900">4.8</strong>
                  </span>
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-200 transition">
                    Otzovik.com <strong className="text-indigo-650 text-slate-900">100%</strong>
                  </span>
                </div>
              </div>
            </section>

            {/* CTA QUICK LEAD CAPTURE BLOCK */}
            <section className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white flex flex-col lg:flex-row justify-between items-center gap-6" id="quick-catalog-cta">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-white">Не нашли интересующую модель оборудования?</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                  Наш склад обновляется ежедневно. Оставьте заявку со спецификацией, и наши эксперты подберут оригинальную аппаратуру или предложат сертифицированные аналоги по отличной цене.
                </p>
              </div>
              <button 
                onClick={() => triggerQuote(null, 'consultation')}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-7 py-3 rounded-xl shadow-lg transition whitespace-nowrap cursor-pointer text-sm"
              >
                Оставить заявку на подбор
              </button>
            </section>

          </div>
        )}

        {/* 2. LIVE CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in" id="catalog-view">
            
            {/* Breadcrumbs & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                  <span className="cursor-pointer hover:text-slate-600" onClick={() => handleTabChange('main')}>Главная</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-slate-600">Каталог</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || 'Диагностические системы' : 'Полный каталог медицинского оборудования'}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Найдено товаров: <span className="font-extrabold text-slate-900">{filteredProducts.length}</span>
                </p>
              </div>

              {/* Sorting and controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  <span>Сортировка:</span>
                </div>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-white border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="popularity">По умолчанию (Релевантность)</option>
                  <option value="price_asc">Сначала недорогие</option>
                  <option value="price_desc">Сначала премиальные</option>
                </select>
              </div>
            </div>

            {/* Catalog Grid Layout */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side Advanced Filter Widgets */}
              <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-5 space-y-6 shadow-sm sticky top-28" id="catalog-filters">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4.5 h-4.5 text-cyan-600" />
                    <span className="font-bold text-sm text-slate-900">Фильтрация</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedBrand('');
                      setSelectedCountry('');
                      setSelectedAvailability('');
                      const prices = products.map(p => p.price).filter(p => p > 0);
                      const maxPrice = prices.length ? Math.max(...prices) : 6000000;
                      setPriceRange({ min: 0, max: maxPrice });
                      setSearchQuery('');
                      logger.info('Фильтры успешно сброшены в дефолтное состояние');
                    }}
                    className="text-[10px] font-bold text-slate-400 hover:text-cyan-600 cursor-pointer"
                  >
                    Сбросить всё
                  </button>
                </div>

                {/* Categories Dynamic Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Категория оборудования</label>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    <div 
                      onClick={() => setSelectedCategory('')}
                      className={`flex items-center justify-between text-xs px-2 py-1.5 rounded-lg cursor-pointer transition ${!selectedCategory ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span>Все категории</span>
                    </div>
                    {categories.map(cat => (
                      <div 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center justify-between text-xs p-2 rounded-lg cursor-pointer transition ${selectedCategory === cat.id ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 rounded">{cat.productCount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands Widget */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Производитель</label>
                  <div className="space-y-1">
                    <div 
                      onClick={() => setSelectedBrand('')}
                      className={`flex items-center text-xs px-2 py-1.5 rounded-lg cursor-pointer transition ${!selectedBrand ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span>Все бренды</span>
                    </div>
                    {brands.map(b => (
                      <div 
                        key={b.id}
                        onClick={() => setSelectedBrand(b.id)}
                        className={`flex items-center justify-between text-xs p-2 rounded-lg cursor-pointer transition ${selectedBrand === b.id ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span>{b.name}</span>
                        <span className="text-[9px] text-slate-400">{b.country}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Countries Widget */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Страна производства</label>
                  <div className="space-y-1">
                    <div 
                      onClick={() => setSelectedCountry('')}
                      className={`flex items-center text-xs px-2 py-1.5 rounded-lg cursor-pointer transition ${!selectedCountry ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span>Любая страна</span>
                    </div>
                    {uniqueCountries.map(country => (
                      <div 
                        key={country}
                        onClick={() => setSelectedCountry(country)}
                        className={`flex items-center text-xs p-2 rounded-lg cursor-pointer transition ${selectedCountry === country ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span>{country}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability Widget */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Наличие на складе</label>
                  <div className="space-y-1.5">
                    {[
                      { id: '', label: 'Все варианты' },
                      { id: 'in_stock', label: 'В наличии в РФ' },
                      { id: 'on_order', label: 'Под заказ' }
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedAvailability(opt.id)}
                        className={`flex items-center text-xs p-2 rounded-lg cursor-pointer transition ${selectedAvailability === opt.id ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span className="flex-1">{opt.label}</span>
                        {selectedAvailability === opt.id && <Check className="w-4 h-4 text-cyan-600" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Slider mockup */}
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Цена (Руб.)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-1/2 text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none"
                      placeholder="От"
                    />
                    <span className="text-xs text-slate-400">-</span>
                    <input 
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-1/2 text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none"
                      placeholder="До"
                    />
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="6000000"
                    step="100000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                </div>

                {/* Live Banner block */}
                <div className="bg-slate-950 text-white rounded-xl p-4 text-xs space-y-2 relative overflow-hidden shadow-md">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-600/35 rounded-full blur-2xl"></div>
                  <div className="font-bold relative z-10 text-cyan-400">Лизинг для ООО / ИП</div>
                  <p className="text-slate-300 leading-relaxed relative z-10">Программы экспресс-лизинга за 72 часа. Одобряемость свыше 92%.</p>
                  <button 
                    onClick={() => triggerQuote(null, 'leasing')}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 py-1.5 font-bold rounded mt-1 transition text-center text-[10px]"
                  >
                    Подать заявку
                  </button>
                </div>
              </aside>

              {/* Main Products Grid */}
              <div className="lg:col-span-9 space-y-8" id="catalog-listing">
                {filteredProducts.length === 0 ? (
                  <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-3">
                    <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-800">Нет подходящих товаров</h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto">Попробуйте ослабить критерии фильтров или ввести другой поисковый запрос.</p>
                    <button 
                      onClick={() => {
                        setSelectedCategory('');
                        setSelectedBrand('');
                        setSelectedCountry('');
                        setSelectedAvailability('');
                        setPriceRange({ min: 0, max: 6000000 });
                        setSearchQuery('');
                      }}
                      className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Показать всё оборудование
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => {
                      const isFavorite = favorites.includes(product.id);
                      const isCompared = compareList.includes(product.id);
                      
                      return (
                        <div 
                          key={product.id}
                          className="bg-white border border-slate-100 hover:border-cyan-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between group h-full"
                          id={`product-card-${product.id}`}
                        >
                          {/* Image box */}
                          <div className="relative bg-slate-50 overflow-hidden h-44 flex items-center justify-center">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                              {product.badge === 'hit' && (
                                <span className="bg-red-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md">Хит</span>
                              )}
                              {product.badge === 'new' && (
                                <span className="bg-cyan-600 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md">Новинка</span>
                              )}
                              {product.badge === 'promo' && (
                                <span className="bg-amber-500 text-slate-900 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md">Акция</span>
                              )}
                            </div>

                            {/* Verification Badge */}
                            {product.hasRegistrationCertificate && (
                              <div className="absolute bottom-3 left-3 bg-white/95 rounded-md px-1.5 py-0.5 text-[9px] text-slate-600 flex items-center gap-1 font-bold shadow-sm backdrop-blur">
                                <FileCheck className="w-3 h-3 text-cyan-600" />
                                <span>Рег.Уд (РУ)</span>
                              </div>
                            )}

                            {/* Hover Utilities (Add to Favorite & Compare) */}
                            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                              {/* Favorites Button */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(product.id);
                                }}
                                className={`p-2 rounded-lg border shadow-sm transition-all cursor-pointer ${isFavorite ? 'bg-red-500 border-red-500 text-white' : 'bg-white/95 border-slate-100 text-slate-600 hover:text-red-500'}`}
                              >
                                <Heart className="w-4 h-4 fill-current" />
                              </button>

                              {/* Comparison Button */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCompare(product.id);
                                }}
                                className={`p-2 rounded-lg border shadow-sm transition-all cursor-pointer ${isCompared ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white/95 border-slate-100 text-slate-600 hover:text-cyan-600'}`}
                              >
                                <ArrowRightLeft className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Info area */}
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              {/* Brand and Country */}
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                <span>{product.brandName} • {product.country}</span>
                                <span className="font-mono text-slate-300 select-all">{product.article}</span>
                              </div>

                              <h3 
                                onClick={() => {
                                  openProductDetails(product);
                                }}
                                className="font-extrabold text-sm sm:text-base text-slate-950 hover:text-cyan-600 cursor-pointer line-clamp-2 leading-snug tracking-tight transition"
                              >
                                {product.name}
                              </h3>

                              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                                {product.description}
                              </p>

                              {/* Key specs bullet points summary */}
                              <div className="bg-slate-50 rounded-lg p-2.5 mt-2 space-y-1">
                                {Object.entries(product.fullSpecs).slice(0, 3).map(([key, val]) => (
                                  <div key={key} className="flex justify-between items-center text-[10px] text-slate-500">
                                    <span className="font-semibold">{key}:</span>
                                    <span className="text-slate-800 font-bold truncate max-w-44 text-right">{val}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Actions and Price bottom box */}
                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Цена</span>
                                <span className="text-sm sm:text-lg font-black text-slate-950">
                                  {product.price > 0 ? (
                                    <>
                                      {product.price.toLocaleString('ru-RU')} <span className="text-xs font-bold text-slate-500">₽</span>
                                    </>
                                  ) : (
                                    'По запросу'
                                  )}
                                </span>
                                {product.oldPrice && (
                                  <span className="text-[10px] sm:text-xs text-slate-400 font-medium line-through block -mt-1">
                                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                                  </span>
                                )}
                              </div>

                              <div className="flex gap-1.5 flex-wrap justify-end">
                                <button
                                  onClick={() => {
                                    openProductDetails(product);
                                  }}
                                  className="text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-lg transition"
                                >
                                  Подробнее
                                </button>
                                <button
                                  onClick={() => triggerQuote(product, 'price')}
                                  className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-md transition"
                                >
                                  Запросить цену
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* 3. LIVE COMPARISON MODULE OVERVIEW */}
        {activeTab === 'comparison' && (
          <div className="space-y-6 animate-fade-in" id="comparison-view">
            <div className="border-b border-slate-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Сравнение медицинского оборудования</h1>
              <p className="text-sm text-slate-500 mt-1">
                Сравнивайте технические характеристики и комплектацию приборов для точного выбора под регламент клиники.
              </p>
            </div>

            {compareList.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-4">
                <ArrowRightLeft className="w-14 h-14 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">Список сравнения пуст</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">Добавляйте приборы в сравнение из каталога, нажимая на иконку стрелок.</p>
                <button 
                  onClick={() => handleTabChange('catalog')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Comparison Actions row */}
                <div className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={highlightDifferences}
                        onChange={(e) => setHighlightDifferences(e.target.checked)}
                        className="rounded accent-cyan-600 w-4 h-4 cursor-pointer"
                      />
                      <span>Показывать только различия</span>
                    </label>
                  </div>
                  <button 
                    onClick={() => {
                      setCompareList([]);
                      logger.info('Список сравнения полностью очищен');
                    }}
                    className="text-xs font-semibold text-red-500 hover:text-red-650 flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Очистить сравнение</span>
                  </button>
                </div>

                {/* Matrix Table container */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="p-4 text-xs font-bold text-slate-400 uppercase w-1/4">Параметр сравнения</th>
                        {compareList.map(id => {
                          const p = products.find(prod => prod.id === id);
                          if (!p) return null;
                          return (
                            <th key={p.id} className="p-4 w-1/4 relative border-l border-slate-100">
                              <button 
                                onClick={() => toggleCompare(p.id)}
                                className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1 rounded-md"
                                title="Убрать"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="space-y-1.5 mt-2">
                                <span className="text-[9px] font-bold uppercase text-cyan-600 tracking-wider">{p.brandName}</span>
                                <div className="text-xs font-black text-slate-900 line-clamp-2 leading-snug">{p.name}</div>
                                <div className="text-xs font-bold font-mono text-cyan-600">
                                  {p.price > 0 ? `${p.price.toLocaleString('ru-RU')} ₽` : 'По запросу'}
                                </div>
                                <div className="pt-2 flex gap-1">
                                  <button 
                                    onClick={() => triggerQuote(p, 'kp')}
                                    className="bg-cyan-600 text-[10px] text-white font-extrabold px-2.5 py-1.5 rounded"
                                  >
                                    Запросить КП
                                  </button>
                                  <button 
                                    onClick={() => openProductDetails(p)}
                                    className="border border-slate-200 text-[10px] font-bold text-slate-600 px-2 py-1.5 rounded hover:bg-slate-50"
                                  >
                                    Обзор
                                  </button>
                                </div>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Class / Категория */}
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-xs font-bold text-slate-500 bg-slate-50/30">Категория прибора</td>
                        {compareList.map(id => {
                          const p = products.find(prod => prod.id === id);
                          return (
                            <td key={id} className="p-4 text-xs font-semibold text-slate-800 border-l border-slate-100">
                              {p?.categoryName}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Страна */}
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-xs font-bold text-slate-500 bg-slate-50/30">Страна сборки</td>
                        {compareList.map(id => {
                          const p = products.find(prod => prod.id === id);
                          return (
                            <td key={id} className="p-4 text-xs font-bold text-slate-800 border-l border-slate-100">
                              {p?.country}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Гарантия */}
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-xs font-bold text-slate-500 bg-slate-50/30">Срок гарантии</td>
                        {compareList.map(id => {
                          const p = products.find(prod => prod.id === id);
                          return (
                            <td key={id} className="p-4 text-xs text-slate-800 border-l border-slate-100">
                              {p?.warrantyMonths} месяцев
                            </td>
                          );
                        })}
                      </tr>

                      {/* Регистрационное удостоверение */}
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-xs font-bold text-slate-500 bg-slate-50/30">Наличие РУ Минздрава</td>
                        {compareList.map(id => {
                          const p = products.find(prod => prod.id === id);
                          return (
                            <td key={id} className="p-4 text-xs text-slate-800 border-l border-slate-100 font-bold">
                              {p?.hasRegistrationCertificate ? (
                                <span className="text-emerald-500 flex items-center gap-1">✔ Имеется в наличии</span>
                              ) : (
                                <span className="text-amber-500">По запросу</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Active components specs loop */}
                      {['Класс аппарата', 'Тип монитора', 'Эластография', 'Активные порты'].map(specName => {
                        // Check if values have differences across listed items, or if filter highlights differences
                        const values = compareList.map(id => {
                          const p = products.find(prod => prod.id === id);
                          return p?.fullSpecs[specName] || '—';
                        });
                        const hasDifferences = new Set(values).size > 1;

                        if (highlightDifferences && !hasDifferences) return null;

                        return (
                          <tr key={specName} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 text-xs font-bold text-slate-500 bg-slate-50/30">{specName}</td>
                            {compareList.map(id => {
                              const p = products.find(prod => prod.id === id);
                              return (
                                <td key={id} className="p-4 text-xs text-slate-800 border-l border-slate-100 leading-relaxed font-medium">
                                  {p?.fullSpecs[specName] || '—'}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}

                    </tbody>
                  </table>
                </div>

              </div>
            )}

          </div>
        )}

        {/* 4. LIVE FAVORITES VIEW */}
        {activeTab === 'favorites' && (
          <div className="space-y-6 animate-fade-in" id="favorites-view">
            <div className="border-b border-slate-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Избранное</h1>
              <p className="text-sm text-slate-500 mt-1">Оборудование, сохраненное для быстрого просмотра или отправки пакетного запроса на предложение.</p>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-4">
                <Heart className="w-14 h-14 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">Список избранного пуст</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">Отмечайте понравившиеся товары сердечком, чтобы быстро вернуться к ним позже.</p>
                <button 
                  onClick={() => handleTabChange('catalog')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
                >
                  Перейти к выбору техники
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Favorites tools bar */}
                <div className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 font-semibold">Выбрано позиций: <span className="font-extrabold text-slate-850">{favorites.length}</span></span>
                  <button 
                    onClick={() => {
                      triggerQuote(null, 'kp');
                      logger.info('Запрос КП сразу на весь пакет избранного оборудования');
                    }}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs px-5 py-2 rounded-lg"
                  >
                    Запросить общее КП на все товары
                  </button>
                </div>

                {/* Listing */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map(id => {
                    const product = products.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div 
                        key={product.id}
                        className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                      >
                        <div className="relative h-40 bg-slate-50">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => toggleFavorite(product.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 block">{product.brandName}</span>
                            <div className="font-bold text-sm text-slate-900 truncate">{product.name}</div>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{product.description}</p>
                          </div>
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-sm font-extrabold text-slate-950">
                              {product.price > 0 ? `${product.price.toLocaleString('ru-RU')} ₽` : 'Цена по запросу'}
                            </span>
                            <button 
                              onClick={() => openProductDetails(product)}
                              className="bg-slate-100 text-[11px] font-bold text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition"
                            >
                              Подробнее
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

          </div>
        )}

        {/* 5. TURNEY SERVICES VIEW */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-fade-in" id="services-view">
            <div className="border-b border-slate-200 pb-5 text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Комплексный Подход</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Решения для клиник под ключ</h1>
              <p className="text-sm text-slate-500">Решаем все задачи вашей клиники от проектирования до полного технического ввода и получения лицензии.</p>
            </div>

            <div className="grid gap-10">
              {services.map((service, index) => {
                const colors = ['border-blue-500', 'border-emerald-500', 'border-purple-500', 'border-amber-500'];
                return (
                  <div 
                    key={service.id} 
                    className={`bg-white border-l-4 ${colors[index % colors.length]} rounded-r-2xl p-6 sm:p-8 shadow-sm grid lg:grid-cols-12 gap-6 items-center`}
                  >
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-50 p-2.5 rounded-lg text-cyan-600">
                          <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-950">{service.title}</h3>
                      </div>
                      <p className="text-xs text-slate-500 font-bold tracking-wider uppercase block">Ориентировочная стоимость: <span className="text-cyan-600 font-black">{service.pricing}</span></p>
                      
                      <p className="text-sm text-slate-600 leading-relaxed text-slate-600">{service.fullContent}</p>
                      
                      {/* Key benefits list */}
                      <div className="grid sm:grid-cols-2 gap-2 mt-4">
                        {service.keyBenefits.map(b => (
                          <div key={b} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step milestones and CTAs */}
                    <div className="lg:col-span-4 bg-slate-50 p-5 rounded-xl space-y-4">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Этапы реализации:</span>
                      <div className="space-y-3">
                        {service.stages.map((stage, sIdx) => (
                          <div key={stage.title} className="flex gap-2 text-xs">
                            <span className="font-bold text-cyan-600 text-[11px] mt-0.5">{sIdx + 1}.</span>
                            <div>
                              <span className="font-extrabold text-slate-800 block">{stage.title}</span>
                              <span className="text-slate-500 text-[10px] leading-relaxed block">{stage.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => triggerQuote(null, 'leasing')}
                        className="w-full bg-cyan-600 text-white font-extrabold text-xs py-2.5 rounded-lg shadow mt-2"
                      >
                        Оставить заявку на услугу
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 6. BRANDS OVERVIEW SECTION */}
        {activeTab === 'brands' && (
          <div className="space-y-8 animate-fade-in" id="brands-view">
            <div className="border-b border-slate-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Наши бренды-производители</h1>
              <p className="text-sm text-slate-500 mt-1">Только сертифицированные заводы с официальными гарантийными контрактами на запчасти и обслуживание.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {brands.map(brand => {
                return (
                  <div key={brand.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <img src={brand.logo} alt={brand.name} className="h-10 object-contain max-w-[150px]" />
                        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
                          {brand.country}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-950">{brand.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{brand.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center">
                      <button 
                        onClick={() => {
                          setSelectedBrand(brand.id);
                          handleTabChange('catalog');
                        }}
                        className="text-cyan-600 font-extrabold text-xs flex items-center gap-1 hover:text-cyan-700"
                      >
                        <span>Посмотреть технику бренда</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. MEDICAL BLOG & ARTICLES */}
        {activeTab === 'blog' && (
          <div className="space-y-8 animate-fade-in" id="blog-view">
            <div className="border-b border-slate-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Обзоры медоборудования и аналитика</h1>
              <p className="text-sm text-slate-500 mt-1">Статьи от наших клинических аппликаторов, юридические рекомендации по лицензированию клиник.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {articles.map(article => {
                return (
                  <article key={article.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="space-y-4">
                      <img src={article.image} alt={article.title} className="w-full h-44 object-cover" />
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>{article.category}</span>
                          <span>{article.readTimeMinutes} мин чтения</span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-950 hover:text-cyan-600 transition tracking-tight">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{article.summary}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between mt-4">
                      <div className="text-[10px] text-slate-400">
                        <span>{article.publishedAt} • {article.author.split(',')[0]}</span>
                      </div>
                      <button 
                        onClick={() => {
                          alert(`Открытие статьи: ${article.title}\n\nПолное содержание представлено на макете сайта.`);
                          logger.info(`Пользователь читал статью в блоге: ${article.id}`);
                        }}
                        className="text-cyan-650 hover:text-cyan-750 font-bold text-xs"
                      >
                        Читать
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. DETAILED FAQ WITH ACCORDION CATS */}
        {activeTab === 'faq' && (
          <div className="space-y-8 animate-fade-in" id="faq-view">
            <div className="text-center max-w-xl mx-auto space-y-2 border-b border-slate-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">База знаний и часто задаваемые вопросы</h1>
              <p className="text-sm text-slate-500">
                Собрали исчерпывающие ответы на более чем 30 ключевых вопросов касательно логистики, лицензий, условий лизинга и тех. поддержки.
              </p>
            </div>

            {/* Smart Filters row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-1.5 select-none w-full sm:w-auto">
                {[
                  { id: 'all', name: 'Все вопросы' },
                  { id: 'delivery', name: 'Логистика' },
                  { id: 'leasing', name: 'Лизинг' },
                  { id: 'guarantees', name: 'Гарантии' },
                  { id: 'service', name: 'Сервис' },
                  { id: 'documentation', name: 'Документы' },
                  { id: 'general', name: 'Общие' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFaqCategory(cat.id);
                      logger.debug(`Пользователь переключил фильтр FAQ: ${cat.id}`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${faqCategory === cat.id ? 'bg-cyan-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* FAQ text Search */}
              <div className="relative w-full sm:w-72">
                <input 
                  type="text"
                  placeholder="Искать в базе знаний..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full text-xs pr-8 pl-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* Output List Accordions */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
              {filteredFaqs.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">Вопросов по данным фильтрам не найдено. Попробуйте изменить параметры.</div>
              ) : (
                filteredFaqs.map(item => {
                  const isOpen = expandedFaq === item.id;
                  return (
                    <div key={item.id} className="transition-all duration-300">
                      <button
                        onClick={() => {
                          setExpandedFaq(isOpen ? null : item.id);
                          logger.debug(`FAQ клик: ${item.id}`);
                        }}
                        className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 hover:bg-slate-50 transition"
                      >
                        <span className="font-extrabold text-[13px] sm:text-base text-slate-900 leading-snug">{item.question}</span>
                        <div className="bg-slate-150 p-1 rounded-md text-slate-500">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 text-slate-650 text-xs sm:text-sm leading-relaxed border-t border-slate-50/50 pt-2 animate-fade-in bg-slate-50/30">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* 2b. EXCLUSIVE PREMIUM PRODUCT LANDING (SOPRANO TITANIUM) */}
        {activeTab === 'product-landing' && (
          <div className="space-y-16 animate-fade-in" id="soprano-landing-view">
            
            {/* Top Navigation Bar / Breadcrumbs */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('cosmetology');
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span className="text-xs font-bold uppercase tracking-wider">Каталог</span>
                </button>
                <div className="text-xs text-slate-400 font-medium font-sans">
                  <span>Главная / Каталог / Косметология / </span>
                  <span className="text-slate-700 font-bold">Aquapure II</span>
                </div>
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={() => toggleFavorite('soprano-titanium')}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${favorites.includes('soprano-titanium') ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes('soprano-titanium') ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{favorites.includes('soprano-titanium') ? 'В избранном' : 'В избранное'}</span>
                </button>
                <button
                  onClick={() => toggleCompare('soprano-titanium')}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${compareList.includes('soprano-titanium') ? 'bg-cyan-50 border-cyan-100 text-cyan-600' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>{compareList.includes('soprano-titanium') ? 'В сравнении' : 'Добавить к сравнению'}</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: HERO / INTRO */}
            <section className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  <Award className="w-3.5 h-3.5" />
                  <span>Оригинальное оборудование • РУ Минздрава РФ с полной поддержкой лизинга</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-950 leading-[1.1] tracking-tight">
                  Aquapure II <br />
                  <span className="text-cyan-600">чистая, сияющая и молодая кожа</span> всего за одну процедуру
                </h1>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Aquapure II — это аппарат нового поколения для глубокого очищения, гидропилинга и неинвазивного омоложения кожи без инъекций, боли и реабилитации. Он объединяет в себе четыре передовые технологии, которые бережно и эффективно улучшают качество кожи: глубоко очищают поры, устраняют избыточную пигментацию, идеально выравнивают тон и стимулируют естественное клеточное обновление. Процедура абсолютно универсальна и подходит для любого типа и состояния кожи — от молодой проблемной до возрастной с признаками фотостарения.
                </p>

                {/* Key specs badge flow */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <div className="text-sm font-black text-slate-900 uppercase">4 в 1 спектр</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Гидропилинг и микротоки</div>
                  </div>
                  <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <div className="text-sm font-black text-slate-900 uppercase">Aqua Peel</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Глубокое очищение пор</div>
                  </div>
                  <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                    <div className="text-sm font-black text-slate-900 uppercase">Без уколов</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">И восстановительного периода</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 pt-4">
                  <button 
                    onClick={() => {
                      const sopranoProd = products.find(p => p.id === 'soprano-titanium');
                      if (sopranoProd) triggerQuote(sopranoProd, 'kp');
                    }}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg shadow-cyan-150 transition-all cursor-pointer flex items-center gap-2 group border-none"
                  >
                    <span>КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button 
                    onClick={() => {
                      const sopranoProd = products.find(p => p.id === 'soprano-titanium');
                      if (sopranoProd) triggerQuote(sopranoProd, 'consultation');
                    }}
                    className="bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs sm:text-sm px-6 py-4 rounded-xl border border-slate-200 transition cursor-pointer"
                  >
                    Запись на Тест-Драйв
                  </button>
                </div>
              </div>

              {/* High Quality Render of Device */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-sm bg-white border border-slate-100 p-5 rounded-3xl shadow-2xl">
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                    <span>ПОДТВЕРЖДЕННЫЙ ОРИГИНАЛ</span>
                  </div>
                  
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative mb-4">
                    <img 
                      src="/aquapure/2.jpg" 
                      alt="Aquapure II" 
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-4 text-white">
                      <div className="text-xs font-bold leading-tight">Многофункциональная система Aquapure II в кабинете клиники в Москве</div>
                    </div>
                  </div>

                  <div className="space-y-2 p-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold font-mono">АРТИКУЛ: AM-77042</span>
                      <span className="text-xs font-extrabold text-cyan-600 uppercase">Южнокорейская сборка</span>
                    </div>
                    <div className="text-base sm:text-xl font-black text-slate-950">2 850 000 ₽</div>
                    <div className="text-xs text-slate-400 uppercase font-bold text-slate-500">Доступен в лизинг от 65 000 ₽ / мес с авансом от 10%</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: CLINICAL CASES */}
            <section className="space-y-8 bg-slate-50/50 rounded-3xl p-6 sm:p-10 border border-slate-100" id="before-after-scenarios">
              <div className="space-y-3 text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 block text-center">Клиническая эффективность и факты доказательной медицины</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight text-center">
                  Результаты процедур: 5 реальных клинических протоколов "До / Во время / После"
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm text-center">
                  Здесь нет отретушированных стоковых лиц. Только макрофотографии и подробный анамнез реальных пациентов из медицинских клиник-партнеров AstMed.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {/* CASE 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">Кейс #1 • Очищение и пилинг</span>
                      <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">● 100% очищение пор</span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                      <img 
                        src="/aquapure/IMG_7991.jpg" 
                        alt="Clinical Case 1 Cleansing" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 uppercase tracking-tight">Проблемная кожа • Наличие комедонов</div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Пациент с выраженным гиперкератозом и закупоркой сальных желез. Проведена процедура вакуумного пилинга Aquapeel с лечебными сыворотками.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-[9px] bg-slate-50 p-2 rounded-lg text-center">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">До</span>
                        <span className="font-bold text-red-500">Забитые поры</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-slate-400 block font-semibold uppercase">Во время</span>
                        <span className="font-bold text-blue-500">Экстракция</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">После</span>
                        <span className="font-bold text-emerald-600">Чистая кожа</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400">
                    <span className="font-bold">Параметры процедуры:</span> Насадка Aqua Peel, сыворотка Peel+ с молочной кислотой, деликатный вакуум 250 мм рт. ст.
                  </div>
                </div>

                {/* CASE 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">Кейс #2 • Гидратация и сияние</span>
                      <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">● Глубокое увлажнение</span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                      <img 
                        src="/aquapure/IMG_7998.jpg" 
                        alt="Clinical Case 2 Glow" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 uppercase tracking-tight">Сухая обезвоженная кожа • Мелкие морщины</div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Сухость кожных покровов после инсоляции. С помощью электропорации в глубокие слои кожи безболезненно доставлена гиалуроновая кислота.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-[9px] bg-slate-50 p-2 rounded-lg text-center">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">До</span>
                        <span className="font-bold text-red-500">Шелушение</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-slate-400 block font-semibold uppercase">Во время</span>
                        <span className="font-bold text-blue-500">Насыщение</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">После</span>
                        <span className="font-bold text-emerald-600">Влажная кожа</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400">
                    <span className="font-bold">Параметры процедуры:</span> Манипула Electroporation, сыворотка Rejuve+, длительность трансдермальной доставки 10 мин.
                  </div>
                </div>

                {/* CASE 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">Кейс #3 • Себорегуляция</span>
                      <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">● Сужение пор -45%</span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                      <img 
                        src="/aquapure/IMG_8009.jpg" 
                        alt="Clinical Case 3 Sebum" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 uppercase tracking-tight">Жирный тип кожи • Расширенные поры</div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Пациентка с избыточной выработкой себума и тусклым тоном. Проведена комплексная чистка пор с салициловой кислотой для нормализации рН баланса.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-[9px] bg-slate-50 p-2 rounded-lg text-center">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">До</span>
                        <span className="font-bold text-red-500">Жирный блеск</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-slate-400 block font-semibold uppercase">Во время</span>
                        <span className="font-bold text-blue-500">Sebo+ Пилинг</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">После</span>
                        <span className="font-bold text-emerald-600">Матовый тон</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400">
                    <span className="font-bold">Параметры процедуры:</span> Сыворотка Sebo+ с салициловой кислотой, вакуум средней интенсивности, Т-зона лица.
                  </div>
                </div>

                {/* CASE 4 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">Кейс #4 • Микротоковый лифтинг</span>
                      <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">● Подтяжка экспресс</span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                      <img 
                        src="/aquapure/IMG_8028.jpg" 
                        alt="Clinical Case 4 Lifting" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 uppercase tracking-tight">Гравитационный птоз • Отечность контура</div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Нарушение лимфодренажа лица у возрастной пациентки. Микротоковое воздействие восстановило мышечный тонус и удалило лишнюю межклеточную жидкость.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-[9px] bg-slate-50 p-2 rounded-lg text-center">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">До</span>
                        <span className="font-bold text-red-500">Отеки и птоз</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-slate-400 block font-semibold uppercase">Во время</span>
                        <span className="font-bold text-blue-500">Микротоки</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">После</span>
                        <span className="font-bold text-emerald-600">Четкий контур</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400">
                    <span className="font-bold">Параметры процедуры:</span> Манипула Microcurrent, сила тока 150-300 мкА, лимфодренажные линии, 15 минут.
                  </div>
                </div>

                {/* CASE 5 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">Кейс #5 • Криотермомассаж</span>
                      <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">● Крио-тонизация</span>
                    </div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                      <img 
                        src="/aquapure/IMG_8049.jpg" 
                        alt="Clinical Case 5 Cryo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 uppercase tracking-tight">Расширенные поры • Сниженный тургор</div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Применение контрастного теплового и криовоздействия для стимуляции кровотока, мгновенного сужения пор и тонуса кожи перед праздничным событием.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-[9px] bg-slate-50 p-2 rounded-lg text-center">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">До</span>
                        <span className="font-bold text-red-500">Усталый вид</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-slate-400 block font-semibold uppercase">Во время</span>
                        <span className="font-bold text-blue-500">Термо-контраст</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">После</span>
                        <span className="font-bold text-emerald-600">Свежее лицо</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400">
                    <span className="font-bold">Параметры процедуры:</span> Насадка Cooling/Heating, диапазон температур от +5°C до +42°C, 8 минут.
                  </div>
                </div>

                {/* REASSURANCE BLOCK */}
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg shadow-cyan-150">
                  <div className="space-y-4">
                    <div className="p-2 bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-black text-lg leading-tight uppercase">Оригинальное качество гарантирует безопасность клиники</h3>
                    <p className="text-cyan-50 font-light text-[11.5px] leading-relaxed">
                      Приобретая аппарат в AstMed, вы защищены от фальсификата и подделок. Все клинические протоколы разработаны врачами-методистами Classys. Перед покупкой вы можете привезти в наш демонстрационный зал своего модель-пациента и проверить результат лично!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const sopranoProd = products.find(p => p.id === 'soprano-titanium');
                      if (sopranoProd) triggerQuote(sopranoProd, 'consultation');
                    }}
                    className="mt-6 w-full py-3 bg-white text-cyan-700 text-xs font-black tracking-wider uppercase rounded-xl hover:bg-slate-50 transition border-none cursor-pointer"
                  >
                    Запись на тест-драйв в Москве
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: MULTI-TECHNOLOGY PLATFORM EXPLAINED */}
            <section className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">Инновационная платформа</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                    4 прогрессивные технологии в одном аппарате Aquapure II
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Мультиплатформа Aquapure II объединяет синергию четырех востребованных методик для комплексного ухода, глубокого очищения и омоложения кожи:
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex gap-3 border-l-4 border-cyan-500 pl-3">
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Aqua Peel (Вакуумный гидропилинг)</div>
                        <p className="text-[11px] text-slate-500">Глубокое очищение пор, отшелушивание и эксфолиация с одновременным насыщением сыворотками.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 border-l-4 border-emerald-500 pl-3">
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Electroporation (Электропорация)</div>
                        <p className="text-[11px] text-slate-500">Трансдермальная безинъекционная доставка активных мезококтейлей в глубокие слои дермы с помощью импульсных токов.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 border-l-4 border-purple-500 pl-3">
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Microcurrent (Микротоковая терапия)</div>
                        <p className="text-[11px] text-slate-500">Стимуляция мышечного тонуса, лимфодренаж, устранение отеков, восстановление контуров лица.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 border-l-4 border-blue-400 pl-3">
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Cooling & Heating (Криотермотерапия)</div>
                        <p className="text-[11px] text-slate-500">Терморегуляция от +5°C до +42°C для стимуляции кровотока, экспресс-сужения пор и тонизации кожи.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphical rendering with CSS or simple blocks */}
              <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="text-sm font-black text-slate-950 uppercase tracking-tight">Панель управления процедурой Aquapure II</div>
                
                {/* Simulated treatment dashboard */}
                <div className="bg-slate-900 rounded-2xl p-4 text-cyan-400 font-mono text-xs space-y-4 border border-cyan-800/40 relative overflow-hidden">
                  <div className="absolute right-3 top-3 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-bold text-cyan-300">TREATMENT: ACTIVE</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-cyan-900/40">
                      <div className="text-[9px] text-slate-500">ACTIVE SERUM</div>
                      <div className="text-[11px] font-bold text-cyan-300">Rejuve+ (HA)</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-cyan-900/40">
                      <div className="text-[9px] text-slate-500">SUCTION POWER</div>
                      <div className="text-xl font-bold text-cyan-300">250 mmHg</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-cyan-900/40">
                      <div className="text-[9px] text-slate-500">CRYO TEMP</div>
                      <div className="text-xl font-bold text-emerald-400">+5.0 °C</div>
                    </div>
                  </div>

                  {/* Program progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                      <span>Интенсивность микротоковой стимуляции</span>
                      <span>Шаг 4 из 5</span>
                    </div>
                    <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-cyan-950 p-0.5 animate-pulse">
                      <div className="w-[80%] h-full bg-cyan-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="text-[10px] leading-relaxed text-slate-400">
                    Благодаря интуитивно понятному интерфейсу Smart Touch, врач-косметолог может за секунды менять степень вакуума, подачу сывороток и настройки температуры. Аппарат полностью контролирует глубину проникновения, гарантируя абсолютную травмобезопасность.
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs uppercase">Умная подача сывороток</div>
                      <p className="text-[10.5px] text-slate-500 mt-1">Дозированная подача лечебных растворов без перерасхода. Высокая концентрация активов сохраняется стабильной.</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs uppercase">Эргономичные манипулы</div>
                      <p className="text-[10.5px] text-slate-500 mt-1">Облегченные рабочие ручки со специальным покрытием минимизируют нагрузку на запястье специалиста.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>            {/* SECTION 4: INTERACTIVE BUSINESS CALCULATOR (ROI) */}
            <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 relative overflow-hidden" id="interactive-calculator-section">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px]"></div>

              <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">Экономика бьюти-бизнеса</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    Интерактивный калькулятор окупаемости для руководителя клиники
                  </h2>
                  <p className="text-slate-450 text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Введите ваши планируемые финансовые показатели. Программа моментально рассчитает валовую ежемесячную прибыль, прогнозируемые расходы и срок до последней копейки, когда аппарат начнет приносить чистый доход.
                  </p>

                  <div className="space-y-5 pt-2">
                    {/* Price Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold text-xs uppercase tracking-wider">
                        <span className="text-slate-300">Средний чек за 1 процедуру</span>
                        <span className="text-cyan-400 font-mono text-sm">{roiPrice.toLocaleString('ru-RU')} Руб.</span>
                      </div>
                      <input 
                        type="range" 
                        min="1500" 
                        max="8000" 
                        step="100"
                        value={roiPrice} 
                        onChange={(e) => setRoiPrice(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-550 font-semibold text-slate-500">
                        <span>1 500 ₽ (Лайт)</span>
                        <span>5 000 ₽ (Премиум клиника)</span>
                        <span>8 000 ₽</span>
                      </div>
                    </div>

                    {/* Sessions Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold text-xs uppercase tracking-wider">
                        <span className="text-slate-300">Процедур в день</span>
                        <span className="text-cyan-400 font-mono text-sm">{roiSessions} Чел.</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="20" 
                        step="1"
                        value={roiSessions} 
                        onChange={(e) => setRoiSessions(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-550 font-semibold text-slate-500">
                        <span>2 сеанса / день (Лайт)</span>
                        <span>12 сеанса / день (Полная сетка)</span>
                        <span>20 сеансов</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation Outputs Panel */}
                <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="text-sm font-black text-slate-300 uppercase tracking-tight">Расчет окупаемости Aquapure II</div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Gross Monthly Revenue */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-550 font-bold uppercase block text-slate-500">Выручка в месяц (28 дней)</span>
                      <span className="text-lg sm:text-2xl font-black text-cyan-400 font-mono">
                        {(roiPrice * roiSessions * 28).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>

                    {/* Operating Costs */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-550 font-bold uppercase block text-slate-500">Расходы (ЗП, аренда, сыворотки)</span>
                      <span className="text-lg sm:text-2xl font-black text-red-400 font-mono">
                        {Math.floor((roiPrice * roiSessions * 28) * 0.45).toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-[9px] text-slate-500 block mt-1">(45% от вала: ЗП врача 30% + сыворотки)</span>
                    </div>

                    {/* Net Profit */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 col-span-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block text-slate-400">Ежемесячная чистая прибыль</span>
                      <span className="text-xl sm:text-3xl font-black text-emerald-400 font-mono">
                        {Math.floor((roiPrice * roiSessions * 28) * 0.55).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>

                  {/* Months to payback */}
                  <div className="bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 p-4 rounded-xl border border-emerald-900/30">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5 text-emerald-400 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Срок окупаемости аппарата</span>
                    </div>
                    <div className="text-xs sm:text-base font-bold text-white leading-normal">
                      Полная окупаемость: <span className="text-emerald-400 font-mono font-black">
                        {Math.max(1, Math.ceil(2850000 / Math.max(10000, ((roiPrice * roiSessions * 28) * 0.55))))}
                      </span> месяцев!
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      *При покупной стоимости Aquapure II в 2 850 000 ₽. Рассчитано без учета лизинговых льгот, снижающих налоговую базу бьюти-клиники.
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const sopranoProd = products.find(p => p.id === 'soprano-titanium');
                      if (sopranoProd) triggerQuote(sopranoProd, 'leasing');
                    }}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer text-center text-white border-none"
                  >
                    Получить детальный лизинговый бизнес-план
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 5: WHY CLINICS BUY FROM ASTMED (LEGAL SECURITY, GUARRANTEES) */}
            <section className="space-y-8">
              <div className="space-y-3 text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block text-center">Федеральный дистрибьютор AstMed Pro</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug text-center">
                  Почему медицинские центры доверяют покупку лазера нам
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm text-center">
                  Купить дорогостоящее медицинское оборудование у сомнительных поставщиков — огромный риск получить штрафы, конфискацию аппарата или вред пациенту. Мы обеспечиваем полную юридическую чистоту.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="p-3 bg-cyan-50 text-cyan-700 rounded-xl w-11 h-11 flex items-center justify-center">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase">Медицинская Лицензия</div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Предоставляем оригинал Регистрационного Удостоверения Минздрава РФ. Вы можете легально рекламироваться, проходить любые проверки Роспотребнадзора без рисков.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="p-3 bg-cyan-50 text-cyan-700 rounded-xl w-11 h-11 flex items-center justify-center">
                    <GraduationCap className="w-5.5 h-5.5 text-cyan-700" />
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase">Обучение Врачей Бесплатно</div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Команда врачей-методистов проведет полноценное очное обучение для 2 ваших специалистов. Теория, практика на моделях, выдача официального диплома.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="p-3 bg-cyan-50 text-cyan-700 rounded-xl w-11 h-11 flex items-center justify-center">
                    <Wrench className="w-5.5 h-5.5 text-cyan-700" />
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase">24/7 Сервисный Центр</div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Собственная лицензированная сервисная служба. Быстая замена фильтров, юстировка оптики, ремонт манипулы в любом городе РФ силами штатных сертифицированных инженеров.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="p-3 bg-cyan-50 text-cyan-700 rounded-xl w-11 h-11 flex items-center justify-center">
                    <BadgePercent className="w-5.5 h-5.5 text-cyan-700" />
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase">Лизинг и Трэйд-Ин</div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Сотрудничаем с 10+ ведущими лизинговыми компаниями (Сбербанк Лизинг, ВТБ, Европлан). Оформим сделку с первоначальным взносом в 0% и амортизацией налога.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: MOSCOW SHOWROOM TEST-DRIVE */}
            <section className="bg-slate-55 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-100 grid lg:grid-cols-12 gap-8 items-center" id="showroom-invitation bg">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">Живое знакомство перед покупкой</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                  Приглашаем вас и вашего врача-методиста на бесплатный тест-драйв в Москве!
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed text-slate-600">
                  Мы понимаем, что покупка лазера за 4.95 млн рублей — взвешенное решение. В нашем флагманском шоу-руме AstMed в центре Москвы Вы можете лично протестировать лазер:
                </p>
                <div className="space-y-2 text-xs text-slate-650">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Подержать в руках ультралегкую манипулу Quattro</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Проверить реальную силу охлаждения наконечника ICE Plus</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Оценить скорость работы интерфейса на ОС Android</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Провести пробную процедуру на вашей модели под руководством нашего врача</span>
                  </div>
                </div>
                <div className="pt-2 text-xs font-extrabold text-cyan-700">
                  📍 г. Москва, Полянка, 23 • Удобная закрытая парковка для гостей • Свежий премиальный кофе
                </div>
              </div>

              {/* Showroom visual representation using beautiful hospital interior/receptionist graphic */}
              <div className="lg:col-span-6">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-white">
                  <img 
                    src="/aquapure/IMG_8164.jpg" 
                    alt="AstMed Moscow Showroom Interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 7: TECHNICAL SPECIFICATIONS BLOCK */}
            <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight">Подробные технические характеристики</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">Для главных инженеров и врачей-клиницистов</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-3.5 text-xs">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Тип лазера</span>
                  <span className="font-extrabold text-slate-900 text-right">Гибридный диодный (Trio Clustered)</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Длины волн</span>
                  <span className="font-extrabold text-slate-900 text-right">755 нм + 810 нм + 1064 нм</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Мощность генератора манипулы</span>
                  <span className="font-extrabold text-slate-900 text-right">1600 Вт / 2000 Вт (премиум матрица)</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Аппликатор в комплекте</span>
                  <span className="font-extrabold text-slate-900 text-right">Trio Quattro (размер пятна 4.0 см²)</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Режимы излучения</span>
                  <span className="font-extrabold text-slate-900 text-right">SHR™ (в движении), HR, Stack (точечно)</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Охлаждение насадки</span>
                  <span className="font-extrabold text-slate-900 text-right">Технология сапфирового ICE Plus (до -4°C)</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Ресурс излучателя по контракту</span>
                  <span className="font-extrabold text-slate-900 text-right">Официально до 30 000 000 вспышек</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Экран и ОС</span>
                  <span className="font-extrabold text-slate-900 text-right">15" дюймов, мультисенсорный Smart UI Android</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Частота повторения</span>
                  <span className="font-extrabold text-slate-900 text-right">1 – 10 Гц (регулируемая)</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Сертификация</span>
                  <span className="font-extrabold text-slate-900 text-right">Регистрационное Удостоверение (РУ) Минздрава</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Гарантия на излучатель</span>
                  <span className="font-extrabold text-slate-900 text-right">24 месяца без ограничения вспышек</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Вес консоли</span>
                  <span className="font-extrabold text-slate-900 text-right">85 кг (прочное мобильное шасси)</span>
                </div>
              </div>
            </section>

            {/* SECTION 8: FINAL HIGH-CONVERTING CONVERSION LEAD CONTEXT FORM */}
            <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 text-center max-w-4xl mx-auto relative overflow-hidden" id="final-conversion-form">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-cyan-300 uppercase tracking-widest mx-auto">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Спецусловия от дистрибьютора до конца недели</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none text-center font-sans">
                  Получить специальные финансовые условия и ценное КП
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed text-center font-sans">
                  Оставьте контакты. Персональный менеджер AstMed вышлет Вам КП на почту, подготовит расчет окупаемости для вашего города и предложит индивидуальную скидку на предзаказ.
                </p>

                {/* Submit state inside form */}
                {formSubmitted ? (
                  <div className="p-8 bg-slate-950/80 border border-emerald-500 rounded-2xl max-w-md mx-auto text-center space-y-3 animate-fade-in text-white">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce mt-2" />
                    <div className="font-bold text-lg">Заявка успешно принята!</div>
                    <p className="text-xs text-slate-400">
                      Наши специалисты созвонятся с Вами по указанному номеру в течение 10 минут для подтверждения условий. Спасибо за доверие!
                    </p>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!formName || !formPhone) {
                        alert('Пожалуйста, введите Ваше Имя и Номер телефона.');
                        return;
                      }
                      
                      const leadDetails = {
                        leadId: 'L-AQ-' + Math.floor(Math.random() * 900000 + 100000),
                        timestamp: new Date().toISOString(),
                        product: 'Aquapure II',
                        type: 'Landing-Form',
                        contact: { name: formName, phone: formPhone, email: formEmail, comment: 'Aquapure II Exclusive Landing Offer' }
                      };
                      
                      logger.info('ЭКСКЛЮЗИВНАЯ ЗАЯВКА НА AQUAPURE II ЗАРЕГИСТРИРОВАНА', leadDetails);
                      sendTelegramNotification(leadDetails).then(success => {
                        if (success) {
                          logger.info(`Лид ${leadDetails.leadId} успешно продублирован вашему Telegram-боту!`);
                        } else {
                          logger.warn(`Не удалось отправить лид ${leadDetails.leadId} в Telegram. Проверьте настройки.`);
                        }
                      });
                      setFormSubmitted(true);
                      
                      setTimeout(() => {
                        setFormName('');
                        setFormPhone('');
                        setFormEmail('');
                        setFormSubmitted(false);
                      }, 4000);
                    }}
                    className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4 text-slate-900 pt-4"
                  >
                    <input 
                      type="text" 
                      placeholder="Ваше имя*" 
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="bg-white border-2 border-slate-800 text-slate-900 placeholder:text-slate-400 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-all font-semibold font-sans"
                    />
                    <input 
                      type="tel" 
                      placeholder="Ваш номер телефона (с кодом)*" 
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="bg-white border-2 border-slate-800 text-slate-900 placeholder:text-slate-400 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-all font-semibold font-sans"
                    />
                    <input 
                      type="email" 
                      placeholder="Ваш E-mail (для отправки КП)" 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="bg-white border-2 border-slate-800 text-slate-900 placeholder:text-slate-400 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-all font-semibold sm:col-span-2 font-sans"
                    />
                    <button
                      type="submit"
                      className="bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs sm:text-sm py-4 rounded-xl shadow-lg shadow-cyan-950 transition-all cursor-pointer sm:col-span-2 uppercase tracking-wider flex items-center justify-center gap-2 border-none"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Отправить запрос на коммерческие условия</span>
                    </button>
                  </form>
                )}

                <div className="text-[10px] text-slate-500 font-semibold pt-2 text-center text-slate-400">
                  *Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных в соответствии со стандартами АстМед.
                </div>
              </div>
            </section>

          </div>
        )}

        {/* 2c. EXCLUSIVE PREMIUM PRODUCT LANDING (DUET V RF-SYSTEM) */}
        {activeTab === 'duet-v-landing' && (
          <div className="space-y-16 animate-fade-in" id="duet-landing-view">
            <DuetVLanding 
              product={products.find(p => p.id === 'duet-v') || products[0]}
              articles={articles}
              favorites={favorites}
              compareList={compareList}
              toggleFavorite={toggleFavorite}
              toggleCompare={toggleCompare}
              triggerQuote={(prod, type) => triggerQuote(prod, type)}
              onBackToCatalog={() => {
                setSelectedCategory('cosmetology');
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 2d. EXCLUSIVE PREMIUM PRODUCT LANDING (CLEARLIGHT IPL-SYSTEM) */}
        {activeTab === 'clearlight-landing' && (
          <div className="space-y-16 animate-fade-in" id="clearlight-landing-view">
            <ClearLightLanding 
              product={products.find(p => p.id === 'clearlight') || products[0]}
              articles={articles}
              favorites={favorites}
              compareList={compareList}
              toggleFavorite={toggleFavorite}
              toggleCompare={toggleCompare}
              triggerQuote={(prod, type) => triggerQuote(prod, type)}
              onBackToCatalog={() => {
                setSelectedCategory('cosmetology');
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 9. ABOUT COMPANY */}
        {activeTab === 'about' && (
          <div className="space-y-8 animate-fade-in" id="about-view">
            <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">О компании АстМед</span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">
                  Ваш надежный партнер на медицинском рынке РФ
                </h1>
                <p className="text-sm sm:text-base text-slate-650 leading-relaxed text-slate-600">
                  АстМед — это федеральный поставщик широкого спектра высокотехнологического медоборудования. Мы осуществляем свою коммерческую и инженерную деятельность с 2013 года, закрывая потребности как небольших частных кабинетов, так и крупных многопрофильных диагностических центров, государственных больниц по ФЗ-44 и ФЗ-223.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xl sm:text-2xl font-black text-cyan-600 block">100%</span>
                    <span className="text-[11px] text-slate-500 font-bold block">Оригинальные заводы</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xl sm:text-2xl font-black text-cyan-600 block">24 часа</span>
                    <span className="text-[11px] text-slate-500 font-bold block">Составление спецификаций</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&h=350&q=80" alt="АстМед офис" className="rounded-2xl shadow-md w-full object-cover" />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ----------------- INTUITIVE PRODUCT DETAIL MODAL ----------------- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 flex flex-col justify-between">
            
            {/* Modal sticky top row */}
            <div className="sticky top-0 bg-white border-b border-slate-100 z-10 px-6 py-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Обзор медицинского аппарата</span>
                <h2 className="text-sm sm:text-lg font-black text-slate-900 leading-snug tracking-tight truncate max-w-md sm:max-w-xl">{selectedProduct.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal main content viewport */}
            <div className="p-6 space-y-8 flex-1">
              {/* Top part block: Gallery & Quick data */}
              <div className="grid md:grid-cols-12 gap-8 items-start">
                
                {/* Images gallery left */}
                <div className="md:col-span-5 space-y-3">
                  <div className="bg-slate-55 shadow-inner border border-slate-100 overflow-hidden rounded-2xl h-60 flex items-center justify-center relative">
                    <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  {selectedProduct.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.images.map((img, idx) => (
                        <div key={idx} className="h-20 bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right quick specification & pricing CTA */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Оригинал</span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{selectedProduct.brandName}</span>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">{selectedProduct.country}</span>
                    <span className="text-xs text-slate-400 font-mono ml-auto">артикул: {selectedProduct.article}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-normal">{selectedProduct.description}</p>
                  
                  <div className="bg-slate-50 border border-slate-105 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Стоимость для клиник:</span>
                      <span className="text-xl sm:text-2xl font-black text-slate-950">
                        {selectedProduct.price > 0 ? `${selectedProduct.price.toLocaleString('ru-RU')} ₽` : 'Цена по запросу'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => {
                          setSelectedProduct(null);
                          triggerQuote(selectedProduct, 'kp');
                        }}
                        className="bg-cyan-600 text-white font-bold text-xs py-2.5 rounded-lg text-center shadow hover:bg-cyan-700 transition"
                      >
                        Запросить КП
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedProduct(null);
                          triggerQuote(selectedProduct, 'leasing');
                        }}
                        className="bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg text-center hover:bg-slate-800 transition"
                      >
                        Рассчитать в лизинг
                      </button>
                    </div>
                  </div>

                  {/* Guaranteed trigger badges */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 border border-slate-100 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                      <span className="text-[9px] font-bold text-slate-700 block uppercase leading-tight font-sans">Гарантия {selectedProduct.warrantyMonths} мес.</span>
                    </div>
                    <div className="p-2 border border-slate-100 rounded-lg">
                      <FileCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                      <span className="text-[9px] font-bold text-slate-700 block uppercase leading-tight font-sans">РУ Минздрава РФ</span>
                    </div>
                    <div className="p-2 border border-slate-100 rounded-lg">
                      <Wrench className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                      <span className="text-[9px] font-bold text-slate-700 block uppercase leading-tight font-sans">Инсталляция РФ</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Specs & Features Tab block */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="font-extrabold text-slate-900 border-b border-slate-100 pb-2 text-sm sm:text-base font-sans">Комплектация и технические параметры</h3>
                
                {/* Specs Table */}
                <div className="bg-slate-50 rounded-xl overflow-hidden shadow-inner border border-slate-100">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody>
                      {Object.entries(selectedProduct.fullSpecs).map(([key, value], idx) => (
                        <tr key={key} className={`border-b border-slate-200/40 ${idx % 2 === 0 ? 'bg-white' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="p-3 font-semibold text-slate-500 w-1/3 border-r border-slate-100">{key}</td>
                          <td className="p-3 font-bold text-slate-800">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Key Features bullets */}
                <div className="space-y-2 pt-4">
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-widest font-sans">Ключевые преимущества модели:</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {selectedProduct.features.map(f => (
                      <li key={f} className="text-xs text-slate-655 leading-relaxed font-medium">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Modal footer view */}
            <div className="bg-slate-100 rounded-b-3xl px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 font-sans">Требуется официальное РУ и акт пусконаладки? Готовим полный комплект за 24 часа.</span>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="bg-slate-250 text-slate-700 hover:bg-slate-350 font-extrabold text-xs px-5 py-2 rounded-lg cursor-pointer transition border border-slate-200 font-sans"
              >
                Закрыть окно
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- INTUITIVE REQUEST PRICE / SPECIFICATION MODAL ----------------- */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-600 tracking-wider block">
                  {quoteFormType === 'kp' ? 'Запрос коммерческого предложения' : 
                   quoteFormType === 'leasing' ? 'Расчет прибора в лизинг' : 'Быстрый подбор оборудования'}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full mt-1 inline-block">
                  ⭐ 847 клиник уже выбрали с нами
                </span>
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight block mt-1.5">
                  {quoteTargetProduct ? quoteTargetProduct.name : 'Подобрать оборудование под ваши критерии'}
                </h2>
              </div>
              <button 
                onClick={() => {
                  setIsQuoteModalOpen(false);
                  setQuoteTargetProduct(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Anti-Anxiety Badges directly on top of fields to maximize confidence */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[11px] font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">📞</span>
                  <span>Перезвоним за 30 мин</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🔒</span>
                  <span>Без обязательств</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">📄</span>
                  <span>Вышлем КП на почту</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🧑‍⚕️</span>
                  <span>Эксперт: врач/инженер</span>
                </div>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-805 rounded-xl p-4 text-center space-y-2 py-8 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="font-extrabold text-base font-sans text-emerald-950">Заявка зафиксирована в CRM!</p>
                  <p className="text-xs text-emerald-600 font-sans leading-relaxed">
                    Персональный специалист (врач аппликатор или ведущий инженер АстМед) уже формирует КП и свяжется с вами по телефону в течение 30 минут.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block font-sans">Ваше имя и должность *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Иван Петрович, Главврач"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block font-sans">Номер телефона *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+7 (9xx) xxx-xx-xx"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block font-sans">Почта для получения КП</label>
                      <input 
                        type="email" 
                        placeholder="doctor@clinic.ru"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block font-sans">Примерный бюджет</label>
                      <select 
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800"
                      >
                        <option value="">Не определен</option>
                        <option value="Малый бюджет до 1 млн руб">До 1 000 000 ₽</option>
                        <option value="Средний класс от 1 до 3 млн руб">1 000 000 ₽ – 3 000 000 ₽</option>
                        <option value="Премиум класс от 3 до 7 млн руб">3 000 000 ₽ – 7 000 000 ₽</option>
                        <option value="Экспертный класс от 7 млн руб">Более 7 000 000 ₽</option>
                      </select>
                    </div>

                    <div className="space-y-1 border-l pl-3 border-slate-100">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block font-sans">Профиль учреждения</label>
                      <span className="text-xs font-bold text-slate-700 block py-2">
                        {quoteTargetProduct ? 'Медицинский центр' : 'Подбираем индивидуально'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-cyan-50/50 rounded-xl p-2.5 text-[10px] text-slate-500 flex gap-1.5 items-center justify-center">
                    <span>✅ Ваши данные зашифрованы и не передаются третьим лицам</span>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg tracking-wider uppercase transition cursor-pointer font-sans"
                  >
                    {quoteFormType === 'leasing' ? 'Получить расчёт в лизинг' : 'Подобрать оборудование под задачу'}
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ----------------- COMPREHENSIVE SYSTEM LOGGER / DIAGNOSTICS & TELEGRAM BOT DRAWER ----------------- */}
      {showLogsPanel && (
        <div className="fixed bottom-0 left-0 right-0 h-96 bg-slate-900 border-t border-slate-800 text-slate-200 z-50 flex flex-col shadow-2xl overflow-hidden animate-fade-in">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse"></span>
              <span className="font-bold text-xs uppercase text-cyan-400 tracking-wider font-mono">Панель управления Lead CRM & Интеграции Telegram Bot</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  logger.clear();
                  logger.info('Пользователь очистил терминал логов');
                }} 
                className="text-[10px] text-slate-400 hover:text-white border border-slate-700 px-2 py-0.5 rounded font-mono"
              >
                Очистить логи
              </button>
              <button 
                onClick={() => setShowLogsPanel(false)}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0">
            {/* LEFT SIDE: Terminal with Real-time Diagnostics Logs */}
            <div className="lg:col-span-7 flex flex-col min-h-0 border-r border-slate-800 text-xs">
              <div className="bg-slate-900/40 px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 flex justify-between items-center font-mono shrink-0">
                <span>💻 Монитор системной активности (Симуляция логов CRM)</span>
                <span className="text-cyan-500 font-normal">Active listeners: 1</span>
              </div>
              <div className="p-3 overflow-y-auto flex-1 space-y-1 text-[11px] font-mono selection:bg-slate-800 bg-slate-950/40">
                {liveLogs.map((log) => {
                  const bgColors = {
                    debug: 'text-slate-450',
                    info: 'text-cyan-400',
                    warn: 'text-amber-400',
                    error: 'text-rose-500 bg-rose-950/20 px-1 py-0.5 rounded'
                  };
                  return (
                    <div key={log.id} className="flex gap-2">
                      <span className="text-slate-500 shrink-0">[{log.timestamp.slice(11, 19)}]</span>
                      <span className={`font-bold uppercase tracking-wider shrink-0 mr-1 ${bgColors[log.level]}`}>[{log.level}]</span>
                      <span className="text-slate-300 break-words">{log.message}</span>
                      {log.context && (
                        <span className="text-[10px] text-blue-400 italic"> - Context: {JSON.stringify(log.context)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Telegram Bot integration form */}
            <div className="lg:col-span-5 flex flex-col min-h-0 bg-slate-950 p-4 overflow-y-auto selection:bg-slate-800 text-xs">
              <div className="flex items-center gap-1.5 pb-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-sans shrink-0">
                <MessageSquare className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span>🤖 Настройка Telegram Bot Уведомлений</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal pb-3 border-b border-slate-800/80 font-sans shrink-0">
                Все формы на сайте (как кнопка "Заказать КП", так и форма в лендинге Aquapure II) мгновенно передают данные на эту интеграцию.
              </p>

              <div className="space-y-3 pt-3 font-sans flex-1">
                <div className="grid grid-cols-1 gap-2.5">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 pb-1">Токен Telegram-бота (Bot Token)</label>
                    <input 
                      type="password" 
                      placeholder="Пример: 6512398452:AAH9_Uj-xkld..." 
                      value={tgBotToken}
                      onChange={(e) => setTgBotToken(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 pb-1">ID Чата / Группы (Chat ID)</label>
                    <input 
                      type="text" 
                      placeholder="Пример: -100148923485 (группа) или 94523824 (личный)" 
                      value={tgChatId}
                      onChange={(e) => setTgChatId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 pb-1 shrink-0">
                  <button
                    onClick={async () => {
                      if (!tgBotToken || !tgChatId) {
                        setTgTestStatus('Введите Token и ID перед тестом!');
                        return;
                      }
                      setTgIsTesting(true);
                      setTgTestStatus(null);
                      logger.info('Отправка проверочного пинга интеграции с Telegram...');
                      const response = await testTelegramConnection(tgBotToken, tgChatId);
                      setTgIsTesting(false);
                      if (response.success) {
                        setTgTestStatus('✅ Тест успешно отправлен в Telegram!');
                        logger.info('✅ Telegram Bot верифицирован и готов к работе.');
                      } else {
                        setTgTestStatus(`❌ Сбой: ${response.message}`);
                        logger.error(`❌ Ошибка проверки Telegram: ${response.message}`);
                      }
                    }}
                    disabled={tgIsTesting}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-[10px] uppercase py-2 px-1.5 rounded transition cursor-pointer disabled:opacity-50 text-center"
                  >
                    {tgIsTesting ? 'Проверка...' : 'Проверить'}
                  </button>
                  <button
                    onClick={() => {
                      saveTelegramSettings(tgBotToken, tgChatId);
                      logger.info('Сохранены новые Telegram-настройки!');
                      setTgTestStatus('💾 Настройки сохранены!');
                    }}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] uppercase py-2 px-1.5 rounded shadow transition cursor-pointer text-center"
                  >
                    Сохранить
                  </button>
                </div>

                {tgTestStatus && (
                  <div className={`p-2 rounded text-[10px] border leading-normal ${
                    tgTestStatus.includes('✅') || tgTestStatus.includes('💾') 
                      ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-400' 
                      : 'bg-rose-950/20 border-rose-900/60 text-rose-400'
                  }`}>
                    {tgTestStatus}
                  </div>
                )}

                {/* Clear instructions */}
                <div className="bg-slate-900/50 p-2.5 rounded border border-slate-800/85 text-[10px] text-slate-400 leading-normal space-y-1">
                  <div className="font-bold text-slate-300">💡 Быстрая настройка Telegram-бота за 1 минуту:</div>
                  <div>1. Создайте бота через <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">@BotFather</a> в Telegram (команда <code className="text-white">/newbot</code>) и вставьте полученный <b>Token</b> выше.</div>
                  <div>2. Добавьте вашего созданного бота в чат вашей клиники / отдела продаж или напишите ему лично. Нажмите кнопку /start.</div>
                  <div>3. Напишите боту <a href="https://t.me/userinfobot" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">@userinfobot</a> или добавьте <a href="https://t.me/GetChatID_bot" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">@GetChatID_bot</a> в группу, чтобы получить <b>ID чата</b> (вставьте его выше). Групповые ID начинаются с дефиса.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TRUST DECORATIVE FOOTER ----------------- */}
      <footer className="bg-slate-950 text-white mt-16 border-t border-slate-850 py-12 px-4 sm:px-6 lg:px-8" id="main-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-700 p-2 rounded-lg">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Аст<span className="text-blue-500 font-bold">Мед</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Группа компаний АстМед — это лицензированный Росздравнадзором федеральный интегратор комплексных медицинских проектов, закупщик и поставщик оборудования ведущих марок для медицинских центров. Оснащаем кабинеты под ключ, организуем лизинг и берем на себя сервис приборов.
            </p>
            <div className="text-[10px] text-slate-500">
              © 2013-2026 ООО «АстМед Старз Интернешнл». Все права защищены. <br />
              Информация размещенная на интернет-портале не является публичной офертой.
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3 shrink-0">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Оборудование</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span onClick={() => { setSelectedCategory('uzi'); handleTabChange('catalog'); }} className="hover:text-blue-500 cursor-pointer transition">УЗИ сканеры</span>
              <span onClick={() => { setSelectedCategory('flex_endoscopy'); handleTabChange('catalog'); }} className="hover:text-blue-500 cursor-pointer transition">Гибкая эндоскопия</span>
              <span onClick={() => { setSelectedCategory('rad_diag'); handleTabChange('catalog'); }} className="hover:text-blue-500 cursor-pointer transition">Лучевая КТ/МРТ</span>
              <span onClick={() => { setSelectedCategory('reanimation'); handleTabChange('catalog'); }} className="hover:text-blue-500 cursor-pointer transition">ИВЛ и реанимация</span>
            </div>
          </div>

          {/* Contact actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Контакты поставщика</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span>Горячая линия бесплатна по РФ:</span>
              <span className="font-extrabold text-white text-sm select-all">8 (800) 555-35-35</span>
              <span>Московский центральный офис:</span>
              <span className="text-white select-all">8 (495) 777-33-22</span>
              <span>E-mail отдела снабжения:</span>
              <span className="text-blue-400 font-bold select-all">zakupki@astmed.ru</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
