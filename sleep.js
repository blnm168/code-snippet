const sleep = function (time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, time);
  })
}

// 实现一个 delay 函数格式如下，在 N 毫秒之后执行函数，并以函数结果作为返回值
function delay (func, seconds, ...args) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      Promise.resolve(func(...args)).then((v) => {
        return res(v)
      }).catch(rej)
    }, seconds);
  })
}

// 在 3s 之后返回 hello, world
let res = await delay((str) => console.log(111), 3000, 'hello, world');
console.log(res)

// 在 3s 之后返回 hello, world，第一个函数可返回 promise
let res2 = await delay((str) => Promise.resolve(str), 3000, 'hello, world')
console.log(res2)