import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getInspirations,
  getInspiration,
  createInspiration,
  updateInspiration,
  deleteInspiration,
} from '@/api/inspirations'

export const useInspirationStore = defineStore('inspirations', () => {
  const inspirations = ref([])
  const currentInspiration = ref(null)
  const loading = ref(false)
  const total = ref(0)
  const next = ref(null)
  const previous = ref(null)

  const fetchInspirations = async (params = {}) => {
    loading.value = true
    try {
      const { data } = await getInspirations(params)
      if (data.results !== undefined) {
        inspirations.value = data.results
        total.value = data.count
        next.value = data.next
        previous.value = data.previous
      } else {
        inspirations.value = data
        total.value = data.length
      }
    } finally {
      loading.value = false
    }
  }

  const fetchInspiration = async (id) => {
    loading.value = true
    try {
      const { data } = await getInspiration(id)
      currentInspiration.value = data
    } finally {
      loading.value = false
    }
  }

  const create = async (formData) => {
    const { data } = await createInspiration(formData)
    return data
  }

  const update = async (id, formData) => {
    const { data } = await updateInspiration(id, formData)
    currentInspiration.value = data
    return data
  }

  const remove = async (id) => {
    await deleteInspiration(id)
    inspirations.value = inspirations.value.filter((i) => i.id !== id)
  }

  return {
    inspirations, currentInspiration, loading, total, next, previous,
    fetchInspirations, fetchInspiration, create, update, remove,
  }
})
