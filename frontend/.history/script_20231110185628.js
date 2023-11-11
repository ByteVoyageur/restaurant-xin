//script.js

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
      // 可能需要处理解析错误，例如清除无效的 localStorage 项
      localStorage.removeItem('menuData')
      return fetchMenuData().then((data) => {
        storeMenuData(data)
        return data
      })
    }
  } else {
    return fetchMenuData().then((data) => {
      storeMenuData(data)
      return data
    })
  }
}

// 根据菜单数据创建分类按钮
function createCategoryButtons(menuData) {
  const categoryButtonsDiv = document.querySelector('.category-buttons')
  categoryButtonsDiv.innerHTML = '' // 清空现有按钮

  const categories = Array.from(new Set(menuData.map((item) => item.category)))

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.textContent = category
    button.classList.add('category-btn')
    button.id = category
    button.addEventListener('click', () => displayMenuItems(menuData, category))
    categoryButtonsDiv.append(button)
  })
}

// 页面加载时获取数据并创建分类按钮
window.addEventListener('DOMContentLoaded', () => {
  loadMenuData().then((menuData) => {
    createCategoryButtons(menuData)
    displayMenuItems(menuData, '所有') // 默认显示所有分类
  })
})
