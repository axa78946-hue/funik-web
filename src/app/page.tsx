import Link from "next/link";

const features = [
  {
    title: "Сообщество",
    description: "Активное комьюнити игроков и разработчиков, готовых помочь в любой момент.",
    icon: "👥",
  },
  {
    title: "Обновления",
    description: "Регулярные обновления с новыми функциями и исправлениями багов.",
    icon: "🔄",
  },
  {
    title: "Поддержка",
    description: "Быстрая техническая поддержка 24/7 через Discord и Telegram.",
    icon: "💬",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-top pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Funik Client
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Лучший Minecraft Fabric клиент с широким функционалом, стабильной работой и активным сообществом.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Начать
            </Link>
            <Link
              href="https://discord.gg/"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-lg transition-colors"
            >
              Связаться
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Смотрите в действии
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
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
    </div>
  );
}
