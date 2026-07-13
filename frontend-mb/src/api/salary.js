// Mock 工资与考勤数据（后续替换为真实接口）
const now = new Date()
const year = now.getFullYear()
const month = String(now.getMonth() + 1).padStart(2, '0')

const generateAttendance = () => {
  const attendance = {}
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${month}-${String(d).padStart(2, '0')}`
    const weekday = new Date(year, now.getMonth(), d).getDay()
    // 周末休息，工作日随机出勤/请假/加班
    if (weekday === 0 || weekday === 6) {
      attendance[date] = 'rest'
    } else {
      const rand = Math.random()
      if (rand < 0.1) attendance[date] = 'leave'
      else if (rand < 0.2) attendance[date] = 'overtime'
      else attendance[date] = 'work'
    }
  }
  return attendance
}

export const getSalary = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          salaryForm: 'monthly',
          monthlySalary: 12000,
          dailySalary: 350,
          attendance: generateAttendance(),
          borrowRecords: [
            { title: '生活借支', date: `${year}-${month}-10`, amount: 2000 },
            { title: '临时借支', date: `${year}-${month}-22`, amount: 500 },
          ],
          expenseRecords: [
            { title: '工具采购', date: `${year}-${month}-05`, amount: 180 },
            { title: '交通费', date: `${year}-${month}-15`, amount: 60 },
          ],
          overtimePay: 800,
        },
      })
    }, 300)
  })
