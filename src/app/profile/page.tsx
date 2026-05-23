"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Tab = "account" | "settings" | "launcher";

interface UserData {
  id: string;
  email: string | undefined;
  username: string | undefined;
  created_at: string | undefined;
}

interface SubscriptionData {
  plan: string;
  hwid: string | null;
  expires_at: string | null;
  is_active: boolean;
}

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notAuthed, setNotAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const router = useRouter();

  // Account tab state
  const [key, setKey] = useState("");
  const [keyMessage, setKeyMessage] = useState("");

  // Settings tab state
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      // If still loading after 5s, show auth buttons
      if (loading) {
        setLoading(false);
        setNotAuthed(true);
      }
    }, 5000);

    const getUser = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          setLoading(false);
          setNotAuthed(true);
          return;
        }
        const u = data.user;
        setUser({ id: u.id, email: u.email, username: u.user_metadata?.username, created_at: u.created_at });

        // Load subscription
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("plan, hwid, expires_at, is_active")
          .eq("user_id", u.id)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (sub) setSubscription(sub);
        setLoading(false);
      } catch {
        setLoading(false);
        setNotAuthed(true);
      }
    };
    getUser();

    return () => clearTimeout(timeout);
  }, []);

  const handleActivateKey = async () => {
    if (!key.trim()) return;
    setKeyMessage("");
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Find the key
    const { data: keyData, error: keyError } = await supabase
      .from("keys")
      .select("*")
      .eq("key", key.trim().toUpperCase())
      .eq("is_used", false)
      .single();

    if (keyError || !keyData) {
      setKeyMessage("Ключ не найден или уже использован");
      return;
    }

    // Mark key as used
    await supabase
      .from("keys")
      .update({ is_used: true, used_by: user.id, used_at: new Date().toISOString() })
      .eq("id", keyData.id);

    // Create subscription
    let expiresAt: string | null = null;
    if (keyData.plan === "90days") {
      expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
    } else if (keyData.plan === "30days") {
      expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan: keyData.plan,
      hwid: subscription?.hwid || null,
      expires_at: expiresAt,
      is_active: true,
    });

    setKeyMessage("Ключ активирован! Подписка добавлена.");
    setKey("");

    // Reload subscription
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("plan, hwid, expires_at, is_active")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (sub) setSubscription(sub);
  };

  const handleUpdateEmail = async () => {
    if (!newEmail.trim()) return;
    const { error } = await getSupabase().auth.updateUser({ email: newEmail });
    if (error) {
      setSettingsMessage(error.message);
    } else {
      setSettingsMessage("Письмо для подтверждения отправлено на новый email");
      setNewEmail("");
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      setSettingsMessage("Пароль должен быть не менее 6 символов");
      return;
    }
    const { error } = await getSupabase().auth.updateUser({ password: newPassword });
    if (error) {
      setSettingsMessage(error.message);
    } else {
      setSettingsMessage("Пароль успешно обновлён");
      setNewPassword("");
    }
  };

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Загрузка...</p>
      </div>
    );
  }

  if (notAuthed) {
    return (
      <div className="gradient-top pt-32 pb-20 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Профиль</h1>
          <p className="text-gray-400 mb-8">Войдите или зарегистрируйтесь чтобы получить доступ к профилю</p>
          <div className="flex gap-4 justify-center">
            <a
              href="/login"
              className="px-6 py-3 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Войти
            </a>
            <a
              href="/register"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-lg transition-colors"
            >
              Регистрация
            </a>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "account", label: "Аккаунт" },
    { id: "settings", label: "Настройки" },
    { id: "launcher", label: "Лаунчер" },
  ];

  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Профиль</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
          >
            Выйти
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 space-y-4">
              <div>
                <span className="text-sm text-gray-400">Ник</span>
                <p className="text-white">{user?.username || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Email</span>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Дата регистрации</span>
                <p className="text-white">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("ru-RU")
                    : "—"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-400">HWID</span>
                <p className="text-white font-mono text-sm">{subscription?.hwid || "Не привязан"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Подписка</span>
                {subscription ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">
                      {subscription.plan === "forever" ? "Навсегда" : subscription.plan === "90days" ? "90 дней" : "30 дней"}
                    </span>
                    {subscription.expires_at && (
                      <span className="text-gray-400 text-xs">
                        до {new Date(subscription.expires_at).toLocaleDateString("ru-RU")}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Нет активной подписки</p>
                )}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold mb-4">Активация ключа</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent font-mono"
                />
                <button
                  onClick={handleActivateKey}
                  className="px-6 py-2.5 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Активировать
                </button>
              </div>
              {keyMessage && (
                <p className="text-green-400 text-sm mt-2">{keyMessage}</p>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold mb-4">Сменить Email</h3>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="new@example.com"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleUpdateEmail}
                  className="px-6 py-2.5 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Обновить
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold mb-4">Сменить пароль</h3>
              <div className="flex gap-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Новый пароль"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleUpdatePassword}
                  className="px-6 py-2.5 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Обновить
                </button>
              </div>
            </div>

            {settingsMessage && (
              <p className="text-green-400 text-sm">{settingsMessage}</p>
            )}
          </div>
        )}

        {/* Launcher Tab */}
        {activeTab === "launcher" && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Системная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm text-gray-400 block mb-1">ОС</span>
                  <p className="text-white font-medium">Windows 10/11</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm text-gray-400 block mb-1">RAM</span>
                  <p className="text-white font-medium">—</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm text-gray-400 block mb-1">Видеокарта</span>
                  <p className="text-white font-medium">—</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold mb-4">Скачать лаунчер</h3>
              <p className="text-gray-400 text-sm mb-4">
                Скачайте лаунчер для автоматической установки и обновления клиента.
              </p>
              <button className="px-6 py-2.5 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
                Скачать
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
