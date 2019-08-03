<template>
  <div class="home">
    <SearchBar v-model="keywords" />
      <div class="counter">
        <div>Sort By {{$store.state.sortby}}</div>
        <div>Found {{$store.state.list.length}} results</div>      
      </div>
    <IdolList />
  </div>
</template>
<script>
import IdolList from '@/components/IdolList'
export default {
  name: 'home',
  data: () => ({
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
  justify-content:space-between;
}
</style>

