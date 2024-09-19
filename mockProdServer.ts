import { createProdMockServer } from 'vite-plugin-mock/client';

/**
 * mockjs 语法参考: https://github.com/nuysoft/Mock/wiki/Syntax-Specification
 * mockjs 文档: https://github.com/nuysoft/Mock/wiki
 * mockjs 生成随机数据: https://github.com/nuysoft/Mock/wiki/API
 * mockjs 生成随机图片: https://github.com/nuysoft/Mock/wiki/API#image
 * mockjs 生成随机文本: https://github.com/nuysoft/Mock/wiki/API#paragraph
 * mockjs 生成随机姓名: https://github.com/nuysoft/Mock/wiki/API#name
 * mockjs 生成随机地址: https://github.com/nuysoft/Mock/wiki/API#address
 * mockjs 生成随机时间: https://github.com/nuysoft/Mock/wiki/API#datetime
 * mockjs 生成随机颜色: https://github.com/nuysoft/Mock/wiki/API#color
 * mockjs 生成随机标题: https://github.com/nuysoft/Mock/wiki/API#ctitle
 *
 **/
const mockModules = import.meta.glob('@/mock/*.ts', {
  eager: true,
  import: 'default'
});

const mockList: any[] = [];
Object.values(mockModules).forEach((item) => {
  mockList.push(item);
});
console.log(66, mockList);

export default createProdMockServer(mockList.flat(1));
