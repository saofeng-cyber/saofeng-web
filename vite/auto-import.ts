import autoImport from 'unplugin-auto-import/vite';

export function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
      {
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar'
        ]
      },
      '@vueuse/core'
    ],
    dts: 'src/typings/auto-imports.d.ts'
  });
}
