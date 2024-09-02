<script setup lang="ts">
import { IconRight, IconArrowRise } from '@arco-design/web-vue/es/icon'

const props = defineProps({
  headerMsg: String,
  columns: Array,
  data: Array
})
</script>

<template>
  <div
    style="width: 30%; height: 100%; margin-right: 50px; margin-top: 10px"
    class="animate__animated animate__fadeInUp"
  >
    <div style="font-weight: bold; display: flex; justify-content: space-between">
      <span>{{ props.headerMsg }}</span>
      <router-link style="margin-right: 25px; color: #188cff; text-decoration: none" to="#"
        >More <icon-right
      /></router-link>
    </div>
    <div>
      <a-table
        :columns="columns"
        :hoverable="false"
        :data="data"
        :pagination="false"
        style="margin-top: 20px; border: 0"
      >
        <template #price>
          <div>
            <a-statistic
              :value="50.52"
              :precision="2"
              :value-style="{ color: '#0fbf60', fontSize: 'inherit' }"
            >
              <template #prefix>
                <icon-arrow-rise />
              </template>
              <template #suffix>%</template>
            </a-statistic>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
:deep(.arco-table-th) {
  background-color: transparent;
  color: gray;
  font-weight: bold;
}

:deep(.arco-table-border:not(.arco-table-border-cell) .arco-table-container) {
  border-right: 0;
}

:deep(.arco-table-border .arco-table-container) {
  border-top: 0;
  border-left: 0;
}
</style>
