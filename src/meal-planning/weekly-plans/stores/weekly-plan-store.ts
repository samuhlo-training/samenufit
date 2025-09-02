import { defineStore } from 'pinia';
import type { Recipe } from '@/shared/types';
import type { WeeklyPlanState, WeekDay, MealTime } from '../types';

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
          this.plan = parsedPlan;
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

    // Update a specific meal
    setMeal(day: WeekDay, mealTime: MealTime, recipe: Recipe | null) {
      this.plan[day][mealTime] = recipe;
      this.saveToStorage();
    },

    // Clear all meals
    clearAll() {
      this.plan = createEmptyWeek();
      this.saveToStorage();
    },

    // Get day plan in array format (for compatibility)
    getDayPlan(dayName: string) {
      const dayMap: Record<string, WeekDay> = {
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