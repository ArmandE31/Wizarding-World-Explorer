<template>
  <div>
    <h1>Magical Elixirs</h1>
    <div v-if="isLoadingElixirs" class="loader"><h1>Loading elixirs...</h1></div>
    <input type="text" v-model="searchQuery" placeholder="Search Elixirs" class="search-input" />
    <select v-model="selectedEffect" class="filter-select">
      <option value="">All Effects</option>
      <option v-for="effect in elixirEffects" :key="effect" :value="effect">{{ effect }}</option>
    </select>

    <div v-if="filteredElixirs.length > 0">
      <DataTable :value="filteredElixirs" :loading="isLoadingElixirs" class="elixirs-table">
        <Column field="name" header="Elixir Name"></Column>
        <Column field="effect" header="Effect"></Column>
        <Column>
          <template #body="{ data }">
            <router-link :to="`/elixirs/${data.id}`">View Details</router-link>
          </template>
        </Column>
      </DataTable>
    </div>
    <p v-else-if="!isLoadingElixirs" class="no-results">No elixirs found.</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useWizardStore } from '@/stores/store.ts'

const store = useWizardStore()
const { elixirs, isLoadingElixirs } = storeToRefs(store)

const searchQuery = ref('')
const selectedEffect = ref('')

onMounted(() => {
  store.fetchElixirs()
})

const elixirEffects = computed(() => {
  const effects = new Set(elixirs.value.map((elixir) => elixir.effect))
  return Array.from(effects)
})

const filteredElixirs = computed(() => {
  let filtered = elixirs.value
  if (searchQuery.value) {
    filtered = filtered.filter((elixir) =>
      elixir.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  if (selectedEffect.value) {
    filtered = filtered.filter((elixir) => elixir.effect === selectedEffect.value)
  }
  return filtered
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
