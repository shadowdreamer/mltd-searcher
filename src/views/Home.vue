<template>
  <div class="home">
    <SearchBar
      v-model="keywords"
      @searchblur="overlay=false"
      @searchfocus="overlay=true"
      style="z-index:2"
    />
    <div class="counter">
      <div>Sort By {{$store.state.sortby}}</div>
      <div>Found {{$store.state.list.length}} results</div>
    </div>
    <v-progress-linear v-show="checking" :indeterminate="true" color="primary"></v-progress-linear>
    <IdolList />
    <v-overlay :z-index="1" :value="overlay" @click="overlay=false"></v-overlay>
    <BottomSheet v-model="bottomSheet" :progress="progress" :message="message" />
    <v-dialog v-model="updateDialog" persistent max-width="600px">
      <v-card>
        <v-alert v-if="localLength==0" colored-border border="top" type="error" >
          For the first time visit the site, please update the cards data, it will take a little time.
        </v-alert>
        <v-alert v-else colored-border border="top" type="warning" >
          There are some update available probably,please update.
        </v-alert>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" @click="dismissUpdate" :disabled="localLength==0">next time</v-btn>
          <v-btn color="primary" @click="getCards">update now</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { db } from '@/plugins/dexie'
import IdolList from '@/components/IdolList'
export default {
  name: 'home',
  data: () => ({
    overlay: false,
    keywords: [],
    bottomSheet: false,
    message: '',
    progress: 0,
    checking: false,
    updateDialog: false,
    localLength:0,
    serverVer:null
  }),
  components: {
    IdolList,
    BottomSheet: () => import("@/components/BottomSheet"),
    SearchBar: () => import("@/components/SearchBar"),
  },
  methods: {
    async checkVersion () {
      if (!!sessionStorage.getItem('updated') || !!sessionStorage.getItem('dismissUpdate')) return
      this.checking = true
      this.$store.commit('sendMessage', { text: 'checking idols data for search' })
      const serverVer = (await this.$axios("/mltd/version/latest")).data.res.updateTime
      console.log(serverVer)
      let current = await db.dataver.get({ ver: 'current' })
      console.log(current)
      this.checking = false
      if (!current) {
        return serverVer
      } else if (current.currentVersion != serverVer) {
        return serverVer
      } else {
        this.$store.commit('sendMessage', { text: 'idol data is new' })
        return false
      }
    },
    async checkCards () {
      let serverVer = await this.checkVersion()
      if (serverVer) {
        this.serverVer = serverVer
        this.localLength = await db.idols.count()
        this.updateDialog = true
      }
      sessionStorage.setItem('updated', '1')
    },
    async getCards () {
      let _this = this
      let serverVer = this.serverVer
      let localLength = this.localLength
      if (localLength > 100) localLength += 100;
      //fix serverless proxy,now skip most of the local data and always update the rank5 cards,hope it work
      this.bottomSheet = true
      this.updateDialog = false
      this.$store.commit('sendMessage', { text: 'updating idol data' })
      this.message = 'pending'
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
      this.bottomSheet = false
    },
    dismissUpdate(){
      this.updateDialog = false
      sessionStorage.setItem('dismissUpdate','1')
    }
  },
  mounted () {
    this.checkCards()
  }
}
</script>
<style scoped>
.counter {
  margin-top: -25px;
  font-size: 14px;
  padding: 0 15px;
  color: rgba(0, 0, 0, 0.74);
  display: flex;
  justify-content: space-between;
}
</style>

