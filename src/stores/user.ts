import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { usePermissionStore } from '@/stores/permission'
import { UserControllerService } from '@/generated'
import type { UserLoginRequest } from '@/generated'
import { Message } from '@arco-design/web-vue'
import router from '@/router'
import type { User } from '@/stores/entity/user'
import { NOT_LOGIN } from '@/common/accessNUM'
import { useRoute } from 'vue-router'

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser: User = reactive({
    userName: '未登录',
    userAvatar: '',
    userProfile: '',
    userRole: [NOT_LOGIN]
  })

  const route = useRoute()

  /**
   * 用户登录
   * @param userLoginRequest
   */
  async function login(userLoginRequest: UserLoginRequest) {
    await UserControllerService.userLoginUsingPost(userLoginRequest).then((res) => {
      console.log('login return：', res)
      console.log('login User：', res.data)
      if (res.code === 0) {
        Message.success('登录成功')
        loginUser.userName = res.data.userName
        loginUser.userAvatar = res.data.userAvatar
        loginUser.userProfile = res.data.userProfile
        loginUser.userRole = [res.data.userRole]
        console.log('loginUser：', loginUser)
        router.replace('/')
      } else {
        Message.error(res.message)
      }
    })
  }

  /**
   * 获取登录用户信息
   */
  function getLoginUser() {
    return new Promise<void>((resolve, reject) => {
      UserControllerService.getLoginUserUsingGet()
        .then((res) => {
          if (res.code === 0) {
            loginUser.userName = <string>res?.data?.userName
            loginUser.userAvatar = <string>res?.data?.userAvatar
            loginUser.userProfile = <string>res?.data?.userProfile
            loginUser.userRole = <any>res?.data?.userRole ?? []
            const accessRoutes = usePermissionStore().generateRoutes(loginUser.userRole)
            accessRoutes.forEach((item) => {
              router.addRoute(item)
            })
          }
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  function logout() {
    return new Promise<void>(() => {
      UserControllerService.userLogoutUsingPost().then((res) => {
        console.log('logout result: ', res)
        if (res.code === 0) {
          Message.success('退出成功')
        }
      })
    })
  }

  return { loginUser, getLoginUser, login, logout }
})
