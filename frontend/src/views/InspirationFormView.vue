<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInspirationStore } from '@/stores/inspirations'
import { getCategories } from '@/api/categories'

const route = useRoute()
const router = useRouter()
const store = useInspirationStore()

const isEdit = computed(() => !!route.params.id)
const pageTitle = computed(() => isEdit.value ? '編輯收藏' : '新增收藏')

const form = ref({
  title: '',
  description: '',
  image_url: '',
  source_url: '',
  category: '',
})

const categories = ref([])
const error = ref('')
const loading = ref(false)

onMounted(async () => {
  const { data } = await getCategories()
  categories.value = data.results || data

  if (isEdit.value) {
    await store.fetchInspiration(route.params.id)
    const item = store.currentInspiration
    if (item) {
      form.value = {
        title: item.title,
        description: item.description,
        image_url: item.image_url,
        source_url: item.source_url,
        category: item.category || '',
      }
    }
  }
})

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    const payload = { ...form.value }
    if (!payload.category) payload.category = null

    if (isEdit.value) {
      await store.update(route.params.id, payload)
      router.push(`/inspirations/${route.params.id}`)
    } else {
      const created = await store.create(payload)
      router.push(`/inspirations/${created.id}`)
    }
  } catch (e) {
    const data = e.response?.data
    if (data) {
      const msgs = Object.entries(data).map(([k, v]) => `${k}: ${[v].flat()[0]}`)
      error.value = msgs[0] || '操作失敗'
    } else {
      error.value = '操作失敗，請稍後再試'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-card">
      <div class="form-header">
        <button class="btn btn-secondary" @click="router.back()">← 返回</button>
        <h1>{{ pageTitle }}</h1>
      </div>

      <form @submit.prevent="submit">
        <div class="form-group">
          <label>標題 *</label>
          <input v-model="form.title" type="text" required placeholder="收藏標題" />
        </div>

        <div class="form-group">
          <label>描述</label>
          <textarea v-model="form.description" rows="4" placeholder="描述這個收藏..."></textarea>
        </div>

        <div class="form-group">
          <label>圖片網址</label>
          <input v-model="form.image_url" type="url" placeholder="https://..." />
        </div>

        <div class="form-group">
          <label>來源網址</label>
          <input v-model="form.source_url" type="url" placeholder="https://..." />
        </div>

        <div class="form-group">
          <label>分類</label>
          <select v-model="form.category">
            <option value="">-- 選擇分類 --</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="router.back()">取消</button>
          <button type="submit" :disabled="loading" class="btn btn-primary">
            {{ loading ? '儲存中...' : (isEdit ? '儲存變更' : '新增收藏') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  display: flex;
  justify-content: center;
}

.form-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 640px;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.form-header h1 {
  font-size: 1.4rem;
  font-weight: 700;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>
