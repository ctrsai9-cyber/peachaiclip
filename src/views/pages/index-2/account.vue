<template>
    <div class="account-page">
      <div class="video-background">
        <video :src="backgroundVideoSrc" autoplay muted loop playsinline></video>
      </div>
  
      <div class="page-container">
        <div class="account-card">
          
          <div class="profile-section">
            <img :src="user.avatar" alt="User Avatar" class="avatar">
            <div class="user-info">
              <h1 class="username">{{ user.username }}</h1>
              <p class="email">{{ user.email }}</p>
            </div>
          </div>
  
          <div class="points-balance">
            <div>
              <p class="points-label">可用点数</p>
              <p class="points-value">{{ user.points.toLocaleString() }}</p>
            </div>
            <button @click="goTo('/purchase')" class="purchase-button">获取点数</button>
          </div>
          
          <nav class="menu-section">
            <ul class="account-menu-list">
              <li><a @click.prevent="goTo('/profile-edit')" href="#" class="menu-link"><span>管理个人资料</span> <span>&rsaquo;</span></a></li>
              <li><a @click.prevent="goTo('/orders')" href="#" class="menu-link"><span>充值记录</span> <span>&rsaquo;</span></a></li>
              <li><a @click.prevent="goTo('/security')" href="#" class="menu-link"><span>账户安全</span> <span>&rsaquo;</span></a></li>
              <li><a @click.prevent="goTo('/settings')" href="#" class="menu-link"><span>通知设置</span> <span>&rsaquo;</span></a></li>
            </ul>
          </nav>
  
          <div class="logout-section">
            <button @click="logout" class="logout-button">退出登录</button>
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 背景视频源
  const backgroundVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");
  
  // 模拟的用户数据 (在实际应用中，这些数据会从 API 获取)
  const user = ref({
    username: 'Starlight',
    email: 's******t@promptchan.com',
    avatar: 'https://i.pravatar.cc/150?u=starlight', // 使用一个占位头像
    points: 1250,
  });
  
  // 模拟页面跳转
  const goTo = (path) => {
    alert(`正在导航至: ${path}`);
  };
  
  // 模拟退出登录
  const logout = () => {
    if (confirm('您确定要退出登录吗?')) {
      alert('正在退出...');
      // 在这里执行实际的退出逻辑
    }
  };
  </script>
  
  <style scoped>
  /* --- 页面基础和背景 --- */
  .account-page {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: #000;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  
  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .video-background video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .page-container {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    overflow-y: auto;
  }
  
  /* --- 主卡片样式 --- */
  .account-card {
    width: 100%;
    max-width: 420px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* --- 1. 用户信息 --- */
  .profile-section {
    display: flex;
    align-items: center;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    margin-right: 1rem;
  }
  
  .username {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }
  
  .email {
    font-size: 0.875rem;
    color: #9ca3af; /* gray-400 */
    margin: 0.25rem 0 0;
  }
  
  /* --- 2. 点数余额 --- */
  .points-balance {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .points-label {
    margin: 0;
    color: #d1d5db; /* gray-300 */
    font-size: 0.875rem;
  }
  
  .points-value {
    margin: 0.25rem 0 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: #facc15; /* yellow-400 */
  }
  
  .purchase-button {
    background-color: #facc15; /* yellow-400 */
    color: #000;
    font-weight: 600;
    padding: 0.6rem 1rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
    white-space: nowrap;
  }
  
  .purchase-button:hover {
    background-color: #fde047; /* yellow-300 */
  }
  
  /* --- 3. 导航菜单 --- */
  .account-menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .menu-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 1rem;
    background: rgba(31, 41, 55, 0.4); /* gray-800 with opacity */
    border-radius: 0.5rem;
    text-decoration: none;
    color: #d1d5db; /* gray-300 */
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .menu-link:hover {
    background: rgba(55, 65, 81, 0.6); /* gray-700 with opacity */
    color: #fff;
  }
  
  .menu-link span:last-child {
    color: #9ca3af; /* gray-400 */
  }
  
  /* --- 4. 退出登录 --- */
  .logout-section {
    margin-top: 1.5rem;
  }
  
  .logout-button {
    width: 100%;
    padding: 0.75rem;
    background-color: rgba(75, 85, 99, 0.4); /* gray-600 with opacity */
    border: none;
    border-radius: 0.5rem;
    color: #d1d5db; /* gray-300 */
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .logout-button:hover {
    background-color: #be123c; /* rose-700 */
    color: #fff;
  }
  </style>