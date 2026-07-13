<template>
  <div class="profile-view">
    <div class="content">
      <div class="page-title">
        <h2>我的</h2>
        <div class="page-subtitle">账号信息与服务入口</div>
      </div>

      <div class="card user-card">
        <div class="avatar-lg">{{ userStore.user?.nickname?.[0] || '管' }}</div>
        <div>
          <div class="user-name">{{ userStore.user?.nickname || '管理员' }}</div>
          <div class="user-role">{{ userStore.user?.email || 'admin@nmjsy.local' }}</div>
        </div>
      </div>

      <div class="section-title">常用功能</div>
      <div class="menu-list">
        <div class="menu-item" @click="go('/salary')">
          <div class="menu-item-left">
            <div class="menu-icon" style="background: var(--brand-soft); color: var(--brand);">
              <Money class="icon-svg" />
            </div>
            <div>
              <div class="menu-item-title">工资查询</div>
              <div class="menu-item-desc">考勤、借支与本月应发工资</div>
            </div>
          </div>
          <div class="chevron">›</div>
        </div>
        <div class="menu-item" @click="go('/profile')">
          <div class="menu-item-left">
            <div class="menu-icon" style="background: var(--blue-soft); color: var(--blue);">
              <User class="icon-svg" />
            </div>
            <div>
              <div class="menu-item-title">我的资料</div>
              <div class="menu-item-desc">个人信息与账号资料管理</div>
            </div>
          </div>
          <div class="chevron">›</div>
        </div>
        <div class="menu-item" @click="go('/settings')">
          <div class="menu-item-left">
            <div class="menu-icon" style="background: var(--surface-2); color: var(--text-secondary);">
              <Setting class="icon-svg" />
            </div>
            <div>
              <div class="menu-item-title">我的设置</div>
              <div class="menu-item-desc">通知、密码与偏好设置</div>
            </div>
          </div>
          <div class="chevron">›</div>
        </div>
      </div>

      <div class="section-title">系统</div>
      <div class="menu-list">
        <div class="menu-item" @click="go('/settings')">
          <div class="menu-item-left">
            <div class="menu-icon" style="background: var(--brand-soft); color: var(--brand);">
              <Tools class="icon-svg" />
            </div>
            <div class="menu-item-title">系统设置</div>
          </div>
          <div class="chevron">›</div>
        </div>
        <div class="menu-item" @click="go('/approval')">
          <div class="menu-item-left">
            <div class="menu-icon" style="background: var(--amber-soft); color: var(--amber);">
              <Bell class="icon-svg" />
            </div>
            <div>
              <div class="menu-item-title">消息通知</div>
            </div>
          </div>
          <div class="chevron">›</div>
        </div>
        <a class="menu-item download-link" href="/app-debug.apk" download>
          <div class="menu-item-left">
            <div class="menu-icon" style="background: var(--lime-soft); color: var(--lime);">
              <Download class="icon-svg" />
            </div>
            <div>
              <div class="menu-item-title">下载应用</div>
              <div class="menu-item-desc">安装 Android 测试版 APK</div>
            </div>
          </div>
          <div class="chevron">›</div>
        </a>
      </div>

      <button class="btn-logout" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Money, User, Setting, Tools, Bell, Download } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const go = (route) => router.push(route)

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.profile-view {
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
  margin: 22px 16px 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  margin: 0 16px 16px;
  padding: 18px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-lg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--brand-soft);
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  color: var(--brand);
  font-weight: 700;
  font-size: 22px;
}

.user-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.user-role {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
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
  padding: 14px 16px;
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

.menu-item-title {
  font-size: 15px;
  font-weight: 600;
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

.btn-logout {
  width: calc(100% - 32px);
  margin: 8px 16px 0;
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

.download-link {
  text-decoration: none;
  color: inherit;
}
</style>
