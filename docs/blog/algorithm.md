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

