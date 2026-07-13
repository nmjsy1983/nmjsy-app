<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">我的报销</span>
      <span class="card-more">全部</span>
    </div>

    <div class="status-bar">
      <div class="status-item">
        <div class="status-num" style="color: var(--amber);">{{ stats.reimbursePending || 2 }}</div>
        <div class="status-label">审批中</div>
      </div>
      <div class="status-item">
        <div class="status-num" style="color: var(--blue);">{{ stats.reimburseApproved || 3 }}</div>
        <div class="status-label">已审批</div>
      </div>
      <div class="status-item">
        <div class="status-num" style="color: var(--lime);">{{ stats.reimbursePaid || 1 }}</div>
        <div class="status-label">已打款</div>
      </div>
    </div>

    <div class="list-scroll">
      <div v-for="(item, i) in list" :key="i" class="list-item">
        <div class="list-main">
          <div class="list-title">{{ item.title }}</div>
          <div class="list-meta">{{ item.date }} · ¥{{ formatMoney(item.amount) }}</div>
        </div>
        <div class="list-status" :class="item.status">
          {{ statusText(item.status) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ stats: { type: Object, required: true } })

const list = [
  { title: '差旅费报销', date: '07-14', amount: 1850, status: 'pending' },
  { title: '办公采购报销', date: '07-13', amount: 620, status: 'approved' },
  { title: '客户招待费', date: '07-12', amount: 1200, status: 'paid' },
  { title: '车辆油费报销', date: '07-11', amount: 800, status: 'pending' },
  { title: '设备维修费', date: '07-10', amount: 1500, status: 'approved' },
]

const statusText = (status) => {
  const map = { pending: '审批中', approved: '已审批', paid: '已打款' }
  return map[status] || status
}

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

.status-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.status-item {
  flex: 1;
  text-align: center;
  padding: 10px 6px;
  border-radius: 14px;
  background: var(--surface-2);
}

.status-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 2px;
}

.status-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.list-scroll {
  height: 220px;
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
  padding: 11px 0;
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

.list-status {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  white-space: nowrap;
}

.list-status.pending {
  background: var(--amber-soft);
  color: var(--amber);
}

.list-status.approved {
  background: var(--blue-soft);
  color: var(--blue);
}

.list-status.paid {
  background: var(--lime-soft);
  color: var(--lime);
}
</style>
