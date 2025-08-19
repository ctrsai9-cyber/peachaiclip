<template>
  <!-- 
    The main container for the interaction buttons.
    - Adopts the new styling with vertical spacing, right alignment, and dark, circular buttons.
  -->
  <div class="flex flex-col items-center space-y-5 justify-end h-full ml-4">
    
    <!-- 1. Like Button -->
    <button 
      @click="$emit('like')" 
      class="interaction-button"
      aria-label="Like the stream"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-pink-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
    </button>

    <!-- 2. Gift Button -->
    <!-- Note: The emit has been changed back to 'send-gift' to match the parent component's expectation -->
    <button 
      @click="$emit('send-gift')" 
      class="interaction-button"
      aria-label="Send a random gift"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
    </button>

    <!-- 3. Tips Button (The Entrance for Actions) -->
    <!-- 
      - This button now opens the Tips/Actions menu.
      - It emits 'toggle-tips' when clicked.
      - It has a dynamic class to give it a yellow glow when the menu is active.
    -->
    <button 
      @click="$emit('toggle-tips')" 
      :class="['interaction-button', { 'active-button': isTipsMenuOpen }]"
      aria-label="Open tips menu to trigger actions"
    >
      <!-- Using a "magic" wand icon to signify triggering an action -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.25278C12 6.25278 15.2148 3 18.5 3C22.2 3 24 6.11929 24 9.5C24 12.8807 21.8 16 18.5 16C15.2148 16 12 12.7472 12 12.7472M12 6.25278C12 6.25278 8.78522 3 5.5 3C1.8 3 0 6.11929 0 9.5C0 12.8807 2.2 16 5.5 16C8.78522 16 12 12.7472 12 12.7472M12 6.25278V12.7472" transform="rotate(45 12 12)"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21V19"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5V3"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12L19 12"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12L3 12"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
// Define the props and emits needed for communication with the parent component.
defineProps({
  // This prop is received from the parent to know if the menu is currently open.
  isTipsMenuOpen: {
    type: Boolean,
    default: false,
  }
});

// Define all the events this component can emit.
defineEmits(['like', 'send-gift', 'toggle-tips']);
</script>

<style scoped>
/* Base styling for all buttons, using the new design. */
.interaction-button {
  width: 56px; /* 14 * 4px */
  height: 56px; /* 14 * 4px */
  border-radius: 9999px; /* full circle */
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
}

/* Hover effect for all buttons */
.interaction-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

/* Styling for the Tips button when the menu is active. */
.active-button {
  border-color: #FBBF24; /* amber-400 */
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.7);
}
</style>
