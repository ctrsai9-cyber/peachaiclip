<template>
  <button ref="backToTop" id="back-to-top" @click="scrollToTop"
          class="fixed text-xl rounded-full z-10 bottom-5 end-5 h-8 w-8 text-center bg-white backdrop-blur-3xl text-default-950 flex justify-center items-center transition-all duration-500 hover:bg-primary hover:text-white hover:rounded-lg">
    <ChevronUp class="h-4 w-4"/>
  </button>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ChevronUp} from "lucide-vue-next";


const backToTop = ref<HTMLElement>()

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (backToTop.value) {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTop.value.classList.add("opacity-100");
        backToTop.value.classList.remove("opacity-0");
      } else {
        backToTop.value.classList.add("opacity-0");
        backToTop.value.classList.remove("opacity-100");
      }
    }
  })
})

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
</script>