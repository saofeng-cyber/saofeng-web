import type { Component } from 'vue';
declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    permissions?: string[];
    // 排序
    sort?: number;
    // 是否固定在tags-view
    affix?: boolean;
    // tab上的图标
    icon?: Component | string;
    // 跳转地址
    frameSrc?: string;
    // 外链跳转地址
    externalLink?: string;
    //隐藏
    hidden?: boolean;
    //是否缓存
    keepAlive?: boolean;
  }
}
