function setCoordName(arr) {
  if (arr && arr.length > 0) {
    return arr.join('*')
  }
  return ''
}

export {
  setCoordName,
}
