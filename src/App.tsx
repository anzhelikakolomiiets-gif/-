/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BrandCoverHero } from './components/BrandCoverHero';
import { LogoBrandSection } from './components/LogoBrandSection';
import { UnitEconomicsCalculator } from './components/UnitEconomicsCalculator';
import { ChannelMatrix } from './components/ChannelMatrix';
import { BuyerOfferGenerator } from './components/BuyerOfferGenerator';
import { Footer } from './components/Footer';
import { PRODUCT_PRESETS, ProductPreset, RETAIL_CHANNELS } from './data/models';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cover' | 'logo' | 'calculator' | 'channels' | 'buyerCard'>('cover');
  const [selectedProduct, setSelectedProduct] = useState<ProductPreset>(PRODUCT_PRESETS[0]);

  const handleOpenCalculator = (preset?: ProductPreset) => {
    if (preset) {
      setSelectedProduct(preset);
    }
    setActiveTab('calculator');
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyChannelToProduct = (channelId: string) => {
    const channel = RETAIL_CHANNELS.find((c) => c.id === channelId);
    if (!channel) return;

    setSelectedProduct({
      ...selectedProduct,
      retailMarkupPercent: channel.avgMarkup,
      retroBonusPercent: channel.typicalRetroBonus,
      promoDiscountPercent: channel.typicalPromoDiscount,
      paymentDeferralDays: channel.paymentTerms,
    });
    setActiveTab('calculator');
  };

  const handleApplyToBuyerCard = (updatedPreset: ProductPreset) => {
    setSelectedProduct(updatedPreset);
    setActiveTab('buyerCard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header adhering to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCalculator={() => handleOpenCalculator()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Tab 1: Comprehensive Brand Cover & Showcase */}
        {activeTab === 'cover' && (
          <>
            <BrandCoverHero
              selectedPreset={selectedProduct}
              onSelectPreset={setSelectedProduct}
              onOpenCalculator={handleOpenCalculator}
              onSelectTab={setActiveTab}
            />

            {/* In-page Logo Highlight Teaser */}
            <div className="bg-slate-900 text-white py-10 px-4 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                    alt="Логотип Ритейл навигатор"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover border border-white/20 shadow-md"
                  />
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                      Новый фирменный стиль сервиса
                    </span>
                    <h3 className="text-lg font-bold">
                      Логотип «Ритейл навигатор» готов к использованию
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Навигационный компас + Полочная матрица + Столбцы маржинальности
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('logo')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0"
                >
                  Смотреть брендбук и скачать логотип
                </button>
              </div>
            </div>

            {/* Quick Calculator embedded in cover view */}
            <UnitEconomicsCalculator
              key={selectedProduct.id}
              initialPreset={selectedProduct}
              onApplyToBuyerCard={handleApplyToBuyerCard}
            />

            {/* Quick Channel Matrix preview in cover view */}
            <ChannelMatrix
              currentProduct={selectedProduct}
              onApplyChannelToProduct={handleApplyChannelToProduct}
            />
          </>
        )}

        {/* Tab 2: Logo and Brand Section */}
        {activeTab === 'logo' && (
          <LogoBrandSection />
        )}

        {/* Tab 3: Unit Economics Calculator */}
        {activeTab === 'calculator' && (
          <UnitEconomicsCalculator
            key={selectedProduct.id}
            initialPreset={selectedProduct}
            onApplyToBuyerCard={handleApplyToBuyerCard}
          />
        )}

        {/* Tab 4: Channel Matrix Comparison */}
        {activeTab === 'channels' && (
          <ChannelMatrix
            currentProduct={selectedProduct}
            onApplyChannelToProduct={handleApplyChannelToProduct}
          />
        )}

        {/* Tab 5: Buyer Card / Specification One-Pager */}
        {activeTab === 'buyerCard' && (
          <BuyerOfferGenerator product={selectedProduct} />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
