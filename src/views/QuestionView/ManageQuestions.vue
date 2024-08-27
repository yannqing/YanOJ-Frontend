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
          <a-button type="primary" @click="handleClick(record)">修改</a-button>
          <a-button status="danger" @click="handleClickWarning(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
    <!--编辑框-->
    <a-modal
      v-model:visible="visible"
      title="编辑题目"
      @cancel="handleEditCancel"
      @ok="handleEditOk"
    >
      <a-form :model="updateForm">
        <a-form-item field="name" label="标题">
          <a-input v-model="updateForm.title" />
        </a-form-item>
        <a-form-item field="name" label="内容">
          <a-textarea
            v-model="updateForm.content"
            placeholder="Please enter something"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="name" label="标签">
          <a-input-tag v-model="updateForm.tags" placeholder="Please Enter" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { QuestionQueryRequest } from '@/generated'
import { QuestionControllerService } from '@/generated'
import { Message, Modal } from '@arco-design/web-vue'
import { dataFormat } from '@/utils/util'

onMounted(() => {
  flushData()
})

const flushData = () => {
  QuestionControllerService.listQuestionVoByPageUsingPost(requestData).then((res) => {
    console.log('题目信息：', res)
    if (res.code === 0) {
      data.value = res.data.records
    } else {
      Message.success(res.message)
    }
  })
}

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
const updateForm = reactive({
  id: '',
  title: '',
  content: '',
  tags: []
})
const deleteId = reactive({
  id: ''
})

const handleClick = (data: object) => {
  console.log('data', data)
  visible.value = true
  updateForm.id = data.id
  updateForm.title = data.title
  updateForm.content = data.content
  updateForm.tags = data.tags
  console.log('form', updateForm)
}
const handleEditOk = () => {
  QuestionControllerService.updateQuestionUsingPost(updateForm).then((res) => {
    if (res.code === 0) {
      Message.success('更新数据成功！')
      flushData()
    } else {
      Message.error('更新数据失败：' + res.message)
    }
  })
}
const handleEditCancel = () => {
  visible.value = false
  form.title = ''
  form.content = ''
  form.tags = []
}

const deleteById = () => {
  QuestionControllerService.deleteQuestionUsingPost(deleteId).then((res) => {
    if (res.code === 0) {
      Message.success('删除成功')
      flushData()
    } else {
      Message.error('删除失败：' + res.message)
    }
  })
}

const handleClickWarning = (data: object) => {
  deleteId.id = data.id
  console.log('deleteId.value', deleteId.id)
  Modal.warning({
    title: '危险操作',
    content: `请问是否要删除题目是${data.title}的数据？`,
    hideCancel: false,
    onOk: () => {
      deleteById()
    }
  })
}
</script>

<style scoped></style>
