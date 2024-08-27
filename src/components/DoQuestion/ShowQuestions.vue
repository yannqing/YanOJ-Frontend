<script setup lang="ts">
import { QuestionControllerService } from '@/generated'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { passPercentage } from '../../utils/util'

const questionId = ref(1)

const route = useRoute()

const question = reactive<any>({
  data: {}
})

onMounted(async () => {
  if (route.params.id[0] === ':id*') {
    questionId.value = 1
  } else {
    questionId.value = parseInt(route.params.id[0])
  }
  await QuestionControllerService.getQuestionVoByIdUsingGet(questionId.value).then((res) => {
    question.data = res.data
    console.log('question.data', question.data)
  })
})
</script>

<template>
  <div :style="{ display: 'flex' }">
    <a-scrollbar style="height: 60vh; overflow: auto">
      <a-card :style="{ width: '45vw', minHeight: '67vh' }" :title="question.data.title" hoverable>
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

        <div style="margin-top: 30px">
          <a-space wrap>
            <span style="color: #9494b8">通过次数</span
            ><span>{{ question.data?.acceptednum }}</span>
          </a-space>
          <a-divider direction="vertical" />
          <a-space wrap>
            <span style="color: #9494b8">提交次数</span><span>{{ question.data?.submitnum }}</span>
          </a-space>
          <a-divider direction="vertical" />
          <a-space wrap>
            <span style="color: #9494b8">通过率</span
            ><span
              >{{ passPercentage(question.data?.acceptednum, question.data?.submitnum) }} %</span
            >
          </a-space>
        </div>
      </a-card>
    </a-scrollbar>
  </div>
</template>

<style scoped></style>
