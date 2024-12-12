<template>
  <section class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :exclude="['readDetail']">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
  </section>
</template>
<script setup>
</script>
