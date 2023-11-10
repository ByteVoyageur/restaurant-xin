//carte.js
function displayMenuItems(menuData, category) {
  const menuItemsDiv = document.getElementById('menu-items')
  menuItemsDiv.innerHTML = '' // 清空现有菜单项

  menuData
    .filter((item) => item.category === category)
    .forEach((item) => {
      const menuItemDiv = document.createElement('div')
      menuItemDiv.className = 'menu-item'

      // 菜品图片
      const img = document.createElement('img')
      img.src = item.img
      img.alt = item.name
      img.className = 'menu-item-image'

      // 菜品名称
      const name = document.createElement('h3')
      name.textContent = item.name
      name.className = 'menu-item-name'

      // 描述和价格
      const description = document.createElement('p')
      description.textContent = item.description
      description.className = 'menu-item-description'

      // 创建大小和价格信息
      const sizesDiv = document.createElement('div')
      Object.keys(item.sizes).forEach((size) => {
        const sizeDiv = document.createElement('div')
        sizeDiv.textContent = `${size}: $${item.sizes[size].price}`
        sizesDiv.appendChild(sizeDiv)
      })

      menuItemDiv.appendChild(img)
      menuItemDiv.appendChild(name)
      menuItemDiv.appendChild(description)
      menuItemDiv.appendChild(sizesDiv)

      menuItemsDiv.appendChild(menuItemDiv)
    })
}
