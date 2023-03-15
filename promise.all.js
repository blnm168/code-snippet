// 传入一个数组，其中可以包含promise 也可以包含普通数据
// 数组中promise并行
// 结果根据传入的顺序返回
// 如果有错误直接reject
// 所有数据成功之后返回数据
// promise.resolve 返回一个指定值解析后的promise,如果值是一个promise,则返回该promise,
function pAll (_promises) {
  return new Promise((res, rej) => {
    const promArr = Array.from(_promises)
    const r = [];
    let count = 0;
    for (let index = 0; index < promArr.length; index++) {
      Promise.resolve(promArr[index]).then(v => {
        r[index] = v;
        count++;
        if (count === promArr.length) {
          res(r)
        }
      }).catch((err) => {
        rej(err)
      })
    }
  })
}



const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds))

pAll([1, 2, 3]).then(o => console.log(o))
pAll([1, Promise.resolve(3)]).then(o => console.log(o))
pAll([1, Promise.reject(3)]).then(o => console.log('done')).catch(e => console.log(e))
Promise.all([1, Promise.reject(3)]).then(o => console.log('done')).catch(e => console.log(e))

pAll([sleep(1000), sleep(1000), sleep(1000), sleep(1000), sleep(1000)]).then(o => console.log('Sleep Done'))


// // [object Array] (3)
// [1,2,3]
// // [object Array] (2)
// [1,3]
// 3
// 3
// "Sleep Done"