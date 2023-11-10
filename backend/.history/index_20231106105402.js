const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(cors()) // 启用CORS
app.use(express.json()) // 中间件，用于解析JSON格式的请求体

// 从frontend文件夹中提供静态文件
app.use(express.static(path.join(__dirname, '..', 'frontend')))

// API接口，返回menu.json文件的内容
app.get('/api/menu', (req, res) => {
  const menuPath = path.join(__dirname, 'menu.json') // 确保这个路径是正确的
  console.log('__dirname is:', __dirname) // 打印当前目录
  console.log('menuPath is:', menuPath) // 打印menu.json的路径
  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the menu file:', err) // 日志记录文件读取错误
      res.status(500).send('读取菜单文件时出错')
      return
    }
    try {
      const menuData = JSON.parse(data) // 尝试解析 JSON 数据
      res.json(menuData)
    } catch (parseErr) {
      console.error('Error parsing the menu file:', parseErr) // 日志记录解析错误
      res.status(500).send('解析菜单文件时出错')
    }
  })
})

// 在这里添加更多的API接口

// 在指定的端口上启动服务器
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`服务器正在端口 ${PORT} 上运行`)
})
