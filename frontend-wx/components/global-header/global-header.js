Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  data: {
    brandName: '众焱网络科技有限公司',
    displayBrand: '众焱网络',
    userName: '管理员',
    safeAreaTop: 44,
    capsuleRightGap: 200
  },

  lifetimes: {
    attached() {
      const name = this.data.brandName || ''
      const sysInfo = wx.getSystemInfoSync()
      const menuInfo = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null

      const capsuleGap = menuInfo
        ? Math.ceil((sysInfo.screenWidth - menuInfo.left + 16) * (750 / sysInfo.screenWidth))
        : 200
      this.setData({
        displayBrand: name.slice(0, 4),
        safeAreaTop: sysInfo.statusBarHeight || 44,
        capsuleRightGap: capsuleGap
      })
    }
  },

  methods: {
    onUserTap() {
      wx.showToast({ title: '打开个人中心', icon: 'none' })
    }
  }
})
