<template>
  <v-app>
    <v-toolbar extended dense flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>
    <v-layout row pb-2 justify-center>
      <v-flex md8 xs12>
        <SearchBar @submit="submit($event)" style="margin-top:-54px" />
      </v-flex>
    </v-layout>
    <v-content style="margin-top:-54px">
      <v-layout row justify-center>
        <v-flex xs12 md8>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-content>
    <SnackBar />
  </v-app>
</template>

<script>
import { db } from '@/plugins/dexie'
export default {
  name: "App",
  data: () => ({

  }),
  components: {
    SearchBar: () => import("@/components/SearchBar"),
    SnackBar: () => import("@/components/SnackBar")
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
        console.log("updating cards data")
        const { data } = await this.$axios.post("/my-mltd", {
          version: serverVer
        })
        console.log(data)
        await db.idols.bulkPut(data.cards)
        await db.dataver.put({ ver: 'current', currentVersion: serverVer })
      }
    },
    async submit (ev) {
      console.log(ev)
      let range = Array.from(ev, ev => [parseInt(ev.text), parseInt(ev.text) + 1])
      console.log(range)
      let result = await db.idols.where('idolId').inAnyRange(range).toArray()
      // let result = await db.idols.toArray()
      this.$store.commit('updateList', result)
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

