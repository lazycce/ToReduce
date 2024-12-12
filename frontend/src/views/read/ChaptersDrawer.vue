<template>
  <NDrawer v-model:show="active" placement="bottom">
    <NDrawerContent title="章节">
      <NVirtualList :item-size="24" :items="chapterList">
        <template #default="{ item }">
          <div class="item" @click="handleSelect(item)">
            {{ item }}
          </div>
        </template>
      </NVirtualList>
    </NDrawerContent>
  </NDrawer>
</template>
<script setup>
import { ref } from 'vue';
import { NVirtualList, NDrawer, NDrawerContent } from 'naive-ui';

const emits = defineEmits('select');

const props = defineProps({
  chapterList: {
    type: Array,
    default: () => ([])
  }
})

const active = ref(false);

const show = () => {
  active.value = true
}

const handleSelect = (item) => {
  emits('select', item);
  active.value = false;
}

defineExpose({
  show
})
</script>
<style lang="less" scoped>
.item {
  cursor: pointer;
  height: 24px;
  padding: 6px;
  border-bottom: 1px solid #eee;
}

</style>
