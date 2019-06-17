<template>
  <v-app style="background-color:#f5ecbb">
    <v-content>
      <SearchBar/>
      <SnackBar/>

      <v-btn
        color="success"
        @click="$store.commit('sendMessage',{
        type:'success',text:new Date().toISOString()})"
      >text</v-btn>
    </v-content>
  </v-app>
</template>

<script>
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
      console.log("check update")
      let localData = JSON.parse(localStorage.getItem("mltd-cards"))
      const serverVer = (await this.$axios("/mltd/version/latest")).data.res.updateTime
      if (!localData) {
        return { needUpdate: true, updateTime: serverVer }
      }
      if (localData.version != serverVer) {
        return { needUpdate: true, updateTime: serverVer }
      }
      return { needUpdate: false, data: localData }
    },
    async getCards () {
      let crrt = await this.checkVersion()
      if (crrt.needUpdate) {
        console.log("updating cards data")
        const { data } = await this.$axios.post("/my-mltd", {
          version: crrt.updateTime
        })
        console.log(data)
        this.cards = data.cards
        localStorage.setItem(
          "mltd-cards",
          JSON.stringify(data)
        )
        console.log("update success")
      } else {
        console.log("data is the lastest")
        this.cards = crrt.data
      }
    }
  },
  mounted () {
    this.getCards()
  }
}
</script>
