<template>
  <div class="p-4 pb-2 rounded-lg w-full bg-zinc-800 relative">
    <div class="flex justify-between items-start gap-5">
      <div class="inline-flex items-center">
        <div @click="onCheckedChange" class=" flex items-center cursor-pointer relative">
          <input
            class="relative border-[#4EA8DE] accent-[#4EA8DE] peer size-5 cursor-pointer transition-all appearance-none rounded-full border checked:bg-[#8284FA] checked:border-[#8284FA]"
            :checked="completed" type="checkbox" />
          <div
            class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CheckIcon class="size-4 text-white" />
          </div>
        </div>
      </div>

      <p v-if="!isEditing" :class="clsx('text-zinc-100 w-full text-start', completed && 'line-through text-zinc-500')">
        {{ text }}
      </p>

      <input v-else v-model="updatedText" @keydown.esc="isEditing = false" @keydown.enter="handleSaveEdit"
        class="w-full rounded-lg bg-zinc-700 px-4 py-1.5 text-white outline-none focus:outline-none ring-0 focus:ring-0"
        type="text" />

      <div class="flex items-center gap-2">
        <button @click="onDelete" class="text-zinc-400 hover:text-white duration-200">
          <Trash2 class="size-5" />
        </button>

        <button v-if="!completed" @click="toggleEditing">
          <PencilLine v-if="!isEditing" class="size-5 text-[#4EA8DE]" />
          <CheckCircle @click="() => handleSaveEdit" v-if="isEditing"
            class="size-5 text-green-500 hover:text-gren-600 duration-200" />
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between pt-4 text-zinc-400 text-xs">
      <div>
        Created at: {{ new Date(createdAt).toDateString() }}
      </div>
      <div v-if="completedAt || updatedAt">
        {{ completed ? 'Completed at:' : 'Updated at:' }} {{ completed ? new Date(completedAt as number).toDateString()
          :
          new Date(updatedAt as number).toDateString() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskProps } from '@/types';
import clsx from 'clsx';
import { CheckCircle, CheckIcon, PencilLine, Trash2 } from 'lucide-vue-next';
import { nextTick, ref } from 'vue';
const props = defineProps<TaskProps>();

const isEditing = ref<boolean>(false);
const updatedText = ref<string>(props.text);
const editInput = ref<HTMLInputElement | null>(null);

const toggleEditing = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    nextTick(() => {
      editInput.value?.focus();
    });
  }
};

const handleSaveEdit = () => {
  if (updatedText.value.trim() === '') return;
  if (props.onEdit) {
    props.onEdit(props.id, updatedText.value);
  }
  isEditing.value = false;
};
</script>