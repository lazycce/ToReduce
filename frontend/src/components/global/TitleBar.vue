<template>
  <div v-if="hidden" class="hidden-title-bar"></div>
  <div v-else class="title-bar">
    <NSpace justify="space-between" size="large" v-show="!hidden">
      <NSpace v-show="showHomeIcon()">
        <NIcon size="22" @click="goHome()">
          <ChevronBack />
        </NIcon>
        <slot name="left-action"></slot>
      </NSpace>
      <NSpace>
        <slot name="right-action"></slot>
        <NIcon @click="handleChangeOnTop" title="置顶" size="22" :color="appStore.windowAlwaysOnTop ? '#0e7a0d' : ''">
          <Pin />
        </NIcon>
        <NDropdown :options="options" :on-select="handleClickOptions">
          <NIcon size="22">
            <MenuSharp />
          </NIcon>
        </NDropdown>
        <NIcon size="22" @click="handleHideWindow">
          <CloseOutline />
        </NIcon>
      </NSpace>
    </NSpace>
  </div>
</template>
<script setup>
import { NIcon, NSpace, NDropdown } from 'naive-ui';
import {
  CloseOutline,
  MenuSharp,
  ChevronBack,
  Refresh,
  PhonePortraitOutline,
  DesktopSharp,
  BrowsersOutline,
  Pin,
} from '@vicons/ionicons5';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { h, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAppStore } from '@/store/app'

const appStore = useAppStore();

const handleChangeOnTop = async () => {
  ipc.invoke(ipcApiRoute.setWindowAlwaysOnTop, { flag: !appStore.windowAlwaysOnTop})
  appStore.setWindowAlwaysOnTop(!appStore.windowAlwaysOnTop);
}

const props = defineProps({
  hidden: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['openAddWebModal']);

const componentName = ref("");
const route = useRoute();
watch(() => route.name, (name) => {
  componentName.value = name;
}, {
  immediate: true
})

const showHomeIcon = () => {
  return ['web', 'readDetail'].includes(componentName.value)
}

const handleHideWindow = () => {
  ipc.invoke(ipcApiRoute.hideWindow);
}

const handleResetWindowSize = () => {
  ipc.invoke(ipcApiRoute.setWindowSize, {
    width: 750,
    height: 470,
  });
}

const handleClickOptions = (key) => {
  if (key === 'reset') {
    ipc.invoke(ipcApiRoute.reset, {})
  }
}

function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const router = useRouter();
const goHome = () => {
  handleResetWindowSize();
  router.back()
}

const changeOptions = [
  {
    label: '手机模式',
    key: 'phone',
    icon: renderIcon(PhonePortraitOutline)
  },
  {
    label: 'Pad模式',
    key: 'pad',
    icon: renderIcon(BrowsersOutline)
  },
  {
    label: '电脑模式',
    key: 'pc',
    icon: renderIcon(DesktopSharp)
  }
]

const options = [
  {
    label: '软件异常重置',
    key: 'reset',
    icon: renderIcon(Refresh)
  },
]
</script>
<style lang="less">
.hidden-title-bar {
  padding: 8px 12px;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  -webkit-app-region: drag; /* 允许拖动 */
}
.title-bar {
  padding: 8px 12px;
  position: sticky;
  z-index: 1000;
  top: 0;
  height: 24px;
  -webkit-app-region: drag; /* 允许拖动 */
  svg {
    cursor: pointer;
  }
}
</style>
