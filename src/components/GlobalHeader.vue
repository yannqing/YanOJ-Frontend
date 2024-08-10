<template>
  <!--  全局头部栏-->
  <div class="menu-demo">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <!--    菜单栏-->
        <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="jump">
          <!--      菜单项-->
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <div style="margin-top: 3px">
              <img src="../assets/YannOJ.svg" style="margin-top: 7px" />
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in menu" :key="item.path">{{ item.name }}</a-menu-item>
        </a-menu>
      </a-col>
      <a-dropdown>
        <a-button type="text" style="height: fit-content">
          <div style="text-align: center; color: #181818">
            {{ loginUser.userName }}
            <a-avatar v-if="isLogin">
              <img
                alt="avatar"
                src="https://blogback.yannqing.com/api/v2/objects/avatar/0vqxqul8pu2skmwokn.jpg"
              />
            </a-avatar>
          </div>
        </a-button>
        <template #content>
          <a-doption @click="logout" v-if="isLogin">退出</a-doption>
          <a-doption @click="$router.push('/auth/login?redirect=to.path')" v-else>登录</a-doption>
        </template>
      </a-dropdown>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useLoginUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import type { User } from '@/stores/entity/user'
import type { ComputedRef } from 'vue'

//定义路由 router
const router = useRouter()

const userStore = useLoginUserStore()
const permissionStore = usePermissionStore()

const isLogin = ref(false)

const menu = computed(() => {
  return permissionStore.generateRoutes(userStore.loginUser.userRole)
})

//选中的菜单项
const selectedKeys = ref(['/'])

//路由守卫，每次路由变化之后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]
})

onBeforeRouteUpdate(async () => {})

onMounted(async () => {
  await useLoginUserStore().getLoginUser()
  isLogin.value = !loginUser.value.userRole.includes('notLogin')
})

const loginUser: ComputedRef<User> = computed(() => {
  return userStore.loginUser
})

const logout = () => {
  userStore.logout()
  useLoginUserStore().getLoginUser()
  window.location.reload()
}

//点击菜单项，进行路由跳转
const jump = (key: string) => {
  router.push(key)
}
</script>

<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
}

.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
