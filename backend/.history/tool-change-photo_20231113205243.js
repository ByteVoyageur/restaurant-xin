const fs = require('fs')
const path = require('path')

// 定义函数来递归遍历目录
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f)
    let isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

// 读取 JSON 文件
let jsonFile = 'path_to_your_json_file.json' // 替换为您的 JSON 文件路径
let jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'))

// 图片目录
let imageDir = 'path_to_your_image_directory' // 替换为您的图片目录路径

// 用于存储图片路径的对象
let imagePaths = {}

// 遍历图片目录
walkDir(imageDir, function (filePath) {
  let imageName = path.basename(filePath).toLowerCase()
  imagePaths[imageName] = filePath
})

// 更新 JSON 文件
jsonData.forEach((item) => {
  Object.keys(imagePaths).forEach((imageName) => {
    // 生成用于比较的名字格式
    let formattedName = item.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/-/g, '')

    // 对比名字，并检查是否包含 'petite' 或 'grande'
    if (imageName.replace(/-/g, '').includes(formattedName)) {
      if (imageName.includes('petite') && item.sizes && item.sizes.petite) {
        item.sizes.petite.img = imagePaths[imageName]
      }
      if (imageName.includes('grande') && item.sizes && item.sizes.grande) {
        item.sizes.grande.img = imagePaths[imageName]
      }
    }
  })
})

// 写回修改后的 JSON
fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2))
