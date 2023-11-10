console.log('script.js loaded')

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
