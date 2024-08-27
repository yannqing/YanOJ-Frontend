<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { onMounted } from 'vue'
import { usePermissionStore } from '@/stores/permission'

onMounted(async () => {
  console.log('基础布局', usePermissionStore().routes)
})
</script>

<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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
  background-image: url('@/assets/loginBackground.png');
  background-size: auto;
  background-position: center;
  background-repeat: repeat;
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
