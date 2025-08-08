<template>
  <div class="app-wrapper">
    <!-- 顶部全局导航栏 -->
    <header class="global-nav-bar">
      <div class="nav-left">
        <div class="logo">
          <img src="https://storage.googleapis.com/peachai/image/avatar/logo-sm.png" alt="Logo">
        </div>
        <div class="page-title">
          <h3>Crowdfund: The Cyberpunk Assassin</h3>
        </div>
      </div>
      <div class="nav-right">
        <div class="btc-balance">
          <span>{{ userBitcoinBalance.toFixed(4) }} BTC</span>
        </div>
        <button class="login-button">sign in</button>
      </div>
    </header>

    <!-- 主体内容容器 (现在是单列滚动) -->
    <div class="crowdfund-container">
      <!-- 预览区域 -->
      <div class="preview-section">
        <div class="preview-card">
          <img src="https://storage.googleapis.com/peachai/image/character/cyber-assassin.png" alt="AI Special Role Preview" class="preview-image">
          <div class="preview-overlay">
            <h2 class="role-title">Unlock: The Cyberpunk Assassin</h2>
            <p class="role-description">A master of stealth and technology from the neon-drenched streets of Neo-Kyoto.</p>
          </div>
        </div>
      </div>

      <!-- 交互区域 -->
      <div class="interaction-section">
        <div class="crowdfund-status-box">
          <h3>Project Goal</h3>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: progressPercentage + '%' }">
              <span class="progress-text">{{ progressPercentage.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="goal-details">
            <span class="funded-amount">{{ fundedAmount.toFixed(4) }} BTC</span>
            <span class="goal-amount">Goal: {{ fundingGoal.toFixed(4) }} BTC</span>
          </div>
        </div>

        <!-- 众筹等级 (未完成时显示) -->
        <div v-if="!fundingComplete" class="pledge-tiers">
          <h3 class="section-title">Pledge Tiers</h3>
          <ul>
            <li v-for="tier in pledgeTiers" :key="tier.name" class="tier-item">
              <div class="tier-info">
                <span class="tier-name">{{ tier.name }} Access</span>
                <span class="tier-reward">{{ tier.reward }}</span>
              </div>
              <button @click="makePledge(tier.amount)" class="pledge-button">{{ tier.amount }} BTC</button>
            </li>
          </ul>
        </div>
        
        <!-- 自定义操作 (完成后显示) -->
        <div v-if="fundingComplete" class="custom-actions">
          <h3 class="section-title">Goal Reached! Request Custom Actions</h3>
          <ul class="action-items">
            <li v-for="(item, index) in customActionItems" :key="index" class="action-item">
              <span class="action-name">{{ item.action }}</span>
              <button @click="purchaseAction(item)" class="purchase-button">{{ item.price }} BTC</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 非阻塞式通知 -->
    <div v-if="notification.message" class="notification" :class="notification.type">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- 响应式数据 ---
const fundingGoal = ref(2.50); // 目标金额 (BTC)
const fundedAmount = ref(0.78); // 当前已筹集金额 (BTC)
const userBitcoinBalance = ref(1.25); // 用户模拟余额
const notification = ref({ message: '', type: '' }); // 通知状态

const pledgeTiers = ref([
  { name: 'Bronze', amount: 0.005, reward: 'Early access to the character model.' },
  { name: 'Silver', amount: 0.015, reward: 'Bronze benefits + Exclusive animation.' },
  { name: 'Gold', amount: 0.050, reward: 'Silver benefits + Your name in credits.' },
]);

const customActionItems = ref([
  { action: 'Activate cloaking device', price: 0.002 },
  { action: 'Draw plasma katana', price: 0.003 },
  { action: 'Perform a signature takedown', price: 0.005 },
  { action: 'Hack a terminal', price: 0.004 },
]);

// --- 计算属性 ---
const progressPercentage = computed(() => {
  if (fundingGoal.value === 0) return 0;
  return Math.min((fundedAmount.value / fundingGoal.value) * 100, 100);
});

const fundingComplete = computed(() => {
  return fundedAmount.value >= fundingGoal.value;
});

// --- 方法 ---
const showNotification = (message, type = 'success', duration = 3000) => {
  notification.value = { message, type };
  setTimeout(() => {
    notification.value.message = '';
  }, duration);
};

const makePledge = (amount) => {
  if (userBitcoinBalance.value < amount) {
    showNotification("Insufficient Bitcoin balance.", 'error');
    return;
  }
  userBitcoinBalance.value -= amount;
  fundedAmount.value += amount;
  showNotification(`Thank you for your ${amount} BTC pledge!`);
};

const purchaseAction = (item) => {
  if (userBitcoinBalance.value < item.price) {
    showNotification("Insufficient balance for this action.", 'error');
    return;
  }
  userBitcoinBalance.value -= item.price;
  showNotification(`Purchased "${item.action}" video!`);
};
</script>

<style scoped>
:root {
  --primary-accent: #00aaff;
  --success-color: #00ffaa;
  --error-color: #ff4d4d;
  --dark-bg: #121212;
  --card-bg: #1e1e1e;
  --header-bg: #222;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
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
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 防止外层滚动 */
}

/* --- 顶部栏样式 (保持不变) --- */
.global-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: var(--header-bg);
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  border-bottom: 1px solid #333;
}
.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.logo img {
  height: 35px;
  width: auto;
  border-radius: 50%;
}
.page-title h3 {
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
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
  background: none; border: none; color: white; cursor: pointer; padding: 5px;
  font-size: 12px; border-radius: 5px; text-transform: uppercase;
}
.login-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* --- 移动端众筹页面样式 --- */
.crowdfund-container {
  display: flex;
  flex-direction: column; /* 垂直布局 */
  flex: 1;
  overflow-y: auto; /* 允许容器内部滚动 */
}

.preview-section {
  width: 100%;
  height: 60vh; /* 预览区占据大部分视口高度 */
  position: relative;
  flex-shrink: 0;
}

.preview-card {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent);
  color: white;
  padding: 20px;
}

