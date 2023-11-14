// Assuming 'data' is your array of objects
data.forEach((item) => {
  if (item.sizes) {
    delete item.img // Remove the 'img' property outside of 'sizes'
  }
})

// If you need to see the updated array, you can log it to the console
console.log(data)
