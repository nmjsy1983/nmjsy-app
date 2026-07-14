Page({
  data: {
    recentRecords: [
      { type: '记工', desc: 'A 项目 8 工时', time: '今天 08:30' },
      { type: '报销', desc: '打车费 ¥45', time: '昨天 18:20' }
    ],
    buttons: [
      { key: 'worker', name: '人员记工', icon: '工', color: '#2563eb', bg: '#dbeafe' },
      { key: 'expense', name: '费用报销', icon: '报', color: '#16a34a', bg: '#dcfce7' },
      { key: 'account', name: '快速记账', icon: '账', color: '#d97706', bg: '#fef3c7' },
      { key: 'leave', name: '请假申请', icon: '假', color: '#c2410c', bg: '#fff7ed' },
      { key: 'material', name: '材料入库', icon: '材', color: '#8b5cf6', bg: '#ede9fe' },
      { key: 'voice', name: '语音录入', icon: '语', color: '#0891b2', bg: '#cffafe' },
      { key: 'photo', name: '拍照凭证', icon: '拍', color: '#db2777', bg: '#fce7f3' },
      { key: 'more', name: '更多', icon: '+', color: '#65a30d', bg: '#ecfccb' }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  onButtonTap(e) {
    const key = e.currentTarget.dataset.key
    const name = e.currentTarget.dataset.name
    wx.showToast({ title: `打开 ${name}`, icon: 'none' })
  },

  onRecentTap(e) {
    const index = e.currentTarget.dataset.index
    wx.showToast({ title: `查看记录 ${index + 1}`, icon: 'none' })
  }
})
