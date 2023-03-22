// promise 特性
// 1.promise 状态不可改变
// 2.执行 resolve promise状态变为fulfilled
// 3.执行 reject promise状态变为rejected
// 4.promise 中有throw的话 相当于执行 reject
// then接收两个回调 一个成功回调，一个失败回调
// then支持链式调用 下一次的then的值 受上一次的返回值影响
// promise的状态为 fulfilled 执行成功 状态为rejected执行失败
// resolve reject 如果在定时器里 则定时器结束在执行 then
// then 方法返回一个promise
// 如果返回的是一个promise 返回的值为成功 新的promise则为成功
// 如果返回的是一个promise 返回的值为失败 新的promise则为失败
// 如果返回的不是一个promise 则新的promise为成功 
class MyPromise {
  constructor(exector) {
    this.inintValue();
    this.inintBind();
    try {
      exector(this.resolve,this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  inintValue () {
    this.PromiseValue = null;
    this.PromiseResult = 'pending'
    this.resolveCallbacks = []
    this.rejectCallbacks =[]
  }

  inintBind () {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve (value) {
    if (this.PromiseResult !== 'pending') return
    this.PromiseValue = value;
    this.PromiseResult = 'fulfilled'

    while (this.resolveCallbacks.length) {
      this.resolveCallbacks.shift()(this.PromiseValue)
    }
  }

  reject (reason) {
    if (this.PromiseResult !== 'pending') return
    this.PromiseValue = reason;
    this.PromiseResult = 'rejected'
    while (this.rejectCallbacks.length) {
      this.rejectCallbacks.shift()(this.PromiseValue)
    }
  }
  then (onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reson => { throw reson }
    let thenPromise = new MyPromise((resolve,reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          try {
            const x = cb(this.PromiseValue)
            if (x === thenPromise) {
              throw new Error('不能返回自身')
            }
            if (x instanceof MyPromise) {
              x.then(reject, resolve)
            } else {
              resolve(x)
            }
          } catch (error) {
            reject(error)
            throw new Error(err)
          }
        })
      }
      if (this.PromiseResult === 'pending') {
        this.resolveCallbacks.push(onFulfilled.bind(this))
        this.rejectCallbacks.push(onRejected.bind(this))
      }
      if (this.PromiseResult === 'fulfilled') {
        resolvePromise(onFulfilled)
      }
      if (this.PromiseResult === 'rejected') {
        resolvePromise(onRejected)
      }
    })
    return thenPromise
  }
}

// const test4 = new MyPromise((resolve, reject) => {
//   resolve(1)
// }).then(res => console.log(res), err => console.log(err))

// console.log(2)


const test3 = new MyPromise((resolve, reject) => {
  resolve(100) // 输出 状态：成功 值： 200
  // reject(100) // 输出 状态：成功 值：300
}).then(res => 2 * res, err => 3 * err)
  .then(res => console.log('成功', res), err => console.log('失败', err))


  const test4 = new MyPromise((resolve, reject) => {
    resolve(100) // 输出 状态：失败 值：200
    // reject(100) // 输出 状态：成功 值：300
    // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
  }).then(res => new MyPromise((resolve, reject) => reject(2 * res)), err => new MyPromise((resolve, reject) => resolve(3 * err)))
    .then(res => console.log('成功', res), err => console.log('失败', err))
