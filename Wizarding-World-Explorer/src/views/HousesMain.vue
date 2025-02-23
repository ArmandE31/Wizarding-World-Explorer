<template>
  <div>
    <h1>Hogwarts Houses</h1>
    <input type="text" v-model="searchQuery" placeholder="Search Houses" class="search-input" />
    <div v-if="filteredHouses.length > 0">
      <DataTable :value="filteredHouses" :loading="isLoading" class="houses-table">
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
    <p v-else class="no-results">No houses found.</p>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type House = {
  id: string
  name: string
  houseColours: string
  founder: string
  animal: string
  element: string
  ghost: string
  commonRoom: string
  heads: { id: string; firstName?: string; lastName?: string }[]
  traits: { id: string; name?: string }[]
}

const searchQuery = ref('')

const fetchHouses = async (): Promise<House[]> => {
  const res = await fetch('https://wizard-world-api.herokuapp.com/houses')
  return res.json()
}

const { data, isLoading } = useQuery<House[], Error>({ queryKey: ['houses'], queryFn: fetchHouses })

const filteredHouses = computed(() => {
  if (!searchQuery.value) return data.value ?? []
  return (data.value ?? []).filter((house) =>
    house.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
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
</style>
