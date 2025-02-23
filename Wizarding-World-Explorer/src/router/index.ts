import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import HousesMain from '@/views/HousesMain.vue'
import SpellsLibrary from '@/views/SpellsLibrary.vue'
import Elixirs from '@/views/Elixirs.vue'
import HouseDetails from '@/views/HouseDetails.vue'
import SpellDetails from '@/views/SpellDetails.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/houses', component: HousesMain },
  { path: '/houses/:id', component: HouseDetails, props: true },
  { path: '/spells', component: SpellsLibrary },
  { path: '/spells/:id', component: SpellDetails, props: true },
  { path: '/elixirs', component: Elixirs },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
