<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <div class="flex items-center justify-between w-full max-w-4xl mb-7">
      <h1 class="text-4xl mona-sans-custom ml-7 uppercase font-bold">Plan Semanal</h1>
      <button
        @click="resetToDefault"
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        title="Resetear a plan por defecto"
      >
        Resetear Plan
      </button>
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
import { ref } from 'vue';
import DayCard from '@/modules/weeklyplan/components/DayCard.vue';
import RecipeSelector from '@/modules/common/components/RecipeSelector.vue';
import { useWeeklyPlanStorage } from '@/modules/weeklyplan/composables/useWeeklyPlanStorage';
import type { Recipe } from '@/data/types';

interface SelectorModal {
  isVisible: boolean;
  recipeType: 'Almuerzo' | 'Cena';
  targetDay: string;
  targetMealType: 'lunch' | 'dinner';
}

// Usar el composable para manejar el almacenamiento persistente
const { weeklyPlan, updateRecipe, resetToDefault } = useWeeklyPlanStorage();

// Modal del selector de recetas
const selectorModal = ref<SelectorModal>({
  isVisible: false,
  recipeType: 'Almuerzo',
  targetDay: '',
  targetMealType: 'lunch'
});

// Manejar el evento de reemplazar receta
const handleReplaceRecipe = (data: { day: string; mealType: 'lunch' | 'dinner'; recipeType: 'Almuerzo' | 'Cena' }) => {
  selectorModal.value = {
    isVisible: true,
    recipeType: data.recipeType,
    targetDay: data.day,
    targetMealType: data.mealType
  };
};

// Cerrar modal
const closeSelectorModal = () => {
  selectorModal.value.isVisible = false;
};

// Manejar la selección de receta
const handleRecipeSelection = (selectedRecipe: Recipe) => {
  updateRecipe(
    selectorModal.value.targetDay, 
    selectorModal.value.targetMealType, 
    selectedRecipe
  );
  
  closeSelectorModal();
};
</script>
