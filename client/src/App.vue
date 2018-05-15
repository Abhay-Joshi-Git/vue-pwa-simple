<template>
  <div id="app" class="d-flex flex-column h-100"> 
    <Header />
    <b-container fluid class="shadow py-3 mb-5 bg-white rounded d-flex flex-column flex-grow">
      <router-view></router-view>
    </b-container>
    <Snackbar v-if="!isOnline" message="You appear to be offline"></Snackbar>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar';
import Header from '@/components/Header';

const EVENTS = ['online', 'offline', 'load'];

export default {
  name: 'app',
  data: function data() {
    return {
      isOnline: navigator.onLine || false,
    };
  },
  components: {
    Snackbar,
    Header,
  },
  methods: {
    updateOnlineStatus() {
      console.log('updating online status', navigator.onLine);
      this.isOnline = navigator.onLine || false;
    },
  },
  mounted() {
    EVENTS.forEach(event => window.addEventListener(event, this.updateOnlineStatus));
  },
  beforeDestroy() {
    EVENTS.forEach(event => window.removeEventListener(event, this.updateOnlineStatus));
  },
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

</style>
