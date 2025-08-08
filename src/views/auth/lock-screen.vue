<template>
  <AuthLayout>
    <div class="backdrop-blur-2xl bg-default-950/40 rounded-2xl overflow-hidden max-w-5xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-10">
        <div class="hidden lg:block ps-4 py-4">
          <div class="relative rounded-xl overflow-hidden h-full w-full">
            <img :src="authImg" alt="" class="w-full h-full transform -scale-x-100">
            <div class="absolute inset-0 bg-default-950/40">
              <div class="flex items-end justify-center h-full">
                <div class="p-6 text-start">
                  <h5 class="text-xl font-bold text-white mb-3">Is the best way, <br> to build your marketing strategy!
                  </h5>
                  <p class="text-base font-medium text-default-400">Try all paid functions for free. just register and
                    create your first widget, it simple and fast.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col h-full p-10 lg:ps-0">
          <div class="pb-10">
            <LogoBox/>
          </div>
          <div class="mt-auto text-center">
            <div
                class="inline-flex items-center justify-center h-28 w-28 mx-auto rounded-full overflow-hidden p-1.5 border border-white/20 bg-white/10 mb-4">
              <img :src="avatar1" alt="avatar-img-8" class="h-full w-full rounded-full">
            </div>
            <h4 class="text-2xl font-bold text-white mb-4">Hi Adams</h4>
            <p class="text-default-300 mb-5 max-w-sm mx-auto">Enter your password to access.</p>

            <form action="#" class="text-start">
              <div class="mb-4">
                <label for="password"
                       class="block text-base/normal font-semibold text-default-200 mb-2">Password</label>
                <input
                    class="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                    type="password" id="password" placeholder="Enter your password">
              </div>

              <div class="text-center">
                <button
                    class="w-full inline-flex items-center justify-center px-6 py-2 backdrop-blur-2xl bg-primary-600/90 text-white rounded-lg transition-all duration-500 group hover:bg-primary-600 mt-5"
                    type="submit"><span class="fw-bold">Sign In</span></button>
              </div>
            </form>
          </div>
          <div class="mt-10">
            <div class="text-center">
              <p class="text-lg text-default-200 font-semibold mb-4">Sign in with</p>
              <ul class="flex flex-wrap items-center justify-center gap-2">
                <li>
                  <a href="javascript:void(0);"
                     class="h-10 w-10 inline-flex items-center justify-center backdrop-blur-2xl bg-white/20 rounded-lg transition-all duration-500 group hover:bg-blue-600/60"><i
                      class="mdi mdi-facebook text-2xl text-white group-hover:text-white"></i></a>
                </li>
                <li>
                  <a href="javascript:void(0);"
                     class="h-10 w-10 inline-flex items-center justify-center backdrop-blur-2xl bg-white/20 rounded-lg transition-all duration-500 group hover:bg-pink-600/60"><i
                      class="mdi mdi-instagram text-2xl text-white group-hover:text-white"></i></a>
                </li>
                <li>
                  <a href="javascript:void(0);"
                     class="h-10 w-10 inline-flex items-center justify-center backdrop-blur-2xl bg-white/20 rounded-lg transition-all duration-500 group hover:bg-blue-800/60"><i
                      class="mdi mdi-linkedin text-2xl text-white group-hover:text-white"></i></a>
                </li>
                <li>
                  <a href="javascript:void(0);"
                     class="h-10 w-10 inline-flex items-center justify-center backdrop-blur-2xl bg-white/20 rounded-lg transition-all duration-500 group hover:bg-default-600/60"><i
                      class="mdi mdi-github text-2xl text-white group-hover:text-white"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full text-center mt-5">
      <p class="text-default-300 leading-6 text-base font-medium">Back To
        <router-link :to="{name:'auth.sign-up'}" class="text-primary font-semibold ms-1">Sign In</router-link>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import LogoBox from "@/components/LogoBox.vue";
import authImg from "@/assets/images/ai/auth-img.jpg"
import avatar1 from "@/assets/images/avatars/img-1.png"
</script>