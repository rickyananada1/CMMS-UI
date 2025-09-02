export const setTableLastParams = (el, storeKey) => {
  const dataToStore = JSON.stringify(el)
  localStorage.setItem(`tableParams-${storeKey}`, dataToStore)
}

export const getTableLastCurrentParams = (location, storeKey) => {
  const storedData = {
    currentPage: 1,
    pathname: '',
    query: undefined,
    sort: '',
    order: '',
  }
  const tempItem = localStorage.getItem(`tableParams-${storeKey}`)
  if (tempItem) {
    const item = tempItem ? JSON.parse(tempItem) : null
    if (item.pathname === location) {
      storedData.currentPage = item.currentPage
      storedData.pathname = item.pathname
      storedData.query = item.query
      storedData.sort = item.sort
      storedData.order = item.order
      return storedData
    }
  }
  return storedData
}
