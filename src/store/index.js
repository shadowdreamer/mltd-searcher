import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/plugins/dexie'
const idol = require('../idols.json')
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: {},
        list: [],
        crrt: null,
        keywords: [],
        idol,
        subItems: {
            rarity: [
                { text: 'SSR', type: 'rarity', val: 4, color: 'red ldarken-1' },
                { text: 'SR', type: 'rarity', val: 3, color: 'yellow darken-3' },
                { text: 'R', type: 'rarity', val: 2, color: 'grey darken-2' },
                { text: 'N', type: 'rarity', val: 1, color: 'grey' },
                { text: 'Rank5', type: 'rank5', val: 1, color: 'blue-grey darken-2' },
            ],
            idolType: [
                { text: 'PRINCESS', type: 'idolType', val: 1, color: 'red lighten-2' },
                { text: 'FAIRY', type: 'idolType', val: 2, color: 'blue' },
                { text: 'ANGEL', type: 'idolType', val: 3, color: 'yellow darken-2' },
                { text: 'EX', type: 'idolType', val: 5, color: 'green darken-1' },
            ],
            extraType: [
                { text: 'Normal', type: 'extraType', val: 0, color: 'blue-grey darken-1' },
                { text: 'PST Rank', type: 'extraType', val: 2, color: 'amber darken-2' },
                { text: 'PST Point', type: 'extraType', val: 3, color: 'amber' },
                { text: 'Fes', type: 'extraType', val: 4, color: 'pink darken-1' },
                { text: 'SHS', type: 'extraType', val: 14, color: 'amber lighten-1' },
                { text: '1st', type: 'extraType', val: 5, color: 'indigo darken-1' },
                { text: '2nd', type: 'extraType', val: 7, color: 'indigo darken-1' },
                { text: '3rd', type: 'extraType', val: 10, color: 'indigo darken-1' },
                { text: '4th', type: 'extraType', val: 13, color: 'indigo darken-1' },
            ],
            customTag: [
                { text: '制服', type: 'custom', val: '制服', color: 'red darken-2' },
            ]
        },
        sortby: 'id',
        isReverse: false,
    },
    mutations: {
        sendMessage: (state, msg) => {
            state.message = {};
            state.message = msg
        },
        updateList: (state, result) => {
            if(state.sortby == 'total'){
                result = result.sort((a, b) => 
                (b.vocalMaxAwakened+b.danceMaxAwakened+b.visualMaxAwakened)-
                (a.vocalMaxAwakened+a.danceMaxAwakened+a.visualMaxAwakened))
            }else{
                result = result.sort((a, b) => b[state.sortby] - a[state.sortby])
            }
            state.isReverse ? result = result.reverse() : null;
            state.list = result
        },
        setCrrt: (state, item) => {
            item &&  !item.wish && (item.wish=null)
            state.crrt = item
        },
        setKeywords: (state, payload) => {
            state.keywords = payload
        }
    },
    actions: {
        async submit ({ state, commit }, ev) {
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
            let { idolId, rarity, idolType, extraType, custom, rank5 } = filter
            let first =
                idolId ? 'idolId' :
                    rarity ? 'rarity' :
                        idolType ? 'idolType' :
                            extraType ? 'extraType' : null
            let result = await db.transaction("r", db.idols, async function () {
                if (first) {
                    return await db.idols.where(first).anyOf(filter[first]).toArray()
                } else {
                    return await db.idols.toArray()
                }
            })
            commit('updateList', result.filter(idol => {
                let list = [true];
                let customBool = true
                let customIdolId = []
                let customPST = false
                if (custom) {
                    for (let val of custom) {
                        customBool = idol.name.toLowerCase().indexOf(val.toLowerCase()) > -1 && customBool
                        state.idol.forEach(el => {
                            if ((el.spell + el.text).indexOf(val.toLowerCase()) > -1) {
                                customIdolId.push(el.val)
                            }
                        });
                        if (val.toLowerCase() === 'pst') customPST = [2, 3].includes(idol.extraType)
                    }
                    list.push(customIdolId.includes(idol.idolId) || customBool || customPST)
                }
                (!!idolId && first != 'idolId') ?
                    list.push(idolId.includes(idol.idolId)) : '';
                (!!rarity && first != 'rarity') ?
                    list.push(rarity.includes(idol.rarity)) : '';
                (!!idolType && first != 'idolType') ?
                    list.push(idolType.includes(idol.idolType)) : '';
                (!!extraType && first != 'extraType') ?
                    list.push(extraType.includes(idol.extraType)) : '';
                if ([5, 7,10].includes(idol.extraType)) {
                    list.push(extraType ? ( extraType.includes(5) || extraType.includes(7) || extraType.includes(10)) : false)
                }
                if(rank5){
                    list.push(!!idol.rank5Costume)
                }
                return list.reduce((a, b) => a && b)
            }))
        },
        sort: ({ commit, state }, { sortby, isReverse }) => {
            state.sortby = sortby
            state.isReverse = isReverse
            commit('updateList', state.list)
        },
        async toggleLove ({ commit, state }) {
            if (state.crrt.wish == 1) {
                state.crrt.wish = null
                await db.idols.put(state.crrt)
            } else {
                state.crrt.wish = 1
                await db.idols.put(state.crrt)
            }
        }
    }
})
