<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <div class="flex flex-col gap-2 items-center justify-center w-full max-w-4xl mb-7">
      <h1 class="text-4xl mona-sans-custom uppercase font-bold">Plan Semanal</h1>
      <div class="flex gap-2">
        <button
          @click="fillWithSamples"
          class="bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/80 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
        >
          Aleatorio
        </button>
        <button
          @click="clearAll"
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
        >
          Vaciar
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <DayCard
        v-for="(dayPlan, index) in weeklyPlan"
        :key="dayPlan.day"
        :day="dayPlan.day"
        :lunch-recipe="dayPlan.lunchRecipe"
        :dinner-recipe="dayPlan.dinnerRecipe"
        :class="{ 'lg:col-start-2': index === 6 }"
        @replace-recipe="handleReplaceRecipe"
      />
    </div>

    <!-- Recipe Selector Modal -->
    <RecipeSelector
      :is-visible="selectorModal.isVisible"
      :recipe-type="selectorModal.recipeType"
      @close="closeSelectorModal"
      @select="handleRecipeSelection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import DayCard from '@/modules/weeklyplan/components/DayCard.vue';
import RecipeSelector from '@/modules/common/components/RecipeSelector.vue';
import { useWeeklyPlanStore } from '@/stores/weeklyPlan';
import type { Recipe } from '@/data/types';

interface SelectorModal {
  isVisible: boolean;
  recipeType: 'Almuerzo' | 'Cena';
  targetDay: string;
  targetMealType: 'lunch' | 'dinner';
}

// Use the store
const store = useWeeklyPlanStore();

// Computed to get weekly plan in array format
const weeklyPlan = computed(() => store.getAllDays());

// Load from storage on mount
onMounted(() => {
  store.loadFromStorage();
});

// Modal del selector de recetas
const selectorModal = ref<SelectorModal>({
  isVisible: false,
  recipeType: 'Almuerzo',
  targetDay: '',
  targetMealType: 'lunch',
});

// Manejar el evento de reemplazar receta
const handleReplaceRecipe = (data: {
  day: string;
  mealType: 'lunch' | 'dinner';
  recipeType: 'Almuerzo' | 'Cena';
}) => {
  selectorModal.value = {
    isVisible: true,
    recipeType: data.recipeType,
    targetDay: data.day,
    targetMealType: data.mealType,
  };
};

// Cerrar modal
const closeSelectorModal = () => {
  selectorModal.value.isVisible = false;
};

// Handle recipe selection
const handleRecipeSelection = (selectedRecipe: Recipe) => {
  const dayMap: Record<string, keyof typeof store.plan> = {
    Lunes: 'monday',
    Martes: 'tuesday',
    Miércoles: 'wednesday',
    Jueves: 'thursday',
    Viernes: 'friday',
    Sábado: 'saturday',
    Domingo: 'sunday',
  };

  const dayKey = dayMap[selectorModal.value.targetDay];
  if (dayKey) {
    store.setMeal(dayKey, selectorModal.value.targetMealType, selectedRecipe);
  }

  closeSelectorModal();
};

// Fill with sample recipes
const fillWithSamples = () => {
  store.fillWithSamples();
};

// Clear all recipes
const clearAll = () => {
  store.clearAll();
};
</script>
