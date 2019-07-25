<template>
  <v-layout row justify-center>
    <v-dialog :value="value" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">headline</v-card-title>
        <v-card-text>text</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="$emit('close')">Disagree</v-btn>
          <v-btn color="primary" text @click.native="$emit('close') ">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data: () => ({

  }),
  props:{
      value:Boolean
  }
}
</script>

