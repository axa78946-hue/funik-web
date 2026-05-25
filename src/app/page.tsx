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
      <section className="gradient-top pt-40 pb-32 relative overflow-hidden">
        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
        </div>

        {/* Animated orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/[0.05] blur-[100px] glow-orb" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/[0.04] blur-[80px] glow-orb" style={{animationDelay: "2s"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/[0.03] blur-[120px] glow-orb" style={{animationDelay: "1s"}} />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-in mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-gray-300">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Открытый бета-тест скоро
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-slide-up tracking-tighter leading-[0.9]">
            <span className="text-gradient">Funik</span>
            <br />
            <span className="text-white/90">Client</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400/80 mb-14 max-w-xl mx-auto animate-slide-up-delay leading-relaxed font-light">
            Мощный Minecraft Fabric клиент нового поколения
          </p>

          <div className="flex gap-4 justify-center animate-slide-up-delay-2">
            <Link
              href="/products"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all duration-300 glow-blue hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
            >
              Начать →
            </Link>
            <Link
              href="https://discord.gg/CE5Jhssp"
              target="_blank"
              className="px-8 py-4 glass hover:bg-white/[0.06] text-white/80 hover:text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              Discord
            </Link>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "99.9%", label: "Аптайм" },
              { value: "24/7", label: "Поддержка" },
              { value: "50+", label: "Функций" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">{stat.value}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

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
