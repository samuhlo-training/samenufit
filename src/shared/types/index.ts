// Shared types across all domains

// Define las categorías para agrupar ingredientes en la lista de la compra
export type IngredientCategory =
  | 'Proteína'
  | 'Carbohidrato'
  | 'Verdura'
  | 'Grasa'
  | 'Lacteos'
  | 'Otro';

// Describe un único ingrediente con su cantidad y unidad
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: 'g' | 'ml' | 'u';
  category: IngredientCategory;
  pricePerUnit?: number; // Opcional, para calcular el coste
}

// Macros nutritionales
export interface Macros {
  calories: number; // en kcal
  protein: number; // en gramos
  carbs: number; // en gramos
  fat: number; // en gramos
}

// Describe una receta completa
export interface Recipe {
  id: string;
  name: string;
  description: string;
  type: 'Almuerzo' | 'Cena' | 'Desayuno' | 'Snack';
  instructions: string[];
  ingredients: Ingredient[];
  macros: Macros;
}

// Tipos de comida
export type MealType = 'lunch' | 'dinner';
export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

// Represents a specific meal in a day (Lunch or Dinner)
export interface Meal {
  type: 'Almuerzo' | 'Cena';
  recipeId: string | null; // We use an ID to link to the recipe
}

// Represents a complete day of the week
export interface DayPlan {
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  meals: Meal[];
}
