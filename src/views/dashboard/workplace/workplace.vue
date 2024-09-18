<script setup lang="ts">
import Dropzone from '@/components/Dropzone.vue';
import FullCalendar from '@/components/FullCalendar.vue';
import SimpleDatatable from '@/components/SimpleDatatable.vue';
import { useSwal } from '@/hooks/event/useSwal';
const showModal = ref(false);
const { $swal } = useSwal();
const showAlertSuccess = () => {
  $swal.fire({
    position: 'center',
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#2c3e50',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    timer: 1500
  });
};
const showAlertWarning = () => {
  $swal.fire({
    position: 'center',
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2c3e50',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    timer: 1500
  });
};

const showAlertInfo = () => {
  $swal.fire({
    title: '<strong>HTML <u>example</u></strong>',
    icon: 'info',
    html:
      'You can use <b>bold text</b>, ' +
      '<a href="//sweetalert2.github.io">links</a> ' +
      'and other HTML tags',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonAriaLabel: 'Thumbs down'
  });
};
const showAlertDanger = () => {
  $swal
    .fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    })
    .then((result: { isConfirmed: any; isDenied: any }) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        $swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        $swal.fire('Changes are not saved', '', 'info');
      }
    });
};
</script>
<template>
  <div class="workplace">
    <div class="flex px-3">
      <n-space>
        <n-button @click="showModal = true">点我打开弹窗</n-button>
        <n-button type="primary" @click="showAlertSuccess">success</n-button>
        <n-button type="warning" @click="showAlertWarning">warning</n-button>
        <n-button type="info" @click="showAlertInfo">info</n-button>
        <n-button type="error" @click="showAlertDanger">error</n-button>
      </n-space>
    </div>
    <div class="flex flex-wrap mt-6">
      <div class="w-full px-3 mb-6 lg:mb-0 lg:w-7/12">
        <FullCalendar />
      </div>
      <div class="w-full px-3 lg:w-5/12">
        <Dropzone />
      </div>
    </div>
    <div class="flex flex-wrap px-3 mt-6">
      <div class="w-full mb-6">
        <SimpleDatatable />
      </div>
    </div>
    <n-modal
      v-model:show="showModal"
      title="配置"
      preset="card"
      style="width: 600px; min-height: 420px"
    >
      <n-tabs type="segment" animated>
        <n-tab-pane name="chap1" tab="纸嫁衣一">
          我这辈子最疯狂的事，发生在我在 Amazon
          当软件工程师的时候，故事是这样的：<br /><br />
          那时我和女朋友住在一起，正在家里远程工作。忽然同事给我发来了紧急消息：”我们的服务出现了
          SEV 2 级别的故障！需要所有的人马上协助！“我们组的应用全挂掉了。<br /><br />
          当我还在费力的寻找修复方法的时候，忽然闻到隔壁房间的的焦味，防火报警器开始鸣叫。
        </n-tab-pane>
        <n-tab-pane name="chap2" tab="纸嫁衣二">
          “威尔！着火了！快来帮忙！”我听到女朋友大喊。现在一个难题在我面前——是恢复一个重要的
          Amazon 服务，还是救公寓的火。<br /><br />
          我的脑海中忽然出现了 Amazon
          著名的领导力准则”客户至上“，有很多的客户还依赖我们的服务，我不能让他们失望！所以着火也不管了，女朋友喊我也无所谓，我开始
          debug 这个线上问题。
        </n-tab-pane>
        <n-tab-pane name="chap3" tab="纸嫁衣三">
          但是忽然，公寓的烟味消失，火警也停了。我的女朋友走进了房间，让我震惊的是，她摘下了自己的假发，她是
          Jeff Bezos（Amazon 老板）假扮的！<br /><br />
          “我对你坚持顾客至上的原则感到十分骄傲”，说完，他递给我一张五美金的亚马逊礼品卡，从我家窗户翻了出去，跳上了一辆
          Amazon 会员服务的小货车，一溜烟离开了。<br /><br />虽然现在我已不在
          Amazon
          工作，但我还是非常感激在哪里学的到的经验，这些经验我终身难忘。你们同意么？
        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <div class="flex justify-end">
          <n-button type="primary" @click="showModal = false">确定</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>
