<template>
  <div class="flex flex-col gap-2 mt-5">
    <div class="bg-primary text-main p-4 min-w-18 rounded-xl text-sm font-semibold shadow-sm">
      ~{{ value }}{{ unit }}
      <p class="text-white font-regular text-center">{{ props.type }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  value: number;
  type: 'kcal' | 'prot' | 'carb' | 'fat';
}

const props = defineProps<Props>();

const unit = computed(() => {
  switch (props.type) {
    case 'kcal':
      return '';
    case 'prot':
    case 'carb':
    case 'fat':
      return 'g';
    default:
      return '';
  }
});
</script>
