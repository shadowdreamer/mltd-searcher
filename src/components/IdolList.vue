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
          <v-list-item  @click.stop="$router.push({path:`/card/${item.id}`})">
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
  height: 100%;
}
.wrapper {
  overflow: hidden;
  height: calc(100vh - 150px);
}
</style>

