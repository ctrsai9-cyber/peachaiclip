<template>

  <section class="flex items-center py-6 px-0 lg:p-10 w-full lg:h-screen">
    <div class="container">
      <slot/>
    </div>
  </section>
  <footer class="2xl:fixed bottom-0 start-0 end-0 py-3">
    <div class="container">
      <p class="text-base font-medium text-center text-default-200">
        {{ currentYear }}
        © {{ appName }} - <a href="#">Design & Crafted
        <Heart class="inline h-4 w-4 text-red-500 fill-red-500"/>
        by {{ appAuthor }}</a>
      </p>
    </div>
  </footer>

  <Background1/>
</template>

<script setup lang="ts">
import Background1 from "@/components/Background1.vue";
import {appAuthor, appName, currentYear} from "@/helpers";
import {Heart} from "lucide-vue-next";
import {onMounted, onUnmounted} from "vue";

const body = document.body

onMounted(() => {
  if (body) body.classList.add('relative', 'h-full')
})

onUnmounted(() => {
  if (body) body.classList.remove('relative', 'h-full')
})
</script>