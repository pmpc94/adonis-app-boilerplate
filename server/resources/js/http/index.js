import axios from 'axios';
import store from '@/store';

export default () => {
  return axios.create({
    baseURL: store.state.baseUrl,
    timeout: 10000,
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${store.state.authentication.token}`
    }
  })
};
