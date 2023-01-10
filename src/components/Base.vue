<template>
  <div class="cover" :class="{focusCover:focusAn}"></div>
  <img
    :class="{focusImg:focusAn}"
    id="bgImg"
    :src="imgUrl"
    alt=""
  />
  <div class="titleBar">
    <div class="title">
      <img src="../assets/vue.svg" alt="">
      <span>塔塔开-bili-download</span>
    </div>
    <div class="icons">
      <i @click="toMini" class="iconfont icon-zuixiaohua"></i>
      <i v-if="!isMax" @click="toMax" class="iconfont icon-zuidahua"></i>
      <i v-else @click="toNormal" class="iconfont icon-zuidahua1"></i>
      <i @click="toClose" class="iconfont icon-quxiao"></i>
    </div>
  </div>
  <div class="iconBox">
    <el-badge :hidden="isDown" v-if="$route.path!='/download'" is-dot class="item"><i @click="goDownloading" class="iconfont icon-yunduanxiazai"></i></el-badge>
    <router-link to="/home"><i v-if="$route.path!='/home'" class="iconfont icon-zhuye"></i></router-link>
    <router-link to="/setup"><i v-if="$route.path!='/setup'" class="iconfont icon-shezhi"></i></router-link>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { ipcRenderer } from 'electron';
import {useRouter} from 'vue-router'
const path = require('path')

const router = useRouter()

const props = defineProps({
  focusAn:{
    type:Boolean,
    required:false,
    default:false
  },
  isDown:{
    type:Boolean,
    default:true
  }
})
const badgeShow=ref(props.isDown)

let imgName = localStorage.getItem('newImg')?'current.jpg':'defaultImg.jpg'
const imgUrl = new URL(path.join(path.resolve(),`resources/src/assets/${imgName}`), import.meta.url).href+'?'+localStorage.getItem('endArg')
// const imgUrl = new URL(`../assets/${imgName}`, import.meta.url).href+'?'+localStorage.getItem('endArg')
const isMax = ref(false)
function toMini(){
  ipcRenderer.send('mini-app')
}
function toMax(){
  console.log('max');
  ipcRenderer.send('max-app')
  // isMax.value = true
}
function toClose(){
  ipcRenderer.send('close-app')
}
function toNormal(){
  ipcRenderer.send('normal-app')
}
ipcRenderer.on('winResize',()=>isMax.value = !isMax.value)
function goDownloading(){
  router.push('/download')
}

</script>

<style lang="scss" scoped>
.titleBar{
  position: absolute;
  top: 0;
  height: 25px;
  display: flex;
  width: 100%;
  // justify-content: space-between;
  color: rgb(255, 255, 255);
  font-size: 13px;
  background-color: rgba(0, 0, 0, 0.103);
  .title{
    display: flex;
    align-items: center;
    margin-left: 3px;
    -webkit-app-region: drag;
    width: calc(100% - 150px);
    img{
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    span{
      margin-left: 5px;
    }
  }
  .icons{
    display: flex;
    align-items: center;
    i{
      display: block;
      width: 50px;
      cursor: pointer;
      font-size: 18px;
      transition: .25s;
      &:last-child{
        font-size: 14px;
      }
      &:hover{
        background-color: rgb(148, 148, 148);
      }
    }
  }
}
#bgImg {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  transition: 0.25s;
}
.focusImg {
  transform: scale(1.1);
}
.cover {
  
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.5) 100%),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
  transition: 0.25s;
}
.focusCover {
  -webkit-backdrop-filter: blur(10px) saturate(1.5);
  backdrop-filter: blur(6px) saturate(1.5);
}
.iconBox {
  position: absolute;
  top: 10%;
  color: #fff;
  right: 7%;
  i {
    font-size: 26px;
    margin-left: 30px;
    cursor: pointer;
  }
}
</style>