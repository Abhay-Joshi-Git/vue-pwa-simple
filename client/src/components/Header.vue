<template functional>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">
      <img  class="header-image" src="../assets/events.png" alt="Tech Events">
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/">Events</b-nav-item>
        <b-nav-item href="/create" disabled>Create Event</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/">User Profile</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style lang="scss" scoped>

.navbar-brand {
  height: 46px;
  padding: 0 16px 0 24px;

  .header-image {
    height: 40px;
    width: 40px;
  }
}

</style>

