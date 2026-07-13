<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">本月收支</span>
      <span class="card-more">查看详情 →</span>
    </div>
    <div class="summary-stack">
      <div class="stack-row">
        <div class="stack-label">收入</div>
        <div class="stack-value" style="color: var(--brand);">¥{{ formatMoney(stats.monthIncome) }}</div>
      </div>
      <div class="stack-divider" />
      <div class="stack-row">
        <div class="stack-label">支出</div>
        <div class="stack-value" style="color: var(--danger);">¥{{ formatMoney(stats.monthExpense) }}</div>
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

.summary-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stack-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.stack-label {
  font-size: 13px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.stack-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stack-divider {
  height: 1px;
  background: var(--line);
}
</style>
