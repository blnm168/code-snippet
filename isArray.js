const isArray = function (v) {
  // 不能写Object.toString  会报错 Function.prototype.toString requires that 'this' be a Function at String.toString 

  return ({}).toString.call(v) === '[object Array]'
}

console.log(isArray([])); // => true
console.log(isArray({})); // => false