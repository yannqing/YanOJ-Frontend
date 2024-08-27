<template>
  <div class="container">
    <div style="width: 50vw; margin: 80px 0 0 100px">
      <div style="color: #0066ff; font-weight: bold; margin-bottom: 30px">Sign Up Today</div>
      <div style="max-width: 400px; font-size: 40px; font-weight: bold; margin-bottom: 30px">
        The World's
        <span
          style="
            background: linear-gradient(
              169.4deg,
              #3984f4 -6.01%,
              #0cd3ff 36.87%,
              #2f7cf0 78.04%,
              #0e65e8 103.77%
            );
            -webkit-text-fill-color: transparent;
            background-clip: text;
          "
          >Fastest Growing</span
        >
        Online Judging Web
      </div>
      <div
        style="
          font-family:
            OCR A Std,
            monospace;
          font-size: 15px;
        "
      >
        YanOJ is an online question-judging system created by yannqing in about a month. The system
        has a front-end and back-end separation and uses the
        <a-typography-text code> Vue3 + SpringBoot </a-typography-text> framework.
      </div>
      <div style="display: flex; flex-direction: row">
        <a-space wrap>
          <a-button
            type="primary"
            shape="round"
            style="margin-top: 30px; margin-right: 0 !important"
            size="large"
          >
            <span>Get Start</span>
            <icon-arrow-right style="margin-left: 5px" />
          </a-button>
          <a-button
            type="outline"
            shape="round"
            style="margin-top: 30px"
            size="large"
            href="https://github.com/yannqing/YanOJ-Frontend"
            target="_blank"
            >Download</a-button
          >
        </a-space>
      </div>
    </div>
    <img src="@/assets/mainIcon.png" style="width: 500px; height: 500px" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { alt } from '@/common/gloableVariable.js'
import { IconArrowRight } from '@arco-design/web-vue/es/icon'
import { IconRight } from '@arco-design/web-vue/es/icon'
</script>

<style scoped lang="scss">
.container {
  @extend %flex-direction-to-row;
}
</style>
