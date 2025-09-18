import { ref, watch } from 'vue';
import { ipc } from '@/utils/ipcRenderer';
import { ipcApiRoute } from '@/api/main';
import _ from 'lodash';
import { useAppStore } from '@/store/app';

const isToday = (dateSource) => {
  if (!dateSource) return false;
  const date = new Date(dateSource);
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export function useAlarmList(isActive, queryFn, keyField) {
  const appStore = useAppStore();
  const data = ref([]);
  const storageKey = `lastAlarmKeys_${keyField}`;
  let lastKeys = JSON.parse(localStorage.getItem(storageKey) || '[]');
  let timer = null;

  const handleQuery = async () => {
    const res = await queryFn();
    let records = [];
    if (Array.isArray(res)) {
      records = res;
    } else if (res.records) {
      records = res.records;
    } else if (res.data) {
      records = res.data;
    }

    const newKeys = records.map(item => item[keyField]);
    const hasNew = records.some(record => !lastKeys.includes(record[keyField]));

    if (lastKeys.length > 0 && hasNew) {
      appStore.setAlarming(true);
    }

    records.forEach(item => {
      // Only mark as new if it's not the first load and is from today
      const isNewAlarm = lastKeys.length > 0 && !lastKeys.includes(item[keyField]);
      const isFromToday = isToday(item[keyField]);
      item.isNew = isNewAlarm && isFromToday;
    });

    lastKeys = newKeys;
    localStorage.setItem(storageKey, JSON.stringify(lastKeys));
    data.value = records;
  };

  const getRowProps = (row) => {
    let cls = '';
    if (row.isNew) cls += ' row-new';
    return { class: cls };
  };

  const startQueryTimer = () => {
    handleQuery();
    timer = setInterval(() => {
      handleQuery();
    }, 60 * 1000);
  };

  const stopQueryTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  watch(
    isActive,
    (val) => {
      if (val) {
        startQueryTimer();
      } else {
        stopQueryTimer();
      }
    },
    { immediate: true }
  );

  return {
    data,
    getRowProps
  };
}