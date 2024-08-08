import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ADMIN, USER } from '@/common/accessNUM'

/**
 * 静态路由
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: '认证',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '/auth/login',
        name: '登录',
        component: () => import('../views/LoginView.vue')
      }
    ]
  },
  {
    path: '/noAuth',
    name: '无权限',
    meta: {
      hidden: true,
      access: [USER]
    },
    component: () => import('../views/NoAuthView.vue')
  }
]

/**
 * 动态路由，根据权限进行渲染
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '浏览题目',
    meta: {
      access: [USER]
    },
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: '管理员页面',
    meta: {
      access: [ADMIN]
    },
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/about',
    name: '关于我的',
    meta: {
      access: [USER]
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/TTT.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
