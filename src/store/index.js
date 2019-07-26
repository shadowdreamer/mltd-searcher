import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/plugins/dexie'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: {},
        list: [],
        crrt: null,
        keywords: [],
        subItems: {
            rarity: [
                { text: 'SSR', type: 'rarity', val: 4, color: 'red ldarken-1' },
                { text: 'SR', type: 'rarity', val: 3, color: 'yellow darken-3' },
                { text: 'R', type: 'rarity', val: 2, color: 'grey darken-2' },
                { text: 'N', type: 'rarity', val: 1, color: 'grey' },
            ],
            idolType: [
                { text: 'PRINCESS', type: 'idolType', val: 1, color: 'red lighten-2' },
                { text: 'FAIRY', type: 'idolType', val: 2, color: 'blue' },
                { text: 'ANGEL', type: 'idolType', val: 3, color: 'yellow darken-2' },
                { text: 'EX', type: 'idolType', val: 5, color: 'green darken-1' },
            ]
        },
    },
    mutations: {
        sendMessage: (state, msg) => {
            state.message = {};
            state.message = msg
        },
        updateList: (state, result) => {
            state.list = result
        },
        setCrrt: (state, item) => {
            state.crrt = item
        },
        setKeywords: (state, payload) => {
            state.keywords = payload
        }
    },
    actions: {
        async submit ({ commit }, ev) {
            commit('setKeywords', ev)
            if (ev.length === 0) {
                let result = await db.idols.toArray()
                commit('updateList', result)
                return
            }
            let filter = {}
            for (let i of ev) {
                filter[i.type] ? filter[i.type].push(i.val) : filter[i.type] = [i.val]
            }
            const { idolId, rarity, idolType } = filter
            console.log(idolId, rarity, idolType)
            let first = idolId ? 'idolId' : rarity ? 'rarity' : idolType ? 'idolType' : '';
            let result = await db.transaction("r", db.idols, async function () {
                return await db.idols.where(first).anyOf(filter[first])
                    .filter(function (idol) {
                        let list = [true];
                        (!!idolId && first != 'idolId') ?
                            list.push(idolId.includes(idol.idolId)) : '';
                        (!!rarity && first != 'rarity') ?
                            list.push(rarity.includes(idol.rarity)) : '';
                        (!!idolType && first != 'idolType') ?
                            list.push(idolType.includes(idol.idolType)) : '';
                        return list.reduce((a, b) => a && b)
                    }).toArray()
            })
            commit('updateList', result)
        }
    }
})
