<template>
  <v-dialog :value="!!viewerId" scrollable max-width="800px" persistent>
    <v-card v-if="!data">
      <div class="text-center py-5">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </v-card>
    <v-card v-else>
      <v-card-title primary-title class="pb-0">{{data.name}}</v-card-title>
      <v-divider></v-divider>
      <v-card-title class="pb-0 pt-2 body-2">
        <v-layout row wrap class="px-3">
          <v-flex xs12>
            <p class="black--text body-1">{{data.comment}}</p>
          </v-flex>
          <v-flex xs6>
            <p>Master Name: {{data.masterName}}</p>
            <p>Total Fans: {{data.fan}}</p>
            <p>Create Date: {{data.createTime.slice(0,10)}}</p>
          </v-flex>
          <v-flex xs6>
            <p>Lounge ID: {{data.viewerId}}</p>
            <p>Member: {{data.userCount}}/{{data.userCountLimit}}</p>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-divider></v-divider>
      <v-btn
        class="my-1"
        :loading="loadingEvent"
        v-show="eventData.length==0"
        text
        block
        color="primary"
        @click="getEvent(data.viewerId)"
      >load lounge events</v-btn>
      <v-card-text v-show="!eventData.length==0">
        <div class="event-list mb-3" v-for="item in eventData" :key="item.eventId">
          <p
            class="event-list-name pl-1 my-0 black--text text-no-wrap text-truncate"
          >{{item.eventName}}</p>
          <div class="event-list-detail pl-3">
            <div>End date:{{item.summaryTime.slice(0,10)}}</div>
            <div>
              Rank:
              <span :style="{color:rankColor(item.rank)}">{{item.rank}}</span>
            </div>
            <div>Score:{{item.score}}</div>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text small color="warning" @click.native="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['viewerId'],
  data: () => ({
    data: null,
    eventData: [],
    loadingEvent: false
  }),
  watch: {
    viewerId (val) {
      if (!val) {
        this.data = null
        this.eventData = []
        return
      }
      this.getLounge(val)
    }
  },
  methods: {
    rankColor (rank) {
      if (rank <= 10) return '#a6126b'
      if (rank <= 50 && rank > 10) return '#a6126bd2'
      if (rank <= 100 && rank > 50) return '#a6126ba6'
      if (rank <= 250 && rank > 50) return '#a6126b71'
      if (rank <= 500 && rank > 250) return '#a6126b49'
      return 'ffffff49'
    },
    async getLounge (viewerId) {
      let { data } = await this.$axios('https://api.matsurihi.me/mltd/v1/lounges/' + this.viewerId)
      console.log(data)
      this.data = data
    },
    async getEvent (viewerId) {
      this.loadingEvent = true
      let { data } = await this.$axios(`https://api.matsurihi.me/mltd/v1/lounges/${this.data.viewerId}/eventHistory`)
      console.log(data)
      this.eventData = data
      this.loadingEvent = false
    }
  }
}
</script>
<style>
.event-list-detail {
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
.event-list-name {
  border-left: 6px #a6126bcc solid;
}
</style>
