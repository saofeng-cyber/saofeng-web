<script setup lang="ts">
import { Leafer, Rect } from 'leafer-ui'
import { useDesignSettingStore } from '@/store/modules/designSetting';
const settingStore = useDesignSettingStore();
const themeColor = computed({
  get() {
    return settingStore.appTheme;
  },
  set(val) {
    settingStore.setTheme(val);
  }
});

const showPicker = ref(false);

const handleConfirm = () => {
  showPicker.value = false;
};

const obj = {
  a: 1,
  b: 2,
  c: 3
}

const oe = Object.preventExtensions(obj);


// Object.defineProperty(obj, 'd', {
//   value: 4,
//   writable: true,
//   configurable: true,
//   enumerable: true
// })

console.log(11, Object.isExtensible(obj));


console.log(obj);


onMounted(() => {
  const leafer = new Leafer({
    view: 'leafer',
    width: 800,
    height: 800
  })

  const rect = new Rect({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true
  })
  const json = { "tag": 'Group', "x": 20, "y": 20, "children": [{ "tag": "Rect", "x": 100, "y": 100, "width": 200, "height": 200, "fill": "#32cd79", "draggable": true }] }

  leafer.add(rect)
})

</script>
<template>
  <div id="leafer" class="mx-auto w-[800px] h-[600px] border border-gray-300 rounded-md overflow-hidden">
  </div>
</template>
