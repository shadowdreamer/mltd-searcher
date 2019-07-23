<template>
  <div>
 
  </div>
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
