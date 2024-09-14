import { getInfo, login } from '@/api/login';
import { removeToken, setToken } from '@/utils/auth';

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
    console.log(result);
    const { data } = result;
    setToken(data.token, Number(data.expires_in) / 60);
    return result;
  };
  const userLoginout = () => {
    // TODO: 清除token
    removeToken();
    // TODO: 清除用户信息
    userInfo.username = '';
    userInfo.password = '';
    userInfo.email = '';
    userInfo.avatar = '';
    // TODO: 清除权限信息
    permissionsList.value = [];
    roles.value = [];
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
    getUserInfo,
    userLoginout
  };
});
