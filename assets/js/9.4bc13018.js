(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{186:function(t,s,a){"use strict";a.r(s);var e=a(0),r=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("使用docker安装nginx")]),t._v(" "),t._m(2),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),a("p",[t._v("部署多个服务器，将请求分发到多个服务")]),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),t._m(18),t._v(" "),t._m(19),t._v(" "),t._m(20),t._v(" "),t._m(21),t._m(22),t._v(" "),t._m(23),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/hunttown/p/5759959.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Nginx配置文件详解"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"http://nginx.org/en/docs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("nginx documentation"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/kevingrace/p/6137881.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("linux负载均衡总结性说明（四层负载/七层负载）"),a("OutboundLink")],1)])])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx","aria-hidden":"true"}},[this._v("#")]),this._v(" Nginx")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"安装nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装nginx","aria-hidden":"true"}},[this._v("#")]),this._v(" 安装nginx")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[this._v("docker pull nginx\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"基本用途"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基本用途","aria-hidden":"true"}},[this._v("#")]),this._v(" 基本用途")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"正向代理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#正向代理","aria-hidden":"true"}},[this._v("#")]),this._v(" 正向代理")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("客户端中配置代理服务器")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"反向代理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#反向代理","aria-hidden":"true"}},[this._v("#")]),this._v(" 反向代理")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"负载均衡"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#负载均衡","aria-hidden":"true"}},[this._v("#")]),this._v(" 负载均衡")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"动静分离"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动静分离","aria-hidden":"true"}},[this._v("#")]),this._v(" 动静分离")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"配置文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置文件","aria-hidden":"true"}},[this._v("#")]),this._v(" 配置文件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("nginx")]),this._v("配置文件由三部分组成。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"全局块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局块","aria-hidden":"true"}},[this._v("#")]),this._v(" 全局块")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("从配置文件开始到events块的内容，主要会设置一些影响"),s("code",[this._v("nginx")]),this._v("服务器整体运行的配置指令。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("worker_processes 1 可支持的并发处理器")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"events块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#events块","aria-hidden":"true"}},[this._v("#")]),this._v(" events块")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("影响"),s("code",[this._v("nginx")]),this._v("服务器和用户的网络连接")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("worker_connnection 1024 支持的最大连接数")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"http块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http块","aria-hidden":"true"}},[this._v("#")]),this._v(" http块")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("http全局块")]),this._v(" "),s("li",[this._v("server块")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"nginx配置实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx配置实例","aria-hidden":"true"}},[this._v("#")]),this._v(" nginx配置实例")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"反向代理-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#反向代理-2","aria-hidden":"true"}},[this._v("#")]),this._v(" 反向代理")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("http")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("listen")]),t._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("88")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server_name")]),t._v("  localhost"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        \n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 代理静态页面")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("haiou"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("client"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("alias")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("opt"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("haiou"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("client"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 代理后台服务1")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("haiou"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_pass")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("http")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10.73")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".32")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8889")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("haiou"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_set_header")]),t._v(" X"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Forwarded"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("For "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$remote_addr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 代理后台服务2")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("haioubigdata"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_pass")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("http")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10.73")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".32")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7889")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("haioubigdata"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_set_header")]),t._v(" X"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Forwarded"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("For "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$remote_addr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"负载均衡-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#负载均衡-2","aria-hidden":"true"}},[this._v("#")]),this._v(" 负载均衡")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考资料","aria-hidden":"true"}},[this._v("#")]),this._v(" 参考资料")])}],!1,null,null,null);s.default=r.exports}}]);