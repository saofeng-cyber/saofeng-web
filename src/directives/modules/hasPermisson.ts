import type { Directive } from 'vue';
import { useUserStore } from '@/store/modules/user';

/**
 * 权限判断指令
 * v-has-permission="['admin']"
 */
export const hasPermission: Directive = {
  mounted: function (el: HTMLElement, binding) {
    const permissionFlag = binding.value;
    const userStore = useUserStore();
    const { permissionsList } = userStore;
    if (permissionFlag && permissionFlag instanceof Array) {
      const hasPermissions = permissionsList.some((item) => {
        return permissionFlag.includes(item);
      });
      if (!hasPermissions) {
        el.parentNode?.removeChild(el);
      }
    } else {
      throw new Error(
        `权限值类型【Array<T>】不匹配，请设置操作正确的权限标签值`
      );
    }
  }
};
