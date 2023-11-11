const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const inputFolder = './input' // 替换为你的输入文件夹路径
const outputFolder = './output' // 替换为你的输出文件夹路径
const targetWidth = 300 // 目标图片宽度
const targetHeight = 300 // 目标图片高度

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true })
}

fs.readdirSync(inputFolder).forEach((file) => {
  const inputFile = path.join(inputFolder, file)
  const outputFile = path.join(outputFolder, path.parse(file).name + '.png')

  sharp(inputFile)
    .resize(targetWidth, targetHeight)
    .toFormat('png')
    .toFile(outputFile)
    .then(() => {
      console.log(`${file} has been resized and converted to ${outputFile}`)
    })
    .catch((err) => {
      console.error('Error processing file:', file, err)
    })
})
