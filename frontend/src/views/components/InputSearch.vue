<template>
  <div>
    <NInputGroup>
      <NInput @keyup.enter.native="handleSearch()" placeholder="请输入网址" :style="{ width: '60%' }" v-model:value="value" />
      <NButton type="primary" @click="handleSearch()">
        搜索
      </NButton>
    </NInputGroup>
  </div>
</template>
<script setup>
import {NButton, NInput, NInputGroup} from "naive-ui";
import { ref } from 'vue';

const value = ref('');
const emits = defineEmits(['search', 'add'])

const handleSearch = () => {
  emits('search', value.value)
}

const handleAdd = () => {
  emits('add', value.value)
}
</script>
