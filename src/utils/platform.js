import {useToast} from '@chakra-ui/react';

function getOperatingSystem(window) {
  let operatingSystem = 'Not known';
  if (window.navigator.appVersion.indexOf('Win') !== -1) {
    operatingSystem = 'Windows OS';
  }
  if (window.navigator.appVersion.indexOf('Mac') !== -1) {
    operatingSystem = 'MacOS';
  }
  if (window.navigator.appVersion.indexOf('X11') !== -1) {
    operatingSystem = 'UNIX OS';
  }
  if (window.navigator.appVersion.indexOf('Linux') !== -1) {
    operatingSystem = 'Linux OS';
  }

  return operatingSystem;
}

function getBrowser(window) {
  let currentBrowser = 'Not known';
  if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
    currentBrowser = 'Google Chrome';
  } else if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
    currentBrowser = 'Mozilla Firefox';
  } else if (window.navigator.userAgent.indexOf('MSIE') !== -1) {
    currentBrowser = 'Internet Exployer';
  } else if (window.navigator.userAgent.indexOf('Edge') !== -1) {
    currentBrowser = 'Edge';
  } else if (window.navigator.userAgent.indexOf('Safari') !== -1) {
    currentBrowser = 'Safari';
  } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
    currentBrowser = 'Opera';
  } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
    currentBrowser = 'YaBrowser';
  } else {
    console.log('Others');
  }

  return currentBrowser;
}

export const getUserLocation = () => {
  // const toast = useToast()
  fetch('https://extreme-ip-lookup.com/json/?key=bi9Ew5d5NV4Mhv6XGz5o')
    .then(res => res.json())
    .then(response => {
      // console.log(response);
      typeof window !== 'undefined' &&
        localStorage !== 'undefined' &&
        localStorage.setItem('country', JSON.stringify(`${response.city}, ${response.country} `));
    })
    .catch((data, status) => {
      console.log('Request failed:', data);
      // alert('🔐 We would need to confirm your location before you can reset your password. This is a security measure to ensure our users are protected. Please contact support 👮🏻‍♂️');
    });
};
export const OS = window => getOperatingSystem(window);

export const currentBrowser = window => getBrowser(window);
