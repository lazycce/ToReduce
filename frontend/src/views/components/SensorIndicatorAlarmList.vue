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
import { ref, watch, nextTick } from 'vue';
import { h } from 'vue';
import { NButton } from 'naive-ui';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { getSensorWarningData } from '@/api/api';
const { shell } = require('electron');

const props = defineProps({
  active: Boolean
});

const data = ref([]);
let lastKeys = [];

// 处理浏览器跳转
const play = (row) => {
  // 构建URL，这里假设有一个基础URL
  const url = `https://test02.ui.piccadilly.int.proaimltd.com.cn:30443/healthManagement/indicator/indicatorAlarmDetail?id=${row.id}&type=detail`
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

const page = ref(1);

const queryParams = ref({
  indicatorName: '',
  alarmCategories: []
})

let timer = null;

const handleQuery = async () => {
  // 计算今天零点和当前时间戳
  const now = Date.now();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startTs = today.getTime();
  const endTs = now;

  // 传递参数
  const res = await getSensorWarningData({ startTs, endTs });
  if (res.code === 200) {
    // 标记新数据
    const newKeys = res.data.map(item => item.warningTs);
    res.data.forEach(item => {
      item.isNew = !lastKeys.includes(item.warningTs);
    });
    lastKeys = newKeys;
    if (res.data.length > 0 && data.value.length > 0) {
      if (res.data[0].warningTs !== data.value[0].warningTs) {
        await ipc.invoke(ipcApiRoute.showWindow);
      }
    }
    data.value = res.data;
  }
};

const startQueryTimer = () => {
  handleQuery();
  timer = setInterval(() => {
    handleQuery();
  }, 2 * 1000);
};

const stopQueryTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

watch(
  () => props.active,
  (val) => {
    if (val) {
      startQueryTimer();
    } else {
      stopQueryTimer();
    }
  },
  { immediate: true }
);




const getRowProps = (row) => {
  let cls = '';
  if (row.isNew) cls += ' row-new';
  return { class: cls };
};
</script>
<style lang="less">
.row-new > td {
  background: #ffeded !important;
  transition: background 0.5s;
}
</style>
