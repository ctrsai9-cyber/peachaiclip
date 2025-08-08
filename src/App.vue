<template>
  <RouterView/>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import {onMounted} from 'vue';
import configureFakeBackend from "@/helpers/fake-backend";

import {type IStaticMethods} from "preline/preline";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

onMounted(() => {
  setTimeout(() => {
    window.HSStaticMethods.autoInit();
  }, 100)
});

configureFakeBackend()
</script>