<template>
    <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]" @click.self="closeModal">
      <div class="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm text-white">
        <h2 class="text-2xl font-bold text-center text-yellow-300 mb-6">{{ isRegistering ? '创建账户' : '欢迎回来' }}</h2>
  
        <div v-if="error" class="bg-red-500 text-white text-sm p-3 rounded-md mb-4 text-center">
          {{ error }}
        </div>
  
        <form v-if="isRegistering" @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="reg-username" class="block mb-2 text-sm font-medium">用户名</label>
            <input v-model="regUsername" id="reg-username" type="text" placeholder="设置一个用户名" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400">
          </div>
          <div class="mb-4">
            <label for="reg-password" class="block mb-2 text-sm font-medium">密码</label>
            <input v-model="regPassword" id="reg-password" type="password" placeholder="••••••••" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400">
          </div>
          <div class="mb-6">
            <label for="confirm-password" class="block mb-2 text-sm font-medium">确认密码</label>
            <input v-model="regConfirmPassword" id="confirm-password" type="password" placeholder="••••••••" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400">
          </div>
          <button type="submit" class="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-400 transition-colors">
            注册
          </button>
        </form>
  
        <form v-else @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="block mb-2 text-sm font-medium">用户名</label>
            <input v-model="loginUsername" id="username" type="text" placeholder="输入您的用户名" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400">
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium">密码</label>
            <input v-model="loginPassword" id="password" type="password" placeholder="••••••••" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400">
          </div>
          <button type="submit" class="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-400 transition-colors">
            登录
          </button>
        </form>
  
        <p class="text-center text-sm text-gray-400 mt-6">
          <span v-if="isRegistering">已经有账户了？</span>
          <span v-else>还没有账户？</span>
          <button @click="isRegistering = !isRegistering" class="font-semibold text-yellow-300 hover:underline">
            {{ isRegistering ? '去登录' : '立即注册' }}
          </button>
        </p>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['close', 'success']);
  
  const isRegistering = ref(false);
  const error = ref(null);
  
  // Login state
  const loginUsername = ref('');
  const loginPassword = ref('');
  
  // Registration state
  const regUsername = ref('');
  const regPassword = ref('');
  const regConfirmPassword = ref('');
  
  const closeModal = () => {
    emit('close');
  };
  
  const handleLogin = () => {
    error.value = null;
    if (!loginUsername.value || !loginPassword.value) {
      error.value = "请填写所有字段。";
      return;
    }
    // --- 模拟 API 调用 ---
    // 在真实应用中，您会在这里调用后端接口。
    // 在这个演示中，我们假定登录成功。
    console.log(`以 ${loginUsername.value} 的身份登录`);
    emit('success', { name: loginUsername.value });
  };
  
  const handleRegister = () => {
    error.value = null;
    if (!regUsername.value || !regPassword.value || !regConfirmPassword.value) {
      error.value = "请填写所有字段。";
      return;
    }
    if (regPassword.value !== regConfirmPassword.value) {
      error.value = "两次输入的密码不匹配。";
      return;
    }
    // --- 模拟 API 调用 ---
    // 在真实应用中，您会检查用户名是否存在，然后创建用户。
    // 在这个演示中，我们假定注册成功。
    console.log(`注册用户 ${regUsername.value}`);
    emit('success', { name: regUsername.value });
  };
  </script>