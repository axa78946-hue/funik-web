"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  hwid: string | null;
  activated_at: string;
  expires_at: string | null;
  is_active: boolean;
  user_email?: string;
}

interface Key {
  id: string;
  key: string;
  plan: string;
  is_used: boolean;
  used_by: string | null;
  used_at: string | null;
  created_at: string;
}

type Tab = "subscriptions" | "keys" | "give";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("subscriptions");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [keys, setKeys] = useState<Key[]>([]);
  const router = useRouter();

  // Give subscription form
  const [giveEmail, setGiveEmail] = useState("");
  const [givePlan, setGivePlan] = useState("forever");
  const [giveMessage, setGiveMessage] = useState("");

  // Generate keys form
  const [genPlan, setGenPlan] = useState("forever");
  const [genCount, setGenCount] = useState(1);
  const [genMessage, setGenMessage] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .single();

    if (!data) {
      router.push("/");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
    loadSubscriptions();
    loadKeys();
  };

  const loadSubscriptions = async () => {
    const { data } = await getSupabase()
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubscriptions(data);
  };

  const loadKeys = async () => {
    const { data } = await getSupabase()
      .from("keys")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setKeys(data);
  };

  const handleGiveSubscription = async () => {
    setGiveMessage("");
    const supabase = getSupabase();

    // Find user by email
    const { data: users } = await supabase
      .from("auth.users")
      .select("id")
      .eq("email", giveEmail)
      .single();

    // Alternative: use admin API or RPC
    // For now, we'll create subscription with email lookup via RPC
    let expiresAt: string | null = null;
    if (givePlan === "90days") {
      expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
    } else if (givePlan === "30days") {
      expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    // Use RPC function to give subscription by email
    const { error } = await supabase.rpc("give_subscription", {
      target_email: giveEmail,
      sub_plan: givePlan,
      sub_expires_at: expiresAt,
    });

    if (error) {
      setGiveMessage("Ошибка: " + error.message);
    } else {
      setGiveMessage("Подписка выдана!");
      setGiveEmail("");
      loadSubscriptions();
    }
  };

  const handleGenerateKeys = async () => {
    setGenMessage("");
    const supabase = getSupabase();

    const newKeys = [];
    for (let i = 0; i < genCount; i++) {
      const key = generateKey();
      newKeys.push({ key, plan: genPlan, is_used: false });
    }

    const { error } = await supabase.from("keys").insert(newKeys);

    if (error) {
      setGenMessage("Ошибка: " + error.message);
    } else {
      setGenMessage(`Сгенерировано ${genCount} ключей!`);
      loadKeys();
    }
  };

  const toggleSubscription = async (id: string, currentState: boolean) => {
    await getSupabase()
      .from("subscriptions")
      .update({ is_active: !currentState })
      .eq("id", id);
    loadSubscriptions();
  };

  const deleteKey = async (id: string) => {
    await getSupabase().from("keys").delete().eq("id", id);
    loadKeys();
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Загрузка...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "subscriptions", label: "Подписки" },
    { id: "keys", label: "Ключи" },
    { id: "give", label: "Выдать" },
  ];

  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Админ-панель</h1>

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

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">User ID</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">План</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">HWID</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Истекает</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Статус</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-white/5">
                      <td className="py-3 px-2 font-mono text-xs">{sub.user_id.slice(0, 8)}...</td>
                      <td className="py-3 px-2">{sub.plan}</td>
                      <td className="py-3 px-2 font-mono text-xs">{sub.hwid || "—"}</td>
                      <td className="py-3 px-2">
                        {sub.expires_at
                          ? new Date(sub.expires_at).toLocaleDateString("ru-RU")
                          : "Навсегда"}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${sub.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {sub.is_active ? "Активна" : "Отключена"}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => toggleSubscription(sub.id, sub.is_active)}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          {sub.is_active ? "Отключить" : "Включить"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {subscriptions.length === 0 && (
                <p className="text-gray-500 text-center py-8">Нет подписок</p>
              )}
            </div>
          </div>
        )}

        {/* Keys Tab */}
        {activeTab === "keys" && (
          <div className="space-y-6">
            {/* Generate keys */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold mb-4">Генерация ключей</h3>
              <div className="flex gap-3 items-end flex-wrap">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">План</label>
                  <select
                    value={genPlan}
                    onChange={(e) => setGenPlan(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  >
                    <option value="forever">Навсегда</option>
                    <option value="90days">90 дней</option>
                    <option value="30days">30 дней</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Количество</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={genCount}
                    onChange={(e) => setGenCount(Number(e.target.value))}
                    className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <button
                  onClick={handleGenerateKeys}
                  className="px-6 py-2 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Сгенерировать
                </button>
              </div>
              {genMessage && <p className="text-green-400 text-sm mt-2">{genMessage}</p>}
            </div>

            {/* Keys list */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Ключ</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">План</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Статус</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((k) => (
                    <tr key={k.id} className="border-b border-white/5">
                      <td className="py-3 px-2 font-mono text-xs">{k.key}</td>
                      <td className="py-3 px-2">{k.plan}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${k.is_used ? "bg-gray-500/20 text-gray-400" : "bg-green-500/20 text-green-400"}`}>
                          {k.is_used ? "Использован" : "Свободен"}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        {!k.is_used && (
                          <button
                            onClick={() => deleteKey(k.id)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            Удалить
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {keys.length === 0 && (
                <p className="text-gray-500 text-center py-8">Нет ключей</p>
              )}
            </div>
          </div>
        )}

        {/* Give Subscription Tab */}
        {activeTab === "give" && (
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold mb-4">Выдать подписку пользователю</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email пользователя</label>
                <input
                  type="email"
                  value={giveEmail}
                  onChange={(e) => setGiveEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">План</label>
                <select
                  value={givePlan}
                  onChange={(e) => setGivePlan(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
                >
                  <option value="forever">Навсегда</option>
                  <option value="90days">90 дней</option>
                  <option value="30days">30 дней</option>
                </select>
              </div>
              <button
                onClick={handleGiveSubscription}
                className="px-6 py-2.5 bg-accent hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Выдать
              </button>
              {giveMessage && (
                <p className={`text-sm ${giveMessage.startsWith("Ошибка") ? "text-red-400" : "text-green-400"}`}>
                  {giveMessage}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = 4;
  const segmentLength = 4;
  const parts: string[] = [];
  for (let i = 0; i < segments; i++) {
    let part = "";
    for (let j = 0; j < segmentLength; j++) {
      part += chars[Math.floor(Math.random() * chars.length)];
    }
    parts.push(part);
  }
  return parts.join("-");
}
