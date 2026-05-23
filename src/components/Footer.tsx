import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gradient">Funik</span>
            <span className="text-gray-600 text-sm">© 2024</span>
          </div>
          <div className="flex gap-6">
            <Link href="/policy" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
              Политика
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
              Условия
            </Link>
            <Link href="/products" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
              Продукты
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
