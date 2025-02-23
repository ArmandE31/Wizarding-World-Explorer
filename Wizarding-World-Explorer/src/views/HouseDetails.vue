<template>
  <div v-if="house">
    <h1>{{ house.name }}</h1>
    <p><strong>Founder:</strong> {{ house.founder }}</p>
    <p><strong>Mascot:</strong> {{ house.animal }}</p>
    <p>
      <strong>Traits:</strong>
      {{ house.traits.length ? house.traits.join(', ') : 'No traits available' }}
    </p>
    <p>
      <strong>Heads:</strong> {{ house.heads.length ? house.heads.join(', ') : 'No known heads' }}
    </p>
    <router-link to="/houses">Back to Houses</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

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

const route = useRoute()
const fetchHouseDetails = async (id: string): Promise<House> => {
  const res = await fetch(`https://wizard-world-api.herokuapp.com/houses/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch house details')
  }
  const data = await res.json()
  return {
    ...data,
    traits: data.traits.map((trait: { id: string; name?: string }) => trait.name || 'Unknown'),
    heads: data.heads.map(
      (head: { id: string; firstName?: string; lastName?: string }) =>
        `${head.firstName || 'Unknown'} ${head.lastName || 'Unknown'}`,
    ),
  }
}

const { data } = useQuery<House, Error>({
  queryKey: ['house', route.params.id],
  queryFn: () => fetchHouseDetails(route.params.id as string),
  enabled: !!route.params.id,
})
const house = computed(() => data.value)
</script>
