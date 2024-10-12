import { createDiscreteApi } from 'naive-ui';
export const useDiscteate = defineStore('discteate', () => {
  const { message, notification, loadingBar } = createDiscreteApi([
    'message',
    'notification',
    'loadingBar'
  ]);
  return { message, notification, loadingBar };
});
