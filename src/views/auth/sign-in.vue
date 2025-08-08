<template>
  <AuthLayout>
    <div class="backdrop-blur-2xl bg-default-950/40 rounded-2xl overflow-hidden max-w-5xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-10">
        <div class="hidden lg:block ps-4 py-4">
          <div class="relative rounded-xl overflow-hidden h-full w-full">
            <img src="https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/images/White Minimalist Photo Collage.png" alt="" class="w-full h-full transform -scale-x-100">
            <div class="absolute inset-0 bg-default-950/40">
              <div class="flex items-end justify-center h-full">
                <div class="p-6 text-start">
                  <h5 class="text-xl font-bold text-white mb-3">欢迎来到蜜桃AI女友 <br>一个专属于你的情感陪伴空间!
                  </h5>
                  <p class="text-base font-medium text-default-400">📆 每一次互动都将留下独特记忆，越聊越懂你</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col h-full p-10 lg:ps-0">
          <div class="pb-10">
            <LogoBox/>
          </div>
          <div class="pb6 my-auto">
            <h4 class="text-2xl font-bold text-white mb-4">与专属AI女友随时畅聊，解锁甜蜜对话</h4>
            <p class="text-default-300 mb-8 max-w-sm ">立即登录，开启属于你们的浪漫故事。</p>


            <form class="text-start">

              <p v-if="error.length > 0" class="mb-2 text-red-500">{{ error }}</p>

              <div class="mb-4">
                <label for="emailaddress" class="block text-base/normal font-semibold text-default-200 mb-2">用户名</label>
                <input
                    class="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                    type="email" id="emailaddress" placeholder="请输入用户名" v-model="username">
                
              </div>

              <div class="mb-4">
                <label for="password"
                       class="block text-base/normal font-semibold text-default-200 mb-2">密码</label>
                <input
                    class="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                    type="password" id="password" placeholder="请输入密码" v-model="password">
                
              </div>

              <div class="mb-6">
                <div class="flex flex-wrap items-center justify-between gap-y-1">
                  <div>
                    <input type="checkbox"
                           class="h-4 w-4 rounded text-primary border-white/20 bg-white/20 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary/60 focus:ring-offset-0"
                           id="checkbox-signin">
                    <label class="ms-2 text-default-200 align-middle" for="checkbox-signin">同意《隐私政策》</label>
                  </div>
                  <router-link :to="{name:'auth.forgot-password'}" class="text-default-200 border-b border-dashed">
                    <small>忘记密码</small></router-link>
                </div>
              </div>
              <div class="mb-6 text-center">
                <el-button @click="handleSignIn()" color="#626aef">登录</el-button>
              </div>
            </form>
          </div>
          <!--
          <div>
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
          </div>-->
        </div>
      </div>
    </div>
    <div class="w-full text-center mt-5">
      <p class="text-default-300 leading-6 text-base font-medium">还没有账号?
        <router-link :to="{name:'auth.sign-up'}" class="text-primary font-semibold ms-1">点击注册</router-link>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import LogoBox from "@/components/LogoBox.vue";
import authImg from "@/assets/images/ai/auth-img.jpg"
import {required, email} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import {ref, reactive, computed} from 'vue'
import {useRoute} from 'vue-router'
import HttpClient from '@/helpers/http-client'
import {useAuthStore} from '@/stores/auth'
import type {AxiosResponse} from 'axios'
import type {User} from '@/types/auth'
import router from '@/router';
import { ElLoading } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus'

const vuelidateRules = computed(() => ({
  email: {required},
  password: {required}
}))

const useAuth = useAuthStore()
const route = useRoute()
const query = route.query

const error = ref('')
const checked = ref(false)
const username = ref(null);
const password = ref(null);
const handleSignIn = async () => {

 if(!username.value)
 {
  ElMessage({
        type: 'info',
        message: '请输入用户名！',
      })

      return null;
 }
 else if(!password.value)
 {
  ElMessage({
        type: 'info',
        message: '请输入密码！',
      })
      
      return null
 }
 const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
})
  const headers = {
        'Content-Type': 'application/json',
      };
        const postData = {
        user_name: username.value,
        user_password:password.value
      };
      try {
        const response = await fetch('https://peachapi.ctrsai.work/login/user',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
      const res = await response.json();
      if(res.success)
    {
      localStorage.setItem('user', JSON.stringify(res.user[0]));
      localStorage.setItem('username',res.user_name);
      loading.close();
      console.log(res);
      window.location.href = '/';
    }
    else{
      ElMessage({
        type: 'info',
        message: '用户名或密码错误！',
      })
      loading.close();
    }
      } catch (error) {
        console.error('Error fetching data:', error);
        loading.close();
      } 
}
</script>