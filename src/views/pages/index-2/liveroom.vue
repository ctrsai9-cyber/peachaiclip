<template>
  <div id="live-page" class="relative h-screen w-screen bg-black overflow-hidden">
    <!-- Video background, now controlled by actions -->
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

    <!-- Heart animation container -->
    <div ref="heartContainer" class="absolute inset-0 pointer-events-none"></div>

    <!-- Center-screen animation for the triggered action -->
    <div v-if="currentActionAnimation" class="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <div class="tip-animation-container">
            <!-- The icon of the action will be shown in the animation -->
            <div v-html="currentActionAnimation.icon" :class="['w-24 h-24 text-white', currentActionAnimation.animationClass]"></div>
            <div class="tip-animation-text">
                Thanks to <span class="font-bold text-yellow-300">Me</span> for requesting a {{ currentActionAnimation.name }}!
            </div>
        </div>
    </div>

    <!-- UI Overlay -->
    <div class="absolute inset-0 flex flex-col justify-between p-4 text-white">
      <UserInfo :user="user" />
      <GiftDisplay :gifts="giftQueue" />
      <div>
        <div class="flex items-end space-x-4">
          <div class="flex-grow w-3/4">
            <CommentSection :comments="comments" />
          </div>
          <div class="flex-shrink-0">
            <!-- The InteractionBar component from your Canvas -->
            <InteractionBar 
              @like="triggerLike" 
              @send-gift="triggerGift"
              @toggle-tips="toggleActionsMenu"
              :isTipsMenuOpen="isActionsMenuOpen"
            />
          </div>
        </div>
        <div class="w-full mt-2 flex items-center space-x-2">
          <input 
            v-model="newCommentText"
            @keydown.enter="sendComment"
            type="text" 
            placeholder="Say something..." 
            class="flex-grow bg-black bg-opacity-40 border border-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-yellow-300" 
          />
          <button @click="sendComment" class="bg-yellow-500 text-black rounded-full px-4 py-2 text-sm font-bold hover:bg-yellow-400 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>

    <!-- The new Actions Menu -->
    <TipsMenu 
        v-if="isActionsMenuOpen" 
        :tips="MOCK_ACTIONS"
        @send-tip="handleSendAction"
        @close="isActionsMenuOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// Assuming these child components exist in the same directory
import UserInfo from './UserInfo.vue';
import CommentSection from './CommentSection.vue';
import InteractionBar from './InteractionBar.vue';
import GiftDisplay from './GiftDisplay.vue';
import TipsMenu from './components/TipsMenu.vue'; // This is the menu for the actions

// --- STATE ---
const newCommentText = ref('');
const currentVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");
const user = ref({ name: "AI Streamer", avatar: "...", viewers: 1888 });
const comments = ref([]);
const giftQueue = ref([]);
const heartContainer = ref(null);
let commentInterval = null;

// --- ACTION MENU STATE ---
const isActionsMenuOpen = ref(false);
const currentActionAnimation = ref(null);

// --- MOCK DATA ---
const MOCK_GIFTS = [ { id: 1, name: "Rose", image: "..." } ];
const MOCK_USERS = ["Big Spender", "VIP User"];

// Data for the Action Menu - NOW WITH PRICES
const MOCK_ACTIONS = [
    { 
      id: 'blowjob', 
      name: 'blowjob', 
      price: '100 Coins',
      video: 'https://storage.googleapis.com/peachai/AIgirl/%E7%99%BD%E8%A1%A3JK%E5%A5%B3%E5%AD%A9%E5%AE%B6%E5%B1%85%E8%88%9E%E8%B9%88.mp4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" /></svg>`,
      animationClass: 'animate-fade-in-down'
    },
    { 
      id: 'Feet job', 
      name: 'Feet job', 
      price: '50 Coins',
      video: 'https://storage.googleapis.com/peachai/AIgirl/%E5%A4%A7%E9%95%BF%E8%85%BF%E5%BE%A1%E5%A7%90%E8%88%9E%E8%B9%88.mp4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
      animationClass: 'animate-slide-in-left'
    },
    { 
      id: 'Close-up pussy', 
      name: 'Close-up pussy', 
      price: 'Free',
      video: 'https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h18" /></svg>`,
      animationClass: 'animate-launch'
    },
    { 
      id: 'take off underwear', 
      name: 'take off underwear', 
      price: 'Free',
      video: 'https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h18" /></svg>`,
      animationClass: 'animate-launch'
    },
    { 
      id: 'lick pussy', 
      name: 'lick pussy', 
      price: 'Free',
      video: 'https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h18" /></svg>`,
      animationClass: 'animate-launch'
    },
];

