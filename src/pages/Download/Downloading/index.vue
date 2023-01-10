<template>
  <div class="itemList" :class="{moreThanThree:downloadingList?.length>3}">
    <div class="itemBox" v-for="(item,index) in downloadingList" :key="index">
    <div class="imgBox">
      <img :src="item.cover" alt="" />
      <span>{{item.duration}}</span>
    </div>
    <div class="textBox">
      <div class="title">{{item.title}}</div>
      <div class="posi">
        <span
          >{{item.fullPath}}</span
        >
      </div>
      <div class="progress">
        下载中...
        <el-progress
          color="#67C23A"
          :percentage="item.percentage"
        ></el-progress>
      </div>
    </div>
    <div class="downIcon">
      <i
        @click="pauseOrContinue(item,index)"
        :class="[item.downStatus ? 'icon-stop' : 'icon-zanting']"
        class="iconfont"
        style="font-size:28px"
      ></i>
      <i @click="cancelDownlaod(item.fullPath,index)" class="iconfont icon-quxiao"></i>
    </div>
  </div>
  </div>
</template>

<script setup>
//https://www.bilibili.com/video/BV1VR4y1C7JQ/?spm_id_from=333.851.b_7265636f6d6d656e64.2
//https://www.bilibili.com/video/BV1Je4y1T7eX/?spm_id_from=333.851.b_7265636f6d6d656e64.3
//https://www.bilibili.com/video/BV1ee411A7uY/?spm_id_from=333.851.b_7265636f6d6d656e64.2
import{reactive, ref} from 'vue'
import {ipcRenderer} from 'electron'
import { ElMessage,ElMessageBox } from 'element-plus';

const emit = defineEmits(['getListNum'])
const Store = require('electron-store')
const store = new Store()
const fs = require('fs')
const downloadingList = reactive(store.get('downloadingList') || [])


emit('getListNum',{downloading:downloadingList?.length || 0})
// store.set('downloadingList',[])
// store.set('completedList',[])

function pauseOrContinue(item,index){
  if(item.downStatus){
    ipcRenderer.send('pauseDown',item.id)
  }else{
    item.isContinue = true
    ipcRenderer.send('download',JSON.stringify(item))
  }
  item.downStatus = !item.downStatus
  store.set('downloadingList',downloadingList)
}

function cancelDownlaod(path,index){
  ElMessageBox.confirm('是否取消该视频的下载？','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    ipcRenderer.send('pauseDown')
    downloadingList.splice(index,1)
    emit('getListNum',{downloading:downloadingList?.length || 0})
    store.set('downloadingList',downloadingList)
    fs.unlink(path,(err)=>console.log(err))
    ElMessage.success('取消成功')
  }).catch(()=>{})
}

ipcRenderer.on('getProgress',(evt,data)=>{
  downloadingList.forEach((item,index) => {
    if (item.id==data.id) item.percentage = Number(data.percentage.toFixed(1))
  });
})
ipcRenderer.on('downloadOver',(evt,id)=>{
  let index = downloadingList.findIndex((item,index)=>{
    return item.id == id
  })
  downloadingList.splice(index,1)
  emit('getListNum',{downloading:downloadingList?.length || 0})
  store.set('downloadingList',downloadingList)
})

</script>

<style lang="scss" scoped>
:deep(.el-progress__text){
  color: #fff ;
}
.moreThanThree{
  backdrop-filter: blur(20px) saturate(1);
}
.itemList {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 60%;
  padding: 24px;
  overflow: auto;
}
.itemBox {
  display: flex;
  width: 90%;
  margin: auto;
  height: 95px;
  background-color: #2222225d;
  backdrop-filter: blur(20px) saturate(1.5);
  padding: 16px;
  border-radius: 20px;
  margin-top: 10px;
  .imgBox {
    position: relative;
    img {
      width: 160px;
      height: 95px;
      object-fit: cover;
      border-radius: 10px;
    }
    span {
      position: absolute;
      bottom: 3px;
      right: 8px;
      color: #fff;
      font-size: 14px;
    }
  }
  .downIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    i {
      display: block;
      font-size: 24px;
      width: 25px;
      height: 25px;
      color: white;
      cursor: pointer;
      margin-left: 20px;
    }
  }
  .textBox {
    flex: 1;
    width: 40%;
    text-align: left;
    margin-left: 24px;
    .title {
      font-size: 15px;
      color: #fff;
      margin-top: 10px;
    }
    .posi {
      font-size: 10px;
      color: #e7e7e7;
      margin-top: 6px;
      display: flex;
      align-items: center;
      span{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .progress {
      font-size: 10px;
      color: #ffffff;
      margin-top: 0px;
      width: 80%;
    }
  }
}
</style>
