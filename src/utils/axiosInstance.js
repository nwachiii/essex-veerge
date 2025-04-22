import axios from 'axios';

const axiosInstance = axios.create();

// Set the timezone header on the client side
if (typeof window !== 'undefined') {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    axiosInstance.defaults.headers.common['Timezone'] = timeZone;
  } catch (error) {
    console.error('Could not detect timezone:', error);
    axiosInstance.defaults.headers.common['Timezone'] = 'UTC'; // Fallback
  }
}

export default axiosInstance;
