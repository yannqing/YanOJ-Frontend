import { ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '@/router'

export const usePermissionStore = defineStore('permission', () => {
  const routes: Ref<UnwrapRef<any[]>> = ref([])

  function hasPermission(roles: string[], route: any): boolean {
    // if (roles || route?.meta?.access) {
    //   const accRoutes = route?.meta?.access as string[]
    //   return roles.some((role) => accRoutes.includes(role))
    // }
    // return true

    // 确保 roles 是数组，并且 route?.meta?.access 是一个数组
    if (Array.isArray(roles) && Array.isArray(route?.meta?.access)) {
      // console.log('都是数组，未登录')
      const accRoutes = route.meta.access as string[]
      return roles.some((role) => accRoutes.includes(role))
    }
    if (!Array.isArray(roles)) {
      return route?.meta?.access.includes(roles)
    }

    // 如果 roles 或 route?.meta?.access 不是数组，则默认返回 true
    return true
  }

  /**
   * 根据角色过滤动态路由
   * @param routes
   * @param roles
   */
  function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
    const res: Array<RouteRecordRaw> = []
    routes.forEach((route) => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp) && !route?.meta?.hidden) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })
    return res
  }

  function generateRoutes(roles: string[]) {
    let accessedRoutes: Array<any> = []
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || []
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    routes.value = accessedRoutes
    // console.log('刷新权限：', routes.value)
    return accessedRoutes
  }

  return { routes, hasPermission, generateRoutes }
})
