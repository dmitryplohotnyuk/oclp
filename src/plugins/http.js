import axios from 'axios';

let http = axios.create({
	baseURL: 'http://emmielba.ddns.net/oclp-monitor/api_v2/'
});

export default http;