// Data for keyword detection
const keywordActions = {
  '漂亮': {
    video: "https://storage.googleapis.com/peachai/AIgirl/%E5%A4%A7%E9%95%BF%E8%85%BF%E5%BE%A1%E5%A7%90%E8%88%9E%E8%B9%88.mp4",
    message: "收到！为你播放一个漂亮的视频！"
  },
  '跳舞': {
    video: "https://storage.googleapis.com/peachai/AIgirl/%E7%99%BD%E8%A1%A3JK%E5%A5%B3%E5%AD%A9%E5%AE%B6%E5%B1%85%E8%88%9E%E8%B9%88.mp4",
    message: "来了来了，跳舞视频安排上！"
  },
};

// --- METHODS ---
const checkForKeywords = (commentText) => {
  for (const keyword in keywordActions) {
    if (commentText.includes(keyword)) {
      const action = keywordActions[keyword];
      currentVideoSrc.value = action.video;
      if (action.message) {
        setTimeout(() => {
          comments.value.push({ id: Date.now(), user: "System", text: action.message });
        }, 500);
      }
      break;
    }
  }
};

const sendComment = () => {
  const text = newCommentText.value.trim();
  if (!text) return;
  comments.value.push({ id: Date.now(), user: "Me", text: text });
  checkForKeywords(text);
  newCommentText.value = '';
};

const triggerLike = () => {
  if (!heartContainer.value) return;
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.innerHTML = '❤️';
  heartContainer.value.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
};

const triggerGift = () => {
  const randomGift = { ...MOCK_GIFTS[Math.floor(Math.random() * MOCK_GIFTS.length)] };
  const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
  const displayId = Date.now();
  giftQueue.value.push({ ...randomGift, user: randomUser, displayId });
  setTimeout(() => {
    const index = giftQueue.value.findIndex(g => g.displayId === displayId);
    if (index !== -1) {
      giftQueue.value.splice(index, 1);
    }
  }, 4000);
};

const toggleActionsMenu = () => {
  isActionsMenuOpen.value = !isActionsMenuOpen.value;
};

const handleSendAction = (action) => {
    isActionsMenuOpen.value = false;
    currentVideoSrc.value = action.video;
    currentActionAnimation.value = action;
    setTimeout(() => {
        currentActionAnimation.value = null;
    }, 3000);
    comments.value.push({ id: Date.now(), user: "System", text: `Action requested: ${action.name}!` });
};

onMounted(() => {
  comments.value.push({ id: Date.now(), user: "System", text: "Welcome to the interactive stream!" });
  comments.value.push({ id: Date.now() + 1, user: "System", text: "试试发送“漂亮”或“跳舞”" });
});

onUnmounted(() => {
  clearInterval(commentInterval);
});
</script>

<style>
/* Styles for animations, etc. remain the same as before */
html, body, #app { height: 100%; width: 100%; margin: 0; padding: 0; overflow: hidden; position: fixed; }
#live-page { font-family: sans-serif; }
.floating-heart { position: absolute; bottom: 120px; right: 20px; animation: floatUp 2s ease-out forwards; font-size: 2rem; }
@keyframes floatUp { 100% { transform: translateY(-300px) scale(1.5); opacity: 0; } }
.tip-animation-container { display: flex; flex-direction: column; align-items: center; text-align: center; }
.tip-animation-text { margin-top: 16px; padding: 8px 16px; background-color: rgba(0, 0, 0, 0.6); border-radius: 9999px; color: white; font-size: 1.125rem; }
.animate-fade-in-down { animation: fadeInDown 3s ease-out forwards; }
.animate-slide-in-left { animation: slideInLeft 3s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
.animate-launch { animation: launch 3s ease-in-out forwards; }
@keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-50px); } 20% { opacity: 1; transform: translateY(0); } 80% { opacity: 1; } 100% { opacity: 0; } }
@keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-100%); } 20% { opacity: 1; transform: translateX(0); } 80% { opacity: 1; } 100% { opacity: 0; } }
@keyframes launch { 0% { opacity: 0; transform: translateY(100%); } 30% { opacity: 1; transform: translateY(0); } 80% { opacity: 1; } 100% { opacity: 0; transform: translateY(-100%); } }
</style>
