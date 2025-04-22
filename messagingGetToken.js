const {getMessaging, getToken} = require('firebase/messaging');

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    'BPweJ8hyprXgdEK8xlq5npgNsPuN9COlxZPDvOg_3fDYLQUTO3k9UnZTeHDct5mkV-_sXmITV9bJUgaXb5WLWC4',
})
  .then(currentToken => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch(err => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
