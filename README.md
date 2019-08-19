<p align="center">
  <img src="https://i.postimg.cc/Sxy0rKYC/home.png">
</p>

Base on `vuepress`

在线地址：https://lwll.github.io/better-call-me-pumpkin

**这是一个个人记录向的项目**
- [小工具](#%E5%B0%8F%E5%B7%A5%E5%85%B7)
  * [前端工具库](#%E5%89%8D%E7%AB%AF%E5%B7%A5%E5%85%B7%E5%BA%93)
  * [Vue](#vue)
    + [组件](#%E7%BB%84%E4%BB%B6)
  * [Chrome插件](#chrome%E6%8F%92%E4%BB%B6)
  * [其他](#%E5%85%B6%E4%BB%96)
- [小记](#%E5%B0%8F%E8%AE%B0)
  * [npm](#npm)
# 小工具

>  这里主要记录平时用过觉得不错的小工具，包括工具库，浏览器插件等

## 前端工具库

- [moment](http://momentjs.cn/ )  javaScript 日期处理类库

## Vue 

### 组件

- [Vue-Awesome-Swiper](https://github.com/surmon-china/vue-awesome-swiper ) 基于 [Swiper4](http://www.swiper.com.cn/)、适用于 Vue 的轮播组件，支持服务端渲染和单页应用 
- [v-click-outside](https://github.com/ndelvalle/v-click-outside ) 一个vue指令，当点击所作用元素之外的区域时生效

## Chrome插件

::: tip

github上有一个[chrome插件英雄榜](https://github.com/zhaoolee/ChromeAppHeroes )， 推荐了很多优质的chrome插件，更新频率也很快。这里就只记录自己用过的了。

:::

- [谷歌访问助手](https://chrome.google.com/webstore/detail/%E8%B0%B7%E6%AD%8C%E8%AE%BF%E9%97%AE%E5%8A%A9%E6%89%8B/gocklaboggjfkolaknpbhddbaopcepfp ) 要下chrome插件，首先得翻墙吧？
- [Adblock Plus - 免费的广告拦截器](https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb ) 插件如其名
- [Restlet Client - REST API Testing](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm ) 非常好用的api测试工具
- [OneTab Plus:标签效率管理扩展](https://chrome.google.com/webstore/detail/onetab-plustab-manage-pro/lepdjbhbkpfenckechpdfohdmkhogojf ) 还在为标签页过多又舍不得关掉而烦恼吗？一个插件解决你的问题
- [Infinity 新标签页(Pro)](https://chrome.google.com/webstore/detail/infinity-new-tab-pro/nnnkddnnlpamobajfibfdgfnbcnkgngh ) 极大地提高新标签页的作用，又不会显得页面很杂乱
- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo ) chrome插件唯一真神
- [Octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc ) github上看代码必备
- [Save to Pocket](https://chrome.google.com/webstore/detail/save-to-pocket/niloccemoadcdkdjlinkgdfekeahmflj ) 将你在浏览器上看到的内容保存在pocket中！页面整洁好看，缺点就是网站打开有点慢。

## 其他

- [ScreenToGif](https://www.screentogif.com/ ) 轻量、好用的录制Gif、视频的工具
- [Everything](https://www.voidtools.com/zh-cn/ ) 搜索文件神器
- [cmder](https://cmder.net/ ) windows下强大的命令行工具
- [Typora](https://typora.io/ ) 免费、简洁的本地Markdown编辑器
# 小记

>  这里主要记录平时遇到的各个小知识点

## npm



- 通过修改[npmrc](https://docs.npmjs.com/files/npmrc )文件可以直接修改npm的配置。系统中存在多个npmrc文件，作用优先级为：项目级、用户级... 所以如果项目中使用了公司的内部npm服务器时，可以在项目的根目录下单独建立一个npmrc文件，设置registry为公司的内部地址。然后再全局设置npm的registry为淘宝镜像：

  ```ba
  npm config set registry https://registry.npm.taobao.org
  ```

  这样就可以在其他项目中愉快的使用npm了

