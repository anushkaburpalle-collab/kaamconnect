import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve public environment variables configured in .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Helper boolean to check whether real credentials have been supplied
export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http')
);

// Export the Supabase client instance safely.
// If .env.local has blank placeholders, supabase will be null to prevent startup crashes.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.info(
    '[KaamConnect] Supabase keys are currently empty in .env.local. The app is running smoothly using mock data until you add your credentials.'
  );
}
