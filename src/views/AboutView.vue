<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2></h2>
    <MdEditor style="width: 100vw" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from '@/components/MdEditor.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
