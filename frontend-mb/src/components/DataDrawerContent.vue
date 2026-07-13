<template>
  <div class="drawer-body">
    <div class="drawer-header">
      <h3>数据</h3>
      <p>常用数据表与系统统计</p>
    </div>

    <div class="section-label">常用报表</div>
    <div class="menu-group">
      <div
        v-for="item in reportItems"
        :key="item.key"
        class="menu-row"
        @click="go(item.route)"
      >
        <div class="menu-row-left">
          <div class="menu-icon" :style="{ background: item.bg, color: item.color }">
            <component :is="item.icon" class="icon-svg" />
          </div>
          <div>
            <div class="menu-title">{{ item.title }}</div>
            <div class="menu-desc">{{ item.desc }}</div>
          </div>
        </div>
        <div class="chevron">›</div>
      </div>
    </div>

    <div class="section-label">最近访问</div>
    <div class="menu-group">
      <div
        v-for="table in tables"
        :key="table.name"
        class="menu-row"
        @click="go(`/data/${table.name}`)"
      >
        <div class="menu-row-left">
          <div class="menu-icon" style="background: var(--brand-soft); color: var(--brand);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div>
            <div class="menu-title">{{ table.name }}</div>
            <div class="menu-desc">{{ table.comment }} · {{ table.count }} 条记录</div>
          </div>
        </div>
        <div class="chevron">›</div>
      </div>
    </div>

    <div class="section-label">系统统计</div>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRecentTables } from '@/api/app'
import {
  TrendCharts,
  Money,
  Box,
  Document,
} from '@element-plus/icons-vue'

const emit = defineEmits(['navigate'])

const tables = ref([])
const system = ref({ instances: 12, tables: 28, menus: 5 })

const reportItems = [
  {
    key: 'project',
    title: '项目看板',
    desc: '项目进度与收支汇总',
    icon: TrendCharts,
    bg: 'var(--brand-soft)',
    color: 'var(--brand)',
    route: '/data',
  },
  {
    key: 'finance',
    title: '财务流水',
    desc: '收入、支出与报销明细',
    icon: Money,
    bg: 'var(--blue-soft)',
    color: 'var(--blue)',
    route: '/data',
  },
  {
    key: 'material',
    title: '物料流水',
    desc: '采购、领用与库存变动',
    icon: Box,
    bg: 'var(--amber-soft)',
    color: 'var(--amber)',
    route: '/data',
  },
  {
    key: 'report',
    title: '统计报表',
    desc: '月度汇总与趋势分析',
    icon: Document,
    bg: 'var(--purple-soft)',
    color: 'var(--purple)',
    route: '/data',
  },
]

const go = (route) => {
  emit('navigate', route)
}

onMounted(async () => {
  const res = await getRecentTables()
  if (res.data) tables.value = res.data
})
</script>

<style scoped>
.drawer-body {
  padding: 0 16px calc(24px + var(--safe-bottom));
}

.drawer-header {
  padding: 8px 4px 16px;
}

.drawer-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--text);
}

.drawer-header p {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--text-tertiary);
}

.section-label {
  margin: 18px 4px 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.menu-group {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
}

.menu-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: background 0.15s;
}

.menu-row:last-child {
  border-bottom: none;
}

.menu-row:active {
  background: var(--surface-2);
}

.menu-row-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  width: 36px;
  height: 36px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.icon-svg {
  width: 19px;
  height: 19px;
}

.menu-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
}

.menu-desc {
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
  gap: 10px;
}

.kpi-item {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 14px 8px;
  text-align: center;
  opacity: 1;
  animation: cardIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.kpi-item .num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 3px;
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
