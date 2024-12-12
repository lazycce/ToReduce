<template>
  <div class="app-container">
    <InputSearch @search="goWebPage" />
    <div class="wrap">
      <WebCard :data="webItems" />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import InputSearch from "@/views/components/InputSearch.vue";
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import {onActivated, ref} from 'vue';
import WebCard from "@/views/components/WebCard.vue";
import Footer from "@/components/global/Footer.vue";

const router = useRouter();
const goWebPage = (url) => {
  if (!url) {
    return;
  }
  router.push({
    path: '/web',
    query: {
      url,
      category: 'entertainment'
    }
  })
  // router.push("/web?url=" + url + "&category=entertainment");
}

const webItems = ref([]);

const handleQueryWebList = async () => {
  webItems.value = await ipc.invoke(ipcApiRoute.selectWebList, {
    category: "entertainment"
  })
}

onActivated(() => {
  handleQueryWebList();
})

</script>
<style scoped>
.wrap {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.light-green {
  font-size: 18px;
  font-weight: bold;
  height: 108px;
  width: 108px;
  border-radius: 8px;
  background-color: rgba(0, 128, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

</style>
