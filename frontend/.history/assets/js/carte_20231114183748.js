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
          // 创建图标元素
          const icon = document.createElement('i')
          icon.className = 'fa-solid fa-seedling'
          icon.style.color = '#35c219'
          tagsDiv.appendChild(icon)
        })
        imageContainer.appendChild(tagsDiv)
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
        sizesDiv.className = 'price-and-icon-container'

        Object.keys(item.sizes).forEach((size) => {
          const sizeDiv = document.createElement('div')
          const icon = document.createElement('i')

          // 根据尺寸返回相应的图标类名
          icon.className = getIconClassNameForSize(size)

          const priceDiv = document.createElement('div')
          priceDiv.className = 'price-container'
          priceDiv.textContent = `$${item.sizes[size].price}`

          sizeDiv.appendChild(icon)
          sizeDiv.appendChild(priceDiv)
          sizesDiv.appendChild(sizeDiv)
        })

        textContainer.appendChild(sizesDiv)
      }

      function getIconClassNameForSize(size) {
        if (size === 'grande') {
          return 'fa-solid fa-circle fa-lg' // 大尺寸图标
        } else if (size === 'petite') {
          return 'fa-solid fa-circle fa-2xs' // 小尺寸图标
        } else {
          return 'fa-solid fa-circle' // 默认图标，您可以根据需要调整
        }
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

      // 添加到购物车按钮
      const addToCartBtn = document.createElement('button')
      addToCartBtn.textContent = 'Add to Cart'
      addToCartBtn.className = 'add-to-cart-btn'
      addToCartBtn.onclick = function () {
        // 这里添加点击按钮时的逻辑，比如添加物品到购物车
        console.log('Added', item.name, 'to cart')
      }
      textContainer.appendChild(addToCartBtn)
    })
}
