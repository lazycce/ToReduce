<template>
  <div class="app-container">
    <n-tabs v-if="show" v-model:value="activeTab" type="line" animated :lazy="false">
      <n-tab-pane name="sensor" tab="传感器报警" display-directive="show">
        <SensorIndicatorAlarmList :active="activeTab === 'sensor'" />
      </n-tab-pane>
      <n-tab-pane name="sisi" tab="健康指标报警" display-directive="show">
        <IndicatorAlarmList :active="activeTab === 'sisi'" />
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
import { ref } from 'vue';
import SensorIndicatorAlarmList from "@/views/components/SensorIndicatorAlarmList.vue";
import IndicatorAlarmList from "@/views/components/IndicatorAlarmList.vue";
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { onMounted } from 'vue';
import _ from "lodash";

const show = ref(false);
const activeTab = ref('sensor');

const handleLogin = async () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (!username) {
    return;
  }
  try {
    const res = await ipc.invoke(ipcApiRoute.login, _.cloneDeep({
      username,
      password
    }));
    if (res.code === null) {
      show.value = true;
    }
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  handleLogin()
})
</script>
<style scoped>
</style>
