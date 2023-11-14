//carte.js
console.log('carte.js loaded')
export function displayMenuItems(menuData, category) {
  console.log('menuData', menuData)
  const menuItemsDiv = document.getElementById('menu-items')
  menuItemsDiv.innerHTML = '' // 清空现有菜单项

  menuData
    .filter((item) => item.category === category)
    .forEach((item) => {
      const menuItemDiv = document.createElement('article')
      menuItemDiv.className = 'menu-item'

      // 图片容器
      const imageContainer = document.createElement('div')
      imageContainer.className = 'menu-item-image-container'

      // 菜品图片
      let imgSrc = ''

      // 首先检查是否有 'sizes' 属性
      if (item.sizes) {
        // 尝试获取 'grande' 尺寸图片，如果不存在则使用 'petite' 尺寸图片
        if (item.sizes.grande && item.sizes.grande.img) {
          imgSrc = item.sizes.grande.img
        } else if (item.sizes.petite && item.sizes.petite.img) {
          imgSrc = item.sizes.petite.img
        }
      }
      // 如果没有 'sizes' 但直接在根层级有 'img' 属性
      else if (item.img) {
        imgSrc = item.img
      }

      // 如果找到了图片地址，则创建并添加图片元素
      if (imgSrc) {
        const img = document.createElement('img')
        img.src = imgSrc
        img.alt = item.name
        img.className = 'menu-item-image'
        imageContainer.appendChild(img)
      }

      // 标签（tags）
      if (item.tags && item.tags.length > 0) {
        const tagsDiv = document.createElement('div')
        tagsDiv.className = 'menu-item-tags'
        item.tags.forEach((tag) => {
          const tagDiv = document.createElement('div')
          tagDiv.textContent = tag
          tagDiv.className = 'menu-item-tag'
          tagsDiv.appendChild(tagDiv)
        })
        textContainer.appendChild(tagsDiv)
      }

      menuItemDiv.appendChild(imageContainer)

      // 文本内容容器
      const textContainer = document.createElement('div')
      textContainer.className = 'menu-item-text-container'

      // 菜品名称
      const name = document.createElement('h4')
      name.textContent = item.name
      name.className = 'menu-item-name'
      textContainer.appendChild(name)

      // 价格和大小
      if (item.sizes) {
        const sizesDiv = document.createElement('div')
        Object.keys(item.sizes).forEach((size) => {
          const sizeDiv = document.createElement('div')
          sizeDiv.textContent = `${size}: $${item.sizes[size].price}`
          sizesDiv.appendChild(sizeDiv)
        })
        textContainer.appendChild(sizesDiv)
      }

      // 材料（ingredients）
      if (item.ingredients) {
        const ingredients = document.createElement('p')
        ingredients.textContent = item.ingredients.join(', ')
        ingredients.className = 'menu-item-ingredients'
        textContainer.appendChild(ingredients)
      }

      // 描述
      const description = document.createElement('p')
      description.textContent = item.description
      description.className = 'menu-item-description'
      textContainer.appendChild(description)

      menuItemDiv.appendChild(textContainer)
      menuItemsDiv.appendChild(menuItemDiv)
    })
}
