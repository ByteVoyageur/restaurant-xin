document
  .getElementById('menuForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = {}
    formData.forEach((value, key) => (data[key] = value))

    document.getElementById('output').textContent = JSON.stringify(
      data,
      null,
      2
    )
  })
