<template>
  <Base :key="imgKey"></Base>
  <div class="setupBox">
    <div class="block">
      <div class="title">常规</div>
      <div class="check">
        <div class="switch">
          <el-switch
            v-model="switchList.normal.value1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="keepInHome"
          >
          </el-switch>
          <span>建立任务后，继续停留在首页</span>
        </div>
        <div class="switch">
          <el-switch
            v-model="switchList.normal.value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="deleteSource"
          >
          </el-switch>
          <span>删除下载记录时，删除对应源文件</span>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="block">
      <div class="title">监控</div>
      <div class="check">
        <div class="switch">
          <el-switch
            v-model="switchList.monitor.value1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="spyClickBorad"
          >
          </el-switch>
          <span>监控剪切版</span>
        </div>
        <div class="switch">
          <el-switch
            v-model="switchList.monitor.value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="autoShow"
          >
          </el-switch>
          <span>检测到视频地址后自动弹出</span>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="block">
      <div class="title">下载</div>
      <div class="check">
        <div class="switch">
          <el-switch
            v-model="switchList.download.value1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="limitDownSpeed"
            disabled
          >
          </el-switch>
          <span>限制下载速度</span>
          <span v-if="switchList.download.value1"
            ><el-input placeholder="请输入内容" v-model="downSpeed"></el-input>
            KB/S</span
          >
        </div>
        <div class="switch">
          <el-switch
            v-model="switchList.download.value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="downBarrage"
          >
          </el-switch>
          <span>视频下载完成后，自动下载弹幕文件</span>
        </div>
        <div class="switch">
          <el-switch
            v-model="switchList.download.value3"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="downOverDid"
          >
          </el-switch>
          <span>当下载结束后执行（仅限本次有效）</span>
          <div v-if="switchList.download.value3" class="action">
            <span>你要电脑执行什么操作：</span>
            <el-select v-model="actionValue" placeholder="请选择">
              <el-option
                v-for="item in actionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="switch">
          <div class="action" style="margin-top: 8px">
            <span>同时下载最大任务数量：</span>
            <el-select v-model="downNumValue" placeholder="请选择">
              <el-option
                v-for="item in downNumOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="downPosi">
          <el-button type="primary" @click="setupDownloadPath">设置下载文件夹</el-button>
          <span>{{downPath}}</span>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="block">
      <div class="title">提示</div>
      <div class="check">
        <div class="switch">
          <el-switch
            v-model="switchList.prompt.value1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="showTootip"
          >
          </el-switch>
          <span>下载完成后，弹出提示框</span>
        </div>
        <div class="switch">
          <el-switch
            v-model="switchList.prompt.value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="playSounds"
          >
          </el-switch>
          <span>下载完成后，播放提示音</span>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="block">
      <div class="title">高级功能</div>
      <div class="check">
        <div class="downPosi">
          <label id="bgBtn" for="fileInp">自定义背景图</label>
          <input
            @change="selectImg"
            type="file"
            style="display: none"
            id="fileInp"
          />
          <el-button @click="deleteCurrentImg" type="primary"
            >删除自定义图片</el-button
          >
        </div>
        <div class="switch">
          <el-switch
            v-model="switchList.adfunc.value4"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="createQuickPath"
          >
          </el-switch>
          <span>在桌面创建快捷方式</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive,watch } from 'vue'
import { ElMessage } from 'element-plus'
import { ipcRenderer } from 'electron';
import Store from 'electron-store'
const store = new Store()
const fs  = require('fs')
const path = require('path')
const downPath = ref(store.get('downPath'))


