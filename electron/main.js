const { app, BrowserWindow, screen, ipcMain, dialog, shell, Notification } = require('electron')
const path = require('path')
const Store = require('electron-store')
const request = require('request')
const fs = require('fs')
const fetch = require('node-fetch')
const progress = require('progress-stream')
const { formatDate } = require('./server/utils/common.js')
const { exec } = require('node:child_process')
require('./server/app.js')

// 热加载
// const reloader = require('electron-reloader')
// const { exec } = require('child_process')
// reloader(module)

const NODE_ENV = ''
const store = new Store()

//masterChange
//testBranch
//testBranchg
if (!fs.existsSync(store.get('downPath'))) {
  fs.mkdir('Downloads', (err) => {
    store.set('downPath', path.join(path.resolve(), 'Downloads'))
    if (err) return console.log(err);
  })
}

const listArray = ['downloadingList', 'completedList']
listArray.forEach(item => store.get(item) ? null : store.set(item, []))



let nofi
const createNofi = () => {
  if (Notification.isSupported()) {
    nofi = new Notification({
      title: '下载任务已完成',
      silent: !store.get('playSounds'),
    })
  }
}
const createWindow = () => {
  const size = screen.getPrimaryDisplay().workAreaSize
  const height = parseInt(size.height * 0.77)
  const width = parseInt(height * 1.77)
  const win = new BrowserWindow({
    width,
    height,
    resizable: false,
    show: false,
    frame: false,
    webPreferences: {
      preload: path.resolve(__dirname, './preload.js'),
      //开启渲染进程使用node
      nodeIntegration: true,
      //开启渲染进程remote模块
      enableBlinkFeatures: true,
      contextIsolation: false,
    },
  })

  if (store.get('autoShow')) {
    ipcMain.on('autoShow', () => {
      win.moveTop()
      win.focus()
    })
  }

  // 打开开发工具
  if (NODE_ENV == "development") {
    win.webContents.openDevTools()
  }

  ipcMain.on('showWindow', () => {
    win.webContents.send('winResize', win.getSize())
    win.show()
  })
  ipcMain.on('mini-app', () => {
    win.minimize()
  })
  ipcMain.on('max-app', () => {
    win.maximize()
    win.webContents.send('winResize', win.getSize())
  })
  ipcMain.once('close-app', () => win.close())
  ipcMain.on('normal-app', () => {
    win.unmaximize()
    win.webContents.send('winResize', win.getSize())
  })
  //https://www.bilibili.com/video/BV1md4y1b7km/?spm_id_from=333.851.b_7265636f6d6d656e64.7
  ipcMain.on('changeDownPath', () => {
    dialog.showOpenDialog(win, {
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      if (result.canceled) return;
      let path = result.filePaths[0]
      store.set('downPath', path)
      win.webContents.send('changePath', path)
    }).catch(err => {
      console.log(err)
    })
  })
  ipcMain.on('download', (evt, data) => {
    const itemData = JSON.parse(data)
    const downloadUrl = itemData.downloadUrl
    let downPath = store.get('downPath')
    let fullPath = path.join(downPath, `${itemData.title}.mp4`)
    itemData.fullPath = fullPath
    itemData.percentage = 0
    const headers = {}
    let stream
    let received_bytes
    if (itemData.isContinue) {
      received_bytes = fs.statSync(fullPath).size
      headers['Range'] = 'bytes=' + `${received_bytes}-${itemData.total}`
      // stream = fs.createWriteStream(fullPath,{flags:'a'})
      stream = fs.createWriteStream(fullPath)
    } else {
      stream = fs.createWriteStream(fullPath)
    }
    fetch(downloadUrl).then(res => {
      if (!itemData.isContinue) {
        itemData.total = res.headers.get('content-length')
        itemData.downStatus = true
        const downloadingList = store.get('downloadingList') || []
        downloadingList.push(itemData)
        store.set('downloadingList', downloadingList)
        win.webContents.send('addNewItem')
      }
      const prog = progress({
        length: itemData.total,
        time: 500
      })
      prog.on('progress', (progress) => {
        win.webContents.send('getProgress', {
          percentage: progress.percentage,
          id: itemData.id
        })
      })
      res.body.pipe(prog).pipe(stream)
      ipcMain.on('pauseDown', (evt, id) => {
        if (id === itemData.id) {
          itemData.isPaused = true
          stream.end()
        }
      })
      win.once('close', () => {
        itemData.isPaused = true
        stream.end()
      })
      stream.on('close', () => {
        if (itemData.isPaused) return
        itemData.time = formatDate()
        const completedList = store.get('completedList') || []
        let completedIndex = completedList.push(itemData) - 1
        store.set('completedList', completedList)
        win.webContents.send('downloadOver', itemData.id)
        win.webContents.send('downCompleted', completedIndex)
        if (store.get('downOverDid') || store.get('showTootip')) {
          setTimeout(() => {
            let downlist = store.get('downloadingList').filter(item => item.downStatus)
            if (downlist.length > 0) return
            if (store.get('downOverDid')) {
              store.set('downOverDid', false)
              switch (store.get('actionValue')) {
                case 0:
                  exec('shutdown -s -t 10', (err, stdout, stderr) => {
                    if (err || stderr) console.log('shutdown', err, stderr);
                  })
                  break
                case 1:
                  exec('shutdown -h', (err, stdout, stderr) => {
                    if (err || stderr) console.log('sleep', err, stderr);
                  })
                  break
                case 2:
                  exec('shutdown -r -t 10', (err, stdout, stderr) => {
                    if (err || stderr) console.log('reboot', err, stderr);
                  })
              }
            }
            if (store.get('showTootip')) nofi.show()
          }, 1000)
        }
      })
    })
  })

  ipcMain.on('openFile', (evt, data) => {
    let obj = JSON.parse(data)
    shell.openExternal(obj.path)
  })

  win.loadURL(NODE_ENV === "development" ? 'http://127.0.0.1:5173/' : `file://${path.join(__dirname, '../dist/index.html')}`)

}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.whenReady().then(() => {
  createWindow()
  createNofi()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
