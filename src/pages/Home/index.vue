dDd<template>
  <Base :focusAn="focusAn" :isDown="isDownloading"></Base>
  <div class="inp">
    <input
      v-model="url"
      @keyup.enter="getVideoInfo(url)"
      @focus="getFocus"
      @blur="getValid"
      ref="inpVal"
      onfocus="this.placeholder=''"
      onblur="this.placeholder='视频地址、BV号'"
      type="text"
      placeholder="视频地址、BV号"
      spellcheck="false"
      autocomplete="off"
    />
    <i
      @mousedown="getVideoInfo"
      :class="{ focusI: focusAn }"
      class="iconfont icon-jiantou_xiangyou"
    ></i>
  </div>
  <transition
    name="animate__animated animate__backInUp"
    enter-active-class="animate__zoomIn"
    leave-active-class="animate__backOutDown"
  >
    <div v-if="isItem" class="itemBox">
      <div class="imgBox">
        <img :src="convertProxy(curData.cover)" alt="封面" />
        <!-- <img src="../../assets/album6.jpg" alt="封面" />  -->
        <span>{{ convertVideoTime(curData.long) }}</span>
      </div>
      <div class="textBox">
        <div class="title">{{ curData.title }}</div>
        <div class="intro">{{ curData.evaluate }}</div>
        <div class="up">
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4.41663 4.93726C4.72729 4.93726 4.97913 5.1891 4.97913 5.49976V8.62476C4.97913 9.34963 5.56675 9.93726 6.29163 9.93726C7.0165 9.93726 7.60413 9.34963 7.60413 8.62476V5.49976C7.60413 5.1891 7.85597 4.93726 8.16663 4.93726C8.47729 4.93726 8.72913 5.1891 8.72913 5.49976V8.62476C8.72913 9.97095 7.63782 11.0623 6.29163 11.0623C4.94543 11.0623 3.85413 9.97095 3.85413 8.62476V5.49976C3.85413 5.1891 4.10597 4.93726 4.41663 4.93726ZM10.2501 4.93726C9.9394 4.93726 9.68756 5.1891 9.68756 5.49976V10.4998C9.68756 10.8104 9.9394 11.0623 10.2501 11.0623C10.5607 11.0623 10.8126 10.8104 10.8126 10.4998V9.60392H12.2292C13.5179 9.60392 14.5626 8.55925 14.5626 7.27059C14.5626 5.98193 13.5179 4.93726 12.2292 4.93726H10.2501ZM12.2292 8.47892H10.8126V6.06226H12.2292C12.8966 6.06226 13.4376 6.60325 13.4376 7.27059C13.4376 7.93793 12.8966 8.47892 12.2292 8.47892Z"
            ></path>
          </svg>
          <img :src="convertProxy(curData.upFace)" alt="" class="avator" />
          <span>{{ curData.up }}</span
          ><span class="pubTime"
            >{{ curData.view }}·{{ convertDate(curData.pubTime) }}</span
          >
        </div>
      </div>
      <div class="downIcon">
        <el-select v-model="qualityValue" placeholder="请选择">
          <el-option
            v-for="item in supportFormats"
            :key="item.quality"
            :label="item.new_description + '/' + item.size + 'M'"
            :value="item.quality"
            :disabled="item.quality > 16"
          >
          </el-option>
        </el-select>
        <i @click="download" class="iconfont icon-xiazai"></i>
      </div>
    </div>
  </transition>
  <div class="gushiBox" :style="{ opacity: focusAn && !isItem ? 1 : 0 }">
    <div class="content">「 {{ guShiData.content }} 」</div>
    <div class="origin">—— {{ guShiData.origin }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { ipcRenderer, clipboard } from "electron";
import { useRouter } from "vue-router";
import axios from "axios";
const nodeFetch = require("node-fetch");
const fs = require("fs");
const request = require("request");

const router = useRouter();
const Store = require("electron-store");
const store = new Store();

const guShiData = reactive({});
axios.get("https://v1.jinrishici.com/all.json").then((res) => {
  guShiData.content = res.data.content;
  guShiData.origin = res.data.origin;
});

const focusAn = ref(false);
function getFocus() {
  focusAn.value = true;
}
function getValid() {
  focusAn.value = false;
}

const isItem = ref(false);
const url = ref("");

let timer;
const inpVal = ref(null);
const spyClipBoard = () => {
  let urlStr = null;
  timer = setInterval(() => {
    const text = clipboard.readText();
    if (
      (text.match("video/(.*?)/") || text.startsWith("BV" || "bv")) &&
      urlStr !== text
    ) {
      if (store.get("spyClickBorad")) {
        url.value = text;
        inpVal.value.focus();
        urlStr = text;
      }
      if (store.get("autoShow")) ipcRenderer.send("autoShow");
    }
  }, 1000);
};
store.get("spyClickBorad") || store.get("autoShow") ? spyClipBoard() : null;
onUnmounted(() => {
  clearTimeout(timer);
  timer = null;
});

ipcRenderer.on("getInpUrl", (evt, text) => {
  url.value = text;
  document.getElementById("inpVal").focus();
});

async function getVideoInfo() {
  const inpStr = url.value;
  url.value = "";
  const bv = inpStr.startsWith("BV" || "bv") ? inpStr : getBv(inpStr);
  if (!bv) return ElMessage.error("请输入BV号或视频播放地址！");
  const infoUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bv}`;
  await getData(infoUrl);
  await getUpInfo(ids.mid);
  await getFormats(ids.cid, ids.aid);
  isItem.value = true;
}
function getBv(url) {
  const ex = "video/(.*?)/";
  return url.match(ex) ? url.match(ex)[1] : null;
}

let listData = {};
const curData = reactive({});
const ids = reactive({});
const stat = reactive({});
const upData = reactive({});
let supportFormats = reactive([]);
// 转换代理url
const convertProxy = (url) =>
  `http://localhost:3002/proxy?url=${encodeURIComponent(url)}`;
const downVideoProxy = (url, quality) =>
  `http://localhost:3002/api/download?url=${encodeURIComponent(url)}&bvid=${
    ids.bvid
  }&params=${encodeURIComponent(
    `avid=${ids.aid}&cid=${ids.cid}&otype=json&qn=${quality}&fnval=0`
  )}`;
//'https://api.bilibili.com/x/player/playurl?avid=%s&cid=%s&qn=%s&type=&otype=json&fnver=0&fnval=16&fourk=1' % (avid, cid, qn)
//获取视频信息
function getData(url) {
  supportFormats = reactive([]);
  return new Promise((resolve) => {
    fetch(convertProxy(url)).then(async (res) => {
      const resJson = await res.json();
      listData = resJson.data;
      curData.cover = resJson.data.pic;
      curData.view = resJson.data.stat.view;
      curData.title = resJson.data.title;
      curData.pubTime = resJson.data.ctime;
      curData.evaluate = resJson.data.desc;
      curData.up = resJson.data.owner.name;
      curData.long = resJson.data.pages[0].duration;
      curData.upFace = resJson.data.owner.face;

      ids.aid = resJson.data.aid;
      ids.bvid = resJson.data.bvid;
      ids.cid = resJson.data.cid;
      ids.mid = resJson.data.owner.mid;

      stat.like = resJson.data.stat.like;
      curData.view = `已观看${resJson.data.stat.view}次`;
      stat.coin = resJson.data.stat.coin;
      stat.follow = resJson.data.stat.favorite;
      stat.share = resJson.data.stat.share;

      getDM();
      resolve();
    });
  });
}
// 获取up主信息
function getUpInfo(mid) {
  fetch(
    convertProxy(
      `https://api.bilibili.com/x/space/acc/info?mid=${mid}&jsonp=jsonp`
    )
  ).then(async (res) => {
    const resJson = await res.json();
    upData.face = resJson.data.face;
    upData.sign = resJson.data.sign;
    upData.name = resJson.data.name;
  });
}
// 获取视频支持格式
function getFormats(cid, avid) {
  const url = "https://api.bilibili.com/x/player/playurl";
  fetch(convertProxy(`${url}?fnval=80&cid=${cid}&avid=${avid}`)).then(
    async (res) => {
      const resJson = await res.json();
      const data = resJson.data || resJson.result;
      supportFormats.push(...data.support_formats); // 没有获得cookie只能下载720
      getVideoSize(avid, cid);
    }
  );
}
// 获取文件大小
function getVideoSize(avid, cid) {
  supportFormats.forEach((sf) => {
    const url = "https://api.bilibili.com/x/player/playurl";
    fetch(
      convertProxy(
        `${url}?avid=${avid}&cid=${cid}&otype=json&qn=${sf.quality}&fnval=0`
      )
    ).then(async (res) => {
      const resJson = await res.json();
      const data = resJson.data || resJson.result;
      sf.size = (data.durl[0].size / 1024 / 1024).toFixed(1);
    });
  });
}
//格式化时间(发布)
function convertDate(date) {
  const recordDate = new Date(date * 1000);
  const year = recordDate.getFullYear();
  const month = recordDate.getMonth() + 1;
  const day = recordDate.getDate();
  const hours = recordDate.getHours();
  const minutes = recordDate.getMinutes();
  return `${year}年${month}月${day}日 ${
    hours.toString().length === 1 ? "0" + hours : hours
  }:${minutes.toString().length === 1 ? "0" + minutes : minutes}`;
}
//格式化时间（视频时长）
function convertVideoTime(se) {
  let second = se % 60;
  let term = parseInt(se / 60);
  let minute = term >= 60 ? term - 60 : term;
  let hours = parseInt(se / 3600) > 0 ? parseInt(se / 3600) : "";
  let timeStr = hours
    ? autoLength(hours) + ":" + autoLength(minute) + ":" + autoLength(second)
    : autoLength(minute) + ":" + autoLength(second);
  return timeStr;
}
function autoLength(num) {
  return num.toString().length === 1 ? "0" + num : num;
}
function formatFileName(str) {
  const list = ["\\", "/", ":", "*", "?", '"', "<", ">", "|", " ", "：", "？"];
  let newStr = str;
  list.forEach((item) => {
    newStr = newStr.replaceAll(item, "");
  });
  return newStr;
}

// const logPro = (reader)=>{
//     return reader.read().then(({value,done})=>{
//       if(done){
//         console.log('complete')
//         return
//       }
//       console.log(value);
//       return logPro(reader)
//     })
//   }
//下载弹幕
function getDM() {
  let url = `https://api.bilibili.com/x/v1/dm/list.so?oid=${ids.cid}`;
  let fullPath =
    store.get("downPath") + "\\" + formatFileName(curData.title) + ".txt";
  const writer = fs.createWriteStream(fullPath);
  nodeFetch(url).then(async (res) => {
    await res.body.pipe(writer);
    // const out = fs.createWriteStream(fullPath)
    // const reader = fs.createReadStream(fullPath)
    // reader.on('data',data=>{
    //   let text = data.toString().match(/<[a-zA-Z]+.*?>([\\s\\S]*?)<\/[a-zA-Z]*?>/g)
    //   console.log(text)
    // })
    // reader.on('end',()=>out.end())
  });
}
// 下载视频
const qualityValue = ref(16);
const isDownloading = ref(true);
function download() {
  let downloadingList = store
    .get("downloadingList")
    .filter((item) => item.downStatus);
  if (downloadingList.length === store.get("downNumValue"))
    return ElMessage.warning(
      `同时下载任务数量不能超过${store.get("downNumValue")}个`
    );
  const url = "https://api.bilibili.com/x/player/playurl";
  const downloadUrl = downVideoProxy(url, qualityValue.value);
  ipcRenderer.send(
    "download",
    JSON.stringify({
      downloadUrl,
      id: ids.aid,
      cover: convertProxy(curData.cover),
      title: formatFileName(curData.title),
      duration: convertVideoTime(curData.long),
    })
  );
  isDownloading.value = false;
  isItem.value = false;
  ElMessage("正在下载...");
  store.get("downBarrage") ? getDM() : null;
  ipcRenderer.on("addNewItem", () => {
    store.get("keepInHome") ? null : router.push("/download");
  });
}
</script>

<style scoped lang="scss">
.el-select {
  width: 160px;
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
.gushiBox {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 13px;
  width: 35%;
  height: 53px;
  transition: 0.25s;
  padding: 16px;
  border-radius: 10px;
  &:hover {
    background-color: #9499a05d;
    backdrop-filter: blur(10px) saturate(1.5);
    .origin {
      opacity: 1;
    }
  }
  .origin {
    margin-top: 5px;
    transition: 0.25s;
    opacity: 0;
  }
}
.inp {
  position: absolute;
  display: flex;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 80%;
  overflow: hidden;
  border-radius: 30px;
  input {
    display: block;
    outline: 0;
    width: 230px;
    height: 43px;
    border: none;
    padding: 0 50px 0 20px;
    color: inherit;
    background-color: transparent;
    font-size: 14px;
    text-align: center;
    border-radius: 30px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
    -webkit-backdrop-filter: blur(10px) saturate(1.5);
    backdrop-filter: blur(10px) saturate(1.5);
    transition: color 0.25s, background-color 0.25s, box-shadow 0.25s,
      left 0.25s, opacity 0.25s, top 0.25s, width 0.25s;
    &:hover {
      color: black;
      background-color: rgba(255, 255, 255, 0.6);
      box-shadow: rgb(0 0 0 / 30%) 0 0 10px;
      width: 530px;
    }
    &:focus {
      color: black;
      box-shadow: rgb(0 0 0 / 30%) 0 0 10px;
      width: 530px;
      background-color: rgb(255, 255, 255, 0.9);
    }
    &::-webkit-input-placeholder {
      color: #fff;
    }
    &:hover::-webkit-input-placeholder {
      color: rgb(59, 59, 59);
    }
  }
  i {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    text-align: center;
    line-height: 37px;
    margin-top: 3px;
    position: absolute;
    right: 5px;
    display: none;
    cursor: pointer;
    color: rgb(11, 134, 235);
    font-size: 24px;
  }
  i:hover {
    background-color: rgb(255, 255, 255);
  }
  .focusI {
    display: block;
  }
}
#cover {
  min-width: 1100px;
  min-height: 650px;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.5) 100%),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
  transition: 0.25s;
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
.itemBox {
  position: absolute;
  bottom: 20%;
  display: flex;
  width: 70%;
  height: 95px;
  left: 15%;
  -webkit-backdrop-filter: blur(10px) saturate(1.5);
  backdrop-filter: blur(60px) saturate(2);
  padding: 16px;
  border-radius: 20px;
  animation-duration: 0.6s;
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
    i {
      display: block;
      font-size: 24px;
      width: 25px;
      height: 25px;
      color: white;
      cursor: pointer;
      margin-left: 30px;
    }
  }
  .textBox {
    flex: 1;
    width: 40%;
    min-width: 320px;
    text-align: left;
    margin-left: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 15px;
      color: #fff;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      // margin-top: 10px;
    }
    .intro {
      overflow: hidden;
      font-size: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgb(168, 168, 168);
      // margin-top: 10px;
    }
    .up {
      font-size: 13px;
      color: #9499a0;
      // margin-top: 10px;
      display: flex;
      align-items: center;
      svg {
        margin-right: 7px;
      }
      .avator {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        margin-right: 4px;
      }
      .pubTime {
        font-size: 11px;
        margin-left: 13px;
      }
    }
  }
}
</style>
