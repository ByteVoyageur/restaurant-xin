console.log('script.js loaded')
import { fetchMenuData } from './assets/js/api.js'
import { displayMenuItems } from './assets/js/carte.js'

// 从本地存储或服务器加载菜单数据
function loadMenuData() {
  const storedMenuData = localStorage.getItem('menuData')
  if (storedMenuData) {
    try {
      const data = JSON.parse(storedMenuData)
      return Promise.resolve(data)
    } catch (e) {
      console.error('Error parsing JSON from localStorage:', e)
      localStorage.removeItem('menuData')
      // 重新从服务器获取数据
      return fetchMenuData()
    }
  } else {
    return fetchMenuData()
  }
}

function storeMenuData(data) {
  if (data && !data.error) {
    localStorage.setItem('menuData', JSON.stringify(data))
  }
}

// 根据菜单数据创建分类按钮
function createCategoryButtons(menuData) {
  const categoryButtonsDiv = document.querySelector('.category-buttons')
  categoryButtonsDiv.innerHTML = '' // 清空现有按钮
  categoryButtonsDiv.className = 'btn-group'

  if (!menuData || menuData.error) {
    // 处理错误或空数据
    console.error(
      'Error loading menu data:',
      menuData.message || 'Unknown error'
    )
    categoryButtonsDiv.innerHTML = '<p>Error loading menu data.</p>'
    return
  }

  const categories = Array.from(new Set(menuData.map((item) => item.category)))

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.textContent = category
    button.classList.add('category-btn', 'btn', 'btn-primary', 'm-1')
    button.id = category
    button.addEventListener('click', (event) => {
      displayMenuItems(menuData, category)
      document.querySelectorAll('.category-buttons .btn').forEach((btn) => {
        btn.classList.remove('active')
      })
      event.currentTarget.classList.add('active')
    })
    categoryButtonsDiv.append(button)
  })
}

// 页面加载时获取数据并创建分类按钮
window.addEventListener('DOMContentLoaded', () => {
  loadMenuData().then((menuData) => {
    createCategoryButtons(menuData)
    if (menuData && !menuData.error) {
      // 不自动显示任何类别的菜单项
      // 可以在这里设置任何默认的欢迎信息或者说明
    }
  })
})