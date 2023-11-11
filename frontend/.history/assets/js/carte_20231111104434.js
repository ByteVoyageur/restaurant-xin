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

      // 菜品图片
      const img = document.createElement('img')
      img.src = item.img
      img.alt = item.name
      img.className = 'menu-item-image'
      menuItemDiv.appendChild(img)

      // 菜品名称
      const name = document.createElement('h4')
      name.textContent = item.name
      name.className = 'menu-item-name'
      menuItemDiv.appendChild(name)

      // 价格和大小
      if (item.sizes) {
        const sizesDiv = document.createElement('div')
        Object.keys(item.sizes).forEach((size) => {
          const sizeDiv = document.createElement('div')
          sizeDiv.textContent = `${size}: $${item.sizes[size].price}`
          sizesDiv.appendChild(sizeDiv)
        })
        menuItemDiv.appendChild(sizesDiv)
      }

      // 材料（ingredients）
      if (item.ingredients) {
        const ingredients = document.createElement('p')
        ingredients.textContent = `Ingredients: ${item.ingredients.join(', ')}`
        ingredients.className = 'menu-item-ingredients'
        menuItemDiv.appendChild(ingredients)
      }

      // 描述
      const description = document.createElement('p')
      description.textContent = item.description
      description.className = 'menu-item-description'
      menuItemDiv.appendChild(description)

      menuItemsDiv.appendChild(menuItemDiv)
    })
}
