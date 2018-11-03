const replaceCorrespond = (replaceArr, targetIndex, replaceWidth) => {
  if (replaceArr.length < replaceWidth) {
    throw (new Error('replaceArr length must >= replaceWidth'))
  }
  let cnt = 0
  return (item, index) => {
    if (targetIndex <= index && index <= (targetIndex + replaceWidth) - 1) {
      const targetItem = replaceArr[cnt]
      cnt += 1
      return targetItem
    }
    return item
  }
}

export default replaceCorrespond
