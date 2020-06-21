function cutRope(number) {
  // write code here
  // dp[i]表示长度为i的绳子剪切后的最大乘积。本题最终变为求dp[number]
  // 将长度为i的绳子分为长度为j和 i-j，那么i 的最优解就是j的最优解和i-j的最优解的乘积。
  // 长度为j的绳子的最优解（不一定分段后会更大，例如对于长度为3的绳子，分段后的最大乘积为1，不分段则为3）
  let dp = [];
  dp[1] = 0; // 由于m>1，也就是必须要分段，所以总长度为1无法分段
  dp[2] = 1; // 总长度为2，只能分成1+1=2，乘积为1
  // dp[3] = 2;// 总长度为3，可以分成1+1+1，1+2，最大乘积为3
  for (let i = 3; i <= number; i++) {
    let res = 0;
    for (let j = 1; j < i; j++) {
      let a = Math.max(j, dp[j]); // 长度为j的绳子的最优解（不一定分段后会更大，例如对于长度为3的绳子，分段后的最大乘积为1，不分段则为3）
      let b = Math.max(i - j, dp[i - j]);
      let t = a * b;
      res = t > res ? t : res;
    }
    dp[i] = res;
  }
  return dp[number];
}
module.exports = {
  cutRope: cutRope,
};
