// Mock 阶段：实例与数据表
const MOCK_TABLES = [
  { name: 'new_test_enterprise', comment: '企业主体', count: 32 },
  { name: 'new_test_bill', comment: '账务', count: 156 },
  { name: 'new_test_inventory', comment: '库存', count: 48 },
]

export const getInstances = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: [
          { key: 'crm', name: '客户管理' },
          { key: 'finance', name: '财务管理' },
          { key: 'inventory', name: '库存管理' },
        ],
      })
    }, 300)
  })
}

export const getRecentTables = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: MOCK_TABLES,
      })
    }, 300)
  })
}
