<script setup lang="ts">
import StatisticCard from '@/components/MainView/statistics/components/StatisticCard.vue'
import { trendingColumns, trendingData } from '@/components/MainView/statistics/data/StatisticsData'

const headerTrendingMsg = '🔥 Trending'
const headerTopMsg = '🚀 Top Gainers'
const headerRecentlyMsg = '💎 Recently Added'
</script>

<template>
  <div style="display: flex; flex-direction: row; justify-content: center">
    <a-card
      style="
        height: 330px;
        width: 98%;
        border-radius: 5px;
        border: 1px solid rgb(244, 244, 244);
        box-shadow: 1px 1px 5px 0 #b5b2b2;
      "
    >
      <div style="display: flex; flex-direction: row">
        <StatisticCard
          :headerMsg="headerTrendingMsg"
          :columns="trendingColumns"
          :data="trendingData"
        />
        <StatisticCard :headerMsg="headerTopMsg" :columns="trendingColumns" :data="trendingData" />
        <StatisticCard
          :headerMsg="headerRecentlyMsg"
          :columns="trendingColumns"
          :data="trendingData"
        />
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.card-style {
  width: 360px;
  height: 300px;
  margin: 20px;
}
</style>
