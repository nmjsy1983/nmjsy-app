<template>
  <div class="tabbar">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      ref="tabRefs"
      class="tab-item"
      :class="{ active: activeTab === tab.key }"
      @click="switchTab(tab, $event)"
    >
      <component :is="tab.icon" class="tab-icon" />
      <span class="tab-label">{{ tab.title }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeFilled, CircleCheckFilled, Grid, UserFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['openPopover', 'closePopover'])

const route = useRoute()
const router = useRouter()

const tabs = [
  { key: 'home', title: '首页', icon: HomeFilled, type: 'route' },
  { key: 'approval', title: '审批', icon: CircleCheckFilled, type: 'route' },
  { key: 'data', title: '数据', icon: Grid, type: 'popover' },
  { key: 'profile', title: '我的', icon: UserFilled, type: 'popover' },
]

const activeTab = computed(() => route.path.split('/')[1] || 'home')

const switchTab = (tab, event) => {
  if (tab.type === 'popover') {
    emit('openPopover', tab.key, event.currentTarget)
    return
  }
  emit('closePopover')
  router.push(`/${tab.key}`)
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(64px + var(--safe-bottom));
  padding-bottom: var(--safe-bottom);
  background: var(--surface);
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
}

.tab-item {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--text-tertiary);
  transition: all 0.2s;
  position: relative;
}

.tab-item.active {
  color: var(--brand);
}

.tab-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  width: 32px;
  height: 3px;
  border-radius: 0 0 4px 4px;
  background: var(--brand);
}

.tab-icon {
  width: 22px;
  height: 22px;
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
