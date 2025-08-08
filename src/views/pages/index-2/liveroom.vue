<template>
    <div id="live-page" class="relative h-screen w-screen bg-black overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full">
      <video
        :key="currentVideoSrc"
        :src="currentVideoSrc"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      ></video>
    </div>

    <audio ref="audioPlayerRef" class="hidden"></audio>

  
      <div ref="heartContainer" class="absolute inset-0 pointer-events-none"></div>
  
      <div class="absolute inset-0 flex flex-col justify-between p-4 text-white">
        <UserInfo :user="user" />
  
        <GiftDisplay :gifts="giftQueue" />
  
        <div>
          <div class="flex items-end space-x-4">
            <div class="flex-grow w-3/4">
              <CommentSection :comments="comments" />
            </div>
            <div class="flex-shrink-0">
              <InteractionBar @like="triggerLike" @send-gift="triggerGift" />
            </div>
          </div>
  
          <div class="w-full mt-2 flex items-center space-x-2">
          <input 
            v-model="newCommentText"
            @keydown.enter="sendComment"
            type="text" 
            placeholder="说点什么..." 
            class="flex-grow bg-black bg-opacity-40 border border-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-yellow-300" 
          />
          <button @click="sendComment" class="bg-yellow-500 text-black rounded-full px-4 py-2 text-sm font-bold hover:bg-yellow-400 transition-colors">
            发送
          </button>
        </div>
        </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted,nextTick } from 'vue';
  import VideoStream from './VideoStream.vue';
  import UserInfo from './UserInfo.vue';
  import CommentSection from './CommentSection.vue';
  import InteractionBar from './InteractionBar.vue';
  import GiftDisplay from './GiftDisplay.vue';
  const videoStreamRef = ref(null);
  const audioPlayerRef = ref(null);
  const newCommentText = ref(''); // 新增：用于绑定输入框内容
  // --- MOCK DATA ---
  const MOCK_COMMENTS = [
    { user: "张三", text: "主播今天好帅！" },
    { user: "莉莉", text: "这是在哪里直播呀？风景真好！" },
    { user: "前端小王子", text: "Vue 3 yyds!" },
    { user: "隔壁老王", text: "666" },
    { user: "小透明", text: "终于赶上直播了" },
  ];
  
  const MOCK_GIFTS = [
    { id: 1, name: "玫瑰", image: "https://img.icons8.com/emoji/48/rose-emoji.png" },
    { id: 2, name: "跑车", image: "https://img.icons8.com/emoji/48/racing-car-emoji.png" },
    { id: 3, name: "火箭", image: "https://img.icons8.com/emoji/48/rocket-emoji.png" },
  ];
  
  const MOCK_USERS = ["土豪哥", "白富美", "神豪", "路人甲"];

  const keywordActions = {
  '漂亮': {
    video: "https://storage.googleapis.com/peachai/AIgirl/%E5%A4%A7%E9%95%BF%E8%85%BF%E5%BE%A1%E5%A7%90%E8%88%9E%E8%B9%88.mp4",
    audio: "https://storage.googleapis.com/peachai/audio/success.mp3",
    message: "收到！为你播放一个漂亮的视频！"
  },
  '跳舞': {
    video: "https://storage.googleapis.com/peachai/AIgirl/%E7%99%BD%E8%A1%A3JK%E5%A5%B3%E5%AD%A9%E5%AE%B6%E5%B1%85%E8%88%9E%E8%B9%88.mp4",
    audio: "https://storage.googleapis.com/peachai/audio/upbeat.mp3",
    message: "来了来了，跳舞视频安排上！"
  },
  '默认': {
    video: "https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4",
    audio: null, // 此关键字不播放音频
    message: "好的，已恢复默认场景。"
  }
};

const currentVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");

  const user = ref({
    name: "色情主播",
    avatar: "https://storage.googleapis.com/peachai/image/icon/icons8-love-48%20(1).png",
    viewers: Math.floor(Math.random() * 2000) + 1000
  });
  
  const comments = ref([]);
  const giftQueue = ref([]);
  const heartContainer = ref(null);
  let commentInterval = null;
  let commentCounter = 0;
  
  // --- METHODS ---

  const checkForKeywords = (commentText) => {
  for (const keyword in keywordActions) {
    if (commentText.includes(keyword)) {
      const action = keywordActions[keyword];
      currentVideoSrc.value = action.video;
      
      // 新增：播放音频的逻辑
      if (action.audio && audioPlayerRef.value) {
        audioPlayerRef.value.src = action.audio;
        audioPlayerRef.value.play().catch(error => {
          console.error("音频播放失败:", error); // 处理浏览器自动播放限制
        });
      }
      if(action.message) {
          setTimeout(() => {
               comments.value.push({ id: commentCounter++, user: "系统消息", text: action.message });
          }, 500);
      }
      break; 
    }
  }
};
// 模拟机器人评论
const addMockComment = () => {
  const mockComment = MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)];
  comments.value.push({ ...mockComment, id: commentCounter++ });
  checkForKeywords(mockComment.text);
};

// 新增：发送用户自己的评论
const sendComment = () => {
  const text = newCommentText.value.trim();
  if (!text) return; // 不发送空消息

  // 将用户评论添加到评论区
  comments.value.push({
    id: commentCounter++,
    user: "我", // 使用“我”作为当前用户的标识
    text: text
  });

  // 检查用户发送的评论是否包含关键字
  checkForKeywords(text);

  // 清空输入框
  newCommentText.value = '';
};
  
  const triggerLike = () => {
    if (!heartContainer.value) return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const hearts = ['❤️', '💖', '💗', '💓', '💕'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.right = `${Math.random() * 30 + 10}px`;
    heartContainer.value.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  };
  
  const triggerGift = () => {
    const randomGift = { ...MOCK_GIFTS[Math.floor(Math.random() * MOCK_GIFTS.length)] };
    const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
    const displayId = Date.now() + Math.random();
    
    giftQueue.value.push({ ...randomGift, user: randomUser, displayId });
  
    setTimeout(() => {
      const index = giftQueue.value.findIndex(g => g.displayId === displayId);
      if (index !== -1) {
        giftQueue.value.splice(index, 1);
      }
    }, 4000); // 礼物显示4秒
  };
  
  // --- LIFECYCLE ---
  onMounted(() => {
  comments.value.push(
    { id: commentCounter++, user: "系统消息", text: "欢迎来到互动直播间！" },
    { id: commentCounter++, user: "系统消息", text: "试试发送“漂亮”、“跳舞”或“默认”" }
  );
  commentInterval = setInterval(addMockComment, Math.random() * 2000 + 3000);
});
  
  onUnmounted(() => {
    clearInterval(commentInterval);
  });
  </script>
  
  <style>
  /* 全局样式，用于锁定页面，防止出现滚动条 
    - position: fixed 防止在某些移动浏览器上因地址栏显示/隐藏而产生抖动。
    - overflow: hidden 彻底禁用滚动。
  */
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: fixed; /* 关键属性 */
    touch-action: manipulation;
  }
  
  /* 确保 #app 也能正确撑满 */
  #app {
    height: 100%;
    width: 100%;
  }
  
  #live-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  
  .floating-heart {
    position: absolute;
    bottom: 120px;
    right: 20px;
    animation: floatUp 2s ease-out forwards;
    font-size: 2rem;
  }
  
  @keyframes floatUp {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-300px) scale(1.5);
      opacity: 0;
    }
  }
  </style>