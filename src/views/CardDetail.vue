<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12  v-if="idol.rarity === 4 && [0,4].includes(idol.extraType)">
        <v-carousel         
          cycle
          :height="carouselHeight"
          hide-delimiter-background
        >
          <v-carousel-item
            v-for="item in [
        `https://storage.matsurihi.me/mltd/card_bg/${idol.resourceId}_0.png`,
        `https://storage.matsurihi.me/mltd/card_bg/${idol.resourceId}_1.png`
        ]"
            :key="item"
          >
            <v-img :height="carouselHeight" :src="item"  @click="checkImg(item)">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular size="50" indeterminate color="primary"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12 class="mt-2">
        <v-card v-if="idol.resourceId">
          <div class="mb-1 mt-0 filter-divider">
            <hr />
            <div>before awaken</div>
            <hr />
          </div>
          <v-layout row wrap class="px-4 py-3">
            <v-flex xs4>
              <v-img
                @click="checkImg(`https://storage.matsurihi.me/mltd/card/${idol.resourceId}_0_b.png`)"
                :src="`https://storage.matsurihi.me/mltd/card/${idol.resourceId}_0_a.png`"
              >
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular size="50" indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card flat>
                <v-card-title primary-title></v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-2">
        <v-card v-if="idol.resourceId">
          <div class="mb-1 mt-0 filter-divider">
            <hr />
            <div>after awaken</div>
            <hr />
          </div>
          <v-layout row wrap class="px-4 py-3">
            <v-flex xs4>
              <v-img
                @click="checkImg(`https://storage.matsurihi.me/mltd/card/${idol.resourceId}_1_b.png`)"
                :src="`https://storage.matsurihi.me/mltd/card/${idol.resourceId}_1_a.png`"
              >
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular size="50" indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card flat>
                <v-card-title primary-title></v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 md7 class="mt-2" v-if="costumes.length > 0">
        <v-card>
          <div class="mb-1 mt-0 filter-divider">
            <hr />
            <div>costumes</div>
            <hr />
          </div>
          <v-tabs height="30" dense v-model="costumeTab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              v-for="(item,i) in costumes"
              :key="i"
              :href="`#Costume${'+'.repeat(i)}`"
            >Costume{{'+'.repeat(i)}}</v-tab>
            <v-tab-item v-for="(item,i) in costumes" :key="i" :value="`Costume${'+'.repeat(i)}`">
              <v-card flat class="pa-3">
                <v-card-title class="my-0 py-0 subtitle-1">{{item.name}}</v-card-title>
                <v-layout row wrap>
                  <v-flex xs8 md9>
                    <v-card flat>
                      <v-card-text v-html="item.description.replace(/\n/g,'<br/>')"></v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs4 md3 class="pr-3">
                    <v-img
                      :aspect-ratio="0.716"
                      :src="`https://storage.matsurihi.me/mltd/costume_icon_ll/${item.resourceId}.png`"
                    >
                      <template v-slot:placeholder>
                        <v-layout fill-height align-center justify-center ma-0>
                          <v-progress-circular size="50" indeterminate color="primary"></v-progress-circular>
                        </v-layout>
                      </template>
                    </v-img>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>

      <v-flex xs12  md5 :class="['mt-2',$vuetify.breakpoint.mdAndUp&&idol.rarity==4?'pl-2':'']">
        <v-card v-if="idol.resourceId">
          <div class="mb-1 mt-0 filter-divider">
            <hr />
            <div>this idol's onther cards</div>
            <hr />
          </div>
          <v-list>
            <template v-for="item in sameIdol">
              <v-list-item :key="item.id" @click="$router.push({path:`/card/${item.id}`})">
                <v-list-item-avatar>
                  <v-img :src="`https://storage.matsurihi.me/mltd/icon_l/${item.resourceId}_1.png`">
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <div style="height:50px;"></div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
import { db } from "@/plugins/dexie"
export default {
  name: "card",
  data: () => ({
    loading: false,
    costumeTab: null,
    tab: null,
    sameIdol: [],
    sameDate:[],
  }),
  computed: {
    costumes () {
      let arr = []
      this.idol.costume ? arr.push(this.idol.costume) : ""
      this.idol.bonusCostume ? arr.push(this.idol.bonusCostume) : ""
      this.idol.rank5Costume ? arr.push(this.idol.rank5Costume) : ""
      return arr
    },
    routeId () {
      return parseInt(this.$route.params.id)
    },
    idol () {
      return this.$store.state.crrt || {}
    },
    carouselHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "240px"
        case "sm":
          return "320px"
        case "md":
          return "360px"
        case "lg":
          return "400px"
        case "xl":
          return "420px"
      }
    }
  },
  watch: {
    routeId () {
      this.getSameIdol()
    }
  },
  methods: {
    checkImg (url) {
      window.open(
        url,
        "check image",
        "scrollbars=no,toolbar=no, menubar=no, location=no, status=no"
      )
    },
    async getSameIdol () {
      await this.checkIdol()
      let { idolId, addDate }= this.idol
      let id = this.routeId
      let sameIdol = await db.idols
        .where("idolId")
        .equals(idolId)
        .filter(function (idol) {
          return idol.id != id
        })
        .toArray()
      this.sameIdol = sameIdol
      if(addDate){
         let sameDate = await db.idols
        .where('addDate')
        .equals(addDate)
        .filter(function (idol) {
          return idol.id != id
        })
        .toArray()
        this.sameDate = sameDate      
      }
    },
    async checkIdol () {
      let id = this.routeId
      if (id != this.idol.id) {
        this.$store.commit("setCrrt", {})
        let localData = await db.idols.get(id)
        let data = null;
        if (!localData) {
          this.loading = true
          data = (await this.$axios(`/mltd/cards/${this.routeId}`)).data[0]
        }
        let idol = localData || data[0]
        this.$store.commit("setCrrt", idol)
        this.loading = false
        return
      }
    }
  },
  mounted () {
    this.getSameIdol()
  }
}
</script>
