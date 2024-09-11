// 导入day.js文件
import dayjs from 'dayjs';

// 日期格式化
export const dateFormatter = function (date: Date): String {
  return dayjs(date).format('YYYY-MM-DD');
};
// 比较新旧日期
export const diff = function (now, ago): number {
  return dayjs(now).diff(ago, 'day');
};
