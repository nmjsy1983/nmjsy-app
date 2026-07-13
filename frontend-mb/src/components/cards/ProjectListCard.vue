<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">项目列表</span>
      <span class="card-more">全部</span>
    </div>

    <div class="list-scroll">
      <div v-for="(item, i) in list" :key="i" class="project-item">
        <div class="project-title-row">
          <div class="project-name">{{ item.name }}</div>
          <div class="project-start">{{ item.startDate }} 开工</div>
        </div>

        <div class="project-money">
          <span class="money-block income">
            <span class="money-label">回款</span>
            <span class="money-value">¥{{ formatMoney(item.received) }}</span>
          </span>
          <span class="money-block expense">
            <span class="money-label">支出</span>
            <span class="money-value">¥{{ formatMoney(item.spent) }}</span>
          </span>
        </div>

        <div class="cost-row">
          <div class="cost-block">
            <span class="cost-label">材料</span>
            <span class="cost-values">
              <span class="budget">预 ¥{{ formatK(item.materialBudget) }}</span>
              <span class="actual">实 ¥{{ formatK(item.materialActual) }}</span>
            </span>
          </div>
          <div class="cost-block">
            <span class="cost-label">人工</span>
            <span class="cost-values">
              <span class="budget">预 ¥{{ formatK(item.laborBudget) }}</span>
              <span class="actual">实 ¥{{ formatK(item.laborActual) }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = [
  { name: '项目A', startDate: '07-01', received: 150000, spent: 82000, materialBudget: 60000, materialActual: 52000, laborBudget: 30000, laborActual: 28000 },
  { name: '项目B', startDate: '06-20', received: 280000, spent: 145000, materialBudget: 100000, materialActual: 98000, laborBudget: 50000, laborActual: 45000 },
  { name: '项目C', startDate: '06-10', received: 80000, spent: 62000, materialBudget: 40000, materialActual: 42000, laborBudget: 20000, laborActual: 19000 },
  { name: '项目D', startDate: '05-28', received: 320000, spent: 210000, materialBudget: 150000, materialActual: 145000, laborBudget: 70000, laborActual: 62000 },
  { name: '项目E', startDate: '05-15', received: 95000, spent: 48000, materialBudget: 35000, materialActual: 30000, laborBudget: 15000, laborActual: 17000 },
]

const formatMoney = (num) => {
  return Number(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatK = (num) => {
  return (num / 1000).toFixed(1) + 'k'
}
</script>

<style scoped>
.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 18px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.card-more {
  font-size: 12px;
  color: var(--brand);
  font-weight: 500;
}

.list-scroll {
  height: 360px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.list-scroll::-webkit-scrollbar {
  display: none;
}

.project-item {
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.project-item:last-child {
  border-bottom: none;
}

.project-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.project-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}

.project-start {
  font-size: 11px;
  color: var(--text-tertiary);
}

.project-money {
  display: flex;
  gap: 14px;
  margin-bottom: 10px;
}

.money-block {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.money-label {
  font-size: 11px;
  color: var(--text-tertiary);
}

.money-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
}

.money-block.income .money-value {
  color: var(--brand);
}

.money-block.expense .money-value {
  color: var(--danger);
}

.cost-row {
  display: flex;
  gap: 16px;
}

.cost-block {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--surface-2);
  flex: 1;
}

.cost-label {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 600;
}

.cost-values {
  display: flex;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
}

.budget {
  color: var(--text-tertiary);
}

.actual {
  color: var(--text);
  font-weight: 600;
}
</style>
