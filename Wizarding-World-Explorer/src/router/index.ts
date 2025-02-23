import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import HousesMain from '@/views/HousesMain.vue'
import Spells from '@/views/Spells.vue'
import Elixirs from '@/views/Elixirs.vue'
import HouseDetails from '@/views/HouseDetails.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/houses', component: HousesMain },
  { path: '/houses/:id', component: HouseDetails, props: true },
  { path: '/spells', component: Spells },
  { path: '/elixirs', component: Elixirs },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
