import { defineStore } from 'pinia'

const API_BASE_URL = 'https://wizard-world-api.herokuapp.com'

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

type Spell = {
  id: string
  name: string
  type: string
  effect: string
}

type Elixir = {
  id: string
  name: string
  effect: string
  ingredients: { id: string; name: string }[]
  instructions?: string
}

export const useWizardStore = defineStore('wizard', {
  state: () => ({
    isLoadingHouses: false,
    isLoadingSpells: false,
    isLoadingElixirs: false,
    houses: [] as House[],
    spells: [] as Spell[],
    elixirs: [] as Elixir[],
  }),
  actions: {
    async fetchHouses() {
      this.isLoadingHouses = true
      const response = await fetch(`${API_BASE_URL}/houses`)
      this.houses = await response.json()
      this.isLoadingHouses = false
    },
    async fetchSpells() {
      this.isLoadingSpells = true
      const response = await fetch(`${API_BASE_URL}/spells`)
      this.spells = await response.json()
      this.isLoadingSpells = false
    },
    async fetchElixirs() {
      this.isLoadingElixirs = true
      const response = await fetch(`${API_BASE_URL}/elixirs`)
      this.elixirs = await response.json()
      this.isLoadingElixirs = false
    },
  },
})
