import type { Recipe } from '@/shared/types';

export interface WeeklyPlanState {
  monday: { lunch: Recipe | null; dinner: Recipe | null };
  tuesday: { lunch: Recipe | null; dinner: Recipe | null };
  wednesday: { lunch: Recipe | null; dinner: Recipe | null };
  thursday: { lunch: Recipe | null; dinner: Recipe | null };
  friday: { lunch: Recipe | null; dinner: Recipe | null };
  saturday: { lunch: Recipe | null; dinner: Recipe | null };
  sunday: { lunch: Recipe | null; dinner: Recipe | null };
}

export type WeekDay = keyof WeeklyPlanState;
export type MealTime = 'lunch' | 'dinner';