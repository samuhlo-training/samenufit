<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <h1 class="text-4xl mona-sans-custom ml-7 uppercase font-bold mb-7">Libro de Recetas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div class="flex flex-col gap-3">
        <h2 class="text-xl font-bold mb-3 uppercase mona-sans-custom">Desayunos</h2>
        <RecipeCard 
          v-for="recipe in breakfastRecipes" 
          :key="recipe.id" 
          :recipe="recipe" 
          :show-replace-button="false"
        />
      </div>
      <div class="flex flex-col gap-3">
        <h2 class="text-xl font-bold mb-3 uppercase mona-sans-custom">Almuerzos</h2>
        <RecipeCard 
          v-for="recipe in lunchRecipes" 
          :key="recipe.id" 
          :recipe="recipe" 
          :show-replace-button="false"
        />
      </div>
      <div class="flex flex-col gap-3">
        <h2 class="text-xl font-bold mb-3 uppercase mona-sans-custom">Cenas</h2>
        <RecipeCard 
          v-for="recipe in dinnerRecipes" 
          :key="recipe.id" 
          :recipe="recipe" 
          :show-replace-button="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '@/shared/components/RecipeCard.vue';
import { useRecipes } from '@/meal-planning/recipes';

// Use domain composable
const { getRecipesByType } = useRecipes();

// Filtrar recetas por tipo
const breakfastRecipes = getRecipesByType('Desayuno');
const lunchRecipes = getRecipesByType('Almuerzo');
const dinnerRecipes = getRecipesByType('Cena');
</script>