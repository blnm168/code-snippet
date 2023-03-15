async function fn () {
  await new Promise((resolve, reject) => { reject('报错'); });
}
fn();
window.addEventListener('unhandledrejection', function (event) {
  console.log(event)
  // 阻止默认打印
  event.preventDefault();
})

// unhandledrejection
// Vue.config.errorHandler
