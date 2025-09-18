<template>
  <NLayout has-sider>
    <NLayoutContent class="relative">
      <TitleBar />
      <AppMain style="margin-top: 10px" />
    </NLayoutContent>
  </NLayout>
</template>
<script setup>
import { NLayout, NLayoutContent } from 'naive-ui';
import AppMain from "./components/AppMain.vue";
import TitleBar from "@/components/global/TitleBar.vue";
</script>
<style lang="less">
.n-layout {
  height: 100%;
}
</style>
