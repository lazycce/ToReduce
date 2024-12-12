<template>
  <NModal to="body" v-model:show="showModal">
    <NCard
      style="width: 350px"
    >
      <NForm
        ref="formRef"
        :model="form"
        label-placement="left"
        label-width="auto"
        :rules="rules"
      >
        <NFormItem label="站点名称" path="name">
          <NInput size="small" v-model:value="form.name" placeholder="请输入站点名称"/>
        </NFormItem>
        <NFormItem label="站点网站"  path="url">
          <NInput size="small" v-model:value="form.url" disabled placeholder="站点网站"/>
        </NFormItem>
        <NFormItem label="类型" path="showType">
          <NRadioGroup v-model:value="form.showType" size="small">
            <NSpace>
              <NRadioButton value="pc">
                电脑
              </NRadioButton>
              <NRadioButton value="phone">
                手机
              </NRadioButton>
            </NSpace>
          </NRadioGroup>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="center">
          <NButton type="primary" @click="handleAddWeb()">收 藏</NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>
<script setup>
import { NCard, NForm, NFormItem, NInput, NModal, NRadioButton, NRadioGroup, NSpace } from "naive-ui";
import { ref } from "vue";
import { ipc } from "@/utils/ipcRenderer";
import { ipcApiRoute } from "@/api/main";
import _ from 'lodash';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const showModal = ref(false);
const form = ref({
  name: '',
  url: '',
  showType: 'phone',
  category: 'entertainment'
});
const show = (data) => {
  showModal.value = true;
  form.value = data;
}

const formRef = ref();
const handleAddWeb = () => {
  formRef.value?.validate((errors) => {
    if (errors) return;
    ipc.invoke(ipcApiRoute.addWeb, _.cloneDeep(form.value))
    showModal.value = false;
  })
}

const rules = {
  name: {
    required: true,
    message: '请输入站点名称',
    trigger: 'blur'
  },
  showType: {
    required: true,
    message: '请选择展示尺寸',
    trigger: 'change'
  }
};

defineExpose({
  show
})
</script>
