<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <!-- Header with action buttons -->
    <div class="flex flex-col gap-2 items-center justify-center w-full max-w-4xl mb-7">
      <h1 class="text-4xl mona-sans-custom uppercase font-bold text-[#8b4513]">
        Lista de la Compra
      </h1>
      <div v-if="shoppingList.length > 0" class="flex gap-2">
        <button
          @click="exportList"
          class="bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="shoppingList.length === 0" class="text-center py-12">
      <p class="text-[#8b4513] text-lg mb-4">No hay elementos en la lista de compra.</p>
      <p class="text-[#8b4513]/70">
        Añade recetas a tu plan semanal y la lista se generará automáticamente.
      </p>
    </div>

    <!-- Shopping List Cards -->
    <div v-else class="w-full max-w-6xl">
      <!-- Grid of category cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ShoppingCategorySection
          v-for="[category, items] in availableCategories"
          :key="category"
          :category-name="category"
          :items="items"
        />
      </div>

      <!-- Total Section -->
      <div class="bg-[#fff3e3] rounded-xl shadow-md border border-[#8b4513]/10 p-6">
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-[#8b4513] uppercase">Total Aprox:</span>
          <div class="text-right">
            <div class="text-4xl font-bold text-[#C5DF67]">{{ formatTotal(totalCost) }}€</div>
            <div class="w-20 h-2 bg-[#C5DF67] ml-auto mt-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useShoppingList } from '@/meal-planning/shopping-lists';
import { useWeeklyPlan } from '@/meal-planning/weekly-plans';
import ShoppingCategorySection from '@/meal-planning/shopping-lists/components/ShoppingCategorySection.vue';

const { generateShoppingList, groupByCategory, formatForExport } = useShoppingList();
const { getAllPlannedMeals, init } = useWeeklyPlan();

// Initialize weekly plan on mount
onMounted(() => {
  init();
});

// Auto-generate shopping list whenever planned meals change
const shoppingList = computed(() => {
  const plannedMeals = getAllPlannedMeals.value;
  const recipes = plannedMeals.map((meal) => meal.recipe);
  return generateShoppingList(recipes);
});

// Group items by category
const groupedList = computed(() => {
  return groupByCategory(shoppingList.value).value;
});

// Filter out categories that have no items
const availableCategories = computed(() => {
  const entries = Object.entries(groupedList.value);
  return entries.filter(([, items]) => items.length > 0);
});

// Calculate total by summing individual category totals
const totalCost = computed(() => {
  return availableCategories.value.reduce((total, [, items]) => {
    return total + calculateCategoryTotal(items);
  }, 0);
});

// Calculate category total (same logic as in component)
const calculateCategoryTotal = (items: { name: string; totalQuantity: number; unit: string }[]) => {
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
    const basePrice = basePrices[item.name] || 2;
    const quantity = item.totalQuantity;

    let unitMultiplier = 1;
    if (item.unit === 'g') unitMultiplier = 0.001;
    else if (item.unit === 'ml') unitMultiplier = 0.001;
    else if (item.unit === 'unidad(es)') unitMultiplier = 1;

    return sum + basePrice * quantity * unitMultiplier;
  }, 0);

  return Math.round(total * 100) / 100;
};

// Format total cost
const formatTotal = (cost: number) => {
  return Math.round(cost * 100) / 100;
};

// Export shopping list
const exportList = () => {
  const formatted = formatForExport(shoppingList.value, 'text');

  // Create and download file
  const blob = new Blob([formatted], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'lista-compra.txt';
  link.click();
  URL.revokeObjectURL(url);
};
</script>
