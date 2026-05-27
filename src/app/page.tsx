import Link from "next/link";

const reviews = [
  { name: "DarkPlayer", text: "Лучший чит на рынке. Работает стабильно, обходит все античиты.", stars: 5 },
  { name: "xNightFox", text: "Пользуюсь уже месяц, ни одного бана. Поддержка отвечает моментально.", stars: 5 },
  { name: "ProGamer228", text: "Купил навсегда — не пожалел. Обновления каждую неделю.", stars: 5 },
  { name: "ShadowMC", text: "Очень плавный, не лагает даже на слабом ПК. Рекомендую.", stars: 5 },
  { name: "CraftMaster", text: "Перешёл с другого клиента — небо и земля. Funik топ.", stars: 5 },
  { name: "NetherKing", text: "Отличный функционал, особенно KillAura и ESP. Всё настраивается.", stars: 4 },
];

export default function Home() {
  return (
    <div className="bg-[#050508]">
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/[0.03] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/[0.02] blur-[100px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 py-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight italic">
                Раскрой Свой<br/>
                <span className="text-gradient">Потенциал</span>
              </h1>
              <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                Идеальное программное решение для продвинутых игроков. Испытайте производительность как никогда прежде.
              </p>
              <Link
                href="/products"
                className="inline-flex px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium rounded-full transition-all duration-300"
              >
                Начать
              </Link>
            </div>
            {/* Logo F with rings */}
            <div className="hidden md:flex h-[500px] items-center justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Glow */}
                <div className="absolute inset-[-40px] rounded-full bg-indigo-500/[0.06] blur-[70px] animate-pulse" />
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-white/[0.06] animate-[spin_25s_linear_infinite]" />
                {/* Inner ring */}
                <div className="absolute inset-6 rounded-full border border-blue-500/10 animate-[spin_18s_linear_infinite_reverse]" />
                {/* F letter */}
                <span className="relative text-[100px] font-black select-none" style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(99,102,241,0.4))",
                  fontFamily: "Segoe UI, sans-serif",
                }}>
                  F
                </span>
                {/* Orbiting dot */}
                <div className="absolute inset-0 animate-[spin_6s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-gray-500 text-sm">Метрики</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Масштаб и Надёжность</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { value: "99.9%", label: "Аптайм", desc: "Стабильная работа" },
              { value: "24/7", label: "Поддержка", desc: "Всегда на связи" },
              { value: "50+", label: "Функций", desc: "И растёт каждую неделю" },
            ].map((stat) => (
              <div key={stat.label} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-blue-500/20 transition-all duration-500 group hover:shadow-[0_0_60px_rgba(59,130,246,0.05)] hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{stat.value}</p>
                <p className="text-white font-medium text-sm">{stat.label}</p>
                <p className="text-gray-600 text-xs mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-gray-500 text-sm">Сообщество</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Доверие Игроков</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.name} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.1] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-[10px]">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-gray-500 text-sm">Витрина</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Визуальный Опыт</h2>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-black">
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
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Готовы начать?</h2>
          <p className="text-gray-500 mb-8">Присоединяйтесь к тысячам игроков</p>
          <Link
            href="/products"
            className="inline-flex px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium rounded-full transition-all duration-300"
          >
            Выбрать план
          </Link>
        </div>
      </section>
    </div>
  );
}
