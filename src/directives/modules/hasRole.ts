import type { Directive } from 'vue';
import { useUserStore } from '@/store/modules/user';

/**
 * @author: 骚风
 * @description: 权限指令
 * @param {Function} el 指令所绑定的元素，可以用来直接操作 DOM。
 * @param {Object} binding 指令所绑定的值，一个对象，包含以下属性：
 * value：指令的绑定值，例如 v-hasRole="['admin']" 中的 ['admin']；
 * oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用；
 * arg：传给指令的参数，例如 v-hasRole:admin 中的 'admin'；
 * modifiers：一个包含修饰符的对象。例如：v-hasRole.foo.bar 中的 { foo: true, bar: true }；
 * expression：字符串形式的指令表达式。例如 v-hasRole="['admin']" 中的 '['admin']'；
 * arg：传给指令的参数，例如 v-hasRole:admin 中的 'admin'；
 * @description: 权限指令
 * */

export const hasRole: Directive = {
  mounted: function (el: HTMLElement, binding) {
    const roleFlag = binding.value;
    const userStore = useUserStore();
    const { roles } = userStore;
    if (roleFlag && roleFlag instanceof Array) {
      const hasRoles = roles.some((item) => {
        return roles.includes(item);
      });
      if (!hasRoles) {
        el.parentNode?.removeChild(el);
      }
    } else {
      throw new Error(
        `角色值类型【Array<T>】不匹配，请设置操作正确的角色标签值`
      );
    }
  }
};
