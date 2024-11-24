<template>
  <div class="p-4 rounded-lg flex w-full justify-between items-start gap-5 bg-zinc-800 ">
    <div class="inline-flex items-center">
      <div class="flex items-center cursor-pointer relative">
        <input
          class=" border-[#4EA8DE] accent-[#4EA8DE] peer size-5 cursor-pointer transition-all appearance-none rounded-full border checked:bg-[#8284FA] checked:border-[#8284FA]"
          :checked="props.completed" type="checkbox" />
        <span
          class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CheckIcon class="size-4 text-white" />
        </span>
      </div>
    </div>

    <p :class="clsx('text-zinc-100 w-full text-start', props.completed && 'line-through text-zinc-500')">
      {{ props.text }}
    </p>

    <button class="text-zinc-400 hover:text-white duration-200">
      <Trash2 class="size-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';
import { CheckIcon, Trash2 } from 'lucide-vue-next';

const props = defineProps({
  text: String,
  completed: Boolean
})
</script>