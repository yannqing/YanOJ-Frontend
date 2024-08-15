<template>
  <div>
    <a-space direction="vertical">
      <div class="box">
        <span class="left-font">标题</span>
        <a-input class="right-component" placeholder="请输入标题"></a-input>
      </div>
      <div class="box">
        <span class="left-font">标签</span>
        <a-input-tag
          :default-value="['简单']"
          class="right-component"
          placeholder="Please Enter"
          allow-clear
        />
      </div>
      <div class="box">
        <span class="left-font">题目内容</span>
        <MarkDownEditor class="right-component" />
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import MarkDownEditor from '@/components/MarkDownEditor.vue'
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
