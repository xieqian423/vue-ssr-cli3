const items = {
  '1': {id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2},
  '2': {id: 2, title: 'iphone 6', price: 10.99, inventory: 10},
  '3': {id: 3, title: 'mi 8', price: 19.99, inventory: 5}
}

function fetchItem (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2})
    }, 1000)
  })
}

// export default {
//   getItem: fetchItem
// }

export var getItem = fetchItem
