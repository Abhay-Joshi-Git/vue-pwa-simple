<template>
  <div class="event-list-container">
    <h2>
      Events List
    </h2>
    <b-card
      header-border-variant="primary"
      header-bg-variant="secondary"
      header-text-variant="white"
      class="my-3 shadow bg-white rounded event-card"
      :header="event ? event.name : 'event'"
      v-for="event in events" :key="event.id" 
    >
      <div class="line-content" :title="event.id">
        <strong>Id:</strong>
        {{event.id}}
      </div>
      <div class="line-content" :title="event.author">
        <strong>Author:</strong>
        {{event.author}}
      </div>
    </b-card>
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

<style scoped>
.event-list-container {
  text-align: left;
}

.line-content {
  white-space: nowrap;  
}

.event-card {
  overflow-x: auto;
}
/* .card-header {
  padding: 5px;
} */
/* 
header text alignment
.card-header > div {
  padding-left: 15px;
} 
*/
</style>


