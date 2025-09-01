import { defineStore } from 'pinia';
import type { Recipe } from '@/data/types';
import { initialRecipes } from '@/data/database';

export interface WeeklyPlanState {
  monday: { lunch: Recipe | null; dinner: Recipe | null };
  tuesday: { lunch: Recipe | null; dinner: Recipe | null };
  wednesday: { lunch: Recipe | null; dinner: Recipe | null };
  thursday: { lunch: Recipe | null; dinner: Recipe | null };
  friday: { lunch: Recipe | null; dinner: Recipe | null };
  saturday: { lunch: Recipe | null; dinner: Recipe | null };
  sunday: { lunch: Recipe | null; dinner: Recipe | null };
}

const STORAGE_KEY = 'samenufit-weekly-plan';

const createEmptyWeek = (): WeeklyPlanState => ({
  monday: { lunch: null, dinner: null },
  tuesday: { lunch: null, dinner: null },
  wednesday: { lunch: null, dinner: null },
  thursday: { lunch: null, dinner: null },
  friday: { lunch: null, dinner: null },
  saturday: { lunch: null, dinner: null },
  sunday: { lunch: null, dinner: null },
});

const createSampleWeek = (): WeeklyPlanState => {
  const lunchRecipes = initialRecipes.filter((r) => r.type === 'Almuerzo');
  const dinnerRecipes = initialRecipes.filter((r) => r.type === 'Cena');

  // Función auxiliar para obtener una receta aleatoria
  const getRandomRecipe = (recipes: Recipe[]): Recipe | null => {
    if (recipes.length === 0) return null;
    return recipes[Math.floor(Math.random() * recipes.length)];
  };

  return {
    monday: {
      lunch: getRandomRecipe(lunchRecipes),
      dinner: getRandomRecipe(dinnerRecipes),
    },
    tuesday: {
      lunch: getRandomRecipe(lunchRecipes),
      dinner: getRandomRecipe(dinnerRecipes),
    },
    wednesday: {
      lunch: getRandomRecipe(lunchRecipes),
      dinner: getRandomRecipe(dinnerRecipes),
    },
    thursday: {
      lunch: getRandomRecipe(lunchRecipes),
      dinner: getRandomRecipe(dinnerRecipes),
    },
    friday: {
      lunch: getRandomRecipe(lunchRecipes),
      dinner: getRandomRecipe(dinnerRecipes),
    },
    saturday: {
      lunch: getRandomRecipe(lunchRecipes),
      dinner: getRandomRecipe(dinnerRecipes),
    },
    sunday: {
      lunch: getRandomRecipe(lunchRecipes),
      dinner: getRandomRecipe(dinnerRecipes),
    },
  };
};

export const useWeeklyPlanStore = defineStore('weeklyPlan', {
  state: (): { plan: WeeklyPlanState } => ({
    plan: createEmptyWeek(),
  }),

  actions: {
    // Initialize from localStorage
    async loadFromStorage() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedPlan = JSON.parse(stored);
          // Validate that all recipes still exist in database
          this.plan = this.validatePlan(parsedPlan);
        }
      } catch (error) {
        console.warn('Failed to load from localStorage:', error);
      }
    },

    // Save to localStorage
    saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.plan));
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    },

    // Validate that recipes still exist in database
    validatePlan(plan: WeeklyPlanState): WeeklyPlanState {
      const validatedPlan = { ...plan };

      Object.keys(validatedPlan).forEach((day) => {
        const dayPlan = validatedPlan[day as keyof WeeklyPlanState];

        // Validate lunch recipe
        if (dayPlan.lunch && !initialRecipes.find((r) => r.id === dayPlan.lunch?.id)) {
          dayPlan.lunch = null;
        }

        // Validate dinner recipe
        if (dayPlan.dinner && !initialRecipes.find((r) => r.id === dayPlan.dinner?.id)) {
          dayPlan.dinner = null;
        }
      });

      return validatedPlan;
    },

    // Update a specific meal
    setMeal(day: keyof WeeklyPlanState, mealType: 'lunch' | 'dinner', recipe: Recipe | null) {
      this.plan[day][mealType] = recipe;
      this.saveToStorage();
    },

    // Fill with sample recipes
    fillWithSamples() {
      this.plan = createSampleWeek();
      this.saveToStorage();
    },

    // Clear all meals
    clearAll() {
      this.plan = createEmptyWeek();
      this.saveToStorage();
    },

    // Get day plan in array format (for compatibility)
    getDayPlan(dayName: string) {
      const dayMap: Record<string, keyof WeeklyPlanState> = {
        Lunes: 'monday',
        Martes: 'tuesday',
        Miércoles: 'wednesday',
        Jueves: 'thursday',
        Viernes: 'friday',
        Sábado: 'saturday',
        Domingo: 'sunday',
      };

      const dayKey = dayMap[dayName];
      if (!dayKey) return null;

      return {
        day: dayName,
        lunchRecipe: this.plan[dayKey].lunch,
        dinnerRecipe: this.plan[dayKey].dinner,
      };
    },

    // Get all days in array format (for compatibility)
    getAllDays() {
      const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      return dayNames.map((dayName) => this.getDayPlan(dayName)!);
    },
  },
});
