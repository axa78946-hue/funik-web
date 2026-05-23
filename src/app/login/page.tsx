"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/profile");
    }
    setLoading(false);
  };

  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen bg-grid">
      <div className="max-w-md mx-auto px-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Вход</h1>
          <p className="text-gray-500 text-sm">Войдите в свой аккаунт Funik</p>
        </div>

        <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-200 glow-red-sm hover:glow-red"
            >
              {loading ? "Загрузка..." : "Войти"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-500 text-sm">
            Нет аккаунта?{" "}
            <Link href="/register" className="text-red-400 hover:text-red-300 transition-colors">
              Зарегистрироваться
            </Link>
          </p>
          <p>
            <Link href="/reset-password" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Забыли пароль?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
