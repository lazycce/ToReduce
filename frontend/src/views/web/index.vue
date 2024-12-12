<template>
  <div style="height: 100%">
    <TitleBar>
      <template #right-action>
        <NIcon size="22" @click="handleOpenModal()">
          <Star />
        </NIcon>
      </template>
    </TitleBar>
    <div class="web-container">
      <div class="web-content">
        <webview
          v-if="url"
          ref="webviewRef"
          allowfullscreen
          :src="url"
          :plugins="true"
          style="width: 100%;height: 100%"
          :useragent="useragentMap[form.showType]"
        />
      </div>
    </div>
    <EditModal :data="form" ref="editModalRef" />
  </div>
</template>
<script setup>
import { ref, onActivated, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import TitleBar from "@/components/global/TitleBar.vue";
import { NIcon } from "naive-ui";
import { Star } from "@vicons/ionicons5";
import EditModal from "@/views/web/EditModal.vue";

const useragentMap = {
  pc: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
  phone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
}

const route = useRoute();

const webviewRef = ref();
const url = ref("");
const setWinSize = (type) => {
  ipc.invoke(ipcApiRoute.setWindowSizeByType, {
    type
  })
}

const form = ref({
  name: '',
  url: '',
  category: 'entertainment'
});

watch(() => route.query.url, (newValue = '') => {
  url.value = '';
  setTimeout(() => {
    url.value = newValue;
    form.value.url = newValue;
  }, 500)
}, {
  immediate: true
})

const webItems = ref([]);
const handleQueryWebList = async () => {
  webItems.value = await ipc.invoke(ipcApiRoute.selectWebList, {
    category: "study"
  })
}

const editModalRef = ref();
const handleOpenModal = () => {
  editModalRef.value.show(form.value);
}

onActivated(() => {
  handleQueryWebList();
  console.log("route.query", route.query)
  form.value = route.query
  setWinSize(route.query.showType);
})
</script>
<style lang="less">
.svg {
  cursor: pointer;
}
.web-container {
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  .top-actions {
    flex-shrink: 0;
  }
  .web-content {
    flex-grow: 1;
  }
}
</style>
