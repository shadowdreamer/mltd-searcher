<template>
  <v-app style="background-color:#f5ecbb">
    <v-content>
      <SearchBar/>
      <SnackBar/>
      <v-btn
        color="success"
        @click.stop=""
      >text</v-btn>
    </v-content>
  </v-app>
</template>

<script>
import {db} from '@/plugins/dexie'
export default {
  name: "App",
  data: () => ({
    cards: {}
  }),
  components: {
    SearchBar: () => import("@/components/SearchBar"),
    SnackBar: () => import("@/components/SnackBar")
  },
  methods: {
    async checkVersion () {
      const serverVer = (await this.$axios("/mltd/version/latest")).data.res.updateTime
      console.log(serverVer)
      let current = await db.dataver.get({ver:'current'})
      console.log(current)
      if(!current){
        return serverVer
      }else if(current.currentVersion != serverVer){
        return serverVer
      }else{
        return false
      }
    },
    async getCards () {
      let serverVer = await this.checkVersion()
      if(serverVer){
        console.log("updating cards data")
        const { data } = await this.$axios.post("/my-mltd", {
          version: serverVer
        }) 
        console.log(data)
        await db.idols.bulkPut(data.cards)
        await db.dataver.put({ver:'current',currentVersion:serverVer})       
      }
    },
  },
  mounted () {
    this.getCards()
    window.db = db
    // this.checkVersion()
  }
}
</script>
