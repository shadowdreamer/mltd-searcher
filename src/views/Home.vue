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
    filterdialog: false,
    bottomSheet: false,
    message: '',
    progress: 0,
    checking:false
  }),
  components: {
    IdolList,
    BottomSheet: () => import("@/components/BottomSheet"),
    SearchBar: () => import("@/components/SearchBar"),
  },
  methods: {
     async checkVersion () {
       this.checking = true
      this.$store.commit('sendMessage', { text: 'checking idols data for search' })
      const serverVer = (await this.$axios("/mltd/version/latest")).data.res.updateTime
      console.log(serverVer)
      let current = await db.dataver.get({ ver: 'current' })
      console.log(current)
      this.checking=false
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
      if (localLength > 100) localLength = 100; //just skip N and some R
      // it will skip rank5 custom update, not a good way to slim the online data
      // if (localLength > 100) localLength += 100;
      let serverVer = await this.checkVersion()
      if (serverVer) {
        this.bottomSheet = true
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
      } else {
        this.$store.commit('sendMessage', { text: 'idol data is new' })
      }
      this.bottomSheet = false
    }
  },
  mounted(){
    this.getCards()
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

