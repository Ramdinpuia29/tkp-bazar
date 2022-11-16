import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { firebaseAuth } from 'src/boot/firebase';
import { AuthErrors } from 'src/utils/helpers/AuthErrors';
import { AuthState } from 'src/utils/types/auth.type';

type actionsInterface = {
  registerUser: (email: string, password: string) => Promise<void>;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

type gettersInterface = {
  test: () => void;
};

export const useAuthStore = defineStore<
  string,
  AuthState,
  gettersInterface,
  actionsInterface
>('auth', {
  state: () => ({
    authUser: null,
  }),
  actions: {
    async registerUser(email: string, password: string) {
      return await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      ).then((userCredential) => {
        console.log('Created User with Email and Password');

        this.authUser = userCredential.user;
      });
    },

    async loginWithCredentials(email: string, password: string) {
      return await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      ).then((userCredential) => {
        console.log('Logged in User with Email and Password');
        this.authUser = userCredential.user;
      });
    },

    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(firebaseAuth, provider)
        .then((res) => {
          console.log('Login with Google');
          this.authUser = res.user;
        })
        .catch((err) => {
          console.log(err);
          Notify.create({
            message: AuthErrors[err.code] ?? 'Something went wrong!',
          });
        });
    },

    async logout() {
      await firebaseAuth.signOut();
      console.log('Logged out');
    },
  },
});
