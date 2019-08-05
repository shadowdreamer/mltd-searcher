<template>
  <v-card class="ma-2">
    <v-card-text v-show="list.length == 0">
      wish list is empty,try tap
      <v-icon color="red" small>favorite</v-icon>on card detail page
    </v-card-text>
    <v-list>
      <template v-for="(item,index) in list" >
        <v-list-item :key="item.id" @click.stop="checkCard(item)">
          <v-list-item-avatar tile >
            <v-img :src="`/storage/icon_l/${item.resourceId}_1.png`">
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
          <v-list-item-action> 
            <v-btn small icon @click.stop="toggleLove(index)" text color="red">
              <v-icon>{{item.wish?'favorite':'favorite_border'}}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
	<v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-show="list.length !=0"
        text
        color="warning"
        @click.stop="getList"
      >update wish list</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { db } from '@/plugins/dexie'
export default {
  name: 'wishlist',
  data: () => ({
    list: [],
    doing: false
  }),
  components: {
    RarityRabel: () => import("@/components/RarityRabel"),
  },
  methods: {
    async getList () {
      this.list = await db.idols.where('wish').equals(1).toArray()
    },
    async toggleLove (index) {
      this.doing = true
      if (this.list[index].wish == 1) {
        this.list[index].wish = null
        await db.idols.put( this.list[index] );
        this.$store.commit('sendMessage', { text: `delete ${this.list[index].name} success` })
      } else {
        this.list[index].wish = 1
        await db.idols.put(this.list[index]);
        this.$store.commit('sendMessage', { text: `add ${this.list[index].name} success` })
      }
      this.doing = false
	},
	checkCard (item) {
      this.$store.commit('setCrrt', item)
      this.$router.push({ path: `/card/${item.id}` })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
