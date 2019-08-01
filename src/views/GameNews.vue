<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 class="pa-1" v-for="item in announce_list" :key="item.id">
        <v-card>
          <v-card-text class="py-0" v-ripple @click.stop="checking=item">
            <v-layout row wrap>
              <v-flex v-if="item.title_image_url" xs4 class="py-2">
                <v-img :src="item.title_image_url" />
              </v-flex>
              <v-flex :xs8="!!item.title_image_url" :xs12="!item.title_image_url">
                <v-card-text>{{item.title}}</v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-alert v-if="fail" type="error">Fail in loading game news,please retry later.</v-alert>
        <div class="text-center mt-5">
          <v-btn
            color="primary"
            text
            large
            :disabled="loading"
            :loading="loading"
            @click="loadNews"
          >
            load more
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
        <div style="height:60px;"></div>
      </v-flex>
    </v-layout>
    <v-dialog :value="!!checking" scrollable persistent :overlay="true" max-width="600px">
      <v-card v-if="!!checking">
        <v-img
          class="white--text"
          :src="checking.head_image_url|imgProxy"
          v-if="!!checking.head_image_url"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
        <v-card-title class>{{checking.title}}</v-card-title>
        <v-card-text v-html="checking.body"></v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" @click.stop="checking=null" text>close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: 'gamenews',
  data: () => ({
    announce_list: [],
    cursor: '',
    loading: false,
    checking: null,
    fail: false
  }),
  methods: {
    async loadNews () {
      this.loading = true
      try {
        const { data } = await axios(`news-mltd?type=3&cursor=${this.cursor}&platform=google`)
        this.announce_list = this.announce_list.concat(data.announce_list)
        this.cursor = data.cursor
        this.loading = false
      } catch (error) {
        this.fail = true
        this.loading = false
      }
    },
  },
  filters: {
    imgProxy (url) {
      return 'news-img/' + url.split('/').pop()
    }
  },
  mounted () {
    this.loadNews()
  }
}
</script>
