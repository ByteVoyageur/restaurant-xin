console.log('script.js loaded')
import { fetchMenuData } from './assets/js/api.js'

function storeMenuData(data) {
  localStorage.setItem('menuData', JSON.stringify(data))
}

function loadMenuData() {
  const storedMenuData = localStorage.getItem('menuData')
  if (storedMenuData) {
    return Promise.resolve(JSON.parse(storedMenuData))
  } else {
    return fetchMenuData('all').then((data) => {
      storeMenuData(data)
      return data
    })
  }
}

function displayMenuData(data) {
  const menuList = document.querySelector('#menu-items')
  menuList.innerHTML = ''
  data.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.innerHTML = `${item.name} - ${item.price}`
    menuList.appendChild(listItem)
  })
}
