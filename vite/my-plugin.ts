import { Plugin } from 'vite';
import gradient from 'gradient-string';
import dayjs, { type Dayjs } from 'dayjs';
import boxen, { type Options as BoxenOptions } from 'boxen';
import pkg from '../package.json';

const welcomeMessage = gradient(['cyan', 'magenta']).multiline(
  `🚀 欢迎使用 ${pkg.name} 前端框架, 如果有问题请及时交流。 🚀`,
);

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: 'cyan',
  borderStyle: 'round',
};

export const useMyPlugin = (): Plugin => {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  let outDir: string;
  return {
    name: 'my-plugin',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? 'dist'; // 默认输出目录为dist
    },
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions));
      if (config.command === 'build') {
        startTime = dayjs();
      }
    },
    buildEnd() {
      if (config.command === 'build') {
        endTime = dayjs();
        const duration = endTime.diff(startTime, 'second');
        console.log(`🚀 代码构建完成，耗时 ${duration} 秒，输出目录为 ${outDir}。 🚀`);
        console.log(boxen(gradient(['cyan', 'magenta']).multiline(`🚀 代码构建完成，耗时 ${duration} 秒，输出目录为 ${outDir}。 🚀`), boxenOptions));
        
      }
    }
  };
};
