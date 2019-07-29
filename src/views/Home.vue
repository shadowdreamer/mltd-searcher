<template>
  <div class="home">
    <SearchBar v-model="keywords" />
    <div class="counter" >find {{$store.state.list.length}} results</div>
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
    .counter{
        margin-top:-24px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.74);
        padding: 0 8px;
        text-align: end;
    }
</style>

