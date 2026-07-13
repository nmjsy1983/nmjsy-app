<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">物料流水</span>
      <span class="card-more">全部</span>
    </div>
    <div class="list-scroll">
      <div v-for="(item, i) in list" :key="i" class="list-item">
        <div class="list-main">
          <div class="list-title">{{ item.name }}</div>
          <div class="list-meta">{{ item.date }} · {{ item.project }} · {{ item.operator }}</div>
        </div>
        <div class="list-qty">{{ item.type === 'in' ? '+' : '-' }}{{ item.quantity }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = [
  { name: '螺纹钢 HRB400', date: '07-14', project: '项目A', operator: '张三', type: 'in', quantity: 120 },
  { name: '水泥 P.O 42.5', date: '07-14', project: '项目B', operator: '李四', type: 'out', quantity: 50 },
  { name: '砂石料', date: '07-13', project: '项目A', operator: '王五', type: 'in', quantity: 80 },
  { name: '模板', date: '07-13', project: '项目C', operator: '赵六', type: 'out', quantity: 30 },
  { name: '焊条', date: '07-12', project: '项目A', operator: '张三', type: 'out', quantity: 15 },
  { name: '电线电缆', date: '07-12', project: '项目B', operator: '李四', type: 'in', quantity: 25 },
  { name: 'PVC管', date: '07-11', project: '项目C', operator: '王五', type: 'out', quantity: 60 },
  { name: '防水材料', date: '07-10', project: '项目A', operator: '赵六', type: 'in', quantity: 40 },
  { name: '涂料', date: '07-10', project: '项目B', operator: '张三', type: 'out', quantity: 18 },
  { name: '钢筋调直', date: '07-09', project: '项目C', operator: '李四', type: 'in', quantity: 90 },
]
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

.list-qty {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}
</style>
