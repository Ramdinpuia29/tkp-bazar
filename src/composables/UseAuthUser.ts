import { ref } from 'vue';
import useSupabase from 'src/boot/supabase';
import { Provider, User, UserAttributes } from '@supabase/supabase-js';

const user = ref<User | null>(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  };

  const loginWithSocialProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
    return data.url;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  };

  const update = async (userAttrib: UserAttributes) => {
    const { data, error } = await supabase.auth.updateUser(userAttrib);
    if (error) throw error;
    return data.user;
  };

  const sendPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  };

  const resetPassword = async (accessToken: string, newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return data.user;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
  };
}
