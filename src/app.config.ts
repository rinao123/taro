export default {
  pages: [
    'pages/index/index',
    'pages/tag/tag',
    'pages/package/package',
    'pages/myinfo/myinfo'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    color: '#919292',
    borderStyle: 'black',
    selectedColor: '#FB7299',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'UP主列表',
        iconPath: '/resources/images/anchor.png',
        selectedIconPath: '/resources/images/anchor_selected.png'
      },
      {
        pagePath: 'pages/tag/tag',
        text: '标签定制',
        iconPath: '/resources/images/tag.png',
        selectedIconPath: '/resources/images/tag_selected.png'
      },
      {
        pagePath: 'pages/package/package',
        text: '发公关包',
        iconPath: '/resources/images/package.png',
        selectedIconPath: '/resources/images/package_selected.png'
      },
      {
        pagePath: 'pages/myinfo/myinfo',
        text: '我的',
        iconPath: '/resources/images/myinfo.png',
        selectedIconPath: '/resources/images/myinfo_selected.png'
      }
    ]
  },
  networkTimeout: {
    request: 10000
  }
}
