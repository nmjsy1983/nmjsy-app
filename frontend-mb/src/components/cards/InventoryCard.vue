<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">库存预警</span>
      <span class="card-more">全部</span>
    </div>
    <div class="alert-item">
      <span class="alert-name">A4 打印纸</span>
      <span class="alert-stock warn">余 12</span>
    </div>
    <div class="alert-item">
      <span class="alert-name">硒鼓 T-203</span>
      <span class="alert-stock low">余 2</span>
    </div>
  </div>
</template>

<script setup>
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

.alert-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.alert-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.alert-item:first-child {
  padding-top: 0;
}

.alert-name {
  font-weight: 500;
}

.alert-stock {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
}

.alert-stock.low {
  color: var(--danger);
}

.alert-stock.warn {
  color: var(--amber);
}
</style>
