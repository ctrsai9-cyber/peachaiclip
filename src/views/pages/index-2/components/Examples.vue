<template>


    <div class="container">
    <!--   
      <div class="relative overflow-hidden w-full h-6 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600">
      
    <div
      class="absolute whitespace-nowrap animate-marquee text-white font-semibold text-sm sm:text-base px-4"
      :style="{ animationDuration: speed + 's' }"
    >
      <span class="animate-text-gradient bg-clip-text text-transparent">
        👩‍💻💬 你的虚拟女友，24小时在线宠你！🧸 会卖萌、会撒娇、还懂你的小情绪～ ✨
      </span>
      
    </div>
  </div>
 
  <div class="mt-8 flex justify-center">
    <button
      @click="tochat(filteredImages[0].girl_id,filteredImages[0].image_url)"
      class="animate-bounce bg-gradient-to-r from-pink-400 via-purple-500 to-fuchsia-600 
             text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-2xl 
             hover:scale-105 transition-all duration-300 text-lg sm:text-xl flex items-center space-x-2"
    >
      <span>🎯 一键匹配女友</span>
      <span class="text-2xl animate-pulse">💖</span>
    </button>
  </div>-->
 <!--
      <el-row :gutter="10" class="items-center flex-wrap mb-4">
  
    <el-col :span="6" class="sm:span-7">
      <el-select
        v-model="filter.type"
        placeholder="选类型"
        clearable
        class="w-full custom-select"
        size="small"
      >
        <el-option label="全部" value="" />
        <el-option
          v-for="item in typeOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-col>

 
    <el-col :span="6" class="sm:span-7">
      <el-select
        v-model="filter.sortBy"
        placeholder="排序"
        clearable
        class="w-full custom-select"
        size="small"
      >
        <el-option label="按时间" value="time">
          <template #default>
            <el-icon class="mr-1 text-purple-500"><Clock /></el-icon> 时间
          </template>
        </el-option>
        <el-option label="按热度" value="hot" />
        <el-option label="按评分" value="rate">
          <template #default>
            <el-icon class="mr-1 text-yellow-500"><Star /></el-icon> 评分
          </template>
        </el-option>
      </el-select>
    </el-col>

  
    <el-col :span="6" class="sm:span-5">
      <el-input
        v-model="filter.keyword"
        placeholder="搜索"
        clearable
        class="w-full custom-input"
        size="small"
      >
        <template #prefix>
          <el-icon class="text-purple-500"><Search /></el-icon>
        </template>
      </el-input>
    </el-col>


    <el-col :span="6" class="sm:span-5 text-right">
      <el-button
        size="small"
        type="primary"
        plain
        class="custom-button"
        @click="resetFilter"
      >
        重置
      </el-button>
    </el-col>
  </el-row>
     -->

     <div class="relative w-full">
      <!-- 分类标签区域 -->
      <div
      class="overflow-hidden transition-all duration-300"
      :class="isExpanded ? 'max-h-full' : 'max-h-6'"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="item in typeOptions"
          :key="item"
          @click="selectType(item)"
          :class="[
            'px-3 py-1 text-xs rounded-full cursor-pointer transition-all duration-300',
            {
              'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm scale-105': selectedType == item, // 选中状态
              'bg-gray-100 text-gray-700 hover:bg-purple-100': selectedType != item // 未选中状态
            }
          ]"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 展开/收起按钮 -->
    <div class="flex justify-end mt-2">
      <button
        class="text-purple-500 text-sm hover:underline focus:outline-none"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? '收起 ⬆️' : '显示全部 ⬇️' }}
      </button>
    </div>
     </div>
   
  <br>

    

        <!--
        <div class="relative rounded-lg overflow-hidden" data-aos="fade-right" data-aos-easing="ease"
             data-aos-duration="1000">
          <img class="mx-auto h-full w-full object-cover object-top ransition duration-500 group-hover:scale-105"
               src="https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00126-2648322627.png" alt="woman" loading="lazy" width="640" height="805">
          <div class="absolute inset-0">
            <div class="h-full w-full">
              <div class="flex items-end h-full w-full p-5">
                <div class="bg-white/10 backdrop-blur-md p-6 rounded w-full">
                  <h2 class="text-lg font-normal text-center text-default-300">Gaze upon the awe-inspiring creation of
                    artificial intelligence, a majestic dragon of epic proportions. </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6" data-aos="fade-left" data-aos-easing="ease" data-aos-duration="1000">
          <div class="relative rounded-lg overflow-hidden">
            <img class="mx-auto h-full w-full object-cover object-top ransition duration-500 group-hover:scale-105"
                 src="https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00127-716484268.png" alt="woman" loading="lazy" width="640" height="805">
            <div class="absolute inset-0">
              <div class="h-full w-full">
                <div class="flex items-end h-full w-full p-5">
                  <div class="bg-white/10 backdrop-blur-md p-6 rounded w-full">
                    <h3 class="text-lg font-normal text-center text-default-200">An enchanting ice dragon born from the
                      algorithms of AI</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative rounded-lg overflow-hidden">
            <img class="mx-auto h-full w-full object-cover object-top ransition duration-500 group-hover:scale-105"
                 src="https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00129-548543147.png" alt="woman" loading="lazy" width="640" height="805">
            <div class="absolute inset-0">
              <div class="h-full w-full">
                <div class="flex items-end h-full w-full p-5">
                  <div class="bg-white/10 backdrop-blur-md p-6 rounded w-full">
                    <h3 class="text-lg font-normal text-center text-default-200">A marvel of mechanical artistry and AI
                      ingenuity</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>-->
 
    <!-- 筛选区域 -->

    <div  class="grid grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-for="(item, index) in filteredImages" :key="index">

        <div v-if="item.image_status" class="relative rounded-lg overflow-hidden"
             data-aos-duration="1000" >
          <!-- <img class="mx-auto h-full w-full object-cover object-top ransition duration-500 group-hover:scale-105"
               :src=item.image_url alt="woman" width="640" height="805">
                 卡片右上角 Tag 标签 -->
                 <video v-if="!isImageUrl(item.image_url) && item.image_status"  class="mx-auto h-full w-full  group-hover:scale-1"
         :src="item.image_url" 
         autoplay 
         loop 
         muted 
         playsinline 
         alt="woman video" 
         width="640" 
         height="805">
    <!-- 提供视频不支持时的回退内容 -->
    Your browser does not support the video tag.
  </video>
  <img width="640" height="805" v-if="isImageUrl(item.image_url) && item.image_status" class="mx-auto h-full w-full  group-hover:scale-1" :src="item.image_url" >
  <div v-if="item.image_status" class="absolute top-2 right-2 flex gap-2 flex-wrap z-10">
    <el-tag v-if="!isMobile"
      v-for="(tag, i) in parsetags(item.image_tags)"
      :key="i"
      type="info"
      size="small"
      effect="dark"
      round
    >{{ tag }}</el-tag>
    <span  v-if="isMobile" class="absolute right-0 flex items-center justify-center 
           w-8 h-8 sm:w-9 sm:h-9 rounded-full py-0
           bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500
           shadow-sm">
    
    <img src="https://storage.googleapis.com/peachai/image/icon/icons8-chat-32.png" alt="图标" class="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
    
  </span>

  <span v-if="isMobile" class="absolute top-9 right-0 flex items-center justify-center px-3 py-0.5  rounded-full
               bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 
               text-white text-xs sm:text-sm font-semibold shadow-sm">
    <img src="https://storage.googleapis.com/peachai/image/icon/icons8-star-32.png" alt="图标" class="w-3 h-3" />
    <span>{{item.image_rate}}</span>
  </span>

  <span v-if="isMobile" class="absolute top-20 right-0 flex items-center justify-center px-3 py-0.5 rounded-full
               bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 
               text-white text-xs sm:text-sm font-semibold shadow-sm">
    <img src="https://storage.googleapis.com/peachai/image/icon/icons8-hot-32.png" alt="图标" class="w-3 h-3" />
    <span>{{item.image_hot}}</span>
  </span>



    <span v-if="!isMobile" class="absolute top-8 right-2 flex items-center gap-1 px-2 py-1 rounded-full
               bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 
               text-white text-sm font-semibold shadow-md">
    <img src="https://storage.googleapis.com/peachai/image/icon/icons8-chat-32.png" alt="图标" class="w-6 h-6" />
    
  </span>
  <span v-if="!isMobile" class="absolute top-20 right-2 flex items-center gap-1 px-3 py-1 rounded-full
               bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 
               text-white text-sm font-semibold shadow-md">
    <img src="https://storage.googleapis.com/peachai/image/icon/icons8-star-32.png" alt="图标" class="w-4 h-4" />
    <span>{{item.image_rate}}</span>
  </span>
  <span v-if="!isMobile" class="absolute top-32 right-2 flex items-center gap-1 px-3 py-1 rounded-full
               bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 
               text-white text-sm font-semibold shadow-md">
    <img src="https://storage.googleapis.com/peachai/image/icon/icons8-hot-32.png" alt="图标" class="w-4 h-4" />
    <span>{{item.image_hot}}</span>
  </span>
  </div>
  <div v-if="item.image_status" class="absolute top-2 left-2 flex gap-2 flex-wrap z-10">
    <el-tag
      type="info"
      size="small"
      effect="dark"
      round
    >{{ item.image_type }}</el-tag>
    
  </div>
          <div v-if="item.image_status"  class="absolute inset-0">
            <div class="h-full w-full">
              <div class="flex items-end h-full w-full p-5">
                <div class=" p-1 rounded w-full">
                  <h3 v-if="!isMobile" class="text-3xl font-extrabold text-center text-transparent bg-clip-text
           bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500
           animate-gradient neon-text flicker bounce-slow">
                    {{item.image_des}}</h3>

  <div v-if="item.image_status" class="mt-2 flex items-center justify-center gap-2" >
    <el-tag v-if="!isMobile"
      v-for="(tag, i) in parsetags(item.image_tags)"
      :key="i"
      type="info"
      size="small"
      effect="dark"
      round
    >{{ tag }}</el-tag>
    </div>
  
   <div v-if="item.image_status" class="mt-2 flex items-center justify-center gap-2" >
    <el-button v-if="!isMobile"  color="#626aef">与我聊天</el-button>
    <el-button v-if="!isMobile" color="#626aef">个人主页</el-button>
  </div>
  
  <!-- 分類Tag -->
  <div v-if="item.image_status" class="mt-2 flex items-center justify-center gap-2">

    <el-tag v-if="isMobile"
      v-for="(tag, i) in parsetags(item.image_tags)"
      :key="i"
      type="info"
      size="small"
      effect="dark"
      round
    >{{ tag }}</el-tag>
  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </template>
      </div>

      
    </div>



        <!--
        <div class="relative rounded-lg overflow-hidden" data-aos="fade-left" data-aos-easing="ease"
             data-aos-duration="1000">
          <img class="mx-auto h-full w-full object-cover object-top ransition duration-500 group-hover:scale-105"
               :src="aiImg12" alt="woman" loading="lazy" width="640" height="805">
          <div class="absolute inset-0">
            <div class="h-full w-full">
              <div class="flex items-end justify-end h-full w-full p-5">
                <a href="#"
                   class="py-2 px-3 flex items-center gap-6 rounded-full text-default-300 bg-white/10 backdrop-blur-md">Explore
                  more
                  <Send class="h-5 w-5 stroke-white"/>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="relative rounded-lg overflow-hidden" data-aos="fade-left" data-aos-easing="ease"
             data-aos-duration="1000">
          <img class="mx-auto h-full w-full object-cover object-top ransition duration-500 group-hover:scale-105"
               src="https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00051-1249196290.png" alt="woman" loading="lazy" width="640" height="805">
          <div class="absolute inset-0">
            <div class="h-full w-full">
              <div class="flex items-end justify-end h-full w-full p-5">
                <a href="#"
                   class="py-2 px-3 flex items-center gap-6 rounded-full text-default-300 bg-white/10 backdrop-blur-md">Explore
                  more
                  <Send class="h-5 w-5 stroke-white"/>
                </a>
              </div>
            </div>
          </div>
        </div>-->
    
 
