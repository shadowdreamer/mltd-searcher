<template>
  <v-bottom-sheet :value="value" persistent>
    <v-sheet class="text-center pa-4" height="200px">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="progress"
        color="teal"
      >{{ progress }}%</v-progress-circular>
    </v-sheet>
    <div>{{message}}</div>
  </v-bottom-sheet>
</template>
<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    },
    value: Boolean,
    message: String
  }
}
</script>
