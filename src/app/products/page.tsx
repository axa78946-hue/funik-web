const plans = [
  {
    name: "Навсегда",
    price: "699",
    period: "навсегда",
    features: ["Полный доступ", "Все обновления", "Приоритетная поддержка", "Без ограничений по времени"],
    popular: true,
  },
  {
    name: "90 дней",
    price: "499",
    period: "90 дней",
    features: ["Полный доступ", "Все обновления", "Поддержка в Discord"],
    popular: false,
  },
  {
    name: "30 дней",
    price: "349",
    period: "30 дней",
    features: ["Полный доступ", "Все обновления", "Поддержка в Discord"],
    popular: false,
  },
  {
    name: "Сброс HWID",
    price: "349",
    period: "разово",
    features: ["Сброс привязки оборудования", "Моментальная активация"],
    popular: false,
  },
];

export default function Products() {
  return (
    <div className="gradient-top pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Тарифы</h1>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Выберите подходящий план и получите доступ к Funik Client
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-xl border ${
                plan.popular
                  ? "border-accent bg-accent/5"
                  : "border-white/10 bg-white/5"
              } flex flex-col`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                  Популярный
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-400 ml-1">RUB</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{plan.period}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  plan.popular
                    ? "bg-accent hover:bg-red-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                Купить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
