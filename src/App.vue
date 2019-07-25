<template>
  <v-app>
    <v-app-bar color="primary" dark dense app>
      <v-layout justify-center>
        <v-flex xs12 md8>
          <v-toolbar-items>
            <v-btn icon v-show="$route.name === 'card'" @click="$router.push({path:'/'})">
              <v-icon>keyboard_backspace</v-icon>
            </v-btn>
            <v-toolbar-title
              v-if="!!$store.state.crrt && $route.name==='card'"
            >{{$store.state.crrt.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text small @click.stop v-show="$route.name === 'home'">
              <v-icon>sort</v-icon>sort
            </v-btn>
            <v-btn text small @click="filterdialog=true" v-show="$route.name === 'home'">
              <v-icon>filter_list</v-icon>filter
            </v-btn>
          </v-toolbar-items>
        </v-flex>
      </v-layout>
    </v-app-bar>
    <v-content>
      <v-layout justify-center>
        <v-flex xs12 md8>
          <router-view></router-view>
        </v-flex>
      </v-layout>
      <SnackBar />
      <FilterDialog v-model="filterdialog" @close="filterdialog=false" />
      <v-footer absolute>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import { db } from '@/plugins/dexie'
export default {
  name: "App",
  data: () => ({
    filterdialog: false
  }),
  components: {
    SnackBar: () => import("@/components/SnackBar"),
    FilterDialog: () => import("@/components/FilterDialog")
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
        this.$store.commit('sendMessage', { text: 'updating idol data' })
        const { data } = await this.$axios.post("/my-mltd", {
          version: serverVer
        })
        await db.idols.bulkPut(data.cards)
        await db.dataver.put({ ver: 'current', currentVersion: serverVer })
        this.$store.commit('sendMessage', { text: 'update success' })
      } else {
        this.$store.commit('sendMessage', { text: 'idol data is new' })
      }
    },
  },
  mounted () {
    this.getCards()
    window.db = db
  }
}
</script>
<style>
html {
  overflow-y: hidden;
}
</style>

