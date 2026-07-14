Component({
  data: {
    selected: 0,
    color: '#a8a29e',
    selectedColor: '#c2410c',
    list: [
      {
        pagePath: '/pages/home/home',
        text: '首页',
        iconPath: '/images/home.png',
        selectedIconPath: '/images/home_active.png'
      },
      {
        pagePath: '/pages/record/record',
        text: '记录',
        iconPath: '/images/approval.png',
        selectedIconPath: '/images/approval_active.png'
      },
      {
        pagePath: '/pages/query/query',
        text: '查询',
        iconPath: '/images/data.png',
        selectedIconPath: '/images/data_active.png'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        iconPath: '/images/profile.png',
        selectedIconPath: '/images/profile_active.png'
      }
    ]
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  }
})
