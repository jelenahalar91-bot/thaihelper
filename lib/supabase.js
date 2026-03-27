import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'YOUR_SUPABASE_URL';
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase  = createClient(supabaseUrl, supabaseKey);

// Demo mode: true solange Supabase noch nicht verbunden ist
export const DEMO_MODE = supabaseUrl === 'YOUR_SUPABASE_URL';
