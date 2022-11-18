import supabase from 'src/boot/supabase';
import { defineStore } from 'pinia';
import { CreateArticleParams } from 'src/services/articles/types';

export const useArticlesStore = defineStore('articles', {
  actions: {
    async getAllArticles() {
      return await supabase.from('articles').select();
    },
    async getArticle(id: string) {
      return await supabase.from('articles').select().eq('id', id).single();
    },
    async createNewArticle(articleData: CreateArticleParams) {
      return await supabase.from('articles').insert(articleData).select();
    },
  },
});
