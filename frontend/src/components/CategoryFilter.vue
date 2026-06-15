<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '@/api/categories'

const props = defineProps({
  modelValue: { type: String, default: null },
})
const emit = defineEmits(['update:modelValue'])

const categories = ref([])

onMounted(async () => {
  const { data } = await getCategories()
  categories.value = data.results || data
})

const select = (id) => {
  emit('update:modelValue', id === props.modelValue ? null : id)
}
</script>

<template>
  <div class="category-filter">
    <button
      class="chip"
      :class="{ active: modelValue === null }"
      @click="emit('update:modelValue', null)"
    >
      全部
    </button>
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="chip"
      :class="{ active: modelValue === cat.id }"
      @click="select(cat.id)"
    >
      {{ cat.name }}
    </button>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.chip {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.chip:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.chip.active {
  background: #6366f1;
  border-color: #6366f1;
  color: white;
}
</style>
