"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Главная" },
    { href: "/products", label: "Продукты" },
    { href: "/updates", label: "Обновления" },
    { href: "/support", label: "Поддержка" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/80 backdrop-blur-2xl border-b border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">F</span>
          </div>
          <span className="text-sm font-bold text-white/90">Funik</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                pathname === link.href
                  ? "text-white bg-white/[0.05]"
                  : "text-gray-500 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/profile"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium rounded-lg transition-all duration-200 glow-blue-sm"
        >
          Профиль
        </Link>
      </div>
    </nav>
  );
}
