<script setup lang="ts">
import { useCitySelect } from '@/ts/pages/citySelect'
import '@/css/pages/citySelect.css'

const { 
  searchText,
  cities,
  hotCities,
  filteredCities,
  handleSearch,
  selectCity
} = useCitySelect()
</script>

<template>
  <div class="city-select-page">
    <div class="search-bar">
      <input 
        type="text"
        v-model="searchText"
        @input="handleSearch"
        placeholder="搜索城市..."
      >
    </div>

    <div class="hot-cities" v-if="!searchText">
      <h2>热门城市</h2>
      <div class="city-grid">
        <div 
          v-for="city in hotCities" 
          :key="city.id"
          class="city-item"
          @click="selectCity(city)"
        >
          {{ city.name }}
        </div>
      </div>
    </div>

    <div class="city-list" v-if="searchText">
      <div 
        v-for="city in filteredCities" 
        :key="city.id"
        class="city-item"
        @click="selectCity(city)"
      >
        <span class="city-name">{{ city.name }}</span>
        <span class="city-region">{{ city.region }}</span>
      </div>
    </div>
  </div>
</template> 