<template>
  <div class="flex flex-col gap-2 mt-7">
    <h2 class="mona-sans-custom font-bold text-2xl uppercase">{{ day }}</h2>
    <RecipeCard 
      :recipe="lunchRecipe" 
      :show-replace-button="true"
      meal-type="lunch"
      @replace-recipe="handleReplaceRecipe('lunch', $event)"
    />
    <RecipeCard 
      :recipe="dinnerRecipe" 
      :show-replace-button="true"
      meal-type="dinner"
      @replace-recipe="handleReplaceRecipe('dinner', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '@/shared/components/RecipeCard.vue';
import type { Recipe } from '@/shared/types';

interface Props {
  day: string;
  lunchRecipe: Recipe | null;
  dinnerRecipe: Recipe | null;
}

interface Emits {
  (e: 'replace-recipe', data: { day: string; mealType: 'lunch' | 'dinner'; recipeType: 'Almuerzo' | 'Cena' }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleReplaceRecipe = (mealType: 'lunch' | 'dinner', recipeType: 'Almuerzo' | 'Cena') => {
  emit('replace-recipe', {
    day: props.day,
    mealType,
    recipeType
  });
};
</script>
