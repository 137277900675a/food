import { createRouter, createWebHashHistory } from "vue-router";

// 路由组件的懒加载
const Login = () => import("../components/login.vue"); // 登录组件
const Register = () => import("../components/register.vue"); // 注册组件
const Index = () => import("../components/index.vue"); // 登录后跳转的首页
const SelfInfo = () => import("../components/self_info.vue"); // 个人信息组件
const Lottery = () => import("../components/lottery.vue"); // 抽奖组件
const NotFound = () => import("../components/NotFound.vue"); // 404 页面组件

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
    meta: { requiresAuth: true }, // 需要认证
  },
  {
    path: "/self",
    name: "SelfInfo",
    component: SelfInfo,
    meta: { requiresAuth: true }, // 需要认证
  },
  {
    path: "/lottery",
    name: "Lottery",
    component: Lottery,
    meta: { requiresAuth: true }, // 需要认证
  },
  {
    path: "/",
    redirect: "/login", // 默认重定向到登录页面
  },
  {
    path: "/:catchAll(.*)", // 捕获所有未匹配的路由
    name: "NotFound",
    component: NotFound,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("user"); // 假设用户信息存储在 localStorage 中

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // 如果未认证，重定向到登录页面
  } else {
    next(); // 继续导航
  }
});

export default router;
