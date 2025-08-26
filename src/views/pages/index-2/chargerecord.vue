<template>
    <div id="order-history-page" class="relative h-screen w-screen bg-black overflow-hidden">
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
            <h1 class="text-xl sm:text-2xl font-bold text-white">Order History</h1>
            <p class="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Review your past purchases here.</p>
          </div>
  
          <div v-if="orders.length > 0" class="space-y-3 sm:space-y-4 max-h-60 sm:max-h-72 overflow-y-auto pr-2">
            <div
              v-for="order in orders"
              :key="order.id"
              class="bg-black bg-opacity-40 border border-gray-600 rounded-lg p-3 sm:p-4 order-card"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white font-semibold text-base sm:text-lg">{{ order.product }}</p>
                  <p class="text-gray-400 text-xs sm:text-sm mt-1">Order ID: {{ order.id }}</p>
                  <p class="text-gray-500 text-xs sm:text-sm">{{ order.date }}</p>
                </div>
                <div class="text-right flex-shrink-0 ml-2">
                   <p class="text-white font-semibold text-sm sm:text-base">${{ order.price }} USD</p>
                   <span 
                     :class="{
                       'text-green-400': order.status === 'Completed',
                       'text-red-400': order.status === 'Failed',
                       'text-yellow-400': order.status === 'Pending'
                     }" 
                     class="text-xs sm:text-sm font-medium"
                   >
                     {{ order.status }}
                   </span>
                </div>
              </div>
            </div>
          </div>
  
          <div v-else class="text-center text-gray-400 py-8">
              <p>You have no past orders yet.</p>
          </div>
  
          <div class="mt-4 sm:mt-6 flex justify-center items-center">
              <button
                @click="goToPurchasePage"
                class="custom-buy-button"
              >
                Purchase More Points
              </button>
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
  import { ref } from 'vue';
  
  // Background video source (can be the same or a different one)
  const backgroundVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");
  
  // Sample order data. In a real application, this would be fetched from an API.
  const orders = ref([
    { id: 'TXN1003', product: '550 Points', date: '2025-08-26', price: '99.99', status: 'Completed' },
    { id: 'TXN1002', product: '210 Points', date: '2025-07-15', price: '39.99', status: 'Completed' },
    { id: 'TXN1001', product: '50 Points', date: '2025-06-01', price: '9.99', status: 'Failed' },
  ]);
  
  // If you have an empty array, the empty state will be shown:
  // const orders = ref([]);
  
  // Function to navigate to the purchase page
  const goToPurchasePage = () => {
    // In a real Vue app with a router, you would use:
    // import { useRouter } from 'vue-router';
    // const router = useRouter();
    // router.push('/purchase');
    
    alert('Redirecting to the purchase page...');
    // For demonstration, we'll just log to console.
    console.log('Redirecting to points purchase page...');
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
  
  #order-history-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  
  /* Custom button styles, same as the original page */
  .custom-buy-button {
    display: block;
    width: 100%;
    max-width: 320px;
    min-height: 44px;
    margin: 0 auto;
    background-color: #facc15; /* yellow-400 */
    color: #000000;
    border-radius: 9999px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .custom-buy-button:hover {
    background-color: #fde047; /* yellow-300 */
  }
  
  /* Ensure order cards are touch-friendly */
  .order-card {
    min-height: 60px;
  }
  
  /* Custom scrollbar for the order list */
  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }
  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(107, 114, 128, 0.5); /* gray-500 with opacity */
    border-radius: 20px;
  }
  </style>