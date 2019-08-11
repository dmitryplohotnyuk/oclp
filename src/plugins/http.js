import axios from 'axios';

let http = axios.create({
	baseURL: 'http://localhost:8000/api_v2/'
});

export default http;