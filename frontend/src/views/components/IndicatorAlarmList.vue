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
  const url = `http://10.1.235.68/healthManagement/indicator/indicatorAlarmDetail?id=${row.id}&type=detail`
  shell.openExternal(url);
};

const columns = [
  {
    title: '序号',
    width: 50,
    render(row, index) {
      return index + 1;
    }
  },
  {
    title: '分类',
     width: 100,
    key: 'alarmCategoryName',
    render(row) {
      const map = {
        'single': '	单一报警',
        'compose': '组合报警',
      }
      return map[row.alarmCategory] || row.alarmCategory;
    }
  },
  {
    title: '功能位置',
    key: 'functionLocationCode'
  },
  {
    title: '报警类型',
    key: 'alarmLevel',
     width: 80,
    render(row) {
      const map = {
        'low': '低报',
        'llow': '超低报',
        'high': '高报',
        'hhigh': '高高报',
      }
      return map[row.alarmLevel] || row.alarmLevel;
    }
  },
  {
    title: '指标',
    key: 'indicatorName'
  },
  {
    title: '报警时间',
    key: 'createTime'
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
