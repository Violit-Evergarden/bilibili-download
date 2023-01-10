<template>
  <div class="container" :style="boxStyle">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { reactive,onMounted } from 'vue'
import { ipcRenderer } from 'electron';

onMounted(()=>ipcRenderer.send('showWindow'))
const boxStyle = reactive({
  width:'',
  height: ''
})

ipcRenderer.on('winResize',(event,data)=>{
  boxStyle.width = data[0]+'px'
  boxStyle.height = data[1]+'px'
})
</script>

<style lang="scss">
* {
  margin: 0;
}
#app{
  padding: 0 !important;
  max-width: none !important;
  user-select: none;
}
a {
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
}
button{
  outline: none;
}
.container {
  position: relative;

  overflow: hidden;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  /* height:16px; */
  /* background-color:#444444; */
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(51, 48, 48, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  box-shadow: inset 0 0 6px rgba(153, 153, 153, 0.3);
  background-color: rgb(94, 94, 94);
}
</style>
