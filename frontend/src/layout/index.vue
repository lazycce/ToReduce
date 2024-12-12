<template>
  <NLayout has-sider>
    <NLayoutSider bordered style="background: #f0f3f8;;padding: 42px 0" width="160px">
      <Version />
      <NavBar />
      <Logo />
    </NLayoutSider>
    <NLayoutContent class="relative">
      <TitleBar />
      <AppMain />
    </NLayoutContent>
  </NLayout>
</template>
<script setup>
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui';
import NavBar from './components/NavBar.vue';
import AppMain from "./components/AppMain.vue";
import TitleBar from "@/components/global/TitleBar.vue";
import Logo from './components/Logo.vue';
import Version from './components/Version.vue'
</script>
<style lang="less">
.n-layout {
  height: 100%;
}
</style>
