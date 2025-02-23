<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/houses">Houses Overview</router-link>
      <router-link to="/spells">Spells Library</router-link>
      <router-link to="/elixirs">Elixirs Encyclopedia</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Arial, sans-serif;
}

#app {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

/* Navbar */
.navbar {
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 10px 0;
  border-bottom: 2px solid #ccc;
  color: green;
}

.navbar a {
  text-decoration: none;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  #app {
    padding: 10px;
  }

  .navbar {
    flex-direction: column;
    gap: 10px;
  }

  .navbar a {
    font-size: 1rem;
  }
}
</style>
