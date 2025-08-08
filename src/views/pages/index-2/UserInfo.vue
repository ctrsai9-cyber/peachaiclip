<template>
    <div class="flex items-center space-x-2 p-2 bg-black bg-opacity-30 rounded-full">
      <img :src="user.avatar" class="w-10 h-10 rounded-full border-2 border-pink-400" />
      <div>
        <p class="font-bold text-white text-sm">{{ user.name }}</p>
        <p class="text-xs text-gray-200">{{ user.viewers.toLocaleString() }} 人正在观看</p>
      </div>
      <button class="ml-auto bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">关注</button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  </script>