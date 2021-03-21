# element-plus源码分析

## element-plus中的BEM实现

> `element-plus`中`BEM`实现涉及到`BEM`、`sass`的一些基本知识，下面简单记录下

### BEM

1. 基本概念

   BEM是block, element, modifier的缩写，表示css命名规则要按照模块名+元素名+修饰器名：block-name__element-name--modifier-name。这种好处是保证css样式不会互相影响。

2. BEM修饰器

   当组件在不同的业务逻辑下有不同的展示方式时，应该用一个单独的类名来表示对应的业务含义。比如要表示元素被选中，推荐的写法是：
   
   ```css
   // 推荐的写法
   .block__element .is-active {
       display: block;
   }
   ```
   
   不推荐严格按照BEM的写法：
   
   ```css
   // 不推荐的写法
   .block__element--active {
       display: block;
   }
   ```

### Sass



## 参考资料

[css命名规范](https://bemcss.com/)

