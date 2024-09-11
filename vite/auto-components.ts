import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export function createAutoComponents() {
  return Components({
    resolvers: [NaiveUiResolver()],
    dts: 'src/typings/components.d.ts'
  });
}
