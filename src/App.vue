<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/user'
import { onBeforeMount, onBeforeUpdate, onMounted } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = useRouter()
const route = useRoute()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const user = useLoginUserStore()

/**
 * 全局初始化函数，单次调用函数接口
 */
const doInit = () => {
  console.log('hello，欢迎来到yanOJ')
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

<style scoped></style>
