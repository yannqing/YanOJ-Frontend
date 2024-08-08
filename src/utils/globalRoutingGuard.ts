import router from '../router'
import { useLoginUserStore } from '@/stores/user'
import { NOT_LOGIN } from '@/common/accessNUM'
import { usePermissionStore } from '@/stores/permission'

const whiteList = ['/auth/login', '/notAuth', '/auth/register']

router.beforeEach(async (to, from, next) => {
  // console.log('router beforeEach', to, from, next)

  //检查用户是否是未登录
  if (useLoginUserStore().loginUser.userRole.includes(NOT_LOGIN)) {
    console.log('用户未登录')
    console.log('获取登录用户之前', useLoginUserStore().loginUser)

    //未登录则重新获取，以此来判断cookie是否过期
    const res = await useLoginUserStore().getLoginUser()
    console.log('获取登录用户之后', useLoginUserStore().loginUser)

    //未登录，且cookie过期
    if (useLoginUserStore().loginUser.userRole.includes(NOT_LOGIN)) {
      console.log('获取用户登录失败', res)
      //如果是白名单的路由，直接放行
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/auth/login?redirect=${to.path}`)
      }
    } else {
      //code === 0，未登录，但 cookie 未过期
      // 重新加载路由
      const accessRoutes = usePermissionStore().generateRoutes(
        useLoginUserStore().loginUser.userRole
      )
      accessRoutes.forEach((item) => {
        router.addRoute(item)
      })
      next()
    }
    //用户已登录，直接放行
  } else {
    console.log('登录的路由：', usePermissionStore().routes)
    console.log('login already')
    next()
  }
})

router.afterEach((to, from, failure) => {
  // console.log('router afterEach', to, from, failure)
})
