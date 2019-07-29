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
            ],
            extraType:[
                { text: 'Normal', type: 'extraType', val: 0, color: 'blue-grey darken-1' },
                { text: 'PST Rank', type: 'extraType', val: 2, color: 'amber darken-2' },
                { text: 'PST Point', type: 'extraType', val: 3, color: 'amber' },
                { text: 'Fes', type: 'extraType', val: 4, color: 'pink darken-1' },
                { text: '1st', type: 'extraType', val: 5, color: 'indigo darken-1' },
                { text: '2nd', type: 'extraType', val: 7, color: 'indigo darken-1' },
            ]
        },
    },
    mutations: {
        sendMessage: (state, msg) => {
            state.message = {};
            state.message = msg
        },
        updateList: (state, result) => {
            state.list = result.reverse()
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
            const { idolId, rarity, idolType, extraType } = filter
            let first = 
                idolId ? 'idolId' : 
                rarity ? 'rarity' : 
                idolType ? 'idolType' : 
                extraType ? 'extraType' :''
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
                        (!!extraType && first != 'extraType') ?
                            list.push(extraType.includes(idol.extraType)) : '';
                        if([5,7].includes(idol.extraType)){
                            list.push(extraType?extraType.includes(5)||extraType.includes(7):false )
                        }
                        return list.reduce((a, b) => a && b)
                    }).toArray()
            })
            commit('updateList', result)
        }
    }
})
