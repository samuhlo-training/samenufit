import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/weekly-plan',
      component: () => import('@/app/layout/MainLayout.vue'),
      children: [
        {
          path: 'weekly-plan',
          name: 'WeeklyPlan',
          component: () => import('@/app/pages/WeeklyPlanPage.vue'),
        },
        {
          path: 'shopping-list',
          name: 'ShoppingList',
          component: () => import('@/app/pages/ShoppingListPage.vue'),
        },
        {
          path: 'recipe-book',
          name: 'RecipeBook',
          component: () => import('@/app/pages/RecipeBookPage.vue'),
        },
        {
          path: 'conversion-tab',
          name: 'ConversionTab',
          component: () => import('@/app/pages/ConversionTabPage.vue'),
        },
      ],
    },
  ],
});

export default router;