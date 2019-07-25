<template>
  <div>
    <v-card class="ma-2" >
       <v-responsive :aspect-ratio="16/9">
      <v-carousel  hide-delimiters>
        <v-carousel-item v-for="item in [
        `https://storage.matsurihi.me/mltd/card_bg/032emi0144_0.png`,
        `https://storage.matsurihi.me/mltd/card_bg/032emi0144_1.png`
        ]" :key="item" :src="item"></v-carousel-item>
      </v-carousel>   
       </v-responsive>   
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
    }
  },
  methods: {
    async checkIdol () {
      if (this.routeId != this.idol.id) {
        this.loading = true
        this.$store.commit('setCrrt', {})
        const { data } = await this.$axios(`/mltd/cards/${this.routeId}`)
        this.$store.commit('setCrrt', data[0])
        this.loading = false
      }
    }
  },
  mounted () {
    this.checkIdol()
  }
}
</script>
