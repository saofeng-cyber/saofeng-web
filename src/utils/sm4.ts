import { sm4 } from 'sm-crypto';
const sm4Key = '13b50f13c9b8fff8a73e461e8adfb196';

// sm4加密
export const sm4Encrypt = (content: string | number[]) => {
  if (content) {
    return sm4.encrypt(content, sm4Key);
  }
  return content;
};

// sm4解密
export const sm4Decrypt = (content: string | number[]) => {
  if (content) {
    return sm4.decrypt(content, sm4Key);
  }
  return content;
};
