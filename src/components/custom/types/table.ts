export type Nullable<T> = T | null;
export interface BasicTableProps {
  title?: string;
  dataSource: Function;
  columns: any[];
  pagination: object;
  showPagination: boolean;
  actionColumn: any[];
  canResize: boolean;
  resizeHeightOffset: number;
  loading: boolean;
}
