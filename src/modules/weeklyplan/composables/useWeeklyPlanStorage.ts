import { ref, watch } from 'vue';
import type { Recipe } from '@/data/types';
import { initialRecipes } from '@/data/database';

export interface DayPlan {
  day: string;
  lunchRecipe: Recipe;
  dinnerRecipe: Recipe;
}

interface StoredWeeklyPlan {
  data: DayPlan[];
  timestamp: number;
  expiresAt: number;
}

const STORAGE_KEY = 'samenufit-weekly-plan';
const EXPIRATION_DAYS = 15;

export function useWeeklyPlanStorage() {
  const getDefaultWeeklyPlan = (): DayPlan[] => {
    const lunchRecipes = initialRecipes.filter(recipe => recipe.type === 'Almuerzo');
    const dinnerRecipes = initialRecipes.filter(recipe => recipe.type === 'Cena');

    return [
      {
        day: 'Lunes',
        lunchRecipe: lunchRecipes[0] || initialRecipes[0],
        dinnerRecipe: dinnerRecipes[0] || initialRecipes[0]
      },
      {
        day: 'Martes',
        lunchRecipe: lunchRecipes[1] || lunchRecipes[0] || initialRecipes[0],
        dinnerRecipe: dinnerRecipes[1] || dinnerRecipes[0] || initialRecipes[0]
      },
      {
        day: 'Miércoles',
        lunchRecipe: lunchRecipes[2] || lunchRecipes[0] || initialRecipes[0],
        dinnerRecipe: dinnerRecipes[2] || dinnerRecipes[0] || initialRecipes[0]
      },
      {
        day: 'Jueves',
        lunchRecipe: lunchRecipes[3] || lunchRecipes[0] || initialRecipes[0],
        dinnerRecipe: dinnerRecipes[3] || dinnerRecipes[0] || initialRecipes[0]
      },
      {
        day: 'Viernes',
        lunchRecipe: lunchRecipes[4] || lunchRecipes[0] || initialRecipes[0],
        dinnerRecipe: dinnerRecipes[4] || dinnerRecipes[0] || initialRecipes[0]
      },
      {
        day: 'Sábado',
        lunchRecipe: lunchRecipes[0] || initialRecipes[0],
        dinnerRecipe: dinnerRecipes[5] || dinnerRecipes[0] || initialRecipes[0]
      },
      {
        day: 'Domingo',
        lunchRecipe: lunchRecipes[1] || lunchRecipes[0] || initialRecipes[0],
        dinnerRecipe: dinnerRecipes[0] || initialRecipes[0]
      }
    ];
  };

  const loadWeeklyPlan = (): DayPlan[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return getDefaultWeeklyPlan();
      }

      const parsedData: StoredWeeklyPlan = JSON.parse(stored);
      const now = Date.now();

      // Verificar si ha expirado
      if (now > parsedData.expiresAt) {
        localStorage.removeItem(STORAGE_KEY);
        return getDefaultWeeklyPlan();
      }

      // Validar que las recetas todavía existan en la database
      const validatedPlan: DayPlan[] = parsedData.data.map(dayPlan => {
        const lunchRecipe = initialRecipes.find(recipe => recipe.id === dayPlan.lunchRecipe.id) 
          || dayPlan.lunchRecipe;
        const dinnerRecipe = initialRecipes.find(recipe => recipe.id === dayPlan.dinnerRecipe.id) 
          || dayPlan.dinnerRecipe;

        return {
          ...dayPlan,
          lunchRecipe,
          dinnerRecipe
        };
      });

      return validatedPlan;
    } catch (error) {
      console.warn('Error loading weekly plan from localStorage:', error);
      return getDefaultWeeklyPlan();
    }
  };

  const saveWeeklyPlan = (plan: DayPlan[]) => {
    try {
      const now = Date.now();
      const expiresAt = now + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000); // 15 días en milliseconds

      const dataToStore: StoredWeeklyPlan = {
        data: plan,
        timestamp: now,
        expiresAt
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.warn('Error saving weekly plan to localStorage:', error);
    }
  };

  const clearWeeklyPlan = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Error clearing weekly plan from localStorage:', error);
    }
  };

  // Crear el ref reactivo con los datos cargados
  const weeklyPlan = ref<DayPlan[]>(loadWeeklyPlan());

  // Observar cambios y guardar automáticamente
  watch(weeklyPlan, (newPlan) => {
    saveWeeklyPlan(newPlan);
  }, { deep: true });

  const updateRecipe = (day: string, mealType: 'lunch' | 'dinner', newRecipe: Recipe) => {
    const dayPlan = weeklyPlan.value.find(plan => plan.day === day);
    
    if (dayPlan) {
      if (mealType === 'lunch') {
        dayPlan.lunchRecipe = newRecipe;
      } else {
        dayPlan.dinnerRecipe = newRecipe;
      }
    }
  };

  const resetToDefault = () => {
    weeklyPlan.value = getDefaultWeeklyPlan();
  };

  return {
    weeklyPlan,
    updateRecipe,
    resetToDefault,
    clearWeeklyPlan
  };
}