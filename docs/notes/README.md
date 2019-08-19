# 小记

>  这里主要记录平时遇到的各个小知识点

## npm



- 通过修改[npmrc](https://docs.npmjs.com/files/npmrc )文件可以直接修改npm的配置。系统中存在多个npmrc文件，作用优先级为：项目级、用户级... 所以如果项目中使用了公司的内部npm服务器时，可以在项目的根目录下单独建立一个npmrc文件，设置registry为公司的内部地址。然后再全局设置npm的registry为淘宝镜像：

  ```ba
  npm config set registry https://registry.npm.taobao.org
  ```

  这样就可以在其他项目中愉快的使用npm了

