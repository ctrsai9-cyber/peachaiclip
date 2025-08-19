<template>
    <div id="signin-page" class="relative h-screen w-screen bg-black overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full">
        <video
          :src="backgroundVideoSrc"
          class="w-full h-full object-cover"
          autoplay
          muted
          loop
          playsinline
        ></video>
      </div>
  
      <div class="absolute inset-0 flex justify-center p-4 items-start pt-20 sm:items-center sm:pt-4">
        
        <div class="w-full max-w-sm bg-black bg-opacity-60 rounded-xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
          
          <div class="text-center mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-white">Welcome Back</h1>
            <p class="text-gray-400 text-sm mt-2">Sign in to continue</p>
          </div>
          
          <form @submit.prevent="handleEmailSignIn">
            <div class="space-y-5 sm:space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  v-model="email"
                  id="email"
                  type="email" 
                  placeholder="Enter your email address" 
                  class="w-full bg-black bg-opacity-40 border border-gray-500 rounded-full px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-yellow-300 transition-colors"
                  required
                />
              </div>
  
              <div>
                  <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input 
                  v-model="password"
                  id="password"
                  type="password" 
                  placeholder="Enter your password" 
                  class="w-full bg-black bg-opacity-40 border border-gray-500 rounded-full px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-yellow-300 transition-colors"
                  required
                />
              </div>
            </div>
            
            <button type="submit" class="w-full mt-8 bg-yellow-500 text-black rounded-full px-4 py-3 text-sm font-bold hover:bg-yellow-400 transition-colors">
              Sign In
            </button>
          </form>
  
          <div class="my-6 flex items-center">
              <div class="flex-grow border-t border-gray-600"></div>
              <span class="mx-4 flex-shrink text-xs uppercase text-gray-400">Or continue with</span>
              <div class="flex-grow border-t border-gray-600"></div>
          </div>
  
          <div class="flex items-center justify-center space-x-4">
              <button @click="handleGoogleSignIn" type="button" class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                  <svg class="w-6 h-6" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.612-3.311-11.28-7.962l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.333,44,30.024,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
              </button>
              
              <button @click="handleFacebookSignIn" type="button" class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
              </button>
  
              <button @click="handleXSignIn" type="button" class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                   <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
              </button>
          </div>
  
          <div class="text-center text-sm text-gray-400 mt-8">
              Don't have an account? 
              <a href="#" class="font-semibold text-yellow-400 hover:text-yellow-300 hover:underline transition-colors">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const backgroundVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");
  
  const email = ref('');
  const password = ref('');
  
  const handleEmailSignIn = () => {
    if (!email.value || !password.value) {
      alert('Please enter both email and password.');
      return;
    }
    console.log('Attempting to sign in with email:', email.value);
    alert(`Signing in as ${email.value}`);
  };
  
  const handleGoogleSignIn = () => {
    console.log('Redirecting to Google Sign-In...');
    alert('Simulating Google Sign-In flow...');
  };
  
  // 4. 新增：Facebook 和 X 的登录处理函数 (占位)
  const handleFacebookSignIn = () => {
    console.log('Redirecting to Facebook Sign-In...');
    alert('Simulating Facebook Sign-In flow...');
  };
  
  const handleXSignIn = () => {
    console.log('Redirecting to X Sign-In...');
    alert('Simulating X Sign-In flow...');
  };
  </script>
  
  <style>
  /* 全局样式保持不变 */
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: fixed;
    touch-action: manipulation;
  }
  
  #app {
    height: 100%;
    width: 100%;
  }
  
  #signin-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  </style>