<template>
  <div class="bg-purple-gradient min-h-screen flex items-center justify-center px-4 py-10">
    <div class="card max-w-5xl w-full grid lg:grid-cols-2 gap-10">
      <!-- 左侧图文区域 -->
      <div class="hidden lg:block">
        <div class="relative rounded-xl overflow-hidden h-full w-full">
          <img
            src="https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/images/White Minimalist Photo Collage.png"
            alt=""
            class="w-full h-full object-cover transform -scale-x-100"
          />
          <div class="absolute inset-0 bg-black/40 flex items-end justify-center">
            <div class="p-6 text-start text-white">
              <h5 class="text-xl font-bold mb-3">现在注册，开启甜蜜陪伴旅程 <br />让心动，从第一句“你好”开始!</h5>
              <p class="text-base text-white/80">Try all paid functions for free. Just register and create your first widget.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧注册卡片 -->
      <div class="flex flex-col justify-center">
        <LogoBox class="mb-4 mx-auto" />
        <el-text class="mx-1" type="primary">打造自己的AI分身：只需三步! 解锁精准客户，引爆生意增长！</el-text>

        <el-steps :active="activeStep" align-center finish-status="success" class="my-6">
          <el-step title="选择风格" />
          <el-step title="脸部检测" />
          <el-step title="补充信息" />
        </el-steps>

        <label v-if="selectedIndex == -1" class="text-white mb-2 font-semibold">选择风格</label>
<el-row v-if="selectedIndex == -1" :gutter="20" class="mb-4">
  <el-col
    :span="8"
    v-for="(img, index) in imageList"
    :key="index"
    class="relative"
  >
    <div
      class="image-wrapper relative cursor-pointer rounded-lg overflow-hidden shadow-md"
      :class="{ 'ring-4 ring-violet-500': selectedIndex === index }"
      @click="selectImage(index)"
    >
      <el-image
        :src="img"
        fit="cover"
        style="width: 100%; height: 130px"
        class="rounded-md transition-all duration-300"
      />
      <div
        v-if="selectedIndex === index"
        class="absolute top-1 right-1 bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
      >
        ✔
      </div>
    </div>
  </el-col>
</el-row>

<!-- 上传区域（默认折叠） -->
<div v-if="selectedIndex !== -1" class="upload-avatar-section my-6 flex items-center gap-6">
  <div class="selected-image w-20 h-36 flex items-center justify-center rounded-lg overflow-hidden shadow-md">
    <el-image :src="imageList[selectedIndex]" fit="cover" class="w-full h-full object-cover" />
  </div>
  

  <div class="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md">
    <label class="block text-base font-semibold text-default-200 mb-3">上传脸部照片</label>

    <el-upload
      class="avatar-uploader"
      action="https://peachapi.ctrsai.work/upload/face"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div
        v-if="!imageUrl"
        class="w-28 h-36 flex items-center justify-center border-2 border-dashed border-violet-500 rounded-lg cursor-pointer hover:bg-violet-500/10 transition"
      >
        <el-icon class="text-violet-400 text-3xl"><Plus /></el-icon>
      </div>

      <img
        v-else
        :src="imageUrl"
        class="w-28 h-36 rounded-lg object-cover shadow-md ring-2 ring-violet-400"
      />
    </el-upload>

    <p v-if="imageUrl == ''" class="text-sm text-default-500">支持 JPG/PNG，建议正脸清晰照片，尺寸不超过 5MB</p>
    <button 
      v-if="selectedIndex !== -1"
      @click="resetSelection" 
      class="mt-4 px-4 py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition duration-300"
    >
      重选风格
    </button>
  </div>
</div>

        <!-- 输入信息 -->
        <div class="form-card">
    <h2 class="form-title">注册你的 AI 分身</h2>

    <el-input
      v-model="girlname"
      placeholder="请输入用户名"
      class="custom-input"
      @blur="checkUsername(String(girlname))"
    >
      <template #prepend>
        <el-icon><User /></el-icon>
      </template>
    </el-input>

    <el-input
      v-model="girlpwd"
      placeholder="请输入密码"
      show-password
      class="custom-input"
    >
      <template #prepend>
        <el-icon><Lock /></el-icon>
      </template>
    </el-input>

    <el-input
      v-model="girlconfirmpwd"
      placeholder="请确认密码"
      show-password
      class="custom-input"
    >
      <template #prepend>
        <el-icon><Check /></el-icon>
      </template>
    </el-input>

    <el-input
      v-model="massageprofile"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="介绍一下自己吧~"
      class="custom-input"
    />

    <div class="agreement">
      <el-checkbox v-model="agree">我已阅读并同意《隐私政策》</el-checkbox>
    </div>

    <el-button
      type="primary"
      class="submit-button"
      :disabled="!agree || isDisabled"
      @click="addGirl"
    >
      创建 AI 分身
    </el-button>
  </div>
      </div>
    </div>
  </div>

