<template>
  <div style="margin: 0 20px 20px 20px">
    <!--    查询条件-->
    <a-space wrap style="margin-bottom: 10px">
      <div>题号</div>
      <a-input v-model="requestData.questionId" />
      <div style="margin-left: 10px">编程语言</div>
      <a-select default-value="java" style="width: 200px" v-model="requestData.language">
        <a-option :value="language" v-for="(language, index) in languages" :index="index"
          >{{ language }}
        </a-option>
      </a-select>
      <a-button type="primary" style="margin-left: 10px" @click="flushData">搜索</a-button>
    </a-space>
    <!--    表格-->
    <a-table
      :columns="columns"
      :data="data"
      :pagination="false"
      style="background-color: transparent"
    >
      <template #language="{ record }">
        <a-tag :color="languagesToColor.get(record.language)">
          {{ record.language }}
        </a-tag>
      </template>
      <template #judgeInfo="{ record }">
        <a-space wrap>
          <a-tag>memory: {{ record.judgeinfo.memory }}</a-tag>
          <a-tag>time: {{ record.judgeinfo.time }}</a-tag>
          <a-tag>message: {{ record.judgeinfo.message }}</a-tag>
        </a-space>
      </template>
      <template #createTime="{ record }">
        <div>
          {{ dataFormat(record.createtime) }}
        </div>
      </template>
      <template #status="{ record }">
        <a-tag :color="getTagColor(record.status, record.judgeinfo.message)">
          {{ getTagMsg(record.status, record.judgeinfo.message) }} &nbsp;<a-spin
            size="12"
            class="the-spin-color"
            v-if="record.status === 1"
          >
            <template #icon>
              <icon-sync />
            </template>
          </a-spin>
        </a-tag>
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

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { QuestionQueryRequest } from '@/generated'
import { QuestionControllerService } from '@/generated'
import { Message } from '@arco-design/web-vue'
import { dataFormat } from '@/utils/util'
import { IconSync } from '@arco-design/web-vue/es/icon'
import { languages, languagesToColor } from '@/common/codeEditorVariable'

onMounted(async () => {
  await flushData()
})

// 请求数据
const requestData: QuestionQueryRequest = reactive({
  current: 1,
  pageSize: 7,
  language: '',
  questionId: ''
})
// 数据总数初始化
const pagination = reactive({
  total: 0
})
// 判题状态的映射
const judgeStatus: Map<number, string> = new Map([
  [0, '待判题'],
  [1, 'Judging'],
  [2, '判题成功'],
  [3, '判题失败']
])
// 表格要展示的字段
const columns = [
  {
    title: '题交号',
    dataIndex: 'id'
  },
  {
    title: '编程语言',
    slotName: 'language'
  },
  {
    title: '判题信息',
    slotName: 'judgeInfo'
  },
  {
    title: '判题状态',
    slotName: 'status'
  },
  {
    title: '题目 id',
    dataIndex: 'questionid'
  },
  {
    title: '提交者 id',
    dataIndex: 'userid'
  },
  {
    title: '创建时间',
    slotName: 'createTime'
  }
]
// 表格数据存储
const data = ref([])

/**
 * 从后端获取数据
 */
const flushData = async () => {
  console.log('请求信息：', requestData)
  await QuestionControllerService.listQuestionSubmitByPageUsingPost(requestData).then((res) => {
    console.log('题目提交信息：', res)
    if (res.code === 0) {
      data.value = res.data.records
      pagination.total = parseInt(res.data.total)
    } else {
      Message.success(res.message)
    }
  })
}

/**
 * 翻页处理的函数
 * @param page
 */
const handlePageChange = async (page: number) => {
  requestData.current = page
  await flushData()
}

/**
 * 根据 判题状态和判题信息 获取标签的颜色
 * @param status 判题状态
 * @param message 判题信息
 */
const getTagColor = (status: number, message: string) => {
  // 判题中
  if (status === 1) {
    return 'magenta'
    // 判题成功
  } else if (status === 2) {
    if (message === 'Wrong Answer') {
      return 'red'
    } else if (message === 'Accepted') {
      return 'green'
    }
    // 待判题
  } else if (status === 0) {
    return 'gray'
    // 判题失败
  } else {
    return 'red'
  }
}

const getTagMsg = (status: number, message: string) => {
  if (status === 2) {
    return message
  } else {
    return judgeStatus.get(status)
  }
}
</script>

<style scoped lang="scss">
// 修改 "加载中" 图标的颜色
:deep(.arco-spin-icon) {
  color: var(--magenta-6);
}
</style>
