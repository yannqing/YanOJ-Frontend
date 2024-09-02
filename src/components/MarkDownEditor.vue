<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import gemoji from '@bytemd/plugin-gemoji'
import type { Editor } from '@bytemd/vue-next'
import { ref } from 'vue'

const value = ref('')

const plugins = [gfm(), highlight(), gemoji()]

const emit = defineEmits(['handleChange'])

const handleChange = (v: string) => {
  value.value = v
  emit('handleChange', value.value)
}
</script>

<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" mode="split" />
</template>

<style scoped></style>
