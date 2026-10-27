/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProductPreset, calculateUnitEconomics } from '../data/models';
import { Printer, Copy, Check, FileText, Barcode, Calendar, Thermometer, Box, ShieldCheck, ArrowRight } from 'lucide-react';

interface BuyerOfferGeneratorProps {
  product: ProductPreset;
}

export const BuyerOfferGenerator: React.FC<BuyerOfferGeneratorProps> = ({ product }) => {
  const [copied, setCopied] = useState(false);
  const [companyName, setCompanyName] = useState('ООО «Локальная мануфактура»');
  const [region, setRegion] = useState('Россия, Московская область');
  const [eanCode, setEanCode] = useState('4607123456789');
  const [unitsPerBox, setUnitsPerBox] = useState(12);
  const [boxesPerPallet, setBoxesPerPallet] = useState(64);

  const results = calculateUnitEconomics(product);

  const handleCopyEmailText = () => {
    const text = `Коммерческое предложение для категорийного менеджера:
Продукт: ${product.name}
Производитель: ${companyName} (${region})
Вес/объем: ${product.weightVolume}
Срок годности: ${product.shelfLifeDays} дней (${product.temperatureLabel})
Штрихкод EAN-13: ${eanCode}
Квант: ${unitsPerBox} шт. в коробе / ${boxesPerPallet} коробов на паллете

Экономические параметры:
Рекомендованная полка (РРЦ с НДС): ${product.shelfPrice} ₽
Входная цена без НДС: ${(results.supplierContractPrice / (1 + results.vatRatePercent / 100)).toFixed(2)} ₽
Входная цена с НДС: ${results.supplierContractPrice.toFixed(2)} ₽
Расчетная наценка сети: ${product.retailMarkupPercent}%
Согласованный ретро-бонус: ${product.retroBonusPercent}% (по ФЗ-381)
Готовность к промо: до -${product.promoDiscountPercent}% скидки

Система «Честный ЗНАК» и ФГИС «Меркурий»: подключены, ЭДО настроен.
Расчет выполнен в сервисе «Ритейл навигатор».`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="buyer-card" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>Документ для ритейла</span>
              <span aria-hidden="true">·</span>
              <span>Формат спецификации категорийного менеджера</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Карточка-обложка коммерческого предложения (КП)
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Сформируйте профессиональный паспорт продукта с готовыми расчетами маржинальности сети для отправки байеру.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmailText}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'Текст скопирован!' : 'Скопировать текст КП'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Печать карточки / PDF</span>
            </button>
          </div>
        </div>

        {/* 2 Columns: Settings (Left) & Printable Specification Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings / Inputs Form */}
          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200">
              Данные поставщика и логистики
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Юридическое лицо / Бренд
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Регион и адрес производства
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Штрихкод штуки (EAN-13)
              </label>
              <input
                type="text"
                value={eanCode}
                onChange={(e) => setEanCode(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Штук в коробе
                </label>
                <input
                  type="number"
                  value={unitsPerBox}
                  onChange={(e) => setUnitsPerBox(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Коробов на паллете
                </label>
                <input
                  type="number"
                  value={boxesPerPallet}
                  onChange={(e) => setBoxesPerPallet(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
              Карточка автоматически рассчитывает маржинальность ритейлера и формирует привлекательное предложение для категорийного менеджера.
            </div>
          </div>

          {/* Printable Official Specification Card */}
          <div className="lg:col-span-8 bg-white border-2 border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-800 gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                  alt="Логотип"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover border border-slate-300"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    Ритейл навигатор · Карточка товара
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    КОММЕРЧЕСКАЯ СПЕЦИФИКАЦИЯ SKU
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-500">
                <span className="font-mono font-semibold text-slate-900 block">
                  ДОК № РН-{product.id.toUpperCase()}-2026
                </span>
                <span>Стандарт торговой матрицы РФ</span>
              </div>
            </div>

            {/* Product Marquee Info */}
            <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img
                    src="/src/assets/images/artisan_local_products_1793115068422.jpg"
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-2.5 text-center text-[11px] font-mono font-semibold text-slate-700 bg-slate-100">
                    EAN: {eanCode}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                <div>
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-2">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Масса / Фасовка:</span>
                    <strong className="text-slate-800">{product.weightVolume}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Срок годности:</span>
                    <strong className="text-slate-800">{product.shelfLifeDays} суток</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Терморежим:</span>
                    <strong className="text-slate-800">{product.temperatureLabel}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Network Commercials Table */}
            <div className="border border-slate-300 rounded-xl overflow-hidden mb-6">
              <div className="bg-slate-900 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                <span>Ценовая модель для категорийного менеджера</span>
                <span className="text-emerald-400 font-mono">Наценка сети: {product.retailMarkupPercent}%</span>
              </div>

              <div className="divide-y divide-slate-200 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 p-3 bg-slate-50">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Рекомендованная полка (РРЦ):</span>
                    <span className="text-base font-black font-mono text-slate-900">{product.shelfPrice} ₽</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Входная цена с НДС:</span>
                    <span className="text-base font-black font-mono text-emerald-700">
                      {results.supplierContractPrice.toFixed(2)} ₽
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Маржинальный доход сети:</span>
                    <span className="text-base font-black font-mono text-slate-900">
                      {results.retailerMarkupRub.toFixed(2)} ₽
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Ретро-бонус сети:</span>
                    <span className="text-base font-black font-mono text-slate-900">
                      {product.retroBonusPercent}% (ФЗ-381)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Квант поставки (паллета):</span>
                    <span className="font-semibold text-slate-800">
                      {unitsPerBox * boxesPerPallet} шт. ({boxesPerPallet} коробов)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Промо-соглашение:</span>
                    <span className="font-semibold text-slate-800">
                      До -{product.promoDiscountPercent}% скидки (желтый ценник)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Электронный документооборот:</span>
                    <span className="font-semibold text-emerald-700">
                      EDI / Меркурий / Честный ЗНАК 100%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Manufacturer Signature & Trust Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500 gap-3">
              <div>
                <strong className="text-slate-800 block">{companyName}</strong>
                <span>{region} · Готовность к аудиту производства</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Сертифицировано в Ритейл навигаторе</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
