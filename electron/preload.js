const {ipcRenderer,remote}  = require('electron')
const fs = require('fs')
const path = require('path')
const Store = require('electron-store')

// const store = new Store()


// contextBridge.exposeInMainWorld('nodeApi',{
//   fs,
//   path,
//   __dirname,
 
// })

// contextBridge.exposeInMainWorld('electronApi',{
//   ipcRenderer:{
//     ...ipcRenderer,
//     on: ipcRenderer.on
//   },
//   Store
// })

// exports.requesetForData=async url=>{
//   await request.get(url,(err,res,body)=>{
//     if(!error && response.statusCode == 200){
//       return body
//     }else{
//       ElMessage.error('Error:获取视频信息失败！')
//     }
//   })
//   console.log(result)
// }