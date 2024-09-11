import type Swal from 'sweetalert2';
type TVueSwalInstance = typeof Swal & typeof Swal.fire;
export const useSwal = () => {
  const $swal = getCurrentInstance()?.appContext.app.config.globalProperties
    .$swal as TVueSwalInstance;
  return { $swal };
};
