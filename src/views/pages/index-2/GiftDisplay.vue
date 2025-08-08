<template>
    <div class="absolute top-1/3 left-4 w-72 pointer-events-none">
      <transition-group name="gift-animation">
        <div v-for="gift in gifts" :key="gift.displayId" class="p-2 mb-2 bg-black bg-opacity-60 rounded-full flex items-center shadow-lg">
          <img :src="gift.image" class="w-12 h-12"/>
          <div class="ml-2">
            <p class="text-white font-bold text-sm">{{ gift.user }}</p>
            <p class="text-yellow-300 text-xs">送出了 {{ gift.name }}</p>
          </div>
        </div>
      </transition-group>
    </div>
  </template>
  
  <script setup>
  defineProps({
    gifts: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style scoped>
  /* 礼物入场/出场动画 */
  .gift-animation-enter-active,
  .gift-animation-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .gift-animation-enter-from,
  .gift-animation-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  </style>