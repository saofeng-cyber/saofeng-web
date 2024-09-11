<script setup lang="ts">
import { Calendar, type CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { useResizeObserver } from '@vueuse/core';
const eventGuid = ref(0);
const createEventId = () => {
  return String(eventGuid.value++);
};
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '今天下午6:00放假',
    start: todayStr
  },
  {
    id: createEventId(),
    title: '吃饭，追剧',
    start: todayStr + 'T14:00'
  },
  {
    id: createEventId(),
    title: '看小姐姐',
    start: todayStr + 'T20:00'
  }
];
const calendarOptions = reactive<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
  // initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  events: INITIAL_EVENTS,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true
});
const initCalendar = () => {
  const calendarEl = document.getElementById('fullcalendar') as HTMLElement;
  const calendar = new Calendar(calendarEl, {
    ...calendarOptions,
    eventStartEditable: true,
    eventDurationEditable: true
  });
  calendar.render();
  calendar.on('windowResize', () => {
    calendar.updateSize();
  });
  calendarEl.addEventListener('resize', () => {
    console.log(555);

    calendar.updateSize();
  });
  calendar.on('eventClick', (info) => {
    alert(info.event.title);
  });
  calendar.select = function (info) {
    alert('selected ' + info.startStr + ' to ' + info.endStr);
  };
  useResizeObserver(calendarEl, () => {
    calendar.updateSize();
  });
};
onMounted(() => {
  initCalendar();
});
</script>
<template>
  <div id="fullcalendar" />
</template>
<style lang="scss" scoped></style>
