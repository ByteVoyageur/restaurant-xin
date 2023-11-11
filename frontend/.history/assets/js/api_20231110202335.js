// api.js
const apiURL = 'http://15.188.50.31:3000/api'

export function fetchMenuData() {
  return fetch(`${apiURL}/menu`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })

    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      )
    })
}
