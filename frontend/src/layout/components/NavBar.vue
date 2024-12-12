<template>
  <n-menu
    v-model:value="currentMenuKey"
    :options="menuOptions"
    width="60"
  />
</template>

<script setup>
import { h, ref, watch } from "vue";
import { NIcon } from "naive-ui";
import { Settings, Book, HappySharp, Accessibility } from "@vicons/ionicons5";
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const currentMenuKey = ref('');

watch(() => route.name, (name) => {
  currentMenuKey.value = name
}, {
  immediate: true
})

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home'
          }
        },
        { default: () => '娱乐区域' }
      ),
    key: 'home',
    icon: renderIcon(HappySharp)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'study'
          }
        },
        { default: () => '学习区域' }
      ),
    key: 'study',
    icon: renderIcon(Book)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'read'
          }
        },
        { default: () => '小说区域' }
      ),
    key: 'read',
    icon: renderIcon(Accessibility)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'settings'
          }
        },
        { default: () => '高级设置' }
      ),
    key: 'settings',
    icon: renderIcon(Settings)
  }
];
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    min-height: 100vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
