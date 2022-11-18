import { route } from 'quasar/wrappers';
import { firebaseAuth } from 'src/boot/firebase';
import { useAuthStore } from 'src/stores/auth.store';
import { AuthUser } from 'src/utils/types/auth.type';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const authUser = await getAuthUser();

    console.log({ authUser });

    useAuthStore().$patch({ authUser });

    const requireAuth = to.meta.requireAuth;
    if (requireAuth && !(await getAuthUser())) {
      next('/auth/login');
    } else if (
      (to.path === '/auth/login' || to.path === '/auth/register') &&
      (await getAuthUser())
    ) {
      next({ name: 'feed', replace: true });
    } else {
      next();
    }
  });

  return Router;
});

const getAuthUser = () => {
  return new Promise<AuthUser | null>((resolve) => {
    firebaseAuth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
};
