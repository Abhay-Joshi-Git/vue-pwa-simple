<template>
  <div>
    <h2>
      Events List
    </h2>
    <div v-for="event in events" :key="event.id">
      <div>{{event.name}}</div>
      <div>{{event.id}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.axios.get('/api/events').then((response) => {
      this.events = response.data;
    });
  },
};
</script>

