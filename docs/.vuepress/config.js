const utils = require('./utils')

module.exports = {
    title: 'better-call-me-pumpkin',
    description: '苏平江写文字的地方',
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
              text: '测试',
              link: '/test/'
            }
        ],
        sidebar: utils.inferSiderbars(),
        lastUpdated: '上次更新',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: '在 GitHub 上编辑此页',
        sidebarDepth: 3
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@public': './public'
          }
        }
      },
      ga: 'UA-109340118-1',
      markdown: {
        config: md => {
          // use more markdown-it plugins!
          md.use(require('markdown-it-include'))
        }
      }
}