import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isAlarming: false,
  }),
  actions: {
    setAlarming(isAlarming) {
      this.isAlarming = isAlarming;
    },
  },
});
