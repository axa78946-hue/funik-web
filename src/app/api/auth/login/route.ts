import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  "https://llxnnwsgatqzgxwfqcky.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseG5ud3NnYXRxemd4d2ZxY2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU5ODMsImV4cCI6MjA5NTEwMTk4M30.Syhy8oVzd-TA7BoEnpapYQ0Z_EVvIbJWVOFQg-TNkUU"
);

export async function POST(req: NextRequest) {
  try {
    const { email, password, hwid } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const userId = authData.user.id;

    // Check subscription
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!sub) {
      return NextResponse.json({ error: "No active subscription" }, { status: 403 });
    }

    // Check expiry
    if (sub.expires_at && new Date(sub.expires_at) < new Date()) {
      return NextResponse.json({ error: "Subscription expired" }, { status: 403 });
    }

    // Bind HWID if not bound yet
    if (!sub.hwid && hwid) {
      await supabase
        .from("subscriptions")
        .update({ hwid })
        .eq("id", sub.id);
      sub.hwid = hwid;
    }

    // Check HWID match
    if (sub.hwid && hwid && sub.hwid !== hwid) {
      return NextResponse.json({ error: "HWID mismatch" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: authData.user.email,
        username: authData.user.user_metadata?.username,
      },
      subscription: {
        plan: sub.plan,
        hwid: sub.hwid,
        expires_at: sub.expires_at,
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
