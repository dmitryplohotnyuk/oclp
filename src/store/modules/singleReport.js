import axios from 'axios';

let http = axios.create({
	baseURL: 'http://emmielba.ddns.net/api_v2/'
});

export default {
    namespaced: true,
    state: {
        reportStatus: false,
        error: null,
        dataTerm: [],
    },
    getters: {
        reportStatus: (state) => state.reportStatus,
        error: (state) => state.error,
        dataTerm: (state) => state.dataTerm
    },
    mutations: {
        SET_DATA(state, payload) {
            state.dataTerm = payload;
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
        LOAD_DATA: async function (store, payload) {
            try {
                let url = 'load.php?pech=' + payload.pech + '&date=' + payload.date;
                let response = await http.get(url);
                store.commit('CLEAR_ERROR');
                if (response.data.status) {
                    store.commit('SET_REPORT_STATUS', true);
                    store.commit('SET_DATA', response.data.dataTerm);

                } else {
                    store.commit('SET_REPORT_STATUS', false);
                    store.commit('SET_ERROR', 'Выбранный архив не существует!');
                    store.commit('SET_DATA', []);
                }
            }
            catch(e) {
                store.commit('SET_ERROR', e.message);
                store.commit('SET_REPORT_STATUS', false);
                store.commit('SET_DATA', []);
            }
        },
        RESET_STATUS(store) {
            store.commit('SET_REPORT_STATUS', false);
        }
    }
}