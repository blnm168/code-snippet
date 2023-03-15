/**
   * 创建一个新函数，这个函数第一个参数作为新的this使用，后续参数将作为新的函数参数，供调用时使用
   * @obj 新的this对象
   * @rest 后续参数作为新的参数，供新方法调用时使用
  */
Function.prototype.bind = function (obj, ...rest) {
  return (...args) => {
    return this.call(obj, ...rest, ...args)
  }
}