"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Главная" },
    { href: "/products", label: "Продукты" },
    { href: "/updates", label: "Обновления" },
    { href: "/policy", label: "Политика" },
    { href: "/terms", label: "Условия" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gradient">
          Funik
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/profile"
          className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-all duration-200 glow-red-sm hover:glow-red"
        >
          Профиль
        </Link>
      </div>
    </nav>
  );
}
