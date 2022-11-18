<script setup lang="ts">
import { Notify } from 'quasar';
import { CreateArticleParams } from 'src/services/articles/types';
import { useAuthStore } from 'src/stores/auth.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getArticles, getArticle, createNewArticle } from 'src/services/articles/articles';

const router = useRouter();
const loading = ref<boolean>(false);

const articles = ref([]);

const authStore = useAuthStore();

const articleData = ref<CreateArticleParams>({
  heading: '',
  content: '',
  author: '',
  author_designation: ''
});

const logoutUser = async () => {
  console.log('Logging out');
  loading.value = true;
  try {
    await authStore.logout();
    router.push({ name: 'login', replace: true });
    Notify.create({
      message: 'Logged out', type: 'positive'
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      Notify.create({
        message: error.message ?? 'Something went wrong!'
      });
    }
  } finally {
    loading.value = false;
  }
};

const articleId = ref<string>('')

</script>

<template>
  <q-page class="column justify-center items-center">
    <div class="column">
      <q-btn @click="getArticles">Get Articles</q-btn>
      <q-input v-model="articleId" type="text" label="Article Id" />
      <q-btn @click="getArticle(articleId)">Get Article</q-btn>
      <q-btn @click="logoutUser" flat class="bg-primary text-white">Logout</q-btn>
    </div>
    <q-card class="q-ma-md">
      <q-card-section> Add new article </q-card-section>
      <q-card-section>
        <form @submit.prevent="createNewArticle(articleData)">
          <q-input type="text" label="Heading" v-model="articleData.heading" />
          <q-input type="text" label="Content" v-model="articleData.content" />
          <q-input type="text" label="Author" v-model="articleData.author" />
          <q-input type="text" label="Author Designation" v-model="articleData.author_designation" />
          <q-btn type="submit">Create Article</q-btn>
        </form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

