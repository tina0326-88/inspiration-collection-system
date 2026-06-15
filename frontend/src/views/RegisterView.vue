<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ username: '', email: '', password: '', password2: '' })
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''
  if (form.value.password !== form.value.password2) {
    error.value = '兩次密碼不一致'
    return
  }
  loading.value = true
  try {
    await auth.register(form.value)
    router.push('/inspirations')
  } catch (e) {
    const data = e.response?.data
    if (data) {
      const msgs = Object.values(data).flat()
      error.value = msgs[0] || '註冊失敗'
    } else {
      error.value = '註冊失敗，請稍後再試'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>註冊帳號</h1>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>帳號</label>
          <input v-model="form.username" type="text" required placeholder="請輸入帳號" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="請輸入 Email（選填）" />
        </div>
        <div class="form-group">
          <label>密碼</label>
          <input v-model="form.password" type="password" required placeholder="至少 8 個字元" />
        </div>
        <div class="form-group">
          <label>確認密碼</label>
          <input v-model="form.password2" type="password" required placeholder="再次輸入密碼" />
        </div>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <button type="submit" :disabled="loading" class="btn btn-primary btn-full">
          {{ loading ? '註冊中...' : '建立帳號' }}
        </button>
      </form>
      <p class="auth-link">已有帳號？<RouterLink to="/login">立即登入</RouterLink></p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.auth-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

h1 {
  margin-bottom: 28px;
  font-size: 1.6rem;
  font-weight: 700;
}

.btn-full {
  width: 100%;
  justify-content: center;
  padding: 12px;
  font-size: 1rem;
  margin-top: 8px;
}

.auth-link {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
