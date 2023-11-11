//script.js

console.log('script.js loaded')
import { fetchMenuData } from './assets/js/api.js'
import { displayMenuItems } from './assets/js/carte.js'

function loadMenuData() {
  return fetchMenuData()
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
