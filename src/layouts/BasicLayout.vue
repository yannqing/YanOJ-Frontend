<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { computed, onMounted } from 'vue'
import { usePermissionStore } from '@/stores/permission'
import { useLoginUserStore } from '@/stores/user'
import router from '@/router'

onMounted(async () => {
  console.log('基础布局')
  await userStore.getLoginUser()
  console.log('userStore.loginUser.userRole', userStore.loginUser.userRole)
  const accessRoutes = usePermissionStore().generateRoutes(useLoginUserStore().loginUser.userRole)
  accessRoutes.forEach((item) => {
    router.addRoute(item)
  })
})

const permissionStore = usePermissionStore()
const userStore = useLoginUserStore()

/**
 * 加载路由
 */
const loadMenu = computed(() => {
  return permissionStore.generateRoutes(userStore.loginUser.userRole)
})
</script>

<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader :load-menu="loadMenu" />
      </a-layout-header>
      <a-layout-content class="content">
        <RouterView />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://yannqing.com" target="_blank">判题系统开发 by 程序员彦青</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
}

#basicLayout .content {
  margin-bottom: 16px;
}

#basicLayout .footer {
  background-color: #2c3e50;
  text-align: center;
  padding: 16px;
}
</style>
