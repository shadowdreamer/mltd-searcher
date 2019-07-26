<template>
  <div class="home">
    <SearchBar v-model="keywords" />
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
