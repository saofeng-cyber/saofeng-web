import type { Component } from 'vue';
declare namespace RouteCustom {
  interface RouteRaw {
    path: string;
    name: string;
    component?: 'layout' | 'external' | 'parent' | Component;
    redirect?: string;
    meta?: RouteMeta;
    children?: RouteRaw[];
  }
  interface RouteMeta {
    title: string;
    roles?: string[];
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
    // 隐藏面包屑
    hideBreadcrumb?: boolean;
    //是否缓存
    keepAlive?: boolean;
  }
}
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
    // 隐藏面包屑
    hideBreadcrumb?: boolean;
    //是否缓存
    keepAlive?: boolean;
  }
}
