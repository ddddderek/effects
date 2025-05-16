function getType(data) {
  // 获取原始类型字符串（格式为 "[object Type]"）
  const originType = Object.prototype.toString.call(data);
  // 截取类型名称（如 "Array"、"Null"）
  const type = originType.slice(8, -1);

  // 转为小写并返回（如 "array"、"null"）
  return type.toLowerCase();
}

console.log(getType(null));
console.log(getType(undefined));
console.log(getType(123));
console.log(getType("abc"));
console.log(getType(Symbol("sym")));
console.log(getType([]));
console.log(getType({}));
console.log(getType(new Date()));
console.log(getType(/test/));
console.log(getType(function () {}));
console.log(getType(new Error()));
console.log(getType(new Map()));
console.log(getType(new Set()));
console.log(getType(new WeakMap()));
console.log(getType(new WeakSet()));
