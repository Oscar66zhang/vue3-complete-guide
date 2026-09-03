import { createRouter, createWebHashHistory } from 'vue-router';

/*
静态导入：项目启动、入口模块执行时，Shop.vue 就会被引入并打进当前依赖图里   component: Shop,
动态导入 + 路由懒加载：component: () => import('@/views/shop/Shop.vue')
 */

// 路由表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('@/views/shop/Shop.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),

    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;

      isLogin ? next({ name: 'Home' }) : next();
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/Register.vue'),

    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;

      isLogin ? next({ name: 'Home' }) : next();
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const { name } = to;

  const isLoginOrRegister = name === 'Login' || name === 'Register';

  if (isLogin || isLoginOrRegister) {
    next();
  } else {
    next('/login');
  }
});

export default router;
