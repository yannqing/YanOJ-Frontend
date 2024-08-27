<template>
  <div>
    <a-space direction="vertical">
      <div class="box">
        <span class="left-font">标题</span>
        <a-input class="right-component" placeholder="请输入标题" v-model="request.title"></a-input>
      </div>
      <div class="box">
        <span class="left-font">标签</span>
        <a-input-tag
          class="right-component"
          placeholder="Please Enter"
          allow-clear
          v-model="request.tags"
        />
      </div>
      <div class="box">
        <span class="left-font">题目内容</span>
        <MarkDownEditor @handleChange="receiveChild" class="right-component" />
      </div>
      <div class="box">
        <a-button type="primary" style="width: 80px" class="right-component" @click="createQuestion"
          >添加</a-button
        >
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import MarkDownEditor from '@/components/MarkDownEditor.vue'
import { QuestionControllerService } from '@/generated'
import { Message } from '@arco-design/web-vue'
import { reactive } from 'vue'

const receiveChild = (val) => {
  request.content = val
}

const request = reactive({
  title: '',
  content: '',
  tags: []
})

const createQuestion = () => {
  QuestionControllerService.addQuestionUsingPost(request).then((res) => {
    if (res.code === 0) {
      Message.success('添加成功')
      request.title = ''
      request.content = ''
      request.tags = []
    } else {
      Message.error('添加失败：' + res.message)
    }
  })
}
</script>

<style scoped lang="scss">
/**
 * 右侧公共样式
 */
@mixin margin-left-vw($length) {
  margin-left: $length;
}

/**
 * 左侧公共样式
 */
@mixin left-with($width) {
  width: $width;
  margin-left: 2vw;
  color: #404040;
  font-weight: bold;
}

/**
 * 每一个字体 + 组件的盒子公共样式
 */
%box {
  display: flex;
  flex-direction: row;
  margin-top: 5vh;
}

/**
 * 每一个字体 + 组件的盒子样式
 */
.box {
  @extend %box;
}

/**
 * 左侧字体样式
 */
.left-font {
  @include left-with(100px);
  font-size: large;
}

/**
 * 右侧组件样式
 */
.right-component {
  @include margin-left-vw(30vw);
  width: 50vw;
}
</style>
