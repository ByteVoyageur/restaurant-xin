import { displayMenuItems } from './displayMenuItems.js'

export function fillMainCategoryDropdown(menuData) {
  const mainCategoryDropdown = document.getElementById('main-category-dropdown')
  const mainCategories = new Set(
    menuData.map((item) => item.baseId.toString().charAt(0))
  )

  mainCategories.forEach((category) => {
    const option = document.createElement('option')
    option.value = category
    option.textContent = `分类 ${category}` // 这里可以根据实际情况调整文本
    mainCategoryDropdown.appendChild(option)
  })

  mainCategoryDropdown.addEventListener('change', (e) => {
    fillSubCategoryDropdown(menuData, e.target.value)
  })
}

export function fillSubCategoryDropdown(menuData, mainCategory) {
  const subCategoryDropdown = document.getElementById('sub-category-dropdown')
  subCategoryDropdown.innerHTML = '<option value="">选择产品</option>'
  subCategoryDropdown.style.display = 'none'

  const filteredItems = menuData.filter(
    (item) => item.baseId.toString().charAt(0) === mainCategory
  )
  const subCategories = new Set(
    filteredItems.map((item) => item.baseId.toString().substr(1, 4))
  )

  subCategories.forEach((subCategory) => {
    const option = document.createElement('option')
    option.value = subCategory
    option.textContent = `产品 ${subCategory}` // 根据实际情况调整
    subCategoryDropdown.appendChild(option)
  })

  if (subCategories.size > 0) {
    subCategoryDropdown.style.display = 'block'
  }

  subCategoryDropdown.addEventListener('change', (e) => {
    const selectedItems = filteredItems.filter(
      (item) => item.baseId.toString().substr(1, 4) === e.target.value
    )
    displayMenuItems(selectedItems, mainCategory)
  })
}
