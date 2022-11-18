import { createClient } from '@supabase/supabase-js';
import useAuthUser from 'src/composables/UseAuthUser';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from 'src/utils/environment';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
