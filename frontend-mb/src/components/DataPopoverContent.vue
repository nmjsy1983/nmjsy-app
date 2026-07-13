<template>
  <div class="popover-menu">
    <div
      v-for="item in items"
      :key="item.key"
      class="menu-item"
      @click="go(item.route)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['navigate'])

const items = [
  { key: 'project', title: '项目看板', route: '/data' },
  { key: 'finance', title: '财务流水', route: '/data' },
  { key: 'material', title: '物料流水', route: '/data' },
  { key: 'report', title: '统计报表', route: '/data' },
]

const go = (route) => {
  emit('navigate', route)
}
</script>

<style scoped>
.popover-menu {
  display: flex;
  flex-direction: column;
  padding: 6px 0;
}

.menu-item {
  padding: 11px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid var(--line);
}

.menu-item:active {
  background: var(--surface-2);
  color: var(--brand);
}
</style>
