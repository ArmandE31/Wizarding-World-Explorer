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
    errorHouses: null as string | null,
    errorSpells: null as string | null,
    errorElixirs: null as string | null,
    isLoadingHouses: false,
    isLoadingSpells: false,
    isLoadingElixirs: false,
    houses: [] as House[],
    spells: [] as Spell[],
    elixirs: [] as Elixir[],
  }),
  actions: {
    async fetchHouses() {
      this.errorHouses = null
      try {
        this.isLoadingHouses = true
        const response = await fetch(`${API_BASE_URL}/houses`)
        this.houses = await response.json()
      } catch (error) {
        this.errorHouses = 'Failed to load houses. Please try again later.'
        console.error('Error fetching houses:', error)
        this.houses = []
      } finally {
        this.isLoadingHouses = false
      }
    },
    async fetchSpells() {
      this.errorSpells = null
      try {
        this.isLoadingSpells = true
        const response = await fetch(`${API_BASE_URL}/spells`)
        this.spells = await response.json()
      } catch (error) {
        this.errorSpells = 'Failed to load spells. Please try again later.'
        console.error('Error fetching spells:', error)
        this.spells = []
      } finally {
        this.isLoadingSpells = false
      }
    },
    async fetchElixirs() {
      this.errorElixirs = null
      try {
        this.isLoadingElixirs = true
        const response = await fetch(`${API_BASE_URL}/elixirs`)
        this.elixirs = await response.json()
      } catch (error) {
        this.errorElixirs = 'Failed to load elixirs. Please try again later.'
        console.error('Error fetching elixirs:', error)
        this.elixirs = []
      } finally {
        this.isLoadingElixirs = false
      }
    },
  },
})
