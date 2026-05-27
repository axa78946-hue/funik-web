"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  admin_reply: string | null;
  created_at: string;
}

export default function Support() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) setTickets(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return;
    setSending(true);

    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("tickets").insert({
      user_id: user.id,
      subject: subject.trim(),
      message: message.trim(),
    });

    setSubject("");
    setMessage("");
    setShowForm(false);
    setSending(false);
    loadTickets();
  };

  if (loading) return <div className="pt-32 min-h-screen flex items-center justify-center"><p className="text-gray-400">Загрузка...</p></div>;

  return (
    <div className="gradient-top pt-32 pb-20 min-h-screen bg-grid">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Поддержка</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium rounded-xl transition-all glow-blue-sm"
          >
            Создать тикет
          </button>
        </div>

        {/* Create ticket form */}
        {showForm && (
          <div className="mb-8 p-6 rounded-2xl glass animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Новый тикет</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Тема</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Кратко опишите проблему"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Сообщение</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Подробно опишите вашу проблему..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
              >
                {sending ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </div>
        )}

        {/* Tickets list */}
        {tickets.length === 0 ? (
          <div className="p-8 rounded-2xl glass text-center">
            <p className="text-gray-500">У вас пока нет тикетов.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-5 rounded-2xl glass">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{ticket.subject}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(ticket.created_at).toLocaleDateString("ru-RU")} в{" "}
                      {new Date(ticket.created_at).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.status === "open" ? "bg-yellow-500/10 text-yellow-400" :
                    ticket.status === "answered" ? "bg-green-500/10 text-green-400" :
                    "bg-gray-500/10 text-gray-400"
                  }`}>
                    {ticket.status === "open" ? "Открыт" : ticket.status === "answered" ? "Отвечен" : "Закрыт"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{ticket.message}</p>
                {ticket.admin_reply && (
                  <div className="mt-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <span className="text-xs text-blue-400 font-medium">Ответ администратора:</span>
                    <p className="text-gray-300 text-sm mt-1">{ticket.admin_reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
