/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RETAIL_CHANNELS, ProductPreset, calculateUnitEconomics } from '../data/models';
import { Store, ShoppingCart, Truck, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';

interface ChannelMatrixProps {
  currentProduct: ProductPreset;
  onApplyChannelToProduct: (channelId: string) => void;
}

export const ChannelMatrix: React.FC<ChannelMatrixProps> = ({
  currentProduct,
  onApplyChannelToProduct
}) => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('federal');

  // Calculate results for the current product across each channel
  const channelSimulations = RETAIL_CHANNELS.map((ch) => {
    const simParams = {
      ...currentProduct,
      retailMarkupPercent: ch.avgMarkup,
      retroBonusPercent: ch.typicalRetroBonus,
      promoDiscountPercent: ch.typicalPromoDiscount,
      paymentDeferralDays: ch.paymentTerms
    };
    const res = calculateUnitEconomics(simParams);
    return {
      channel: ch,
      results: res
    };
  });

  const activeChannelSim = channelSimulations.find(s => s.channel.id === selectedChannelId) || channelSimulations[0];

  return (
    <section id="channels" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>Сравнительный анализ каналов сбыта</span>
              <span aria-hidden="true">·</span>
              <span>Матрица маржинальности</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Куда выгоднее выходить локальному бренду?
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Сравнение экономики для «{currentProduct.name}» в 4 ключевых каналах ритейла России: от федеральных сетей до дарксторов.
            </p>
          </div>
        </div>

        {/* Channel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {channelSimulations.map(({ channel, results }) => {
            const isSelected = channel.id === selectedChannelId;
            return (
              <div
                key={channel.id}
                onClick={() => setSelectedChannelId(channel.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/30 shadow-md ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                      {channel.codeName}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                      results.netProfitPerUnit > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {results.netMarginPercent.toFixed(1)}% маржа
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-3 line-clamp-1">
                    {channel.name}
                  </h3>

                  {/* Key Metrics */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Прибыль на шт:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {results.netProfitPerUnit > 0 ? `+${results.netProfitPerUnit.toFixed(1)}` : results.netProfitPerUnit.toFixed(1)} ₽
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Наценка сети:</span>
                      <span className="font-mono text-slate-800">{channel.avgMarkup}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Ретро-бонус:</span>
                      <span className="font-mono text-slate-800">{channel.typicalRetroBonus}%</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Отсрочка платежа:</span>
                      <span className="font-mono text-slate-800">{channel.paymentTerms} дней</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Квант: от {channel.minBatch} шт
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    Детали <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Channel Deep Dive Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual & Core Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <img
                  src="/src/assets/images/modern_retail_aisle_1793115068707.jpg"
                  alt="Полка современного супермаркета"
                  referrerPolicy="no-referrer"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="text-xs font-medium text-emerald-300">Канал дистрибуции</span>
                    <h4 className="text-lg font-bold">{activeChannelSim.channel.name}</h4>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-semibold text-slate-900 block">Логистическое плечо:</span>
                <p className="text-slate-600">{activeChannelSim.channel.logisticsType}</p>
              </div>

              <button
                onClick={() => onApplyChannelToProduct(activeChannelSim.channel.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Применить параметры этого канала в калькуляторе
              </button>
            </div>

            {/* Checklist of Requirements, Advantages & Risks */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              {/* Requirements */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Входные требования сети</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  {activeChannelSim.channel.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 font-mono">0{idx + 1}.</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks & Traps */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Подводные камни & Штрафы</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  {activeChannelSim.channel.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-amber-950">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages */}
              <div className="sm:col-span-2 bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/80">
                <span className="font-bold text-slate-900 text-sm block mb-2">
                  Ключевые преимущества канала для местного производителя:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeChannelSim.channel.advantages.map((adv, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-lg border border-emerald-100 text-slate-700">
                      <span className="font-semibold text-emerald-800 block mb-0.5">Фактор {idx + 1}</span>
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
