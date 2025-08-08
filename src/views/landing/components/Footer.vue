<template>
  <footer class="bg-default-950/40 backdrop-blur-3xl">
    <div class="border-t border-white/10 py-6">
      <div
          class="container lg:px-20 flex flex-wrap justify-center items-center gap-4 h-full md:justify-between text-center md:text-start">
        <p class="text-base font-medium text-gray-400">
          {{ currentYear }}
          © {{ appName }} - <a href="#">Design & Crafted
          <Heart class="inline h-4 w-4 text-red-500 fill-red-500"/>
          by
          {{ appAuthor }}</a>
        </p>
        <p class="text-base font-medium text-gray-400">
          <a href="#">Terms Conditions & Policy</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {appName, appAuthor, currentYear} from "@/helpers";
import {Heart} from "lucide-vue-next";
</script>