<template>
  <div id="payment-confirmation-page" class="relative h-screen w-screen bg-black overflow-hidden">
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

    <div class="absolute inset-0 flex justify-center p-4 items-start pt-10 sm:items-center sm:pt-4 overflow-y-auto">
      <div class="w-full max-w-sm bg-black bg-opacity-60 rounded-xl shadow-2xl p-4 sm:p-6 backdrop-blur-sm">
        
        <div class="text-center mb-4 sm:mb-6">
          <h1 class="text-xl sm:text-2xl font-bold text-white">Payment Confirmation</h1>
          <p class="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Checking your payment status...</p>
        </div>

        <div class="text-center mb-4 sm:mb-6">
          <p class="text-white text-base sm:text-lg">Time remaining: {{ countdown }} seconds</p>
          <p v-if="paymentStatus" class="text-yellow-400 text-sm sm:text-base mt-2">{{ paymentStatus }}</p>
          <p v-else class="text-gray-400 text-xs sm:text-sm mt-2">Please wait while we verify your payment.</p>
        </div>

        <div class="mt-3 sm:mt-4 flex justify-center items-center">
          <div class="w-full max-w-xs">
            <button
              @click="redirectToPointsPurchase"
              class="custom-buy-button"
            >
              Return to Points Purchase
            </button>
          </div>
        </div>

        <div class="text-center text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6">
          Need help? 
          <a href="mailto:support@promptchan.com" class="font-semibold text-yellow-400 hover:text-yellow-300 hover:underline transition-colors">Contact Support</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// Background video source (same as points-purchase.vue)
const backgroundVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");

// Countdown timer state
const countdown = ref(10);
const paymentStatus = ref(''); // Placeholder for payment status
const router = useRouter();

// Countdown logic
let timer = null;
onMounted(() => {
  // Simulate payment status check
  setTimeout(() => {
    paymentStatus.value = 'Payment processing. Please wait...';
  }, 3000);

  // Start countdown
  timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      redirectToPointsPurchase();
    }
  }, 1000);
});

// Cleanup timer on component unmount
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// Redirect to points purchase page
const redirectToPointsPurchase = () => {
  if (timer) {
    clearInterval(timer);
  }
  router.push('/points-purchase'); // Adjust route as needed
};
</script>

<style scoped>
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

#payment-confirmation-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Center the custom button */
.custom-buy-button {
  display: block;
  width: 100%;
  max-width: 320px;
  min-height: 44px;
  margin: 0 auto;
  background-color: #ffffff;
  color: #000000;
  border-radius: 9999px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.custom-buy-button:hover {
  background-color: #f0f0f0;
}
</style>