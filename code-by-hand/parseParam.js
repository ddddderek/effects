function parseParam(url) {
  const paramStr = /.+\?(.+)$/.exec(url)[1];
  const paramArr = paramStr.split("&");
  let paramsObj = {};
  paramArr.forEach((param) => {
    if (/=/.test(param)) {
      let [key, val] = param;
      val = decodeURIComponent(val);
      val = /^\d+&/ ? parseFloat(val) : val;
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(param[key], val);
      } else {
        paramsObj[key] = val;
      }
    } else {
      paramsObj[param] = true;
    }
  });
  return paramsObj;
}
