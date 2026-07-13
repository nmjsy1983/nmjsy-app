<template>
  <div class="data-view">
    <div class="content">
      <div class="page-title">
        <h2>数据看板</h2>
        <div class="page-subtitle">常用数据表与系统统计</div>
      </div>

      <div class="section-title">最近访问</div>
      <div class="menu-list">
        <div v-for="table in tables" :key="table.name" class="menu-item">
          <div class="menu-item-left">
            <div class="menu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div>
              <div class="menu-item-title">{{ table.name }}</div>
              <div class="menu-item-desc">{{ table.comment }} · {{ table.count }} 条记录</div>
            </div>
          </div>
          <div class="chevron">›</div>
        </div>
      </div>

      <div class="section-title">系统统计</div>
      <div class="kpi-grid">
        <div class="kpi-item" style="animation-delay: 0.05s;">
          <div class="num" style="color: var(--brand);">{{ system.instances }}</div>
          <div class="label">应用实例</div>
        </div>
        <div class="kpi-item" style="animation-delay: 0.1s;">
          <div class="num" style="color: var(--purple);">{{ system.tables }}</div>
          <div class="label">数据表</div>
        </div>
        <div class="kpi-item" style="animation-delay: 0.15s;">
          <div class="num" style="color: var(--pink);">{{ system.menus }}</div>
          <div class="label">菜单项</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRecentTables } from '@/api/app'

const tables = ref([])
const system = ref({ instances: 12, tables: 28, menus: 5 })

onMounted(async () => {
  const res = await getRecentTables()
  if (res.data) tables.value = res.data
})
</script>

<style scoped>
.data-view {
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

.section-title {
  margin: 20px 16px 14px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.menu-list {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  margin: 0 16px 16px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: background 0.15s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background: var(--surface-2);
}

.menu-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--brand-soft);
  color: var(--brand);
  display: grid;
  place-items: center;
}

.menu-item-title {
  font-weight: 500;
  color: var(--text);
}

.menu-item-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.chevron {
  color: var(--text-tertiary);
  font-size: 20px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0 16px 16px;
}

.kpi-item {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px 10px;
  text-align: center;
  opacity: 1;
  animation: cardIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
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

@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
