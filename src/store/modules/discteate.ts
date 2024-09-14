import { createDiscreteApi } from 'naive-ui';
export const useDiscteate = defineStore('discteate', () => {
  const api = createDiscreteApi(['message', 'notification']);
  const useMsg = (
    content: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => {
    api.message[type](content);
  };
  return { useMsg };
});