</template>


<script setup lang="ts">
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref,computed } from 'vue';
const agree = ref(false);
const activeStep = ref(0)

const selectImage = (index: number) => {
  selectedIndex.value = index
  activeStep.value = 1 // 自动切换到下一步
}
const isDisabled = computed(() => {
  return (
    selectedIndex.value === -1 ||
    !imageUrl.value ||
    !girlname.value ||
    !girlpwd.value ||
    girlpwd.value !== girlconfirmpwd.value 
  )
})
import AuthLayout from "@/layouts/AuthLayout.vue";
import LogoBox from "@/components/LogoBox.vue";
const girlname = ref("");
const girlpwd = ref("");
import type { TabsPaneContext } from 'element-plus';
import type { UploadProps } from 'element-plus'
const girlprofile = ref(null);
const girlconfirmpwd = ref(null)
const confirmpassword = ref(null);
const faceData = ref(null);
const girl_id = ref();
const imageUrl = ref('');
const massageprofile = ref();
const imageList = ref([
  'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00101-386925925.png',
  'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00151-593128596.png',
  'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00036-1455662933.png',
])
const selectedIndex = ref(-1);

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
 
 return true
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  console.log(response);
  if(response.success)
{
  faceData.value = response.url;
  console.log(faceData.value)
  ElMessage({
        type: 'success',
        message: '脸部识别成功！',
      })
}
else{
  ElMessage({
        type: 'warning',
        message: '脸部识别失败！',
      })
}
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const SignUp = async () =>{
 const loading = ElLoading.service({
  lock: true,
  text: ' 技师注册中...',
  background: 'rgba(0, 0, 0, 0.7)',
})
  const headers = {
        'Content-Type': 'application/json',
      };

let postData;

  postData = {
        user_name: girlname.value,
        user_password:girlpwd.value,
        user_email_google:null,
        user_profile:'信息待补充',
        user_type:2,
        user_avatar:"生成中",
        user_post:"生成中",
        girl_id:girl_id.value
      };


      try {
        const response = await fetch('https://peachapi.ctrsai.work/login/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
      const res = await response.json();
      console.log(res);
      if(res.success)
    {
      loading.close();
      ElMessage({
        type: 'info',
        message: '注册成功！',
      })
      await faceswap(girl_id.value)
     
    }
    else if(res.code == 201){
      ElMessage({
        type: 'info',
        message: '注册失败！用户名已存在！',
      })
      loading.close();
    }
      } catch (error) {
        console.error('Error fetching data:', error);
        loading.close();
      } 
}

const faceswap = async (girl_id:number) =>{

const loading = ElLoading.service({
lock: true,
text: '创建AI分身中',
background: 'rgba(0, 0, 0, 0.7)',
})

const headers = {
      'Content-Type': 'application/json',
    };
      const postData = {
source_image:imageList.value[selectedIndex.value] ,
face_image:faceData.value ,
"webhook": "https://peachapi.ctrsai.work/avatar/task_callback",
"girl_id":girl_id,
"user_name":girlname.value
          }
 
    try {
      const response = await fetch('https://peachapi.ctrsai.work/avatar/addFaceTask',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
    const res = await response.json();
    console.log(res);
    if(res.success)
  {
    loading.close();
    ElMessage({
      type: 'success',
      message: '人脸检测成功！AI分身创建中，请到个人中心查看！',
    });
    handleSignIn(girlname.value,girlpwd.value)
   

  }
  else{
    ElMessage({
      type: 'warning',
      message: '人脸检测失败！请更换照片或联系客服！',
    })
    loading.close();
  }
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.close();
    } 
}

const addGirl = async () =>{
 const loading = ElLoading.service({
  lock: true,
  text: '注册中...',
  background: 'rgba(0, 0, 0, 0.7)',
})

        const postData = {
        girl_name: girlname.value,
        girl_avatar:null,
        girl_profile:null,
        girl_type:2,
        girl_location:"蜜桃都市",
        girl_prompt:'技师提示词',
        girl_rate:4.0,
        girl_hot:60,
        girl_tags:"['技师']",
        girl_skill:"",
        girl_post:null,
        girl_msg:"待补充",
        girl_role:"技师",
        user_id:0,
        girl_status:0
      };
      try {
        const response = await fetch('https://peachapi.ctrsai.work/girl/addGirl',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
      const res = await response.json();
      console.log(res);
      if(res.success)
    {
      loading.close();
      
      girl_id.value = res.girl_id
     await SignUp();
      //window.location.href = '/user';
    }
    else{
      ElMessage({
        type: 'warning',
        message: 'AI分身注册失败！',
      })
      loading.close();
    }
      } catch (error) {
        console.error('Error fetching data:', error);
        loading.close();
      } 

}

const checkUsername = async (user_name:string) =>{

const headers = {
      'Content-Type': 'application/json',
    };
      const postData = {
      user_name:user_name
    };
    try {
      const response = await fetch('https://peachapi.ctrsai.work/user/userCount',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
    const res = await response.json();
    console.log(res);
    if(res.success)
  {
    ElMessage({
      type: 'warning',
      message: '用户名已存在！',
    })


    
    
    //window.location.href = '/user';
  }
  else{
   
 
  }
    } catch (error) {
      console.error('Error fetching data:', error);

    } 


}

const resetSelection = ()=> {
    selectedIndex.value = -1;  // 重置选择的风格
      // 重置上传的头像
  }

  const handleSignIn = async (username:string,password:string) => {

const loading = ElLoading.service({
 lock: true,
 text: 'Loading',
 background: 'rgba(0, 0, 0, 0.7)',
})
 const headers = {
       'Content-Type': 'application/json',
     };
       const postData = {
       user_name: username,
       user_password:password
     };
     try {
       const response = await fetch('https://peachapi.ctrsai.work/login/user',{
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(postData),
   });
     const res = await response.json();
     if(res.success)
   {
     localStorage.setItem('user', JSON.stringify(res.user[0]));
     localStorage.setItem('username',res.user_name);
     loading.close();
     console.log(res);
     window.location.href = '/user';
   }
   else{
     ElMessage({
       type: 'info',
       message: '用户名或密码错误！',
     })
     loading.close();
   }
     } catch (error) {
       console.error('Error fetching data:', error);
       loading.close();
     } 
}


</script>
<style scoped>

.bg-purple-gradient {
  background: linear-gradient(135deg, #050830 0%, #010516 100%);
}
.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}
.transparent-input .el-input__inner,
.transparent-input .el-textarea__inner {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}
.btn-purple {
  background: linear-gradient(to right, #cc4eb7, #c42cd8);
  padding: 12px 16px;
  border-radius: 8px;
  transition: 0.3s;
}
.btn-purple:hover {
  background: linear-gradient(to right, #9333ea, #6b21a8);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.6);
  transform: translateY(-2px);
}
.avatar-uploader-icon {
  font-size: 32px;
  color: #aaa;
}

.image-wrapper {
  position: relative;
  transition: all 0.3s ease;
}
.image-wrapper:hover {
  transform: scale(1.03);
}

.image-wrapper.selected {
  border: 3px solid #a855f7;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
}

.avatar {
  width: 95px;
  height: 125px;
  object-fit: cover;
  border-radius: 8px;
}
.upload-avatar-section {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
.avatar-uploader .el-upload {
  display: flex;
  justify-content: center;
  align-items: center;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-card {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  padding: 2rem;
  border-radius: 20px;
  max-width: 480px;
  margin: auto;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}
.custom-input {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 0 12px;
  margin-bottom: 1rem;
  color: #fff;
  transition: border 0.3s ease;
}
.custom-input:hover,
.custom-input:focus-within {
  border-color: #c084fc;
  box-shadow: 0 0 6px #c084fc88;
}
.el-input__inner {
  background-color: transparent !important;
  color: #fff;
}

input::placeholder {
  color: black;
}

/* 如果你使用了el-input组件，也可以通过增加类来修改 */
.transparent-input ::placeholder {
  color: black;
}
.agreement {
  margin-bottom: 1rem;
}
.submit-button {
  width: 100%;
  background: #9333ea;
  border: none;
  font-weight: bold;
}
.submit-button:hover {
  background: #7e22ce;
}

@media (max-width: 768px) {
  label {
    font-size: 0.875rem; /* 手机端字体减小 */
  }
}
</style>
