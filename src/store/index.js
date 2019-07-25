import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: {},
        list: [],
        crrt:null
    },
    mutations: {
        sendMessage: (state, msg) => {
            state.message = {};
            state.message = msg
        },
        updateList: (state, result) => {
            state.list = result
        },
        setCrrt:(state,item)=>{
            state.crrt = item
        }
    },
    actions: {

    }
})
