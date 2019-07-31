<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 class="pa-1" 
				v-for="item in announce_list"
				:key="item.id"
			>
        <v-card>{{item.title}}</v-card>
      </v-flex>
			<v-flex xs12 md6>
				<div class="text-center mt-5">
				<v-btn color="primary" text large
				:disabled="loading" :loading="loading"
				@click="loadNews"
				><v-icon large>refresh</v-icon>load more</v-btn>
				</div>
			</v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'gamenews',
  data: () => ({
    announce_list: [],
    cursor: '',
    loading: false
  }),
  methods: {
    async loadNews () {
      this.loading = true
      const { data } = await axios(`news-mltd?type=3&cursor=${this.cursor}&platform=google`)
      this.announce_list = this.announce_list.concat(data.announce_list)
      this.cursor = data.cursor
      this.loading = false
    }
  },
  mounted () {
    this.loadNews()
  }
}
</script>
