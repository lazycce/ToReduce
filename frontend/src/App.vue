<template>
  <n-message-provider>
    <router-view />
    <div v-if="isAlarming" class="alarm-clear-container">
      <img src="@/assets/images/sound.svg" @click="clearAlarm" class="alarm-icon" alt="Clear Alarm" />
    </div>
  </n-message-provider>

</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import alarmSound from '@/assets/statics/alarm.mp3';
import { ipc } from '@/utils/ipcRenderer';
import { ipcApiRoute } from '@/api/main';

const appStore = useAppStore();
const isAlarming = computed(() => appStore.isAlarming);
const audio = ref(new Audio(alarmSound));
audio.value.loop = true;

onMounted(() => {
  // if (import.meta.env.PROD) {
  // }
  ipc.invoke(ipcApiRoute.setAutoLaunch, true);

});

watch(isAlarming, async (newVal) => {
  if (newVal) {
    await ipc.invoke(ipcApiRoute.showWindow);
    audio.value.play().catch(e => console.error('Audio play failed:', e));
  } else {
    audio.value.pause();
    audio.value.currentTime = 0;
  }
});

const clearAlarm = () => {
  appStore.setAlarming(false);
};
</script>

<style>
.alarm-clear-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.alarm-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
