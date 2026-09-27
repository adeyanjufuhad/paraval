import "server-only";
import { createClient } from "@supabase/supabase-js";

// Uses the publishable key. Row-level security only allows INSERT on the
// waitlist tables, so this client can add sign-ups but never read them.
export function supabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
