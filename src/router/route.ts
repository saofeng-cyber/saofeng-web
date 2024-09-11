import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export interface AppRouteRecordRaw {
  path: string;
  name: string;
  component?: Component;
  redirect?: string;
  meta?: RouteMeta;
  children?: AppRouteRecordRaw[];
}
export interface RouteMeta {
  title: string;
  permissions: string[];
  // 排序
  sort?: number;
  // 是否固定在tags-view
  affix?: boolean;
  // tab上的图标
  icon?: string;
  // 跳转地址
  frameSrc?: string;
  // 外链跳转地址
  externalLink?: string;
  //隐藏
  hidden?: boolean;
  //是否缓存
  keepAlive?: boolean;
}

export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw;
}
