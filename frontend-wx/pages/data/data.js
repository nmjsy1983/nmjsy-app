Page({
  data: {
    modules: [
      { name: '记工统计', icon: '👷', color: '#2563eb', bg: '#dbeafe' },
      { name: '报销统计', icon: '💰', color: '#16a34a', bg: '#dcfce7' },
      { name: '项目成本', icon: '📊', color: '#d97706', bg: '#fef3c7' },
      { name: '人员绩效', icon: '📈', color: '#c2410c', bg: '#fff7ed' },
      { name: '考勤分析', icon: '📅', color: '#8b5cf6', bg: '#ede9fe' },
      { name: '财务报表', icon: '📑', color: '#0891b2', bg: '#cffafe' },
      { name: '材料管理', icon: '📦', color: '#db2777', bg: '#fce7f3' },
      { name: '设备台账', icon: '🔧', color: '#65a30d', bg: '#ecfccb' }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  onModuleTap(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({ title: `打开 ${name}`, icon: 'none' })
  }
})
