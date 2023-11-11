//scritp.js
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

categories.forEach((category) => {
  const button = document.createElement('button')
  button.textContent = category
  categoryButtonsDiv.append(button)
})

const categoryButtonsDiv = document.querySelector('.category-buttons')
const buttonsTous = document.createElement('button')
buttonsTous.textContent = 'Tous'
categoryButtonsDiv.append(buttonsTous)
