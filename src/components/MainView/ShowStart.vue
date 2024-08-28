<template>
  <div class="container">
    <div class="left-content animate__animated animate__bounceInLeft">
      <div class="signup-text">Sign Up Today</div>
      <div class="main-title">
        The World's
        <span class="gradient-text">Fastest Growing</span>
        Online Judging Web
      </div>
      <div class="description">
        YanOJ is an online question-judging system created by yannqing in about a month. The system
        has a front-end and back-end separation and uses the
        <a-typography-text code> Vue3 + SpringBoot </a-typography-text> framework.
      </div>
      <div class="button-group">
        <a-space wrap>
          <a-button
            type="primary"
            shape="round"
            size="large"
            style="height: 50px; width: 130px"
            @click="$router.push('/ScanQuestions')"
          >
            <span>Get Start</span>
            <icon-arrow-right style="margin-left: 5px" />
          </a-button>
          <a-button
            type="outline"
            shape="round"
            size="large"
            style="height: 50px; width: 130px"
            href="https://github.com/yannqing/YanOJ-Frontend"
            target="_blank"
          >
            Download
          </a-button>
        </a-space>
      </div>
    </div>
    <div>
      <img
        src="https://nefa.vercel.app/_nuxt/img/ellipse-1.4a34989.png"
        style="position: absolute; left: 20px; bottom: 80px"
        class="animate__animated animate__fadeInUp animate__delay-1s"
      />
      <img
        src="https://nefa.vercel.app/_nuxt/img/ellipse-2.4f6027c.png"
        style="position: absolute; left: 750px"
        class="animate__animated animate__fadeInUp animate__delay-1s"
      />
      <img
        src="https://nefa.vercel.app/_nuxt/img/ellipse-3.397d7d7.png"
        style="position: absolute; right: 80px; bottom: 300px"
        class="animate__animated animate__fadeInUp animate__delay-1s"
      />
    </div>
    <div class="right-content animate__animated animate__bounceInRight">
      <img src="@/assets/mainIcon.png" :alt="alt" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  //background-color: #e34232;
  height: 70vh;
}

.left-content {
  flex: 1;
  max-width: 600px;
  padding-right: 20px;
  margin-top: 10vh;
}

.signup-text {
  color: #0066ff;
  font-weight: bold;
  margin-bottom: 30px;
}

.main-title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 1.2;
}

.description {
  font-family: 'OCR A Std', monospace;
  font-size: 15px;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 60px;
}

.right-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
}

.right-content img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
  }

  .left-content,
  .right-content {
    max-width: 100%;
    padding: 0;
  }
}
</style>
<script setup lang="ts">
import { alt } from '@/common/gloableVariable.js'
import { IconArrowRight } from '@arco-design/web-vue/es/icon'
</script>
