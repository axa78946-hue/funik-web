import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.03] py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-[9px] font-black">F</span>
            </div>
            <span className="text-gray-600 text-sm">© 2026 Funik Client</span>
          </div>
          <div className="flex gap-6">
            <Link href="/policy" className="text-gray-600 hover:text-white text-sm transition-colors duration-200">Политика</Link>
            <Link href="/terms" className="text-gray-600 hover:text-white text-sm transition-colors duration-200">Условия</Link>
            <a href="https://discord.gg/CE5Jhssp" target="_blank" className="text-gray-600 hover:text-white text-sm transition-colors duration-200">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
