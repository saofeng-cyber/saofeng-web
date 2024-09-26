import type { Ref, ComputedRef } from 'vue';
import { inject, provide } from 'vue';
import type { BasicTableProps, Nullable } from '../types/table';
const key = Symbol('s-table');

type Instance = {
  wrapRef: Ref<Nullable<HTMLElement>>;
  getBindValues: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>;
};
export function createTableContext(instance: Instance) {
  provide(key, instance);
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}
