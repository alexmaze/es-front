export * from "./ModalFactory"

/**
 * @description 格式化日期字符串为 YYYY-MM-dd
 *
 * @export
 * @param {string} dateStr
 * @returns
 */
export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

/**
 * @description 搜索对象中所有字段，子串搜索
 *
 * @export
 * @param {Object} obj
 * @param {string} query
 * @returns
 */
export function searchObject(obj: Object, query: string) {
  if (!query) {
    return true
  }
  for (let key of Object.getOwnPropertyNames(obj)) {
    if (RegExp(query, "i").test(obj[key])) {
      return true
    }
  }
  return false
}

/**
 * @description 增强的睡眠函数，可定义结束后返回值
 *
 * @export
 * @template T 返回值类型
 * @param {number} seconds 延迟时间
 * @param {T} [data] 返回值数据
 * @returns
 */
export function sleep<T>(seconds: number, data?: T) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data != null) {
        resolve(data)
      } else {
        reject("TIMEOUT")
      }
    }, seconds * 1000)
  })
}
