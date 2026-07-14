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
    links: [
      { name: '项目', path: '/pages/data/data' },
      { name: '财务', path: '/pages/data/data' },
      { name: '物料', path: '/pages/data/data' }
    ]
  },

  lifetimes: {
    attached() {
      const name = this.data.brandName || ''
      this.setData({ displayBrand: name.slice(0, 4) })
    }
  },

  methods: {
    onLinkTap(e) {
      const path = e.currentTarget.dataset.path
      wx.switchTab({ url: path })
    }
  }
})
