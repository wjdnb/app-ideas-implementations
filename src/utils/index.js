export function bin2Dec(digits) {
  let result = 0;

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === "1") {
      let factor = digits.length - i - 1;
      result += Math.pow(2, factor);
    }
  }

  return result;
}

export function validateBinary(str) {
  const reg = /^[0-1]+$/;

  return reg.test(str);
}

export function controlRange(max, min, value) {
  if (value > max) value = max;
  if (value < min) value = min;
  return value;
}

export function isNumber(str) {
  const reg = /^[0-9]*$/;

  return reg.test(str);
}

export function handleCopy(text) {
  if (!text) {
    alert("没有复制内容");
    return;
  }

  // 添加事件监听器的函数
  const copyFunction = async (e) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("复制成功！");
    } catch (err) {
      alert("复制失败: " + err);
    }

    // 可选：在复制后移除监听器
    document.body.removeEventListener("click", copyFunction);
  };

  // 添加监听器到 document.body
  document.body.addEventListener("click", copyFunction);
}
