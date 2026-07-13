<template>
  <div class="home-view">
    <div class="content">
      <div class="page-title">
        <div>
          <h2>早安，{{ userStore.user?.nickname || '管理员' }}</h2>
          <div class="page-subtitle">{{ today }}</div>
        </div>
        <button class="edit-btn" @click="toggleEdit">
          {{ isEditing ? '完成' : '编辑' }}
        </button>
      </div>

      <div
        v-for="(key, index) in visibleCards"
        :key="key"
        class="card-wrapper"
        :class="{ editing: isEditing, animating: !isEditing }"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <div v-if="isEditing" class="sort-bar">
          <span class="sort-title">{{ cardMap[key].title }}</span>
          <div class="sort-actions">
            <button :disabled="index === 0" @click="moveUp(index)">↑</button>
            <button :disabled="index === visibleCards.length - 1" @click="moveDown(index)">↓</button>
            <button class="close-btn" @click="hideCard(key)">×</button>
          </div>
        </div>
        <component :is="cardMap[key].component" :stats="stats" />
      </div>

      <div v-if="isEditing" class="restore-bar">
        <button class="restore-btn" @click="restoreLayout">恢复默认布局</button>
      </div>

      <div v-if="isEditing && hiddenCards.length" class="hidden-section">
        <div class="hidden-title">已隐藏卡片</div>
        <div class="hidden-list">
          <div
            v-for="key in hiddenCards"
            :key="key"
            class="hidden-item"
            @click="showCard(key)"
          >
            <span>{{ cardMap[key].title }}</span>
            <span class="restore-hint">显示</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { getStats } from '@/api/system'
import TodaySummaryCard from '@/components/cards/TodaySummaryCard.vue'
import MonthSummaryCard from '@/components/cards/MonthSummaryCard.vue'
import TrendCard from '@/components/cards/TrendCard.vue'
import FinanceListCard from '@/components/cards/FinanceListCard.vue'
import MaterialListCard from '@/components/cards/MaterialListCard.vue'
import WorkerListCard from '@/components/cards/WorkerListCard.vue'
import ReimbursementCard from '@/components/cards/ReimbursementCard.vue'
import ProjectListCard from '@/components/cards/ProjectListCard.vue'
import KpiCard from '@/components/cards/KpiCard.vue'
import OneSentenceCard from '@/components/cards/OneSentenceCard.vue'

const userStore = useUserStore()

const stats = ref({
  todayIncome: 42800,
  todayExpense: 12500,
  monthIncome: 1284000,
  monthExpense: 386000,
  pendingApproval: 4,
  inventoryAlert: 2,
  activeCustomers: 128,
  reimbursePending: 2,
  reimburseApproved: 3,
  reimbursePaid: 1,
})

const cardMap = {
  today: { title: '今日收支', component: TodaySummaryCard },
  month: { title: '本月收支', component: MonthSummaryCard },
  kpi: { title: '关键指标', component: KpiCard },
  sentence: { title: '一句话记录', component: OneSentenceCard },
  trend: { title: '收支趋势', component: TrendCard },
  finance: { title: '财务流水', component: FinanceListCard },
  material: { title: '物料流水', component: MaterialListCard },
  worker: { title: '人员记工', component: WorkerListCard },
  reimbursement: { title: '我的报销', component: ReimbursementCard },
  project: { title: '项目列表', component: ProjectListCard },
}

const allCardKeys = Object.keys(cardMap)
const STORAGE_KEY = 'nmjsy_home_layout'

const visibleCards = ref([...allCardKeys])
const hiddenCards = ref([])
const isEditing = ref(false)

