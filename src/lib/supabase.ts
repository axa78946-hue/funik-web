import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      "https://llxnnwsgatqzgxwfqcky.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseG5ud3NnYXRxemd4d2ZxY2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU5ODMsImV4cCI6MjA5NTEwMTk4M30.Syhy8oVzd-TA7BoEnpapYQ0Z_EVvIbJWVOFQg-TNkUU"
    );
  }
  return _supabase;
}
