import axios from 'axios';

let http = axios.create({
	baseURL: 'http://192.168.9.3/oclp/viewer/api_v2/'
});

export default http;