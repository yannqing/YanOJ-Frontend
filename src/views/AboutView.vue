<template>
  <div style="margin-left: 50px">
    <div style="display: flex; flex-direction: row">
      <a-avatar shape="square" :size="64">
        <img
          alt="avatar"
          src="https://blogback.yannqing.com/api/v2/objects/avatar/0vqxqul8pu2skmwokn.jpg"
        />
      </a-avatar>
      <div style="margin: 15px">
        <div style="font-weight: bold; font-size: 18px">
          {{ loginUser.userName }}
        </div>
        <div style="font-size: 16px; color: #9d9c9c">
          {{ loginUser.userProfile }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { User } from '@/stores/entity/user'
import { useLoginUserStore } from '@/stores/user'

const userStore = useLoginUserStore()

const loginUser: ComputedRef<User> = computed(() => {
  return userStore.loginUser
})
</script>

<style scoped></style>
