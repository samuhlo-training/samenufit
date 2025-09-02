import type { IngredientCategory } from '../types';

// Utility function to categorize ingredients based on name
export const getIngredientCategory = (name: string): IngredientCategory => {
  const lowerName = name.toLowerCase();

  if (
    lowerName.includes('carne') ||
    lowerName.includes('pollo') ||
    lowerName.includes('atún') ||
    lowerName.includes('bistec') ||
    lowerName.includes('ternera') ||
    lowerName.includes('gambas') ||
    lowerName.includes('langostinos') ||
    lowerName.includes('camarones') ||
    lowerName.includes('hamburguesa') ||
    lowerName.includes('claras') ||
    lowerName.includes('proteína')
  ) {
    return 'Proteína';
  }

  if (
    lowerName.includes('arroz') ||
    lowerName.includes('taco') ||
    lowerName.includes('wrap') ||
    lowerName.includes('patata') ||
    lowerName.includes('pasta') ||
    lowerName.includes('avena') ||
    lowerName.includes('pan') ||
    lowerName.includes('tortilla')
  ) {
    return 'Carbohidrato';
  }

  if (
    lowerName.includes('calabacín') ||
    lowerName.includes('lechuga') ||
    lowerName.includes('calabaza') ||
    lowerName.includes('tomate') ||
    lowerName.includes('cebolla') ||
    lowerName.includes('hoja') ||
    lowerName.includes('verdes') ||
    lowerName.includes('espinaca')
  ) {
    return 'Verdura';
  }

  if (
    lowerName.includes('aceite') ||
    lowerName.includes('mantequilla') ||
    lowerName.includes('aguacate')
  ) {
    return 'Grasa';
  }

  if (lowerName.includes('leche') || lowerName.includes('yogur') || lowerName.includes('queso')) {
    return 'Lacteos';
  }

  return 'Otro';
};

// Utility functions for date and formatting
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Utility to generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Day name mapping utilities
export const DAY_NAMES_ES = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export const DAY_MAP: Record<
  string,
  'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
> = {
  Lunes: 'monday',
  Martes: 'tuesday',
  Miércoles: 'wednesday',
  Jueves: 'thursday',
  Viernes: 'friday',
  Sábado: 'saturday',
  Domingo: 'sunday',
};
