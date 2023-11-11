// api.js
export function fetchMenuData(url, category) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      // 可以在这里过滤或处理数据
      return data.filter(
        (dish) => category === 'all' || dish.category === category
      )
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      )
    })
}
