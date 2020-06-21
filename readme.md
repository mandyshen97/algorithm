## 算法题

## 剪绳子（动态规划，贪心算法，划分）

【题目描述】

给你一根长度为 n 的绳子，请把绳子剪成整数长的 m 段（m、n 都是整数，n>1 并且 m>1），每段绳子的长度记为 k[1],...,k[m]。请问 k[1]x...xk[m]可能的最大乘积是多少？例如，当绳子的长度是 8 时，我们把它剪成长度分别为 2、3、3 的三段，此时得到的最大乘积是 18。

-   输入描述:

输入一个数 n，意义见题面。（2 <= n <= 60）

-   输出描述:

输出答案。

-   示例 1

输入 8

输出 18

【解题方法与思路】

```javascript
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
```

## 机器人的运动范围（矩阵，方向，搜索，DFS）

【题目描述】
地上有一个 m 行 n 列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于 k 的格子。例如，当 k 为 18 时，机器人能够进入方格 [35, 37] ，因为 3+5+3+7=18。但它不能进入方格 [35, 38]，因为 3+5+3+8=19。请问该机器人能够到达多少个格子？

【解法与思路】

```javascript
function movingCount(rows, cols, threshold) {
    // 位数和计算
    function getSum(num) {
        let res = 0;
        while (num) {
            res += num % 10;
            num = Math.floor(num / 10);
        }
        return res;
    }

    // 方向数组， 四周方向的遍历，很自然的想到利用方向数组进行遍历辅助，这里实际上只需要两个方向。
    const directionArray = [
        // [-1, 0], // 上
        [1, 0], // 下
        // [0, -1], // 左
        [0, 1], // 右
    ];
    // 已经走过的坐标，用set结构，set具有唯一性
    let set = new Set(["0,0"]);
    dfs(0, 0, threshold);
    // 定义dfs遍历规则
    function dfs(x, y, threshold) {
        // 遍历方向
        for (let i = 0; i < 2; i++) {
            let offsetX = x + directionArray[i][0];
            let offsetY = y + directionArray[i][1];
            // 判断临界值
            if (
                offsetX < 0 ||
                offsetX >= rows ||
                offsetY < 0 ||
                offsetY >= cols ||
                getSum(offsetX) + getSum(offsetY) > threshold ||
                set.has(`${offsetX},${offsetY}`)
            ) {
                continue;
            }
            // 纳入统计
            set.add(`${offsetX},${offsetY}`);
            // 深度遍历
            dfs(offsetX, offsetY, threshold);
        }
    }
    // 走过坐标的个数就是可以到达的格子数
    return set.size;
}
```
