<template>
  <div class="app-wrapper">
    <!-- 顶部全局导航栏 -->
    <header class="global-nav-bar">
      <div class="nav-left">
        <div class="logo">
          <img src="https://storage.googleapis.com/peachai/image/avatar/logo-sm.png" alt="Logo">
        </div>
        <div class="page-title">
          <h3>Character</h3>
        </div>
      </div>
      <div class="nav-right">
        <div class="btc-balance">
          <span>100BTC</span>
        </div>
        <button class="login-button">sign in</button>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="main-content">
      <p class="screen-title">Backers fund campaigns and receive exclusive access</p>
      <div class="card-container">
        <div class="char-card" v-for="char in characters" :key="char.id">
          <img :src="char.image" :alt="char.name" class="char-image">
          <div class="char-overlay">
            <h2 class="char-name">{{ char.name }}</h2>
            <p class="char-tagline">{{ char.tagline }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 用于头部信息展示
const userBitcoinBalance = ref(1.25);

const characters = ref([
  {
    id: 1,
    name: 'The Seductress',
    tagline: 'Alluring, mysterious, and in control.',
    image: 'https://storage.googleapis.com/peachai/image/character/seductress.png'
  },
  {
    id: 2,
    name: 'The Girl Next Door',
    tagline: 'Sweet, caring, and your best friend.',
    image: 'https://storage.googleapis.com/peachai/image/character/girl-next-door.png'
  },
  {
    id: 3,
    name: 'The Cyber-Ronin',
    tagline: 'Fierce, loyal, and a warrior spirit.',
    image: 'https://storage.googleapis.com/peachai/image/character/cyber-ronin.png'
  },
   {
    id: 4,
    name: 'The Scholar',
    tagline: 'Wise, thoughtful, and a brilliant mind.',
    image: 'https://storage.googleapis.com/peachai/image/character/scholar.png'
  }
]);
</script>

<style scoped>
:root {
  --primary-accent: #00aaff;
  --dark-bg: #121212;
  --card-bg: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --header-bg: #222;
}

/* 基础样式 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-bg);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden; /* 防止页面本身滚动 */
}

/* App 容器: 顶部栏 + 滚动内容 */
.app-wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: var(--dark-bg);
}

/* --- 顶部栏样式 --- */
.global-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px; /* 调整移动端内边距 */
  background-color: var(--header-bg);
  color: white;
  flex-shrink: 0; /* 防止顶部栏被压缩 */
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  border-bottom: 1px solid #333;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: 15px; /* 调整移动端间距 */
}

.logo img {
  height: 35px; /* 调整 logo 大小 */
  width: auto;
  border-radius: 50%;
}

.page-title h3 {
  margin: 0;
  font-weight: 500;
  font-size: 1rem; /* 调整标题字体大小 */
  color: var(--primary-accent);
}

.btc-balance {
  background-color: #333;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #ff9900;
}

.login-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  font-size: 12px;
  border-radius: 5px;
  text-transform: uppercase;
}

.login-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* --- 主要内容样式 --- */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 确保内容区本身不滚动 */
  padding: 20px 0;
}

.screen-title {
  font-size: 1.2rem; /* 调整标题大小以适应移动端 */
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

/* 卡片容器: 横向滚动 */
.card-container {
  display: flex;
  gap: 15px; /* 卡片间距 */
  padding: 0 20px; /* 左右留出边距 */
  overflow-x: auto; /* 核心：允许横向滚动 */
  align-items: center;
  flex-grow: 1;
  -webkit-overflow-scrolling: touch; /* 在 iOS 上实现平滑滚动 */
  scrollbar-width: none; /* 隐藏滚动条 (Firefox) */
}

.card-container::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 (Chrome, Safari) */
}

.char-card {
  flex: 0 0 180px; /* 卡片宽度，不缩放不增长 */
  height: 320px; /* 卡片高度 */
  background-color: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.char-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 170, 255, 0.2);
}

.char-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.char-card:hover .char-image {
  transform: scale(1.1);
}

.char-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 20%, transparent);
}

.char-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: var(--text-primary);
}

.char-tagline {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
}
</style>
