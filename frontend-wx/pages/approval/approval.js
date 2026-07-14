Page({
  data: {
    tabs: [
      { key: 'pending', name: '待审批', count: 3 },
      { key: 'processed', name: '已审批', count: 0 },
      { key: 'initiated', name: '我发起的', count: 0 }
    ],
    activeTab: 'pending',
    list: [
      { id: 1, title: '报销申请 - 差旅费', applicant: '张三', time: '2026-07-14', amount: '¥ 580.00', status: 'pending' },
      { id: 2, title: '请假申请 - 事假', applicant: '李四', time: '2026-07-13', amount: '', status: 'pending' },
      { id: 3, title: '采购申请 - 办公用品', applicant: '王五', time: '2026-07-12', amount: '¥ 1,250.00', status: 'pending' }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  onTabTap(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ activeTab: key })
  },

  onItemTap(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: `查看审批 ${id}`, icon: 'none' })
  }
})
