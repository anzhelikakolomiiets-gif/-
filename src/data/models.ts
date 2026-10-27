/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductPreset {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  weightVolume: string;
  shelfLifeDays: number;
  temperatureMode: 'chilled' | 'ambient' | 'frozen';
  temperatureLabel: string;
  shelfPrice: number; // Цена на полке в рознице (₽)
  retailMarkupPercent: number; // Плановая наценка сети (%)
  cogsIngredients: number; // Сырье и ингредиенты (₽)
  cogsPackaging: number; // Упаковка, тара, этикетка (₽)
  logisticsPerUnit: number; // Доставка до РЦ ритейлера на единицу (₽)
  markingCost: number; // «Честный ЗНАК» + Меркурий + EDI (₽)
  retroBonusPercent: number; // Ретро-бонус сети (до 5% по ФЗ-381)
  promoDiscountPercent: number; // Скидка по акции (желтый ценник, %)
  promoSharePercent: number; // Доля продаж по акции (%)
  damageLossPercent: number; // Бракераж, списания, потери (%)
  paymentDeferralDays: number; // Отсрочка платежа (дни)
  monthlyUnits: number; // Объем поставки в месяц (шт)
  imageKey: string;
  description: string;
}

export interface RetailChannel {
  id: string;
  name: string;
  codeName: string;
  networkType: 'federal' | 'healthy_food' | 'regional' | 'marketplace';
  avgMarkup: number; // Наценка сети (%)
  typicalRetroBonus: number; // Ретро-бонус (%)
  typicalPromoDiscount: number; // Глубина промо (%)
  promoFrequencyWeeks: number; // Частота акций в год
  logisticsType: string;
  paymentTerms: number; // Дни отсрочки
  minBatch: number; // Мин. квант поставки
  requirements: string[];
  advantages: string[];
  risks: string[];
}

export const RETAIL_CHANNELS: RetailChannel[] = [
  {
    id: 'federal',
    name: 'Федеральная сеть (X5 / Магнит / Лента)',
    codeName: 'X5 / Пятёрочка / Перекрёсток',
    networkType: 'federal',
    avgMarkup: 48,
    typicalRetroBonus: 5,
    typicalPromoDiscount: 28,
    promoFrequencyWeeks: 6,
    logisticsType: 'Поставка на центральный РЦ (паллеты 1200x800)',
    paymentTerms: 40,
    minBatch: 4000,
    requirements: [
      'Маркировка «Честный ЗНАК» и ФГИС «Меркурий»',
      'Электронный документооборот (EDI через CISLink/Ediweb)',
      'Штрихкоды GS1 (EAN-13 на штуку, ITF-14 на гофрокороб)',
      'Остаточный срок годности не менее 75-80% на момент приемки'
    ],
    advantages: [
      'Огромный масштаб и гарантированный сбыт больших объемов',
      'Узнаваемость бренда в тысячах супермаркетов страны',
      'Единое логистическое окно через распределительные центры'
    ],
    risks: [
      'Жесткие штрафы за недопоставку (Out-of-stock штраф до 15%)',
      'Высокое давление на цену: требование промо 4-8 раз в год',
      'Длинная отсрочка платежа (30-45 дней) и риск кассового разрыва'
    ]
  },
  {
    id: 'healthy_food',
    name: 'Сеть здорового питания (ВкусВилл)',
    codeName: 'ВкусВилл / ЗОЖ-ритейл',
    networkType: 'healthy_food',
    avgMarkup: 42,
    typicalRetroBonus: 0, // ВкусВилл не берет ретро-бонусы
    typicalPromoDiscount: 12,
    promoFrequencyWeeks: 3,
    logisticsType: 'Региональный РЦ (короткое плечо, частые поставки)',
    paymentTerms: 14,
    minBatch: 800,
    requirements: [
      'Аудит производства экспертами сети (чистый состав, отсутствие Е-добавок)',
      'Короткие сроки годности и органолептические пробы каждой партии',
      'Готовность к быстрой ротации при падении рейтинга покупателей (< 4.6)'
    ],
    advantages: [
      '0% ретро-бонусов (прямой закуп без скрытых вычетов)',
      'Быстрая оплата (10-14 дней), минимальный кассовый разрыв',
      'Лояльная аудитория, готовая платить за натуральность и качество'
    ],
    risks: [
      'Высокий риск вывода с полки при негативных отзывах в приложении',
      'Строгий контроль терморежима при доставке скоропорта'
    ]
  },
  {
    id: 'regional',
    name: 'Локальная сеть / Гастрономы у дома',
    codeName: 'Региональный ритейл & Гастрономы',
    networkType: 'regional',
    avgMarkup: 38,
    typicalRetroBonus: 3,
    typicalPromoDiscount: 15,
    promoFrequencyWeeks: 4,
    logisticsType: 'Прямая доставка в магазины (DSD) или локальный склад',
    paymentTerms: 21,
    minBatch: 400,
    requirements: [
      'Сертификаты соответствия, декларации ЕАС',
      'Локальная логистика собственным автотранспортом с рефрижератором',
      'Мерчандайзинг силами поставщика или торгового представителя'
    ],
    advantages: [
      'Прямой контакт с категорийным менеджером и гибкость согласования',
      'Возможность тестировать новые SKU малыми тестовыми партиями',
      'Уважение к местным локальным производителям на домашнем рынке'
    ],
    risks: [
      'Трудоемкая развозка по десяткам отдельных торговых точек',
      'Ограниченная емкость полки в масштабах региона'
    ]
  },
  {
    id: 'marketplace',
    name: 'Маркетплейс & Darkstore (Ozon Fresh / Яндекс Лавка)',
    codeName: 'Ozon Fresh / Самокат / Лавка',
    networkType: 'marketplace',
    avgMarkup: 35,
    typicalRetroBonus: 0,
    typicalPromoDiscount: 20,
    promoFrequencyWeeks: 4,
    logisticsType: 'Кросс-докинг или поставка на дарксторы',
    paymentTerms: 7,
    minBatch: 500,
    requirements: [
      'Качественная фотосъемка карточки товара и инфографика',
      'Строгая герметичная индивидуальная упаковка (термоусадка/пакет)',
      'Интеграция по API или работа через личный кабинет поставщика'
    ],
    advantages: [
      'Деньги приходят еженедельно (фактически мгновенный оборот)',
      'Молодая платежеспособная городская аудитория',
      'Прозрачная веб-аналитика просмотров, добавлений в корзину и выкупа'
    ],
    risks: [
      'Плата за хранение и платная реклама внутри поисковой выдачи',
      'Комиссия маркетплейса за эквайринг и обработку возвратов'
    ]
  }
];

