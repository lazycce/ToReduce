<template>
  <div class="top-action">
    <NSlider v-model:value="opacity" :on-update:value="handleChange"/>
    <span @click="handleBackHome">返回</span>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/store/app'
import { NSlider } from 'naive-ui';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { useRouter } from 'vue-router';

const appstore = useAppStore();
const opacity = ref(appstore.windowOpacity);

const handleChange = (value) => {
  opacity.value = value;
  ipc.invoke(ipcApiRoute.setWindowOpacity, { opacity: value / 100 });
  appstore.setWindowOpacity(value);
}

const router = useRouter();
const handleBackHome = () => {
  ipc.invoke(ipcApiRoute.setWindowSize, {
    width: 750,
    height: 470,
  })
  router.push("/");
}

onMounted(() => {
  opacity.value = appstore.windowOpacity;
  handleChange(opacity.value);
})
</script>
<style lang="less">
.top-action {
  display: flex;
}
</style>
