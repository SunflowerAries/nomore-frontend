import Vue from "vue";
import Router from "vue-router";

import HomePage from "../pages/common/HomePage";
import LoginPage from "../pages/common/LoginPage";
import RegisterPage from "../pages/common/RegisterPage";
import DocsPage from "../pages/common/DocsPage";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/docs/*", component: DocsPage },
    { path: "/docs", component: HomePage },

    // otherwise redirect to docs
    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register", "/docs", "/docs"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});
