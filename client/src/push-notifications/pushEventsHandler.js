(function pushEventsHandler() {
  self.addEventListener('notificationclose', (e) => {
    const notification = e.notification;
    const primaryKey = notification.data.primaryKey;

    console.log(`Closed notification: ${primaryKey}`);
  });

  self.addEventListener('notificationclick', (e) => {
    const notification = e.notification;
    // const primaryKey = notification.data.primaryKey;
    const action = e.action;
    console.log('in notification click...');

    if (action === 'close') {
      notification.close();
    } else {
      // clients.openWindow('samples/page' + primaryKey + '.html');
      notification.close();
    }
    // TODO - close all notifications when one is clicked
  });

  self.addEventListener('push', (e) => {
    let body;
    console.log('being pushed...', e);

    if (e.data) {
      body = e.data.text();
    } else {
      body = 'Event Receieved';
    }

    const options = {
      body,
      icon: 'static/img/icons/events-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        { action: 'explore',
          title: 'Show details',
          icon: 'static/img/checkmark.png' },
        { action: 'close',
          title: 'Close the notification',
          icon: 'static/img/xmark.png' },
      ],
    };
    e.waitUntil(
      self.registration.showNotification('Push Notification', options),
    );
  });

  self.addEventListener('activate', () => {
    console.log('sw got activated ...');
    // send_message_to_all_clients('activated');
    // window.notificationHelper.initializeSWRegistration(self.registration);
  });
}());
