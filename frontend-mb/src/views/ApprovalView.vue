<template>
  <div class="approval-view">
    <div class="content">
      <div class="page-title">
        <h2>待办审批</h2>
        <div class="page-subtitle">{{ approvals.length }} 项等待处理</div>
      </div>

      <div
        v-for="(item, index) in approvals"
        :key="item.id"
        class="approval-item"
        :style="{ '--accent': `var(--${item.accent})`, animationDelay: `${index * 0.05}s` }"
      >
        <div class="approval-top">
          <div>
            <div class="approval-title">{{ item.type }}</div>
            <div class="approval-meta">
              <span>{{ item.applicant }}</span>
              <span>·</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="approval-amount">{{ item.amount ? `¥ ${item.amount.toLocaleString()}` : item.desc }}</div>
        </div>
        <div class="approval-actions">
          <button class="btn-pill danger" @click="handleReject(item)">拒绝</button>
          <button class="btn-pill primary" @click="handleApprove(item)">通过</button>
        </div>
      </div>

      <div v-if="approvals.length === 0" class="empty">
        <div class="empty-icon">✓</div>
        <div class="empty-text">暂无待办审批</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getApprovals } from '@/api/approval'

const approvals = ref([])

const handleApprove = (item) => {
  approvals.value = approvals.value.filter((a) => a.id !== item.id)
}

const handleReject = (item) => {
  approvals.value = approvals.value.filter((a) => a.id !== item.id)
}

onMounted(async () => {
  const res = await getApprovals()
  if (res.data) approvals.value = res.data
})
</script>

<style scoped>
.approval-view {
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

.page-title {
  margin: 0 16px 18px;
}

.page-title h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--text);
}

.page-subtitle {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.approval-item {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  margin: 0 16px 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 1;
  animation: cardIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.approval-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent, var(--amber));
}

.approval-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.approval-title {
  font-weight: 600;
  font-size: 15px;
  color: var(--text);
}

.approval-amount {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: var(--text);
  font-size: 15px;
}

.approval-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.approval-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.btn-pill {
  flex: 1;
  padding: 10px 0;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--surface-2);
  color: var(--text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pill.primary {
  background: var(--brand);
  color: #ffffff;
  border-color: transparent;
}

.btn-pill.primary:active {
  background: var(--brand-light);
}

.btn-pill.danger {
  color: var(--danger);
  border-color: var(--line);
  background: var(--surface-2);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.empty-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand);
  display: grid;
  place-items: center;
  font-size: 24px;
  margin-bottom: 12px;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
