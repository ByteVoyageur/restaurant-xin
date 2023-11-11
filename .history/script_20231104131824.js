// 假设这是从 items.json 加载的菜品数据
const dishes = [
  {
    id: 101,
    name: 'Salade verte',
    contents: '',
    small_price: '3,00€',
    large_price: '5,00€',
  },

  {
    id: 112,
    name: 'Salade burrata',
    contents: 'burrata, tomates, basilic, jambon serrano, pesto, roquette',
    small_price: '8,00€',
    large_price: '11,50€',
  },

  {
    id: 201,
    name: 'Tagliatelles carbonara',
    contents: 'champignons, lardons, oignons, crème, oeuf',
    price: '10,50€',
  },

  {
    id: 206,
    name: 'Tagliatelles au saumon fumé',
    contents: '',
    price: '12,00€',
  },
  {
    id: 207,
    name: 'Tagliatelles au pesto et burrata',
    contents: '',
    price: '15,00€',
  },

  {
    id: 301,
    name: 'Poulet au curry',
    contents: '',
    price: '10,50€',
  },
  {
    id: 302,
    name: 'Cuisse de canard confite',
    contents: '',
    price: '12,50€',
  },
  {
    id: 303,
    name: 'Magret de canard',
    contents: '',
    price: '17,50€',
  },

  {
    id: 401,
    name: 'Jambon',
    contents: 'Tomate, jambon, olives, fromage',
    small_price: '9,00€',
    large_price: '11,00€',
  },
  {
    id: 402,
    name: 'Reine',
    contents: 'Tomate, champignons, jambon, fromage',
    small_price: '9,00€',
    large_price: '11,00€',
  },
  {
    id: 403,
    name: 'Romaine',
    contents: 'Tomate, jambon, filet de crème, olives, fromage, oeuf',
    small_price: '9,00€',
    large_price: '11,00€',
  },
  {
    id: 404,
    name: 'Fruits de mer',
    contents: 'Tomate, fruits de mer, fromage, persillade',
    small_price: '9,00€',
    large_price: '11,00€',
  },

  {
    id: 408,
    name: 'Fermière',
    contents: 'Tomate, poulet, champignons, fromage',
    small_price: '9,00€',
    large_price: '11,00€',
  },
  {
    id: 409,
    name: 'Chèvre miel',
    contents: 'Tomate, chèvre, fromage, miel',
    small_price: '9,00€',
    large_price: '11,00€',
  },
  {
    id: 410,
    name: 'Merguez',
    contents: 'Tomate, merguez, fromage',
    small_price: '9,00€',
    large_price: '11,00€',
  },
  {
    id: 411,
    name: 'Chorizo',
    contents: 'Tomate, chorizo, fromage',
    small_price: '9,00€',
    large_price: '11,00€',
  },
  {
    id: 412,
    name: 'Indienne',
    contents: 'Tomate, poulet, curry, oignon, fromage',
    small_price: '9,00€',
    large_price: '11,00€',
  },

  {
    id: 501,
    category: 'Délicieuses',
    name: 'Anchoyade',
    contents: 'Tomate, anchois, olive, fromage',
    small_price: '9,50€',
    large_price: '12,00€',
  },

  {
    id: 521,
    category: 'Gourmandes',
    name: 'Valentina',
    contents: 'Crème fraîche, saumon, épinard, fromage',
    small_price: '11,50€',
    large_price: '14,00€',
  },
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

// 将菜品添加到页面中
function displayDishes(category = '') {
  const menuItems = document.getElementById('menu-items')
  menuItems.innerHTML = '' // 清空现有的菜品

  dishes
    .filter((dish) => category === '' || categorizeDishes(dish) === category)
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
