<template>
  <section class="py-20" id="demo">
    <div class="container">
      <div class="mx-auto text-center mb-14">
        <span
            class="inline-flex text-base border-x-2 border-x-primary text-primary font-semibold px-2 rounded-full bg-primary/20 mb-2">Pre Built</span>
        <h2 class="text-3xl font-semibold text-default-100 mb-2.5">Home Pages</h2>
        <p class="text-base font-medium text-default-300">Start working with Tailwindcss <br> It allows you to compose
          complex designs.</p>
      </div>

      <div class="flex flex-wrap justify-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000">
        <template v-for="(item,idx) in landingDemos" :key="idx">
          <DemoCard :demo="item"/>
        </template>
      </div>
    </div>
  </section>

  <section class="py-20">
    <div class="container">
      <div class=" mx-auto text-center mb-14">
        <span
            class="inline-flex text-base border-x-2 border-x-primary text-primary font-semibold px-2 rounded-full bg-primary/20 mb-2">Account Pages</span>
        <h2 class="text-3xl font-semibold text-default-100 mb-2.5">Auth Pages</h2>
        <p class="text-base font-medium text-default-300">Start working with Tailwindcss <br> It allows you to compose
          complex designs.</p>
      </div>

      <div class="flex flex-wrap justify-content-center aos-init aos-animate" data-aos="fade-up"
           data-aos-duration="1000">
        <template v-for="(item,idx) in authDemos" :key="idx">
          <DemoCard :demo="item"/>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DemoCard from "@/views/landing/components/DemoCard.vue";
import {authDemos, landingDemos} from "@/views/landing/components/data";
</script>