</template>

<script setup lang="ts">
import aiImg8 from "@/assets/images/ai/img-8.jpg"
import aiImg10 from "@/assets/images/ai/img-10.jpg"
import aiImg11 from "@/assets/images/ai/img-11.jpg"
import aiImg12 from "@/assets/images/ai/img-12.jpg"
import aiImg13 from "@/assets/images/ai/img-13.jpg"
import {Send} from "lucide-vue-next";
import { Clock, Star, Search } from '@element-plus/icons-vue'
import { ref, onMounted,computed } from 'vue';
import { ElLoading } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
const isExpanded = ref(false)
const speed = 10;
const selectedType = ref('全部')
const isMobile = ref(false);
const router = useRouter()

const typeOptions = ref(['全部','黑丝', '御姐', '甜妹', '治愈','技师','美腿','大胸'])

const getImageTags = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
        const postData = {
        admin_name: 'image_tags',
      };
      try {
        const response = await fetch('https://peachapi.ctrsai.work/admin/getByName',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const res = await response.json();
      if(res.success)
    {
      console.log(res);
      typeOptions.value = parsetags(res.admin[0].admin_value);
      loading.close()
    }
    else{
      ElMessage({
        type: 'warning',
        message: '获取AI图片分类数据失败！',
      })
      loading.close();
    }
      
     
      } catch (error) {
        console.error('Error fetching data:', error);
        loading.close()
      } 

}


