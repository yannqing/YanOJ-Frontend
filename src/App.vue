<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import BasicLayout from '@/layouts/BasicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import router from '@/router'

const route = useRoute()

const isRoutesGenerated = ref(false)
provide('isRoutesGenerated', isRoutesGenerated)

const doInit = async () => {
  console.log('hello，欢迎来到yanOJ')
  // const accessRoutes = usePermissionStore().generateRoutes(useLoginUserStore().loginUser.userRole)
  // accessRoutes.forEach((item) => {
  //   router.addRoute(item)
  // })
  // const goToRoute: string | null = localStorage.getItem('currentPath')
  // if (goToRoute !== null) {
  //   await router.replace(goToRoute)
  // } else {
  //   await router.replace('/')
  // }
}

onMounted(() => {
  doInit()
})
</script>

<template>
  <template v-if="route.path.startsWith('/auth')">
    <AuthLayout />
  </template>
  <template v-else>
    <BasicLayout />
  </template>
</template>
