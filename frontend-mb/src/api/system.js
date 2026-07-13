export const getStats = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          todayIncome: 42800,
          todayExpense: 12500,
          monthIncome: 1284000,
          monthExpense: 386000,
          pendingApproval: 4,
          inventoryAlert: 2,
          activeCustomers: 128,
          reimbursePending: 2,
          reimburseApproved: 3,
          reimbursePaid: 1,
        },
      })
    }, 300)
  })

export const getMenus = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: [
          { name: 'home', label: '首页', icon: 'HomeFilled' },
          { name: 'approval', label: '审批', icon: 'CircleCheckFilled' },
          { name: 'data', label: '数据', icon: 'Grid' },
          { name: 'profile', label: '我的', icon: 'UserFilled' },
        ],
      })
    }, 300)
  })
