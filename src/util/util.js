export default {
  // 将单个数组切割成多个数组
  // 参数：array:需做处理的数组；length:切割后数组的长度
  processedArray (array, length) {
    let num = array.length
    let chunkedArray = []
    for (let i = 0, j = 0; i < num; i += length, j++) {
      chunkedArray[j] = array.slice(i, i + length)
    }
    return chunkedArray
  },

  // 根据评分给出对应的星标图片样式
  getStarStyle (score) {
    let posY = Math.round(10 - score) * 10
    return {
      backgroundPosition: `0 ${posY}%`
    }
  }
}
