const plans = [
  {
    name: "Ранний доступ",
    price: "250",
    period: "",
    badge: "🔥 Бета",
    badgeColor: "bg-orange-500",
    features: [
      "Бета-тест за 2 недели до релиза",
      "Доступ к тестовым функциям",
      "Роль Бета-тестер в Discord",
      "Влияние на разработку",
    ],
    popular: false,
  },
  {
    name: "30 дней",
    price: "349",
    period: "/мес",
    badge: null,
    badgeColor: "",
    features: ["Полный доступ", "Все обновления", "Поддержка в Discord"],
    popular: false,
  },
  {
    name: "90 дней",
    price: "499",
    period: "/3 мес",
    badge: null,
    badgeColor: "",
    features: ["Полный доступ", "Все обновления", "Поддержка в Discord", "Приоритет в очереди"],
    popular: false,
  },
  {
    name: "Навсегда",
    price: "699",
    period: "",
    badge: null,
    badgeColor: "",
    features: ["Полный доступ навсегда", "Все обновления", "Приоритетная поддержка", "Ранний доступ к фичам", "Роль в Discord"],
    popular: true,
  },
  {
    name: "Сброс HWID",
    price: "349",
    period: "",
    badge: null,
    badgeColor: "",
    features: ["Сброс привязки", "Моментальная активация"],
    popular: false,
  },
];

export default function Products() {
  return (
    <div className="gradient-top pt-32 pb-20 bg-grid min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Announcement Banner */}
        <div className="mb-12 p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-white font-semibold">Покупка временно недоступна</p>
              <p className="text-gray-400 text-sm mt-1">
                На данный момент клиент купить нельзя. Открытый бета-тест начнётся{" "}
                <span className="text-white font-medium">27 мая (суббота)</span>. Следите за обновлениями в{" "}
                <a href="https://discord.gg/CE5Jhssp" target="_blank" className="text-blue-400 hover:text-blue-300 underline">Discord</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Выберите <span className="text-gradient">план</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Получите доступ к полному функционалу Funik Client
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border flex flex-col card-hover ${
                plan.popular
                  ? "border-blue-500/40 bg-gradient-to-b from-blue-500/10 to-transparent glow-blue-sm"
                  : plan.badge
                  ? "border-orange-500/30 bg-gradient-to-b from-orange-500/5 to-transparent"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full glow-blue-sm">
                  Лучший выбор
                </span>
              )}
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 ${plan.badgeColor} text-white text-xs font-semibold rounded-full`}>
                  {plan.badge}
                </span>
              )}

              <h3 className="text-base font-semibold mb-1">{plan.name}</h3>
              <div className="mb-5">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-1">₽{plan.period}</span>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.badge ? "bg-orange-500/10" : "bg-blue-500/10"}`}>
                      <span className={`text-xs ${plan.badge ? "text-orange-400" : "text-blue-400"}`}>✓</span>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled
                className={`w-full py-2.5 rounded-xl font-semibold text-sm cursor-not-allowed ${
                  plan.popular
                    ? "bg-blue-600/30 text-blue-300/50 border border-blue-500/20"
                    : plan.badge
                    ? "bg-orange-500/20 text-orange-300/50 border border-orange-500/20"
                    : "bg-white/5 text-gray-500 border border-white/5"
                }`}
              >
                Скоро
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
