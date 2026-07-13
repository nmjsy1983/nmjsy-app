// Mock 阶段：审批数据
const MOCK_APPROVALS = [
  {
    id: 1,
    type: '报销申请',
    applicant: '张婷',
    amount: 2400,
    time: '09:42',
    status: 'pending',
    accent: 'amber',
  },
  {
    id: 2,
    type: '报销申请',
    applicant: '李明',
    amount: 580,
    time: '09:15',
    status: 'pending',
    accent: 'amber',
  },
  {
    id: 3,
    type: '采购订单',
    applicant: '王芳',
    amount: 3200,
    desc: '硒鼓 T-203 × 10',
    time: '08:50',
    status: 'urgent',
    accent: 'danger',
  },
  {
    id: 4,
    type: '人事异动',
    applicant: '赵强',
    desc: '调岗',
    time: '昨天',
    status: 'pending',
    accent: 'blue',
  },
]

export const getApprovals = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: MOCK_APPROVALS,
      })
    }, 300)
  })
}
