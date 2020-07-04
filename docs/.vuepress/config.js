module.exports = {
  title: 'LrSpspWeb',
  description: ' Vue驱动的LrSpspWeb快速入门文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '招募', link: '/zh/ad/' },
      {
        text: '部署文档',
        items: [
          { text: '快速部署', link: '/zh/guide/install/local/' },
          { text: '分布式部署', link: '/zh/guide/install/distribute/' },
          { text: '服务配置', link: '/zh/guide/install/config/' },
          { text: '服务迁移', link: '/zh/guide/install/transmission/' }
        ]
      },
      { text: '使用文档', link: '/zh/guide/used/GIS_docs/' },
      //{ text: '论坛', link: 'https://bbs.opendevops.cn/',target:'_blank' },
      { text: '官网', link: 'http://www.longruan.com/',target:'_blank' },
      { text: 'Demo', link: 'http://172.16.0.165/', target: '_blank'},
      //{ text: 'Gitee', link: 'https://gitee.com/opendevops/opendevops', target: '_blank'},
      { text: 'Github', link: 'https://github.com/hzl201/opendevops',target:'_blank' },
      {
        text: '了解更多',
        items: [
          { text: 'FAQ', link: '/zh/guide/more/faq/' },
          { text: 'QQ群及微信群', link: '/zh/guide/more/qgroup/'},
          { text: '贡献者', link: '/zh/guide/more/contributor/'},
          { text: '权限文档', link: '/zh/guide/more/permission/'},
          { text: '最佳示例', link: '/zh/guide/more/example/'},
          { text: '插件相关', link: '/zh/guide/more/plugin/'},
          { text: '如何更新', link: '/zh/guide/more/update/'},
        ]
      },
    ],
    sidebar: {
      '/zh/guide/': [
        {
          title: '它是什么',
          collapsable: false,
          children: [''],
        },
        {
          title: '如何安装',
          collapsable: false,
          children: [
            '/zh/guide/install/local/',
            '/zh/guide/install/distribute/',
            '/zh/guide/install/config/',
            '/zh/guide/install/transmission/'
          ]
        },
        {
          title: 'GIS使用',
          collapsable: false,
          children: [
            '/zh/guide/used/GIS_docs/'
          ]
        },
        {
          title: '集团平台使用',
          collapsable: false,
          children: [
            '/zh/guide/used/jtWeb_docs/jtWeb_menu/'
          ]
        },
        {
          title: '矿端平台使用',
          collapsable: false,
          children: [
            '/zh/guide/used/kjWeb_docs/kjWeb_menu/'
          ]
        },
        {
          title: '监测数据检查',
          collapsable: false,
          children: [
            '/zh/guide/used/MonitorData/'
          ]
        },
        {
          title: '其他相关',
          collapsable: false,
          children: [
            '/zh/guide/more/faq/',
            '/zh/guide/more/qgroup/',
            '/zh/guide/more/contributor/',
            '/zh/guide/more/permission/',
            '/zh/guide/more/example/',
            '/zh/guide/more/plugin/',
            '/zh/guide/more/update/'
          ]
        },
        // {
        //   title: '使用',
        //   collapsable: false,
        //   children: [
        //     '/zh/guide/install/local/',
        //     '/zh/guide/install/distribute/'
        //   ]
        // }
      ],
      
    }
    // sidebar: {
    //   '/zh/guide/': [''],
    //   '/zh/install/local/': [''],
    //   '/zh/install/distribute/': [''],
    // },

      
    
  }
}
