

# vue-lobes

## 前言

**本项目是一个练手性质的项目**。

本人学习vue已经有一段时间了。在学习的过程中，有看过官方的文档、示例，有学习过一些相关的知识，也有粗略看过别人的一些项目。不得不说，这段学习经历还是有收获到一些东西的，但终究有限，不管是深度还是广度都还不够，经不起推敲。

在向妹子[@saruky1996 ](https://github.com/saruky1996 )诉说自己的烦恼，两人讨论之后决定，开始用vue写一个项目。这个项目的功能被定义为记录用户平时看的书、电影，后续可能还会添加记录游戏的功能。可以把此项目看作是一个单机极简版的[豆瓣](https://www.douban.com/ )+[小黑盒]([https://www.xiaoheihe.cn](https://www.xiaoheihe.cn/) )。

由于是在业余时间写这个项目，而且练手的性质比较重，会侧重用更多自己没用过的技术去做，所以项目的开发周期可能会拉的很长，甚至最后不一定会做完。不过在我看来，最重要的是开发的过程中学到的东西，以及让自己认识到自己还有很多很多需要学习的地方。

**这篇博客用来记录自己在开发lobes的过程中遇到的各种问题**

## 技术栈

vue2 + vuex + vue-router + vue-cli3 + ES6/7 + axios + sass + flex + rem + svg + iview

## 项目运行

本地运行：

```bash
npm install
npm run serve
```

打包：

``` bash
npm run build
```

## 有关

本项目相应的后台使用node.js开发，[地址在这里](https://github.com/lwll/egg-lobes )

## 开发日志

### 登录与权限

> 本项目的登录方式做了简单处理，未注册的用户登录时将自动注册 。

- **用户认证方式？**

**客户端保存用户的身份信息到cookie中，后台使用session进行校验**

1. 当用户进行登录时，客户端向后台发送用户输入的用户名和密码信息。

2. 后台收到后，将用户信息加密之后，返回一个token给前台，同时将该token保存到session中，用于后续请求的校验。

3. 前台收到后台返回的token之后，将该token保存到cookie中：

   ```javascript
   import Cookies from 'js-cookie'
   
   const tokenKey = 'X-Lobes-Token'
   
   function setToken(token) {
     return Cookies.set(tokenKey, token)
   }
   
   async handleLogin(loginParam) {
       const { data } = await login(loginParam)    // login为封装的axios请求，用于登录
       setToken(data.token)
   }
   ```

4. 将token添加到axios请求header中，这样后台就能根据收到的客户端请求里的请求头来确定客户端身份了：

   ``` javascript
   import axios from 'axios'
   import Cookies from 'js-cookie'
   
   const tokenKey = 'X-Lobes-Token'
   
   function getToken() {
     return Cookies.get(tokenKey)
   }
   
   const service = axios.create({
     baseURL: process.env.VUE_APP_API,
     timeout: 50000
   })
   
   service.interceptors.request.use((config) => {
     if (getToken()) {
       config.headers['X-Lobes-Token'] = getToken()
     }
     return config
   })
   ```

5. 客户端成功登录之后，再用收到的token向后台查询用户信息

之所以整个登录流程客户端会向后台发送两次请求，一是因为这样整个流程比较清晰；二是因为当用户信息有更新时，这种方式可以正常获取到。

- **权限控制**

**通过vue-router的全局前置守卫来实现**

本项目的权限控制很简单，所有用户能看到的页面都一样。所以只需要判断用户的登录情况就可以了。

vue-router的[全局前置守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html )可以获取到浏览器的每一次路由跳转行为，这样就可以很方便地实现权限控制。在路由每一次跳转的时候，判断cookie中是否存在token，如果不存在则跳转到登录页面；如果存在且目标路由为登录页面，则将其路由到主页面。

``` javascript
import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import iView from 'iview'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  iView.LoadingBar.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      iView.LoadingBar.finish()
    } else {
      const nickname = store.getters.nickname
      if (nickname) {
        next()
      } else {
        store.dispatch('user/getUserInfo').then(() => {
          next()
        }).catch((err) => {
          this.Message.error(err)
        })
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      iView.LoadingBar.finish()
    }
  }
})

router.afterEach(() => {
  iView.LoadingBar.finish()
})
```

另外，可以通过设置路由白名单，让没有登录过的用户也可以访问到特定的页面，比如示例代码中的登陆页面。

### 页面自适应

> web端页面的分辨率不会像移动端有那么多种情况，本项目使用rem简单处理了页面自适应的问题

- **rem处理页面自适应**

我们知道，rem（font size of the root element）是指相对于根元素的字体大小的单位。那么，如果样式中长度单位都用rem，当页面大小变化时，只需要修改根元素的字体大小，页面的其他部分也就会相应的修改：

```javascript
function calculateFontSize() {
  document.documentElement.style.fontSize = `${document.body.clientWidth / (1920 / 20)}px`
}

new Vue({
  created: function() {
    calculateFontSize()
    window.onresize = calculateFontSize
  },
  render: h => h(App)
}).$mount('#app')
```

**将window的resize监听函数注册在全局Vue的created钩子函数中，就能对所有页面组件生效**

- **px2rem-loader将px转换成rem**

上一步我们知道了使用rem单位可以实现页面自适应，但是在实际开发的过程中，给到我们的设计图的标注一般都是以px为单位的，如果要一个个地计算某段长度等于多少rem，实在是太麻烦。[px2rem-loader](https://www.npmjs.com/package/px2rem-loader)就解决了这个问题，它可以将指定文件类型中的px单位转换成对应的rem大小，这样就可以在样式中直接写设计图上标记的长度了。

vue-cli3中webpack的配置写在vue.config.js文件里，可以像下面这样配置px2rem-loader：

```javascript
module.exports = {
    
    chainWebpack: config => {
    config.module
      .rule('scss')    // 作用在 *.scss文件中
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // px2rem-loader放在postcss-loader之前，确加载顺序正确
      .options({
        remUnit: 20    // 这里remUnit的值表示1rem=20px
      })
      .end()
  }
    
}
```

### 优雅地使用icon

> 本项目icon的使用方式为[iconfront](https://www.iconfont.cn/) + [vue-svgicon](https://github.com/MMF-FE/vue-svgicon)

说起icon，可能大多数人第一反应就是阿里巴巴的iconfront了。本项目的大多数图标也是在iconfront上找到并由iconfront管理的。iconfront官网上有着比较详细的使用icon的教程，本人也按照官网的方式使用过一段时间，使用下来有两个不太满意的地方：

1. 每次更新图标的时候，都需要将官网上项目的图标包全部下下来，然后覆盖本地的图标，无法单个更新；
2. 打包之后的文件混在一起，语义不明，无法查看里面包含了什么icon

**vue-svgicon**则正好解决了这个痛点。具体使用方式可参考[这里](https://github.com/MMF-FE/vue-svgicon)。

本项目在使用的时候，步骤如下：

1. 在package.json里新增脚本：

```json
{
    "scripts": {
        "svg": "vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6"
    }
}
```

**./src/icons/svg**为图标存放目录，**./src/icons/components**为生成的js文件目录。

2. 当新增一个图标的时候，将其放在相应目录下，运行:

```bash
npm run svg
```

3. 在main.js中全局注册：

```javascript
import SvgIcon from 'vue-svgicon'

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})
```

4. 使用：

```vue
<template>
	<svgicon name="mail" />  <!-- name为相应的图标的名字 -->
</template>
```