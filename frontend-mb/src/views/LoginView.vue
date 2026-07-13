<template>
  <div class="login-view">
    <div class="login-logo">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    </div>
    <h1 class="login-title">欢迎回来</h1>
    <p class="login-subtitle">登录 nmjsy 移动工作台</p>

    <div class="input-group">
      <label>账号</label>
      <input v-model="form.username" type="text" placeholder="请输入用户名" />
    </div>
    <div class="input-group">
      <label>密码</label>
      <input v-model="form.password" type="password" placeholder="请输入密码" />
    </div>

    <button class="btn-login" :disabled="loading" @click="handleLogin">
      {{ loading ? '登录中...' : '登 录' }}
    </button>
    <p class="login-hint">演示账号：admin / 123456</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  username: 'admin',
  password: '123456',
})

const handleLogin = async () => {
  loading.value = true
  try {
    await userStore.login(form.username, form.password)
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  position: relative;
  background: var(--bg);
}

.login-logo {
  width: 68px;
  height: 68px;
  border-radius: 18px;
  background: var(--brand);
  display: grid;
  place-items: center;
  margin-bottom: 28px;
}

.login-title {
  font-size: 30px;
  font-weight: 900;
  margin: 0 0 8px;
  color: var(--text);
}

.login-subtitle {
  color: var(--text-secondary);
  margin: 0 0 36px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 15px 16px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text);
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
}

.input-group input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.1);
}

.btn-login {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  background: var(--brand);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-top: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-login:active {
  background: var(--brand-light);
}

.btn-login:disabled {
  opacity: 0.7;
}

.login-hint {
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: var(--text-tertiary);
}
</style>
