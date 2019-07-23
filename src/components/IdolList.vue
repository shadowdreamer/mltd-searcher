<template>
  <div>
    <v-list class="wrapper">
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
          <v-list-tile avatar @click.stop="$router.push({path:`/card/${item.id}`})">
            <v-list-tile-avatar>
              <img :src="`https://storage.matsurihi.me/mltd/icon_l/${item.resourceId}_1.png`" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </RecycleScroller>
    </v-list>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['list'])
  },
  methods: {
    onVisible () {
      console.log('visible')
    },
    onHidden () {
      console.log('hidden')
    },
  },
  mounted () {
    // window.scroller = this.$refs.scroller
  }
}
</script>
<style scoped>
.scroller {
  width: 100%;
  height: 100%;
}
.wrapper {
  overflow: hidden;
  height: calc(100vh - 128px);
  left: 0;
  right: 0;
}
</style>

