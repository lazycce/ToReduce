<template>
  <div class="app-container">
    <NTabs type="line" animated default-value="basic">
      <NTabPane name="basic" tab="基础配置">
        <NInfiniteScroll style="height: 320px;">
          <NForm>
            <NFormItem label="开机自动启动" :label-style="{ fontWeight: 'bold' }">
              <NSwitch v-model:value="active">
                <template #checked>
                  开
                </template>
                <template #unchecked>
                  关
                </template>
              </NSwitch>
            </NFormItem>
            <NFormItem label="秒关快捷键" :label-style="{ fontWeight: 'bold' }">
              <NTag>Ctrl + Q</NTag>
            </NFormItem>
            <NFormItem label="显示/隐藏快捷键" :label-style="{ fontWeight: 'bold' }">
              <NTag>Ctrl + Tab</NTag>
            </NFormItem>
            <NFormItem label="退出专注模式快捷键" :label-style="{ fontWeight: 'bold' }">
              <NTag>Esc</NTag>
            </NFormItem>
            <NFormItem label="透明度快捷键" :label-style="{ fontWeight: 'bold' }">
              <NSpace>
                <NTag>长按降低：Ctrl + 1</NTag>
                <NTag>长按增加：Ctrl + 2</NTag>
              </NSpace>
            </NFormItem>
          </NForm>
        </NInfiniteScroll>
      </NTabPane>
      <NTabPane name="novel" tab="小说配置">
      </NTabPane>
    </NTabs>
    <Footer />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { NForm, NFormItem, NTag, NSpace, NInfiniteScroll, NTabs, NTabPane } from 'naive-ui';
import Footer from "@/components/global/Footer.vue";

const active = ref(false);
</script>
