<template>
  <v-dialog :value="!!viewerId" max-width="800px">
    <v-card v-if="!data" class="text-center py-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-card>
    <v-card v-else>
      <v-card-title primary-title>{{data.name}}</v-card-title>
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
    data: null
  }),
  watch: {
    viewerId (val) {
        if(!val)return
        this.getLounge(val)
    }
  },
  methods:{
      async getLounge(viewerId){
        let {data} =  await this.$axios('https://api.matsurihi.me/mltd/v1/lounges/'+this.viewerId)
        console.log(data)
        this.data = data
      }
  }
}
</script>