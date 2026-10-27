/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProductPreset, PRODUCT_PRESETS, calculateUnitEconomics } from '../data/models';
import { ArrowRight, Calculator, FileSpreadsheet, ShieldAlert, CheckCircle2, TrendingUp, Sparkles, Printer } from 'lucide-react';

interface BrandCoverHeroProps {
  onOpenCalculator: (preset?: ProductPreset) => void;
  onSelectTab: (tab: 'cover' | 'logo' | 'calculator' | 'channels' | 'buyerCard') => void;
  selectedPreset: ProductPreset;
  onSelectPreset: (preset: ProductPreset) => void;
}

export const BrandCoverHero: React.FC<BrandCoverHeroProps> = ({
  onOpenCalculator,
  onSelectTab,
  selectedPreset,
  onSelectPreset,
}) => {
  const [coverMode, setCoverMode] = useState<'standard' | 'craft' | 'executive'>('standard');

  const results = calculateUnitEconomics(selectedPreset);

  const handlePrintCover = () => {
    window.print();
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Decorative subtle ambient backdrop */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-emerald-50/70 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Top Badging / Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
          <span className="text-emerald-700 font-bold uppercase tracking-wider">Ритейл навигатор</span>
          <span aria-hidden="true">·</span>
          <span>Онлайн-сервис юнит-экономики</span>
          <span aria-hidden="true">·</span>
          <span>Для локальных производителей и фермеров</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-400">ФЗ №381-ФЗ Compliance</span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Юнит-экономика для локальных брендов при выходе в ритейл
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Точный расчет чистой прибыли с каждой банки, сырной головки и буханки. Учитываем полочную наценку сетей, законный ретро-бонус (до 5%), скрытую глубину промо-скидок, логистику до РЦ и дни отсрочки платежа.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenCalculator(selectedPreset)}
                className="px-6 py-3.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Рассчитать юнит-экономику</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectTab('buyerCard')}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>КП для байера сети</span>
              </button>
              <button
                onClick={handlePrintCover}
                className="px-4 py-3.5 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Распечатать или сохранить как PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Печать обложки</span>
              </button>
            </div>

            {/* Quick Live Preset Switcher */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Быстрые шаблоны производств:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRODUCT_PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedPreset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => onSelectPreset(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {preset.name.split(' ')[0]} {preset.categoryLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hero Visual Cover Box with Live Metric Overlay */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-900 group">
              {/* Cover Artwork */}
              <img
                src="/src/assets/images/retail_navigator_hero_1793115068153.jpg"
                alt="От ремесленного цеха до полки супермаркета"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

              {/* Top Cover Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold">{selectedPreset.name}</span>
                </div>
                <span className="font-mono text-emerald-300 font-bold bg-emerald-950/70 px-2 py-1 rounded border border-emerald-500/30">
                  {results.shelfPrice} ₽ / полка
                </span>
              </div>

              {/* Bottom Interactive Economics Breakdown Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-md text-slate-900">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200/80">
                  <span className="text-xs font-bold text-slate-800">
                    Экспресс-срез юнита
                  </span>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    results.netMarginPercent >= 15 ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                  }`}>
                    Маржа: +{results.netMarginPercent.toFixed(1)}%
                  </span>
                </div>

                {/* 3-Column Quick Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Себестоимость</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">
                      {results.totalCogs} ₽
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Вход в сеть</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">
                      {Math.round(results.supplierContractPrice)} ₽
                    </span>
                  </div>
                  <div className="bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-semibold block">Чистая прибыль</span>
                    <span className="font-mono font-extrabold text-emerald-700 text-sm">
                      +{results.netProfitPerUnit.toFixed(1)} ₽
                    </span>
                  </div>
                </div>

                {/* Cash Deferral Note */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Отсрочка сети: <strong className="text-slate-800">{selectedPreset.paymentDeferralDays} дней</strong></span>
                  <span>В партии: <strong className="text-slate-800">{selectedPreset.monthlyUnits.toLocaleString('ru-RU')} шт</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Strip Directly Adjacent to Hero */}
        <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 block">Лимит ретро-бонуса</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
              до 5.0%
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              По ст. 9 ФЗ №381-ФЗ «Об основах госрегулирования торговой деятельности»
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 block">Наценка ритейлера</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
              35–50%
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Плановая фронт-маржа сети в зависимости от категории и скоропорта
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 block">Глубина промо</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
              -20…-35%
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Обязательные желтые ценники 4–8 раз в год, закладываемые в юнит-модель
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 block">Кассовый разрыв</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums block mt-1">
              0 дней
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Предотвращение заморозки оборотных средств через точный расчет факторинга
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
