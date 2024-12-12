<template>
  <n-config-provider :theme="null">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="web">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { darkTheme } from 'naive-ui';
export default {
  name: 'App',
  setup() {
    document.getElementById('loadingPage').remove()
    return {
      darkTheme
    }
  }
}
</script>
<style lang="less">
.n-config-provider {
  height: 100%;
}
</style>
