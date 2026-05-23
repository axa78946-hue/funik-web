export default function Terms() {
  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Условия использования</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Используя Funik Client, вы соглашаетесь с данными условиями. Сервис предоставляется «как есть» без каких-либо гарантий.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">2. Лицензия</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Приобретая подписку, вы получаете неисключительную лицензию на использование клиента на одном устройстве. Передача лицензии третьим лицам запрещена.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">3. Возврат средств</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Возврат средств возможен в течение 24 часов после покупки, если клиент не был активирован. После активации возврат не производится.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">4. Ограничения</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Запрещено: распространение клиента, реверс-инжиниринг, использование на нескольких устройствах без дополнительной лицензии.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
