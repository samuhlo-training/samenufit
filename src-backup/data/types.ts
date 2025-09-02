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
  unit: 'g' | 'ml' | 'unidad(es)';
  category: IngredientCategory;
  pricePerUnit?: number; // Opcional, para calcular el coste
}

// Describe una receta completa
export interface Recipe {
  id: string;
  name: string;
  description: string;
  type: 'Almuerzo' | 'Cena' | 'Desayuno' | 'Snack';
  instructions: string[];
  ingredients: Ingredient[];
  macros: {
    calories: number; // en kcal
    protein: number; // en gramos
    carbs: number; // en gramos
    fat: number; // en gramos
  };
  // Podríamos añadir micros si es necesario
}

// Representa una comida específica en un día (Almuerzo o Cena)
export interface Meal {
  type: 'Almuerzo' | 'Cena';
  recipeId: string | null; // Usamos un ID para vincular a la receta
}

// Representa un día completo de la semana
export interface DayPlan {
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  meals: Meal[];
}
