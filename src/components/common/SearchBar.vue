<script setup lang="ts">
import { useSearch } from '@/ts/components/searchBar'
import '@/css/components/searchBar.css'

const emit = defineEmits(['search'])
const { searchQuery, handleSearch } = useSearch()
</script>

<template>
  <div class="search-bar">
    <input 
      v-model="searchQuery"
      type="text"
      placeholder="搜索目的地..."
      @keyup.enter="handleSearch(emit)"
    >
    <button class="btn btn-primary" @click="handleSearch(emit)">
      搜索
    </button>
  </div>
</template> 