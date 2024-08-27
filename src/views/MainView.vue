<template>
  <div>
    <div class="content" ref="contentRef" :style="{ height: contentHeight + 'px' }">
      <ShowStart v-if="showComponent" ref="showStartRef" @mounted="onComponentMounted" />
    </div>
    <div style="height: 200vh; background-color: #0cd3ff">x</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import ShowStart from '@/components/MainView/ShowStart.vue'

// 用于 IntersectionObserver
const contentRef = ref(null)
// 引用 ShowStart 组件
const showStartRef = ref(null)
// 控制 ShowStart 组件的显示/隐藏
const showComponent = ref(false)
// 控制内容区域的高度
const contentHeight = ref(0)
// 标记是否是首次加载
const isFirstLoad = ref(true)

// 存储 IntersectionObserver 实例
let observer = null
/**
 * 当 ShowStart 组件挂载后调用此函数
 */
const onComponentMounted = async () => {
  // 可以确保在执行后续代码之前，Vue 已经完成了 DOM 的更新，可以保证最新的 DOM 状态
  await nextTick()
  // 等待下一个 DOM 更新周期，然后设置 contentHeight 为 ShowStart 组件的实际高度
  // .$el 是指该组件的根 DOM 元素，也就是 ShowStart 组件的 div 标签 （container）
  // .offsetHeight 一个 DOM 属性，返回元素的高度，包括垂直内边距和边框
  contentHeight.value = showStartRef.value.$el.offsetHeight
}
/**
 * IntersectionObserver 的回调函数
 * @function 作用：当观察的目标元素进入或离开视口（或指定的根元素）时，这个函数会被调用。它接收一个 IntersectionObserverEntry 对象数组作为参数，每个对象包含了目标元素的交叉状态信息。
 * @param entries
 */
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!showComponent.value) {
        showComponent.value = true
      }
    } else {
      if (showComponent.value) {
        showComponent.value = false
        // 当组件离开视图时，保持高度不变
      }
    }
  })
}
/**
 * @function new IntersectionObserver
 * @param handleIntersection 回调函数，交叉状态变化时调用
 * @param options
 * @param rootMargin 提前 50px（各个方向）触发交叉检测
 * @param threshold 当目标元素有 10% 进入视口时，就会触发回调
 * 优点：IntersectionObserver 的主要优点是它是异步和高效的，不会阻塞主线程，适合用于实现懒加载、无限滚动等功能。
 */
onMounted(async () => {
  // IntersectionObserver 是一个浏览器 API，用于异步观察目标元素与视口（或指定根元素）的交叉状态变化。
  observer = new IntersectionObserver(handleIntersection, {
    rootMargin: '50px',
    threshold: 0.1
  })
  // 创建 observer 后，开始观察指定的 DOM 元素
  observer.observe(contentRef.value)

  // 预加载内容高度
  if (isFirstLoad.value) {
    showComponent.value = true
    await nextTick()
    contentHeight.value = showStartRef.value.$el.offsetHeight
    showComponent.value = false
    isFirstLoad.value = false
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped lang="scss">
.content {
  transition: height 0.3s ease;
}
</style>
