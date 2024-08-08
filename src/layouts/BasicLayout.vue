<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from '@/components/GlobalHeader.vue'
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
}

#basicLayout .header {
}

#basicLayout .content {
  background: linear-gradient(to right, #f2f2f2, #181818);
  margin-bottom: 16px;
}

#basicLayout .footer {
  background-color: #2c3e50;
  text-align: center;
  padding: 16px;
}
</style>