.role-title {
  font-size: 1.8rem;
  margin: 0 0 5px 0;
  font-weight: 700;
}

.role-description {
  font-size: 1rem;
  line-height: 1.5;
}

.interaction-section {
  background-color: var(--card-bg);
  padding: 20px;
}

.section-title {
  color: #eee;
  margin-bottom: 15px;
  border-bottom: 2px solid var(--primary-accent);
  padding-bottom: 8px;
  font-size: 1.2rem;
}

.crowdfund-status-box {
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
}

.crowdfund-status-box h3 {
  margin: 0 0 15px 0;
  color: #fff;
  text-align: center;
  font-size: 1.1rem;
}

.progress-bar-container {
  width: 100%;
  background-color: #555;
  border-radius: 20px;
  height: 25px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-accent), var(--success-color));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  font-weight: bold;
  font-size: 0.8rem;
  transition: width 0.5s ease-out;
}

.goal-details {
  display: flex;
  justify-content: space-between;
  color: #ccc;
  font-size: 0.8rem;
}

.funded-amount {
  font-weight: bold;
  color: var(--success-color);
}

.pledge-tiers ul, .action-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tier-item, .action-item {
  background-color: #333;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tier-info {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.tier-name, .action-name {
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
}

.tier-reward {
  color: #bbb;
  font-size: 0.8rem;
  margin-top: 4px;
}

.pledge-button, .purchase-button {
  background-color: #ff9900;
  color: #111;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.pledge-button:hover, .purchase-button:hover {
  background-color: #ffb700;
}

/* --- 通知样式 --- */
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 25px;
  border-radius: 25px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: opacity 0.3s ease;
}
.notification.success {
  background-color: #28a745;
}
.notification.error {
  background-color: var(--error-color);
}
</style>
