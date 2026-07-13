<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">财务流水</span>
      <span class="card-more">全部</span>
    </div>
    <div class="list-scroll">
      <div v-for="(item, i) in list" :key="i" class="list-item">
        <div class="list-main">
          <div class="list-title">{{ item.title }}</div>
          <div class="list-meta">{{ item.date }} · {{ item.category }}</div>
        </div>
        <div class="list-amount" :class="item.type">{{ item.type === 'income' ? '+' : '-' }}¥{{ formatMoney(item.amount) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = [
  { title: '项目A回款', date: '07-14', category: '项目收入', type: 'income', amount: 15000 },
  { title: '钢材采购', date: '07-14', category: '材料支出', type: 'expense', amount: 8200 },
  { title: '办公用品', date: '07-13', category: '日常支出', type: 'expense', amount: 560 },
  { title: '项目B进度款', date: '07-13', category: '项目收入', type: 'income', amount: 28000 },
  { title: '水泥采购', date: '07-12', category: '材料支出', type: 'expense', amount: 4300 },
  { title: '员工报销', date: '07-12', category: '人工支出', type: 'expense', amount: 1200 },
  { title: '设备租赁', date: '07-11', category: '机械支出', type: 'expense', amount: 2500 },
  { title: '项目C尾款', date: '07-10', category: '项目收入', type: 'income', amount: 12000 },
  { title: '运费结算', date: '07-10', category: '运输支出', type: 'expense', amount: 1800 },
  { title: '设计费', date: '07-09', category: '服务收入', type: 'income', amount: 6000 },
]

const formatMoney = (num) => {
  return Number(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
  height: 320px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.list-scroll::-webkit-scrollbar {
  display: none;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.list-item:last-child {
  border-bottom: none;
}

.list-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 3px;
}

.list-meta {
  font-size: 11px;
  color: var(--text-tertiary);
}

.list-amount {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.list-amount.income {
  color: var(--brand);
}

.list-amount.expense {
  color: var(--danger);
}
</style>