const filter = ref({
  sortBy: 'time',
  type: '',
  keyword: ''
})

const selectType = (type:string) => {
  selectedType.value = type
  filter.value.type = type
  // TODO: 发起筛选请求 / 过滤内容
  console.log(`筛选：${type}`)
}
const resetFilter = () => {
    filter.value.type = ''
    filter.value.sortBy = ''
    filter.value.keyword = ''
  }
const filteredImages = computed(() => {
  let data = [...imagedata.value]

  // 筛选关键词
  if (filter.value.keyword) {
    data = data.filter(d => d.image_des.toLowerCase().includes(filter.value.keyword.toLowerCase()))
  }


  if (filter.value.type) {
    if(filter.value.type == '全部')
  {
    filter.value.type = ''
  }
  else{
    data = data.filter(item => {
  try {
    const tags = JSON.parse(item.image_tags.replace(/'/g, '"')); // 将字符串中的单引号变双引号，然后 JSON.parse
    return tags.includes(filter.value.type);
  } catch (e) {
    return false; // 解析失败就跳过
  }
});
  }
    
  }

  switch (filter.value.sortBy) {
  case 'time':
    data.sort((a, b) => {
      const timeA = new Date(a.update_time).getTime()
      const timeB = new Date(b.update_time).getTime()
      return timeB - timeA
    })
    break
  case 'hot':
    data.sort((a, b) => Number(b.image_hot) - Number(a.image_hot))
    break
  case 'rate':
    data.sort((a, b) => Number(b.image_rate) - Number(a.image_rate))
    break
}

  return data
})

const imagedata = ref([
    {
    image_url: 'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00147-2609540701.png',
    image_type: '御姐',
    update_time: '2025-04-10',
    image_hot: 88,
    image_rate: 4.6,
    image_des: '神秘御姐AI，守护数字森林',
    image_tags: "['黑丝', '秘书', '长腿']",
    girl_id:1,
    image_status:0
  },
]);
const loading = ref(false);
function isImageUrl(url:string) {
  return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
}
onMounted( async () => {

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768

  }
  checkMobile()
  await getImageTags();
  await fetchImageData();
  ElMessageBox.confirm(
    '此服务/内容仅限18岁及以上用户使用。\n点击“确认”，即表示你验证自己年满18岁，并同意遵守我们的服务条款和适用法律。',
    'Warning',
    {
      confirmButtonText: '我已满18岁',
      type: 'warning',
    }
  )
    .then(async () => {
  
    
      
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
     
    });
const fetchImageData = async  () => {

  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
      try {
        const response = await  fetch('https://peachapi.ctrsai.work/image/getImageAndGirl',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
      imagedata.value = await response.json();
      console.log(imagedata.value);
      loading.close()
     
      } catch (error) {
        console.error('Error fetching data:', error);
        loading.close()
      } 
    };

    const parsetags = (girl_tags:string) =>{

      if(girl_tags != null)
    {
      return JSON.parse(girl_tags.replace(/'/g, '"'))
    }
    else{
      return null
    }
     
    }



</script>

<style scoped>

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes text-gradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.animate-text-gradient {
  background-image: linear-gradient(270deg, #ffffff, #ffe4fa, #f0abfc, #ffffff);
  background-size: 200% 200%;
  animation: text-gradient 3s ease infinite;
}


:deep(.el-select),
:deep(.el-input) {
  animation: fadeSlideIn 0.5s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

:deep(.el-select:hover),
:deep(.el-input:hover) {
  transform: scale(1.02);
  box-shadow: 0 0 8px rgba(128, 90, 213, 0.4);
}

:deep(.el-input.is-focus) {
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5);
  border-radius: 6px;
}

@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}



.custom-button {
  background: linear-gradient(to right, #a855f7, #9333ea);
  border: none;
  color: white;
}

.custom-button:hover {
  filter: brightness(1.1);
}
.el-tag {
  backdrop-filter: blur(4px);
  background-color: rgb(119, 0, 255);
  color: #fff;
  border: none;
}

.gift-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .el-rate .el-rate__icon {
    font-size: 14px; /* Smaller stars for mobile */
  }
  .el-rate .el-rate__text {
    font-size: 12px; /* Smaller score text */
  }
}

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
</style>