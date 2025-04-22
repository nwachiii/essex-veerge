import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: 'AIzaSyAjzVQxB2yg-Qwferb-1uWvjVIkuYfNYUQ',
  authDomain: 'matadortrust.firebaseapp.com',
  projectId: 'matadortrust',
  storageBucket: 'matadortrust.appspot.com',
  messagingSenderId: '258913215953',
  appId: '1:258913215953:web:a6c29cdecc261cb408acf0',
  measurementId: 'G-HG3VV3MTSM',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

messaging.getToken({
  vapidKey:
    'BPweJ8hyprXgdEK8xlq5npgNsPuN9COlxZPDvOg_3fDYLQUTO3k9UnZTeHDct5mkV-_sXmITV9bJUgaXb5WLWC4',
});
