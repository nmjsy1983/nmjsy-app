<template>
  <div class="kpi-grid">
    <div class="kpi-item">
      <div class="num" style="color: var(--blue);">{{ stats.pendingApproval }}</div>
      <div class="label">待审批</div>
    </div>
    <div class="kpi-item">
      <div class="num" style="color: var(--amber);">{{ stats.inventoryAlert }}</div>
      <div class="label">库存预警</div>
    </div>
    <div class="kpi-item">
      <div class="num" style="color: var(--lime);">{{ stats.activeCustomers }}</div>
      <div class="label">活跃客户</div>
    </div>
  </div>
</template>

<script setup>
defineProps({ stats: { type: Object, required: true } })
</script>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.kpi-item {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px 10px;
  text-align: center;
}

.kpi-item .num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.kpi-item .label {
  font-size: 11px;
  color: var(--text-secondary);
}
</style>
