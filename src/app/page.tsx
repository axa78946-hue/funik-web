import Link from "next/link";

const features = [
  {
    title: "Сообщество",
    description: "Активное комьюнити игроков и разработчиков. Мы всегда на связи.",
    icon: "👥",
  },
  {
    title: "Обновления",
    description: "Новые функции каждую неделю. Быстрая адаптация под новые версии.",
    icon: "⚡",
  },
  {
    title: "Поддержка",
    description: "Техподдержка 24/7. Решаем любые проблемы в течение часа.",
    icon: "🛡️",
  },
];

export default function Home() {
  return (
    <div className="bg-grid bg-noise">
      {/* Hero */}
      <section className="gradient-top pt-36 pb-28 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up tracking-tight">
            <span className="text-gradient">Funik</span> Client
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up-delay leading-relaxed">
            Мощный Minecraft Fabric клиент с передовым функционалом, стабильной работой и активным сообществом.
          </p>

          <div className="flex gap-4 justify-center animate-slide-up-delay-2">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 glow-blue hover:scale-[1.02]"
            >
              Начать
            </Link>
            <Link
              href="https://discord.gg/CE5Jhssp"
              target="_blank"
              className="px-8 py-3.5 glass hover:bg-white/[0.05] text-white font-semibold rounded-xl transition-all duration-300"
            >
              Discord
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/[0.03]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "99.9%", label: "Аптайм" },
              { value: "24/7", label: "Поддержка" },
              { value: "50+", label: "Функций" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Почему выбирают <span className="text-gradient">нас</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Мы создаём лучший опыт для игроков Minecraft
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl glass card-hover relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/[0.03] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-14 rounded-3xl glass relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.04] to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/[0.04] blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Готовы начать?</h2>
              <p className="text-gray-400 mb-8 text-sm">Присоединяйтесь к игрокам уже сегодня</p>
              <Link
                href="/products"
                className="inline-flex px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 glow-blue hover:scale-[1.02]"
              >
                Выбрать план
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
