<template>
  <NModal to="body" v-model:show="showModal" @close="handleClose">
    <NCard
      style="width: 350px"
    >
      <NForm
        ref="formRef"
        :model="form"
        label-placement="left"
        label-width="auto"
        size="small"
        :rules="rules"
      >
        <NFormItem label="选择文件" path="content">
          <NUpload
            :max="1"
            response-type="blob"
            accept=".txt"
            :show-file-list="true"
            :on-change="handleFileChange"
          >
            <NButton size="small" type="primary">
              <template #icon>
                <n-icon><Add /></n-icon>
              </template>
            </NButton>
          </NUpload>
        </NFormItem>
        <NFormItem label="小说名称" path="name">
          <NInput v-model:value="form.name" placeholder="请输入小说名称" />
        </NFormItem>
        <NFormItem label="文件编码" path="contentType">
          <NRadioGroup v-model:value="form.contentType" @change="handleContentTypeChange">
            <NSpace>
              <NRadioButton value="GBK">
                GBK
              </NRadioButton>
              <NRadioButton value="UTF-8">
                UTF-8
              </NRadioButton>
            </NSpace>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="内容预览">
          <div class="preview">{{ previewContent }}</div>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="center">
          <NButton :loading="loading" type="primary" @click="handleSave()">确 定</NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>
<script setup>
import { ref } from 'vue';
import {NButton, NCard, NForm, NFormItem, NInput, NModal, NRadioButton, NRadioGroup, NSpace} from "naive-ui";
import {Add} from "@vicons/ionicons5";
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import _ from 'lodash';

const emits = defineEmits(['success'])

const showModal = ref(false);
const form = ref({
  name: '',
  type: '',
  content: '',
  contentType: 'GBK',
  progress: 0,
});
const previewContent = ref('');

const handleAddNovel = async () => {
  await ipc.invoke(ipcApiRoute.addNovel, _.cloneDeep(form.value));
  showModal.value = false;
  emits('success');
}

const loading = ref(false);
const fileList = ref([]);
const fileBlob = ref(null);

const formRef = ref();
const handleSave = () => {
  formRef.value?.validate((errors) => {
    if (errors) return;
    handleAddNovel();
  })
}

const show = () => {
  showModal.value = true
}

const handleFileChange = (data) => {
  const { file } = data;
  fileBlob.value = file;
  getTxtContent(file);
}

const getTxtContent = (file) => {
  loading.value = true
  try {
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        form.value.content =e.target.result
        previewContent.value =  e.target.result <= 200 ? e.target.result : e.target.result.substring(0, 200);
      };
      reader.readAsText(file.file, form.value.contentType);
      form.value.name = file.file.name.replace('.txt', '')
    }
  } finally {
    loading.value = false
  }
}

const handleContentTypeChange = () => {
  getTxtContent(fileBlob.value)
}

const handleClose = () => {
  form.value = {
    name: '',
    type: '',
    content: '',
    contentType: 'GBK',
    progress: 0,
  }
  loading.value = false;
}


const rules =  {
  name: {
    required: true,
    message: '请输入小说名称',
    trigger: 'blur'
  },
  content: {
    required: true,
    message: '请选择txt文件',
    trigger: 'change'
  },
  contentType: {
    required: true,
    message: '请选择文件编码',
    trigger: 'change'
  }
}

defineExpose({
  show
})
</script>
<style lang="less" scoped>
.preview {
  white-space: pre-wrap;
  background: #eee;
  overflow: auto;
  height: 60px;
}
</style>
