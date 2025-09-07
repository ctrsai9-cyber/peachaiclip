<template>
  <div id="signup-page" class="relative h-screen w-screen bg-black overflow-hidden font-sans">
    <!-- Background Video -->
    <div class="absolute top-0 left-0 w-full h-full">
      <video
        :src="backgroundVideoSrc"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
    </div>

    <!-- Centered Form Container -->
    <div class="relative z-10 flex justify-center items-start pt-12 sm:pt-16 md:items-center md:pt-0 h-full p-4 overflow-y-auto">
      <div class="w-full max-w-sm bg-black bg-opacity-70 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md my-auto">
        
        <!-- Header -->
        <div class="text-center mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-white">{{ headerTitle }}</h1>
          <p class="text-gray-400 text-sm mt-2">{{ headerSubtitle }}</p>
        </div>

        <!-- Error Message Display -->
        <div v-if="errorMessage" class="bg-red-500 bg-opacity-40 border border-red-500 text-red-200 text-sm rounded-lg p-3 text-center mb-4">
          {{ errorMessage }}
        </div>
        
        <!-- Step 1: Email Input -->
        <form v-if="step === 1" @submit.prevent="handleSendCode" novalidate>
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input 
                v-model="email"
                id="email"
                type="email" 
                placeholder="you@example.com" 
                class="w-full bg-black bg-opacity-40 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>
          </div>
          <button type="submit" :disabled="isLoading" class="w-full mt-6 bg-yellow-500 text-black rounded-full px-4 py-3 text-sm font-bold hover:bg-yellow-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
             <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            {{ isLoading ? 'Sending...' : 'Send Verification Code' }}
          </button>
        </form>

        <!-- Step 2: Verification Code -->
        <form v-if="step === 2" @submit.prevent="handleVerifyCode">
          <p class="text-center text-sm text-gray-300 mb-4">An email with a verification code was sent to <strong class="font-medium text-white">{{ email }}</strong>.</p>
          <div>
              <label for="code" class="block text-sm font-medium text-gray-300 mb-2">Verification Code</label>
              <div class="relative">
                <input 
                  v-model="code"
                  id="code"
                  type="text" 
                  placeholder="Enter 6-digit code" 
                  class="w-full bg-black bg-opacity-40 border border-gray-600 rounded-lg pl-4 pr-28 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
                <button @click.prevent="handleSendCode" :disabled="countdown > 0" class="absolute inset-y-0 right-0 flex items-center px-4 text-xs font-semibold rounded-r-lg" :class="countdown > 0 ? 'text-gray-400' : 'text-yellow-400 hover:text-yellow-300'">
                  {{ countdown > 0 ? `Resend in ${countdown}s` : 'Resend' }}
                </button>
              </div>
          </div>
          <button type="submit" class="w-full mt-6 bg-yellow-500 text-black rounded-full px-4 py-3 text-sm font-bold hover:bg-yellow-400 transition-colors">
            Verify
          </button>
        </form>

        <!-- Step 3: Set Password -->
        <form v-if="step === 3" @submit.prevent="handleSetPassword">
           <div class="space-y-4">
            <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input 
                  v-model="password"
                  id="password"
                  type="password" 
                  placeholder="Create a strong password" 
                  class="w-full bg-black bg-opacity-40 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
            </div>
            <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input 
                  v-model="confirmPassword"
                  id="confirmPassword"
                  type="password" 
                  placeholder="Confirm your password" 
                  class="w-full bg-black bg-opacity-40 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
            </div>
          </div>
          <button type="submit" class="w-full mt-6 bg-yellow-500 text-black rounded-full px-4 py-3 text-sm font-bold hover:bg-yellow-400 transition-colors">
            Continue
          </button>
        </form>

        <!-- Step 4: Payment -->
        <div v-if="step === 4" class="text-center">
            <div class="border border-dashed border-yellow-400 rounded-lg p-4 mb-6 bg-yellow-500 bg-opacity-10 text-center">
              <h3 class="font-bold text-yellow-300 text-lg">🎉 Surprise Bonus!</h3>
              <p class="text-gray-300 mt-1">Complete your registration to receive a complimentary membership (a <span class="font-bold text-white">$9.99 value</span>)!</p>
            </div>
            <div class="mb-6">
                <p class="text-gray-300">One final step to unlock full access.</p>
                <p class="text-4xl font-bold text-white mt-2">$2.99</p>
                <p class="text-sm text-gray-400">One-time payment</p>
            </div>
            <button @click="handlePaymentAndSignUp" :disabled="isLoading" class="w-full bg-yellow-500 text-black rounded-full px-4 py-3 text-sm font-bold hover:bg-yellow-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
             <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Processing...' : 'Pay & Create Account' }}
            </button>
        </div>
        
        <!-- Step 5: Success -->
        <div v-if="step === 5" class="text-center">
            <div class="border border-dashed border-yellow-400 rounded-lg p-4 mb-6 bg-yellow-500 bg-opacity-10 text-center">
              <h3 class="font-bold text-yellow-300 text-lg">🎉 Bonus Unlocked!</h3>
              <p class="text-gray-300 mt-1">We've added a complimentary membership <br> (a <span class="font-bold text-white">$9.99 value</span>) to your account!</p>
            </div>
            <button @click="handleGoToHome" class="w-full mt-2 bg-yellow-500 text-black rounded-full px-4 py-3 text-sm font-bold hover:bg-yellow-400 transition-colors">
              Go to Homepage
            </button>
        </div>

        <div v-if="step < 5" class="text-center text-sm text-gray-400 mt-8">
            Already have an account? 
            <a href="#" class="font-semibold text-yellow-400 hover:text-yellow-300 hover:underline transition-colors">Sign In</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- STATE MANAGEMENT ---
