<template>
  <div class="card">
    <div class="card-header">
      <span class="card-label">收支趋势</span>
      <div class="legend">
        <span class="legend-item"><i class="dot" style="background: var(--blue);" />收入</span>
        <span class="legend-item"><i class="dot" style="background: var(--danger);" />支出</span>
      </div>
    </div>

    <div class="chart-tabs">
      <button :class="{ active: scope === 'week' }" @click="scope = 'week'">本周</button>
      <button :class="{ active: scope === 'month' }" @click="scope = 'month'">本月</button>
    </div>

    <div class="chart-wrap">
      <svg viewBox="0 0 320 150" class="chart-svg">
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--blue)" stop-opacity="0.25" />
            <stop offset="100%" stop-color="var(--blue)" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--danger)" stop-opacity="0.25" />
            <stop offset="100%" stop-color="var(--danger)" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- grid lines -->
        <line x1="0" :y1="yFor(0)" x2="320" :y2="yFor(0)" class="grid-line" />
        <line x1="0" :y1="yFor(maxVal * 0.5)" x2="320" :y2="yFor(maxVal * 0.5)" class="grid-line" />
        <line x1="0" :y1="yFor(maxVal)" x2="320" :y2="yFor(maxVal)" class="grid-line" />

        <!-- area under lines -->
        <path :d="areaPath(currentData, 'income')" fill="url(#incomeGradient)" />
        <path :d="areaPath(currentData, 'expense')" fill="url(#expenseGradient)" />

        <!-- lines -->
        <path :d="linePath(currentData, 'income')" class="line income" />
        <path :d="linePath(currentData, 'expense')" class="line expense" />

        <!-- points + labels -->
        <g v-for="(item, i) in currentData" :key="`p-${i}`">
          <circle :cx="pointX(i)" :cy="yFor(item.income)" r="3" class="point income" />
          <circle :cx="pointX(i)" :cy="yFor(item.expense)" r="3" class="point expense" />
          <text
            :x="pointX(i)"
            :y="yFor(item.income) - 7"
            text-anchor="middle"
            class="value-label income"
          >{{ formatK(item.income) }}</text>
          <text
            :x="pointX(i)"
            :y="yFor(item.expense) + 13"
            text-anchor="middle"
            class="value-label expense"
          >{{ formatK(item.expense) }}</text>
          <text :x="pointX(i)" y="145" text-anchor="middle" class="chart-label">{{ item.label }}</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ stats: { type: Object, required: true } })

const scope = ref('week')

const weekData = [
  { label: '一', income: 4200, expense: 1800 },
  { label: '二', income: 5400, expense: 2100 },
  { label: '三', income: 3100, expense: 2600 },
  { label: '四', income: 6800, expense: 1500 },
  { label: '五', income: 3900, expense: 3200 },
  { label: '六', income: 7200, expense: 2800 },
  { label: '日', income: 4800, expense: 1900 },
]

const monthData = [
  { label: '1日', income: 3200, expense: 1800 },
  { label: '5日', income: 5400, expense: 2100 },
  { label: '10日', income: 4100, expense: 2600 },
  { label: '15日', income: 6800, expense: 1500 },
  { label: '20日', income: 3900, expense: 3200 },
  { label: '25日', income: 7200, expense: 2800 },
  { label: '30日', income: 4800, expense: 1900 },
]

const currentData = computed(() => (scope.value === 'week' ? weekData : monthData))

const maxVal = computed(() => {
  const all = currentData.value.flatMap((d) => [d.income, d.expense])
  return Math.max(...all, 1) * 1.25
})

const chartTop = 18
const chartBottom = 124
const chartHeight = chartBottom - chartTop

const yFor = (val) => chartBottom - (val / maxVal.value) * chartHeight

const pointX = (i) => {
  const n = currentData.value.length
  const padding = 22
  const usableW = 320 - padding * 2
  return padding + (usableW / (n - 1)) * i
}

const formatK = (num) => {
  return (num / 1000).toFixed(2) + 'k'
}

const linePath = (data, key) => {
  return data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${pointX(i)} ${yFor(d[key])}`)
    .join(' ')
}

const areaPath = (data, key) => {
  const top = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${pointX(i)} ${yFor(d[key])}`).join(' ')
  const endX = pointX(data.length - 1)
  const startX = pointX(0)
  return `${top} L ${endX} ${chartBottom} L ${startX} ${chartBottom} Z`
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

.legend {
  display: flex;
  align-items: center;
  gap: 12px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-secondary);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.chart-tabs {
  display: inline-flex;
  gap: 0;
  margin-bottom: 14px;
  background: var(--surface-2);
  border-radius: 10px;
  padding: 3px;
}

.chart-tabs button {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.chart-tabs button.active {
  background: var(--card);
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.chart-wrap {
  height: 150px;
  position: relative;
}

.chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.grid-line {
  stroke: var(--line);
  stroke-width: 1;
  stroke-dasharray: 3 3;
}

.line {
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.line.income {
  stroke: var(--blue);
}

.line.expense {
  stroke: var(--danger);
}

.point {
  stroke: var(--card);
  stroke-width: 2;
}

.point.income {
  fill: var(--blue);
}

.point.expense {
  fill: var(--danger);
}

.value-label {
  font-size: 8px;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
}

.value-label.income {
  fill: var(--blue);
}

.value-label.expense {
  fill: var(--danger);
}

.chart-label {
  font-size: 10px;
  fill: var(--text-tertiary);
  font-family: 'Noto Sans SC', sans-serif;
}
</style>
