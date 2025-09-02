import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/modules/landing/layout/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/weekly-plan',
      component: MainLayout,
      children: [
        {
          path: 'weekly-plan',
          name: 'WeeklyPlan',
          component: () => import('@/modules/weeklyplan/views/WeeklyPlanView.vue'),
        },
        {
          path: 'shopping-list',
          name: 'ShoppingList',
          component: () => import('@/modules/shoppinglist/views/ShoppingListView.vue'),
        },
        {
          path: 'recipe-book',
          name: 'RecipeBook',
          component: () => import('@/modules/recipebook/views/RecipeBookView.vue'),
        },
        {
          path: 'conversion-tab',
          name: 'ConversionTab',
          component: () => import('@/modules/conversiontab/views/ConversionTabView.vue'),
        },
      ],
    },
  ],
});

export default router;
