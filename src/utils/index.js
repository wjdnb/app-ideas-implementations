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
