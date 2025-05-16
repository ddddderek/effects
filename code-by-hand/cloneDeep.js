function cloneDeep(source, hash = new WeakMap()) {
  // 基本数据类型直接返回
  if (!isObject(source)) return source;
  // 处理循环引用
  if (hash.has(source)) return hash.get(source);

  // 初始化并缓存数据
  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  for (let key in source) {
    // 自身属性
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key], hash);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function isObject(data) {
  return (
    data !== null && (typeof data === "object" || typeof data === "function")
  );
}

// example
const obj = {
  a: 1,
  b: { c: 2 },
  d: [3, { e: 4 }],
};
// 循环引用：obj.b.self = obj
obj.b.self = obj;

console.log(cloneDeep(obj));
