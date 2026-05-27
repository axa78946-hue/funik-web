"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Главная" },
    { href: "/products", label: "Продукты" },
    { href: "/support", label: "Поддержка" },
    { href: "/updates", label: "Обновления" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white text-[10px] font-black">F</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 text-[13px] transition-all duration-200 ${
                pathname === link.href
                  ? "text-white font-medium"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/profile"
          className="px-4 py-1.5 bg-white text-black text-[13px] font-medium rounded-full hover:bg-gray-200 transition-all duration-200"
        >
          Профиль
        </Link>
      </div>
    </nav>
  );
}
