<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/houses">Houses</router-link> |
      <router-link to="/spells">Spells</router-link> |
      <router-link to="/elixirs">Elixirs</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
