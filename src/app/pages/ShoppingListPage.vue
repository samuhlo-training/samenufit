<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-7">
      <h1 class="text-4xl mona-sans-custom uppercase font-bold">Lista de la Compra</h1>
      <div class="flex gap-2">
        <button
          @click="generateList"
          class="bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/80 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Generar Lista
        </button>
        <button
          v-if="shoppingList.length > 0"
          @click="exportList"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
    </div>

    <div v-if="shoppingList.length === 0" class="text-center py-12">
      <p class="text-gray-600 text-lg mb-4">No hay elementos en la lista de compra.</p>
      <p class="text-gray-500">Genera una lista basada en tu plan semanal.</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Summary -->
      <div class="bg-white/30 backdrop-blur-sm rounded-lg p-4">
        <div class="flex justify-between items-center">
          <span class="font-medium">Total de elementos: {{ shoppingList.length }}</span>
          <span v-if="totalCost > 0" class="font-bold">Coste estimado: €{{ totalCost.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Search -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar ingredientes..."
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Shopping list grouped by category -->
      <div class="space-y-4">
        <div v-for="[category, items] in Object.entries(groupedList)" :key="category">
          <h2 class="text-xl font-bold mb-3 uppercase mona-sans-custom text-[var(--accent-color)]">
            {{ category }}
          </h2>
          <div class="grid gap-2">
            <div
              v-for="item in items"
              :key="item.id"
              class="flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <input
                type="checkbox"
                :id="item.id"
                class="h-5 w-5 text-[var(--accent-color)] focus:ring-[var(--accent-color)] rounded"
              />
              <label :for="item.id" class="flex-1 cursor-pointer">
                <span class="font-medium">{{ item.name }}</span>
                <span class="text-gray-600 ml-2">{{ item.totalQuantity }} {{ item.unit }}</span>
                <div v-if="item.recipes.length > 0" class="text-xs text-gray-500">
                  Para: {{ item.recipes.join(', ') }}
                </div>
              </label>
              <span v-if="item.estimatedPrice" class="text-sm text-gray-600">
                €{{ item.estimatedPrice.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useShoppingList, type ShoppingListItem } from '@/meal-planning/shopping-lists';
import { useWeeklyPlan } from '@/meal-planning/weekly-plans';

const { generateShoppingList, groupByCategory, calculateTotalCost, formatForExport, filterItems } = useShoppingList();
const { getAllPlannedMeals } = useWeeklyPlan();

const shoppingList = ref<ShoppingListItem[]>([]);
const searchQuery = ref('');

// Generate shopping list from planned meals
const generateList = () => {
  const plannedMeals = getAllPlannedMeals.value;
  const recipes = plannedMeals.map(meal => meal.recipe);
  shoppingList.value = generateShoppingList(recipes);
};

// Filter and group items
const filteredList = computed(() => {
  return filterItems(shoppingList.value, searchQuery.value).value;
});

const groupedList = computed(() => {
  return groupByCategory(filteredList.value).value;
});

const totalCost = computed(() => {
  return calculateTotalCost(filteredList.value).value;
});

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