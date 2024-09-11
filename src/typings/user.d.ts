declare module User {
  export interface LoginParams {
    username: string;
    password: string;
  }
  export interface UserInfo {
    username: string;
    email: string;
    password: string;
    avatar: string;
  }
}
