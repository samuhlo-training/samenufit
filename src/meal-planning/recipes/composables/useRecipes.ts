import { computed } from 'vue';
import type { Recipe } from '@/shared/types';
import { recipeDatabase } from '../stores/recipe-database';

export const useRecipes = () => {
  // Get all recipes
  const allRecipes = computed(() => recipeDatabase);

  // Get recipes by type
  const getRecipesByType = (type: Recipe['type']) => {
    return computed(() => recipeDatabase.filter(recipe => recipe.type === type));
  };

  // Get recipe by ID
  const getRecipeById = (id: string) => {
    return computed(() => recipeDatabase.find(recipe => recipe.id === id) || null);
  };

  // Search recipes by name or description
  const searchRecipes = (query: string) => {
    return computed(() => {
      if (!query.trim()) return recipeDatabase;
      
      const lowercaseQuery = query.toLowerCase();
      return recipeDatabase.filter(recipe => 
        recipe.name.toLowerCase().includes(lowercaseQuery) ||
        recipe.description.toLowerCase().includes(lowercaseQuery)
      );
    });
  };

  // Get random recipe by type
  const getRandomRecipeByType = (type: Recipe['type']): Recipe | null => {
    const recipes = recipeDatabase.filter(recipe => recipe.type === type);
    if (recipes.length === 0) return null;
    return recipes[Math.floor(Math.random() * recipes.length)];
  };

  return {
    allRecipes,
    getRecipesByType,
    getRecipeById,
    searchRecipes,
    getRandomRecipeByType,
  };
};