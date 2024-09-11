import { useDark, useToggle } from '@vueuse/core';
export function useChangeTheme() {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  const changeTheme = () => {
    toggleDark();
  };
  return { changeTheme, isDark };
}
