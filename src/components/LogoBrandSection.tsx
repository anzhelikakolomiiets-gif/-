/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Copy, Check, Compass, Layers, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

export const LogoBrandSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeVariant, setActiveVariant] = useState<'standard' | 'horizontal' | 'dark' | 'appIcon'>('standard');

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <!-- Retail Navigator Vector Logo -->
  <rect width="120" height="120" rx="24" fill="#0F172A"/>
  <!-- Retail Shelves Matrix -->
  <line x1="24" y1="58" x2="96" y2="58" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
  <line x1="24" y1="78" x2="96" y2="78" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
  <line x1="24" y1="98" x2="96" y2="98" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
  <!-- Analytics Growth Bars -->
  <rect x="36" y="70" width="10" height="28" rx="2" fill="#10B981"/>
  <rect x="55" y="52" width="10" height="46" rx="2" fill="#10B981"/>
  <rect x="74" y="38" width="10" height="60" rx="2" fill="#34D399"/>
  <!-- Navigator Compass Arrow Vector -->
  <path d="M46 54L76 24M76 24H60M76 24V40" stroke="#F8FAFC" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="56" cy="44" r="3" fill="#F8FAFC"/>
</svg>`;

  const handleCopySvg = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadLogo = () => {
    const link = document.createElement('a');
    link.href = '/src/assets/images/retail_navigator_logo_1793115093778.jpg';
    link.download = 'retail_navigator_logo.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Фирменный знак & айдентика</span>
            <span aria-hidden="true">·</span>
            <span>Концепт 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Логотип онлайн-сервиса «Ритейл навигатор»
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Синтез навигационного вектора развития, структуры полочного пространства ритейла и восходящей аналитики маржинальности для локальных производителей.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Logo Visual Presentation Frame */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Официальный знак сервиса
              </span>
              {/* Variant Toggles */}
              <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium text-slate-600">
                <button
                  onClick={() => setActiveVariant('standard')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeVariant === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  Знак
                </button>
                <button
                  onClick={() => setActiveVariant('horizontal')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeVariant === 'horizontal' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  С логотипом
                </button>
                <button
                  onClick={() => setActiveVariant('dark')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeVariant === 'dark' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  Темный фон
                </button>
              </div>
            </div>

            {/* Display Canvas based on active variant */}
            <div className={`my-8 py-10 rounded-xl flex items-center justify-center transition-all ${
              activeVariant === 'dark' ? 'bg-slate-950 text-white' : 'bg-white border border-slate-100 shadow-xs'
            }`}>
              {activeVariant === 'standard' && (
                <div className="flex flex-col items-center text-center">
                  <img
                    src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                    alt="Логотип Ритейл навигатор"
                    referrerPolicy="no-referrer"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-2xl shadow-sm border border-slate-200/60"
                  />
                  <span className="mt-4 text-xs text-slate-400 font-mono">
                    Символ: Полка + Стрелка-компас + Юнит-столбцы
                  </span>
                </div>
              )}

              {activeVariant === 'horizontal' && (
                <div className="flex items-center gap-6 px-6">
                  <img
                    src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                    alt="Логотип Ритейл навигатор"
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-contain rounded-xl shadow-xs border border-slate-200/60"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      Ритейл навигатор
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-emerald-700 tracking-wide mt-0.5">
                      Юнит-экономика локальных производителей
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono mt-1">
                      Версия 2.4 · Соответствие ФЗ №381-ФЗ
                    </span>
                  </div>
                </div>
              )}

              {activeVariant === 'dark' && (
                <div className="flex flex-col items-center text-center px-4">
                  <div className="relative p-2 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                    <img
                      src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                      alt="Логотип на темном фоне"
                      referrerPolicy="no-referrer"
                      className="w-40 h-40 object-contain rounded-xl"
                    />
                  </div>
                  <span className="mt-4 text-xl font-bold tracking-tight text-white">
                    Ритейл навигатор
                  </span>
                  <span className="text-xs text-emerald-400 font-medium mt-1">
                    Аналитика маржинальности на темной теме
                  </span>
                </div>
              )}
            </div>

            {/* Actions: Download and Copy */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200">
              <button
                onClick={handleDownloadLogo}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Скачать логотип (JPG / High-Res)</span>
              </button>
              <button
                onClick={handleCopySvg}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'SVG-код скопирован!' : 'Скопировать SVG-код'}</span>
              </button>
            </div>
          </div>

          {/* Conceptual Breakdown & Metaphor */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Семантика и смысловая конструкция логотипа
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Логотип разработан с учетом специфики взаимодействия локального производственного бизнеса с крупными сетями и маркетплейсами. Он объединяет три фундаментальные идеи:
              </p>

              {/* Three Semantic Pillars */}
              <div className="space-y-3 mt-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3.5">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      1. Стрелка-навигатор (Вектор курса)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Навигационная стрелка указывает строго вверх и вперед под углом роста. Она символизирует безошибочный маршрут локального бренда через сложный лабиринт договоров поставки, промо-акций и требований сетей.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3.5">
                  <div className="p-2 bg-slate-200 text-slate-800 rounded-lg shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      2. Полочная матрица ритейла (Стеллаж супермаркета)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Горизонтальные уровни воспроизводят полки торговой сети: от региональных магазинов до федерального распределительного центра (РЦ), где продукт занимает стабильное место в регулярной выкладке.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3.5">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      3. Столбцы юнит-экономики (Маржинальность)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Вертикальные зеленые колонки отображают декомпозицию себестоимости и рост чистой прибыли на каждую единицу продукции (юнит). Зеленый цвет акцентирует финансовое здоровье и безубыточность бизнеса.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Colors Bar */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
                Фирменная цветовая палитра
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-full h-8 rounded-md bg-[#0F172A] border border-slate-300" />
                  <span className="text-[11px] font-semibold text-slate-800 mt-1.5">Navy Slate</span>
                  <span className="text-[10px] text-slate-500 font-mono">#0F172A</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-8 rounded-md bg-[#059669]" />
                  <span className="text-[11px] font-semibold text-slate-800 mt-1.5">Emerald Profit</span>
                  <span className="text-[10px] text-slate-500 font-mono">#059669</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-8 rounded-md bg-[#D97706]" />
                  <span className="text-[11px] font-semibold text-slate-800 mt-1.5">Craft Amber</span>
                  <span className="text-[10px] text-slate-500 font-mono">#D97706</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full h-8 rounded-md bg-[#F8FAFC] border border-slate-300" />
                  <span className="text-[11px] font-semibold text-slate-800 mt-1.5">Clean White</span>
                  <span className="text-[10px] text-slate-500 font-mono">#F8FAFC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Application Preview */}
        <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Применение логотипа на материалах производителя
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Адаптивность айдентики в документах для категорийных менеджеров сетей, на упаковке и в сервисе
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Векторная масштабируемость 100%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mockup 1: Document Header */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                      alt="Мини-лого"
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-md object-cover"
                    />
                    <span className="text-xs font-bold text-slate-900">Ритейл навигатор</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    КП-АУДИТ
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">Спецификация для X5 Group</p>
                  <p>Категория: Твердые сыры фермерские</p>
                  <p>Статус расчета: Согласовано, маржа 21.4%</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                Фирменный бланк юнит-расчета для байера
              </div>
            </div>

            {/* Mockup 2: Packaging Label Badge */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-900">Знак качества на упаковке</span>
                </div>
                <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg flex items-center gap-3">
                  <img
                    src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                    alt="Знак на упаковке"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover border border-amber-300"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Локальный производитель
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Проверено сервисом Ритейл навигатор
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                Наклейка для крафтовой упаковки и полочного шелфтокера
              </div>
            </div>

            {/* Mockup 3: App Icon / Mobile Display */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-900">Интерфейс сервиса</span>
                  <span className="text-[10px] text-slate-400 font-mono">PWA / Web</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-900 text-white rounded-lg">
                  <img
                    src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                    alt="Иконка приложения"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-semibold block text-white">Калькулятор юнита</span>
                    <span className="text-[10px] text-emerald-400">Быстрый пересчет партии на РЦ</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                Фавикон и адаптивный мобильный ярлык
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
