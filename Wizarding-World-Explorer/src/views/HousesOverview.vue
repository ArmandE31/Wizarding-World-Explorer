<template>
  <div>
    <h1>Hogwarts Houses</h1>
    <div v-if="isLoadingHouses" class="loader"><h1>Loading houses...</h1></div>
    <div v-if="errorHouses" class="error-message">
      Failed to load houses. Please try again later.
    </div>
    <input type="text" v-model="searchQuery" placeholder="Search Houses" class="search-input" />

    <div v-if="filteredHouses.length > 0">
      <DataTable :value="filteredHouses" :loading="isLoadingHouses" class="houses-table">
        <Column field="name" header="House Name"></Column>
        <Column field="animal" header="Mascot"></Column>
        <Column field="founder" header="Founder"></Column>
        <Column>
          <template #body="{ data }">
            <router-link :to="`/houses/${data.id}`">View Details</router-link>
          </template>
        </Column>
      </DataTable>
    </div>
    <p v-else-if="!isLoadingHouses && !errorHouses" class="no-results">No houses found.</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useWizardStore } from '@/stores/store.ts'

const store = useWizardStore()
const { houses, isLoadingHouses, errorHouses } = storeToRefs(store)

const searchQuery = ref('')

onMounted(() => {
  store.fetchHouses()
})

const filteredHouses = computed(() => {
  let filtered = houses.value
  if (searchQuery.value) {
    filtered = filtered.filter((house) =>
      house.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  return filtered
})
</script>

<style>
.houses-table .p-datatable-thead th {
  font-weight: bold;
  font-size: 1.2rem;
}

.houses-table .p-datatable-thead th,
.houses-table .p-datatable-tbody td {
  text-align: left;
  padding: 16px;
}
.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #000000;
  color: #cccccc;
}

.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 10px;
}
</style>
