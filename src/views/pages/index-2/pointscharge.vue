<template>
  <div id="points-purchase-page" class="relative h-screen w-screen bg-black overflow-hidden">
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
          <h1 class="text-xl sm:text-2xl font-bold text-white">Purchase Points</h1>
          <p class="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Get points to unlock premium AI features (1 USD = 1 Point)</p>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <div
            v-for="tier in pricingTiers"
            :key="tier.points"
            class="bg-black bg-opacity-40 border border-gray-500 rounded-lg p-3 sm:p-4 cursor-pointer hover:border-yellow-300 transition-colors price-card"
            :class="{ 'border-yellow-300': selectedTier === tier.points }"
            @click="selectTier(tier.points)"
          >
            <div class="flex justify-between items-center">
              <div>
                <p class="text-white font-semibold text-base sm:text-lg">{{ tier.points }} Points</p>
                <p class="text-gray-400 text-xs sm:text-sm">${{ tier.price }} USD</p>
              </div>
              <div class="text-yellow-400 font-semibold text-sm sm:text-base">{{ tier.bonus }} Bonus</div>
            </div>
          </div>
        </div>

        <div v-if="selectedTier" class="mt-3 sm:mt-4 flex justify-center items-center">
          <div class="w-full max-w-xs">
            <button
              @click="redirectToPayment"
              class="custom-buy-button"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

        <div v-else class="mt-3 sm:mt-4 text-center text-gray-400 text-xs sm:text-sm">
          Please select a points tier to proceed with payment.
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
import { ref, computed } from 'vue';

// Background video source
const backgroundVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");

// Pricing tiers with corresponding Stripe payment links
const pricingTiers = [
  { points: 50, price: "9.99",bonus:0, paymentLink: "https://buy.stripe.com/00w00i6PRdAlgxNfayao80n" }, // Replace with your actual payment link for $9.99
  { points: 210, price: "39.99",bonus:10, paymentLink: "https://buy.stripe.com/test_XXXXXXX" }, // Replace with your actual payment link for $39.99
  { points: 550, price: "99.99",bonus:50, paymentLink: "https://buy.stripe.com/test_YYYYYYY" }, // Replace with your actual payment link for $99.99
];

// Reactive state for selected tier
const selectedTier = ref(null);

// Computed property to get the payment link for the selected tier
const selectedPaymentLink = computed(() => {
  const tier = pricingTiers.find(t => t.points === selectedTier.value);
  return tier ? tier.paymentLink : '';
});

// Select a pricing tier
const selectTier = (points) => {
  selectedTier.value = points;
};

// Redirect to Stripe payment link
const redirectToPayment = () => {
  if (selectedPaymentLink.value) {
    window.location.href = selectedPaymentLink.value;
  }
};

// Social sign-in handlers
const handleGoogleSignIn = () => {
  console.log('Redirecting to Google Sign-In...');
  alert('Simulating Google Sign-In flow...');
};

const handleFacebookSignIn = () => {
  console.log('Redirecting to Facebook Sign-In...');
  alert('Simulating Facebook Sign-In flow...');
};

const handleXSignIn = () => {
  console.log('Redirecting to X Sign-In...');
  alert('Simulating X Sign-In flow...');
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

#points-purchase-page {
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

/* Ensure price cards are touch-friendly */
.price-card {
  min-height: 60px;
}
</style>