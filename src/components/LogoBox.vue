<template>
  <router-link :to="{name:'landing'}" class="logo">
    <img :src="logo" class="h-10" alt="WebAi Logo">
  </router-link>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo.png";
</script>