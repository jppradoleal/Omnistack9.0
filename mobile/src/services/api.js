import axios from 'axios';

const api = axios.create({
    baseURL: 'https://omnistack9-joaop.herokuapp.com'
});

export default api;