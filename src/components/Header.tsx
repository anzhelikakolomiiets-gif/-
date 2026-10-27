/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeaderProps {
  activeTab: 'cover' | 'logo' | 'calculator' | 'channels' | 'buyerCard';
  onSelectTab: (tab: 'cover' | 'logo' | 'calculator' | 'channels' | 'buyerCard') => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenCalculator }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Logo Icon */}
        <button
          onClick={() => onSelectTab('cover')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <img
            src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
            alt="Логотип Ритейл навигатор"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-lg object-cover border border-slate-200 shadow-xs group-hover:border-emerald-600 transition-colors"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap leading-tight">
              Ритейл навигатор
            </span>
            <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
              Юнит-экономика для локальных брендов
            </span>
          </div>
        </button>

        {/* Zone 2: Single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('cover')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'cover'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Обложка сервиса
          </button>
          <button
            onClick={() => onSelectTab('logo')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'logo'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Логотип и айдентика
          </button>
          <button
            onClick={() => onSelectTab('calculator')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'calculator'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Калькулятор юнита
          </button>
          <button
            onClick={() => onSelectTab('channels')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'channels'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Сравнение каналов
          </button>
          <button
            onClick={() => onSelectTab('buyerCard')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'buyerCard'
                ? 'text-slate-900 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Карточка для байера
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCalculator}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-emerald-700 active:scale-98 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            Рассчитать свой продукт
          </button>
        </div>
      </div>
    </header>
  );
};
