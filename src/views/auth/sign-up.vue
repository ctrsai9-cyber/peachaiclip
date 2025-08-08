<template>
  <AuthLayout>
    <div class="backdrop-blur-2xl bg-default-950/40 rounded-2xl overflow-hidden max-w-5xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-10">
        <div class="hidden lg:block ps-4 py-4">
          <div class="relative rounded-xl overflow-hidden h-full w-full">
            <img src="https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/images/White Minimalist Photo Collage.png" alt="" class="w-full h-full transform -scale-x-100">
            <div class="absolute inset-0 bg-default-950/40">
              <div class="flex items-end justify-center h-full">
                <div class="p-6 text-start">
                  <h5 class="text-xl font-bold text-white mb-3">现在注册，开启甜蜜陪伴旅程 <br> 让心动，从第一句“你好”开始!
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col h-full p-10 lg:ps-0">
          <div class="pb-10">
            <LogoBox/>
          </div>
      <div class="pb6 my-auto">
            <h4 class="text-2xl font-bold text-white mb-4">寻找你的AI女友</h4>
            <h5 class="text-xl font-bold text-white mb-4">注册赠送免费积分！</h5>
            <form action="#" class="text-start">
              <div class="mb-4">
                <label for="input-label" class="block text-base/normal font-semibold text-default-200 mb-2">设置用户名</label>
                <input @blur="checkUsername(String(username))" v-model="username" type="text" id="input-label"
                       class="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                       placeholder="请输入用户名">
              </div>

              <div class="mb-4">
                <label for="password"
                       class="block text-base/normal font-semibold text-default-200 mb-2">设置密码</label>
                <input
                    class="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                    type="password" v-model="password"  id="password" placeholder="请输入密码">
              </div>
              <div class="mb-4">
                <label for="password"
                       class="block text-base/normal font-semibold text-default-200 mb-2">确认密码</label>
                <input
                    class="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                    type="password" v-model="confirmpassword"  id="password" placeholder="请再次输入密码">
              </div>

              <div class="mb-6">
                <input type="checkbox"
                       class="h-4 w-4 rounded text-primary border-white/20 bg-white/20 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary/60 focus:ring-offset-0"
                       id="checkbox-signin">
                <label class="ms-2 text-default-200 align-middle" for="checkbox-signin">同意《隐私政策》</label>
              </div>

              <div class="mb-6 text-center">
                <el-button :disabled="isDisabled" @click="addfingerPrints()" color="#626aef">寻找甜心恋人</el-button>
              </div>
              <div class="mb-6 text-center">
                <el-button @click="toSignIn()" color="#626aef">已有账号登录</el-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import LogoBox from "@/components/LogoBox.vue";
import authImg from "@/assets/images/ai/auth-img.jpg"
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
import { ref,onMounted } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import type {User} from '@/types/auth'
import router from '@/router';
import { ElLoading } from 'element-plus';
import { ElMessageBox } from 'element-plus'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
const fingerprint = ref('');
const isDisabled = ref(false);
const imageUrl = ref('');
const massageprofile = ref();
const username = ref(null);
const password = ref(null);
const girlname = ref(null);
const girlpwd = ref(null);
const girlprofile = ref(null);
const girlconfirmpwd = ref(null)
const confirmpassword = ref(null);
const faceData = ref(null);
const girlpost = ref();
onMounted( async () => {
await getFingerprint();

})
const getFingerprint = async () => {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    fingerprint.value = result.visitorId;
    console.log(fingerprint.value)
    
  } catch (e) {
   
    console.error(e);
  }
};

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

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
 
  return true
}

const activeName = ref("usertab");
const active = ref(0);
const girl_id = ref();
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const imageList = ref([
  'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00101-386925925.png',
  'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00151-593128596.png',
  'https://usc1.contabostorage.com/816d9395faf3432e82ecd3d781993259:peachai/sexy/00036-1455662933.png',
])

const selectedIndex = ref(-1);

// 点击选择图片，传递下标
const selectImage = (index:number) => {
  selectedIndex.value = index
  // 可通过事件向父组件传递下标
  // emit('select', index)
}

const SignUp = async (user_type:number) =>{
 const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
})
  const headers = {
        'Content-Type': 'application/json',
      };

let postData;


  postData = {
        user_name: username.value,
        user_password:password.value,
        user_email_google:null,
        user_profile:'信息待补充',
        user_type:user_type,
        user_avatar:'https://storage.googleapis.com/peachai/image/avatar/logo-sm.png',
        user_post:null,
        girl_id:-1,
        user_credit:2
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
      window.location.href = '/auth/sign-in'
     
    }
    else{
      ElMessage({
        type: 'info',
        message: '注册失败！',
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

      isDisabled.value = true
      //window.location.href = '/user';
    }
    else{
     
      isDisabled.value = false
      if(username.value && password.value && confirmpassword.value)
    {
      SignUp(1);
    }
      
    }
      } catch (error) {
        console.error('Error fetching data:', error);

      } 
}

const addfingerPrints = async () =>{

const headers = {
      'Content-Type': 'application/json',
    };
      const postData = {
      user_name:username.value,
      fingerprint_hash:fingerprint.value
    };
    try {
      const response = await fetch('https://peachapi.ctrsai.work/fingerPrints/add',{
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
    if(res.code == 201)
  {
    ElMessage({
       type: 'warning',
       message: '该设备已经注册过！',
     })
  }
  else{

      checkUsername(String(username.value))
  }
    
    //window.location.href = '/user';
  }
  else{

    checkUsername(String(username.value))
  }
    } catch (error) {
      console.error('Error fetching data:', error);

    } 


}

const toSignIn = () =>{

  window.location.href = '/auth/sign-in';
}

const handleSignIn = async (username:string,password:string) => {

if(!username)
{
 ElMessage({
       type: 'info',
       message: '请输入用户名！',
     })

     return null;
}
else if(!password)
{
 ElMessage({
       type: 'info',
       message: '请输入密码！',
     })
     
     return null
}
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

.image-selector {
  padding: 20px;
}

.image-item {
  margin-bottom: 20px;
}

.el-image.selected {
  border: 5px solid #409eff;
  border-radius: 5px;
  box-sizing: border-box;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  align-content: center;
}

.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中（可选） */
  text-align: center;
}



</style>

<style>
.demo-tabs > .el-tabs__content {
  padding: 20px;
  color: #6b778c;
  font-size: 13px;
  font-weight: 600;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  align-content: center;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}

.transparent-input .el-textarea__inner {
  background-color: transparent;
  resize: none;
  color: #333; /* 文本颜色，可根据需要调整 */
  font-size: 14px;
}

.transparent-input .el-textarea__inner::placeholder {
  color: #aaa;
  opacity: 0.7;
}

</style>