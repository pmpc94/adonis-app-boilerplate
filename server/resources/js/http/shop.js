import axios from 'axios';
import store from '@/store/shop';

export default () => {
  return axios.create({
    baseURL: store.state.baseUrl,
    timeout: 5000,
    headers: {
      accept: 'application/json'
    }
  })
};
