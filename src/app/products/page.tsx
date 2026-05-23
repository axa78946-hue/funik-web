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

export default function Products() {
  return (
    <div className="gradient-top pt-32 pb-20 bg-grid min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Announcement Banner */}
        <div className="mb-12 p-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-white font-semibold">Покупка временно недоступна</p>
              <p className="text-gray-400 text-sm mt-1">
                На данный момент клиент купить нельзя. Открытый бета-тест начнётся <span className="text-white font-medium">27 мая (суббота)</span>. Следите за обновлениями в Discord.
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
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
                disabled
                className="w-full py-3 rounded-xl font-semibold text-sm bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
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
