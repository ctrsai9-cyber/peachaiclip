<template>
  <router-link :to="demo.route" class="w-full lg:w-1/2 p-3">
    <div
        class="relative group bg-default-950/40 shadow-xl rounded-lg text-center transition-all duration-500 hover:-translate-y-2">
      <div class="p-4">
        <div class="relative rounded-lg overflow-hidden ">
          <img alt="demo-img" class="w-full rounded-lg" :src="demo.image">
          <div
              class="absolute flex items-center justify-center h-full w-full bg-white/10 inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100 cursor-pointer">
            <div
                class="py-1.5 ps-5 pe-2 inline-flex items-center justify-center font-semibold align-middle duration-500 text-base text-center bg-primary hover:bg-primary-600 text-white rounded-full">
              Live Preview <span
                class="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white border border-white text-primary ms-3"><i
                class="mdi mdi-share-all-outline text-lg"></i></span>
            </div>
          </div>
        </div>
        <h5 class="mt-5 text-xl font-semibold text-white text-center capitalize">{{ demo.name }}</h5>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {DemoType} from "@/views/landing/components/types";

defineProps({
  demo: {
    type: Object as PropType<DemoType>,
    required: true
  }
})
</script>