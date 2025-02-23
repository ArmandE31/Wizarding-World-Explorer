<template>
  <div>
    <h1>Wizarding Spells</h1>
    <div v-if="isLoadingSpells" class="loader"><h1>Loading spells...</h1></div>
    <div v-if="errorSpells" class="error-message">
      Failed to load spells. Please try again later.
    </div>
    <input type="text" v-model="searchQuery" placeholder="Search Spells" class="search-input" />
    <select v-model="selectedType" class="filter-select">
      <option value="">All Types</option>
      <option v-for="type in spellTypes" :key="type" :value="type">{{ type }}</option>
    </select>

    <div v-if="filteredSpells.length > 0">
      <DataTable :value="filteredSpells" :loading="isLoadingSpells" class="spells-table">
        <Column field="name" header="Spell Name"></Column>
        <Column field="type" header="Type"></Column>
        <Column field="effect" header="Effect"></Column>
        <Column>
          <template #body="{ data }">
            <router-link :to="`/spells/${data.id}`">View Details</router-link>
          </template>
        </Column>
      </DataTable>
    </div>
    <p v-else-if="!isLoadingSpells && !errorSpells" class="no-results">No spells found.</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useWizardStore } from '@/stores/store.ts'

const store = useWizardStore()
const { spells, isLoadingSpells, errorSpells } = storeToRefs(store)

const searchQuery = ref('')
const selectedType = ref('')

onMounted(() => {
  store.fetchSpells()
})

const spellTypes = computed(() => {
  const types = new Set(spells.value.map((spell) => spell.type))
  return Array.from(types)
})

const filteredSpells = computed(() => {
  let filtered = spells.value
  if (searchQuery.value) {
    filtered = filtered.filter((spell) =>
      spell.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  if (selectedType.value) {
    filtered = filtered.filter((spell) => spell.type === selectedType.value)
  }
  return filtered
})
</script>

<style>
.spells-table .p-datatable-thead th {
  font-weight: bold;
  font-size: 1.2rem;
  text-align: left;
}

.spells-table .p-datatable-tbody td {
  padding: 4px;
  text-align: left;
}

.spells-table {
  width: 100%;
  max-width: 100%;
}

.filter-select {
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
