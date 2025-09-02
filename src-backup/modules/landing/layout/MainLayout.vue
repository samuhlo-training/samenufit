<template>
  <div class="min-h-screen w-full">
    <MenuHeader />

    <main
      class="min-h-screen p-10 mx-auto mb-5 max-w-7xl w-full rounded-lg bg-white/50 backdrop-blur-xl border border-white/20 shadow-lg"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import MenuHeader from '@/modules/common/components/MenuHeader.vue';
</script>
