<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <!-- 关键改动：添加 :key 属性 -->
    <!-- 当 currentVideoSrc 变化时，这个 :key 会强制 Vue 重新创建 video 元素，从而加载新视频 -->
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
</template>

<script setup>
import { ref, defineExpose } from 'vue';

// 默认视频源
const currentVideoSrc = ref("https://storage.googleapis.com/peachai/AIgirl/JK%E5%B0%91%E5%A5%B3%E5%A4%95%E9%98%B3%E6%95%99%E5%AE%A4ASMR%E8%A7%86%E9%A2%91.mp4");

// 定义一个方法，用于改变视频源
const changeVideo = (newSrc) => {
  if (newSrc) {
    console.log(`[VideoStream] Changing video to: ${newSrc}`);
    currentVideoSrc.value = newSrc;
  }
};

// 使用 defineExpose 将 changeVideo 方法暴露给父组件
defineExpose({
  changeVideo
});
</script>

<style scoped>
.object-cover {
  object-fit: cover;
}
</style>
