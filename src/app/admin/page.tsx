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
  email: string | null;
  username: string | null;
}

interface Key {
  id: string;
  key: string;
  plan: string;
  is_used: boolean;
  used_by: string | null;
  used_at: string | null;
  created_at: string;
  used_email: string | null;
  used_username: string | null;
}

type Tab = "users" | "keys" | "give" | "tickets";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [keys, setKeys] = useState<Key[]>([]);
  const router = useRouter();

  const [giveNick, setGiveNick] = useState("");
  const [givePlan, setGivePlan] = useState("forever");
  const [giveMessage, setGiveMessage] = useState("");

  const [genPlan, setGenPlan] = useState("forever");
  const [genCount, setGenCount] = useState(1);
  const [genMessage, setGenMessage] = useState("");

  useEffect(() => { checkAdmin(); }, []);

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
    const { data, error } = await getSupabase().rpc("get_subscriptions_with_users");
    if (data) setSubscriptions(data);
    else if (error) {
      // Fallback without user info
      const { data: d2 } = await getSupabase().from("subscriptions").select("*").order("created_at", { ascending: false });
      if (d2) setSubscriptions(d2.map(s => ({ ...s, email: null, username: null })));
    }
  };

  const loadKeys = async () => {
    const { data, error } = await getSupabase().rpc("get_keys_with_users");
    if (data) setKeys(data);
    else if (error) {
      const { data: d2 } = await getSupabase().from("keys").select("*").order("created_at", { ascending: false });
      if (d2) setKeys(d2.map(k => ({ ...k, used_email: null, used_username: null })));
    }
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
      identifier: giveNick.trim(), is_email: isEmail, sub_plan: givePlan, sub_expires_at: expiresAt,
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

  const toggleSubscription = async (id: string, current: boolean) => {
    await getSupabase().from("subscriptions").update({ is_active: !current }).eq("id", id);
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

  const planLabel = (plan: string) => plan === "forever" ? "Навсегда" : plan === "90days" ? "90 дней" : plan === "30days" ? "30 дней" : plan === "hwid_reset" ? "Сброс HWID" : plan;

  if (loading) return <div className="pt-32 min-h-screen flex items-center justify-center"><p className="text-gray-400">Загрузка...</p></div>;
  if (!isAdmin) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "users", label: `Подписки (${subscriptions.length})` },
    { id: "keys", label: `Ключи (${keys.length})` },
    { id: "give", label: "Выдать" },
    { id: "tickets", label: "Тикеты" },
  ];

  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen bg-grid">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <div className="flex gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-white/5 rounded">{subscriptions.filter(s => s.is_active).length} активных</span>
            <span className="px-2 py-1 bg-white/5 rounded">{keys.filter(k => !k.is_used).length} свободных ключей</span>
          </div>
        </div>

        <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* SUBSCRIPTIONS */}
        {activeTab === "users" && (
          <div className="space-y-3">
            {subscriptions.length === 0 && <p className="text-gray-500 text-center py-8">Нет подписок</p>}
            {subscriptions.map((sub) => (
              <div key={sub.id} className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{sub.username || "—"}</span>
                      <span className="text-gray-500 text-sm">{sub.email || sub.user_id.slice(0, 8) + "..."}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${sub.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {sub.is_active ? "Активна" : "Отключена"}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>📦 {planLabel(sub.plan)}</span>
                      <span>📅 {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString("ru-RU") : "Навсегда"}</span>
                      <span>🖥 <code className="text-xs">{sub.hwid || "Не привязан"}</code></span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{new Date(sub.activated_at).toLocaleDateString("ru-RU")}</span>
                </div>
                <div className="flex gap-2">
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

        {/* KEYS */}
        {activeTab === "keys" && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-4">Генерация ключей</h3>
              <div className="flex gap-3 items-end flex-wrap">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Тип</label>
                  <select value={genPlan} onChange={(e) => setGenPlan(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option value="forever">Навсегда</option>
                    <option value="90days">90 дней</option>
                    <option value="30days">30 дней</option>
                    <option value="hwid_reset">Сброс HWID</option>
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
                  <div className="flex items-center gap-3 flex-wrap">
                    <code className="text-sm text-white bg-white/5 px-2 py-1 rounded">{k.key}</code>
                    <span className={`text-xs px-2 py-0.5 rounded ${k.plan === "hwid_reset" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                      {planLabel(k.plan)}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${k.is_used ? "bg-gray-500/20 text-gray-400" : "bg-green-500/20 text-green-400"}`}>
                      {k.is_used ? "Использован" : "Свободен"}
                    </span>
                    {k.is_used && (k.used_username || k.used_email) && (
                      <span className="text-xs text-gray-500">
                        → {k.used_username || ""} {k.used_email ? `(${k.used_email})` : ""}
                      </span>
                    )}
                  </div>
                  {!k.is_used && (
                    <button onClick={() => deleteKey(k.id)} className="text-xs text-red-400 hover:text-red-300 ml-2">Удалить</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GIVE */}
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

        {/* TICKETS */}
        {activeTab === "tickets" && <AdminTickets />}
      </div>
    </div>
  );
}

function AdminTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  useEffect(() => { loadTickets(); }, []);

  const loadTickets = async () => {
    const { data } = await getSupabase().from("tickets").select("*").order("created_at", { ascending: false });
    if (data) setTickets(data);
  };

  const handleReply = async (id: string) => {
    const reply = replyText[id];
    if (!reply?.trim()) return;
    await getSupabase().from("tickets").update({ admin_reply: reply, status: "answered" }).eq("id", id);
    setReplyText(prev => ({ ...prev, [id]: "" }));
    loadTickets();
  };

  const closeTicket = async (id: string) => {
    await getSupabase().from("tickets").update({ status: "closed" }).eq("id", id);
    loadTickets();
  };

  return (
    <div className="space-y-4">
      {tickets.length === 0 && <p className="text-gray-500 text-center py-8">Нет тикетов</p>}
      {tickets.map((t) => (
        <div key={t.id} className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-white">{t.subject}</h3>
              <span className="text-xs text-gray-500 font-mono">{t.user_id?.slice(0, 8)}...</span>
              <span className="text-xs text-gray-600 ml-2">{new Date(t.created_at).toLocaleDateString("ru-RU")}</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs ${
              t.status === "open" ? "bg-yellow-500/20 text-yellow-400" :
              t.status === "answered" ? "bg-green-500/20 text-green-400" :
              "bg-gray-500/20 text-gray-400"
            }`}>
              {t.status === "open" ? "Открыт" : t.status === "answered" ? "Отвечен" : "Закрыт"}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-3">{t.message}</p>
          {t.admin_reply && (
            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 mb-3">
              <p className="text-gray-300 text-sm">{t.admin_reply}</p>
            </div>
          )}
          {t.status !== "closed" && (
            <div className="flex gap-2 items-end">
              <input
                type="text"
                value={replyText[t.id] || ""}
                onChange={(e) => setReplyText(prev => ({ ...prev, [t.id]: e.target.value }))}
                placeholder="Ответить..."
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
              />
              <button onClick={() => handleReply(t.id)} className="px-4 py-2 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Ответить</button>
              <button onClick={() => closeTicket(t.id)} className="px-4 py-2 text-xs bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg">Закрыть</button>
            </div>
          )}
        </div>
      ))}
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
