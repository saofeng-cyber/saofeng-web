import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';

import { createPinia } from 'pinia';
import type { App } from 'vue';

export const usePinia = (app: App<Element>) => {
  const pinia = createPinia();
  const installPersistedStatePlugin = createPersistedStatePlugin({
    persist: false // 是否持久化
  });
  pinia.use(installPersistedStatePlugin);
  app.use(pinia);
};
