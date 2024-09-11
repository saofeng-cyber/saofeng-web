<script setup lang="ts">
import { getRandomColor } from '@/utils/tools';

const strArr1 = [
  '真心不一定换真心，力度却一定能换声音',
  '请管好你的嘴，我会突袭喔',
  '我喜欢你脸红的样子，更喜欢你气喘嘘嘘的样子',
  '别的猫咪有小鱼干，你有我干',
  '只要能在你怀里睡，什么姿势我都答应你',
  '想和你游山玩水，游上面的山，玩下面的水',
  '希望你主动一点，也许我们躺的就不是列表里',
  '别人一上来就喜欢我，你不喜欢我是因为你没上',
  '不光我想你，我的身体也想你',
  '我既想和你走心，又忍不住想跟你走肾',
  '想听你白天的笑声，更想听你深夜的呼吸声',
  '我不需要分清楚东西南北，反正我只会走向有你的那边',
  '我希望压得我喘不过气的不是生活,而是你',
  '你做填空题，我做口算题',
  '喜欢暴击还是攻速',
  '是你俯卧撑，还是我深蹲',
  '不知道我的糖是否能融进你38.5的海洋',
  '零食你随便吃，胖了的话我们一起做运动减肥',
  '你涉水而过，不代表你拥有这条河',
  '见到你，钻石已经不是世界上最坚硬的东西了',
  '我的食指和中指可以有烟味，但中指跟无名指必须是你的味道',
  '两败俱伤，才算尽力局，单方面，只能是碾压局',
  '想跟你一块玩跷跷板，只为尝试一上一下的感觉',
  '做我的小宝贝吧，以后只让你吃的棒棒糖，绝对不吃苦',
  '对我用美人计吧，我喜欢将计就计',
  '你做我的小猫咪吧，以后只让你睡我的床，绝对不睡狗窝',
  '你做我的小兔子吧，以后只让你吃我的胡萝卜，绝对不吃青菜',
  '说不出你哪里好，就是想看你洗澡',
  '一个礼拜有七天，你猜我最喜欢哪一天？有你的每一天',
  '我喜欢看你脸红红的样子，更喜欢你气喘吁吁的样子',
  '跟你说个坏消息，我对你的思想已经不纯洁了',
  '我真很花心，喜欢每一天的你和每一个你',
  '江山如画敌不过你一丝不挂',
  '我喜欢你小脸红红的样子，更喜欢你气喘吁吁的样子'
];
const strArr = ref<string[]>([]);

const randomColorStyle = () => {
  return {
    color: getRandomColor()
  };
};

onMounted(() => {
  for (let i = 0; i < 100; i++) {
    strArr.value.push(strArr1[Math.floor(Math.random() * strArr1.length)]);
  }
});
</script>
<template>
  <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
    <div
      class="w-full p-4 duration-300 border rounded-md shadow cursor-pointer hover:shadow-lg translation-all"
      v-for="(item, index) in strArr"
      :key="index"
      :style="randomColorStyle()"
    >
      {{ index + 1 }}. {{ item }}
    </div>
  </div>
</template>
