<template>
    <!-- Backdrop Overlay -->
    <div 
      @click="$emit('close')" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end menu-fade-in"
    >
      <!-- Menu Panel -->
      <div 
        @click.stop 
        class="bg-gray-900 bg-opacity-90 backdrop-blur-lg w-full max-w-2xl rounded-t-2xl p-4 menu-slide-up"
      >
        <!-- Header -->
        <div class="text-center text-white font-bold mb-4">
          <h3 class="text-lg">Send Tip</h3>
          <p class="text-xs text-gray-400">Choose an action for the streamer to perform</p>
        </div>
  
        <!-- *** KEY CHANGE: Actions List *** -->
        <!-- The grid has been replaced with a div that will contain the list items. -->
        <div class="space-y-2">
          <!-- Loop through each action item -->
          <button 
            v-for="tip in tips" 
            :key="tip.id"
            @click="sendTip(tip)"
            class="w-full flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-colors text-left"
          >
            <!-- Left side: Icon and Action Name -->
            <div class="flex items-center space-x-4">
              <div v-html="tip.icon" class="w-8 h-8 text-white flex-shrink-0"></div>
              <span class="text-base text-white font-semibold">{{ tip.name }}</span>
            </div>
            
            <!-- Right side: Price -->
            <span class="text-base text-yellow-400 font-bold">{{ tip.price }}</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Props and emits remain the same.
  defineProps({
    tips: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['send-tip', 'close']);
  
  const sendTip = (tip) => {
    emit('send-tip', tip);
  };
  </script>
  
  <style scoped>
  /* Animations remain the same */
  .menu-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .menu-slide-up { animation: slideUp 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  </style>
  