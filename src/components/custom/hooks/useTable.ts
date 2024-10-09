import type { BasicTableProps } from '../types/table';

export const useCustomTable = (propsRef: ComputedRef<BasicTableProps>) => {
  const getTableColumns = () => {
    console.log(propsRef.value);
    return propsRef.value.columns;
  };

  return {
    getTableColumns
  };
};
