<template>
  <div class="salary-view">
    <div class="content">
      <div class="page-header">
        <div class="back-btn" @click="router.back()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <h2>工资查询</h2>
        <div class="spacer" />
      </div>

      <!-- 工资形式 -->
      <div class="card salary-form-card">
        <div class="section-title">我的工资形式</div>
        <div class="form-tabs">
          <div
            class="form-tab"
            :class="{ active: salaryForm === 'monthly' }"
            @click="salaryForm = 'monthly'"
          >
            <div class="form-label">月工资</div>
            <div class="form-value">{{ formatMoney(monthlySalary) }}</div>
          </div>
          <div
            class="form-tab"
            :class="{ active: salaryForm === 'daily' }"
            @click="salaryForm = 'daily'"
          >
            <div class="form-label">日工资</div>
            <div class="form-value">{{ formatMoney(dailySalary) }}</div>
          </div>
        </div>
        <div class="form-hint">当前按{{ salaryForm === 'monthly' ? '月固定薪资' : '日出勤计薪' }}结算</div>
      </div>

      <!-- 考勤日历 -->
      <div class="card calendar-card">
        <div class="calendar-header">
          <div class="section-title">考勤记录</div>
          <div class="month-nav">
            <span @click="changeMonth(-1)">‹</span>
            <span class="month-label">{{ currentYear }}年{{ currentMonth + 1 }}月</span>
            <span @click="changeMonth(1)">›</span>
          </div>
        </div>
        <div class="weekdays">
          <span v-for="d in weekdays" :key="d">{{ d }}</span>
        </div>
        <div class="days">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="day-cell"
            :class="{
              'is-empty': !day.date,
              'is-today': day.isToday,
              [day.status]: day.status,
            }"
          >
            <div class="day-cell-inner">
              <template v-if="day.date">
                <span class="day-num">{{ day.date }}</span>
                <span class="day-dot" v-if="day.status" />
              </template>
            </div>
          </div>
        </div>
        <div class="calendar-legend">
          <span class="legend-dot work" />出勤
          <span class="legend-dot rest" />休息
          <span class="legend-dot leave" />请假
          <span class="legend-dot overtime" />加班
        </div>
      </div>

      <!-- 考勤明细 -->
      <div class="card stats-card">
        <div class="section-title">考勤明细</div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-num">{{ summary.workDays }}天</div>
            <div class="stat-label">出勤天数</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">{{ summary.restDays }}天</div>
            <div class="stat-label">休息天数</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">{{ summary.leaveDays }}天</div>
            <div class="stat-label">请假天数</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">{{ summary.overtimeDays }}天</div>
            <div class="stat-label">加班天数</div>
          </div>
        </div>
      </div>

      <!-- 借支开支 -->
      <div class="card records-card">
        <div class="section-title">借支 / 开支记录</div>
        <div class="records-list">
          <div
            v-for="(record, index) in borrowAndExpenseRecords"
            :key="index"
            class="record-row"
          >
            <div class="record-left">
              <div class="record-icon" :class="record.type">
                <svg v-if="record.type === 'borrow'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M16 8h-6a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H8" />
                </svg>
              </div>
              <div>
                <div class="record-title">{{ record.title }}</div>
                <div class="record-date">{{ record.date }}</div>
              </div>
            </div>
            <div class="record-amount" :class="record.type">
              -{{ formatMoney(record.amount) }}
            </div>
          </div>
        </div>
        <div class="records-total">
          <span>借支 & 开支合计</span>
          <span class="total-amount">{{ formatMoney(totalDeduction) }}</span>
        </div>
      </div>

      <!-- 本月应发工资 -->
      <div class="card payable-card">
        <div class="payable-label">本月应发工资</div>
        <div class="payable-value">{{ formatMoney(payableSalary) }}</div>
        <div class="payable-formula">
          {{ salaryForm === 'monthly' ? '按月固定' : '按日出勤' }}：{{ formatMoney(baseSalary) }} - 借支 {{ formatMoney(totalBorrow) }} - 开支 {{ formatMoney(totalExpense) }} = {{ formatMoney(payableSalary) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSalary } from '@/api/salary'

const router = useRouter()

const salaryForm = ref('monthly')
const monthlySalary = ref(12000)
const dailySalary = ref(350)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const attendance = ref({})
const borrowRecords = ref([])
const expenseRecords = ref([])
const overtimePay = ref(0)

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startWeekday = firstDay.getDay()
  const today = new Date()

  const cells = []
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ date: null })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const status = attendance.value[dateStr] || 'rest'
    cells.push({
      date: d,
      status,
      isToday: year === today.getFullYear() && month === today.getMonth() && d === today.getDate(),
    })
  }
  return cells
})

const summary = computed(() => {
  const values = Object.values(attendance.value)
  return {
    workDays: values.filter((s) => s === 'work').length,
    restDays: values.filter((s) => s === 'rest').length,
    leaveDays: values.filter((s) => s === 'leave').length,
    overtimeDays: values.filter((s) => s === 'overtime').length,
  }
})

