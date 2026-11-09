import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = rawUrl ? String(rawUrl).trim() : "";
const supabaseAnonKey = rawKey ? String(rawKey).trim() : "";

// Check if Supabase keys have been provided and are not generic placeholder strings
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "YOUR_SUPABASE_URL_HERE" && 
  supabaseAnonKey !== "YOUR_SUPABASE_KEY_HERE" &&
  supabaseUrl.startsWith("http")
);

// Graceful Client Object
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
