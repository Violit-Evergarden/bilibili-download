<template>
  <div class="itemList">
    <div class="itemBox" @dblclick="openFile(item.fullPath)" v-for="(item,index) in completedList" :key="index">
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
        <div class="downTime">
          <span>{{item.time}} - 已完成</span>
        </div>
      </div>
      <div class="downIcon">
        <!-- <i @click="reDownload" style="font-size:31px" class="iconfont icon-zhongxinjiazai"></i> -->
        <i @click="deleteHistoryItem(index,item.fullPath)" class="iconfont icon-quxiao"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus';
const emit = defineEmits(['getListNum'])
const Store = require('electron-store')
const store = new Store()
const {ipcRenderer,shell} = require('electron')
const fs = require('fs')

let completedList = reactive(store.get('completedList') || [])

function deleteFile(path){
  fs.unlink(path,err=>{
    if(err) return ElMessage.error(err)
    ElMessage('已删除视频源文件')
  })
}

const deleteHistoryItem= (index,path)=>{
  completedList.splice(index,1)
  store.set('completedList',completedList)
  emit('getListNum',{completed:completedList.length})
  store.get('deleteSource')?deleteFile(path):null
}
ipcRenderer.on('downCompleted',(evt,index)=>{
  let list = store.get('completedList')
  emit('getListNum',{completed:list.length})
  completedList.push(list[index])
})
const openFile = (path)=>{
  shell.openPath(path)
}
</script>

<style lang="scss" scoped>
.itemList {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(20px) saturate(1);
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
  backdrop-filter: blur(100px) saturate(1.5);
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
    .downTime {
      font-size: 12px;
      margin-top: 10px;
      color: #ffffff;
    }
  }
}
</style>
