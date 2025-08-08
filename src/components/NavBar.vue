<template>
  <header class="navbar" :class="navClass">
    <div class="container">
      <nav>

        <LogoBox/>

        <div class="lg:hidden flex items-center ms-auto px-2.5">
          <button
              class="hs-collapse-toggle inline-flex items-center justify-center h-9 w-12 rounded-md border border-white/20 bg-default-100/5"
              type="button" id="hs-unstyled-collapse" data-hs-collapse="#mobileMenu" data-hs-type="collapse">
            <Menu class="h-5 w-5 stroke-white"/>
          </button>
        </div>

        <div id="mobileMenu"
             class="hs-collapse transition-all duration-300 lg:basis-auto basis-full grow hidden lg:flex items-center justify-center mx-auto mt-2 lg:mt-0">
          <ul id="navbar-navlist" class="navbar-nav">
            <li v-for="(link,idx) in navLinks" :key="link.id" class="nav-item"
                :class="{ 'active': activeSectionIndex === idx }">
              <router-link :to=" link.route.url ? link.route.url : link.route" class="nav-link">
                {{ link.label }}
              </router-link>
            </li>
          </ul>

          <div class="lg:hidden flex items-center pt-4 mt-4 lg:pt-0 lg:mt-0 border-t border-white/10 lg:border-none">
            <a href="#"
               class="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-3">
              <ArrowBigDownDash class="h-5 w-5 me-2"/>
              Download</a>
          </div>
        </div>

        <div class="hidden lg:flex items-center">
          <a v-if="!username" href="/auth/sign-in"
             class="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300">
           
             登录 </a>
            <el-button v-else @click="touser()" color="#626aef">个人中心</el-button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, type PropType, ref} from "vue";
import type {NavBarLinkType} from "@/types/layout";
import LogoBox from "@/components/LogoBox.vue";
import { useRouter } from 'vue-router'
const router = useRouter()

import {ArrowBigDownDash, Menu} from 'lucide-vue-next';

const props = defineProps({
  navLinks: {
    type: Array as PropType<NavBarLinkType[]>,
    required: true
  }
})

const navClass = ref<string>('')
const username = ref();
onMounted(() => {
  username.value = localStorage.getItem("username");
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      navClass.value = 'nav-sticky'
    } else {
      navClass.value = ''
    }
  });

  window.addEventListener("scroll", getActiveSectionIndex);
})

onUnmounted(() => {
  window.removeEventListener("scroll", getActiveSectionIndex);
})

let activeSectionIndex = ref(0)

const getActiveSectionIndex = () => {
  const currentScrollPos = window.pageYOffset;

  for (let i = 0; i < props.navLinks.length; i++) {
    const section = document.getElementById(props.navLinks[i].id);
    if (section) {
      const sectionTop = section.offsetTop - 70;
      const sectionHeight = section.offsetHeight;
      if (
          currentScrollPos >= sectionTop &&
          currentScrollPos < sectionTop + sectionHeight
      ) {
        activeSectionIndex.value = i;
        break;
      }
    }
  }
}

const loginout = () =>
{
  localStorage.removeItem("username");
  localStorage.removeItem("user");
  router.push({name: 'auth.sign-in'})

}

const touser = () =>{
  router.push({name: 'user'})

}
</script>