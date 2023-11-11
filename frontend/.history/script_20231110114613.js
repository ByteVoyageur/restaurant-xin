console.log('script.js loaded')

// 将菜品添加到页面中
function displayDishes(dishes, category = 'all') {
  // ... 原有的 displayDishes 代码 ...
}

// 为按钮添加事件监听器
function addCategoryButtonEventListener(button) {
  console.log(`Adding event listener to button: ${button.id}`)
  button.addEventListener('click', function () {
    fetchMenuData(this.id)
  })
}

// 动态创建分类按钮
function createCategoryButtons(categories) {
  const categoryButtonsDiv = document.querySelector('.category-buttons')
  categoryButtonsDiv.innerHTML = '' // 清空现有的按钮

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.className = 'category-btn'
    button.id = category
    button.textContent = category
    categoryButtonsDiv.appendChild(button)

    // 为新按钮添加事件监听器
    addCategoryButtonEventListener(button)
  })
}

function fetchMenuData(category) {
  fetch('http://15.188.50.31:3000/api/menu')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      if (category === 'all') {
        // 提取所有独特的类别
        const categories = [...new Set(data.map((item) => item.category))]
        createCategoryButtons(categories)
      }
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
