import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exkvfszpjacjlssisxiu.supabase.co';
// IMPORTANT: Replace with your actual Supabase Anon Key
// It's highly recommended to use an environment variable for this
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_PLACEHOLDER';

if (supabaseUrl === 'YOUR_SUPABASE_URL_PLACEHOLDER' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY_PLACEHOLDER') {
  console.warn(
    `Supabase URL or Anon Key is using a placeholder or the default URL was not replaced. 
    Please update src/lib/supabaseClient.js with your actual Supabase credentials. 
    For production, use environment variables (e.g., .env file and import.meta.env.VITE_SUPABASE_ANON_KEY for Vite).`
  );
} else if (supabaseUrl === 'https://exkvfszpjacjlssisxiu.supabase.co' && supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY_PLACEHOLDER') {
  console.warn(
    `Supabase Anon Key is using a placeholder. 
    Please update src/lib/supabaseClient.js with your actual Supabase Anon Key. 
    For production, use an environment variable (e.g., .env file and import.meta.env.VITE_SUPABASE_ANON_KEY for Vite).`
  );
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey);