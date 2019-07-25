<template>
  <v-list dense style="margin-top:-24px" class="wrapper">
    <RecycleScroller
      :key="false"
      ref="scroller"
      class="scroller"
      :items="list"
      :item-size="56"
      :buffer="100"
      :page-mode="false"
      key-field="id"
    >
      <template v-slot="{item}">
        <v-list-item @click.stop="checkCard(item)">
          <v-list-item-avatar>
            <v-img :src="`https://storage.matsurihi.me/mltd/icon_l/${item.resourceId}_1.png`" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </RecycleScroller>
  </v-list>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    ops: {
      vuescroll: {},
      scrollPanel: {},
      rail: {},
      bar: {}
    }
  }),
  computed: {
    ...mapState(['list'])
  },
  methods: {
    checkCard (item) {
      this.$store.commit('setCrrt', item)
      this.$router.push({ path: `/card/${item.id}` })
    }
  },
}
</script>
<style scoped>
.scroller {
  height: 100%;
  /*firefox*/
  scrollbar-color: #bd237f #f2f2f2;
  scrollbar-width: thin;
}
.scroller::-webkit-scrollbar {
  width: 6px;
  background-color: #f2f2f2;
}
.scroller::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background:  #bd237f;
}
.scroller::-webkit-scrollbar-track {
  border-radius: 5px;
}

.wrapper {
  overflow: hidden;
  height: calc(100vh - 150px);
}
</style>

