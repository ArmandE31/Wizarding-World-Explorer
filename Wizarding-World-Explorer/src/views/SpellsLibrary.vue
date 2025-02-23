<template>
  <div>
    <h1>Wizarding Spells</h1>
    <input type="text" v-model="searchQuery" placeholder="Search Spells" class="search-input" />
    <select v-model="selectedType" class="filter-select">
      <option value="">All Types</option>
      <option v-for="type in spellTypes" :key="type" :value="type">{{ type }}</option>
    </select>

    <div v-if="filteredSpells.length > 0">
      <DataTable :value="filteredSpells" :loading="isLoading" class="spells-table">
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
    <p v-else class="no-results">No spells found.</p>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

type Spell = {
  id: string;
  name: string;
  type: string;
  effect: string;
  pronunciation?: string;
};

const searchQuery = ref('');
const selectedType = ref('');

const fetchSpells = async (): Promise<Spell[]> => {
  const res = await fetch('https://wizard-world-api.herokuapp.com/spells');
  return res.json();
};

const { data, isLoading } = useQuery<Spell[], Error>({ queryKey: ['spells'], queryFn: fetchSpells });

const spellTypes = computed(() => {
  const types = new Set((data.value ?? []).map(spell => spell.type));
  return Array.from(types);
});

const filteredSpells = computed(() => {
  let spells = data.value ?? [];
  if (searchQuery.value) {
    spells = spells.filter(spell => spell.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  if (selectedType.value) {
    spells = spells.filter(spell => spell.type === selectedType.value);
  }
  return spells;
});
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
