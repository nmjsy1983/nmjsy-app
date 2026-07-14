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
        pagePath: '/pages/approval/approval',
        text: '审批',
        iconPath: '/images/approval.png',
        selectedIconPath: '/images/approval_active.png'
      },
      {
        pagePath: '/pages/data/data',
        text: '数据',
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
      this.setData({
        selected: data.index
      })
    }
  }
})
