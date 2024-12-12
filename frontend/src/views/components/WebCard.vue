<template>
  <div v-for="(item, index) in data" class="light-green" :key="index" @click="goWebPage(item)">
    {{ item.name }}
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  data: {
    type: Object,
    default: () => ([])
  }
})

const router = useRouter();
const goWebPage = (item) => {
  console.log('item', item)
  router.push({
    path: '/web',
    query: item
  })
  // router.push("/web?url=" + item.url)
}
</script>
<style lang="less" scoped>
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
