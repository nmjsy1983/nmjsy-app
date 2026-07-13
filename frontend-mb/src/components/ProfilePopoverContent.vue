<template>
  <div class="popover-menu">
    <div
      v-for="item in items"
      :key="item.key"
      class="menu-item"
      :class="{ danger: item.danger }"
      @click="handleClick(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['navigate', 'logout'])

const items = [
  { key: 'profile', title: '我的资料', route: '/profile' },
  { key: 'salary', title: '我的工资', route: '/salary' },
  { key: 'notice', title: '通知消息', route: '/approval' },
  { key: 'settings', title: '我的设置', route: '/settings' },
  { key: 'logout', title: '退出登录', danger: true },
]

const handleClick = (item) => {
  if (item.key === 'logout') {
    emit('logout')
    return
  }
  emit('navigate', item.route)
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

.menu-item.danger {
  color: var(--danger);
  border-top: 1px solid var(--line);
}

.menu-item.danger:active {
  background: var(--danger-soft);
  color: var(--danger);
}
</style>
