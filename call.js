Function.prototype.call = function (objthis, ...args) {
  // 给当前对象添加调用方法；此时this就是函数本身
  objthis.fn = this
  // 用当前对象去执行该方法，用对象去调用该方法会改变自身this指向
  let res = objthis.fn(...args);
  /**
    * call核心原理，通过对象去改变this
    * var foo = {
    *   value: 1,
    *   bar: function () {
    *     console.log(this.value)
    *   }
    * };
    * foo.bar(); // 1
  */
  // 删除引用，已经没用了
  delete objthis.fn;
  // 返回方法返回值
  return res
}