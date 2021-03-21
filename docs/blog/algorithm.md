# 算法

## 数据结构

### 图

#### 1. 无向图：

无向图有两种实现方式：

1. 邻接矩阵(Adjacency-matrix)： 如果两个点相邻，则用1表示，否则用0表示

   <img src="https://gitee.com/lwsmilence/image-hub/raw/master/Adjaceny-matrix.png" alt="image-20201214205951406" style="zoom:80%;" />

   当边的数量较少，节点数量较多时，矩阵将十分巨大，而且会有很多空间浪费（0占据的格子）

2. 邻接列表（Adjacency-list）: 二维数组，每个元素是对应点的所有邻居节点组成的数组

   ![image-20201214210524579](https://gitee.com/lwsmilence/image-hub/raw/master/Adjacency-list.png)

   下面用邻接列表来实现图：

   ```typescript
   /*
    * @Author: lwsmilence
    */
   class Graph {
       /**
        * 顶点数量
        */
       vertices: number
   
       /**
        * 边数量
        */
       edge: number
   
       /**
        * 图的内容
        */
       content: number[][]
   
       constructor(v: number) {
           this.content = new Array(v)
           for (let i = 0; i < v; i++) {
               this.content[i] = []
           }
       }
   
       linkedVertices(vertice: number): number[] {
           return this.content[vertice]
       }
   
       /**
        * 添加边
        * @param v 节点1
        * @param w 节点2
        */
       addEdge(v: number, w: number) {
           this.content[v].push(w)
           this.content[w].push(v)
           this.edge++
       }
   
       specificEdge(v: number): number[] {
           return this.content[v]
       }
   }
   ```

#### 2. 有向图

和无向图一样，有向图也能用邻接矩阵和邻接链表来表示。

下面给出邻接链表的实现方式：

```typescript
/*
 * @Author: lwsmilence
 */
class Digraph {

    vertices: number

    edge: number

    adj: number[][]

    constructor(v: number) {
        this.adj = new Array(v)
        for (let i = 0; i < v; i++) {
            this.adj[i] = []
        }
    }

    /**
     * 添加一条从v到w的边
     * @param v 起点
     * @param w 终点
     */
    addEdge(v: number, w: number) {
        this.adj[v].push(w)
        this.edge++
    }

    edgeFrom(v: number): number[] {
        return this.adj[v]
    }
}

```

#### 3. 符号图

**算法4**中定义了符号图，其实和无向图一样，只是邻接链表变成了散列表

## 查找

### 二分查找

## 排序

### 选择排序

### 快速排序

## 常用算法

### 1. BFS（广度优先搜索）

> 广度优先搜索是一种用于图的查找算法，可帮助 回答两类问题：
>
> 1. 从节点A出发，有前往节点B的路径吗？
> 2. 从节点A出发，前往节点B的哪条路径最短？

```typescript

```

### 2. DFS（深度优先搜索）

#### 维基百科定义：

> Depth-First-Search是一种用于遍历或搜索树或图的算法。这个算法会 **尽可能深**地搜索树地分支。当结点`v`的所在边都已被探寻过，搜索将 **回溯** 到发现结点`v`的那条边的起始节点。这一过程一直进行到已发现从源结点可达的所有结点为止。如果还存在未发现的结点，则选择其中一个作为源结点 并重复以上过程，整个进程反复进行直到所有结点都被访问为止。

### 3. 回溯算法

#### 维基百科定义:

>  采用试错的思想，尝试分步地去解决一个问题。在分分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确的解答的时候，它将取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案。回溯法通常用最简单的递归方法来实现，在反复重复上诉的步骤后可能出现两种情况：
>
> - 找到一个可能存在的正确的答案；
> - 在尝试了所有可能的分步方法后宣告该问题没有答案。

#### 与DFS的关系：

回溯算法强调了深度优先遍历思想的用途，用一个 **不断变化**的变量，在尝试各种可能的过程中，搜索需要的结果。强调了 **回退 **操作对于搜索的合理性。而深度优先遍历强调一种遍历的思想。

#### 回溯算法的框架：

解决一个回溯问题，实际上就是一个决策树的遍历过程。需要思考以下3个问题：

1. 路径：已经做出的选择
2. 选择列表：当前可以做的选择
3. 结束条件：到达决策树底层，无法再做选择的条件

```python
result = []
def backtrack(路径， 选择列表):
    if 满足结束条件:
        result.add(路径)
        return
    for 选择 in 选择列表:
        做选择
        backtrack(路径， 选择列表)
        撤销选择
```

#### 算法题解

[N皇后](https://leetcode-cn.com/problems/n-queens/)

```typescript
let result
function solveNQueens(n: number): string[][] {
  result = []
  let board = new Array(n)
  for (let i = 0; i < n; i++) {
    board[i] = new Array(n).fill('.')
  }
  
  backtrack(board, 0)
  return result
};

const backtrack = (board, row: number) => {
  // 确定结束条件
  if (row === board.length) {
    
    let oneTry = board.slice()
    for (let i = 0; i < board.length; i++) {
      oneTry[i] = oneTry[i].join('')
    }    
    result.push(oneTry)
    return;
  }

  for (let i = 0, l = board.length; i < l; i++) {    
    if (!isValid(board, row, i)) continue
    board[row][i] = 'Q'
    backtrack(board, row + 1)

    board[row][i] = '.'
  }


}

/**
 * 判断board[row][col]是否可以放皇后
 * @param board 当前棋盘的布局
 * @param row 棋盘行数
 * @param col 棋盘列数
 */
const isValid = (board: string[][], row: number, col: number): boolean => {
  // 判断列方向是否有皇后
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 'Q') {
      return false
    }
  }
  // 判断左上方是否有皇后
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') {
      return false
    }
  }

  // 判断右上方是否有皇后
  for (let i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
    if (board[i][j] === 'Q') {
      return false
    }
  }
  return true
}
```

