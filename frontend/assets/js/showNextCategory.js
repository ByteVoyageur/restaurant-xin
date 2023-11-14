function initSwipe(menuItemsDiv, showNextCategory, showPreviousCategory) {
  let touchstartX = 0
  let touchendX = 0

  function handleGesture() {
    if (touchendX + 100 < touchstartX) {
      // 向左滑动
      showNextCategory()
    }

    if (touchendX > touchstartX + 100) {
      // 向右滑动
      showPreviousCategory()
    }
  }

  menuItemsDiv.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX
  })

  menuItemsDiv.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX
    handleGesture()
  })
}

export { initSwipe }