const deleteSource = nval=>store.set('deleteSource',nval)
const keepInHome = nval=>store.set('keepInHome',nval)
const spyClickBorad = nval =>store.set('spyClickBorad',nval)
const autoShow = nval=>store.set('autoShow',nval)
const limitDownSpeed = nval=>store.set('limitDownSpeed',nval)
const downBarrage =nval =>store.set('downBarrage',nval)
const downOverDid = nval =>store.set('downOverDid',nval)
const showTootip = nval =>store.set('showTootip',nval)
const playSounds = nval =>store.set('playSounds',nval)
const createQuickPath = nval =>store.set('createQuickPath',nval)
// store.set('deleteSource',false)
// store.set('keepInHome',true)
// store.set('spyClickBorad',true)
// store.set('autoShow',true)
// store.set('limitDownSpeed',false)
// store.set('downBarrage',false)
// store.set('downOverDid',false)
// store.set('showTootip',true)
// store.set('playSounds',true)
// store.set('createQuickPath',true)
// store.set('downNumValue',3)
// store.set('actionValue',0)
// store.set('downPath',path.join(path.resolve(),'Downloads'))

const switchList = reactive({
  normal: {
    value1: store.get('keepInHome'),
    value2: store.get('deleteSource')
  },
  monitor: {
    value1: store.get('spyClickBorad'),
    value2: store.get('autoShow')
  },
  download: {
    value1: store.get('limitDownSpeed'),
    value2: store.get('downBarrage'),
    value3: store.get('downOverDid')
  },
  prompt: {
    value1: store.get('showTootip'),
    value2: store.get('playSounds')
  },
  adfunc: {
    value1: true,
    value2: true,
    value3: true,
    value4: store.get('createQuickPath')
  }
})

const downSpeed = ref(9999)

const actionOptions = reactive([
  {
    value: 1,
    label: '睡眠'
  },
  {
    value: 0,
    label: '关机'
  },
  {
    value: 2,
    label: '重启'
  }
])
const actionValue = ref(store.get('actionValue'))

const downNumOptions = reactive([
  {
    value:1,
    label:1
  },
  {
    value:2,
    label:2
  },
  {
    value:3,
    label:3
  },
  {
    value:4,
    label:4
  }
])
const downNumValue = ref(store.get('downNumValue'))
watch(downNumValue,(nval,oval)=>store.set('downNumValue',nval))
watch(actionValue,nval=>store.set('actionValue',nval))

const imgKey = ref(0)

function setupDownloadPath(){
  ipcRenderer.send('changeDownPath')
  downPath.value = store.get('downPath')
}
ipcRenderer.on('changePath',(evt,data)=>{
  downPath.value = data
})

function selectImg(e) {
  let file = e.target.files[0]
  let type = file.type.split('/')[0]
  if (type !== 'image') {
    ElMessage.error('请选择图片类型文件！')
  } else {
    fs.writeFile(`./resources/src/assets/current.jpg`,fs.readFileSync(file.path),(err) => {
        if (err) {
          console.log(err);
          ElMessage.error(err)
        } else {
          localStorage.setItem('newImg',true)
          localStorage.setItem('endArg',file.name)
          imgKey.value++
        }
      }
    )
  }
}
function deleteCurrentImg() {
    fs.unlink(`./resources/src/assets/current.jpg`,(err)=>{
      if(err) return ElMessage.error('不存在自定义背景！')
      localStorage.removeItem('newImg')
      localStorage.removeItem('endArg')
      imgKey.value++
  })
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  width: calc(100% - 100px);
}
.el-input {
  width: 70px;
  color: aqua;
}
:deep(.el-input__inner) {
  height: 25px;
  line-height: 25px;
}
.el-select {
  width: 80px;
}
.setupBox {
  width: 90%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  overflow: auto;
  // backdrop-filter: blur(10px) saturate(1);
  .block {
    text-align: left;
    color: #fff;
    #bgBtn {
      display: inline-block;
      vertical-align: top;
      width: 130px;
      height: 32px;
      background-color: #409eff;
      cursor: pointer;
      transition: 0.1s;
      font-weight: 500;
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      border-radius: 4px;
      margin-right: 12px;
      &:hover {
        background-color: #79bbff;
      }
    }
    .title {
      font-size: larger;
    }
    .check {
      margin-left: 130px;
      font-size: 16px;
      span {
        margin-left: 15px;
      }
      .inp {
        display: inline-block;
        height: 20px;
      }
    }
  }
}
</style>
