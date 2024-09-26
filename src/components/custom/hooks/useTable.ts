export const useCustomTable = (table: any) => {
  const getTableColumns = () => {
    console.log(table);
    return table.columns;
  };

  return {
    getTableColumns
  };
};
