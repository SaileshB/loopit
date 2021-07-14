import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Cars from "../views/Cars.vue";
import Register from "../views/Register";
import Login from "../views/Login";


Vue.use(VueRouter);

const routes = [
  {
    path: "/cars",
    name: "Cars",
    component: Cars,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (store.getters.isAuthenticated) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/cars");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
