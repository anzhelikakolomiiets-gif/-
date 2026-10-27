/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface FooterProps {
  onSelectTab: (tab: 'cover' | 'logo' | 'calculator' | 'channels' | 'buyerCard') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/retail_navigator_logo_1793115093778.jpg"
                alt="Логотип Ритейл навигатор"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-base font-bold text-white tracking-tight">
                Ритейл навигатор
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Онлайн-сервис юнит-экономики и подготовки спецификаций для локальных производителей при работе с федеральными, региональными сетями и маркетплейсами.
            </p>
            <div className="text-[11px] text-slate-500">
              Соответствие требованиям Федерального закона № 381-ФЗ «Об основах государственного регулирования торговой деятельности в РФ».
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] block mb-3">
              Инструменты сервиса
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('cover')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Презентационная обложка
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('logo')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Логотип и брендбук
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Калькулятор юнит-экономики
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('channels')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Сравнение сетей (X5, ВкусВилл, Лавка)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('buyerCard')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Генератор КП для байера
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory & Knowledge */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] block mb-3">
              Нормативные стандарты ритейла
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li>· Ограничение ретро-бонуса до 5% стоимости закупки</li>
              <li>· Запрет платы за вход на полку (slotting allowance)</li>
              <li>· Сроки оплаты: 10–40 дней в зависимости от срока годности</li>
              <li>· Обязательная интеграция «Честный ЗНАК» и ФГИС «Меркурий»</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Ритейл навигатор. Все права защищены. Сервис для локальных производителей РФ.
          </div>
          <div className="flex items-center gap-4">
            <span>Безопасный расчет</span>
            <span aria-hidden="true">·</span>
            <span>Конфиденциальность рецептур</span>
            <span aria-hidden="true">·</span>
            <span>Поддержка ЭДО</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
