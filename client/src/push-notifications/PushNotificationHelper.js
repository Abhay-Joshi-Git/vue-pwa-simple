import axios from 'axios';

class PushNotificationHelper {
  swRegistration;
  isSubscribed = false;

  constructor() {
    console.log('in notification helper cntr ...');
    navigator.serviceWorker.getRegistration().then((reg) => {
      this.swRegistration = reg;
      console.log('got reg ..');
      this.updateSubscription();
    });
  }

  getSubscription() {
    return this.isSubscribed;
  }

  updateSubscription() {
    if (!this.swRegistration) {
      return;
    }
    this.swRegistration.pushManager.getSubscription().then((subscription) => {
      console.log('update subscription - ', subscription);
      this.isSubscribed = subscription != null;
      if (subscription) {
        this.addSubscriptionOnServer(subscription);
      } else {
        this.subscribeUser();
      }
    });
  }

  subscribeUser() {
    if (!this.swRegistration || this.isSubscribed) {
      return;
    }
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
    }).then((subscription) => {
      console.log('User is subscribed:', subscription);
      this.addSubscriptionOnServer(subscription);
      this.isSubscribed = true;
    }).catch((err) => {
      if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied');
      } else {
        console.error('Failed to subscribe the user: ', err);
      }
    });
  }

  unsubscribeUser() {
    if (!this.swRegistration || !this.isSubscribed) {
      return;
    }
    let subscr;
    this.swRegistration.pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        subscr = subscription;
        return subscription.unsubscribe();
      }
      return Promise.of(null);
    }).catch((error) => {
      console.log('Error unsubscribing', error);
    }).then(() => {
      this.removeSubscriptionOnServer(subscr);
      console.log('User is unsubscribed');
      this.isSubscribed = false;
    });
  }

  addSubscriptionOnServer(subscription) {
    console.log('sending subscription to server...');
    if (this.isSubscribed && subscription) {
      axios.post('/api/push-subscription', subscription).catch((error) => {
        console.log('error while sending suscription to server - ', error);
      });
    }
  }

  removeSubscriptionOnServer(subscription) {
    console.log('removing subscription from server...');
    if (this.isSubscribed && subscription) {
      axios.delete(`/api/push-subscription?${subscription.endpoint}`).catch((error) => {
        console.log('error while removing suscription from server - ', error);
      });
    }
  }
}

export default PushNotificationHelper;