export const PRODUCT_PRESETS: ProductPreset[] = [
  {
    id: 'craft_cheese',
    name: 'Твердый выдержанный сыр «Ремесленный» 200г',
    category: 'Сыроварня & Молочная продукция',
    categoryLabel: 'Сыры',
    weightVolume: '200 г (вакуум)',
    shelfLifeDays: 120,
    temperatureMode: 'chilled',
    temperatureLabel: '+2...+6 °C',
    shelfPrice: 389,
    retailMarkupPercent: 45,
    cogsIngredients: 118,
    cogsPackaging: 22,
    logisticsPerUnit: 14,
    markingCost: 2.5,
    retroBonusPercent: 5,
    promoDiscountPercent: 25,
    promoSharePercent: 35,
    damageLossPercent: 2,
    paymentDeferralDays: 35,
    monthlyUnits: 4500,
    imageKey: 'artisan_local_products',
    description: 'Выдержанный крафтовый сыр из цельного фермерского молока. Срок созревания 6 месяцев.'
  },
  {
    id: 'berry_preserve',
    name: 'Брусничное ремесленное варенье с травами 250г',
    category: 'Консервация & Дикоросы',
    categoryLabel: 'Бакалея',
    weightVolume: '250 г (стеклобан)',
    shelfLifeDays: 365,
    temperatureMode: 'ambient',
    temperatureLabel: '0...+25 °C',
    shelfPrice: 320,
    retailMarkupPercent: 42,
    cogsIngredients: 78,
    cogsPackaging: 28,
    logisticsPerUnit: 16,
    markingCost: 1.8,
    retroBonusPercent: 5,
    promoDiscountPercent: 22,
    promoSharePercent: 30,
    damageLossPercent: 1.5,
    paymentDeferralDays: 45,
    monthlyUnits: 6000,
    imageKey: 'artisan_local_products',
    description: 'Дикая таежная брусника, кедровый сироп и таежный сбор. Эко-стеклобанка с крафт-этикеткой.'
  },
  {
    id: 'farm_yogurt',
    name: 'Био-йогурт фермерский термостатный 300г',
    category: 'Молочный скоропорт',
    categoryLabel: 'Молочный отдел',
    weightVolume: '300 г (стаканчик)',
    shelfLifeDays: 14,
    temperatureMode: 'chilled',
    temperatureLabel: '+2...+4 °C',
    shelfPrice: 119,
    retailMarkupPercent: 38,
    cogsIngredients: 34,
    cogsPackaging: 12,
    logisticsPerUnit: 8.5,
    markingCost: 2.2,
    retroBonusPercent: 4.5,
    promoDiscountPercent: 20,
    promoSharePercent: 25,
    damageLossPercent: 4,
    paymentDeferralDays: 20,
    monthlyUnits: 12000,
    imageKey: 'retail_navigator_hero',
    description: 'Натуральный термостатный йогурт на живой закваске. Короткий срок годности — ультраскоропорт.'
  },
  {
    id: 'sourdough_bread',
    name: 'Ремесленный подовый тартин на закваске 450г',
    category: 'Пекарня & Хлебобулочные изделия',
    categoryLabel: 'Свежий хлеб',
    weightVolume: '450 г (крафт-пакет)',
    shelfLifeDays: 4,
    temperatureMode: 'ambient',
    temperatureLabel: '+15...+22 °C',
    shelfPrice: 165,
    retailMarkupPercent: 40,
    cogsIngredients: 28,
    cogsPackaging: 11,
    logisticsPerUnit: 12,
    markingCost: 0.8,
    retroBonusPercent: 3,
    promoDiscountPercent: 15,
    promoSharePercent: 20,
    damageLossPercent: 3.5,
    paymentDeferralDays: 14,
    monthlyUnits: 8000,
    imageKey: 'retail_navigator_hero',
    description: '36-часовая холодная ферментация, каменный под, хрустящая карамельная корочка.'
  },
  {
    id: 'craft_soap',
    name: 'Натуральное мыло ручной работы «Лаванда & Мед» 100г',
    category: 'Локальная косметика & Дрогери',
    categoryLabel: 'Косметика & Уход',
    weightVolume: '100 г (коробка)',
    shelfLifeDays: 730,
    temperatureMode: 'ambient',
    temperatureLabel: '+5...+25 °C',
    shelfPrice: 290,
    retailMarkupPercent: 50,
    cogsIngredients: 42,
    cogsPackaging: 19,
    logisticsPerUnit: 9,
    markingCost: 2.1,
    retroBonusPercent: 5,
    promoDiscountPercent: 30,
    promoSharePercent: 40,
    damageLossPercent: 1,
    paymentDeferralDays: 45,
    monthlyUnits: 3000,
    imageKey: 'artisan_local_products',
    description: 'Омыленные растительные масла, эфирное масло лаванды, местный мед с пасеки.'
  }
];

