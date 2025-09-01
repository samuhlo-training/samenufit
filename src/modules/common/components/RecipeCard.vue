<template>
  <div class="bg-[#fff3e3] rounded-lg shadow-sm overflow-hidden min-w-[22rem]">
    <!-- Header del acordeón -->
    <button
      @click="toggleAccordion"
      class="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors duration-200 cursor-pointer"
    >
      <div class="text-left">
        <div class="text-m text-text-main-color/60">{{ recipe.type }}</div>
        <div class="font-bold mona-sans-custom text-lg text-text-main-color uppercase">
          {{ recipe.name }}
        </div>
      </div>

      <!-- Icono de flecha -->
      <div
        class="transform transition-transform duration-200"
        :class="{ 'rotate-180': isExpanded }"
      >
        <svg
          class="w-5 h-5 text-text-main-color"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </button>

    <!-- Contenido expandido -->
    <div v-show="isExpanded" class="px-4 pb-4 border-t border-white/20">
      <!-- Ingredientes -->
      <div class="mb-4">
        <h4 class="font-semibold text-text-main-color mb-2">Ingredientes:</h4>
        <div class="space-y-1 text-sm text-text-main-color/80">
          <div 
            v-for="ingredient in recipe.ingredients" 
            :key="ingredient.id"
            class="flex justify-between"
          >
            <span 
              :class="{
                'underline decoration-[var(--accent-color)] decoration-2 decoration-wavy': ingredient.category === 'Proteína'
              }"
            >
              {{ ingredient.name }}
            </span>
            <span class="font-medium">
              {{ ingredient.quantity }}{{ ingredient.unit === 'unidad(es)' ? 'u' : ingredient.unit }}
            </span>
          </div>
        </div>
      </div>

      <!-- Información nutricional -->
      <div class="mb-4">
        <div class="flex gap-2 mb-2">
          <MacroShow :value="recipe.macros.calories" type="kcal" />
          <MacroShow :value="recipe.macros.protein" type="prot" />
          <MacroShow :value="recipe.macros.carbs" type="carb" />
          <MacroShow :value="recipe.macros.fat" type="fat" />
        </div>

        <!-- Botón de reemplazar -->
        <div v-if="showReplaceButton" class="flex justify-end mt-4">
          <button
            @click="handleReplaceClick"
            class="bg-[var(--accent-color)] p-2 rounded-full hover:bg-[var(--accent-color)]/80 transition-colors shadow-sm"
          >
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Recipe } from '@/data/types';
import MacroShow from './MacroShow.vue';

interface Props {
  recipe: Recipe;
  showReplaceButton?: boolean;
}

interface Emits {
  (e: 'replace-recipe', recipeType: 'Almuerzo' | 'Cena'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isExpanded = ref(false);

const toggleAccordion = () => {
  isExpanded.value = !isExpanded.value;
};

const handleReplaceClick = () => {
  emit('replace-recipe', props.recipe.type as 'Almuerzo' | 'Cena');
};
</script>
