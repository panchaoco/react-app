export function debounce(fn) {
  let timeout: any = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, 500);
  };
}
