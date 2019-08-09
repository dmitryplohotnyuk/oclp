import axios from 'axios';

let http = axios.create({
	baseURL: 'http://localhost:8080/'
});

export default {
    namespaced: true,
    state: {
        reportStatus: false,
        error: null,
        printData: null
    },
    getters: {
        reportStatus: (state) => state.reportStatus,
        error: (state) => state.error,
        printData: (state) => state.printData
    },
    mutations: {
        SET_PRINT_DATA(state, payload) {
            state.printData = payload;
        },
        SET_REPORT_STATUS(state, payload) {
            state.reportStatus = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAR_ERROR(state){
            state.error = null;
        }    
    },
    actions: {
        LOAD_STATUS: async function (store) {
            try {
                let response = await http.get('');
                store.commit('CLEAR_ERROR');
                if (response.data.status) {
                    store.commit('SET_REPORT_STATUS', true);
                } else {
                    store.commit('SET_REPORT_STATUS', false);
                }
            }
            catch(e) {
                store.commit('SET_ERROR', e.message);
            }
        },
        LOAD_PRINT_DATA: async function (store) {
            try {
                let response = await http.get('');
                store.commit('CLEAR_ERROR');
                store.commit('SET_PRINT_DATA', response.data);
            }
            catch(e) {
                store.commit('SET_ERROR', e.message);
            }
        },
    }
}