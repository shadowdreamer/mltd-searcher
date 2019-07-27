<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel
          v-if="idol.rarity === 4"
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
            <v-img :height="carouselHeight" :src="item">
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
                @click="checkImg(`https://storage.matsurihi.me/mltd/card/${idol.resourceId}_0_b.png`)"
                :src="`https://storage.matsurihi.me/mltd/card/${idol.resourceId}_1_a.png`"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card flat>
                <v-card-title primary-title></v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-2" v-if="costumes.length > 0">
        <v-card>
          <div class="mb-1 mt-0 filter-divider">
            <hr />
            <div>costumes</div>
            <hr />
          </div>
          <v-tabs dense v-model="costumeTab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              v-for="(item,i) in costumes"
              :key="i"
              :href="`#Costume${'+'.repeat(i)}`"
            >Costume{{'+'.repeat(i)}}</v-tab>
            <v-tab-item v-for="(item,i) in costumes" :key="i" :value="`Costume${'+'.repeat(i)}`">
              <v-card flat class="pa-3">
                <v-card-title class="my-0 py-0 subtitle-1">
                  {{item.name}}
                </v-card-title>
                <v-layout row wrap>
                  <v-flex xs8 md9>
                    <v-card flat>
                        <v-card-text v-html="item.description.replace(/\n/g,'<br/>')" >
                        </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs4 md3>
                    <v-img
                      :aspect-ratio='0.716' 
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
      <v-flex xs12>
        <v-card>
          
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
export default {
  name: 'card',
  data: () => ({
    loading: false,
    costumeTab: null,
    tab: null,
  }),
  computed: {
    costumes () {
      let arr = []
      this.idol.costume ? arr.push(this.idol.costume) : '';
      this.idol.bonusCostume ? arr.push(this.idol.bonusCostume) : '';
      this.idol.rank5Costume ? arr.push(this.idol.rank5Costume) : '';
      return arr
    },
    routeId () {
      return this.$route.params.id;
    },

    idol () {
      return this.$store.state.crrt || {}
    },
    carouselHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '240px'
        case 'sm': return '320px'
        case 'md': return '360px'
        case 'lg': return '400px'
        case 'xl': return '420px'
      }
    },
  },
  methods: {
    checkImg (url) {
      window.open(url, "check image", "scrollbars=no,toolbar=no, menubar=no, location=no, status=no");
    },
    async checkIdol () {
      if (this.routeId != this.idol.id) {
        this.loading = true
        this.$store.commit('setCrrt', {})
        const { data } = await this.$axios(`/mltd/cards/${this.routeId}`)
        this.$store.commit('setCrrt', data[0])
        this.loading = false
        return
      }
    }
  },
  mounted () {
    this.checkIdol()
  }
}
</script>
