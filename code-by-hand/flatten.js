function flatten(input, shallow, strict, output) {
  output = output || [];
  let idx = output.length;

  for (let i = 0, len = input.length; i < len; i++) {
    let value = input[i];
    if (Array.isArray(value)) {
      if (shallow) {
        let j = 0;
        let length = value.length;
        while (j < length) output[idx++] = value[j++];
      } else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;
}
