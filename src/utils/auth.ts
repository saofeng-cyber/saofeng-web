import Cookies from 'js-cookie';

const TokenKey = 'saofeng-admin';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string, expires?: number) {
  return Cookies.set(TokenKey, token, { expires: expires });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
