<template>
  <div class="snackbar">
    {{message}}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'events for you!',
    },
  },
};
</script>


<style scoped>
.snackbar {
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 16px;
  position: fixed;
  z-index: 999;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}
</style>
