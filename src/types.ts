/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName?: string;
  subCategoryId?: string;
  article: string; // SKU
  price: number; // in rub or 0 for "On request"
  oldPrice?: number;
  currency: 'RUB' | 'USD' | 'EUR';
  country: string;
  availability: 'in_stock' | 'on_order' | 'out_of_stock';
  badge?: 'hit' | 'new' | 'promo';
  description: string;
  fullSpecs: Record<string, string>; // e.g. {"Диагональ экрана": "21.5 дюйма", "Количество портов": "4"}
  features: string[]; // key bullet points
  packageIncludes: string[]; // what is shipped in the box
  applications: string[]; // medical applications, e.g. ["Кардиология", "Акушерство"]
  images: string[]; // array of image urls or SVG descriptions
  warrantyMonths: number;
  hasRegistrationCertificate: boolean; // Регистрационное Удостоверение (РУ) - super important for Medeq SEO/trust
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  icon: string; // lucide icon name
  image: string; // category photo/vector
  subcategories?: { id: string; name: string; productCount: number }[];
  productCount: number;
  popularityOrder: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
  description: string;
  categoryIds: string[];
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  icon: string; // Lucide icon
  fullContent: string;
  pricing: string;
  keyBenefits: string[];
  stages: { title: string; desc: string }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'delivery' | 'leasing' | 'guarantees' | 'service' | 'documentation' | 'general';
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTimeMinutes: number;
  publishedAt: string;
  author: string;
  image: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedCountries: string[];
  selectedAvailabilities: ('in_stock' | 'on_order' | 'out_of_stock')[];
  selectedBadges: ('hit' | 'new' | 'promo')[];
  priceMin: number | '';
  priceMax: number | '';
  specs: Record<string, string[]>; // Arbitrary dynamic filter keys
}

export type ViewTab = 'main' | 'catalog' | 'comparison' | 'favorites' | 'services' | 'faq' | 'brands' | 'blog' | 'about' | 'product-landing' | 'duet-v-landing' | 'clearlight-landing' | 'versana-landing';
