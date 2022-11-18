import { createClient } from '@supabase/supabase-js';
import { Database } from 'src/lib/database.types';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from 'src/utils/environment';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