const totalBorrow = computed(() => {
  return borrowRecords.value.reduce((sum, r) => sum + r.amount, 0)
})

const totalExpense = computed(() => {
  return expenseRecords.value.reduce((sum, r) => sum + r.amount, 0)
})

const totalDeduction = computed(() => totalBorrow.value + totalExpense.value)

const baseSalary = computed(() => {
  if (salaryForm.value === 'monthly') return monthlySalary.value
  return dailySalary.value * summary.value.workDays
})

const payableSalary = computed(() => {
  return baseSalary.value - totalDeduction.value + overtimePay.value
})

const borrowAndExpenseRecords = computed(() => {
  const list = [
    ...borrowRecords.value.map((r) => ({ ...r, type: 'borrow' })),
    ...expenseRecords.value.map((r) => ({ ...r, type: 'expense' })),
  ]
  return list.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const changeMonth = (delta) => {
  const d = new Date(currentYear.value, currentMonth.value + delta, 1)
  currentYear.value = d.getFullYear()
  currentMonth.value = d.getMonth()
}

const formatMoney = (num) => {
  return Number(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(async () => {
  const res = await getSalary()
  if (res.data) {
    salaryForm.value = res.data.salaryForm || 'monthly'
    monthlySalary.value = res.data.monthlySalary || 12000
    dailySalary.value = res.data.dailySalary || 350
    attendance.value = res.data.attendance || {}
    borrowRecords.value = res.data.borrowRecords || []
    expenseRecords.value = res.data.expenseRecords || []
    overtimePay.value = res.data.overtimePay || 0
  }
})
</script>

<style scoped>
.salary-view {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

.content {
  padding-top: 12px;
  padding-bottom: calc(84px + var(--safe-bottom));
}

.page-header {
  display: flex;
  align-items: center;
  margin: 0 16px 18px;
}

.back-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--surface-2);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.15s;
}

.back-btn:active {
  background: var(--line);
}

.page-header h2 {
  flex: 1;
  text-align: center;
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--text);
}

.spacer {
  width: 34px;
}

.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  margin: 0 16px 14px;
  padding: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 12px;
}

.salary-form-card {
  padding: 16px;
}

.form-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

.form-tab {
  padding: 14px;
  border-radius: 16px;
  border: 1.5px solid var(--line);
  background: var(--surface-2);
  cursor: pointer;
  transition: all 0.18s;
  text-align: center;
}

.form-tab.active {
  background: var(--brand-soft);
  border-color: var(--brand);
}

.form-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.form-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
}

.form-tab.active .form-value {
  color: var(--brand);
}

.form-hint {
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: center;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.calendar-header .section-title {
  margin-bottom: 0;
}

.month-nav {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--surface-2);
  border-radius: 10px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.month-nav span {
  cursor: pointer;
  padding: 0 4px;
  color: var(--text-secondary);
}

.month-label {
  color: var(--text) !important;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 6px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.day-cell {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  border-radius: 12px;
  background: var(--surface-2);
  font-size: 13px;
  color: var(--text);
}

.day-cell.is-empty {
  background: transparent;
}

.day-cell-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-radius: 12px;
}

.day-cell.is-today .day-num {
  color: var(--brand);
  font-weight: 800;
}

.day-cell.work .day-cell-inner {
  background: var(--brand-soft);
  color: var(--brand);
  font-weight: 700;
}

.day-cell.leave .day-cell-inner {
  background: var(--danger-soft);
  color: var(--danger);
}

.day-cell.overtime .day-cell-inner {
  background: var(--blue-soft);
  color: var(--blue);
}

.day-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}

.calendar-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 14px;
  font-size: 11px;
  color: var(--text-secondary);
}

.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}

.legend-dot.work { background: var(--brand); }
.legend-dot.rest { background: var(--line-strong); }
.legend-dot.leave { background: var(--danger); }
.legend-dot.overtime { background: var(--blue); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.stat-item {
  text-align: center;
  padding: 12px 6px;
  border-radius: 14px;
  background: var(--surface-2);
}

.stat-num {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 3px;
}

.stat-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.records-list {
  display: flex;
  flex-direction: column;
}

.record-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.record-row:last-child {
  border-bottom: none;
}

.record-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.record-icon {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.record-icon.borrow {
  background: var(--danger-soft);
  color: var(--danger);
}

.record-icon.expense {
  background: var(--amber-soft);
  color: var(--amber);
}

.record-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.record-date {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.record-amount {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
}

.record-amount.borrow {
  color: var(--danger);
}

.record-amount.expense {
  color: var(--amber);
}

.records-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
  font-size: 13px;
  color: var(--text-secondary);
}

.records-total .total-amount {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 800;
  color: var(--danger);
}

.payable-card {
  background: linear-gradient(135deg, var(--brand-soft) 0%, #ffffff 100%);
  border-color: var(--brand);
  text-align: center;
  padding: 22px 16px;
}

.payable-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.payable-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 36px;
  font-weight: 900;
  color: var(--brand);
  margin-bottom: 8px;
}

.payable-formula {
  font-size: 11px;
  color: var(--text-tertiary);
}
</style>
