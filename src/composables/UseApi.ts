import useSupabase from 'src/boot/supabase';
import UseAuthUser from 'src/composables/UseAuthUser';
import { v4 as uuidv4 } from 'uuid';

export default function useApi() {
  const { supabase } = useSupabase();
  const { user } = UseAuthUser();

  const findAll = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data;
  };

  const findById = async (table: string, id: string) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id);
    if (error) throw error;
    return data[0];
  };

  const post = async (table: string, form: Record<string, unknown>) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form,
        user_id: user.value?.id,
      },
    ]);
    if (error) throw error;
    return data[0];
  };

  const update = async (table: string, form: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        ...form,
      })
      .match({ id: form.id });
    if (error) throw error;
    return data[0];
  };

  const remove = async (table: string, id: string) => {
    const { data, error } = await supabase.from(table).delete().match({ id });
    if (error) throw error;
    return data[0];
  };

  /**
   *
   */

  const uploadImg = async (
    file:
      | ArrayBuffer
      | ArrayBufferView
      | Blob
      | Buffer
      | File
      | FormData
      | NodeJS.ReadableStream
      | ReadableStream<Uint8Array>
      | URLSearchParams
      | string,
    storage: string
  ) => {
    const fileName = uuidv4();
    const { error } = await supabase.storage
      .from(storage)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    const publicUrl = await getPublicUrl(fileName, storage);
    if (error) throw error;
    return publicUrl;
  };

  /**
   *
   */

  const getPublicUrl = async (fileName: string, storage: string) => {
    const { data } = supabase.storage.from(storage).getPublicUrl(fileName);
    return data.publicUrl;
  };

  return {
    findAll,
    findById,
    post,
    update,
    remove,
    uploadImg,
  };
}
