/**
 * 算法原理：
深度优先搜索： 可以理解为暴力法遍历矩阵中所有字符串可能性。DFS 通过递归，先朝一个方向搜到底，再回溯至上个节点，沿另一个方向搜索，以此类推。
剪枝： 在搜索中，遇到 这条路不可能和目标字符串匹配成功 的情况（例如：此矩阵元素和目标字符不同、此元素已被访问），则应立即返回，称之为 可行性剪枝 。
算法剖析：
递归参数： 当前元素在矩阵 board 中的行列索引 i 和 j ，当前目标字符在 word 中的索引 k 。
终止条件：
返回 false ： ① 行或列索引越界 或 ② 当前矩阵元素与目标字符不同 或 ③ 当前矩阵元素已访问过 （③ 可合并至 ② ） 。
返回 true ： 字符串 word 已全部匹配，即 k = len(word) - 1 。
递推工作：
标记当前矩阵元素： 将 board[i][j] 值暂存于变量 tmp ，并修改为字符 '/' ，代表此元素已访问过，防止之后搜索时重复访问。
搜索下一单元格： 朝当前元素的 上、下、左、右 四个方向开启下层递归，使用 或 连接 （代表只需一条可行路径） ，并记录结果至 res 。
还原当前矩阵元素： 将 tmp 暂存值还原至 board[i][j] 元素。
回溯返回值： 返回 res ，代表是否搜索到目标字符串。
 */
var exist = function (board, word) {
    if (board.length === 0 || board[0].length === 0) {
        return false;
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (dfs(board, word, i, j, (k = 0))) {
                // 递归参数：当前元素在矩阵 board 中的行列索引 i 和 j ，当前目标字符在 word 中的索引 k
                return true;
            }
        }
    }
    return false;
};
function dfs(board, word, i, j, k) {
    // 剪枝
    if (
        i >= board.length ||
        i < 0 ||
        j >= board[0].length ||
        j < 0 ||
        board[i][j] !== word[k]
    ) {
        return false;
    }
    // 满足字符串 word 已全部匹配，即 k = len(word) - 1
    if (k === word.length - 1) {
        return true;
    }
    // 做选择
    let temp = board[i][j];
    board[i][j] = "/";
    // 递归，搜索四个方向
    let res =
        dfs(board, word, i + 1, j, k + 1) ||
        dfs(board, word, i - 1, j, k + 1) ||
        dfs(board, word, i, j + 1, k + 1) ||
        dfs(board, word, i, j - 1, k + 1);
    // 撤销选择
    board[i][j] = temp;
    return res;
}
