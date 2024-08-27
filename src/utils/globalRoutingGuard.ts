import router from '../router'
import { useLoginUserStore } from '@/stores/user'
import { NOT_LOGIN } from '@/common/accessNUM'
import { usePermissionStore } from '@/stores/permission'

const whiteList = ['/auth/login', '/notAuth', '/auth/register']

router.beforeEach(async (to, from, next) => {
  console.log('router beforeEach', to.path, from.path)
  localStorage.setItem('currentPath', to.path)

  //检查用户是否是未登录
  if (useLoginUserStore().loginUser.userRole.includes(NOT_LOGIN)) {
    // console.log('用户未登录', useLoginUserStore().loginUser.userRole.includes(NOT_LOGIN))
    // console.log('获取登录用户之前', useLoginUserStore().loginUser)

    //未登录则重新获取，以此来判断cookie是否过期
    const res = await useLoginUserStore().getLoginUser()
    // console.log('获取登录用户之后', useLoginUserStore().loginUser)
    // 重新加载路由
    const accessRoutes = usePermissionStore().generateRoutes(useLoginUserStore().loginUser.userRole)
    accessRoutes.forEach((item) => {
      router.addRoute(item)
    })

    console.log('accessRoutes', usePermissionStore().routes)
    //未登录，且cookie过期
    if (useLoginUserStore().loginUser.userRole.includes(NOT_LOGIN)) {
      // console.log('获取用户登录失败', res)
      //如果是白名单的路由或是不需要权限的路由，直接放行
      let isIncludeNoAccessRoute = false
      accessRoutes.forEach((route) => {
        if (route.path === to.path) {
          isIncludeNoAccessRoute = true
          return
        }
      })
      if (whiteList.indexOf(to.path) !== -1 || isIncludeNoAccessRoute) {
        next()
      } else {
        next(`/auth/login?redirect=${to.path}`)
      }
    } else {
      //code === 0，未登录，但 cookie 未过期
      // console.log('123', to.path)

      next(`${to.path}`)
    }
    //用户已登录，直接放行
  } else {
    next()
  }
})

router.afterEach((to, from, failure) => {
  // console.log('router afterEach', to, from, failure)
})