export interface UnitEconomicsResults {
  shelfPrice: number; // Цена на полке с НДС
  shelfPriceWithoutVat: number; // Полочная цена без НДС (10% для еды, 20% для косметики)
  vatRatePercent: number; // 10% или 20%
  retailerMarkupRub: number; // Наценка торговой сети
  supplierContractPrice: number; // Входная цена ритейлеру (цена поставщика по договору)
  retroBonusRub: number; // Ретро-бонус ритейлеру
  promoFundRub: number; // Усредненный фонд промо-скидки
  effectiveSupplierGross: number; // Фактическая выручка поставщика за единицу после вычетов сети
  totalCogs: number; // Прямая себестоимость (сырье + упаковка)
  totalLogisticsAndOps: number; // Логистика до РЦ + Маркировка Честный ЗНАК + EDI
  damageLossRub: number; // Списания и бой
  totalCostsPerUnit: number; // Все расходы поставщика на штуку
  netProfitPerUnit: number; // Чистая прибыль на штуку
  netMarginPercent: number; // Рентабельность (Net Margin %) от входной цены
  returnOnSalesPercent: number; // Доля чистой прибыли в полочной цене
  monthlyRevenue: number; // Выручка за партию в месяц
  monthlyNetProfit: number; // Чистая прибыль за месяц
  breakevenUnits: number; // Точка безубыточности (мин. объем для покрытия базовых накладных)
  workingCapitalRequired: number; // Замороженные оборотные средства из-за отсрочки платежа
  cashGapRisk: 'low' | 'medium' | 'high';
  verdictRecommendation: string;
}

