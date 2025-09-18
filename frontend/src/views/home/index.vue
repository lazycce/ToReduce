<template>
  <div class="app-container">
    <!-- 
      The `lazy` attribute is not set to true because `display-directive` is 'show'.
      With 'show', the component instances are kept in the DOM even when inactive,
      so lazy loading would not provide a significant performance benefit.
    -->
    <n-tabs v-if="show" v-model:value="activeTab" type="line" animated :lazy="false">
      <n-tab-pane name="sensor" tab="传感器报警" display-directive="show">
        <SensorIndicatorAlarmList :data="sensorData" :get-row-props="sensorGetRowProps" />
      </n-tab-pane>
      <n-tab-pane name="sisi" tab="健康指标报警" display-directive="show">
        <IndicatorAlarmList :data="indicatorData" :get-row-props="indicatorGetRowProps" />
      </n-tab-pane>
    </n-tabs>
    <template v-else>
      <n-empty description="请配置账号">
        <template #extra>
          <n-button size="small" @click="handleLogin">
            刷 新
          </n-button>
        </template>
      </n-empty>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import SensorIndicatorAlarmList from "@/views/components/SensorIndicatorAlarmList.vue";
import IndicatorAlarmList from "@/views/components/IndicatorAlarmList.vue";
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { getSensorWarningData } from '@/api/api';
import { useAlarmList } from '@/composables/useAlarmList';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const show = ref(false);
const activeTab = ref('sensor');

// Sensor Alarm
const handleSensorQuery = async () => {
  const now = Date.now();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startTs = today.getTime();
  const endTs = now;
  const res = await getSensorWarningData({ startTs, endTs });
  if (res.code === 200) {
    return res.data;
  }
  return [];
};
const { data: sensorData, getRowProps: sensorGetRowProps } = useAlarmList(show, handleSensorQuery, 'warningTs');

// Indicator Alarm
const handleIndicatorQuery = async () => {
  return await ipc.invoke(ipcApiRoute.getAlarmList, {});
};
const { data: indicatorData, getRowProps: indicatorGetRowProps } = useAlarmList(show, handleIndicatorQuery, 'createTime');

watch(() => appStore.isAlarming, (isAlarming) => {
  if (!isAlarming) {
    sensorData.value.forEach(item => item.isNew = false);
    indicatorData.value.forEach(item => item.isNew = false);
  }
});

const handleLogin = async () => {
  const username = localStorage.getItem('username') || 'common';
  const password = localStorage.getItem('password') || 'PROAIMltd@2024';

  const res = await ipc.invoke(ipcApiRoute.login, {
    username,
    password
  });
  if (res.code === null) {
    show.value = true;
  }
}

onMounted(() => {
  handleLogin()
})
</script>