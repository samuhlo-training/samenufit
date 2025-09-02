import { computed, type ComputedRef } from 'vue';
import type { Recipe, Macros } from '@/shared/types';

export const useMacroCalculations = () => {
  
  // Calculate total macros from multiple recipes
  const calculateTotalMacros = (recipes: Recipe[]): ComputedRef<Macros> => {
    return computed(() => {
      return recipes.reduce(
        (total, recipe) => ({
          calories: total.calories + recipe.macros.calories,
          protein: total.protein + recipe.macros.protein,
          carbs: total.carbs + recipe.macros.carbs,
          fat: total.fat + recipe.macros.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
    });
  };

  // Calculate macro percentages
  const calculateMacroPercentages = (macros: Macros): ComputedRef<{
    proteinPercentage: number;
    carbsPercentage: number;
    fatPercentage: number;
  }> => {
    return computed(() => {
      // Calculate calories from each macro (protein = 4cal/g, carbs = 4cal/g, fat = 9cal/g)
      const proteinCalories = macros.protein * 4;
      const carbsCalories = macros.carbs * 4;
      const fatCalories = macros.fat * 9;
      const totalCalories = proteinCalories + carbsCalories + fatCalories;

      if (totalCalories === 0) {
        return { proteinPercentage: 0, carbsPercentage: 0, fatPercentage: 0 };
      }

      return {
        proteinPercentage: Math.round((proteinCalories / totalCalories) * 100),
        carbsPercentage: Math.round((carbsCalories / totalCalories) * 100),
        fatPercentage: Math.round((fatCalories / totalCalories) * 100),
      };
    });
  };

  // Calculate daily macro targets based on goals
  const calculateDailyTargets = (
    weight: number, // in kg
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
    goal: 'lose' | 'maintain' | 'gain'
  ): ComputedRef<Macros> => {
    return computed(() => {
      // Base Metabolic Rate calculation (Mifflin-St Jeor equation for average)
      const bmr = 1800; // Default base value
      
      // Activity multipliers
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
      };
      
      let calories = bmr * activityMultipliers[activityLevel];
      
      // Adjust for goals
      switch (goal) {
        case 'lose':
          calories = calories * 0.8; // 20% deficit
          break;
        case 'gain':
          calories = calories * 1.1; // 10% surplus
          break;
        case 'maintain':
        default:
          // Keep as is
          break;
      }
      
      // Macro distribution (example ratios)
      const protein = Math.round((calories * 0.3) / 4); // 30% protein
      const carbs = Math.round((calories * 0.4) / 4); // 40% carbs  
      const fat = Math.round((calories * 0.3) / 9); // 30% fat
      
      return {
        calories: Math.round(calories),
        protein,
        carbs,
        fat
      };
    });
  };

  // Format macro display
  const formatMacros = (macros: Macros) => {
    return {
      calories: `${macros.calories} kcal`,
      protein: `${macros.protein}g`,
      carbs: `${macros.carbs}g`,
      fat: `${macros.fat}g`,
    };
  };

  return {
    calculateTotalMacros,
    calculateMacroPercentages,
    calculateDailyTargets,
    formatMacros,
  };
};