<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      dense
      app
      :prominent="$route.name==='card'"
      :shrink-on-scroll="$route.name==='card'"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!!$store.state.crrt && $route.name==='card'">{{$store.state.crrt.name}}</v-toolbar-title>
      <v-toolbar-title v-if="$route.name==='gamenews'">Game News</v-toolbar-title>
      <v-toolbar-title v-if="$route.name==='about'">About</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-show="$route.name === 'home'">
        <SortDialog/>
        <FilterDialog/>
        <Help/>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav>
        <v-list-item link :to="link.to" 
        v-for="link in [
        {to:'/',icon:'dashboard',text:'Home'},
        {to:'/gamenews',icon:'description',text:'Game News'},
        {to:'/about',icon:'mdi-help-box',text:'About'}
        ]" :key="link.text">
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{link.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-layout justify-center>
        <v-flex xs12 md8>
          <router-view></router-view>
        </v-flex>
      </v-layout>
      <SnackBar />      
      <BottomSheet v-model="bottomSheet" :progress="progress" :message="message" />
      <v-footer absolute>
        <v-spacer></v-spacer>
        Data provider:
         <v-btn color="#ea5b76" small text dark target="_blank" 
        href="https://api.matsurihi.me/docs/">matsurihi.me
        <v-icon small>mdi-open-in-new</v-icon>
         </v-btn>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import { db } from '@/plugins/dexie'
export default {
  name: "App",
  data: () => ({
    bottomSheet: false,
    message: '',
    progress: 0,
    drawer: false
  }),
  components: {
    SnackBar: () => import("@/components/SnackBar"),
    FilterDialog: () => import("@/components/FilterDialog"),
    SortDialog: () => import("@/components/SortDialog"),
    BottomSheet: () => import("@/components/BottomSheet"),
    Help: () => import("@/components/Help"),
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
      let _this = this
      let localLength = await db.idols.count()
      if (localLength > 100) localLength += 100;
      let serverVer = await this.checkVersion()
      if (serverVer) {
        this.bottomSheet = true
        this.message = 'pending'
        this.$store.commit('sendMessage', { text: 'updating idol data' })
        const { data } = await this.$axios.post("/my-mltd", {
          version: serverVer,
          localLength
        },
          {
            onDownloadProgress (e) {
              _this.message = 'downloading'
              _this.progress = Math.floor(e.loaded / e.total * 100)
            }
          })
        await db.transaction("rw", db.idols, db.dataver, function () {
          db.idols.bulkPut(data)
          db.dataver.put({ ver: 'current', currentVersion: serverVer })
        })
        this.$store.commit('sendMessage', { text: 'update success' })
        this.$store.dispatch('submit', [])
      } else {
        this.$store.commit('sendMessage', { text: 'idol data is new' })
      }
      this.bottomSheet = false
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
  overflow-y: auto;
}
* {
  scrollbar-color: #bd237f #f2f2f2;
  scrollbar-width: thin;
}
*::-webkit-scrollbar {
  width: 6px;
  background-color: #f2f2f2;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #bd237f;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
}
.filter-divider {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter-divider hr {
  border-color: rgba(0, 0, 0, 0.12);
  height: 0px;
  max-height: 0px;
  border-width: thin 0 0 0;
  transition: inherit;
}
.filter-divider hr:first-of-type {
  width: 20px;
}
.filter-divider hr:last-of-type {
  flex-grow: 1;
}
.filter-divider div {
  color: rgba(0, 0, 0, 0.438);
  padding: 0 10px;
  font-size: 12px;
}
</style>

