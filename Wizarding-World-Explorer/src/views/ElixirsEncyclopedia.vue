<template>
  <div>
    <h1>Magical Elixirs</h1>
    <input type="text" v-model="searchQuery" placeholder="Search Elixirs" class="search-input" />

    <div v-if="filteredElixirs.length > 0">
      <DataTable :value="filteredElixirs" :loading="isLoading" class="elixirs-table">
        <Column field="name" header="Elixir Name"></Column>
        <Column field="effect" header="Effect"></Column>
      </DataTable>
    </div>
    <p v-else class="no-results">No elixirs found.</p>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type Elixir = {
  id: string
  name: string
  effect: string
  ingredients: { id: string; name: string }[]
  instructions?: string
}

const searchQuery = ref('')
const selectedEffect = ref('')

const fetchElixirs = async (): Promise<Elixir[]> => {
  const res = await fetch('https://wizard-world-api.herokuapp.com/elixirs')
  return res.json()
}

const { data, isLoading } = useQuery<Elixir[], Error>({
  queryKey: ['elixirs'],
  queryFn: fetchElixirs,
})

const filteredElixirs = computed(() => {
  let elixirs = data.value ?? []
  if (searchQuery.value) {
    elixirs = elixirs.filter((elixir) =>
      elixir.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  if (selectedEffect.value) {
    elixirs = elixirs.filter((elixir) => elixir.effect === selectedEffect.value)
  }
  return elixirs
})
</script>

<style>
.elixirs-table .p-datatable-thead th {
  font-weight: bold;
  font-size: 1.2rem;
  text-align: left;
}

.elixirs-table .p-datatable-tbody td {
  padding: 4px;
  text-align: left;
}

.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 10px;
}
</style>
