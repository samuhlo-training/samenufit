import { computed } from 'vue';
import type { Recipe } from '@/shared/types';
import { useWeeklyPlanStore } from '../stores/weekly-plan-store';
import type { WeekDay, MealTime } from '../types';

export const useWeeklyPlan = () => {
  const store = useWeeklyPlanStore();

  // Initialize the store when composable is used
  const init = async () => {
    await store.loadFromStorage();
  };

  // Computed state
  const weeklyPlan = computed(() => store.plan);

  // Actions
  const setMeal = (day: WeekDay, mealTime: MealTime, recipe: Recipe | null) => {
    store.setMeal(day, mealTime, recipe);
  };

  const clearAll = () => {
    store.clearAll();
  };

  // Get meals for a specific day
  const getDayMeals = (day: WeekDay) => {
    return computed(() => store.plan[day]);
  };

  // Get all planned meals in array format
  const getAllPlannedMeals = computed(() => {
    const meals: { day: string; meal: string; recipe: Recipe }[] = [];
    
    Object.entries(store.plan).forEach(([dayKey, dayPlan]) => {
      const dayName = Object.entries({
        monday: 'Lunes',
        tuesday: 'Martes', 
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo'
      }).find(([key]) => key === dayKey)?.[1];

      if (dayPlan.lunch) {
        meals.push({
          day: dayName || dayKey,
          meal: 'Almuerzo',
          recipe: dayPlan.lunch
        });
      }
      
      if (dayPlan.dinner) {
        meals.push({
          day: dayName || dayKey,
          meal: 'Cena', 
          recipe: dayPlan.dinner
        });
      }
    });
    
    return meals;
  });

  // Calculate total macros for the week
  const weeklyMacros = computed(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    Object.values(store.plan).forEach(dayPlan => {
      if (dayPlan.lunch) {
        totalCalories += dayPlan.lunch.macros.calories;
        totalProtein += dayPlan.lunch.macros.protein;
        totalCarbs += dayPlan.lunch.macros.carbs;
        totalFat += dayPlan.lunch.macros.fat;
      }
      
      if (dayPlan.dinner) {
        totalCalories += dayPlan.dinner.macros.calories;
        totalProtein += dayPlan.dinner.macros.protein;
        totalCarbs += dayPlan.dinner.macros.carbs;
        totalFat += dayPlan.dinner.macros.fat;
      }
    });

    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    };
  });

  // Calculate daily average macros
  const dailyAverageMacros = computed(() => {
    const weekly = weeklyMacros.value;
    return {
      calories: Math.round(weekly.calories / 7),
      protein: Math.round(weekly.protein / 7),
      carbs: Math.round(weekly.carbs / 7),
      fat: Math.round(weekly.fat / 7)
    };
  });

  // Legacy methods for compatibility with old API
  const getDayPlan = (dayName: string) => store.getDayPlan(dayName);
  const getAllDays = () => store.getAllDays();

  return {
    // State
    weeklyPlan,
    
    // Actions
    init,
    setMeal,
    clearAll,
    
    // Getters
    getDayMeals,
    getAllPlannedMeals,
    weeklyMacros,
    dailyAverageMacros,
    
    // Legacy compatibility
    getDayPlan,
    getAllDays,
  };
};