const today = computed(() => {
  const d = new Date()
  const weeks = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weeks[d.getDay()]}`
})

const loadLayout = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    const parsed = JSON.parse(saved)

    let v = []
    let h = []

    if (Array.isArray(parsed)) {
      v = parsed.filter((k) => allCardKeys.includes(k))
      h = allCardKeys.filter((k) => !v.includes(k))
    } else if (parsed && typeof parsed === 'object') {
      v = (parsed.visible || []).filter((k) => allCardKeys.includes(k))
      h = (parsed.hidden || []).filter((k) => allCardKeys.includes(k))
    }

    // 如果保存的可见卡片数量过少（少于全部的一半），可能是异常布局，恢复默认
    if (v.length < allCardKeys.length / 2) {
      v = [...allCardKeys]
      h = []
    }

    // 如果新增了卡片，自动追加到可见列表末尾
    const missingKeys = allCardKeys.filter((k) => !v.includes(k) && !h.includes(k))
    if (missingKeys.length) {
      v.push(...missingKeys)
    }

    visibleCards.value = v.length ? v : [...allCardKeys]
    hiddenCards.value = h
  } catch (e) {
    console.warn('load layout failed', e)
  }
}

const saveLayout = () => {
  const payload = {
    visible: visibleCards.value,
    hidden: hiddenCards.value,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

const toggleEdit = () => {
  if (isEditing.value) {
    saveLayout()
  }
  isEditing.value = !isEditing.value
}

const moveUp = (index) => {
  if (index === 0) return
  const prev = visibleCards.value[index - 1]
  const curr = visibleCards.value[index]
  visibleCards.value.splice(index, 1, prev)
  visibleCards.value.splice(index - 1, 1, curr)
}

const moveDown = (index) => {
  if (index === visibleCards.value.length - 1) return
  const next = visibleCards.value[index + 1]
  const curr = visibleCards.value[index]
  visibleCards.value.splice(index, 1, next)
  visibleCards.value.splice(index + 1, 1, curr)
}

const restoreLayout = () => {
  visibleCards.value = [...allCardKeys]
  hiddenCards.value = []
  saveLayout()
}

const hideCard = (key) => {
  visibleCards.value = visibleCards.value.filter((k) => k !== key)
  if (!hiddenCards.value.includes(key)) {
    hiddenCards.value.push(key)
  }
}

const showCard = (key) => {
  hiddenCards.value = hiddenCards.value.filter((k) => k !== key)
  if (!visibleCards.value.includes(key)) {
    visibleCards.value.push(key)
  }
}

onMounted(async () => {
  loadLayout()
  const res = await getStats()
  if (res.data) {
    stats.value = { ...stats.value, ...res.data }
  }
})
</script>

<style scoped>
.home-view {
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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

.edit-btn {
  padding: 6px 14px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--brand);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn:active {
  background: var(--surface-2);
}

.card-wrapper {
  margin: 0 16px 16px;
  opacity: 1;
  animation: cardIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-wrapper > :deep(*) {
  margin: 0;
}

.card-wrapper.editing {
  border: 1px dashed var(--line-strong);
  border-radius: 20px;
  padding: 12px;
  background: var(--surface);
  animation: none;
}

.sort-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 4px;
}

.sort-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.sort-actions {
  display: flex;
  gap: 6px;
}

.sort-actions button {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.sort-actions button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.sort-actions button.close-btn {
  color: var(--danger);
  border-color: var(--danger-soft);
  background: var(--danger-soft);
  font-size: 18px;
  padding-bottom: 2px;
}

.restore-bar {
  margin: 0 16px 16px;
  text-align: center;
}

.restore-btn {
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--brand);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.restore-btn:active {
  background: var(--brand-soft);
  border-color: var(--brand);
}

.hidden-section {
  margin: 24px 16px 0;
  padding: 16px;
  border-radius: 20px;
  background: var(--surface-2);
  border: 1px dashed var(--line-strong);
}

.hidden-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.hidden-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hidden-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 12px;
  background: var(--card);
  border: 1px solid var(--line);
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.hidden-item:active {
  background: var(--brand-soft);
  border-color: var(--brand);
  color: var(--brand);
}

.restore-hint {
  font-size: 12px;
  color: var(--text-tertiary);
  font-weight: 400;
}

.hidden-item:active .restore-hint {
  color: var(--brand);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
