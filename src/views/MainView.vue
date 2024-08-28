<template>
  <div>
    <div class="content" ref="startRef" :style="{ height: startHeight + 'px' }">
      <ShowStart v-if="showStartComponent" ref="showStartRef" @mounted="onStartComponentMounted" />
    </div>
    <div class="content" ref="statisticsRef" :style="{ height: statisticsHeight + 'px' }">
      <Statistics
        v-if="showStatisticsComponent"
        ref="showStatisticsRef"
        @mounted="onStatisticComponentMounted"
      ></Statistics>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import ShowStart from '@/components/MainView/ShowStart.vue'
import Statistics from '@/components/MainView/Statistics.vue'

// 用于 IntersectionObserver
const startRef = ref(null)
const statisticsRef = ref(null)
// 引用 ShowStart 组件
const showStartRef: any = ref(null)
const showStatisticsRef: any = ref(null)
// 控制 ShowStart 组件的显示/隐藏
const showStartComponent = ref(false)
const showStatisticsComponent = ref(false)
// 控制内容区域的高度
const startHeight = ref(610)
const statisticsHeight = ref(718)
// 标记是否是首次加载
const isStartFirstLoad = ref(true)
const isStatisticsFirstLoad = ref(true)

// 存储 IntersectionObserver 实例
let observerStart: any = null
let observerStatistics: any = null
/**
 * 当 ShowStart 组件挂载后调用此函数
 */
const onStartComponentMounted = async () => {
  // 可以确保在执行后续代码之前，Vue 已经完成了 DOM 的更新，可以保证最新的 DOM 状态
  await nextTick()
  // 等待下一个 DOM 更新周期，然后设置 startHeight 为 ShowStart 组件的实际高度
  // .$el 是指该组件的根 DOM 元素，也就是 ShowStart 组件的 div 标签 （container）
  // .offsetHeight 一个 DOM 属性，返回元素的高度，包括垂直内边距和边框
  startHeight.value = showStartRef.value.$el.offsetHeight
  console.log('UnMounted startHeight', startHeight.value)
}

/**
 * 当 ShowStart 组件挂载后调用此函数
 */
const onStatisticComponentMounted = async () => {
  await nextTick()
  statisticsHeight.value = showStatisticsRef.value.$el.offsetHeight
  console.log('UnMounted statisticsHeight', statisticsHeight.value)
}
/**
 * IntersectionObserver 的回调函数
 * @function 作用：当观察的目标元素进入或离开视口（或指定的根元素）时，这个函数会被调用。它接收一个 IntersectionObserverEntry 对象数组作为参数，每个对象包含了目标元素的交叉状态信息。
 * @param entries
 */
const handleStartIntersection = (entries: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      if (!showStartComponent.value) {
        showStartComponent.value = true
      }
    } else {
      if (showStartComponent.value) {
        showStartComponent.value = false
        // 当组件离开视图时，保持高度不变
      }
    }
  })
}

/**
 * IntersectionObserver 的回调函数
 * @param entries
 */
const handleStatisticsIntersection = (entries: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      if (!showStatisticsComponent.value) {
        showStatisticsComponent.value = true
      }
    } else {
      if (showStatisticsComponent.value) {
        showStatisticsComponent.value = false
        // 当组件离开视图时，保持高度不变
      }
    }
  })
}
/**
 * @function new IntersectionObserver
 * @param handleStartIntersection 回调函数，交叉状态变化时调用
 * @param options
 * @param rootMargin 提前 50px（各个方向）触发交叉检测
 * @param threshold 当目标元素有 10% 进入视口时，就会触发回调
 * 优点：IntersectionObserver 的主要优点是它是异步和高效的，不会阻塞主线程，适合用于实现懒加载、无限滚动等功能。
 */
onMounted(async () => {
  showStartComponent.value = true
  showStatisticsComponent.value = true

  while (startHeight.value === 0) {
    await nextTick()
    startHeight.value = showStartRef.value.$el.offsetHeight
    console.log('onMounted showStartRef1', startHeight.value)
    showStartComponent.value = false
    isStartFirstLoad.value = false
  }
  //
  while (statisticsHeight.value === 0) {
    await nextTick()
    statisticsHeight.value = showStatisticsRef.value.$el.offsetHeight
    console.log('onMounted showStatisticsRef1', statisticsHeight.value)
    showStatisticsComponent.value = false
    isStatisticsFirstLoad.value = false
  }

  // IntersectionObserver 是一个浏览器 API，用于异步观察目标元素与视口（或指定根元素）的交叉状态变化。
  observerStart = new IntersectionObserver(handleStartIntersection, {
    rootMargin: '50px',
    threshold: 0.1
  })
  observerStatistics = new IntersectionObserver(handleStatisticsIntersection, {
    rootMargin: '50px',
    threshold: 0.1
  })
  // 创建 observerStart 后，开始观察指定的 DOM 元素
  observerStart.observe(startRef.value)
  observerStatistics.observe(statisticsRef.value)

  // 预加载内容高度
  // if (isStartFirstLoad.value) {
  //   showStartComponent.value = true
  //   await nextTick()
  //   startHeight.value = showStartRef.value.$el.offsetHeight
  //   console.log('onMounted showStartRef1', startHeight.value)
  //   showStartComponent.value = false
  //   isStartFirstLoad.value = false
  // }
  // if (isStatisticsFirstLoad.value) {
  //   showStatisticsComponent.value = true
  //   await nextTick()
  //   statisticsHeight.value = showStatisticsRef.value.$el.offsetHeight
  //   console.log('onMounted showStatisticsRef1', statisticsHeight.value)
  //   showStatisticsComponent.value = false
  //   isStatisticsFirstLoad.value = false
  // }
})

onUnmounted(() => {
  if (observerStart) observerStart.disconnect()
  if (observerStatistics) observerStatistics.disconnect()
})
</script>

<style scoped lang="scss">
.content {
  transition: height 0.3s ease;
}
</style>
