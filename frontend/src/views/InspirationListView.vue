<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInspirationStore } from '@/stores/inspirations'
import { useAuthStore } from '@/stores/auth'
import InspirationCard from '@/components/InspirationCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'

const route = useRoute()
const router = useRouter()
const store = useInspirationStore()
const auth = useAuthStore()

const search = ref('')
const selectedCategory = ref(null)
const page = ref(1)
const mine = ref(route.query.mine === 'true')

let searchTimer = null

const params = computed(() => {
  const p = { page: page.value }
  if (search.value) p.search = search.value
  if (selectedCategory.value) p.category = selectedCategory.value
  if (mine.value) p.mine = true
  return p
})

const fetchData = () => {
  store.fetchInspirations(params.value)
}

onMounted(fetchData)

watch(selectedCategory, () => {
  page.value = 1
  fetchData()
})

watch(mine, () => {
  page.value = 1
  fetchData()
})

watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    fetchData()
  }, 400)
})

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchData()
  }
}

const nextPage = () => {
  if (store.next) {
    page.value++
    fetchData()
  }
}

const totalPages = computed(() => Math.ceil(store.total / 12))
</script>

<template>
  <div>
    <div class="list-header">
      <div class="title-row">
        <h1>{{ mine ? '我的收藏' : '探索靈感' }}</h1>
        <RouterLink v-if="auth.isLoggedIn" to="/inspirations/new" class="btn btn-primary">
          + 新增收藏
        </RouterLink>
      </div>

      <div class="filter-row">
        <input
          v-model="search"
          type="search"
          placeholder="搜尋標題或描述..."
          class="search-input"
        />
        <label class="mine-toggle" v-if="auth.isLoggedIn">
          <input type="checkbox" v-model="mine" />
          只看我的
        </label>
      </div>

      <CategoryFilter v-model="selectedCategory" />
    </div>

    <div v-if="store.loading" class="loading">載入中...</div>

    <div v-else-if="store.inspirations.length === 0" class="empty-state">
      <h3>尚無收藏</h3>
      <p>目前還沒有符合條件的靈感</p>
    </div>

    <div v-else class="grid">
      <InspirationCard
        v-for="item in store.inspirations"
        :key="item.id"
        :inspiration="item"
      />
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button class="btn btn-secondary" :disabled="page === 1" @click="prevPage">上一頁</button>
      <span>第 {{ page }} / {{ totalPages }} 頁</span>
      <button class="btn btn-secondary" :disabled="!store.next" @click="nextPage">下一頁</button>
    </div>
  </div>
</template>

<style scoped>
.list-header {
  margin-bottom: 24px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title-row h1 {
  font-size: 1.6rem;
  font-weight: 700;
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
  max-width: 400px;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.mine-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  white-space: nowrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #6b7280;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
