import http from './../../plugins/http.js';

export default {
    namespaced: true,
    state: {
        error: null,
        data: [],
        terms: [],
        frameUrl: null,
    },
    getters: {
        error: (state) => state.error,
        data: (state) => state.data,
        terms: (state) => state.terms,
        frameUrl: (state) => state.frameUrl
    },
    mutations: {
        SET_DATA(state, payload) {
            state.data = payload;
        },
        SET_TERMS(state, payload) {
            state.terms = payload;
        },
        SET_FRAME_URL(state, payload) {
            state.frameUrl = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAR_ERROR(state){
            state.error = null;
        }  
    },
    actions: {
        LOAD_TERMS: async function (store) {
            try {
                let url = 'realtime.php?task=terms';
                let response = await http.get(url);
                store.commit('CLEAR_ERROR');
                store.commit('SET_DATA', response.data.data);
                store.commit('SET_TERMS', response.data.terms);
                store.commit('SET_FRAME_URL', response.data.frameUrl);
            }
            catch(e) {
                store.commit('SET_ERROR', e.message);
                store.commit('SET_REPORT_STATUS', false);
                store.commit('SET_DATA', []);
            }
        },
        
    }
}