<template>

  <NavBar :nav-links="navLinks"/>

  <Hero/>

  <Demos/>

  <Features/>

  <Footer/>

  <Background1/>

  <BackToTop/>

</template>

<script setup lang="ts">
import type {NavBarLinkType} from "@/types/layout";
import NavBar from "@/components/NavBar.vue";
import Hero from "@/views/landing/components/Hero.vue";
import Demos from "@/views/landing/components/Demos.vue";
import Features from "@/views/landing/components/Features.vue";
import Footer from "@/views/landing/components/Footer.vue";
import Background1 from "@/components/Background1.vue";
import BackToTop from "@/components/BackToTop.vue";

const navLinks: NavBarLinkType[] = [
  {
    id: 'home',
    label: 'Home',
    route: {url: '#home'}
  },
  {
    id: 'demo',
    label: 'Demo',
    route: {url: '#demo'}
  },
  {
    id: 'features',
    label: 'Features',
    route: {url: '#features'}
  }
]
</script>