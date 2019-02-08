import axios from 'axios';
import store from '@/store/admin';

export default () => {
  return axios.create({
    baseURL: store.state.baseUrl,
    timeout: 5000,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${store.state.authentication.token}`
    }
  })
};
