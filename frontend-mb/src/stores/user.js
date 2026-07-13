import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, getProfile } from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  const setToken = (value) => {
    token.value = value
    localStorage.setItem('token', value)
  }

  const login = async (username, password) => {
    const res = await loginApi(username, password)
    if (res.data?.token) {
      setToken(res.data.token)
      user.value = res.data.user
    }
    return res
  }

  const fetchProfile = async () => {
    if (!token.value) return
    const res = await getProfile()
    user.value = res.data
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    user,
    isLoggedIn,
    login,
    fetchProfile,
    logout,
    setToken,
  }
})
