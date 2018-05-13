class PushNotificationHelper {
  swRegistration;
  isSubscribed = false;
  apiAgent;

  constructor(apiHelper) {
    this.apiAgent = apiHelper;
    this.updateSubscription();
    navigator.serviceWorker.getRegistration().then((reg) => {
      this.swRegistration = reg;
      this.subscribeUser();
    });
  }

  updateSubscription() {
    swRegistration.pushManager.getSubscription().then((subscription) => {
      this.isSubscribed = subscription != null;
      if (subscription) {
        this.addSubscriptionOnServer(subscription);
      }
    });
  }

  subscribeUser() {
    if (!this.swRegistration || this.isSubscribed) {
      return;
    }
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true
    })
    .then(function(subscription) {
      console.log('User is subscribed:', subscription);
      addSubscriptionOnServer(subscription);
      this.isSubscribed = true;
    })
    .catch(function(err) {
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
    var subscr = subscription;
    this.swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
      removeSubscriptionOnServer(subscr);
      console.log('User is unsubscribed');
      this.isSubscribed = false;
    });
  }

  addSubscriptionOnServer(subscription) {
    console.log('sending subscription to server...');
    if (this.apiAgent & subscription) {
      this.apiAgent.POST('/api/push-subscription', subscription)
      .catch((error) => {
        console.log('error while sending suscription to server - ', error);
      });
    }
  }

  removeSubscriptionOnServer(subscription) {
    console.log('removing subscription from server...');
    if (this.apiAgent & subscription) {
      this.apiAgent.delete('/api/push-subscription?' + subscription.endpoint)
      .catch((error) => {
        console.log('error while removing suscription from server - ', error);
      });
    }
  }
}

export default PushNotificationHelper;