<template>
  <footer class="bg-default-950/40 backdrop-blur-3xl">
    <div class="container py-20">
      <div class="grid md:grid-cols-4 grid-cols-2 gap-10 lg:gap-16">
        <div class="md:col-span-2 col-span-2">
          <img :src="logo" class="h-10" alt="">
          <p class="md:w-3/4 text-base font-medium text-default-200 mt-6">上传人脸照片，一键生成你的专属女友。自定义专属动作与场景，体验动态的亲密陪伴。
            全天候在线，随时随地倾听你的心声，告别孤单。</p>
          <div class="mt-6">
            <h6 class="text-base text-white mb-4">关注我们:</h6>
            <ul class="flex flex-wrap items-center gap-1">
              <li v-for="(link,idx) in socialLinks" :key="idx">
                <a :href="link.route.url" target="_blank"
                             class="h-10 w-10 inline-flex items-center justify-center border border-white/10 rounded-lg transition-all duration-500 group hover:bg-primary">
                  <component :is="link.icon" class="h-5 w-5 text-default-300 group-hover:text-white"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
<!--
        <div v-for="(item,idx) in footerItems" :key="idx">
          <ul class="flex flex-col gap-3">
            <h5 class="xl:text-xl lg:text-lg font-medium text-default-200 mb-2">{{ item.title }}</h5>
            <li v-for="link in item.links">
              <router-link :to="link.route.url ? link.route.url : link.route"
                           class="text-base font-normal text-slate-300 hover:text-primary transition-all">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
-->
      </div>
    </div>

    <div class="border-t border-white/10 py-6">
      <div
          class="container flex flex-wrap justify-center items-center gap-4 h-full md:justify-between text-center md:text-start">
        <p class="text-base font-medium text-default-400">
          {{ currentYear }}
          © {{ appName }} - <a href="#">Design & Crafted
          <Heart class="inline h-4 w-4 text-red-500 fill-red-500"/>
          by
          {{ appAuthor }}</a>
        </p>
        <p class="text-base font-medium text-default-400">
          <a href="#">Terms Conditions & Policy</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo.png"
import {appAuthor, appName, currentYear, socialLinks} from "@/helpers";
import {footerItems} from "@/views/pages/index-2/components/data";
import {Heart} from "lucide-vue-next";
</script>