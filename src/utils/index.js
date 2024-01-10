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

export function extractRotateValues(transformString) {
  const rotateXMatch = transformString.match(/rotateX\((-?\d+\.?\d*)deg\)/);
  const rotateYMatch = transformString.match(/rotateY\((-?\d+\.?\d*)deg\)/);

  const rotateX = rotateXMatch ? parseFloat(rotateXMatch[1]) : 0;
  const rotateY = rotateYMatch ? parseFloat(rotateYMatch[1]) : 0;

  return { rotateX, rotateY };
}

export function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let random = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }

  return arr;
}
