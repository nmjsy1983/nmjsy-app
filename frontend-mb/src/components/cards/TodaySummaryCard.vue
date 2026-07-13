<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">今日收支</span>
      <span class="card-more">查看详情 →</span>
    </div>
    <div class="summary-row">
      <div class="summary-item">
        <div class="summary-value" style="color: var(--brand);">¥{{ formatMoney(stats.todayIncome) }}</div>
        <div class="summary-label">收入</div>
      </div>
      <div class="summary-divider" />
      <div class="summary-item">
        <div class="summary-value" style="color: var(--danger);">¥{{ formatMoney(stats.todayExpense) }}</div>
        <div class="summary-label">支出</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ stats: { type: Object, required: true } })

const formatMoney = (num) => {
  const n = Number(num) || 0
  return n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
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

.summary-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.summary-item {
  flex: 1;
  min-width: 0;
}

.summary-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.summary-divider {
  width: 1px;
  height: 32px;
  background: var(--line);
}
</style>
