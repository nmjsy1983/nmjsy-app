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
    dateStr: '',
    weekStr: '',
    lunarStr: '',
    weather: '晴 26°C',
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
    },
    notices: [
      { id: 1, title: '关于 7 月份报销截止日期的通知', time: '今天 09:30' },
      { id: 2, title: 'A 项目工期调整，请及时更新记工记录', time: '昨天 16:45' },
      { id: 3, title: '新员工入职培训安排', time: '2026-07-12' }
    ]
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
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const lunar = require('../../utils/lunar.js').solarToLunar(d)
    this.setData({
      dateStr: `${months[d.getMonth()]}${d.getDate()}日`,
      weekStr: weeks[d.getDay()],
      lunarStr: lunar.text,
      weather: '晴 26°C',
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
  },

  onNoticeTap(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: `查看公告 ${id}`, icon: 'none' })
  }
})
