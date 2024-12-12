<template>
  <div class="app-container">
    <NSpace reverse style="width: 100%;margin-bottom: 8px">
      <NButton circle type="primary" @click="handleEdit()">
        <template #icon>
          <n-icon><Add /></n-icon>
        </template>
      </NButton>
    </NSpace>
    <NVirtualList class="list-container" :item-size="42" :items="novelList" padding-top="4" padding-bottom="4">
      <template #default="{ item }">
        <div class="item-wrapper" :key="item.id">
          <div class="item" @click="goDetailPage(item)">
            <div class="title">
              <span>{{item.no}}. </span>
              <span>{{ item.name }}</span>
            </div>
           <div>
             <n-progress
               style="width: 180px"
               type="line"
               :percentage="item.progress"
               :height="12"
               :show-indicator="false"
               :border-radius="4"
               :fill-border-radius="0"
             />
           </div>
          </div>
        </div>
      </template>
    </NVirtualList >
    <EditModal ref="editModalRef" @success="handleQueryNovelList()" />
  </div>
</template>
<script setup>
import {onActivated, ref} from 'vue';
import { NButton, NVirtualList, NSpace } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import EditModal from "@/views/read/EditModal.vue";

const router = useRouter();

const goDetailPage = (item) => {
  router.push({
    name: 'readDetail',
    query: {
      data: JSON.stringify(item)
    }
  })
}

const novelList = ref([]);
const handleQueryNovelList = async () => {
  const res = await ipc.invoke(ipcApiRoute.selectNovelList)
  novelList.value = res.reverse().map((item, index) => {
    return {
      no: index + 1,
      ...item
    }
  })
}

const editModalRef = ref();
const handleEdit = () => {
  editModalRef.value.show()
}

onActivated(() => {
  handleQueryNovelList();
})
</script>
<style lang="less" scoped>
.list-container {
  height: 340px;
  background: #eee;
}
.item-wrapper {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 6px 14px;
  .item {
    .title {
      font-weight: bold;
    }
    cursor: pointer;
    flex: 1;
    padding: 8px 14px;
    background: #f5f7f9;
    border-radius: 4px;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
