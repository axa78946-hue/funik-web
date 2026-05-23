import Link from "next/link";

const features = [
  {
    title: "Сообщество",
    description: "Активное комьюнити из 1000+ игроков. Discord, Telegram — мы всегда на связи.",
    icon: "👥",
    gradient: "from-red-500/10 to-transparent",
  },
  {
    title: "Обновления",
    description: "Новые функции каждую неделю. Быстрая адаптация под новые версии Minecraft.",
    icon: "⚡",
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    title: "Поддержка",
    description: "Техподдержка 24/7. Решаем любые проблемы в течение часа.",
    icon: "🛡️",
    gradient: "from-purple-500/10 to-transparent",
  },
];

const stats = [
  { value: "1000+", label: "Пользователей" },
  { value: "99.9%", label: "Аптайм" },
  { value: "24/7", label: "Поддержка" },
  { value: "50+", label: "Функций" },
];

export default function Home() {
  return (
    <div className="bg-grid">
      {/* Hero */}
      <section className="gradient-top pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">Funik</span> Client
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-slide-up-delay leading-relaxed">
            Мощный Minecraft Fabric клиент с передовым функционалом, стабильной работой и активным сообществом.
          </p>

          <div className="flex gap-4 justify-center animate-slide-up-delay-2">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 glow-red hover:scale-105"
            >
              Начать
            </Link>
            <Link
              href="https://discord.gg/CE5Jhssp"
              className="px-8 py-3.5 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Discord
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Почему выбирают <span className="text-gradient">нас</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Мы создаём лучший опыт для игроков Minecraft
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`p-8 rounded-2xl border border-white/5 bg-gradient-to-b ${feature.gradient} card-hover relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/5 to-transparent rounded-bl-full" />
                <div className="text-4xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Смотрите в <span className="text-gradient">действии</span>
            </h2>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 glow-red-sm">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Funik Client"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="p-12 rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-500/10 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
              <p className="text-gray-400 mb-8">Присоединяйтесь к тысячам игроков уже сегодня</p>
              <Link
                href="/products"
                className="inline-flex px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 glow-red hover:scale-105"
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
