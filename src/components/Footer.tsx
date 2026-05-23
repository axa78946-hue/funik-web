import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © 2024 Funik Client. Все права защищены.
        </p>
        <div className="flex gap-4">
          <Link href="/policy" className="text-gray-500 hover:text-white text-sm transition-colors">
            Политика
          </Link>
          <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
            Условия
          </Link>
        </div>
      </div>
    </footer>
  );
}
