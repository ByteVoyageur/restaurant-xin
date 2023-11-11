// 根据菜单数据创建分类按钮
export function createCategoryButtons(menuData) {
  const categoryButtonsDiv = document.querySelector('.category-buttons')
  categoryButtonsDiv.innerHTML = '' // 清空现有按钮

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
    if (menuData && !menuData.error) {
      // 取第一个分类作为默认显示，或者显示所有分类，这里取决于你的应用逻辑
      const defaultCategory =
        menuData.length > 0 ? menuData[0].category : '所有'
      displayMenuItems(menuData, defaultCategory)
    }
  })
})
