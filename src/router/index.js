import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../components/login.vue") }, // 登录页面默认跳转
  { path: "/register", component: () => import("../components/register.vue") }, // 注册页面
  { path: "/index", component: () => import("../components/index.vue") }, // 首页
  { path: "/profile", component: () => import("../components/self_info.vue") }, // 个人信息
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
