<template>
  <v-bottom-sheet :value="value" persistent>
    <v-sheet class="text-center pa-4" height="200px">
      <v-progress-circular
        :indeterminate="message=='pending'"
        :rotate="360"
        :size="100"
        :width="15"
        :value="progress"
        color="primary"
      >{{ progress }}%</v-progress-circular>
    <div>{{message}}</div>
    </v-sheet>
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
    message: {
      type:String,
      default:''
    }
  }
}
</script>
