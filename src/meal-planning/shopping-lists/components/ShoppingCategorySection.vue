<template>
  <div class="bg-[#fff3e3] rounded-xl shadow-md p-6 mb-4">
    <h2 class="font-bold mona-sans-custom text-lg text-text-main-color uppercase pb-2 mb-3">
      {{ categoryName }}
    </h2>

    <div class="space-y-3">
      <div v-for="item in items" :key="item.id" class="flex justify-between items-center px-3">
        <span class="text-[#44200E] font-medium">{{ item.name }}</span>
        <span class="text-[#44200E] font-semibold">{{ formatQuantity(item) }}</span>
      </div>
    </div>

    <!-- Category total price -->
    <div class="mt-3 pt-3">
      <div class="flex justify-end">
        <span
          class="gochi-hand-regular text-4xl font-bold text-[var(--accent-color)] px-3 rounded-lg"
        >
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

// Calculate category total based on item prices from shopping list
const formatCategoryTotal = (items: ShoppingListItem[]) => {
  const total = items.reduce((sum, item) => {
    // Use the estimated price from the item (calculated from pricePerUnit * quantity)
    if (item.estimatedPrice) {
      return sum + item.estimatedPrice;
    }
    return sum; // Skip items without price data
  }, 0);

  return Math.round(total * 100) / 100; // Round to 2 decimal places
};
</script>
