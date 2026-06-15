<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/inspirations" class="brand">✦ Inspo</RouterLink>
      <div class="nav-links">
        <RouterLink to="/inspirations">探索</RouterLink>
        <template v-if="auth.isLoggedIn">
          <RouterLink to="/inspirations?mine=true">我的收藏</RouterLink>
          <RouterLink to="/inspirations/new" class="btn btn-primary btn-sm">+ 新增</RouterLink>
          <span class="username">{{ auth.user?.username }}</span>
          <button class="btn btn-secondary btn-sm" @click="logout">登出</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn-outline btn-sm">登入</RouterLink>
          <RouterLink to="/register" class="btn btn-primary btn-sm">註冊</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #6366f1;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-links a:not(.btn) {
  color: #374151;
  font-size: 0.9rem;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:not(.btn):hover {
  color: #6366f1;
}

.btn-sm {
  padding: 6px 14px;
  font-size: 0.85rem;
}

.username {
  font-size: 0.85rem;
  color: #6b7280;
}
</style>
