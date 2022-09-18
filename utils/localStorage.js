export const saveToStorage = (key, item) => {
  try {
    localStorage.setItem(key, JSON.stringify(item))
  } catch (err) {
    console.log(err)
  }
}

export const loadFromStorage = key => {
  try {
    const item = localStorage.getItem(key)

    if (item === null) {
      return undefined
    }
    return JSON.parse(item)
  } catch (err) {
    console.log(err)

    return undefined
  }
}

export const removeFromStorage = (key) => localStorage.removeItem(key)
