<template>
   <v-card class="mt-4">
     123
   </v-card>
</template>
<script>
export default {
  name: 'card',
  computed: {
    id () {
      return this.$route.params.id;
    }
  }
}
</script>
