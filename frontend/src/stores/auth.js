import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, register as apiRegister } from '@/api/auth'

const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const accessToken = ref(localStorage.getItem('access_token') || null)

  const isLoggedIn = computed(() => !!accessToken.value)

  const setTokens = (access, refresh) => {
    accessToken.value = access
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    const payload = decodeToken(access)
    if (payload) {
      user.value = { id: payload.user_id, username: payload.username }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  const login = async (credentials) => {
    const { data } = await apiLogin(credentials)
    setTokens(data.access, data.refresh)
    return data
  }

  const register = async (userData) => {
    const { data } = await apiRegister(userData)
    user.value = data.user
    localStorage.setItem('user', JSON.stringify(data.user))
    setTokens(data.access, data.refresh)
    return data
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  }

  return { user, accessToken, isLoggedIn, login, register, logout }
})
