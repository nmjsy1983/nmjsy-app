Page({
  data: {
    quickReports: [
      { name: '日报', path: '' },
      { name: '周报', path: '' },
      { name: '报销', path: '' }
    ],
    cards: [
      {
        key: 'notice',
        title: '通知公告',
        icon: '📢',
        content: '今日无新公告',
        color: '#2563eb',
        bg: '#dbeafe'
      },
      {
        key: 'todo',
        title: '待办事项',
        icon: '✓',
        content: '您有 3 条待审批记录',
        color: '#16a34a',
        bg: '#dcfce7'
      },
      {
        key: 'sentence',
        title: '一句话记工',
        icon: '🎤',
        content: '试试说："今天在 A 项目干了 8 个工"',
        color: '#c2410c',
        bg: '#fff7ed'
      }
    ]
  },

  onLoad() {
    console.log('home loaded')
  },

  onReportTap(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({
      title: `打开${name}`,
      icon: 'none'
    })
  },

  onCardTap(e) {
    const key = e.currentTarget.dataset.key
    wx.showToast({
      title: `点击了 ${key}`,
      icon: 'none'
    })
  }
})
