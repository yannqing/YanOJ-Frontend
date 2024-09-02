<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { QuestionQueryRequest } from '@/generated'
import { QuestionControllerService } from '@/generated'
import { Message } from '@arco-design/web-vue'
import { dataFormat, passPercentage } from '@/utils/util'

onMounted(() => {
  QuestionControllerService.listQuestionVoByPageUsingPost(requestData).then((res) => {
    console.log('题目信息：', res)
    if (res.code === 0) {
      data.value = res.data.records
      pagination.total = res.data.total
    } else {
      Message.success(res.message)
    }
  })
})

const handlePageChange = (page: number) => {
  requestData.current = page
}

const pagination = reactive({
  total: 0
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
    title: '题目名称',
    dataIndex: 'title'
  },
  {
    title: '标签',
    slotName: 'tags'
  },
  {
    title: '通过率',
    slotName: 'pass'
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
</script>

<template>
  <div style="margin: 20px" class="animate__animated animate__tada">
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
        <a-button type="primary" @click="$router.push(`/doQuestion/${record.id}`)">做题</a-button>
      </template>
    </a-table>
    <!--    分页-->
    <a-pagination
      :total="pagination.total"
      :page-size="requestData.pageSize"
      :current="requestData.current"
      @change="handlePageChange"
      :show-total="true"
      style="margin: 10px 10px 0 10px"
    />
  </div>
</template>

<style scoped lang="scss"></style>
