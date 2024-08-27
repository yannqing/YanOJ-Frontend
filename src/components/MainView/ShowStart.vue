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
          <a-button type="primary" shape="round" size="large">
            <span>Get Start</span>
            <icon-arrow-right />
          </a-button>
          <a-button
            type="outline"
            shape="round"
            size="large"
            href="https://github.com/yannqing/YanOJ-Frontend"
            target="_blank"
          >
            Download
          </a-button>
        </a-space>
      </div>
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
  align-items: center;
  overflow: hidden;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.left-content {
  flex: 1;
  max-width: 600px;
  padding-right: 20px;
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

.gradient-text {
  background: linear-gradient(
    169.4deg,
    #3984f4 -6.01%,
    #0cd3ff 36.87%,
    #2f7cf0 78.04%,
    #0e65e8 103.77%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-family: 'OCR A Std', monospace;
  font-size: 15px;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.right-content {
  flex: 1;
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
