import { getInfo, login } from '@/api/login';
import { setToken } from '@/utils/auth';

export const useUserStore = defineStore('user', () => {
  // state
  const permissionsList = ref<string[]>([]);
  const roles = ref<string[]>([]);
  const userInfo = reactive<User.UserInfo>({
    username: '',
    password: '',
    email: '',
    avatar: ''
  });
  // actions
  const userLogin = async (parmas: User.LoginParams) => {
    const result: any = await login({
      username: parmas.username,
      password: parmas.password
    });
    setToken(result.token, Number(result.expires_in) / 60);
    return result;
  };
  const getUserInfo = async () => {
    const { data } = await getInfo();
    Object.assign(userInfo, data.userInfo);
    permissionsList.value = data.permissionsList;
    roles.value = data.roles;
    return data;
  };

  return {
    userInfo,
    roles,
    permissionsList,
    userLogin,
    getUserInfo
  };
});
