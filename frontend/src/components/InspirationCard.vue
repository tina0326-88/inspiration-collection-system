<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useInspirationStore } from '@/stores/inspirations'
import { useRouter } from 'vue-router'

const props = defineProps({
  inspiration: { type: Object, required: true },
})

const auth = useAuthStore()
const store = useInspirationStore()
const router = useRouter()

const isOwner = computed(() => {
  return auth.isLoggedIn && auth.user?.id === String(props.inspiration.user_id)
})

const handleDelete = async () => {
  if (!confirm('確定要刪除這筆收藏嗎？')) return
  await store.remove(props.inspiration.id)
}
</script>

<template>
  <div class="card">
    <RouterLink :to="`/inspirations/${inspiration.id}`">
      <div class="card-image">
        <img
          v-if="inspiration.image_url"
          :src="inspiration.image_url"
          :alt="inspiration.title"
          loading="lazy"
          @error="$event.target.style.display='none'"
        />
        <div v-else class="image-placeholder">✦</div>
      </div>
    </RouterLink>
    <div class="card-body">
      <div class="card-meta">
        <span v-if="inspiration.category_detail" class="badge">
          {{ inspiration.category_detail.name }}
        </span>
        <span class="author">by {{ inspiration.user }}</span>
      </div>
      <RouterLink :to="`/inspirations/${inspiration.id}`">
        <h3 class="card-title">{{ inspiration.title }}</h3>
      </RouterLink>
      <p v-if="inspiration.description" class="card-desc">{{ inspiration.description }}</p>
      <div class="card-actions">
        <a
          v-if="inspiration.source_url"
          :href="inspiration.source_url"
          target="_blank"
          rel="noopener"
          class="btn btn-secondary btn-sm"
        >
          來源
        </a>
        <template v-if="isOwner">
          <RouterLink :to="`/inspirations/${inspiration.id}/edit`" class="btn btn-outline btn-sm">
            編輯
          </RouterLink>
          <button class="btn btn-danger btn-sm" @click="handleDelete">刪除</button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}

.card-image {
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover .card-image img {
  transform: scale(1.03);
}

.image-placeholder {
  font-size: 2.5rem;
  color: #d1d5db;
}

.card-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.author {
  font-size: 0.75rem;
  color: #9ca3af;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  text-decoration: none;
  line-height: 1.4;
}

.card-title:hover {
  color: #6366f1;
}

.card-desc {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 8px;
}

.btn-sm {
  padding: 5px 12px;
  font-size: 0.8rem;
}
</style>
