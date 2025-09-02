<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <div class="flex flex-col gap-2 items-center justify-center w-full max-w-4xl mb-7">
      <h1 class="text-4xl mona-sans-custom uppercase font-bold">Plan Semanal</h1>
      <ActionButtons 
        :buttons="actionButtons"
        @button-click="handleButtonClick"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <DayCard
        v-for="(dayPlan, index) in weeklyPlanArray"
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
import { DayCard } from '@/meal-planning/weekly-plans';
import RecipeSelector from '@/shared/components/RecipeSelector.vue';
import ActionButtons, { type ActionButton } from '@/shared/components/ActionButtons.vue';
import { useWeeklyPlan } from '@/meal-planning/weekly-plans';
import { useRecipes } from '@/meal-planning/recipes';
import type { Recipe } from '@/shared/types';

interface SelectorModal {
  isVisible: boolean;
  recipeType: 'Almuerzo' | 'Cena';
  targetDay: string;
  targetMealType: 'lunch' | 'dinner';
}

// Use domain composables
const { init, clearAll, setMeal, getAllDays } = useWeeklyPlan();
const { getRandomRecipeByType } = useRecipes();

// Convert to array format for compatibility with existing components
const weeklyPlanArray = computed(() => getAllDays());

// Load from storage on mount
onMounted(() => {
  init();
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
  const dayMap: Record<
    string,
    'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  > = {
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
    setMeal(dayKey, selectorModal.value.targetMealType, selectedRecipe);
  }

  closeSelectorModal();
};

// Fill with sample recipes
const fillWithSamples = () => {
  const days: Array<
    'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  > = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  days.forEach((day) => {
    const lunchRecipe = getRandomRecipeByType('Almuerzo');
    const dinnerRecipe = getRandomRecipeByType('Cena');

    if (lunchRecipe) setMeal(day, 'lunch', lunchRecipe);
    if (dinnerRecipe) setMeal(day, 'dinner', dinnerRecipe);
  });
};

// Configuration for action buttons
const actionButtons: ActionButton[] = [
  {
    id: 'random',
    label: 'Aleatorio',
    variant: 'primary'
  },
  {
    id: 'clear',
    label: 'Vaciar',
    variant: 'secondary'
  }
];

// Handle button clicks
const handleButtonClick = (buttonId: string) => {
  switch (buttonId) {
    case 'random':
      fillWithSamples();
      break;
    case 'clear':
      clearAll();
      break;
  }
};
</script>
