<template>
  <div style="height: 100%;">
    <TitleBar :hidden="!showTitleBar">
      <template #right-action>
        <NIcon title="章节选择" :size="22" @click="handleOpenChaptersDrawer()">
          <Library />
        </NIcon>
        <NIcon title="专注模式" :size="22" @click="handleChangeModal()">
          <Eye />
        </NIcon>
      </template>
    </TitleBar>
    <NInfiniteScroll class="read-wrapper" :style="{ height: showTitleBar ? 'calc(100% - 42px)' : '100%' }">
        <pre class="content">
          <div v-for="item in contentList" :id="item.key">
            <div>{{ item.key }}</div>
            {{ item.content }}
          </div>
        </pre>
    </NInfiniteScroll>
    <ChaptersDrawer :chapter-list="chapters" ref="chaptersDrawerRef" @select="handleSelect" />
  </div>
</template>
<script setup>
import {onActivated, onMounted, onUnmounted, ref} from 'vue';
import { NInfiniteScroll } from 'naive-ui';
import { useRoute } from 'vue-router';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import ChaptersDrawer from "@/views/read/ChaptersDrawer.vue";
import { Library, Eye } from '@vicons/ionicons5';
const fileContent = ref('');
const chapters = ref([]);
const contentList = ref([]);

const splitNovelByChapters = (novelText) => {
  // 定义章节匹配正则
  const chapterRegex = /(第[一二三四五六七八九十百千零\d]+章\s*[^\n]*)/g;
  // 使用正则找到所有章节标题及其位置
  const matches = [];
  let match;
  while ((match = chapterRegex.exec(novelText)) !== null) {
    matches.push({
      key: match[0].trim(),
      startIndex: match.index,
    });
  }
  // 根据匹配结果拆分章节内容
  const chapters = [];
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    const content = novelText.slice(
      current.startIndex + current.key.length,
      next ? next.startIndex : undefined
    ).trim();

    chapters.push({
      key: current.key,
      content,
    });
  }

  return chapters;
}

const handleGetTxtFileContent = async (id) => {
  const res = await ipc.invoke(ipcApiRoute.getNovelDetail, {
    novelId: id
  })
  if (res && res.length > 0) {
    fileContent.value = res[0].content
    contentList.value = splitNovelByChapters(fileContent.value)
    chapters.value = contentList.value.map(i => i.key)
  }
}

const route = useRoute();
const formData = ref({});

onActivated(() => {
  formData.value = JSON.parse(route.query.data);
  handleGetTxtFileContent(formData.value.id);
})

const handleKeyDown = (key) => {
  if (key.key === 'Escape') {
    ipc.invoke(ipcApiRoute.setWindowSize, {
      width: 750,
      height: 470,
    })
    showTitleBar.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
})

const handleSelect = (item) => {
  const element = document.getElementById(item);
  element?.scrollIntoView({ behavior: 'smooth' })
}

const showTitleBar = ref(true);
const handleChangeModal = () => {
  ipc.invoke(ipcApiRoute.setWindowSize, {
    width: 300,
    height: 200
  })
  showTitleBar.value = false
}

const chaptersDrawerRef = ref();
const handleOpenChaptersDrawer = () => {
  chaptersDrawerRef.value.show();
}
</script>
<style lang="less" scoped>
.content {
  padding: 0 12px !important;
  background: #eee;
  white-space: pre-wrap;
  font-weight: bold;
}
.read-wrapper {
  position: relative;
  overflow: auto
}
</style>
