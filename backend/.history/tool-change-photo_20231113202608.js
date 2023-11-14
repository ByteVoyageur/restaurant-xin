const fs = require('fs')
const path = require('path')

const jsonFilePath = 'menu.json'
const imagesDirectory = './img'

const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'))

// 递归地遍历文件夹以找到所有图片
const getAllImages = (dirPath, arrayOfImages = []) => {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfImages = getAllImages(dirPath + '/' + file, arrayOfImages)
    } else {
      if (/\.(jpg|jpeg|png|gif)$/.test(file)) {
        arrayOfImages.push(path.join(dirPath, '/', file))
      }
    }
  })

  return arrayOfImages
}

const images = getAllImages(imagesDirectory)

// 函数来处理名称匹配
const normalizeName = (name) => name.toLowerCase().replace(/-/g, '')

// 更新 JSON 文件中的图片链接
jsonData.forEach((item) => {
  const normalizedItemName = normalizeName(item.name)
  const foundImage = images.find((image) => {
    const imageName = path.basename(image).split('.')[0]
    return normalizeName(imageName) === normalizedItemName
  })

  if (foundImage) {
    item.img = foundImage
  }
})

// 写回 JSON 文件
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8')
