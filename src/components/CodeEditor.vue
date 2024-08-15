<template>
  <div id="container" style="min-height: 70vh"></div>
</template>

<script setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref, toRaw, watch } from 'vue'

const codeEditor = ref()

const props = defineProps({
  language: String
})

// const fillValue = () => {
//   if (!codeEditor.value) {
//     return
//   }
//   // 改变值
//   toRaw(codeEditor.value).setValue('新的值')
// }

self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    const getWorkerModule = (moduleUrl, label) => {
      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
        name: label,
        type: 'module'
      })
    }

    switch (label) {
      case 'json':
        return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label)
      case 'css':
      case 'scss':
      case 'less':
        return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label)
      case 'html':
      case 'handlebars':
      case 'razor':
        return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label)
      case 'typescript':
      case 'javascript':
        return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label)
      default:
        return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label)
    }
  }
}
const value = /* set from `myEditor.getModel()`: */ `function hello() {
	alert('Hello world!');
	console.log("xx");
}`

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(toRaw(codeEditor.value).getModel(), props.language)
    }
  }
)

onMounted(() => {
  codeEditor.value = monaco.editor.create(document.getElementById('container'), {
    value,
    theme: 'vs-dark',
    automaticLayout: true,
    colorDecorators: true,
    language: props.language
  })

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    console.log('目前内容为：', toRaw(codeEditor.value).getValue())
    console.log('language:', props.language)
  })
})
</script>

<style scoped></style>
