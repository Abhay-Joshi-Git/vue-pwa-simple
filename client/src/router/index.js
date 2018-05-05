import Vue from 'vue';
import Router from 'vue-router';
import EventList from '@/modules/event-list';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'eventsList',
      component: EventList,
    },
  ],
});
