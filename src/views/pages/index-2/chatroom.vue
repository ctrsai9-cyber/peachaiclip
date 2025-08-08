<template>
    <div class="app-wrapper">
      <header class="global-nav-bar">
        <div class="nav-left">
          <div class="logo">
            <img src="https://storage.googleapis.com/peachai/image/avatar/logo-sm.png" alt="Logo">
          </div>
        </div>
        <div class="nav-center">
          <div class="search-bar">
            <input type="text" placeholder="Search girls...">
            <button>Search</button>
          </div>
        </div>
        <div class="nav-right">
          <button class="user-avatar">
            <img src="https://storage.googleapis.com/peachai/image/avatar/logo-sm.png" alt="User">
          </button>
          <button class="login-button">sign in</button>
        </div>
      </header>
      <div class="chatroom-container">
        <div class="video-section">
          <div class="video-placeholder">
            <video muted autoplay loop :key="currentVideoSrc" :src="currentVideoSrc"></video>
          </div>
        </div>
        <div class="chat-section">
          <div class="chat-header">
            <h2>Chat</h2>
          </div>
  
          <div v-if="!showTipMenu" class="chat-messages" ref="chatMessagesRef">
            <div v-for="(message, index) in messages" :key="index" :class="['message-item', message.type]">
              <span class="username">{{ message.username }}:</span>
              <span class="content">{{ message.content }}</span>
            </div>
          </div>
          <div v-else class="tip-menu-section">
            <div class="tip-menu-header">
              <h3>tips menu</h3>
              <button @click="showTipMenu = false" class="close-tip-menu">back chat</button>
            </div>
            <ul class="tip-items">
              <li v-for="(item, index) in tipItems" :key="index" class="tip-item">
                <span class="tip-action">{{ item.action }}</span>
                <span class="tip-price">{{ item.price }} $</span>
                <button @click="sendTip(item)" class="send-tip-button">send</button>
              </li>
            </ul>
          </div>
          <div class="chat-input">
            <input
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Try saying 'dance for me' or 'are you happy?'"
            />
            <button @click="showTipMenu = true" class="tip-button">tips</button>
  
            <button @click="sendMessage">send</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  
  // --- DATA ---
  
  // Default video to show
  const defaultVideo = 'https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4';
  // Reactive variable for the current video source
  const currentVideoSrc = ref(defaultVideo);
  
  const messages = ref([
    { username: 'girl', content: 'welcome to my chatroom！', type: 'system' },
    { username: 'simon', content: 'hi', type: 'user' },
    { username: 'gary', content: 'yes', type: 'user' },
  ]);
  
  const tipItems = ref([
    { action: 'Stockings on', price: 100 },
    { action: 'Insert into the vagina', price: 50 },
    { action: 'Oral sex', price: 200 },
    { action: 'Breast clamp', price: 30 },
    { action: 'Lick the pussy', price: 150 },
  ]);
  
  const newMessage = ref('');
  const chatMessagesRef = ref(null);
  const showTipMenu = ref(false);
  
  // --- NEW: Keyword Trigger Data Structure ---
  const keywordTriggers = ref([
    {
      keywords: ['dance', 'party', 'music'],
      videoSrc: 'https://storage.googleapis.com/peachai/AIgirl/dance.mp4',
      audioSrc: 'https://storage.googleapis.com/peachai/AIgirl/sfx/giggle.wav',
      response: 'Hehe, okay! Here is a little dance for you!',
    },
    {
      keywords: ['sad', 'cry', 'upset'],
      videoSrc: 'https://storage.googleapis.com/peachai/AIgirl/sad.mp4',
      audioSrc: 'https://storage.googleapis.com/peachai/AIgirl/sfx/sad.wav',
      response: 'Oh... Hearing that makes me a little sad.',
    },
    {
      keywords: ['happy', 'laugh', 'joy'],
      videoSrc: 'https://storage.googleapis.com/peachai/AIgirl/happy.mp4',
      audioSrc: 'https://storage.googleapis.com/peachai/AIgirl/sfx/laugh.wav',
      response: 'I\'m so happy right now! Thank you!',
    },
    // A default trigger to return to the idle state
     {
      keywords: ['default', 'stop', 'chill'],
      videoSrc: defaultVideo,
      audioSrc: 'https://storage.googleapis.com/peachai/AIgirl/sfx/giggle.wav',
      response: 'Okay, back to relaxing~',
    }
  ]);
  
  
  // --- METHODS ---
  
  const scrollToBottom = () => {
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
    }
  };
  
  // MODIFIED: sendMessage now checks for keywords
  const sendMessage = () => {
    if (newMessage.value.trim() === '') return;
    
    const userMessage = newMessage.value.trim();
    messages.value.push({
      username: '我',
      content: userMessage,
      type: 'self',
    });
  
    // Check for keyword triggers
    const lowerCaseMessage = userMessage.toLowerCase();
    let triggered = false;
  
    for (const trigger of keywordTriggers.value) {
      if (trigger.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        // Set the flag to true
        triggered = true;
  
        // 1. Change the video
        currentVideoSrc.value = trigger.videoSrc;
  
        // 2. Play the associated sound
        const audio = new Audio(trigger.audioSrc);
        audio.play();
  
        // 3. Send the AI's text response after a short delay
        setTimeout(() => {
          messages.value.push({
            username: 'girl',
            content: trigger.response,
            type: 'system',
          });
          nextTick(scrollToBottom);
        }, 800);
        
        break; // Stop checking after the first match
      }
    }
  
    // If no keywords were triggered, you could optionally return to the default video,
    // but for now we will let the last triggered video loop.
  
    newMessage.value = '';
    nextTick(scrollToBottom);
  };
  
  // Tip functionality remains the same
  const sendTip = (item) => {
    const tipMessage = `我打赏了 ${item.price} 币让主播 ${item.action}！`;
    messages.value.push({
      username: '我',
      content: tipMessage,
      type: 'self-tip',
    });
    showTipMenu.value = false;
    nextTick(scrollToBottom);
    alert(`你打赏了 ${item.price} 币给主播，请求主播 ${item.action}。 (实际扣费和请求逻辑需后端实现)`);
  };
  
  onMounted(() => {
    scrollToBottom();
  });
  </script>
  
  <style scoped>
  /* All CSS styles from your original component remain unchanged */
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* 防止滚动条 */
  }
  
  /* 整体应用包装器，使用flex实现上下布局 */
  .app-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 铺满整个视口高度 */
    overflow: hidden;
  }
  /* 全局顶部导航栏样式 */
  .global-nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #222; /* 深色背景 */
    color: white;
    flex-shrink: 0; /* 防止导航栏被压缩 */
    box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* 阴影效果 */
  }
  
  .nav-left, .nav-right {
    display: flex;
    align-items: center;
    gap: 15px; /* 元素间距 */
  }
  
  .logo img {
    height: 40px; /* Logo高度 */
    width: auto;
    border-radius: 50%;
  }
  
  .nav-center {
    flex-grow: 1; /* 中间区域占据剩余空间 */
    display: flex;
    justify-content: center; /* 搜索框居中 */
  }
  
  .search-bar {
    display: flex;
    max-width: 500px; /* 限制搜索框最大宽度 */
    width: 100%; /* 确保在max-width内铺满 */
  }
  
  .search-bar input {
    flex-grow: 1;
    padding: 8px 15px;
    border: none;
    border-radius: 20px 0 0 20px; /* 左侧圆角 */
    outline: none;
    background-color: #444;
    color: white;
    font-size: 14px;
  }
  
  .search-bar input::placeholder {
    color: #bbb;
  }
  
  .search-bar button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0 20px 20px 0; /* 右侧圆角 */
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .search-bar button:hover {
    background-color: #0056b3;
  }
  
  .user-avatar img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user-avatar, .login-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  .login-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .chatroom-container {
    display: flex;
    flex: 1; /* 占据 app-wrapper 除去导航栏外的所有剩余空间 */
    overflow: hidden; /* 防止内部内容溢出导致滚动条 */
  }
  /* 左侧视频区域 */
  .video-section {
    flex: 3; /* 占据 chatroom-container 左边一半 */
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    overflow: hidden; /* 防止视频溢出 */
  }
  
  .video-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0;
  }
  
  .video-placeholder video {
    width: 100%;
    height: auto;
    max-height: 100%;
    display: block;
    object-fit: contain; /* 保持视频比例 */
  }
    /* 聊天室区域容器 */
  .chat-section {
    flex: 1; /* 占据右边一半 */
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
    border-left: 1px solid #ccc;
  }
  
  .chat-header {
    padding: 15px;
    background-color: #e0e2e5;
    border-bottom: 1px solid #ccc;
    text-align: center;
    flex-shrink: 0; /* 防止被挤压 */
  }
    
  /* 聊天消息列表 */
  .chat-messages {
    flex: 1; /* 占据剩余空间，允许滚动 */
    padding: 15px;
    overflow-y: auto; /* 消息过多时显示滚动条 */
    background-color: #fff;
    display: flex; /* 让消息从顶部开始显示 */
    flex-direction: column; /* 垂直排列 */
  }
    
    .message-item {
      margin-bottom: 10px;
      word-wrap: break-word; /* 自动换行 */
    }
    
    .message-item .username {
      font-weight: bold;
      margin-right: 5px;
    }
    
    .message-item.system {
      color: #888;
      font-style: italic;
      text-align: center;
    }
    
    .message-item.self {
      text-align: right;
    }
    
    .message-item.self .username {
      color: #007bff; /* 自己的消息用户名颜色 */
    }
  
    .message-item.self-tip .username {
    color: #e67e22; /* 打赏消息的用户名颜色 */
  }
  
  
    /* 小费菜单区域 */
  .tip-menu-section {
    flex: 1; /* 占据聊天区域的剩余空间 */
    background-color: #f8f8f8; /* 小费菜单背景色 */
    color: #333;
    display: flex;
    flex-direction: column;
  }
  
  .tip-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #e0e2e5;
    border-bottom: 1px solid #ccc;
    flex-shrink: 0;
  }
  
  .close-tip-menu {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .close-tip-menu:hover {
    background-color: #d32f2f;
  }
  
  .tip-items {
    list-style: none;
    padding: 15px;
    margin: 0;
    overflow-y: auto; /* 小费列表过长时滚动 */
    flex: 1;
  }
  
  .tip-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    margin-bottom: 8px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .tip-action {
    font-weight: bold;
    flex: 1;
  }
  
  .tip-price {
    color: #e67e22;
    font-weight: bold;
    margin-right: 15px;
  }
  
  .send-tip-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .send-tip-button:hover {
    background-color: #218838;
  }
    
    .chat-input {
      display: flex;
      padding: 15px;
      border-top: 1px solid #ccc;
      background-color: #e0e2e5;
      flex-shrink: 0; /* 防止被挤压 */
    }
    
    .chat-input input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-right: 10px;
      font-size: 16px;
    }
    
    .chat-input button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    .chat-input button:hover {
      background-color: #0056b3;
    }
  </style>