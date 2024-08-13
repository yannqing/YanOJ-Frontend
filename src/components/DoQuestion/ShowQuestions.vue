<script setup lang="ts">
import { QuestionControllerService } from '@/generated'
import { onMounted, reactive, ref } from 'vue'

const questionId = ref(1)

const question = reactive<any>({
  data: {}
})

onMounted(async () => {
  console.log('查询单个题目信息结果：')
  await QuestionControllerService.getQuestionVoByIdUsingGet(questionId.value).then((res) => {
    console.log('查询单个题目信息结果：', res)
    question.data = res.data
    console.log('questionData.value', question.data)
  })
})
</script>

<template>
  <div :style="{ display: 'flex' }">
    <a-card :style="{ width: '100%', minHeight: '67vh' }" :title="question.data.title" hoverable>
      <template #extra>
        <a-space wrap style="margin: 10px 0 0 0">
          <a-tag color="green" v-for="(tag, index) in question.data.tags" :key="index"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>

      <div style="margin-top: 10px">{{ question.data.content }}</div>
      <div
        style="margin-top: 20px"
        v-for="(example, index) in question.data?.judgeCase"
        :key="index"
      >
        <div style="font-weight: bold">示例{{ index + 1 }}</div>
        <div style="margin: 10px 10px 19px 10px; display: flex; flex-direction: row">
          <a-divider direction="vertical" />
          <div>
            <div style="margin: 10px">
              <span style="font-weight: bold">输入：</span>
              <span>{{ example.input }}</span>
            </div>
            <div style="margin: 10px">
              <span style="font-weight: bold">输出：</span>
              <span>{{ example.output }}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="font-weight: bold; margin-top: 20px">判题条件</div>
      <div style="margin-top: 10px">
        <a-row :gutter="16">
          <a-col :span="8">
            <span>时间限制</span>
            <span style="margin: 0 0 0 5px">{{ question.data?.judgeconfig?.timeLimit }}</span>
          </a-col>
          <a-col :span="8">
            <span>内存限制</span>
            <span style="margin: 0 0 0 5px">{{ question.data?.judgeconfig?.memoryLimit }}</span>
          </a-col>
          <a-col :span="8">
            <span>堆栈限制</span>
            <span style="margin: 0 0 0 10px">{{ question.data?.judgeconfig?.stackLimit }}</span>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<style scoped></style>
