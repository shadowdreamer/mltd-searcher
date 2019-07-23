import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: {},
        list: []
    },
    mutations: {
        sendMessage: (state, msg) => {
            state.message = {};
            state.message = msg
        },
        updateList: (state, result) => {
            state.list = result
        }
    },
    actions: {

    }
})
