export default function Terms() {
  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen bg-grid">
      <div className="max-w-3xl mx-auto px-4 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">
          Условия <span className="text-gradient">использования</span>
        </h1>
        <p className="text-gray-500 mb-10">Последнее обновление: январь 2024</p>

        <div className="space-y-6">
          {[
            { title: "1. Общие положения", text: "Используя Funik Client, вы соглашаетесь с данными условиями. Сервис предоставляется «как есть» без каких-либо гарантий." },
            { title: "2. Лицензия", text: "Приобретая подписку, вы получаете неисключительную лицензию на использование клиента на одном устройстве. Передача лицензии третьим лицам запрещена." },
            { title: "3. Возврат средств", text: "Возврат средств возможен в течение 24 часов после покупки, если клиент не был активирован. После активации возврат не производится." },
            { title: "4. Ограничения", text: "Запрещено: распространение клиента, реверс-инжиниринг, использование на нескольких устройствах без дополнительной лицензии." },
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
