<template>
  <div @contextmenu.prevent="handleShowMenu" v-for="(item, index) in data" class="light-green" :key="index" @click="goWebPage(item)">
    {{ item.name }}
  </div>
  <NDropdown
    placement="bottom-start"
    trigger="manual"
    :x="menuPosition.x"
    :y="menuPosition.y"
    :options="options"
    :show="showMenu"
    @select="handleMenuSelect"
    @clickoutside="showMenu = false"
  />
</template>
<script setup>
import { useRouter } from 'vue-router';
import { NDropdown, NIcon } from 'naive-ui';
import { ref, nextTick, h } from 'vue';
import { TrashOutline, CreateOutline } from '@vicons/ionicons5';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';

const props = defineProps({
  data: {
    type: Object,
    default: () => ([])
  }
})

function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const showMenu = ref(false);
const menuPosition = ref({
  x: 0,
  y: 0
});

const handleShowMenu = (e) => {
  e.preventDefault()
  showMenu.value = false
  nextTick().then(() => {
    showMenu.value = true
    menuPosition.value.x = e.clientX
    menuPosition.value.y = e.clientY
  })
}
const removeKey = 'remove';
const editKey = 'edit';

const handleMenuSelect = (key) => {
  if (key === removeKey) {
    ipc.invoke(ipcApiRoute.removeWeb)
  } else {

  }
}

const options = [
  {
    label: '编辑',
    key: editKey,
    icon: renderIcon(CreateOutline)
  },
  {
    label: '删除',
    key: removeKey,
    icon: renderIcon(TrashOutline)
  }
];

const router = useRouter();
const goWebPage = (item) => {
  router.push({
    path: '/web',
    query: item
  })
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
