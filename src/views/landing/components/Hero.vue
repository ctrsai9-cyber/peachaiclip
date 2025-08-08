<template>
  <section id="home" class="relative pt-[72px] overflow-hidden" data-aos="zoom-out" data-aos-easing="ease"
           data-aos-duration="1000">
    <div
        class="relative bg-gradient-to-l from-red-800/40 to-violet-800/40 backdrop-blur-3xl rounded-2xl overflow-hidden mx-10">
      <div>
        <div class="absolute h-14 w-14 bg-primary/20 top-1/4 end-[10%] -z-1 rounded-full animate-ping"></div>
        <div class="absolute top-10 start-[20%] -z-1 rounded-full animate-ping">
          <Hexagon
              class="h-14 w-14 text-transparent fill-orange-500/20"/>
        </div>
        <div class="absolute top-10 end-[20%] -z-1 rounded-full animate-[spin_10s_linear_infinite]"><img
            :src="star" alt="" class="h-8 w-8"></div>
        <div class="absolute top-1/4 start-[10%] -z-1 rounded-full animate-[spin_10s_linear_infinite]"><img
            :src="star" alt="" class="h-8 w-8"></div>
      </div>
      <div class="container relative">
        <div class="flex items-center justify-center pt-20">
          <div class="max-w-4xl mx-auto text-center">
            <div>
              <img :src="logoSmall" alt="" class="h-20 mx-auto">
            </div>
            <h1 class="font-semibold text-white text-4xl/snug mb-6 tracking-wide capitalize">
              WebAI- AI Startup & Technology Landing Page HTML Template built for

              <span id="typewrite" class="typewrite capitalize relative text-primary underline">
                <span class="wrap"></span>
              </span>
            </h1>
            <p class="text-lg text-default-200 font-medium mb-8">
              Start working with Tailwindcss It allows you to compose complex designs by combining and customizing
              utility classes..
            </p>
            <a class="w-auto inline-flex items-center font-semibold gap-2 px-6 py-2.5 rounded-full transition-all duration-300 text-white bg-primary hover:shadow-primary-200 hover:shadow-xl"
               href="#demo">
              View Demos
              <Eye class="h-5 w-5"/>
            </a>
          </div>
        </div>
      </div>
      <div class="grid-cols-1">
        <div class="mt-14 mb-6">
          <div class="relative gap-8 m-auto flex overflow-hidden">
            <div class="marquee__group gap-8 flex items-center justify-around flex-shrink-0 min-w-full">
              <img v-for="(img,idx) in demoImages" :key="idx" class="aspect-1 object-cover rounded-lg h-60 w-full"
                   :src="img" alt="">
            </div>

            <div aria-hidden="true"
                 class="marquee__group gap-8 flex items-center justify-around flex-shrink-0 min-w-full">
              <img v-for="(img,idx) in authImages" :key="idx" class="aspect-1 object-cover rounded-lg h-60 w-full"
                   :src="img" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {init} from 'ityped'
import {Hexagon, Eye} from "lucide-vue-next";
import star from "@/assets/images/ai/star.svg"
import logoSmall from "@/assets/images/logo-sm.png"

import demo1 from "@/assets/images/demo/demo1.png"
import demo2 from "@/assets/images/demo/demo2.png"
import demo3 from "@/assets/images/demo/demo3.png"
import demo4 from "@/assets/images/demo/demo4.png"
import demo5 from "@/assets/images/demo/demo5.png"

import loginImg from "@/assets/images/demo/auth-login.png"
import qrLoginImg from "@/assets/images/demo/auth-qr-login.png"
import registerImg from "@/assets/images/demo/auth-register.png"
import lockScreenImg from "@/assets/images/demo/auth-lock-screen.png"
import forgotPWImg from "@/assets/images/demo/auth-forgotpw.png"
import {onMounted} from "vue";

const demoImages = [demo1, demo2, demo3, demo4, demo5]

const authImages = [loginImg, qrLoginImg, registerImg, lockScreenImg, forgotPWImg]

onMounted(() => {
  const element = document.getElementById('typewrite')
  if (element) {
    init(element, {
      showCursor: false,
      strings: ["Ai Content", "NFTs", "Ai Image Generator", "Video Creator", "Ai Business Tools"],
      startDelay: 1000,
      backDelay: 1000,
    })
  }
})
</script>