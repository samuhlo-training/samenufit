<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <div
      class="bg-white/40 backdrop-blur-md border border-white/20 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold mona-sans-custom uppercase text-text-main-color">
            Seleccionar {{ recipeType }}
          </h2>
          <button
            @click="closeModal"
            class="text-text-main-color hover:text-[var(--accent-color)] transition-colors cursor-pointer"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Recipe List -->
      <div class="px-6 py-4 overflow-y-auto max-h-fit">
        <div class="space-y-3">
          <div
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            class="bg-[#fff3e3] rounded-lg p-4 cursor-pointer hover:bg-[#ffefd6] transition-colors border-2 border-transparent hover:border-[var(--accent-color)]"
            @click="selectRecipe(recipe)"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="font-bold mona-sans-custom text-lg text-text-main-color uppercase">
                  {{ recipe.name }}
                </h3>
                <p class="text-sm text-text-main-color/60 mt-1">
                  {{ recipe.description }}
                </p>
              </div>
              <div class="ml-4 text-right">
                <div
                  class="bg-[var(--accent-color)] text-white px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {{ recipe.macros.calories }} kcal
                </div>
                <div class="text-xs text-text-main-color/60 mt-1">
                  P: {{ recipe.macros.protein }}g | C: {{ recipe.macros.carbs }}g | G:
                  {{ recipe.macros.fat }}g
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Recipe } from '@/data/types';
import { initialRecipes } from '@/data/database';

interface Props {
  isVisible: boolean;
  recipeType: 'Almuerzo' | 'Cena';
}

interface Emits {
  (e: 'close'): void;
  (e: 'select', recipe: Recipe): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const filteredRecipes = computed(() => {
  return initialRecipes.filter((recipe) => recipe.type === props.recipeType);
});

const closeModal = () => {
  emit('close');
};

const selectRecipe = (recipe: Recipe) => {
  emit('select', recipe);
  closeModal();
};
</script>
