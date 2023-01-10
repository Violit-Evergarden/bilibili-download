<template>
  <Base></Base>
  <div class="btnBox">
    
      <button @click="isModal = true" :class="{ modalNow: isModal }">
         下载中 <span>({{downloadingNum}})</span>
    </button>
    
      <button @click="isModal = false" :class="{ modalNow: !isModal }">
      已完成 <span>({{completedNum}})</span>
    </button>
  </div>
  <keep-alive>
    <component @getListNum="changeNum" :is="isModal?Downloading:Completed"></component>
  </keep-alive>
</template>

<script setup>
import Downloading from './Downloading/index.vue'
import Completed from './Completed/index.vue'
import { ref } from 'vue'
const Store = require('electron-store')
const store = new Store()

const isModal = ref(true)
const downloadingNum = ref(0)
const completedNum = ref(store.get('completedList').length)
function changeNum(data){
  downloadingNum.value = data.downloading || 0
  completedNum.value = data.completed || store.get('completedList').length || 0
}

</script>

<style lang="scss" scoped>
.el-progress__text{
  color: #fff !important;
}
.btnBox {
  position: absolute;
  left: 10%;
  top: 15%;
  .item{
    z-index: 10;
  }
  button {
    width: 120px;
    border-radius: 0;
    -webkit-backdrop-filter: blur(10px) saturate(1.5);
    backdrop-filter: blur(6px) saturate(1.5);
    background-color: rgba(255, 255, 255, 0.25);
    outline: none;
    border: none;
    transition: 0.25s;
    // &:hover{
    //   background-color: rgb(160, 160, 160);
    // }
  }
  .modalNow {
    background-color: rgba(255, 255, 255, 0.856);
  }
}
</style>
