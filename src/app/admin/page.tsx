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

type Tab = "users" | "keys" | "give";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [keys, setKeys] = useState<Key[]>([]);
  const router = useRouter();

  // Give subscription form
  const [giveNick, setGiveNick] = useState("");
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
    if (!user) { router.push("/login"); return; }

    const { data } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
    if (!data) { router.push("/"); return; }

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
    if (!giveNick.trim()) { setGiveMessage("Введите ник или email"); return; }

    const supabase = getSupabase();
    let expiresAt: string | null = null;
    if (givePlan === "90days") expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
    else if (givePlan === "30days") expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const isEmail = giveNick.includes("@");
    const { error } = await supabase.rpc("give_subscription_by_identifier", {
      identifier: giveNick.trim(),
      is_email: isEmail,
      sub_plan: givePlan,
      sub_expires_at: expiresAt,
    });

    if (error) setGiveMessage("Ошибка: " + error.message);
    else { setGiveMessage("Подписка выдана!"); setGiveNick(""); loadSubscriptions(); }
  };

  const handleGenerateKeys = async () => {
    setGenMessage("");
    const supabase = getSupabase();
    const newKeys = [];
    for (let i = 0; i < genCount; i++) {
      newKeys.push({ key: generateKey(), plan: genPlan, is_used: false });
    }
    const { error } = await supabase.from("keys").insert(newKeys);
    if (error) setGenMessage("Ошибка: " + error.message);
    else { setGenMessage(`Сгенерировано ${genCount} ключей!`); loadKeys(); }
  };

  const toggleSubscription = async (id: string, currentState: boolean) => {
    await getSupabase().from("subscriptions").update({ is_active: !currentState }).eq("id", id);
    loadSubscriptions();
  };

  const resetHwid = async (id: string) => {
    await getSupabase().from("subscriptions").update({ hwid: null }).eq("id", id);
    loadSubscriptions();
  };

  const deleteSubscription = async (id: string) => {
    if (!confirm("Удалить подписку?")) return;
    await getSupabase().from("subscriptions").delete().eq("id", id);
    loadSubscriptions();
  };

  const deleteKey = async (id: string) => {
    await getSupabase().from("keys").delete().eq("id", id);
    loadKeys();
  };

  if (loading) return <div className="pt-32 min-h-screen flex items-center justify-center"><p className="text-gray-400">Загрузка...</p></div>;
  if (!isAdmin) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "users", label: "Подписки" },
    { id: "keys", label: "Ключи" },
    { id: "give", label: "Выдать" },
  ];

  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen bg-grid">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Админ-панель</h1>

        <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* SUBSCRIPTIONS TAB */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {subscriptions.length === 0 && <p className="text-gray-500 text-center py-8">Нет подписок</p>}
            {subscriptions.map((sub) => (
              <div key={sub.id} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-mono text-gray-400">ID: {sub.user_id.slice(0, 12)}...</span>
                    <span className={`ml-3 px-2 py-0.5 rounded text-xs ${sub.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {sub.is_active ? "Активна" : "Отключена"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(sub.activated_at).toLocaleDateString("ru-RU")}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500 text-xs">План</span>
                    <p className="text-white font-medium">
                      {sub.plan === "forever" ? "Навсегда" : sub.plan === "90days" ? "90 дней" : "30 дней"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">Истекает</span>
                    <p className="text-white">
                      {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString("ru-RU") : "Никогда"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">HWID</span>
                    <p className="text-gray-400 font-mono text-xs truncate max-w-[150px]">
                      {sub.hwid || "Не привязан"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => toggleSubscription(sub.id, sub.is_active)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                    {sub.is_active ? "Отключить" : "Включить"}
                  </button>
                  <button onClick={() => resetHwid(sub.id)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors">
                    Сбросить HWID
                  </button>
                  <button onClick={() => deleteSubscription(sub.id)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KEYS TAB */}
        {activeTab === "keys" && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-4">Генерация ключей</h3>
              <div className="flex gap-3 items-end flex-wrap">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">План</label>
                  <select value={genPlan} onChange={(e) => setGenPlan(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option value="forever">Навсегда</option>
                    <option value="90days">90 дней</option>
                    <option value="30days">30 дней</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Кол-во</label>
                  <input type="number" min={1} max={50} value={genCount} onChange={(e) => setGenCount(Number(e.target.value))}
                    className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"/>
                </div>
                <button onClick={handleGenerateKeys}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                  Сгенерировать
                </button>
              </div>
              {genMessage && <p className="text-green-400 text-sm mt-2">{genMessage}</p>}
            </div>

            <div className="space-y-2">
              {keys.length === 0 && <p className="text-gray-500 text-center py-8">Нет ключей</p>}
              {keys.map((k) => (
                <div key={k.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <code className="text-sm text-white bg-white/5 px-2 py-1 rounded">{k.key}</code>
                    <span className="text-xs text-gray-500">
                      {k.plan === "forever" ? "Навсегда" : k.plan === "90days" ? "90 дн" : "30 дн"}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${k.is_used ? "bg-gray-500/20 text-gray-400" : "bg-green-500/20 text-green-400"}`}>
                      {k.is_used ? "Использован" : "Свободен"}
                    </span>
                  </div>
                  {!k.is_used && (
                    <button onClick={() => deleteKey(k.id)} className="text-xs text-red-400 hover:text-red-300">Удалить</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GIVE TAB */}
        {activeTab === "give" && (
          <div className="max-w-md">
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-4">Выдать подписку</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Ник или Email</label>
                  <input type="text" value={giveNick} onChange={(e) => setGiveNick(e.target.value)}
                    placeholder="gnezov или user@mail.com"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">План</label>
                  <select value={givePlan} onChange={(e) => setGivePlan(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option value="forever">Навсегда</option>
                    <option value="90days">90 дней</option>
                    <option value="30days">30 дней</option>
                  </select>
                </div>
                <button onClick={handleGiveSubscription}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
                  Выдать
                </button>
                {giveMessage && (
                  <p className={`text-sm ${giveMessage.startsWith("Ошибка") ? "text-red-400" : "text-green-400"}`}>{giveMessage}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const parts: string[] = [];
  for (let i = 0; i < 4; i++) {
    let part = "";
    for (let j = 0; j < 4; j++) part += chars[Math.floor(Math.random() * chars.length)];
    parts.push(part);
  }
  return parts.join("-");
}
