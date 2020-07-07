<template>
  <v-container>
    <v-layout v-if="idol.resourceId" row wrap class="mt-2">
      <v-flex xs12 v-if="idol.rarity === 4 && [0,4].includes(idol.extraType)">
        <v-carousel cycle :height="carouselHeight" hide-delimiter-background>
          <v-carousel-item
            v-for="item in [
        `https://mltd.dovahkiin.top/storage/card_bg/${idol.resourceId}_0.png`,
        `https://mltd.dovahkiin.top/storage/card_bg/${idol.resourceId}_1.png`
        ]"
            :key="item"
          >
            <v-img :height="carouselHeight" :src="item" @click="checkImg(item)">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular size="50" indeterminate color="primary"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12>
        <v-banner Single-line :sticky="false">
          <p class="body-2 grey--text" v-html="pnameModify(idol.awakeningText)"></p>
          <p class="text-right caption grey--text mb-0">
            Release:
            {{idol.addDate?idol.addDate.slice(0,10):'2017-6-29'}}
          </p>
          <template v-slot:actions>
            <v-btn @click="wished=!wished;$store.dispatch('toggleLove')" text color="red">
              <v-icon>              
              {{wished?'favorite':'favorite_border'}}
              </v-icon></v-btn>
          </template>
        </v-banner>
      </v-flex>
      <v-flex xs12 class="mt-2" v-for="(awake,i) in ['','Awakened']" :key="i">
        <v-card>
          <div v-show="awake" class="mb-1 mt-0 filter-divider">
            <hr />
            <div>{{awake}}</div>
            <hr />
          </div>
          <v-layout row wrap class="px-4 py-3">
            <v-flex xs4 md3>
              <v-card flat class="px-3">
                <v-img
                  @click="checkImg(`https://mltd.dovahkiin.top/storage/card/${idol.resourceId}_${i}_b.png`)"
                  :src="`https://mltd.dovahkiin.top/storage/card/${idol.resourceId}_${i}_a.png`"
                >
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular size="50" indeterminate color="grey lighten-2"></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </v-card>
            </v-flex>
            <v-flex xs8 md3>
              <v-card flat>
                <v-card-text
                  class="mt-0 pt-0 caption darken-4 pr-0"
                  v-ripple="{class: `primary--text`}"
                  v-html="pnameModify(idol['flavorText'+awake])"
                ></v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md6>
              <v-card flat class="pl-3">
                <v-layout row wrap>
                  <v-flex xs12 class="pl-2">
                    <StatusPanel
                      :data="[
                    {name:'dance',value:idol['danceMax'+awake]},
                    {name:'visual',value:idol['visualMax'+awake]},
                    {name:'vocal',value:idol['vocalMax'+awake]}
                    ]"
                    />
                  </v-flex>                   
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 md6 v-if="idol.rarity!==1">
              <v-card flat>
                <v-card-text class="pb-0">
                  <p class="mb-1">
                    <span
                      class="status-label"
                      style="background-color:rgb(76, 76, 76)"
                    >Center Effect Name</span>
                    {{idol.centerEffectName}}
                  </p>
                  <v-divider></v-divider>
                  <p>{{idol.centerEffect.description}}</p>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md6 v-if="idol.rarity!==1">
              <v-card flat>
                <v-card-text class="pb-0">
                  <p class="mb-1">
                    <span class="status-label" style="background-color:rgb(76, 76, 76)">Skill Name</span>
                    {{idol.skillName}}
                  </p>
                  <v-divider></v-divider>
                  <p>{{idol.skill[0].description.replace('{0}',idol.skill[0].probability)}}</p>
                </v-card-text>
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
                      <v-card-text v-html="pnameModify(item.description)"></v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs4 md3 class="pr-3">
                    <v-img
                      :aspect-ratio="0.716"
                      :src="`https://mltd.dovahkiin.top/storage/costume_icon_ll/${item.resourceId}.png`"
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

      <v-flex xs12 md5 :class="['mt-2',$vuetify.breakpoint.mdAndUp&&idol.rarity==4?'pl-2':'']">
        <v-card v-if="idol.resourceId">
          <div class="mb-1 mt-0 filter-divider">
            <hr />
            <div>this idol's other cards</div>
            <hr />
          </div>
          <div v-show="loadingSame" class="text-center">
            <v-progress-circular  indeterminate color="primary"></v-progress-circular>
          </div>
          <v-list>
            <template v-for="item in sameIdol">
              <v-list-item :key="item.id+item.rarity" @click="$router.push({path:`/card/${item.id}`})">
                <v-list-item-avatar tile>
                  <v-img :src="`https://mltd.dovahkiin.top/storage/icon_l/${item.resourceId}_1.png`">
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <RarityRabel :rarity="item.rarity" />
                    {{item.name}}
                  </v-list-item-title>
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
  components: {
    RarityRabel: () => import("@/components/RarityRabel"),
    StatusPanel: () => import('@/components/StatusPanel')
  },
  data: () => ({
    loading: false,
    loadingSame: false,
    costumeTab: null,
    tab: null,
    wished:false,
    sameIdol: [],
    sameDate: [],
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
    pnameModify (text) {
      if(!text)return ""
      let pname = localStorage.getItem('pname') || 'プロデューサー'
      return text.replace(/{\$P\$}/g, pname).replace(/\n/g, '<br/>')
    },
    checkImg (url) {
      window.open(
        url,
        "check image",
        "scrollbars=no,toolbar=no, menubar=no, location=no, status=no"
      )
    },
    async getSameIdol () {
      await this.checkIdol()
      let { idolId } = this.idol
      let id = this.routeId
      let sameIdol = await db.idols
        .where("idolId")
        .equals(idolId)
        .filter(function (idol) {
          return idol.id != id
        })
        .toArray()
      if(sameIdol.length === 0){
        this.loadingSame = true
        let  { data } = await this.$axios(`https://mltd.dovahkiin.top/mltd/cards?idolId=${idolId}`)
        sameIdol = data.filter((el,index,arr)=>el.id!== id)
        this.loadingSame = false
      }
      this.sameIdol = sameIdol      
    },
    async checkIdol () {
      let id = this.routeId
      if (id != this.idol.id) {
        this.$store.commit("setCrrt", {})
        let localData = await db.idols.get(id)
        let data = null;
        if (!localData) {
          this.loading = true
          data = (await this.$axios(`https://mltd.dovahkiin.top/mltd/cards/${this.routeId}`)).data
        }
        let idol = localData || data[0]
        console.log(idol)
        this.$store.commit("setCrrt", idol)
        // debugger
        this.loading = false
      }
      this.wished = !!this.idol.wish
    }
  },
  mounted () {
    this.getSameIdol()
    window.db= db
  }
}
</script>
<style>
.status-label {
  display: inline-block;
  text-align: center;
  padding: 2px 8px 0px;
  margin-right: 18px;
  min-width: 80px;
  background-color: rgb(122, 122, 122);
  color: #fff;
  font-size: 13px;
  border-radius: 3px;
}
</style>
