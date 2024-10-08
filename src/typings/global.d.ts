import auth from '@/plugins/auth';
import cache from '@/plugins/cache';
import modal from '@/plugins/modal';
import tab from '@/plugins/tab';
import download from '@/plugins/download';
import { useDict, useDictToNum } from '@/utils/dict';
import { download as utilsDownload } from '@/axios/request';
import {
  addDateRange,
  handleTree,
  modelTree,
  parseTime,
  selectDictLabel,
  selectDictLabels
} from '@/utils/ruoyi';

export {};
declare module 'vue' {
  interface ComponentCustomProperties {
    useDict: typeof useDict;
    useDictToNum: typeof useDictToNum;
    download: typeof utilsDownload;
    parseTime: typeof parseTime;
    handleTree: typeof handleTree;
    modelTree: typeof modelTree;
    addDateRange: typeof addDateRange;
    selectDictLabel: typeof selectDictLabel;
    selectDictLabels: typeof selectDictLabels;

    $tab: typeof tab;
    // 认证对象
    $auth: typeof auth;
    // 缓存对象
    $cache: typeof cache;
    // 模态框对象
    $modal: typeof modal;
    // 下载文件
    $download: typeof download;
  }
}

declare global {
  type Recordable<T = any> = Record<string, T>;
}
