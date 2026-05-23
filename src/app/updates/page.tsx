const updates = [
  {
    version: "2.0.0",
    date: "23 мая 2026",
    title: "Крупное обновление",
    changes: [
      "Полный редизайн интерфейса клиента",
      "Новая система модулей",
      "Улучшена производительность на 40%",
      "Добавлена поддержка Minecraft 1.21",
      "Новый лаунчер с автообновлением",
    ],
    tag: "major",
  },
  {
    version: "1.5.0",
    date: "10 мая 2026",
    title: "Новые функции",
    changes: [
      "Добавлен KillAura с новыми настройками",
      "Улучшен ESP (больше опций отрисовки)",
      "Фикс вылетов на серверах с античитом",
      "Оптимизация использования RAM",
    ],
    tag: "feature",
  },
  {
    version: "1.4.2",
    date: "28 апреля 2026",
    title: "Багфиксы",
    changes: [
      "Исправлен краш при входе на Hypixel",
      "Фикс отображения GUI на 4K мониторах",
      "Исправлена работа AutoFish",
    ],
    tag: "fix",
  },
];

function getTagStyle(tag: string) {
  switch (tag) {
    case "major":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "feature":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "fix":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
}

function getTagLabel(tag: string) {
  switch (tag) {
    case "major": return "Мажорное";
    case "feature": return "Фичи";
    case "fix": return "Фиксы";
    default: return tag;
  }
}

export default function Updates() {
  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen bg-grid">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Обновления</span>
          </h1>
          <p className="text-gray-400">Следите за развитием Funik Client</p>
        </div>

        <div className="space-y-8">
          {updates.map((update, i) => (
            <div
              key={update.version}
              className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] card-hover"
            >
              {/* Timeline dot */}
              {i < updates.length - 1 && (
                <div className="absolute left-10 top-full w-px h-8 bg-white/5" />
              )}

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-sm font-mono text-white bg-white/5 px-3 py-1 rounded-lg">
                  v{update.version}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full border ${getTagStyle(update.tag)}`}>
                  {getTagLabel(update.tag)}
                </span>
                <span className="text-sm text-gray-500 ml-auto">{update.date}</span>
              </div>

              <h3 className="text-xl font-semibold mb-4">{update.title}</h3>

              <ul className="space-y-2.5">
                {update.changes.map((change) => (
                  <li key={change} className="text-sm text-gray-400 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
