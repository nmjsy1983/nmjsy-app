Page({
  data: {
    queryGroups: [
      {
        title: '业务查询',
        items: [
          { key: 'projects', name: '项目查询', icon: '项', color: '#2563eb', bg: '#dbeafe' },
          { key: 'finance', name: '财务流水', icon: '财', color: '#16a34a', bg: '#dcfce7' },
          { key: 'materials', name: '物料台账', icon: '物', color: '#d97706', bg: '#fef3c7' },
          { key: 'workers', name: '人员记工', icon: '工', color: '#c2410c', bg: '#fff7ed' }
        ]
      },
      {
        title: '审批查询',
        items: [
          { key: 'pending', name: '待我审批', icon: '审', color: '#8b5cf6', bg: '#ede9fe' },
          { key: 'approved', name: '已审记录', icon: '记', color: '#0891b2', bg: '#cffafe' },
          { key: 'reimburse', name: '我的报销', icon: '报', color: '#db2777', bg: '#fce7f3' },
          { key: 'leave', name: '请假记录', icon: '假', color: '#65a30d', bg: '#ecfccb' }
        ]
      },
      {
        title: '数据分析',
        items: [
          { key: 'kpi', name: '关键指标', icon: '指', color: '#c2410c', bg: '#fff7ed' },
          { key: 'trend', name: '收支趋势', icon: '势', color: '#2563eb', bg: '#dbeafe' },
          { key: 'cost', name: '成本分析', icon: '本', color: '#16a34a', bg: '#dcfce7' },
          { key: 'report', name: '报表中心', icon: '表', color: '#d97706', bg: '#fef3c7' }
        ]
      }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  onItemTap(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({ title: `打开 ${name}`, icon: 'none' })
  }
})
