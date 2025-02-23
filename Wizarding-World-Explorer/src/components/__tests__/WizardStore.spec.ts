import { setActivePinia, createPinia } from 'pinia'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useWizardStore } from '@/stores/store.ts'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Wizard Store', () => {
  it('initializes with empty data', () => {
    const store = useWizardStore()
    expect(store.houses).toEqual([])
    expect(store.spells).toEqual([])
    expect(store.elixirs).toEqual([])
    expect(store.isLoadingHouses).toBe(false)
    expect(store.isLoadingSpells).toBe(false)
    expect(store.isLoadingElixirs).toBe(false)
  })

  it('fetches houses successfully', async () => {
    const mockHouses = [
      {
        id: '1',
        name: 'Gryffindor',
        houseColours: 'Scarlet and Gold',
        founder: 'Godric Gryffindor',
        animal: 'Lion',
        element: 'Fire',
        ghost: 'Nearly Headless Nick',
        commonRoom: 'Gryffindor Tower',
        heads: [],
        traits: [],
      },
    ]
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockHouses),
        }) as Promise<Response>,
    )

    const store = useWizardStore()
    await store.fetchHouses()
    expect(store.houses).toEqual(mockHouses)
    expect(store.isLoadingHouses).toBe(false)
    expect(store.errorHouses).toBe(null)
  })

  it('fetches spells successfully', async () => {
    const mockSpells = [
      { id: '1', name: 'Expelliarmus', type: 'Charm', effect: 'Disarms an opponent' },
    ]
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockSpells),
        }) as Promise<Response>,
    )
    const store = useWizardStore()
    await store.fetchSpells()
    expect(store.spells).toEqual(mockSpells)
    expect(store.isLoadingSpells).toBe(false)
    expect(store.errorSpells).toBe(null)
  })

  it('fetches elixirs successfully', async () => {
    const mockElixirs = [{ id: '1', name: 'Felix Felicis', effect: 'Grants luck', ingredients: [] }]
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockElixirs),
        }) as Promise<Response>,
    )
    const store = useWizardStore()
    await store.fetchElixirs()
    expect(store.elixirs).toEqual(mockElixirs)
    expect(store.isLoadingElixirs).toBe(false)
    expect(store.errorElixirs).toBe(null)
  })
})
