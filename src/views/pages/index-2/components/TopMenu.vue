<template>
    <nav class="top-menu">
      <div class="nav-container">
        <div class="nav-content">
          
          <div class="logo-container">
            <a href="/" class="logo">PromptChan</a>
          </div>
  
          <div class="desktop-menu">
            <a href="/purchase" class="menu-link active">Purchase Points</a>
            <a href="/orders" class="menu-link">My Orders</a>
            <a href="/gallery" class="menu-link">Gallery</a>
            <a href="/support" class="menu-link">Support</a>
          </div>
  
          <div class="desktop-actions">
            <button class="action-button">Sign In</button>
          </div>
  
          <div class="mobile-menu-toggle">
            <button @click="toggleMenu" class="mobile-menu-button" aria-label="Open main menu">
              <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
        </div>
      </div>
  
      <div v-if="isMenuOpen" class="mobile-menu">
        <div class="mobile-links">
          <a href="/purchase" class="mobile-menu-link active">Purchase Points</a>
          <a href="/orders" class="mobile-menu-link">My Orders</a>
          <a href="/gallery" class="mobile-menu-link">Gallery</a>
          <a href="/support" class="mobile-menu-link">Support</a>
        </div>
        <div class="mobile-actions">
          <button class="action-button full-width">Sign In</button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 控制移动端菜单的展开/收起状态
  const isMenuOpen = ref(false);
  
  // 切换菜单状态的方法
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  </script>
  
  <style scoped>
  /* --- 基础与变量 --- */
  :root {
    --menu-height: 64px;
    --text-primary: #ffffff;
    --text-secondary: #d1d5db; /* gray-300 */
    --bg-hover: #374151;      /* gray-700 */
    --bg-active: #111827;      /* gray-900 */
    --accent-color: #facc15;   /* yellow-400 */
    --accent-hover: #fde047;   /* yellow-300 */
  }
  
  /* --- 主导航栏 --- */
  .top-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }
  
  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--menu-height);
  }
  
  /* --- Logo --- */
  .logo {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-decoration: none;
  }
  
  /* --- 桌面端链接 --- */
  .desktop-menu {
    display: none; /* 默认隐藏 */
  }
  
  .menu-link {
    color: var(--text-secondary);
    background-color: transparent;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s, background-color 0.2s;
  }
  
  .menu-link:hover {
    background-color: var(--bg-hover);
    color: var(--text-primary);
  }
  
  .menu-link.active {
    background-color: var(--bg-active);
    color: var(--text-primary);
  }
  
  /* --- 操作按钮 --- */
  .desktop-actions {
    display: none; /* 默认隐藏 */
  }
  
  .action-button {
    background-color: var(--accent-color);
    color: #000;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
  }
  
  .action-button:hover {
    background-color: var(--accent-hover);
  }
  
  .action-button.full-width {
    width: 100%;
  }
  
  /* --- 移动端菜单 --- */
  .mobile-menu-toggle {
    display: flex;
    align-items: center;
  }
  
  .mobile-menu-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.375rem;
    color: #9ca3af; /* gray-400 */
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .mobile-menu-button:hover {
    color: var(--text-primary);
    background-color: var(--bg-hover);
  }
  
  .mobile-menu-button .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .mobile-menu {
    padding: 0.5rem 0.5rem 0.75rem;
  }
  
  .mobile-links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .mobile-menu-link {
    display: block;
    color: var(--text-secondary);
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s, background-color 0.2s;
  }
  
  .mobile-menu-link:hover {
    background-color: var(--bg-hover);
    color: var(--text-primary);
  }
  
  .mobile-menu-link.active {
    background-color: var(--bg-active);
    color: var(--text-primary);
  }
  
  .mobile-actions {
    padding: 0.75rem 0.5rem 0;
  }
  
  /* --- 响应式布局 --- */
  /* 中等屏幕及以上 (min-width: 768px) */
  @media (min-width: 768px) {
    .nav-container {
      padding: 0 1.5rem;
    }
    
    .desktop-menu {
      display: flex;
      align-items: baseline;
      gap: 1rem; /* space-x-4 */
      margin-left: 2.5rem;
    }
    
    .desktop-actions {
      display: block;
    }
    
    .mobile-menu-toggle, .mobile-menu {
      display: none;
    }
  }
  
  /* 大型屏幕及以上 (min-width: 1024px) */
  @media (min-width: 1024px) {
    .nav-container {
      padding: 0 2rem;
    }
  }
  </style>