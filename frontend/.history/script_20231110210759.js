console.log('script.js loaded')
import { fetchMenuData } from './assets/js/api.js'
import { displayMenuItems } from './assets/js/carte.js'
import { createCategoryButtons } from './assets/js/buttons.js'

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
