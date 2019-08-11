import http from './../../plugins/http.js';

export default {
    namespaced: true,
    state: {
        reportStatus: false,
        error: null,
        dataTerm: [],
        frameUrl: null,
    },
    getters: {
        reportStatus: (state) => state.reportStatus,
        error: (state) => state.error,
        dataTerm: (state) => state.dataTerm,
        frameUrl: (state) => state.frameUrl
    },
    mutations: {
        SET_DATA(state, payload) {
            state.dataTerm = payload;
        },
        SET_FRAME_URL(state, payload) {
            state.frameUrl = payload;
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
                    store.commit('SET_FRAME_URL', response.data.frameUrl);

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