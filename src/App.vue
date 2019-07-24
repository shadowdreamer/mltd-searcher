<template>
  <v-app>
    <v-toolbar app dense flat>    
      <v-layout row pb-2 justify-center>
      <v-flex md8 xs12>
        <v-toolbar-items>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop>
             <v-icon>sort</v-icon>sort
          </v-btn>
          <v-btn flat class="ml-4" @click="filterdialog=true">
              <v-icon>filter_list</v-icon>filter
          </v-btn>
        </v-toolbar-items> 
      </v-flex>
    </v-layout>
    </v-toolbar>
    <v-content >
    <v-layout row pb-2 justify-center>
      <v-flex md8 xs12>
        <SearchBar
          v-model="keywords"
          @input="submit($event)"          
        />
      </v-flex>
    </v-layout>
      <v-layout row justify-center>
        <v-flex xs12 md8>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-content>
    <SnackBar />
    <FilterDialog v-model="filterdialog" @close="filterdialog=false"/>
  </v-app>
</template>

<script>
import { db } from '@/plugins/dexie'
export default {
  name: "App",
  data: () => ({
    keywords: [],
    filterdialog:false
  }),
  components: {
    SearchBar: () => import("@/components/SearchBar"),
    SnackBar: () => import("@/components/SnackBar"),
    FilterDialog:()=>import("@/components/FilterDialog")
  },
  methods: {
    async checkVersion () {
      const serverVer = (await this.$axios("/mltd/version/latest")).data.res.updateTime
      console.log(serverVer)
      let current = await db.dataver.get({ ver: 'current' })
      console.log(current)
      if (!current) {
        return serverVer
      } else if (current.currentVersion != serverVer) {
        return serverVer
      } else {
        return false
      }
    },
    async getCards () {
      let serverVer = await this.checkVersion()
      if (serverVer) {
        this.$store.commit('sendMessage',{text:'updating idol data'})
        const { data } = await this.$axios.post("/my-mltd", {
          version: serverVer
        })        
        await db.idols.bulkPut(data.cards)
        await db.dataver.put({ ver: 'current', currentVersion: serverVer })
        this.$store.commit('sendMessage',{text:'update success'})
      }else{
        this.$store.commit('sendMessage',{text:'idol data is new'})
      }
    },
    async submit (ev) {
      console.log(ev)
      if(ev.length === 0){
        let result = await db.idols.toArray()
        // this.$store.commit('updateList', result)
        return
      }
      
      // let range = Array.from(ev, ev => [parseInt(ev.text), parseInt(ev.text) + 1])
      // console.log(range)
      // let result = await db.idols.where('idolId').inAnyRange(range).toArray()
      // let result = await db.idols.toArray()
      // this.$store.commit('updateList', result)
    }
  },
  mounted () {
    // this.getCards()
    window.db = db
    // this.checkVersion()
  }
}
</script>
<style scoped>
</style>

