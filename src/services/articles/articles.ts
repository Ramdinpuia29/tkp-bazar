import { Notify } from 'quasar';
import { useArticlesStore } from 'src/stores/articlesStore';
import { CreateArticleParams } from './types';

const articlesStore = useArticlesStore();

const getArticles = async () => {
  const { data, error } = await articlesStore.getAllArticles();
  if (error) {
    Notify.create({
      message: error.message,
      type: 'negative',
    });
  }
  console.log(data);
};

const getArticle = async (id: string) => {
  const { data, error } = await articlesStore.getArticle(id);
  if (error) {
    Notify.create({
      message: error.message,
      type: 'negative',
    });
  }
  console.log(data);
};

const createNewArticle = async (articleData: CreateArticleParams) => {
  const { data, error } = await articlesStore.createNewArticle(articleData);
  if (error) {
    Notify.create({
      message: error.message,
      type: 'negative',
    });
  }
  console.log(data);
};

export { getArticles, getArticle, createNewArticle };
