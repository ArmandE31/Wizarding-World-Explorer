<template>
  <div v-if="spell">
    <h1>{{ spell.name }}</h1>
    <p><strong>Type:</strong> {{ spell.type }}</p>
    <p><strong>Effect:</strong> {{ spell.effect }}</p>
    <p v-if="spell.pronunciation"><strong>Pronunciation:</strong> {{ spell.pronunciation }}</p>
    <router-link to="/spells">Back to Spells</router-link>
  </div>
  <p v-else class="no-results">Spell not found.</p>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

type Spell = {
  id: string
  name: string
  type: string
  effect: string
  pronunciation?: string
}

const route = useRoute()
const fetchSpellDetails = async (): Promise<Spell> => {
  const res = await fetch(`https://wizard-world-api.herokuapp.com/spells/${route.params.id}`)
  return res.json()
}

const { data } = useQuery<Spell, Error>({
  queryKey: ['spell', route.params.id],
  queryFn: fetchSpellDetails,
  enabled: !!route.params.id,
})
const spell = computed(() => data.value)
</script>
