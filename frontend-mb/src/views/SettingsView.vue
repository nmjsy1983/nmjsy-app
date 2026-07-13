<template>
  <div class="settings-view">
    <div class="content">
      <div class="page-header">
        <div class="back-btn" @click="router.back()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <h2>我的设置</h2>
        <div class="spacer" />
      </div>

      <div class="card">
        <div class="section-title">通知</div>
        <div class="setting-row">
          <div>
            <div class="setting-title">工资到账提醒</div>
            <div class="setting-desc">发放工资时推送通知</div>
          </div>
          <div class="toggle" :class="{ on: toggles.salary }" @click="toggles.salary = !toggles.salary">
            <div class="toggle-dot" />
          </div>
        </div>
        <div class="setting-row">
          <div>
            <div class="setting-title">审批提醒</div>
            <div class="setting-desc">有新的待审批事项时提醒</div>
          </div>
          <div class="toggle" :class="{ on: toggles.approval }" @click="toggles.approval = !toggles.approval">
            <div class="toggle-dot" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">账号与安全</div>
        <div class="menu-row">
          <span>修改手机号</span>
          <span class="chevron">›</span>
        </div>
        <div class="menu-row">
          <span>修改登录密码</span>
          <span class="chevron">›</span>
        </div>
      </div>

      <div class="card">
        <div class="section-title">关于</div>
        <div class="info-row">
          <span>当前版本</span>
          <span class="info-value">v1.0.0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toggles = reactive({
  salary: true,
  approval: true,
})
</script>

<style scoped>
.settings-view {
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

.page-header {
  display: flex;
  align-items: center;
  margin: 0 16px 18px;
}

.back-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--surface-2);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.15s;
}

.back-btn:active {
  background: var(--line);
}

.page-header h2 {
  flex: 1;
  text-align: center;
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--text);
}

.spacer {
  width: 34px;
}

.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  margin: 0 16px 14px;
  padding: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 12px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
}

.setting-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.toggle {
  width: 46px;
  height: 26px;
  border-radius: 13px;
  background: var(--line-strong);
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.toggle.on {
  background: var(--brand);
}

.toggle-dot {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.toggle.on .toggle-dot {
  transform: translateX(20px);
}

.menu-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
  font-size: 15px;
  color: var(--text);
  cursor: pointer;
}

.menu-row:last-child {
  border-bottom: none;
}

.chevron {
  color: var(--text-tertiary);
  font-size: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 15px;
  color: var(--text);
}

.info-value {
  color: var(--text-secondary);
}
</style>
