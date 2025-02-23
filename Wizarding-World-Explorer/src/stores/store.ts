import { defineStore } from 'pinia';
import { useQuery } from '@tanstack/vue-query';

const API_BASE_URL = 'https://wizard-world-api.herokuapp.com';

type House = {
  id: string;
  name: string;
  animal: string;
  founder: string;
};

type Spell = {
  id: string;
  name: string;
  type: string;
  effect: string;
};

type Elixir = {
  id: string;
  name: string;
  effect: string;
  ingredients: string[];
};

export const useWizardStore = defineStore('wizard', {
  state: () => ({
    houses: [] as House[],
    spells: [] as Spell[],
    elixirs: [] as Elixir[],
  }),
  actions: {
    async fetchHouses() {
      const response = await fetch(`${API_BASE_URL}/houses`);
      this.houses = await response.json();
    },
    async fetchSpells() {
      const response = await fetch(`${API_BASE_URL}/spells`);
      this.spells = await response.json();
    },
    async fetchElixirs() {
      const response = await fetch(`${API_BASE_URL}/elixirs`);
      this.elixirs = await response.json();
    }
  }
});
