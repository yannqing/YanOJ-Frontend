<template>
  <div style="margin: 20px" class="">
    <a-table :columns="columns" :data="data">
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" :color="colors[index]"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #pass="{ record }">
        {{ passPercentage(record.acceptednum, record.submitnum) }}</template
      >
      <template #createTime="{ record }">
        <div>
          {{ dataFormat(record.userVO.createTime) }}
        </div>
      </template>
      <template #optional="{ record }">
        <a-space wrap style="width: 130px">
          <a-button type="primary" @click="handleClick">修改</a-button>
          <a-button status="danger" @click="$router.push(`/doQuestion/${record.id}`)"
            >删除</a-button
          >
        </a-space>
      </template>
      <!--编辑框-->
    </a-table>

    <a-modal
      v-model:visible="visible"
      title="编辑题目"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="form">
        <a-form-item field="name" label="标题">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item field="name" label="内容">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item field="name" label="标签">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item field="post" label="Post">
          <a-select v-model="form.post">
            <a-option value="post1">Post1</a-option>
            <a-option value="post2">Post2</a-option>
            <a-option value="post3">Post3</a-option>
            <a-option value="post4">Post4</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { QuestionQueryRequest } from '@/generated'
import { QuestionControllerService } from '@/generated'
import { Message } from '@arco-design/web-vue'
import { dataFormat } from '@/utils/util'

onMounted(() => {
  QuestionControllerService.listQuestionVoByPageUsingPost(requestData).then((res) => {
    console.log('题目信息：', res)
    if (res.code === 0) {
      data.value = res.data.records
    } else {
      Message.success(res.message)
    }
  })
})

const requestData: QuestionQueryRequest = {
  current: 1,
  pageSize: 10
}

const columns = [
  {
    title: '题号',
    dataIndex: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '内容',
    dataIndex: 'content'
  },
  {
    title: '答案',
    dataIndex: 'answer'
  },
  {
    title: '标签',
    slotName: 'tags'
  },
  {
    title: '提交数',
    dataIndex: 'submitnum'
  },
  {
    title: '通过数',
    dataIndex: 'acceptednum'
  },
  {
    title: '用户id',
    dataIndex: 'userid'
  },
  {
    title: '创建时间',
    slotName: 'createTime'
  },
  {
    title: '选项',
    slotName: 'optional'
  }
]
const data = ref([])

const colors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
]

const passPercentage = (acceptedNum: number, submitNum: number) => {
  if (submitNum === 0) {
    return '0%  (0/0)'
  } else {
    const percentage = (acceptedNum * 100) / submitNum
    return `${percentage}%  (${acceptedNum}/${submitNum})`
  }
}

const visible = ref(false)
const form = reactive({
  title: '',
  content: '',
  tags: []
})

const handleClick = () => {
  visible.value = true
}
const handleBeforeOk = (done) => {
  console.log(form)
  window.setTimeout(() => {
    done()
  }, 3000)
}
const handleCancel = () => {
  visible.value = false
}
</script>

<style scoped></style>
