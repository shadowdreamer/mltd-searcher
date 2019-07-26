<template>
  <div>
    <v-card class="ma-2">
      <v-carousel
        v-if="idol.rarity === 4"
        cycle
        :height="carouselHeight"
      >
        <v-carousel-item
          v-for="item in [
        `https://storage.matsurihi.me/mltd/card_bg/${idol.resourceId}_0.png`,
        `https://storage.matsurihi.me/mltd/card_bg/${idol.resourceId}_1.png`
        ]"
          :key="item"
        >
        <v-img :height="carouselHeight" :src="item"/>
        </v-carousel-item>
      </v-carousel>
    </v-card>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
export default {
  name: 'card',
  data: () => ({
    loading: false
  }),
  computed: {
    routeId () {
      return this.$route.params.id;
    },
    idol () {
      return this.$store.state.crrt || {}
    },
    carouselHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '280px'
        case 'sm': return '320px'
        case 'md': return '400px'
        case 'lg': return '420px'
        case 'xl': return '480px'
      }
    },
  },
  methods: {
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
