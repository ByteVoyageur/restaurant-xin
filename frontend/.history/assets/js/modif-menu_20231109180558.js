document
document
  .getElementById('menuForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = {}
    formData.forEach((value, key) => (data[key] = value))

    fetch('/api/update-menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error))
  })
