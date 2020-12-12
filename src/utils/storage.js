// 封装本地存储模块

// 存储数据
export const setItem = (key, value) => {
  // 判断数据类型
  if (typeof value === 'object') {
    // 数据类型转换
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取数据
export const getItem = key => {
  // 获取数据
  const data = window.localStorage.getItem(key)
  // 判断并且转换数据类型
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
