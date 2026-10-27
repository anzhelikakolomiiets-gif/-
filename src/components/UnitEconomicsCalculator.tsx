/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import { ProductPreset, PRODUCT_PRESETS, calculateUnitEconomics } from '../data/models';
import { AlertTriangle, CheckCircle, TrendingUp, Info, RotateCcw, ShieldCheck, DollarSign, Truck, Tag, Package } from 'lucide-react';

interface UnitEconomicsCalculatorProps {
  initialPreset?: ProductPreset;
  onApplyToBuyerCard?: (preset: ProductPreset) => void;
}

export const UnitEconomicsCalculator: React.FC<UnitEconomicsCalculatorProps> = ({
  initialPreset = PRODUCT_PRESETS[0],
  onApplyToBuyerCard
}) => {
  const [params, setParams] = useState<ProductPreset>(initialPreset);
  const shelfPriceId = useId();
  const retailMarkupId = useId();
  const cogsIngredientsId = useId();
  const cogsPackagingId = useId();
  const retroBonusId = useId();
  const promoDiscountId = useId();
  const promoShareId = useId();
  const logisticsId = useId();
  const markingCostId = useId();
  const deferralDaysId = useId();
  const monthlyUnitsId = useId();

  const results = calculateUnitEconomics(params);

  const handleResetPreset = (preset: ProductPreset) => {
    setParams(preset);
  };

  return (
    <section id="calculator" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>Интерактивный движок</span>
              <span aria-hidden="true">·</span>
              <span>Декомпозиция каждого рубля</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Калькулятор юнит-экономики для ритейла
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Проверьте жизнеспособность вашего контракта до подписания спецификации. Рассчитайте реальную маржу за вычетом ретро-бонусов, промо и логистики.
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Шаблоны:</span>
            {PRODUCT_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleResetPreset(p)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                  params.id === p.id
                    ? 'bg-slate-900 text-white font-medium shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {p.categoryLabel}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Inputs (Left) and Results / Waterfall (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (6 Cols) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Параметры продукта и контракта
                </h3>
              </div>
              <button
                onClick={() => handleResetPreset(PRODUCT_PRESETS.find(p => p.id === params.id) || PRODUCT_PRESETS[0])}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сбросить</span>
              </button>
            </div>

            {/* Input Groups */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Наименование SKU
                </label>
                <input
                  type="text"
                  value={params.name}
                  onChange={(e) => setParams({ ...params, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Shelf Price & Network Markup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor={shelfPriceId} className="text-xs font-semibold text-slate-700">
                      Цена на полке (с НДС)
                    </label>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {params.shelfPrice} ₽
                    </span>
                  </div>
                  <input
                    id={shelfPriceId}
                    type="range"
                    min="50"
                    max="1500"
                    step="5"
                    value={params.shelfPrice}
                    onChange={(e) => setParams({ ...params, shelfPrice: Number(e.target.value) })}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400">Розничный ценник для покупателя</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor={retailMarkupId} className="text-xs font-semibold text-slate-700">
                      Наценка сети
                    </label>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {params.retailMarkupPercent}%
                    </span>
                  </div>
                  <input
                    id={retailMarkupId}
                    type="range"
                    min="15"
                    max="75"
                    step="1"
                    value={params.retailMarkupPercent}
                    onChange={(e) => setParams({ ...params, retailMarkupPercent: Number(e.target.value) })}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400">Входная цена: ~{Math.round(results.supplierContractPrice)} ₽</span>
                </div>
              </div>

              {/* COGS: Ingredients & Packaging */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 block mb-3">
                  Прямая производственная себестоимость (COGS)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={cogsIngredientsId} className="text-xs font-medium text-slate-600">
                        Сырье и рецептура (₽)
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {params.cogsIngredients} ₽
                      </span>
                    </div>
                    <input
                      id={cogsIngredientsId}
                      type="range"
                      min="5"
                      max="600"
                      step="1"
                      value={params.cogsIngredients}
                      onChange={(e) => setParams({ ...params, cogsIngredients: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={cogsPackagingId} className="text-xs font-medium text-slate-600">
                        Упаковка, тара, этикетка (₽)
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {params.cogsPackaging} ₽
                      </span>
                    </div>
                    <input
                      id={cogsPackagingId}
                      type="range"
                      min="2"
                      max="150"
                      step="1"
                      value={params.cogsPackaging}
                      onChange={(e) => setParams({ ...params, cogsPackaging: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Retail Conditions: Retro-Bonus & Promo Depth */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800">
                    Условия торговой сети (ФЗ-381)
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-semibold">
                    Ретро макс 5.0%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={retroBonusId} className="text-[11px] font-medium text-slate-600">
                        Ретро-бонус
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {params.retroBonusPercent}%
                      </span>
                    </div>
                    <input
                      id={retroBonusId}
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={params.retroBonusPercent}
                      onChange={(e) => setParams({ ...params, retroBonusPercent: Number(e.target.value) })}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">По ФЗ №381-ФЗ</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={promoDiscountId} className="text-[11px] font-medium text-slate-600">
                        Скидка промо
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        -{params.promoDiscountPercent}%
                      </span>
                    </div>
                    <input
                      id={promoDiscountId}
                      type="range"
                      min="0"
                      max="45"
                      step="1"
                      value={params.promoDiscountPercent}
                      onChange={(e) => setParams({ ...params, promoDiscountPercent: Number(e.target.value) })}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">Желтый ценник</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={promoShareId} className="text-[11px] font-medium text-slate-600">
                        Доля промо
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {params.promoSharePercent}%
                      </span>
                    </div>
                    <input
                      id={promoShareId}
                      type="range"
                      min="0"
                      max="80"
                      step="5"
                      value={params.promoSharePercent}
                      onChange={(e) => setParams({ ...params, promoSharePercent: Number(e.target.value) })}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">В объеме продаж</span>
                  </div>
                </div>
              </div>

              {/* Logistics, Track & Trace, Payment Terms */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 block mb-3">
                  Логистика, маркировка и финансовые условия
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={logisticsId} className="text-[11px] font-medium text-slate-600">
                        Доставка на РЦ
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {params.logisticsPerUnit} ₽
                      </span>
                    </div>
                    <input
                      id={logisticsId}
                      type="range"
                      min="2"
                      max="40"
                      step="0.5"
                      value={params.logisticsPerUnit}
                      onChange={(e) => setParams({ ...params, logisticsPerUnit: Number(e.target.value) })}
                      className="w-full accent-slate-700 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">Паллета / короб</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={markingCostId} className="text-[11px] font-medium text-slate-600">
                        Честный ЗНАК+EDI
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {params.markingCost} ₽
                      </span>
                    </div>
                    <input
                      id={markingCostId}
                      type="range"
                      min="0.5"
                      max="6"
                      step="0.1"
                      value={params.markingCost}
                      onChange={(e) => setParams({ ...params, markingCost: Number(e.target.value) })}
                      className="w-full accent-slate-700 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">Код + ЭДО + Меркурий</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={deferralDaysId} className="text-[11px] font-medium text-slate-600">
                        Отсрочка платежа
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {params.paymentDeferralDays} дн.
                      </span>
                    </div>
                    <input
                      id={deferralDaysId}
                      type="range"
                      min="7"
                      max="60"
                      step="1"
                      value={params.paymentDeferralDays}
                      onChange={(e) => setParams({ ...params, paymentDeferralDays: Number(e.target.value) })}
                      className="w-full accent-slate-700 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">Дней до оплаты</span>
                  </div>
                </div>

                {/* Batch Size */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor={monthlyUnitsId} className="text-xs font-semibold text-slate-700">
                      Объем поставки в месяц (единиц продукции)
                    </label>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {params.monthlyUnits.toLocaleString('ru-RU')} шт.
                    </span>
                  </div>
                  <input
                    id={monthlyUnitsId}
                    type="range"
                    min="300"
                    max="30000"
                    step="100"
                    value={params.monthlyUnits}
                    onChange={(e) => setParams({ ...params, monthlyUnits: Number(e.target.value) })}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {onApplyToBuyerCard && (
              <div className="pt-2">
                <button
                  onClick={() => onApplyToBuyerCard(params)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Сформировать карточку КП для байера с этими параметрами
                </button>
              </div>
            )}
          </div>

          {/* Results & Visual Waterfall Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Scorecard */}
            <div className={`p-6 rounded-2xl border transition-all ${
              results.netProfitPerUnit > 0
                ? 'bg-emerald-950 text-white border-emerald-900 shadow-md'
                : 'bg-rose-950 text-white border-rose-900 shadow-md'
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Чистый результат на 1 штуку (Unit Profit)
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold font-mono ${
                  results.netProfitPerUnit > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  Маржа {results.netMarginPercent.toFixed(1)}%
                </span>
              </div>

              <div className="my-4 flex items-baseline justify-between">
                <div>
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums">
                    {results.netProfitPerUnit > 0 ? `+${results.netProfitPerUnit.toFixed(1)}` : results.netProfitPerUnit.toFixed(1)} ₽
                  </span>
                  <span className="text-xs text-white/70 block mt-1">
                    Чистая прибыль с одного юнита после всех вычетов
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300 tabular-nums">
                    {Math.round(results.monthlyNetProfit).toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-xs text-white/70 block mt-1">
                    В месяц чистыми
                  </span>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="pt-3 border-t border-white/10 flex items-start gap-2.5 text-xs leading-relaxed text-white/90">
                {results.netProfitPerUnit > 0 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{results.verdictRecommendation}</span>
              </div>
            </div>

            {/* Visual Waterfall: Where Every 100 ₽ Goes */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Куда уходит каждый рубль с полки магазина
                </h4>
                <span className="text-xs font-mono font-bold text-slate-600">
                  Полка: {params.shelfPrice} ₽ (100%)
                </span>
              </div>

              {/* Segmented Color Bar */}
              <div className="w-full h-5 rounded-lg overflow-hidden flex shadow-inner bg-slate-100">
                {/* Retailer markup */}
                <div
                  style={{ width: `${Math.min(100, Math.max(5, (results.retailerMarkupRub / results.shelfPrice) * 100))}%` }}
                  className="bg-slate-700 h-full transition-all"
                  title={`Наценка сети: ${Math.round(results.retailerMarkupRub)} ₽`}
                />
                {/* Retro + Promo */}
                <div
                  style={{ width: `${Math.min(100, Math.max(3, ((results.retroBonusRub + results.promoFundRub) / results.shelfPrice) * 100))}%` }}
                  className="bg-amber-500 h-full transition-all"
                  title={`Ретро-бонус и промо: ${(results.retroBonusRub + results.promoFundRub).toFixed(1)} ₽`}
                />
                {/* COGS Ingredients */}
                <div
                  style={{ width: `${Math.min(100, Math.max(5, (params.cogsIngredients / results.shelfPrice) * 100))}%` }}
                  className="bg-blue-600 h-full transition-all"
                  title={`Сырье: ${params.cogsIngredients} ₽`}
                />
                {/* Packaging & Logistics */}
                <div
                  style={{ width: `${Math.min(100, Math.max(3, ((params.cogsPackaging + results.totalLogisticsAndOps) / results.shelfPrice) * 100))}%` }}
                  className="bg-slate-400 h-full transition-all"
                  title={`Упаковка и логистика: ${(params.cogsPackaging + results.totalLogisticsAndOps).toFixed(1)} ₽`}
                />
                {/* Net Profit */}
                {results.netProfitPerUnit > 0 && (
                  <div
                    style={{ width: `${Math.min(100, Math.max(5, (results.netProfitPerUnit / results.shelfPrice) * 100))}%` }}
                    className="bg-emerald-500 h-full transition-all"
                    title={`Чистая прибыль: ${results.netProfitPerUnit.toFixed(1)} ₽`}
                  />
                )}
              </div>

              {/* Legend with exact amounts */}
              <div className="mt-5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-xs bg-slate-700" />
                    <span className="text-slate-600">Наценка сети ({params.retailMarkupPercent}%)</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-800">
                    {Math.round(results.retailerMarkupRub)} ₽ ({((results.retailerMarkupRub / results.shelfPrice) * 100).toFixed(1)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
                    <span className="text-slate-600">Ретро-бонус + Промо сети</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-800">
                    {(results.retroBonusRub + results.promoFundRub).toFixed(1)} ₽ ({(((results.retroBonusRub + results.promoFundRub) / results.shelfPrice) * 100).toFixed(1)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
                    <span className="text-slate-600">Сырье и рецептура (COGS)</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-800">
                    {params.cogsIngredients} ₽ ({((params.cogsIngredients / results.shelfPrice) * 100).toFixed(1)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-xs bg-slate-400" />
                    <span className="text-slate-600">Упаковка, доставка на РЦ и EDI</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-800">
                    {(params.cogsPackaging + results.totalLogisticsAndOps).toFixed(1)} ₽ ({(((params.cogsPackaging + results.totalLogisticsAndOps) / results.shelfPrice) * 100).toFixed(1)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                    <span className="text-slate-900">Чистая прибыль производителя</span>
                  </div>
                  <span className="font-mono text-emerald-700 text-sm">
                    +{results.netProfitPerUnit.toFixed(1)} ₽ ({((results.netProfitPerUnit / results.shelfPrice) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Cash Flow & Capital Lockup Risk Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Оборотные средства & Кассовый разрыв</span>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                  results.cashGapRisk === 'high' ? 'bg-rose-100 text-rose-800' :
                  results.cashGapRisk === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {results.cashGapRisk === 'high' ? 'Высокий риск кассового разрыва' :
                   results.cashGapRisk === 'medium' ? 'Умеренный риск' : 'Низкий риск'}
                </span>
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Заморозка в дебиторке сети:</span>
                  <span className="text-lg font-bold font-mono text-slate-900 mt-1 block">
                    {results.workingCapitalRequired.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    При отсрочке {params.paymentDeferralDays} дней
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Мин. безубыточная партия:</span>
                  <span className="text-lg font-bold font-mono text-slate-900 mt-1 block">
                    {results.breakevenUnits > 0 ? `${results.breakevenUnits.toLocaleString('ru-RU')} шт` : '—'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Для покрытия накладных цеха
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
