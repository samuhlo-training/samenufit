<template>
  <div class="bg-[#fff3e3] rounded-xl shadow-md p-6 mb-4">
    <h2 class="text-xl font-bold mb-4 uppercase text-[#8b4513] pb-2">
      {{ categoryName }}
    </h2>

    <div class="space-y-3">
      <div v-for="item in items" :key="item.id" class="flex justify-between items-center px-3">
        <span class="text-[#8b4513] font-medium">{{ item.name }}</span>
        <span class="text-[#8b4513] font-semibold">{{ formatQuantity(item) }}</span>
      </div>
    </div>

    <!-- Category total price -->
    <div class="mt-3 pt-3">
      <div class="flex justify-end">
        <span class="text-xl font-bold text-[var(--accent-color)] px-3 rounded-lg">
          {{ formatCategoryTotal(items) }}€
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShoppingListItem } from '../composables/useShoppingList';

interface Props {
  categoryName: string;
  items: ShoppingListItem[];
}

defineProps<Props>();

// Format quantity with unit
const formatQuantity = (item: ShoppingListItem) => {
  return `${item.totalQuantity}${item.unit}`;
};

// Calculate category total based on individual item prices
const formatCategoryTotal = (items: ShoppingListItem[]) => {
  // Base price per unit for different ingredients (approximate Spanish prices)
  const basePrices: Record<string, number> = {
    // Proteínas
    Pollo: 6.5,
    Ternera: 12,
    Cerdo: 8,
    Pavo: 7,
    Salmón: 15,
    Atún: 4,
    Huevos: 0.25,
    Tofu: 3,
    Garbanzos: 1.2,

    // Lácteos
    Leche: 1,
    Yogur: 0.8,
    Queso: 8,
    Mantequilla: 4,

    // Verduras y frutas
    Tomate: 2.5,
    Cebolla: 1.5,
    Ajo: 4,
    Pimiento: 3,
    Espinacas: 2,
    Brócoli: 2.5,
    Zanahoria: 1.2,
    Apio: 2,
    Limón: 2.5,
    Perejil: 1.5,

    // Carbohidratos
    Arroz: 1.5,
    Pasta: 1.2,
    Pan: 2,
    Patata: 1,
    Quinoa: 4,
    Avena: 2.5,

    // Grasas
    'Aceite de oliva': 4,
    Aguacate: 1.5,
    Almendras: 8,
    Nueces: 10,

    // Otros
    Sal: 0.5,
    Pimienta: 8,
    Comino: 6,
    Pimentón: 4,
    Azúcar: 1,
    Miel: 5,
  };

  const total = items.reduce((sum, item) => {
    const basePrice = basePrices[item.name] || 2; // Default price if not found
    const quantity = item.totalQuantity;

    // Adjust price based on unit (rough conversion)
    let unitMultiplier = 1;
    if (item.unit === 'g') unitMultiplier = 0.001;
    else if (item.unit === 'ml') unitMultiplier = 0.001;
    else if (item.unit === 'u') unitMultiplier = 1;

    return sum + basePrice * quantity * unitMultiplier;
  }, 0);

  return Math.round(total * 100) / 100; // Round to 2 decimal places
};
</script>
