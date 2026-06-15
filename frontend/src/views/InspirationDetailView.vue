<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInspirationStore } from '@/stores/inspirations'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const store = useInspirationStore()
const auth = useAuthStore()

const inspiration = computed(() => store.currentInspiration)

const isOwner = computed(() => {
  return auth.isLoggedIn && auth.user?.id === String(inspiration.value?.user_id)
})

onMounted(() => {
  store.fetchInspiration(route.params.id)
})

const handleDelete = async () => {
  if (!confirm('確定要刪除這筆收藏嗎？')) return
  await store.remove(route.params.id)
  router.push('/inspirations')
}
</script>

<template>
  <div>
    <button class="btn btn-secondary back-btn" @click="router.back()">← 返回</button>

    <div v-if="store.loading" class="loading">載入中...</div>

    <div v-else-if="inspiration" class="detail-card">
      <div v-if="inspiration.image_url" class="detail-image">
        <img :src="inspiration.image_url" :alt="inspiration.title" />
      </div>

      <div class="detail-body">
        <div class="detail-meta">
          <span v-if="inspiration.category_detail" class="badge">
            {{ inspiration.category_detail.name }}
          </span>
          <span class="author">by {{ inspiration.user }}</span>
          <span class="date">
            {{ new Date(inspiration.created_at).toLocaleDateString('zh-TW') }}
          </span>
        </div>

        <h1 class="detail-title">{{ inspiration.title }}</h1>

        <p v-if="inspiration.description" class="detail-desc">{{ inspiration.description }}</p>

        <div class="detail-actions">
          <a
            v-if="inspiration.source_url"
            :href="inspiration.source_url"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
          >
            前往來源 ↗
          </a>
          <template v-if="isOwner">
            <RouterLink :to="`/inspirations/${inspiration.id}/edit`" class="btn btn-outline">
              編輯
            </RouterLink>
            <button class="btn btn-danger" @click="handleDelete">刪除</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-btn {
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #6b7280;
}

.detail-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}

.detail-image {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-body {
  padding: 32px;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.author {
  font-size: 0.875rem;
  color: #6b7280;
}

.date {
  font-size: 0.875rem;
  color: #9ca3af;
}

.detail-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
}

.detail-desc {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 24px;
  white-space: pre-wrap;
}

.detail-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
