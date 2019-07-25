<template>
  <div class="home">
    <SearchBar v-model="keywords" @input="submit($event)" />
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
    async submit (ev) {
      console.log(ev)
      if (ev.length === 0) {
        let result = await db.idols.toArray()
        this.$store.commit('updateList', result)
        return
      }
      // let range = Array.from(ev, ev => [parseInt(ev.text), parseInt(ev.text) + 1])
      // console.log(range)
      // let result = await db.idols.where('idolId').inAnyRange(range).toArray()
      // let result = await db.idols.toArray()
      // this.$store.commit('updateList', result)
    }
  }
}
</script>
