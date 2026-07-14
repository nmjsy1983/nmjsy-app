const cardMap = {
  today: { title: '今日收支', type: 'summary' },
  month: { title: '本月收支', type: 'summary' },
  kpi: { title: '关键指标', type: 'kpi' },
  sentence: { title: '一句话记录', type: 'sentence' },
  trend: { title: '收支趋势', type: 'trend' },
  finance: { title: '财务流水', type: 'list' },
  worker: { title: '人员记工', type: 'list' },
  reimbursement: { title: '我的报销', type: 'list' }
}

const allCardKeys = Object.keys(cardMap)

Page({
  data: {
    userName: '管理员',
    today: '',
    isEditing: false,
    visibleCards: [...allCardKeys],
    hiddenCards: [],
    cardMap,
    stats: {
      todayIncome: 42800,
      todayExpense: 12500,
      monthIncome: 1284000,
      monthExpense: 386000,
      pendingApproval: 4,
      inventoryAlert: 2,
      activeCustomers: 128,
      reimbursePending: 2,
      reimburseApproved: 3,
      reimbursePaid: 1
    }
  },

  onLoad() {
    this.updateToday()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  updateToday() {
    const d = new Date()
    const weeks = ['日', '一', '二', '三', '四', '五', '六']
    this.setData({
      today: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weeks[d.getDay()]}`,
      userName: '管理员'
    })
  },

  toggleEdit() {
    this.setData({ isEditing: !this.data.isEditing })
  },

  moveUp(e) {
    const index = e.currentTarget.dataset.index
    if (index === 0) return
    const arr = [...this.data.visibleCards]
    const temp = arr[index - 1]
    arr[index - 1] = arr[index]
    arr[index] = temp
    this.setData({ visibleCards: arr })
  },

  moveDown(e) {
    const index = e.currentTarget.dataset.index
    if (index === this.data.visibleCards.length - 1) return
    const arr = [...this.data.visibleCards]
    const temp = arr[index + 1]
    arr[index + 1] = arr[index]
    arr[index] = temp
    this.setData({ visibleCards: arr })
  },

  hideCard(e) {
    const key = e.currentTarget.dataset.key
    const visible = this.data.visibleCards.filter(k => k !== key)
    const hidden = [...this.data.hiddenCards, key]
    this.setData({ visibleCards: visible, hiddenCards: hidden })
  },

  showCard(e) {
    const key = e.currentTarget.dataset.key
    const hidden = this.data.hiddenCards.filter(k => k !== key)
    const visible = [...this.data.visibleCards, key]
    this.setData({ visibleCards: visible, hiddenCards: hidden })
  },

  restoreLayout() {
    this.setData({ visibleCards: [...allCardKeys], hiddenCards: [] })
  },

  onCardTap(e) {
    const key = e.currentTarget.dataset.key
    if (this.data.isEditing) return
    wx.showToast({ title: `打开 ${cardMap[key].title}`, icon: 'none' })
  }
})
