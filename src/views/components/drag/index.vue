<script setup lang="ts">
import { ref } from 'vue';
import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import {
  animations
} from "@formkit/drag-and-drop";

const todoItems = [
  'Schedule perm',
  'Rewind VHS tapes',
  'Make change for the arcade',
  'Get disposable camera developed',
  'Learn C++',
  'Return Nintendo Power Glove'
];
const doneItems = ['Pickup new mix-tape from Beth'];

const todoShouldSwap = ref(false);
const doneShouldSwap = ref(false);

const [todoList, todos] = useDragAndDrop(todoItems, {
  group: 'todoList',

  plugins: [
    dropOrSwap({
      shouldSwap: () => todoShouldSwap.value
    }),
    animations()
  ]
});
const [doneList, dones] = useDragAndDrop(doneItems, {
  group: 'todoList',

  plugins: [
    dropOrSwap({
      shouldSwap: () => doneShouldSwap.value
    }),
    animations()
  ]
});

function toggleTodoSwap() {
  todoShouldSwap.value = !todoShouldSwap.value;
}

function toggleDoneSwap() {
  doneShouldSwap.value = !doneShouldSwap.value;
}
</script>
<template>
  <div class="kanban-board">
    <ul ref="todoList" class="kanban-column">
      <li v-for="todo in todos" :key="todo" class="kanban-item">
        {{ todo }}
      </li>
    </ul>
    <div>
      <button @click="toggleTodoSwap()" class="px-4 py-2 mt-4 font-bold text-white bg-indigo-500 rounded-lg">
        Toggle {{ todoShouldSwap ? 'Drop' : 'Swap' }}
      </button>
    </div>
    <ul ref="doneList" class="kanban-column">
      <li v-for="done in dones" :key="done" class="kanban-item">
        {{ done }}
      </li>
    </ul>
    <div>
      <button @click="toggleDoneSwap()" class="px-4 py-2 mt-4 font-bold text-white bg-indigo-500 rounded-lg">
        Toggle {{ doneShouldSwap ? 'Drop' : 'Swap' }}
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.kanban-board {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}

.kanban-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.kanban-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: grab;
  padding: 12px;
}
</style>
