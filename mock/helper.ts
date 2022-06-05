/**
 * @param data 需要返回的额数据
 * @param code 状态码
 * @param msg 提示信息
 * @param mock 是否是mock数据: 请在 mock 的时候附带上 mock ，方便在 axios 拦截的时候判断是否是mock数据
 * */
export function Response(data, code = 0, msg = 'success', mock = true) {
  return { code, data, msg, mock }
}
