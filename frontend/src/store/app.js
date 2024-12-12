import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore('app',()=>{
    // 窗体透明度
    const windowOpacity = ref(100);

    // 窗体置顶
    const windowAlwaysOnTop = ref(false);

    const setWindowOpacity = (opacity) => {
        windowOpacity.value = opacity;
    }

    const setWindowAlwaysOnTop = (flag) => {
        windowAlwaysOnTop.value = flag;
    }

    return {
        setWindowOpacity,
        setWindowAlwaysOnTop,
        windowOpacity,
        windowAlwaysOnTop
    }
})
