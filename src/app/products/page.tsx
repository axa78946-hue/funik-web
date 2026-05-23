"use client";

import { useState } from "react";

const plans = [
  {
    name: "30 дней",
    price: "349",
    period: "/мес",
    features: ["Полный доступ", "Все обновления", "Поддержка в Discord"],
    popular: false,
  },
  {
    name: "90 дней",
    price: "499",
    period: "/3 мес",
    features: ["Полный доступ", "Все обновления", "Поддержка в Discord", "Приоритет в очереди"],
    popular: false,
  },
  {
    name: "Навсегда",
    price: "699",
    period: "",
    features: ["Полный доступ навсегда", "Все обновления", "Приоритетная поддержка", "Ранний доступ к фичам", "Роль в Discord"],
    popular: true,
  },
  {
    name: "Сброс HWID",
    price: "349",
    period: "",
    features: ["Сброс привязки", "Моментальная активация"],
    popular: false,
  },
];

const paymentMethods = [
  { id: "card_ru", name: "Карта РФ", icon: "💳", description: "Visa, MasterCard, МИР" },
  { id: "card_int", name: "Карта (International)", icon: "🌍", description: "Visa, MasterCard" },
  { id: "paypal", name: "PayPal", icon: "🅿️", description: "Международные платежи" },
  { id: "crypto", name: "Криптовалюта", icon: "₿", description: "BTC, ETH, USDT" },
  { id: "funpay", name: "FunPay", icon: "🛒", description: "Получите ключ активации" },
  { id: "sbp", name: "СБП", icon: "🏦", description: "Система быстрых платежей" },
];

export default function Products() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleBuy = (planName: string) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  const handlePayment = (methodId: string) => {
    // Here you would redirect to payment
    if (methodId === "funpay") {
      window.open("https://funpay.com/", "_blank");
    } else {
      alert(`Оплата через ${methodId} будет доступна скоро`);
    }
    setShowModal(false);
  };

  return (
    <div className="gradient-top pt-32 pb-20 bg-grid min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Выберите <span className="text-gradient">план</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Получите доступ к полному функционалу Funik Client
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative p-7 rounded-2xl border flex flex-col card-hover ${
                plan.popular
                  ? "border-red-500/40 bg-gradient-to-b from-red-500/10 to-transparent glow-red-sm"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white text-xs font-semibold rounded-full glow-red-sm">
                  Лучший выбор
                </span>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-1">₽{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-300 flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-xs">✓</span>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBuy(plan.name)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? "bg-red-600 hover:bg-red-500 text-white glow-red-sm hover:glow-red"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                }`}
              >
                Купить
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-md p-8 rounded-2xl border border-white/10 bg-[#111111] animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-2">Способ оплаты</h3>
            <p className="text-gray-500 text-sm mb-6">
              План: <span className="text-white">{selectedPlan}</span>
            </p>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePayment(method.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200 text-left"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
