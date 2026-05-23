export default function Policy() {
  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Политика конфиденциальности</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">1. Сбор информации</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Мы собираем информацию, которую вы предоставляете при регистрации: email адрес и данные об оборудовании (HWID) для привязки лицензии.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">2. Использование данных</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Собранные данные используются исключительно для предоставления доступа к сервису, верификации лицензии и технической поддержки.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">3. Защита данных</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Мы применяем современные методы шифрования и защиты для обеспечения безопасности ваших персональных данных.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">4. Передача третьим лицам</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Мы не передаём ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
