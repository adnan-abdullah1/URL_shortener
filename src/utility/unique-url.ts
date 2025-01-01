const base62Digits =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let num = 0;
function convertToBase62(number = num) {
  let base62 = '';
  while (number > 0) {
    const remainder = number % 62;
    base62 = base62Digits[remainder] + base62;
    number = Math.floor(number / 62);
  }
  num += 1;
  return base62;
}

module.exports = convertToBase62;
