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
