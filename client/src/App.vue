<template>
  <div id="app"> 
    <header class="mb-3">
      <img  class="header-image" src="./assets/events.png" alt="Tech Events">
    </header>
    <b-container fluid class="shadow py-3 mb-5 bg-white rounded">
      <router-view></router-view>
    </b-container>
  </div>
  
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 76px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

.header-image {
  height: 70px;
  width: 70px;
}

</style>
