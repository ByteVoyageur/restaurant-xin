console.log('script.js loaded')

// 根据 id 分类菜品
function categorizeDishes(dish) {
  const idPrefix = dish.id.toString()[0]
  switch (idPrefix) {
    case '1':
      return 'entree'
    case '2':
      return 'dessert'
    case '3':
      return 'plat-chaud'
    case '4':
    case '5':
      return 'pizzas'
    default:
      return 'other'
  }
}

// 将菜品添加到页面中
function displayDishes(dishes, category = 'all') {
  console.log(`Displaying dishes for category: ${category}`)
  const menuItems = document.getElementById('menu-items')
  menuItems.innerHTML = '' // 清空现有的菜品

  menuItems.style.display = 'grid'

  dishes
    .filter((dish) => category === 'all' || categorizeDishes(dish) === category)
    .forEach((dish) => {
      const dishElement = document.createElement('div')
      dishElement.className = 'menu-item'
      // 判断菜品是否有 small_price 和 large_price，如果没有则显示单一的 price
      const priceInfo =
        dish.small_price && dish.large_price
          ? `<span>Small: ${dish.small_price}</span><span>Large: ${dish.large_price}</span>`
          : `<span>Price: ${dish.price}</span>`

      dishElement.innerHTML = `
        <h3>${dish.name}</h3>
        <p>${dish.contents}</p>
        ${priceInfo}
      `

      menuItems.appendChild(dishElement)
    })
}

// 为按钮添加事件监听器
document.querySelectorAll('.category-btn').forEach((button) => {
  console.log(`Adding event listener to button: ${button.id}`)
  button.addEventListener('click', function () {
    fetchMenuData(this.id)
  })
})

function fetchMenuData(category) {
  fetch('http://fangmoi.fun:3000/api/menu')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      displayDishes(data, category)
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      )
    })
}

// 在页面加载时获取菜单数据
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed')
  fetchMenuData('all')
})
