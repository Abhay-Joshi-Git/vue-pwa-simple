<template>
  <div class="event-list-container">
    <h2>
      Events List
    </h2>
    <b-row>
      <b-col sm="10" md="5" lg="4"
        v-for="event in events" :key="event.id"      
      >
      <b-card 
        header-border-variant="primary"
        header-bg-variant="secondary"
        header-text-variant="white"
        class="my-3 shadow bg-white rounded event-card"
        :header="event ? event.name : 'event'"
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
      </b-col>
    </b-row>
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

<style scoped lang="scss">

.event-list-container {
  text-align: left;
}

/* replace absolute media queries with bootstrap mixins */
@media (max-width: 767px) {
  .line-content {
    white-space: nowrap;
  }

  .event-card {
    overflow-x: auto;
  }
}

@media (min-width: 768px) {
  .line-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>


