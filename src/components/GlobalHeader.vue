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
          <a-menu-item v-for="item in menu" :key="item.path">{{ item.name }} </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div style="text-align: center">
          {{ loginUser.userName }}
          <a-avatar v-if="!loginUser.userRole.includes('notLogin')">
            <img
              alt="avatar"
              src="https://blogback.yannqing.com/api/v2/objects/avatar/0vqxqul8pu2skmwokn.jpg"
            />
          </a-avatar>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useLoginUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import type { User } from '@/stores/entity/user'
import type { ComputedRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

//定义路由 router
const router = useRouter()

const store = useLoginUserStore()
const permissionStore = usePermissionStore()

const menu = computed(() => {
  return permissionStore.generateRoutes(store.loginUser.userRole)
})

//选中的菜单项
const selectedKeys = ref(['/'])

//路由守卫，每次路由变化之后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]
})

onBeforeRouteUpdate(() => {
  useLoginUserStore().getLoginUser()
})

const loginUser: ComputedRef<User> = computed(() => {
  return store.loginUser
})

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
</style>