const step = ref(1); // 1: Email, 2: Code, 3: Password, 4: Payment, 5: Success
const email = ref('');
const code = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const countdown = ref(0);
let countdownTimer = null;

const backgroundVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");

// --- COMPUTED PROPERTIES ---
const headerTitle = computed(() => {
    return step.value === 5 ? 'Welcome!' : 'Create Account';
});

const headerSubtitle = computed(() => {
  switch (step.value) {
    case 1: return 'Start by entering your email';
    case 2: return 'Check your inbox for a code';
    case 3: return 'Secure your account with a password';
    case 4: return 'Complete your registration';
    case 5: return 'Your account is ready.';
    default: return 'Get started with your free account';
  }
});

// --- METHODS ---

// Function to start the resend countdown timer
const startCountdown = () => {
  clearInterval(countdownTimer);
  countdown.value = 60;
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownTimer);
    }
  }, 1000);
};

// Step 1: Handle sending the verification code
const handleSendCode = async () => {
  errorMessage.value = '';
  if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address.';
    return;
  }
  
  isLoading.value = true;
  console.log(`Sending verification code to: ${email.value}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  
  console.log('Simulated code sent: 123456');
  step.value = 2;
  startCountdown();
  isLoading.value = false;
};

// Step 2: Handle verification of the entered code
const handleVerifyCode = () => {
  errorMessage.value = '';
  // For demonstration, we'll use a static code. In a real app, this would be validated server-side.
  if (code.value === '123456') {
    console.log('Code verified successfully.');
    step.value = 3;
    clearInterval(countdownTimer); // Stop timer on success
  } else {
    errorMessage.value = 'Invalid verification code. Please try again.';
  }
};

// Step 3: Handle setting and confirming the password
const handleSetPassword = () => {
  errorMessage.value = '';
  if (!password.value || password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }
  
  console.log('Password set successfully.');
  step.value = 4;
};

// Step 4: Handle payment simulation and final account creation
const handlePaymentAndSignUp = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  console.log('Processing payment of $2.99...');

  // Simulate API call for payment and account creation
  await new Promise(resolve => setTimeout(resolve, 2000)); 

  console.log('Payment successful! Creating account...');
  console.log('Email:', email.value);
  console.log('Account created successfully!');

  isLoading.value = false;
  step.value = 5; // Move to the success step
};

// Step 5: Handle redirection to home
const handleGoToHome = () => {
    console.log('Redirecting to homepage...');
    // In a real application, you would redirect the user.
    // For example: window.location.href = '/dashboard';
    alert('Redirecting to the homepage...');
};

</script>

<style>
/* Global styles to ensure full-page layout */
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent scrolling on the body */
}

#signup-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>

