function debounce(func, wait, immediate) {
  let timeout, result;

  let debounced = function () {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callnow = !timeout;
      setTimeout(function () {
        timeout = null;
      }, wait);
      if (callnow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }

    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

const debounce1 = debounce(() => {
  console.log("测试一秒");
}, 1000);
const debounce2 = debounce(
  () => {
    console.log("测试一秒,立即执行");
  },
  1000,
  true
);

console.log(debounce1(), debounce1(), debounce1(), debounce2());
