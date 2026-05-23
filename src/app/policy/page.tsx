export default function Policy() {
  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen bg-grid">
      <div className="max-w-3xl mx-auto px-4 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">
          Политика <span className="text-gradient">конфиденциальности</span>
        </h1>
        <p className="text-gray-500 mb-10">Последнее обновление: 23 мая 2026</p>

        <div className="space-y-6">
          {[
            { title: "1. Сбор информации", text: "Мы собираем информацию, которую вы предоставляете при регистрации: email адрес и данные об оборудовании (HWID) для привязки лицензии." },
            { title: "2. Использование данных", text: "Собранные данные используются исключительно для предоставления доступа к сервису, верификации лицензии и технической поддержки." },
            { title: "3. Защита данных", text: "Мы применяем современные методы шифрования и защиты для обеспечения безопасности ваших персональных данных." },
            { title: "4. Передача третьим лицам", text: "Мы не передаём ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством." },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] card-hover">
              <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
