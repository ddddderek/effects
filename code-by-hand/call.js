Function.prototype.call2 = function (context) {
  let context = context || window;
  context.fn = this;

  let args = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  let result = eval("context.fn(" + args + ")");

  delete context.fn;
  return result;
};
