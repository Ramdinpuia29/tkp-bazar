<script setup lang="ts">
import { FirebaseError } from '@firebase/util';
import { Notify } from 'quasar';
import { useAuthStore } from 'src/stores/auth.store';
import { AuthErrors } from 'src/utils/helpers/AuthErrors';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const loading = ref<boolean>(false);
const isPassword = ref<boolean>(true);

const authStore = useAuthStore();
const router = useRouter();

const loginForm = reactive({ email: '', password: '' });

const loginWithGoogle = async () => {
  loading.value = true;
  console.log('Logging in with Google');
  try {
    await authStore.loginWithGoogle();
    router.push({ name: 'feed', replace: true });
    Notify.create({ message: 'Logged in with Google', type: 'positive' });
  } catch (error) {
    console.log(error);
    if (error instanceof FirebaseError) {
      Notify.create({
        message: 'Error logging in with Google', type: 'negative'
      });
    }
  } finally {
    loading.value = false;
  }
};

const loginWithCredentials = async () => {
  console.log('Logging in with credentials');
  loading.value = true;
  try {
    await authStore.loginWithCredentials(loginForm.email, loginForm.password);
    router.push({ name: 'feed', replace: true });
    Notify.create({ message: 'Logged in with successfully', type: 'positive' });
  } catch (error) {
    console.log(error);
    if (error instanceof FirebaseError) {
      Notify.create({
        message: AuthErrors[error.code] ?? 'Something went wrong!', type: 'negative'
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-page class="flex justify-center items-center full-width">
    <div>
      <q-card class="shadow-5" style="border-radius: 1em;">
        <q-card-section>
          <span class="text-h4 text-primary q-mx-md">Login</span>
          <q-separator class="q-ma-md" color="primary" />
          <form @submit.prevent="loginWithCredentials">
            <q-input class="q-my-md q-px-md" v-model="loginForm.email" label="Email">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-at" color="primary" />
              </template>
            </q-input>
            <q-input class="q-my-md q-px-md" v-model="loginForm.password" label="Password"
              :type="isPassword ? 'password' : 'text'">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-btn flat size="sm" round :icon="isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                  class="cursor-pointer text-primary" @click="isPassword = !isPassword" />
              </template>
            </q-input>
            <q-card-actions align="center">
              <q-btn class="q-pa-md bg-primary text-white full-width" type="submit" size="md"
                style="border-radius: 0.5em;">Login</q-btn>
              <div class="flex justify-center q-ma-md">
                <span class="text-subtitle1 text-center">OR</span>
              </div>
              <q-btn @click="loginWithGoogle" class="q-pa-md full-width bg-primary text-white"
                icon-right="fa-brands fa-google" size="md" style="border-radius: 0.5em;">
                <span class="q-mx-md">Sign in with Google</span>
              </q-btn>
            </q-card-actions>
          </form>
          <div class="flex flex-center q-mt-md">
            <span class="text-center">Don&apos;t have account?<a href="#/auth/register"
                class="cursor-pointer text-primary text-bold" style="text-decoration: none;"> Register </a></span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

