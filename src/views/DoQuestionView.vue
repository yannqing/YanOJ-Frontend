<template>
  <div style="display: flex; flex-direction: row">
    <a-tabs default-active-key="1" style="width: 50vw; margin: 0 0 0 10px">
      <a-tab-pane key="1" title="题目">
        <show-questions />
      </a-tab-pane>
      <a-tab-pane key="2" title="题解">
        <show-answer />
      </a-tab-pane>
      <a-tab-pane key="3" title="评论" disabled> Content of Tab Panel 3</a-tab-pane>
    </a-tabs>
    <div>
      <div style="display: flex; flex-direction: row; margin: 0 0 5px 0">
        <div style="margin: 10px 5px 0 10px">编程语言</div>
        <a-select :options="languages" style="width: 350px" v-model="selectLanguage"></a-select>
      </div>
      <CodeEditor
        style="width: 50vw; margin: 0 10px 0 10px"
        :language="selectLanguage"
      ></CodeEditor>
    </div>
  </div>
</template>

<script setup>
import CodeEditor from '@/components/CodeEditor.vue'
import { onMounted, ref } from 'vue'
import ShowQuestions from '@/components/DoQuestion/ShowQuestions.vue'
import ShowAnswer from '@/components/DoQuestion/ShowAnswer.vue'
import { useRoute } from 'vue-router'

// Monaco Editor 可选的语言
const languages = ref(['java', 'html', 'python', 'Go', 'javascript', 'css', 'json'])
// Monaco Editor 默认选择的语言
const selectLanguage = ref('javascript')

const route = useRoute()

onMounted(() => {
  console.log('route.params', route.params)
  console.log('route.state', route.state)
})
</script>

<style scoped lang="scss">
%flex-to-row-display {
  display: flex;
  flex-direction: row;
}
</style>
