<template>
  <v-layout row justify-center>
    <v-dialog :value="value" persistent max-width="800">
      <v-card>
        <v-card-title class="headline">FILTER</v-card-title>
        <v-card-text class="py-2">
          selected:
          <v-chip v-for="(item,i) in selected" 
          class="mr-2" @click="selected.splice(i,1)"
          :key="item.text" :color="item.color"
          dark label small>{{ item.text }}</v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          Rarity:
          <v-chip v-for="item in subItems.rarity" 
          class="mr-2" :color="item.color"
          :key="item.text" @click="selected.push(item)"
          v-show="!selected.includes(item)"
          dark label small>{{ item.text }}</v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          Idol type:
          <v-chip v-for="item in subItems.idolType" 
          class="mr-2" :color="item.color"
          :key="item.text" @click="selected.push(item)" 
          v-show="!selected.includes(item)"
          dark label small>{{ item.text }}</v-chip>
        </v-card-text>        
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="$emit('close')">cancel</v-btn>
          <v-btn color="primary" text @click.native="$store.dispatch('submit',selected);$emit('close')">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data: () => ({
    selected:[],
  }),
  computed:{
    ...mapState(['subItems'])
  },
  watch:{
    value(){
      this.selected = this.$store.state.keywords
    }
  },
  props:{
      value:Boolean
  }
}
</script>

