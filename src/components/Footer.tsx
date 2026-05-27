import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-[10px] font-black">F</span>
              </div>
              <span className="text-white font-semibold">Funik</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Лучший клиент для продвинутых игроков. Бескомпромиссная производительность и безопасность.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-white text-sm font-medium mb-3">Навигация</p>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-gray-600 hover:text-white text-sm transition-colors">Главная</Link>
                <Link href="/products" className="text-gray-600 hover:text-white text-sm transition-colors">Продукты</Link>
                <Link href="/support" className="text-gray-600 hover:text-white text-sm transition-colors">Поддержка</Link>
              </div>
            </div>
            <div>
              <p className="text-white text-sm font-medium mb-3">Правовое</p>
              <div className="flex flex-col gap-2">
                <Link href="/policy" className="text-gray-600 hover:text-white text-sm transition-colors">Политика</Link>
                <Link href="/terms" className="text-gray-600 hover:text-white text-sm transition-colors">Условия</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-8 border-t border-white/[0.04]">
          <p className="text-gray-700 text-xs">© 2026 Funik. Все права защищены.</p>
          <div className="flex gap-3">
            <a href="https://discord.gg/CE5Jhssp" target="_blank" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <span className="text-gray-500 text-xs">DC</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
