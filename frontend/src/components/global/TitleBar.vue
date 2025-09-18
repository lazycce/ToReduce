<template>
  <div class="title-bar">
    <NSpace justify="space-between" size="large">
      <div style="font-weight: bold">智慧检修决策支持-报警通知</div>
      <NSpace>
        <slot name="right-action"></slot>
        <!-- <NIcon @click="handleChangeOnTop" title="置顶" size="22" :color="appStore.windowAlwaysOnTop ? '#0e7a0d' : ''">
          <Pin />
        </NIcon> -->
        <NIcon size="22">
          <SettingsOutline @click="handleShowSetting" />
        </NIcon>
        <NIcon size="22" @click="handleHideWindow">
          <CloseOutline />
        </NIcon>
      </NSpace>
    </NSpace>
    <n-modal v-model:show="showModal">
      <n-card
          style="width: 400px"
          title="配置"
          :bordered="false"
          role="dialog"
          aria-modal="true"
      >
        <n-form
            ref="formRef"
            :label-width="80"
            :model="form"
            size="small"
            :rules="rules"
        >
          <n-form-item label="账号" path="username">
            <n-input v-model:value="form.username" maxlength="64" placeholder="输入账号" />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input show-password-on="mousedown" maxlength="64" type="password" v-model:value="form.password" placeholder="输入密码" />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button size="small" type="primary" @click="handleConfirm">
              确 认
            </n-button>
            <n-button size="small" @click="handleCancel">
              取消
            </n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup>
import { NIcon, NSpace , useMessage } from 'naive-ui';
import {
  CloseOutline,
  SettingsOutline,
  Pin,
} from '@vicons/ionicons5';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { h, ref } from 'vue';
import { useAppStore } from '@/store/app';
import _ from 'lodash';

const appStore = useAppStore();
const formRef = ref();
const form = ref({
  username: '',
  password: ''
});

const rules = {
  username: {
    required: true,
    message: '必填',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '必填',
    trigger: 'blur'
  }
}

const handleChangeOnTop = async () => {
  ipc.invoke(ipcApiRoute.setWindowAlwaysOnTop, { flag: !appStore.windowAlwaysOnTop})
  appStore.setWindowAlwaysOnTop(!appStore.windowAlwaysOnTop);
}

const handleHideWindow = () => {
  ipc.invoke(ipcApiRoute.hideWindow);
}

function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const active = ref(false);
const showModal = ref(false);
const handleShowSetting = () => {
  form.value = {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
  }
  showModal.value = true;

}

const message = useMessage();
const handleConfirm = () => {
  formRef.value.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await ipc.invoke(ipcApiRoute.login, _.cloneDeep(form.value));
        console.log('res', res)
        localStorage.setItem('username', form.value.username);
        localStorage.setItem('password', form.value.password);
        showModal.value = false;
        message.success('配置成功');
      } catch (e) {
        message.error('账号或密码错误');
      }
    }
  })
}

const handleCancel = () => {
  showModal.value = false;
}

</script>
<style lang="less">
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
  background: #eee;
}
</style>
