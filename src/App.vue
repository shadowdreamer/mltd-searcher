<template>
  <v-app style="background-color:#f5ecbb">
    <v-content>
      <SearchBar @submit="submit($event)" />
      <SnackBar />
      <!-- <div>
        <p v-for="item in result" :key="item.id">
          <v-img
            height="50"
            aspect-ratio="1"
            :src="`https://storage.matsurihi.me/mltd/icon_l/${item.resourceId}_1.png`"
          />
          {{item.id}}{{item.name}}
        </p>
      </div>-->
      <v-card>
        <v-list>
          <v-list-tile v-for="item in result" :key="item.id" avatar @click.stop>
            <v-list-tile-avatar>
              <img :src="`https://storage.matsurihi.me/mltd/icon_l/${item.resourceId}_1.png`" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import { db } from '@/plugins/dexie'
export default {
  name: "App",
  data: () => ({
    result: []
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
      this.result = await db.idols.where('idolId').inAnyRange(range).toArray()
    }
  },
  mounted () {
    this.getCards()
    window.db = db
    // this.checkVersion()
  }
}
</script>
