<template>
  <!--  全局头部栏-->
  <div class="menu-demo">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <!--    菜单栏-->
        <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="jump">
          <!--      菜单项-->
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <div style="display: flex; margin-top: 20px">
              <icon-font type="icon-flag" :size="32" />
              <span class="gradient-text">YanOJ</span>
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
          <a-doption @click="toLogin" v-else>登录</a-doption>
        </template>
      </a-dropdown>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useLoginUserStore } from '@/stores/user'
import type { User } from '@/stores/entity/user'
import type { ComputedRef } from 'vue'
import { usePermissionStore } from '@/stores/permission'

import { Icon } from '@arco-design/web-vue'

const IconFont = Icon.addFromIconFontCn({
  src: 'https://at.alicdn.com/t/font_180975_ue66sq60vyd.js'
})

//定义路由 router
const router = useRouter()
const route = useRoute()

const userStore = useLoginUserStore()

const isLogin = ref(false)

const menu = ref()

//选中的菜单项
const selectedKeys = ref(['/'])

//路由守卫，每次路由变化之后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]
})

const toLogin = () => {
  router.push(`/auth/login?redirect=${route.path}`)
}

onMounted(async () => {
  await useLoginUserStore().getLoginUser()
  isLogin.value = !loginUser.value.userRole.includes('notLogin')

  menu.value = usePermissionStore().routes
  console.log('menu.value', menu.value)
  selectedKeys.value = [route.path]
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
  margin-top: 10px;
}

:deep(.arco-menu-horizontal) {
  background-color: transparent;
}

:deep(
    .arco-menu-horizontal .arco-menu-item:not(:first-child),
    .arco-menu-horizontal .arco-menu-pop:not(:first-child)
  ) {
  background-color: transparent;
}

.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}

.gradient-text {
  font-weight: bold;
  font-size: 28px;
  background: linear-gradient(
    169.4deg,
    #3984f4 -6.01%,
    #0cd3ff 36.87%,
    #2f7cf0 78.04%,
    #0e65e8 103.77%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
