const utils = require('./utils')

module.exports = {
    title: 'better-call-me-pumpkin',
    description: 'Recording...',
    base: '/better-call-me-pumpkin/',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
              text: '小工具',
              link: '/tools/'
            },
            {
              text: '小记',
              link: '/notes/'
            },
            {
              text: '网站',
              link: '/website/'
            },
            {
              text: '文章',
              link: '/article/'
            },
            {
              text: 'Blog',
              link: '/blog/'
            },
            {
              text: '随笔',
              link: '/essay/'
            }
        ],
        // sidebar: 'auto',
        sidebar: utils.inferSiderbars(),
        lastUpdated: 'Last Updated',
        repo: 'lwll/better-call-me-pumpkin',
        docsDir: 'docs',
        sidebarDepth: 3
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@public': './public'
          }
        }
      },
      markdown: {
        config: md => {
          // use more markdown-it plugins!
          md.use(require('markdown-it-include'))
        }
      }
}