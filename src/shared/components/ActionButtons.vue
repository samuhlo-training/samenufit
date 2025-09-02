<template>
  <div class="flex gap-2" :class="containerClass">
    <button
      v-for="button in buttons"
      :key="button.id"
      @click="handleClick(button.id)"
      :class="getButtonClass(button.variant)"
      :disabled="button.disabled"
    >
      {{ button.label }}
    </button>

    <!-- Mensaje de confirmación (opcional) -->
    <Transition
      v-if="showConfirmationMessage"
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 transform scale-0 rotate-12"
      enter-to-class="opacity-100 transform scale-100 -rotate-3"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform scale-100 -rotate-3"
      leave-to-class="opacity-0 transform scale-0 rotate-12"
    >
      <div
        v-if="confirmationVisible"
        class="absolute top-1/2 -translate-y-1/2 left-full ml-4 bg-[var(--secondary-color)] text-[var(--main-color)] px-3 py-2 rounded-full text-sm font-bold shadow-lg transform -rotate-3 whitespace-nowrap z-10"
      >
        {{ confirmationMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// No imports needed currently

export interface ActionButton {
  id: string;
  label: string;
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}

interface Props {
  buttons: ActionButton[];
  containerClass?: string;
  showConfirmationMessage?: boolean;
  confirmationVisible?: boolean;
  confirmationMessage?: string;
}

interface Emits {
  (e: 'button-click', buttonId: string): void;
}

withDefaults(defineProps<Props>(), {
  containerClass: '',
  showConfirmationMessage: false,
  confirmationVisible: false,
  confirmationMessage: '✓ ¡Completado!',
});

const emit = defineEmits<Emits>();

const handleClick = (buttonId: string) => {
  emit('button-click', buttonId);
};

const getButtonClass = (variant: 'primary' | 'secondary') => {
  const baseClass =
    'font-bold text-sm uppercase py-3 px-6 items-center rounded-full cursor-pointer hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  if (variant === 'primary') {
    return `${baseClass} bg-[var(--primary-color)] text-text-main-color`;
  } else {
    return `${baseClass} border border-[var(--main-color)] text-text-main-color`;
  }
};
</script>
