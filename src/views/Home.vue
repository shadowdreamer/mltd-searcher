<template>
  <div class="home">
    <SearchBar
      v-model="keywords"
      @searchblur="overlay=false"
      @searchfocus="overlay=true"
      style="z-index:2"
    />
    <div class="counter">
      <div>Sort By {{$store.state.sortby}}</div>
      <div>Found {{$store.state.list.length}} results</div>
    </div>
    <IdolList />
    <v-overlay :z-index="1" :value="overlay" @click="overlay=false"></v-overlay>
  </div>
</template>
<script>
import IdolList from '@/components/IdolList'
export default {
  name: 'home',
  data: () => ({
    overlay: false,
    keywords: [],
    filterdialog: false
  }),
  components: {
    IdolList,
    SearchBar: () => import("@/components/SearchBar"),
  },
  methods: {
  }
}
</script>
<style scoped>
.counter {
  margin-top: -25px;
  font-size: 14px;
  padding: 0 15px;
  color: rgba(0, 0, 0, 0.74);
  display: flex;
  justify-content: space-between;
}
</style>

