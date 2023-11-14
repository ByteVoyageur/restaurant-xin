const fs = require('fs')

// 读取 JSON 文件
fs.readFile('menu.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  // 解析 JSON 数据
  let jsonData = JSON.parse(data)

  // 处理每个对象：如果有 'sizes' 属性，删除外部的 'img' 属性
  jsonData.forEach((item) => {
    if (item.sizes) {
      delete item.img
    }
  })

  fs.writeFile('updatedData.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err)
    } else {
      console.log('File successfully written.')
    }
  })
})
