<template>
      <!-- 顶部导航栏 -->
      <header class="nav-bar from-pink-400 via-purple-500 to-fuchsia-600">
    <span class="logo-text">蜜桃AI</span>
    <div class="nav-right">

      <a class="nav-link" href="/user">个人中心</a>
    </div>
  </header>
  <br>
  <div class="" data-aos="fade-right" data-aos-easing="ease" data-aos-duration="1000">
                    <div class="gradient-carousel-img">
    <el-carousel height="130px" arrow="always" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="carousel-img-item"
          :style="{ backgroundImage: `url(${item.admin_value})` }"
        >
        <!--
          <div class="overlay" >
            <h2 class="text-3xl font-extrabold text-center text-transparent bg-clip-text
           bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500
           animate-gradient neon-text flicker bounce-slow">{{ item.title }}</h2>
            <p class="text-3xl font-extrabold text-center text-transparent bg-clip-text
           bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500
           animate-gradient neon-text flicker bounce-slow">{{ item.desc }}</p>
        
          </div>-->
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

               <!-- <a href="#"
                   class="group mt-10 inline-flex items-center justify-center gap-2 border border-white/10 text-white py-1 px-1 pe-4 rounded-full hover:bg-primary-hover transition-all duration-300">
                  <span
                      class="h-11 w-11 rounded-full bg-primary/20 group-hover:bg-white/10 text-primary group-hover:text-white flex items-center justify-center me-2">
                    <Image class="h-5 w-5"/>
                  </span>
                  Generate Images
                </a>-->
              </div>


  <Examples/>
<br>
  <Features/>

  <section class="pb-24">
    <div class="container">
      <div class="flex items-end justify-between mb-10">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-medium capitalize text-white mb-4">📸 上传你的理想脸庞，一键生成AI分身</h2>
          <p class="w-2/3 mx-auto text-base text-default-200 font-medium">想拥有只属于你的AI女友？上传一张你喜欢的面容照片，AI将基于面部特征智能生成逼真分身，拥有外貌、声音、性格三位一体的沉浸式体验。</p>

          <div class="mt-8">
            <a href="#"
               class="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300">免费体验
              <MoveRight class="h-5 w-5"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer/>


  <BackToTop/>
    <!-- 悬浮按钮 -->
     <!-- 自定义图标悬浮按钮 -->
  <div
    class="fixed bottom-6 left-6 z-50 flex flex-col items-center space-y-1 animate-bounce-slow"
  >
    <!-- 按钮 -->
    <div
      @click="creategirl"
      class="relative w-12 h-12 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all pulse-ring-strong"
      style="background: linear-gradient(135deg, #c084fc, #f472b6);"
    >
      <img src="https://storage.googleapis.com/peachai/image/icon/icons8-love-48%20(1).png" alt="创建女友" class="w-11 h-11" />
    </div>

    <!-- 文字 -->
    <div class="text-sm font-semibold text-glow-gradient animate-text-flicker">创建女友</div>
  </div>
</template>

<script setup lang="ts">
import type {NavBarLinkType} from "@/types/layout";
import NavBar from "@/components/NavBar.vue";
import Hero from "@/views/pages/index-2/components/Hero.vue";
import Examples from "@/views/pages/index-2/components/Examples.vue";
import Features from "@/views/pages/index-2/components/Features.vue";
import AIMade from "@/views/pages/index-2/components/AIMade.vue";
import Testimonials from "@/views/pages/index-2/components/Testimonials.vue";
import Footer from "@/views/pages/index-2/components/Footer.vue";
import Background1 from "@/components/Background1.vue";
import BackToTop from "@/components/BackToTop.vue";
import { Plus } from '@element-plus/icons-vue'
import {MoveRight} from "lucide-vue-next";
import { useRouter } from 'vue-router';
import { ref, onMounted,computed } from 'vue';
import { ElLoading } from 'element-plus';
const router = useRouter();
const banners = ref([
  {
 
    admin_value: '',
  },
  {
  
    admin_value: 'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/avatar/00105-296450643.png',
  },
  {
   
    admin_value: 'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00157-519239047.png',
  }
])


const creategirl = () =>{
  router.push(`/avatar/`)

 }


 onMounted( async () => {
 await getBanners();

 })

 const getBanners = async () => {
    const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const postData = {
        admin_name: 'indexbanner',
      };
    try {
        const response = await  fetch('https://peachapi.ctrsai.work/admin/getByName',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
       // rows.value = response.data;
      //  console.log(await response.json())
      const res = await response.json();
      console.log(res)
      if(res.success)
      {
        banners.value = res.admin
        console.log(banners.value)
        loading.close();
      }
      
      } catch (error) {
        console.error('Error fetching data:', error);
        loading.close();
      } 
}

</script>

<style scoped>
/* 导航栏样式 */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background: linear-gradient(to right, #070232, #010d3e, #080137);
  backdrop-filter: blur(10px); /* 模糊背景效果 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* 添加边框 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}
.logo-text {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(90deg, #4820a3, #e665c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-right {
  display: flex;
  gap: 16px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ab1597, #8747a5);  /*紫色渐变 */
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.nav-link:hover {
  background: linear-gradient(135deg, #c471ed, #f7797d); /* hover 渐变变化 */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}


.gradient-carousel-img {
  max-width: 860px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(134, 92, 255, 0.2);
  object-fit: contain;
}


.carousel-img-item {
  height: 130px;
  background-size: cover;
  background-position: center;
  position: relative;
  object-fit: contain;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 30px;
  color: white;
}

.overlay h2 {
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
}

.overlay p {
  font-size: 25px;
  opacity: 0.9;
}

/* 手机端样式适配 */
@media (max-width: 768px) {
  .carousel-img-item {
    height: 130px;
  }

  .overlay {
    padding: 20px;
  }

  .overlay h2 {
    font-size: 20px;
  }

  .subtitle {
    font-size: 15px;
  }

  .description {
    font-size: 13px;
    max-width: 100%;
  }
}


/**霓虹字体 */
@keyframes gradient-move {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
  }
  20%, 22%, 24%, 55% {
    opacity: 0.4;
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-move 6s ease infinite;
}

.neon-text {
  text-shadow:
    0 0 2px #dd11dd,
    0 0 4px #af67f8,
    0 0 6px #290050;
}
.flicker {
  animation: flicker 3s infinite;
}

.bounce-slow {
  animation: bounce-slow 2.5s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2.5s infinite;
}

/* 多层炫酷脉冲环 */
.pulse-ring-strong::before,
.pulse-ring-strong::after {
  content: '';
  position: absolute;
  border-radius: 9999px;
  z-index: 0;
  animation: pulse 3s infinite ease-out;
}

.pulse-ring-strong::before {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 0, 255, 0.4), transparent);
}
.pulse-ring-strong::after {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.8);
    opacity: 0.3;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.text-glow-gradient {
  background: linear-gradient(90deg, #f472b6, #c084fc, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 6px #f472b6, 0 0 12px #c084fc;
}

/* 微闪烁动画 */
@keyframes text-flicker {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
.animate-text-flicker {
  animation: text-flicker 2s infinite ease-in-out;
}
</style>