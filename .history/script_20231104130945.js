// 假设这是从 items.json 加载的菜品数据
const dishes = [
  // ... 您之前提供的 JSON 数据
]

// 根据 id 分类菜品
function categorizeDishes(dish) {
  const idPrefix = dish.id.toString()[0]
  switch (idPrefix) {
    case '1':
      return 'entree'
    case '2':
      return 'pate'
    case '3':
      return 'viande'
    case '4':
    case '5':
      return 'pizza'
    default:
      return 'other'
  }
}

// 将菜品添加到页面中
function displayDishes(category = '') {
  const menuItems = document.getElementById('menu-items')
  menuItems.innerHTML = '' // 清空现有的菜品

  dishes
    .filter((dish) => category === '' || categorizeDishes(dish) === category)
    .forEach((dish) => {
      const dishElement = document.createElement('div')
      dishElement.className = 'menu-item'
      dishElement.innerHTML = `
        <h3>${dish.name}</h3>
        <p>${dish.contents}</p>
        <span>Small: ${dish.small_price}</span>
        <span>Large: ${dish.large_price}</span>
      `
      menuItems.appendChild(dishElement)
    })
}

// 为按钮添加事件监听器
document.querySelectorAll('.category-btn').forEach((button) => {
  button.addEventListener('click', function () {
    const category = this.id
    displayDishes(category)
  })
})

// 在页面加载时显示所有菜品
window.addEventListener('DOMContentLoaded', () => displayDishes())
