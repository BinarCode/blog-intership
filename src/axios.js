import axios from 'axios';

axios.defaults.baseUrl = 'https://api-internship.binarcode.com';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');