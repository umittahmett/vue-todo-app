<template>
  <div class="bg-zinc-900 h-full min-h-screen">
    <!-- Hero -->
    <div class="w-full h-[20dvh] bg-black flex items-center justify-center pb-[30px]">
      <h1 class="font-extrabold text-6xl text-white text-center">
        <span class="text-[#4EA8DE]">to</span><span class="text-[#8284FA]">do</span>
      </h1>
    </div>

    <div class="default-container">
      <!-- Add Task -->
      <form @submit="onSubmit" class="flex items-center gap-2 relative bottom-[30px]">
        <input v-model="newTask"
          class="w-full py-4 px-6 rounded-lg bg-zinc-800 text-white outline-none focus:outline-none ring-0 focus:ring-0"
          type="text" placeholder="Add a new task">
        <button :disabled="!newTask" type="submit"
          class="p-4 disabled:opacity-80 rounded-lg text-white flex items-center gap-2 bg-[#4EA8DE]">
          Add
          <PlusCircle class="text-white size-4" />
        </button>
      </form>

      <!-- Tasks -->
      <div class="flex items-center justify-between gap-6 mt-12">
        <div class="flex items-center gap-2">
          <span class="text-[#4EA8DE] font-bold">Tasks created</span>
          <span class="rounded-full text-white bg-zinc-800 px-2 py-1 text-sm font-bold">{{ tasks.length || 0 }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-[#8284FA] font-bold">Completed</span>
          <span class="rounded-full text-white bg-zinc-800 px-2 py-1 text-sm font-bold">{{ completedTasks }}</span>
        </div>
      </div>

      <!-- Task List -->
      <div class="space-y-3 mt-6">
        <Todo v-for="task in tasks" :key="task.id" :id="task.id" :text="task.text" :completed="task.completed"
          :createdAt="task.createdAt" :completedAt="task.completedAt" :updatedAt="task.updatedAt" />

        <div class="flex flex-col items-center py-10 space-y-6 text-center" v-if="tasks.length === 0">
          <img :src="ClipboardImage" alt="Empty" class="size-24 object-cover" />
          <div>
            <h2 class="text-zinc-500 font-bold text-2xl">You don't have tasks registered yet</h2>
            <p class="text-zinc-500 text-xl font-light">Create tasks and organize your to-do items</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusCircle } from 'lucide-vue-next';
import Todo from '@/components/Todo.vue';
import { onMounted, ref } from 'vue';
import type { TaskProps } from '@/types';
import ClipboardImage from '@/assets/clipboard.png'

const tasks = ref<TaskProps[]>([]);
const completedTasks = ref<number>(0);
const newTask = ref<string>('');

const onSubmit = (e: any) => {
  e.preventDefault();
  tasks.value.push({
    id: tasks.value.length + 1,
    text: newTask.value,
    completed: true,
    createdAt: new Date(),
    completedAt: undefined,
    updatedAt: undefined
  });
  newTask.value = '';
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
}

onMounted(() => {
  let data = localStorage.getItem('tasks')
  if (data) {
    tasks.value = JSON.parse(data)
    completedTasks.value = tasks.value.filter(task => task.completed).length || 0;
  }
  console.log(data);

})
</script>