<template>
  <div class="drawer-body">
    <div class="drawer-header">
      <h3>我的</h3>
      <p>账号信息与服务入口</p>
    </div>

    <div class="user-card">
      <div class="avatar">{{ userStore.user?.nickname?.[0] || '管' }}</div>
      <div class="user-info">
        <div class="user-name">{{ userStore.user?.nickname || '管理员' }}</div>
        <div class="user-role">{{ userStore.user?.email || 'admin@nmjsy.local' }}</div>
      </div>
    </div>

    <div class="menu-group">
      <div
        v-for="item in menuItems"
        :key="item.key"
        class="menu-row"
        @click="handleClick(item)"
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

    <button class="btn-logout" @click="handleLogout">退出登录</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  Money,
  User,
  Setting,
} from '@element-plus/icons-vue'

const emit = defineEmits(['navigate'])

const router = useRouter()
const userStore = useUserStore()

const menuItems = [
  {
    key: 'salary',
    title: '工资查询',
    desc: '考勤、借支与本月应发工资',
    icon: Money,
    bg: 'var(--brand-soft)',
    color: 'var(--brand)',
    route: '/salary',
  },
  {
    key: 'profile',
    title: '我的资料',
    desc: '个人信息与账号资料管理',
    icon: User,
    bg: 'var(--blue-soft)',
    color: 'var(--blue)',
    route: '/profile',
  },
  {
    key: 'settings',
    title: '我的设置',
    desc: '通知、密码与偏好设置',
    icon: Setting,
    bg: 'var(--surface-2)',
    color: 'var(--text-secondary)',
    route: '/settings',
  },
]

const handleClick = (item) => {
  emit('navigate', item.route)
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
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

.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  margin-bottom: 16px;
}

.avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand);
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 700;
  flex-shrink: 0;
}

.user-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
}

.user-role {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 3px;
}

.menu-group {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 16px;
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

.btn-logout {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  background: var(--danger-soft);
  color: var(--danger);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:active {
  background: #fee2e2;
}
</style>
