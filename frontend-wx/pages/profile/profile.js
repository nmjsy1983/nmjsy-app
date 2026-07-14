Page({
  data: {
    userInfo: {
      name: '管理员',
      phone: '138****8888',
      role: '项目经理'
    },
    menuGroups: [
      {
        title: '财务',
        items: [
          { key: 'salary', title: '工资查询', desc: '查看月度工资明细', icon: '💰', bg: '#dcfce7', color: '#16a34a' },
          { key: 'reimburse', title: '我的报销', desc: '报销记录与进度', icon: '📄', bg: '#fff7ed', color: '#c2410c' }
        ]
      },
      {
        title: '个人',
        items: [
          { key: 'info', title: '我的资料', desc: '个人信息与账户安全', icon: '👤', bg: '#dbeafe', color: '#2563eb' },
          { key: 'settings', title: '我的设置', desc: '通知、密码、偏好', icon: '⚙️', bg: '#e7e5e4', color: '#57534e' }
        ]
      }
    ]
  },

  onMenuTap(e) {
    const key = e.currentTarget.dataset.key
    wx.showToast({ title: `点击了 ${key}`, icon: 'none' })
  },

  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  }
})