export function calculateUnitEconomics(params: {
  shelfPrice: number;
  retailMarkupPercent: number;
  cogsIngredients: number;
  cogsPackaging: number;
  logisticsPerUnit: number;
  markingCost: number;
  retroBonusPercent: number;
  promoDiscountPercent: number;
  promoSharePercent: number;
  damageLossPercent: number;
  paymentDeferralDays: number;
  monthlyUnits: number;
  category: string;
}): UnitEconomicsResults {
  const {
    shelfPrice,
    retailMarkupPercent,
    cogsIngredients,
    cogsPackaging,
    logisticsPerUnit,
    markingCost,
    retroBonusPercent,
    promoDiscountPercent,
    promoSharePercent,
    damageLossPercent,
    paymentDeferralDays,
    monthlyUnits,
    category
  } = params;

  // НДС в РФ: базовые продукты питания (молоко, сыр, хлеб) — 10%, консервация и косметика — 20%
  const isReducedVat = category.includes('Молочн') || category.includes('Сыр') || category.includes('хлеб') || category.includes('Хлеб');
  const vatRatePercent = isReducedVat ? 10 : 20;
  const shelfPriceWithoutVat = shelfPrice / (1 + vatRatePercent / 100);

  // Входная базовая цена ритейлеру (до промо и ретро-бонусов)
  // Полочная цена = Входная цена * (1 + Наценка сети / 100)
  const supplierContractPrice = shelfPrice / (1 + retailMarkupPercent / 100);
  const retailerMarkupRub = shelfPrice - supplierContractPrice;

  // Ретро-бонус ритейлеру (рассчитывается от объема закупки по ФЗ-381, до 5%)
  const retroBonusRub = (supplierContractPrice * retroBonusPercent) / 100;

  // Усредненная скидка по промо-акциям (желтым ценникам)
  // Допустим, промо со скидкой 25% идет 35% объема продаж
  const promoDiscountOnContract = (supplierContractPrice * promoDiscountPercent) / 100;
  const promoFundRub = (promoDiscountOnContract * promoSharePercent) / 100;

  // Фактический доход поставщика после вычетов ритейлера
  const effectiveSupplierGross = supplierContractPrice - retroBonusRub - promoFundRub;

  // Производственные затраты (COGS)
  const totalCogs = cogsIngredients + cogsPackaging;

  // Логистика, «Честный ЗНАК» и документация
  const totalLogisticsAndOps = logisticsPerUnit + markingCost;

  // Резерв на списания, потери и штрафы за недовоз
  const damageLossRub = (supplierContractPrice * damageLossPercent) / 100;

  // Полная себестоимость единицы продукции для производителя
  const totalCostsPerUnit = totalCogs + totalLogisticsAndOps + damageLossRub;

  // Чистый доход на единицу
  const netProfitPerUnit = effectiveSupplierGross - totalCostsPerUnit;

  // Маржинальность (%) от входной цены
  const netMarginPercent = supplierContractPrice > 0 ? (netProfitPerUnit / supplierContractPrice) * 100 : 0;

  // Доля в конечной полочной цене (сколько рублей из цены на полке достается производителю в карман)
  const returnOnSalesPercent = shelfPrice > 0 ? (netProfitPerUnit / shelfPrice) * 100 : 0;

  // Месячные показатели
  const monthlyRevenue = supplierContractPrice * monthlyUnits;
  const monthlyNetProfit = netProfitPerUnit * monthlyUnits;

  // Точка безубыточности (при условных постоянных расходах цеха 150 000 ₽ / месяц)
  const fixedOverheads = 150000;
  const unitContribution = effectiveSupplierGross - totalCostsPerUnit;
  const breakevenUnits = unitContribution > 0 ? Math.ceil(fixedOverheads / unitContribution) : 999999;

  // Оборотные средства, замороженные в дебиторской задолженности сети
  // Зависят от отсрочки платежа и производственной себестоимости партии
  const dailyShipmentCost = (totalCostsPerUnit * monthlyUnits) / 30;
  const workingCapitalRequired = Math.round(dailyShipmentCost * paymentDeferralDays);

  // Оценка риска кассового разрыва
  let cashGapRisk: 'low' | 'medium' | 'high' = 'low';
  if (paymentDeferralDays > 35 || netMarginPercent < 8) {
    cashGapRisk = 'high';
  } else if (paymentDeferralDays > 25 || netMarginPercent < 15) {
    cashGapRisk = 'medium';
  }

  // Рекомендация эксперта Ритейл Навигатора
  let verdictRecommendation = '';
  if (netMarginPercent >= 20 && cashGapRisk !== 'high') {
    verdictRecommendation = 'Отличная модель! Высокий запас прочности для входа в сеть с запасом на промо-волны.';
  } else if (netMarginPercent >= 10 && cashGapRisk !== 'high') {
    verdictRecommendation = 'Рабочая юнит-экономика. Рекомендуется контролировать частоту желтых ценников и снизить стоимость упаковки.';
  } else if (netMarginPercent > 0) {
    verdictRecommendation = 'Зона риска: рентабельность низкая. При задержке оплаты ритейлером возникнет кассовый разрыв. Требуется факторинг.';
  } else {
    verdictRecommendation = 'Критично: производство работает в убыток на полке сети! Необходимо повышать входную цену или снижать COGS.';
  }

  return {
    shelfPrice,
    shelfPriceWithoutVat,
    vatRatePercent,
    retailerMarkupRub,
    supplierContractPrice,
    retroBonusRub,
    promoFundRub,
    effectiveSupplierGross,
    totalCogs,
    totalLogisticsAndOps,
    damageLossRub,
    totalCostsPerUnit,
    netProfitPerUnit,
    netMarginPercent,
    returnOnSalesPercent,
    monthlyRevenue,
    monthlyNetProfit,
    breakevenUnits,
    workingCapitalRequired,
    cashGapRisk,
    verdictRecommendation
  };
}
