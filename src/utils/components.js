export const emptyValueLabel = (value) => {
  if (value?.value === '' && value?.label === '') {
    return null
  }
  return value
}
