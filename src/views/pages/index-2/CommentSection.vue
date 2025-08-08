<template>
    <div ref="commentContainer" class="h-64 overflow-y-auto text-white text-sm pr-4 comment-mask">
      <div v-for="comment in comments" :key="comment.id" class="mb-2 p-1 rounded-lg">
        <span class="font-bold text-gray-400">{{ comment.user }}:</span>
        <span class="text-white">{{ comment.text }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, nextTick } from 'vue';
  
  const props = defineProps({
    comments: {
      type: Array,
      required: true
    }
  });
  
  const commentContainer = ref(null);
  
  // 监听评论数组的变化，每当有新评论时，自动滚动到底部
  watch(() => props.comments, () => {
    nextTick(() => {
      if (commentContainer.value) {
        commentContainer.value.scrollTop = commentContainer.value.scrollHeight;
      }
    });
  }, { deep: true });
  </script>
  
  <style scoped>
  /* 评论滚动区域的渐变遮罩，使其底部有淡出效果 */
  .comment-mask {
    mask-image: linear-gradient(to top, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to top, black 60%, transparent 100%);
  }
  </style>