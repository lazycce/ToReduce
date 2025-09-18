<template>
  <n-data-table
      max-height="300px"
      size="small"
      :columns="columns"
      :data="data"
      :bordered="true"
      :row-props="getRowProps"
  />
</template>
<script setup lang="jsx">
import { h } from 'vue';
import { NButton } from 'naive-ui';
const { shell } = require('electron');

defineProps({
  data: {
    type: Array,
    default: () => []
  },
  getRowProps: {
    type: Function,
    default: () => {}
  }
});

// 处理浏览器跳转
const play = (row) => {
  // 构建URL，这里假设有一个基础URL
  const url = `http://10.1.235.70:30511`
  shell.openExternal(url);
};

// 时间戳格式化函数
function formatTimestamp(ts) {
  if (!ts) return '';
  const date = new Date(ts);
  const pad = n => n.toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

const columns = [
  {
    title: '序号',
    width: 50,
    render(row, index) {
      return index + 1;
    }
  },

  {
    title: '部件',
    key: 'componentName'
  },
  {
    title: '生产设备',
    key: 'equipmentName'
  },
  {
    title: '测点位置',
    key: 'locationName'
  },
  {
    title: '异常描述',
    key: 'warningDescWW'
  },
  {
    title: '异常时间',
    key: 'warningTs',
    render(row) {
      return formatTimestamp(row.warningTs);
    }
  },
  {
    title: '操作',
    width: 80,
    key: 'length',
    render(row) {
      return h(
        NButton,
        {
          quaternary: true,
          size: 'small',
          type: 'primary',
          onClick: () => {
            play(row);
          }
        },
        { default: () => '查看' }
      )
    }
  },
]
</script>
<style lang="less">
.row-new > td {
  background: #f8d7da !important;
  transition: background 0.5s;
}
</style>
